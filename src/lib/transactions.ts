// Transactions Service - CRUD operations for payments and financial tracking
import { supabase } from './supabaseClient';

// Types
export interface Transaction {
  id: number;
  advisor_id: string;
  family_id?: number;
  amount: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  description?: string;
  type: 'income' | 'payout' | 'fee' | 'subscription' | 'refund';
  invoice_id?: string;
  created_at: string;
  // Joined data
  family?: {
    name: string;
  };
}

export interface TransactionFilters {
  type?: 'income' | 'payout' | 'fee' | 'subscription' | 'refund';
  status?: 'completed' | 'pending' | 'failed' | 'refunded';
  familyId?: number;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface PaymentMethod {
  id: number;
  advisor_id: string;
  type: 'card';
  brand: string;
  last4: string;
  expiry: string;
  is_default: boolean;
  created_at: string;
}

export interface BankAccount {
  id: number;
  advisor_id: string;
  bank_name: string;
  account_type: 'checking' | 'savings';
  last4: string;
  is_default: boolean;
  created_at: string;
}

// ============ TRANSACTIONS ============

/**
 * Get all transactions for the current advisor
 */
export async function getTransactions(filters?: TransactionFilters): Promise<{
  data: Transaction[] | null;
  count: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, count: 0, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('transactions')
    .select(`
      *,
      family:families(name)
    `, { count: 'exact' })
    .eq('advisor_id', user.id)
    .order('date', { ascending: false });

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.familyId) {
    query = query.eq('family_id', filters.familyId);
  }

  if (filters?.dateFrom) {
    query = query.gte('date', filters.dateFrom);
  }

  if (filters?.dateTo) {
    query = query.lte('date', filters.dateTo);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, count, error } = await query;
  return { data, count: count || 0, error };
}

/**
 * Get recent transactions
 */
export async function getRecentTransactions(limit: number = 5): Promise<{
  data: Transaction[] | null;
  error: Error | null;
}> {
  const result = await getTransactions({ limit });
  return { data: result.data, error: result.error };
}

/**
 * Get a single transaction by ID
 */
export async function getTransaction(transactionId: number): Promise<{
  data: Transaction | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      family:families(name)
    `)
    .eq('id', transactionId)
    .single();

  return { data, error };
}

// ============ PAYMENT METHODS ============

/**
 * Get all payment methods for the current advisor
 */
export async function getPaymentMethods(): Promise<{
  data: PaymentMethod[] | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .eq('advisor_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * Add a payment method (mock - in production would integrate with Stripe)
 */
export async function addPaymentMethod(input: {
  brand: string;
  last4: string;
  expiry: string;
}): Promise<{ data: PaymentMethod | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // Check if this is the first payment method (make it default)
  const { count } = await supabase
    .from('payment_methods')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const isDefault = (count || 0) === 0;

  const { data, error } = await supabase
    .from('payment_methods')
    .insert({
      advisor_id: user.id,
      type: 'card',
      brand: input.brand,
      last4: input.last4,
      expiry: input.expiry,
      is_default: isDefault,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Set a payment method as default
 */
export async function setDefaultPaymentMethod(paymentMethodId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: new Error('Not authenticated') };
  }

  // Remove default from all
  await supabase
    .from('payment_methods')
    .update({ is_default: false })
    .eq('advisor_id', user.id);

  // Set new default
  const { error } = await supabase
    .from('payment_methods')
    .update({ is_default: true })
    .eq('id', paymentMethodId);

  return { success: !error, error };
}

/**
 * Delete a payment method
 */
export async function deletePaymentMethod(paymentMethodId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('payment_methods')
    .delete()
    .eq('id', paymentMethodId);

  return { success: !error, error };
}

// ============ BANK ACCOUNTS ============

/**
 * Get all bank accounts for the current advisor
 */
export async function getBankAccounts(): Promise<{
  data: BankAccount[] | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('advisor_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * Add a bank account (mock)
 */
export async function addBankAccount(input: {
  bank_name: string;
  account_type: 'checking' | 'savings';
  last4: string;
}): Promise<{ data: BankAccount | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // Check if this is the first bank account (make it default)
  const { count } = await supabase
    .from('bank_accounts')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const isDefault = (count || 0) === 0;

  const { data, error } = await supabase
    .from('bank_accounts')
    .insert({
      advisor_id: user.id,
      bank_name: input.bank_name,
      account_type: input.account_type,
      last4: input.last4,
      is_default: isDefault,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Set a bank account as default
 */
export async function setDefaultBankAccount(bankAccountId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: new Error('Not authenticated') };
  }

  // Remove default from all
  await supabase
    .from('bank_accounts')
    .update({ is_default: false })
    .eq('advisor_id', user.id);

  // Set new default
  const { error } = await supabase
    .from('bank_accounts')
    .update({ is_default: true })
    .eq('id', bankAccountId);

  return { success: !error, error };
}

/**
 * Delete a bank account
 */
export async function deleteBankAccount(bankAccountId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('bank_accounts')
    .delete()
    .eq('id', bankAccountId);

  return { success: !error, error };
}

// ============ STATISTICS ============

/**
 * Get financial statistics for dashboard
 */
export async function getFinancialStats(period?: {
  from: string;
  to: string;
}): Promise<{
  totalIncome: number;
  totalPayouts: number;
  totalFees: number;
  netEarnings: number;
  pendingPayments: number;
  transactionCount: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      totalIncome: 0,
      totalPayouts: 0,
      totalFees: 0,
      netEarnings: 0,
      pendingPayments: 0,
      transactionCount: 0,
      error: new Error('Not authenticated'),
    };
  }

  let query = supabase
    .from('transactions')
    .select('*')
    .eq('advisor_id', user.id);

  if (period?.from) {
    query = query.gte('date', period.from);
  }

  if (period?.to) {
    query = query.lte('date', period.to);
  }

  const { data: transactions, error } = await query;

  if (error || !transactions) {
    return {
      totalIncome: 0,
      totalPayouts: 0,
      totalFees: 0,
      netEarnings: 0,
      pendingPayments: 0,
      transactionCount: 0,
      error,
    };
  }

  const parseAmount = (amount: string): number => {
    return parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const totalPayouts = transactions
    .filter((t) => t.type === 'payout' && t.status === 'completed')
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const totalFees = transactions
    .filter((t) => t.type === 'fee' && t.status === 'completed')
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  const pendingPayments = transactions
    .filter((t) => t.type === 'income' && t.status === 'pending')
    .reduce((sum, t) => sum + parseAmount(t.amount), 0);

  return {
    totalIncome,
    totalPayouts,
    totalFees,
    netEarnings: totalIncome - totalPayouts - totalFees,
    pendingPayments,
    transactionCount: transactions.length,
    error: null,
  };
}

/**
 * Get monthly revenue for chart
 */
export async function getMonthlyRevenue(months: number = 12): Promise<{
  data: { month: string; income: number; payouts: number }[];
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: [], error: new Error('Not authenticated') };
  }

  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - months);

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('amount, type, date')
    .eq('advisor_id', user.id)
    .eq('status', 'completed')
    .gte('date', fromDate.toISOString())
    .order('date', { ascending: true });

  if (error || !transactions) {
    return { data: [], error };
  }

  // Group by month
  const monthlyData: Record<string, { income: number; payouts: number }> = {};

  transactions.forEach((t) => {
    const monthKey = new Date(t.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, payouts: 0 };
    }

    const amount = parseFloat(t.amount.replace(/[^0-9.-]+/g, '')) || 0;

    if (t.type === 'income') {
      monthlyData[monthKey].income += amount;
    } else if (t.type === 'payout') {
      monthlyData[monthKey].payouts += amount;
    }
  });

  const data = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    ...values,
  }));

  return { data, error: null };
}

// ============ HELPERS ============

export const transactionTypeLabels: Record<string, string> = {
  income: 'Income',
  payout: 'Payout',
  fee: 'Platform Fee',
  subscription: 'Subscription',
  refund: 'Refund',
};

export const transactionStatusLabels: Record<string, string> = {
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  refunded: 'Refunded',
};

export function getTypeColor(type: string): string {
  switch (type) {
    case 'income':
      return 'text-green-600';
    case 'payout':
      return 'text-blue-600';
    case 'fee':
      return 'text-orange-600';
    case 'subscription':
      return 'text-purple-600';
    case 'refund':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'failed':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'refunded':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Format amount for display
 */
export function formatAmount(amount: string | number, type?: string): string {
  const numAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0 
    : amount;
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(numAmount));

  if (type === 'income') {
    return `+${formatted}`;
  } else if (type === 'payout' || type === 'fee') {
    return `-${formatted}`;
  }

  return formatted;
}

/**
 * Format date for display
 */
export function formatTransactionDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get card brand icon name
 */
export function getCardBrandIcon(brand: string): string {
  switch (brand.toLowerCase()) {
    case 'visa':
      return '💳 Visa';
    case 'mastercard':
      return '💳 Mastercard';
    case 'amex':
      return '💳 Amex';
    case 'discover':
      return '💳 Discover';
    default:
      return '💳 Card';
  }
}

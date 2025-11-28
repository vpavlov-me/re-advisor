import { supabase } from "@/lib/supabaseClient";

// Types
export interface Transaction {
  id: number;
  advisor_id: string;
  family_id?: number;
  amount: string;
  status: string;
  date: string;
  description?: string;
  type: "income" | "payout" | "fee" | "subscription";
  invoice_id?: string;
  created_at: string;
  family?: {
    id: number;
    name: string;
  };
}

export interface PaymentMethod {
  id: number;
  advisor_id: string;
  type: string;
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
  account_type: string;
  last4: string;
  is_default: boolean;
  created_at: string;
}

// Transactions
export async function getTransactions(limit = 50) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("advisor_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getTransactionsByFamily(familyId: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("family_id", familyId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTransaction(input: Omit<Transaction, "id" | "advisor_id" | "created_at" | "family">) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTransactionsStats() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type, status")
    .eq("advisor_id", user.id);

  if (error) throw error;

  let totalIncome = 0;
  let pendingPayments = 0;
  let totalFees = 0;

  data?.forEach(t => {
    const amount = parseFloat(t.amount.replace(/[^0-9.-]/g, "")) || 0;
    if (t.type === "income" && t.status === "completed") {
      totalIncome += amount;
    } else if (t.status === "pending") {
      pendingPayments += amount;
    } else if (t.type === "fee") {
      totalFees += amount;
    }
  });

  return { totalIncome, pendingPayments, totalFees };
}

// Payment Methods
export async function getPaymentMethods() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("advisor_id", user.id)
    .order("is_default", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addPaymentMethod(input: Omit<PaymentMethod, "id" | "advisor_id" | "created_at">) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // If this is default, unset other defaults
  if (input.is_default) {
    await supabase
      .from("payment_methods")
      .update({ is_default: false })
      .eq("advisor_id", user.id);
  }

  const { data, error } = await supabase
    .from("payment_methods")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function setDefaultPaymentMethod(id: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Unset all defaults
  await supabase
    .from("payment_methods")
    .update({ is_default: false })
    .eq("advisor_id", user.id);

  // Set new default
  const { data, error } = await supabase
    .from("payment_methods")
    .update({ is_default: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePaymentMethod(id: number) {
  const { error } = await supabase
    .from("payment_methods")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Bank Accounts
export async function getBankAccounts() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("bank_accounts")
    .select("*")
    .eq("advisor_id", user.id)
    .order("is_default", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addBankAccount(input: Omit<BankAccount, "id" | "advisor_id" | "created_at">) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // If this is default, unset other defaults
  if (input.is_default) {
    await supabase
      .from("bank_accounts")
      .update({ is_default: false })
      .eq("advisor_id", user.id);
  }

  const { data, error } = await supabase
    .from("bank_accounts")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function setDefaultBankAccount(id: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Unset all defaults
  await supabase
    .from("bank_accounts")
    .update({ is_default: false })
    .eq("advisor_id", user.id);

  // Set new default
  const { data, error } = await supabase
    .from("bank_accounts")
    .update({ is_default: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBankAccount(id: number) {
  const { error } = await supabase
    .from("bank_accounts")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

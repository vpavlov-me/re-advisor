// Messages Service - CRUD operations for conversations and messages
import { supabase } from './supabaseClient';

// Types
export interface Conversation {
  id: number;
  family_id: number;
  title?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  pinned: boolean;
  created_at: string;
  // Joined data
  family?: {
    name: string;
    status: string;
  };
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id?: string;
  sender_name?: string;
  content: string;
  read: boolean;
  is_own: boolean;
  created_at: string;
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  attachment_size?: number;
}

export interface ConversationParticipant {
  id: number;
  conversation_id: number;
  user_id?: string;
  family_member_id?: number;
  participant_name: string;
  role: 'owner' | 'member';
  added_at: string;
}

export interface CreateMessageInput {
  conversation_id: number;
  content: string;
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  attachment_size?: number;
}

// ============ CONVERSATIONS ============

/**
 * Get all conversations for the current advisor
 */
export async function getConversations(options?: {
  search?: string;
  pinnedOnly?: boolean;
  limit?: number;
}): Promise<{ data: Conversation[] | null; error: Error | null }> {
  let query = supabase
    .from('conversations')
    .select(`
      *,
      family:families(name, status)
    `)
    .order('pinned', { ascending: false })
    .order('last_message_time', { ascending: false });

  if (options?.pinnedOnly) {
    query = query.eq('pinned', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  // Filter by search if provided
  let filtered = data;
  if (options?.search && data) {
    const search = options.search.toLowerCase();
    filtered = data.filter(
      (c) =>
        c.title?.toLowerCase().includes(search) ||
        c.family?.name?.toLowerCase().includes(search) ||
        c.last_message?.toLowerCase().includes(search)
    );
  }

  return { data: filtered, error };
}

/**
 * Get a single conversation by ID
 */
export async function getConversation(conversationId: number): Promise<{
  data: Conversation | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      family:families(name, status)
    `)
    .eq('id', conversationId)
    .single();

  return { data, error };
}

/**
 * Create a new conversation for a family
 */
export async function createConversation(
  familyId: number,
  title?: string
): Promise<{ data: Conversation | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      family_id: familyId,
      title,
      unread_count: 0,
      pinned: false,
    })
    .select(`
      *,
      family:families(name, status)
    `)
    .single();

  return { data, error };
}

/**
 * Toggle pinned status for a conversation
 */
export async function togglePinConversation(
  conversationId: number,
  pinned: boolean
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('conversations')
    .update({ pinned })
    .eq('id', conversationId);

  return { success: !error, error };
}

/**
 * Mark conversation as read (reset unread count)
 */
export async function markConversationAsRead(conversationId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  // Update conversation unread count
  const { error: convError } = await supabase
    .from('conversations')
    .update({ unread_count: 0 })
    .eq('id', conversationId);

  // Mark all messages as read
  const { error: msgError } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('conversation_id', conversationId)
    .eq('is_own', false);

  return { success: !convError && !msgError, error: convError || msgError };
}

/**
 * Delete a conversation and all its messages
 */
export async function deleteConversation(conversationId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId);

  return { success: !error, error };
}

// ============ PARTICIPANTS ============

/**
 * Get participants for a conversation
 */
export async function getConversationParticipants(
  conversationId: number
): Promise<{ data: ConversationParticipant[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('conversation_participants')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('added_at', { ascending: true });

  return { data, error };
}

/**
 * Add a participant to a conversation
 */
export async function addConversationParticipant(input: {
  conversation_id: number;
  family_member_id?: number;
  user_id?: string;
  participant_name: string;
  role?: 'owner' | 'member';
}): Promise<{ data: ConversationParticipant | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('conversation_participants')
    .insert({
      conversation_id: input.conversation_id,
      family_member_id: input.family_member_id,
      user_id: input.user_id,
      participant_name: input.participant_name,
      role: input.role || 'member',
      added_by: user?.id,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Remove a participant from a conversation
 */
export async function removeConversationParticipant(
  participantId: number
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('conversation_participants')
    .delete()
    .eq('id', participantId);

  return { success: !error, error };
}

// ============ MESSAGES ============

/**
 * Get messages for a conversation
 */
export async function getMessages(
  conversationId: number,
  options?: {
    limit?: number;
    before?: string; // ISO date string for pagination
  }
): Promise<{ data: Message[] | null; error: Error | null }> {
  let query = supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (options?.before) {
    query = query.lt('created_at', options.before);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Send a new message
 */
export async function sendMessage(input: CreateMessageInput): Promise<{
  data: Message | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // Get user's profile for sender name
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single();

  const senderName = profile
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    : 'You';

  // Insert message with optional attachment
  const { data: message, error: msgError } = await supabase
    .from('messages')
    .insert({
      conversation_id: input.conversation_id,
      sender_id: user.id,
      sender_name: senderName,
      content: input.content,
      read: true,
      is_own: true,
      attachment_url: input.attachment_url,
      attachment_name: input.attachment_name,
      attachment_type: input.attachment_type,
      attachment_size: input.attachment_size,
    })
    .select()
    .single();

  if (msgError) {
    return { data: null, error: msgError };
  }

  // Update conversation's last message
  const lastMessageText = input.attachment_name 
    ? `📎 ${input.attachment_name}` 
    : input.content;
    
  await supabase
    .from('conversations')
    .update({
      last_message: lastMessageText,
      last_message_time: new Date().toISOString(),
    })
    .eq('id', input.conversation_id);

  return { data: message, error: null };
}

/**
 * Delete a message
 */
export async function deleteMessage(messageId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId);

  return { success: !error, error };
}

// ============ REAL-TIME SUBSCRIPTIONS ============

/**
 * Subscribe to new messages in a conversation
 */
export function subscribeToMessages(
  conversationId: number,
  onNewMessage: (message: Message) => void
) {
  const channel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onNewMessage(payload.new as Message);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to conversation updates (new messages, etc.)
 */
export function subscribeToConversations(
  onUpdate: (conversation: Conversation) => void
) {
  const channel = supabase
    .channel('conversations')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
      },
      async (payload) => {
        // Fetch full conversation data with family
        if (payload.new && 'id' in payload.new) {
          const { data } = await getConversation(payload.new.id as number);
          if (data) {
            onUpdate(data);
          }
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ============ STATISTICS ============

/**
 * Get messaging statistics
 */
export async function getMessagingStats(): Promise<{
  totalConversations: number;
  unreadCount: number;
  pinnedCount: number;
  error: Error | null;
}> {
  const { count: totalConversations } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true });

  const { data: conversations } = await supabase
    .from('conversations')
    .select('unread_count, pinned');

  const unreadCount = conversations?.reduce((sum, c) => sum + (c.unread_count || 0), 0) || 0;
  const pinnedCount = conversations?.filter((c) => c.pinned).length || 0;

  return {
    totalConversations: totalConversations || 0,
    unreadCount,
    pinnedCount,
    error: null,
  };
}

// ============ HELPERS ============

/**
 * Format message time for display
 */
export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get initials from name for avatar fallback
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

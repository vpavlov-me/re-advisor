import { supabase } from "@/lib/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

// Types
export interface Conversation {
  id: number;
  family_id: number;
  title?: string;
  last_message?: string;
  last_message_time: string;
  unread_count: number;
  pinned: boolean;
  created_at: string;
  family?: {
    id: number;
    name: string;
  };
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id?: string;
  sender_name: string;
  content: string;
  read: boolean;
  is_own: boolean;
  created_at: string;
}

export interface CreateMessageInput {
  conversation_id: number;
  content: string;
}

// Conversations CRUD
export async function getConversations() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      family:families!inner(id, name, advisor_id)
    `)
    .eq("family.advisor_id", user.id)
    .order("pinned", { ascending: false })
    .order("last_message_time", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getConversation(id: number) {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createConversation(familyId: number, title?: string) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([{
      family_id: familyId,
      title: title,
      unread_count: 0,
      pinned: false
    }])
    .select(`
      *,
      family:families(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function togglePinConversation(id: number, pinned: boolean) {
  const { data, error } = await supabase
    .from("conversations")
    .update({ pinned })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteConversation(id: number) {
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Messages CRUD
export async function getMessages(conversationId: number, limit = 50) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function sendMessage(input: CreateMessageInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get user's name from profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const senderName = profile 
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "You"
    : "You";

  const { data, error } = await supabase
    .from("messages")
    .insert([{
      conversation_id: input.conversation_id,
      sender_id: user.id,
      sender_name: senderName,
      content: input.content,
      is_own: true,
      read: true
    }])
    .select()
    .single();

  if (error) throw error;

  // Update conversation's last message
  await supabase
    .from("conversations")
    .update({
      last_message: input.content.substring(0, 100),
      last_message_time: new Date().toISOString()
    })
    .eq("id", input.conversation_id);

  return data;
}

export async function markMessageAsRead(id: number) {
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function markConversationAsRead(conversationId: number) {
  const { error: messagesError } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .eq("read", false);

  if (messagesError) throw messagesError;

  const { error: convError } = await supabase
    .from("conversations")
    .update({ unread_count: 0 })
    .eq("id", conversationId);

  if (convError) throw convError;

  return true;
}

// Real-time subscriptions
export function subscribeToMessages(
  conversationId: number,
  onMessage: (message: Message) => void
): RealtimeChannel {
  const channel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        onMessage(payload.new as Message);
      }
    )
    .subscribe();

  return channel;
}

export function subscribeToConversations(
  onUpdate: (conversation: Conversation) => void
): RealtimeChannel {
  const channel = supabase
    .channel("conversations")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations"
      },
      (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          onUpdate(payload.new as Conversation);
        }
      }
    )
    .subscribe();

  return channel;
}

export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel);
}

// Search messages
export async function searchMessages(query: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      conversation:conversations!inner(
        id,
        family:families!inner(id, name, advisor_id)
      )
    `)
    .eq("conversation.family.advisor_id", user.id)
    .ilike("content", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return data;
}

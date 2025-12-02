/**
 * Messaging Hook
 * 
 * Centralized hook for managing messaging state and real-time subscriptions.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Message {
  id: number;
  conversationId: number;
  senderId: string | null;
  senderName: string;
  content: string;
  createdAt: string;
  isOwn: boolean;
  read: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: number;
  familyId: number;
  familyName: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pinned: boolean;
  participants: string[];
}

export interface UseMessagingResult {
  // State
  isLoading: boolean;
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: Conversation | null;
  
  // Actions
  selectConversation: (conversation: Conversation) => void;
  sendMessage: (content: string) => Promise<{ success: boolean; error: string | null }>;
  createConversation: (familyId: number, title: string) => Promise<{ conversation: Conversation | null; error: string | null }>;
  markAsRead: (conversationId: number) => Promise<void>;
  refresh: () => Promise<void>;
  
  // Real-time state
  typingUsers: string[];
  setTyping: (isTyping: boolean) => void;
  
  // Error state
  error: string | null;
}

export function useMessaging(userId: string | null): UseMessagingResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const typingChannelRef = useRef<RealtimeChannel | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time for display
  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  }, []);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!userId || !isSupabaseConfigured()) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('conversations')
        .select(`
          *,
          family:families!inner(name, advisor_id)
        `)
        .eq('family.advisor_id', userId)
        .order('last_message_time', { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        const mapped: Conversation[] = data.map((c: Record<string, unknown>) => ({
          id: c.id as number,
          familyId: c.family_id as number,
          familyName: (c.family as Record<string, unknown>)?.name as string || 'Unknown',
          title: c.title as string || 'Untitled',
          lastMessage: c.last_message as string || '',
          lastMessageTime: c.last_message_time ? formatTime(c.last_message_time as string) : '',
          unreadCount: c.unread_count as number || 0,
          pinned: c.pinned as boolean || false,
          participants: [],
        }));
        setConversations(mapped);
        
        // Auto-select first conversation if none selected
        if (!selectedConversation && mapped.length > 0) {
          setSelectedConversation(mapped[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    }
  }, [userId, formatTime, selectedConversation]);

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async (conversationId: number) => {
    if (!userId || !isSupabaseConfigured()) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        const mapped: Message[] = data.map((m: Record<string, unknown>) => ({
          id: m.id as number,
          conversationId: m.conversation_id as number,
          senderId: m.sender_id as string | null,
          senderName: m.sender_name as string || 'Unknown',
          content: m.content as string,
          createdAt: m.created_at as string,
          isOwn: m.sender_id === userId,
          read: m.read as boolean || false,
          status: 'delivered' as const,
        }));
        setMessages(mapped);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [userId]);

  // Select conversation and load messages
  const selectConversation = useCallback((conversation: Conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
  }, [fetchMessages]);

  // Send message
  const sendMessage = useCallback(async (content: string): Promise<{ success: boolean; error: string | null }> => {
    if (!selectedConversation || !userId || !content.trim()) {
      return { success: false, error: 'Invalid message or no conversation selected' };
    }

    const tempId = Date.now();
    const tempMessage: Message = {
      id: tempId,
      conversationId: selectedConversation.id,
      senderId: userId,
      senderName: 'You',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isOwn: true,
      read: false,
      status: 'sending',
    };

    // Optimistic update
    setMessages(prev => [...prev, tempMessage]);

    try {
      const { data, error: insertError } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: userId,
          sender_name: 'You',
          content: content.trim(),
          is_own: true,
          read: false,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Update with real ID
      setMessages(prev => prev.map(m => 
        m.id === tempId 
          ? { ...m, id: data?.id || tempId, status: 'sent' as const }
          : m
      ));

      // Update conversation's last message
      await supabase
        .from('conversations')
        .update({
          last_message: content.trim(),
          last_message_time: new Date().toISOString(),
        })
        .eq('id', selectedConversation.id);

      // Update local conversations list
      setConversations(prev => prev.map(c =>
        c.id === selectedConversation.id
          ? { ...c, lastMessage: content.trim(), lastMessageTime: 'Just now' }
          : c
      ));

      return { success: true, error: null };
    } catch (err) {
      console.error('Error sending message:', err);
      // Mark as sent even on error (optimistic)
      setMessages(prev => prev.map(m => 
        m.id === tempId ? { ...m, status: 'sent' as const } : m
      ));
      return { success: false, error: 'Failed to send message' };
    }
  }, [selectedConversation, userId]);

  // Create new conversation
  const createConversation = useCallback(async (familyId: number, title: string): Promise<{ conversation: Conversation | null; error: string | null }> => {
    if (!userId) {
      return { conversation: null, error: 'Not authenticated' };
    }

    try {
      const { data, error: insertError } = await supabase
        .from('conversations')
        .insert({
          family_id: familyId,
          title: title || 'New Conversation',
          last_message: 'Started a new conversation',
          last_message_time: new Date().toISOString(),
          unread_count: 0,
          pinned: false,
        })
        .select(`
          *,
          family:families(name)
        `)
        .single();

      if (insertError) throw insertError;

      const newConversation: Conversation = {
        id: data.id,
        familyId: data.family_id,
        familyName: data.family?.name || 'Unknown',
        title: data.title,
        lastMessage: data.last_message,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        pinned: false,
        participants: [],
      };

      setConversations(prev => [newConversation, ...prev]);
      setSelectedConversation(newConversation);
      setMessages([]);

      return { conversation: newConversation, error: null };
    } catch (err) {
      console.error('Error creating conversation:', err);
      return { conversation: null, error: 'Failed to create conversation' };
    }
  }, [userId]);

  // Mark conversation as read
  const markAsRead = useCallback(async (conversationId: number) => {
    try {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('conversation_id', conversationId)
        .eq('read', false);

      await supabase
        .from('conversations')
        .update({ unread_count: 0 })
        .eq('id', conversationId);

      setConversations(prev => prev.map(c =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, []);

  // Set typing indicator - broadcasts to other users via Supabase Realtime
  const setTyping = useCallback((isTyping: boolean) => {
    if (!selectedConversation || !userId) return;
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Broadcast typing status
    const channel = supabase.channel(`typing-${selectedConversation.id}`);
    channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        userId,
        userName: 'You', // In real app, get from profile
        isTyping,
        conversationId: selectedConversation.id,
      },
    });

    // Auto-clear typing after 3 seconds of inactivity
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        channel.send({
          type: 'broadcast',
          event: 'typing',
          payload: {
            userId,
            userName: 'You',
            isTyping: false,
            conversationId: selectedConversation.id,
          },
        });
      }, 3000);
    }
  }, [selectedConversation, userId]);

  // Refresh all data
  const refresh = useCallback(async () => {
    setIsLoading(true);
    await fetchConversations();
    if (selectedConversation) {
      await fetchMessages(selectedConversation.id);
    }
    setIsLoading(false);
  }, [fetchConversations, fetchMessages, selectedConversation]);

  // Initial load
  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchConversations().finally(() => setIsLoading(false));
    }
  }, [userId, fetchConversations]);

  // Set up real-time subscription for selected conversation
  useEffect(() => {
    if (!selectedConversation || !userId) return;

    // Clean up previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${selectedConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Record<string, unknown>;
          
          // Skip if it's our own message (already added optimistically)
          if (newMsg.sender_id === userId) return;

          const message: Message = {
            id: newMsg.id as number,
            conversationId: newMsg.conversation_id as number,
            senderId: newMsg.sender_id as string | null,
            senderName: newMsg.sender_name as string || 'Unknown',
            content: newMsg.content as string,
            createdAt: newMsg.created_at as string,
            isOwn: false,
            read: false,
            status: 'delivered',
          };

          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === message.id)) return prev;
            return [...prev, message];
          });
        }
      )
      .subscribe();

    channelRef.current = channel;

    // Set up typing indicator subscription
    if (typingChannelRef.current) {
      supabase.removeChannel(typingChannelRef.current);
    }

    const typingChannel = supabase
      .channel(`typing-${selectedConversation.id}`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        const { userId: typingUserId, userName, isTyping } = payload.payload as {
          userId: string;
          userName: string;
          isTyping: boolean;
          conversationId: number;
        };

        // Ignore our own typing events
        if (typingUserId === userId) return;

        setTypingUsers(prev => {
          if (isTyping) {
            // Add user if not already in list
            if (!prev.includes(userName)) {
              return [...prev, userName];
            }
            return prev;
          } else {
            // Remove user from list
            return prev.filter(u => u !== userName);
          }
        });
      })
      .subscribe();

    typingChannelRef.current = typingChannel;

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [selectedConversation?.id, userId]);

  return {
    isLoading,
    conversations,
    messages,
    selectedConversation,
    selectConversation,
    sendMessage,
    createConversation,
    markAsRead,
    refresh,
    typingUsers,
    setTyping,
    error,
  };
}

/**
 * Workshop Real-time Hook
 *
 * Comprehensive hook for managing all real-time features in VMV workshops
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import {
  subscribeToPresence,
  trackPresence,
  untrackPresence,
  subscribeToWorkshopUpdates,
  subscribeToParticipantUpdates,
  subscribeToMessages,
  sendMessage as sendMessageAPI,
  subscribeToTyping,
  broadcastTyping,
  subscribeToValueSelections,
  getValueSelectionStats,
  subscribeToCollaborativeEdits,
  subscribeToVotes,
  getVotingStats,
  subscribeToStageProgress,
  getOnlineParticipants,
  isParticipantOnline,
  subscribeToCursors,
  broadcastCursor,
  type WorkshopParticipant,
  type WorkshopMessage,
  type WorkshopPresence,
  type TypingIndicator,
  type ValueSelection,
} from '@/lib/workshops/vmv-realtime.service';

// ============ TYPES ============

export interface UseWorkshopRealtimeOptions {
  workshopId: number;
  currentParticipantId?: number;
  currentParticipantName?: string;
  currentStage?: number;
  autoConnect?: boolean;
}

export interface UseWorkshopRealtimeResult {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  // Presence
  onlineParticipants: WorkshopPresence[];
  isParticipantOnline: (participantId: number) => boolean;
  participantsByStage: Record<number, number>;

  // Workshop state
  workshopState: any;
  participants: WorkshopParticipant[];

  // Messages
  messages: WorkshopMessage[];
  sendMessage: (message: string) => Promise<void>;
  typingUsers: string[];
  setTyping: (isTyping: boolean) => void;

  // Value selections
  valueStats: Record<string, { count: number; percentage: number; participants: number[] }>;
  refreshValueStats: () => Promise<void>;

  // Voting
  votingStats: { total: number; byOption: Record<string, number> } | null;
  refreshVotingStats: (voteType: 'value_final' | 'mission_approve' | 'mission_revise') => Promise<void>;

  // Stage progress
  stageProgress: any[];

  // Collaborative editing
  cursors: Map<number, { name: string; position: { x: number; y: number } | null }>;
  updateCursor: (position: { x: number; y: number } | null) => void;

  // Control
  connect: () => void;
  disconnect: () => void;
}

// ============ HOOK ============

export function useWorkshopRealtime({
  workshopId,
  currentParticipantId,
  currentParticipantName,
  currentStage = 1,
  autoConnect = true,
}: UseWorkshopRealtimeOptions): UseWorkshopRealtimeResult {
  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Presence
  const [presenceState, setPresenceState] = useState<Record<string, WorkshopPresence[]>>({});
  const [onlineParticipants, setOnlineParticipants] = useState<WorkshopPresence[]>([]);
  const [participantsByStage, setParticipantsByStage] = useState<Record<number, number>>({});

  // Workshop state
  const [workshopState, setWorkshopState] = useState<any>(null);
  const [participants, setParticipants] = useState<WorkshopParticipant[]>([]);

  // Messages & Typing
  const [messages, setMessages] = useState<WorkshopMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Value selections
  const [valueStats, setValueStats] = useState<Record<string, { count: number; percentage: number; participants: number[] }>>({});

  // Voting
  const [votingStats, setVotingStats] = useState<{ total: number; byOption: Record<string, number> } | null>(null);

  // Stage progress
  const [stageProgress, setStageProgress] = useState<any[]>([]);

  // Collaborative editing
  const [cursors, setCursors] = useState<Map<number, { name: string; position: { x: number; y: number } | null }>>(new Map());

  // Channel refs
  const presenceChannelRef = useRef<RealtimeChannel | null>(null);
  const typingChannelRef = useRef<RealtimeChannel | null>(null);
  const cursorChannelRef = useRef<RealtimeChannel | null>(null);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  // ============ PRESENCE ============

  const setupPresence = useCallback(() => {
    if (!currentParticipantId || !currentParticipantName) return;

    const channel = subscribeToPresence(workshopId, (state) => {
      setPresenceState(state);
      const online = getOnlineParticipants(state);
      setOnlineParticipants(online);

      // Calculate participants by stage
      const byStage: Record<number, number> = {};
      online.forEach((p) => {
        byStage[p.current_stage] = (byStage[p.current_stage] || 0) + 1;
      });
      setParticipantsByStage(byStage);
    });

    // Track own presence
    trackPresence(channel, {
      user_id: '', // Get from auth if needed
      participant_id: currentParticipantId,
      participant_name: currentParticipantName,
      online_at: new Date().toISOString(),
      current_stage: currentStage,
    });

    presenceChannelRef.current = channel;
  }, [workshopId, currentParticipantId, currentParticipantName, currentStage]);

  // ============ WORKSHOP STATE ============

  const setupWorkshopSubscriptions = useCallback(() => {
    // Subscribe to workshop updates
    const unsubWorkshop = subscribeToWorkshopUpdates(workshopId, (payload) => {
      setWorkshopState(payload);
    });
    cleanupFunctionsRef.current.push(unsubWorkshop);

    // Subscribe to participant updates
    const unsubParticipants = subscribeToParticipantUpdates(workshopId, (participant) => {
      setParticipants((prev) => {
        const existing = prev.findIndex((p) => p.id === participant.id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = participant;
          return updated;
        }
        return [...prev, participant];
      });
    });
    cleanupFunctionsRef.current.push(unsubParticipants);

    // Subscribe to stage progress
    const unsubProgress = subscribeToStageProgress(workshopId, (progress) => {
      setStageProgress((prev) => {
        const existing = prev.findIndex((p) => p.stage === progress.stage);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = progress;
          return updated;
        }
        return [...prev, progress];
      });
    });
    cleanupFunctionsRef.current.push(unsubProgress);
  }, [workshopId]);

  // ============ MESSAGES & TYPING ============

  const setupMessaging = useCallback(() => {
    // Subscribe to messages
    const unsubMessages = subscribeToMessages(workshopId, (message) => {
      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });
    cleanupFunctionsRef.current.push(unsubMessages);

    // Subscribe to typing indicators
    const typingChannel = subscribeToTyping(workshopId, (indicator) => {
      if (indicator.participant_id === currentParticipantId) return; // Ignore own typing

      setTypingUsers((prev) => {
        if (indicator.is_typing) {
          if (!prev.includes(indicator.participant_name)) {
            return [...prev, indicator.participant_name];
          }
          return prev;
        } else {
          return prev.filter((name) => name !== indicator.participant_name);
        }
      });
    });

    typingChannelRef.current = typingChannel;
  }, [workshopId, currentParticipantId]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!currentParticipantId || !message.trim()) return;

      await sendMessageAPI(workshopId, currentParticipantId, message.trim());
    },
    [workshopId, currentParticipantId]
  );

  const setTyping = useCallback(
    (isTyping: boolean) => {
      if (!typingChannelRef.current || !currentParticipantId || !currentParticipantName) return;

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      // Broadcast typing status
      broadcastTyping(typingChannelRef.current, currentParticipantId, currentParticipantName, isTyping);

      // Auto-clear after 3 seconds
      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          if (typingChannelRef.current) {
            broadcastTyping(typingChannelRef.current, currentParticipantId, currentParticipantName, false);
          }
        }, 3000);
      }
    },
    [currentParticipantId, currentParticipantName]
  );

  // ============ VALUE SELECTIONS ============

  const setupValueSelections = useCallback(() => {
    const unsubValues = subscribeToValueSelections(
      workshopId,
      () => refreshValueStats(), // Refresh on insert
      () => refreshValueStats()  // Refresh on delete
    );
    cleanupFunctionsRef.current.push(unsubValues);
  }, [workshopId]);

  const refreshValueStats = useCallback(async () => {
    const { data, error } = await getValueSelectionStats(workshopId);
    if (data) {
      setValueStats(data);
    }
  }, [workshopId]);

  // ============ VOTING ============

  const refreshVotingStats = useCallback(
    async (voteType: 'value_final' | 'mission_approve' | 'mission_revise') => {
      const { data, error } = await getVotingStats(workshopId, voteType);
      if (data) {
        setVotingStats(data);
      }
    },
    [workshopId]
  );

  const setupVoting = useCallback(() => {
    const unsubVotes = subscribeToVotes(workshopId, () => {
      // Refresh voting stats on any vote change
      // Note: caller should specify which vote type to track
    });
    cleanupFunctionsRef.current.push(unsubVotes);
  }, [workshopId]);

  // ============ COLLABORATIVE EDITING ============

  const setupCollaborativeEditing = useCallback(() => {
    // Subscribe to cursors
    const cursorChannel = subscribeToCursors(workshopId, (cursor) => {
      if (cursor.participant_id === currentParticipantId) return; // Ignore own cursor

      setCursors((prev) => {
        const updated = new Map(prev);
        if (cursor.position) {
          updated.set(cursor.participant_id, {
            name: cursor.participant_name,
            position: cursor.position,
          });
        } else {
          updated.delete(cursor.participant_id);
        }
        return updated;
      });
    });

    cursorChannelRef.current = cursorChannel;
  }, [workshopId, currentParticipantId]);

  const updateCursor = useCallback(
    (position: { x: number; y: number } | null) => {
      if (!cursorChannelRef.current || !currentParticipantId || !currentParticipantName) return;

      broadcastCursor(cursorChannelRef.current, currentParticipantId, currentParticipantName, position);
    },
    [currentParticipantId, currentParticipantName]
  );

  // ============ CONNECTION MANAGEMENT ============

  const connect = useCallback(async () => {
    if (isConnected || isConnecting) return;

    setIsConnecting(true);
    setError(null);

    try {
      setupPresence();
      setupWorkshopSubscriptions();
      setupMessaging();
      setupValueSelections();
      setupVoting();
      setupCollaborativeEditing();

      // Initial data fetch
      await refreshValueStats();

      setIsConnected(true);
    } catch (err) {
      console.error('Failed to connect to workshop:', err);
      setError('Failed to connect to workshop');
    } finally {
      setIsConnecting(false);
    }
  }, [
    isConnected,
    isConnecting,
    setupPresence,
    setupWorkshopSubscriptions,
    setupMessaging,
    setupValueSelections,
    setupVoting,
    setupCollaborativeEditing,
    refreshValueStats,
  ]);

  const disconnect = useCallback(() => {
    // Cleanup all subscriptions
    cleanupFunctionsRef.current.forEach((cleanup) => cleanup());
    cleanupFunctionsRef.current = [];

    // Untrack presence
    if (presenceChannelRef.current) {
      untrackPresence(presenceChannelRef.current);
      presenceChannelRef.current = null;
    }

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    setIsConnected(false);
  }, []);

  // ============ EFFECTS ============

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect && !isConnected) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, workshopId]);

  // Check if participant is online
  const checkIsParticipantOnline = useCallback(
    (participantId: number): boolean => {
      return isParticipantOnline(presenceState, participantId);
    },
    [presenceState]
  );

  // ============ RETURN ============

  return {
    // Connection
    isConnected,
    isConnecting,
    error,

    // Presence
    onlineParticipants,
    isParticipantOnline: checkIsParticipantOnline,
    participantsByStage,

    // Workshop state
    workshopState,
    participants,

    // Messages
    messages,
    sendMessage,
    typingUsers,
    setTyping,

    // Value selections
    valueStats,
    refreshValueStats,

    // Voting
    votingStats,
    refreshVotingStats,

    // Stage progress
    stageProgress,

    // Collaborative editing
    cursors,
    updateCursor,

    // Control
    connect,
    disconnect,
  };
}

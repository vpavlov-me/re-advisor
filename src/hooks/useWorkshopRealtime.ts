/**
 * Real-time Workshop Hooks
 * 
 * React hooks for real-time synchronization of workshop state using Supabase real-time
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import type {
  Workshop,
  WorkshopStage,
  WorkshopState,
  WorkshopParticipant,
} from '@/types/workshop';
import { getWorkshopState } from '@/lib/services/workshop.service';

export interface UseWorkshopRealtimeOptions {
  workshopId: string;
  enabled?: boolean;
  onWorkshopUpdate?: (workshop: Workshop) => void;
  onStageUpdate?: (stage: WorkshopStage) => void;
  onParticipantJoin?: (participant: WorkshopParticipant) => void;
  onParticipantLeave?: (participant: WorkshopParticipant) => void;
}

/**
 * Hook for real-time workshop state synchronization
 */
export function useWorkshopRealtime(options: UseWorkshopRealtimeOptions) {
  const {
    workshopId,
    enabled = true,
    onWorkshopUpdate,
    onStageUpdate,
    onParticipantJoin,
    onParticipantLeave,
  } = options;

  const [state, setState] = useState<WorkshopState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const subscriptionsRef = useRef<any[]>([]);

  // Load initial state
  const loadState = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getWorkshopState(workshopId);
      
      if (result.success && result.data) {
        setState(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to load workshop state');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workshopId]);

  // Setup real-time subscriptions
  useEffect(() => {
    if (!enabled || !isSupabaseConfigured()) {
      // In demo mode, just load initial state
      loadState();
      return;
    }

    loadState();

    // Subscribe to workshop changes
    const workshopChannel = supabase
      .channel(`workshop:${workshopId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workshops',
          filter: `id=eq.${workshopId}`,
        },
        (payload) => {
          const updated = payload.new as Workshop;
          setState((prev) => prev ? { ...prev, workshop: updated } : null);
          
          if (onWorkshopUpdate) {
            onWorkshopUpdate(updated);
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    subscriptionsRef.current.push(workshopChannel);

    // Subscribe to stage changes
    const stagesChannel = supabase
      .channel(`workshop-stages:${workshopId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_stages',
          filter: `workshop_id=eq.${workshopId}`,
        },
        (payload) => {
          const stage = payload.new as WorkshopStage;
          
          setState((prev) => {
            if (!prev || !prev.workshop) return prev;
            
            const updatedStages = prev.stages.map((s) =>
              s.id === stage.id ? stage : s
            );
            
            const currentStage = updatedStages.find((s) => s.id === prev.workshop.current_stage_id);
            
            return {
              ...prev,
              stages: updatedStages,
              currentStage: currentStage || prev.currentStage,
            };
          });
          
          if (onStageUpdate) {
            onStageUpdate(stage);
          }
        }
      )
      .subscribe();

    subscriptionsRef.current.push(stagesChannel);

    // Subscribe to participant changes
    const participantsChannel = supabase
      .channel(`workshop-participants:${workshopId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'workshop_participants',
          filter: `workshop_id=eq.${workshopId}`,
        },
        (payload) => {
          const participant = payload.new as WorkshopParticipant;
          
          setState((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              participants: [...prev.participants, participant],
            };
          });
          
          if (onParticipantJoin) {
            onParticipantJoin(participant);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workshop_participants',
          filter: `workshop_id=eq.${workshopId}`,
        },
        (payload) => {
          const participant = payload.new as WorkshopParticipant;
          
          setState((prev) => {
            if (!prev) return null;
            
            const updatedParticipants = prev.participants.map((p) =>
              p.id === participant.id ? participant : p
            );
            
            return {
              ...prev,
              participants: updatedParticipants,
            };
          });
          
          if (participant.left_at && onParticipantLeave) {
            onParticipantLeave(participant);
          }
        }
      )
      .subscribe();

    subscriptionsRef.current.push(participantsChannel);

    // Cleanup subscriptions
    return () => {
      subscriptionsRef.current.forEach((channel) => {
        supabase.removeChannel(channel);
      });
      subscriptionsRef.current = [];
      setIsConnected(false);
    };
  }, [workshopId, enabled, onWorkshopUpdate, onStageUpdate, onParticipantJoin, onParticipantLeave, loadState]);

  return {
    state,
    loading,
    error,
    isConnected,
    refresh: loadState,
  };
}

/**
 * Hook for monitoring workshop participants in real-time
 */
export function useWorkshopParticipants(workshopId: string, enabled = true) {
  const [participants, setParticipants] = useState<WorkshopParticipant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled || !isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Load initial participants
    const loadParticipants = async () => {
      try {
        const { data, error } = await supabase
          .from('workshop_participants')
          .select('*')
          .eq('workshop_id', workshopId)
          .is('left_at', null);

        if (error) throw error;
        
        setParticipants(data || []);
      } catch (err) {
        console.error('Failed to load participants:', err);
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();

    // Subscribe to changes
    const channel = supabase
      .channel(`participants:${workshopId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_participants',
          filter: `workshop_id=eq.${workshopId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setParticipants((prev) => [...prev, payload.new as WorkshopParticipant]);
          } else if (payload.eventType === 'UPDATE') {
            setParticipants((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? (payload.new as WorkshopParticipant) : p
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setParticipants((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId, enabled]);

  const activeParticipants = participants.filter((p) => !p.left_at);

  return {
    participants,
    activeParticipants,
    loading,
    count: activeParticipants.length,
  };
}

/**
 * Hook for presence tracking in workshops
 */
export function useWorkshopPresence(workshopId: string, userId: string, enabled = true) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !isSupabaseConfigured()) {
      return;
    }

    const channel = supabase.channel(`presence:workshop:${workshopId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        console.log('User joined:', key);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('User left:', key);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [workshopId, userId, enabled]);

  return {
    onlineUsers,
    isOnline: onlineUsers.includes(userId),
    count: onlineUsers.length,
  };
}

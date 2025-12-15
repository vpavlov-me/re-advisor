/**
 * VMV Workshop Real-time Service
 *
 * Handles all real-time features for VMV workshops including:
 * - Presence tracking (who's online)
 * - Live chat messages
 * - Value selection updates
 * - Collaborative editing
 * - Workshop state synchronization
 * - Typing indicators
 */

import { supabase } from '@/lib/supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

// ============ TYPES ============

export interface WorkshopParticipant {
  id: number;
  workshop_id: number;
  family_member_id: number | null;
  guest_email: string | null;
  guest_name: string | null;
  status: 'invited' | 'confirmed' | 'declined' | 'attended';
  current_stage: number;
  // Real-time presence
  is_online?: boolean;
  last_seen?: string;
}

export interface WorkshopMessage {
  id: number;
  workshop_id: number;
  participant_id: number | null;
  message: string;
  message_type: 'chat' | 'system' | 'ai';
  created_at: string;
  // Joined data
  participant_name?: string;
  avatar_url?: string;
}

export interface ValueSelection {
  id: number;
  workshop_id: number;
  participant_id: number;
  value_name: string;
  is_custom: boolean;
  selected_at: string;
}

export interface WorkshopPresence {
  user_id: string;
  participant_id: number;
  participant_name: string;
  online_at: string;
  current_stage: number;
}

export interface TypingIndicator {
  participant_id: number;
  participant_name: string;
  is_typing: boolean;
}

// ============ PRESENCE TRACKING ============

/**
 * Subscribe to participant presence updates
 */
export function subscribeToPresence(
  workshopId: number,
  onPresenceSync: (presence: Record<string, WorkshopPresence[]>) => void
) {
  const channel = supabase.channel(`workshop:${workshopId}:presence`, {
    config: {
      presence: {
        key: 'participant_id',
      },
    },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState<WorkshopPresence>();
      onPresenceSync(state);
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('Participant joined:', key, newPresences);
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('Participant left:', key, leftPresences);
    })
    .subscribe();

  return channel;
}

/**
 * Track current user's presence
 */
export function trackPresence(
  channel: RealtimeChannel,
  presence: WorkshopPresence
) {
  return channel.track(presence);
}

/**
 * Untrack presence and cleanup
 */
export function untrackPresence(channel: RealtimeChannel) {
  return supabase.removeChannel(channel);
}

// ============ WORKSHOP STATE SUBSCRIPTIONS ============

/**
 * Subscribe to workshop session updates (stage changes, status, etc.)
 */
export function subscribeToWorkshopUpdates(
  workshopId: number,
  onUpdate: (payload: any) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:session`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'vmv_workshop_sessions',
        filter: `id=eq.${workshopId}`,
      },
      (payload) => {
        onUpdate(payload.new);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Subscribe to participant updates (stage progress, status, etc.)
 */
export function subscribeToParticipantUpdates(
  workshopId: number,
  onUpdate: (participant: WorkshopParticipant) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:participants`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vmv_workshop_participants',
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        if (payload.new) {
          onUpdate(payload.new as WorkshopParticipant);
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

// ============ CHAT MESSAGES ============

/**
 * Subscribe to new chat messages
 */
export function subscribeToMessages(
  workshopId: number,
  onNewMessage: (message: WorkshopMessage) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:messages`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'vmv_workshop_messages',
        filter: `workshop_id=eq.${workshopId}`,
      },
      async (payload) => {
        const message = payload.new as WorkshopMessage;

        // Fetch participant details if available
        if (message.participant_id) {
          const { data: participant } = await supabase
            .from('vmv_workshop_participants')
            .select(`
              id,
              guest_name,
              family_member:family_members(
                user:profiles(first_name, last_name, avatar_url)
              )
            `)
            .eq('id', message.participant_id)
            .single();

          if (participant) {
            const familyMember = participant.family_member as any;
            message.participant_name =
              participant.guest_name ||
              (familyMember?.user ?
                `${familyMember.user.first_name} ${familyMember.user.last_name}`.trim() :
                'Anonymous');
            message.avatar_url = familyMember?.user?.avatar_url;
          }
        }

        onNewMessage(message);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Send a chat message
 */
export async function sendMessage(
  workshopId: number,
  participantId: number,
  message: string,
  messageType: 'chat' | 'system' | 'ai' = 'chat'
): Promise<{ data: WorkshopMessage | null; error: any }> {
  const { data, error } = await supabase
    .from('vmv_workshop_messages')
    .insert({
      workshop_id: workshopId,
      participant_id: participantId,
      message,
      message_type: messageType,
    })
    .select()
    .single();

  return { data, error };
}

// ============ TYPING INDICATORS ============

/**
 * Subscribe to typing indicators
 */
export function subscribeToTyping(
  workshopId: number,
  onTypingChange: (indicator: TypingIndicator) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:typing`)
    .on('broadcast', { event: 'typing' }, ({ payload }) => {
      onTypingChange(payload as TypingIndicator);
    })
    .subscribe();

  return channel;
}

/**
 * Broadcast typing indicator
 */
export function broadcastTyping(
  channel: RealtimeChannel,
  participantId: number,
  participantName: string,
  isTyping: boolean
) {
  channel.send({
    type: 'broadcast',
    event: 'typing',
    payload: {
      participant_id: participantId,
      participant_name: participantName,
      is_typing: isTyping,
    },
  });
}

// ============ VALUE SELECTIONS ============

/**
 * Subscribe to value selection updates
 */
export function subscribeToValueSelections(
  workshopId: number,
  onValueSelected: (selection: ValueSelection) => void,
  onValueDeselected: (selection: ValueSelection) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:values`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'vmv_value_selections',
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        onValueSelected(payload.new as ValueSelection);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'vmv_value_selections',
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        onValueDeselected(payload.old as ValueSelection);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Get live value selection statistics
 */
export async function getValueSelectionStats(workshopId: number): Promise<{
  data: Record<string, { count: number; percentage: number; participants: number[] }> | null;
  error: any;
}> {
  const { data: selections, error } = await supabase
    .from('vmv_value_selections')
    .select('value_name, participant_id')
    .eq('workshop_id', workshopId);

  if (error) return { data: null, error };

  // Get total participants
  const { count: totalParticipants } = await supabase
    .from('vmv_workshop_participants')
    .select('*', { count: 'exact', head: true })
    .eq('workshop_id', workshopId);

  // Calculate stats
  const stats: Record<string, { count: number; percentage: number; participants: number[] }> = {};

  selections?.forEach((selection) => {
    if (!stats[selection.value_name]) {
      stats[selection.value_name] = {
        count: 0,
        percentage: 0,
        participants: [],
      };
    }
    stats[selection.value_name].count++;
    stats[selection.value_name].participants.push(selection.participant_id);
  });

  // Calculate percentages
  Object.keys(stats).forEach((valueName) => {
    stats[valueName].percentage = totalParticipants
      ? Math.round((stats[valueName].count / totalParticipants) * 100)
      : 0;
  });

  return { data: stats, error: null };
}

// ============ COLLABORATIVE EDITING ============

/**
 * Subscribe to collaborative editing updates (mission, vision, value definitions)
 */
export function subscribeToCollaborativeEdits(
  workshopId: number,
  table: 'vmv_value_definitions' | 'vmv_mission_drafts',
  onUpdate: (payload: any) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:${table}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        onUpdate(payload);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Broadcast cursor position for collaborative editing
 */
export function broadcastCursor(
  channel: RealtimeChannel,
  participantId: number,
  participantName: string,
  position: { x: number; y: number } | null
) {
  channel.send({
    type: 'broadcast',
    event: 'cursor',
    payload: {
      participant_id: participantId,
      participant_name: participantName,
      position,
    },
  });
}

/**
 * Subscribe to cursor positions
 */
export function subscribeToCursors(
  workshopId: number,
  onCursorMove: (cursor: { participant_id: number; participant_name: string; position: { x: number; y: number } | null }) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:cursors`)
    .on('broadcast', { event: 'cursor' }, ({ payload }) => {
      onCursorMove(payload as any);
    })
    .subscribe();

  return channel;
}

// ============ VOTING ============

/**
 * Subscribe to voting updates
 */
export function subscribeToVotes(
  workshopId: number,
  onVoteUpdate: (vote: any) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:votes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vmv_votes',
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        onVoteUpdate(payload);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Get live voting statistics
 */
export async function getVotingStats(
  workshopId: number,
  voteType: 'value_final' | 'mission_approve' | 'mission_revise'
): Promise<{
  data: { total: number; byOption: Record<string, number> } | null;
  error: any;
}> {
  const { data: votes, error } = await supabase
    .from('vmv_votes')
    .select('vote_data')
    .eq('workshop_id', workshopId)
    .eq('vote_type', voteType);

  if (error) return { data: null, error };

  const stats = {
    total: votes?.length || 0,
    byOption: {} as Record<string, number>,
  };

  votes?.forEach((vote) => {
    const data = vote.vote_data as Record<string, any>;
    Object.entries(data).forEach(([key, value]) => {
      const optionKey = `${key}:${value}`;
      stats.byOption[optionKey] = (stats.byOption[optionKey] || 0) + 1;
    });
  });

  return { data: stats, error: null };
}

// ============ STAGE PROGRESS ============

/**
 * Subscribe to stage progress updates
 */
export function subscribeToStageProgress(
  workshopId: number,
  onProgressUpdate: (progress: any) => void
) {
  const channel = supabase
    .channel(`workshop:${workshopId}:progress`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vmv_stage_progress',
        filter: `workshop_id=eq.${workshopId}`,
      },
      (payload) => {
        onProgressUpdate(payload);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

// ============ HELPER FUNCTIONS ============

/**
 * Get all online participants from presence state
 */
export function getOnlineParticipants(
  presenceState: Record<string, WorkshopPresence[]>
): WorkshopPresence[] {
  return Object.values(presenceState).flat();
}

/**
 * Check if a specific participant is online
 */
export function isParticipantOnline(
  presenceState: Record<string, WorkshopPresence[]>,
  participantId: number
): boolean {
  return getOnlineParticipants(presenceState).some(
    (p) => p.participant_id === participantId
  );
}

/**
 * Get participant count by stage
 */
export function getParticipantsByStage(
  presenceState: Record<string, WorkshopPresence[]>
): Record<number, number> {
  const byStage: Record<number, number> = {};

  getOnlineParticipants(presenceState).forEach((p) => {
    byStage[p.current_stage] = (byStage[p.current_stage] || 0) + 1;
  });

  return byStage;
}

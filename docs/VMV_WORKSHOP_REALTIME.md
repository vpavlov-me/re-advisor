# VMV Workshop Real-time Features

Complete guide to real-time features implementation for the Values, Mission & Vision Workshop.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Real-time Service](#real-time-service)
4. [React Hook](#react-hook)
5. [Usage Examples](#usage-examples)
6. [Database Setup](#database-setup)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The VMV Workshop includes comprehensive real-time features powered by Supabase Realtime:

- **Presence Tracking**: See who's online and active in the workshop
- **Live Chat**: Real-time messaging between participants
- **Value Selection Updates**: See what values other participants are selecting in real-time
- **Collaborative Editing**: Edit mission statements and vision together
- **Typing Indicators**: Know when someone is typing
- **Cursor Tracking**: See where others are working in collaborative editing
- **Voting**: Real-time voting on final values and decisions
- **Stage Progress**: Track progress through workshop stages

---

## Architecture

### Technology Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Real-time**: Supabase Realtime (WebSockets)
- **Database**: PostgreSQL with Supabase
- **State Management**: React Hooks

### Component Structure

```
src/
├── lib/
│   ├── workshops/
│   │   ├── vmv-realtime.service.ts    # Core real-time service
│   │   └── values.ts                   # Value definitions
│   └── hooks/
│       └── use-workshop-realtime.ts    # React hook for components
└── app/
    └── workshops/
        └── vmv/
            └── [id]/
                └── session/
                    ├── values-select/
                    │   └── page.tsx             # Example usage
                    ├── values-collective/
                    ├── mission-draft/
                    └── mission-final/
```

---

## Real-time Service

The core service (`vmv-realtime.service.ts`) provides low-level functions for real-time features.

### Presence Tracking

```typescript
import { subscribeToPresence, trackPresence, untrackPresence } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to presence updates
const channel = subscribeToPresence(workshopId, (presenceState) => {
  console.log('Online participants:', presenceState);
});

// Track your own presence
trackPresence(channel, {
  user_id: currentUserId,
  participant_id: currentParticipantId,
  participant_name: 'John Doe',
  online_at: new Date().toISOString(),
  current_stage: 1,
});

// Cleanup
untrackPresence(channel);
```

### Chat Messages

```typescript
import { subscribeToMessages, sendMessage } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to new messages
const unsubscribe = subscribeToMessages(workshopId, (message) => {
  console.log('New message:', message);
  // Add to UI
});

// Send a message
await sendMessage(workshopId, participantId, 'Hello everyone!', 'chat');

// Cleanup
unsubscribe();
```

### Value Selections

```typescript
import { subscribeToValueSelections, getValueSelectionStats } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to value selection changes
const unsubscribe = subscribeToValueSelections(
  workshopId,
  (selection) => {
    console.log('Value selected:', selection);
  },
  (selection) => {
    console.log('Value deselected:', selection);
  }
);

// Get current statistics
const { data: stats } = await getValueSelectionStats(workshopId);
// stats = { "Integrity": { count: 5, percentage: 83, participants: [1,2,3,4,5] }, ... }
```

### Typing Indicators

```typescript
import { subscribeToTyping, broadcastTyping } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to typing updates
const channel = subscribeToTyping(workshopId, (indicator) => {
  if (indicator.is_typing) {
    console.log(`${indicator.participant_name} is typing...`);
  }
});

// Broadcast your typing status
broadcastTyping(channel, participantId, 'John Doe', true);

// Clear typing after 3 seconds
setTimeout(() => {
  broadcastTyping(channel, participantId, 'John Doe', false);
}, 3000);
```

### Collaborative Editing

```typescript
import { subscribeToCursors, broadcastCursor } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to cursor positions
const channel = subscribeToCursors(workshopId, (cursor) => {
  console.log(`${cursor.participant_name} cursor at:`, cursor.position);
  // Update UI to show cursor
});

// Broadcast cursor position
document.addEventListener('mousemove', (e) => {
  broadcastCursor(channel, participantId, 'John Doe', {
    x: e.clientX,
    y: e.clientY
  });
});

// Hide cursor when leaving
broadcastCursor(channel, participantId, 'John Doe', null);
```

### Voting

```typescript
import { subscribeToVotes, getVotingStats } from '@/lib/workshops/vmv-realtime.service';

// Subscribe to vote updates
const unsubscribe = subscribeToVotes(workshopId, (vote) => {
  console.log('New vote:', vote);
  refreshVotingStats();
});

// Get current voting statistics
const { data: stats } = await getVotingStats(workshopId, 'mission_approve');
// stats = { total: 8, byOption: { "approve:true": 6, "approve:false": 2 } }
```

---

## React Hook

The `useWorkshopRealtime` hook provides a high-level React interface.

### Basic Usage

```typescript
import { useWorkshopRealtime } from '@/lib/hooks/use-workshop-realtime';

function WorkshopPage() {
  const realtime = useWorkshopRealtime({
    workshopId: 123,
    currentParticipantId: 456,
    currentParticipantName: 'John Doe',
    currentStage: 1,
    autoConnect: true, // Connect automatically on mount
  });

  return (
    <div>
      {/* Connection status */}
      <div>
        {realtime.isConnected ? 'Connected' : 'Disconnected'}
      </div>

      {/* Online participants */}
      <div>
        Online: {realtime.onlineParticipants.length}
      </div>

      {/* Messages */}
      <div>
        {realtime.messages.map(msg => (
          <div key={msg.id}>{msg.message}</div>
        ))}
      </div>

      {/* Send message */}
      <button onClick={() => realtime.sendMessage('Hello!')}>
        Send
      </button>
    </div>
  );
}
```

### Advanced Features

```typescript
function AdvancedWorkshopPage() {
  const realtime = useWorkshopRealtime({
    workshopId: 123,
    currentParticipantId: 456,
    currentParticipantName: 'John Doe',
    currentStage: 1,
  });

  // Check if specific participant is online
  const isJohnOnline = realtime.isParticipantOnline(789);

  // See participants by stage
  const stage1Count = realtime.participantsByStage[1] || 0;

  // Value selection statistics
  const integrityStats = realtime.valueStats['Integrity'];
  // { count: 5, percentage: 83, participants: [1,2,3,4,5] }

  // Typing indicators
  const typingText = realtime.typingUsers.length > 0
    ? `${realtime.typingUsers.join(', ')} ${realtime.typingUsers.length === 1 ? 'is' : 'are'} typing...`
    : '';

  // Collaborative editing cursors
  const cursors = Array.from(realtime.cursors.entries()).map(([id, cursor]) => (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: cursor.position?.x,
        top: cursor.position?.y,
      }}
    >
      {cursor.name}
    </div>
  ));

  return (
    <div>
      {/* UI implementation */}
    </div>
  );
}
```

### Manual Connection Control

```typescript
function ManualConnectionExample() {
  const realtime = useWorkshopRealtime({
    workshopId: 123,
    currentParticipantId: 456,
    currentParticipantName: 'John Doe',
    autoConnect: false, // Don't connect automatically
  });

  return (
    <div>
      {!realtime.isConnected && (
        <button onClick={realtime.connect}>
          Connect to Workshop
        </button>
      )}

      {realtime.isConnected && (
        <>
          <button onClick={realtime.disconnect}>
            Disconnect
          </button>
          {/* Workshop content */}
        </>
      )}
    </div>
  );
}
```

---

## Usage Examples

### Complete Value Selection Page

See [src/app/workshops/vmv/[id]/session/values-select/page-with-realtime.tsx](../src/app/workshops/vmv/[id]/session/values-select/page-with-realtime.tsx) for a complete example.

Key features demonstrated:
- Real-time presence tracking
- Live value selection updates with popularity percentages
- Workshop chat with typing indicators
- Participant progress tracking
- Connection status monitoring

### Collaborative Mission Editor

```typescript
function MissionEditor({ workshopId, participantId, participantName }) {
  const realtime = useWorkshopRealtime({
    workshopId,
    currentParticipantId: participantId,
    currentParticipantName: participantName,
    currentStage: 4,
  });

  const [missionDraft, setMissionDraft] = useState('');

  // Handle mouse move for cursor tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    realtime.updateCursor({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Clear cursor when leaving
  const handleMouseLeave = () => {
    realtime.updateCursor(null);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Show other participants' cursors */}
      {Array.from(realtime.cursors.entries()).map(([id, cursor]) => (
        cursor.position && (
          <div
            key={id}
            className="absolute pointer-events-none"
            style={{
              left: cursor.position.x,
              top: cursor.position.y,
            }}
          >
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              {cursor.name}
            </div>
          </div>
        )
      ))}

      {/* Mission editor */}
      <textarea
        value={missionDraft}
        onChange={(e) => setMissionDraft(e.target.value)}
        placeholder="Draft your mission statement..."
      />
    </div>
  );
}
```

### Live Voting Component

```typescript
function VotingPanel({ workshopId, participantId }) {
  const realtime = useWorkshopRealtime({
    workshopId,
    currentParticipantId: participantId,
  });

  useEffect(() => {
    // Refresh voting stats
    realtime.refreshVotingStats('mission_approve');
  }, []);

  const handleVote = async (approve: boolean) => {
    await supabase.from('vmv_votes').upsert({
      workshop_id: workshopId,
      participant_id: participantId,
      vote_type: 'mission_approve',
      vote_data: { approve },
    });

    // Stats will update automatically via subscription
  };

  const approveCount = realtime.votingStats?.byOption['approve:true'] || 0;
  const rejectCount = realtime.votingStats?.byOption['approve:false'] || 0;
  const total = realtime.votingStats?.total || 0;

  return (
    <div>
      <h3>Vote on Mission Statement</h3>
      <div>
        Approve: {approveCount}/{total} ({Math.round((approveCount / total) * 100)}%)
      </div>
      <div>
        Revise: {rejectCount}/{total}
      </div>
      <button onClick={() => handleVote(true)}>Approve</button>
      <button onClick={() => handleVote(false)}>Request Revision</button>
    </div>
  );
}
```

---

## Database Setup

### Required Tables

All tables are created in migration [017_add_vmv_workshop_tables.sql](../supabase/migrations/017_add_vmv_workshop_tables.sql).

Key tables for real-time features:
- `vmv_workshop_sessions` - Workshop metadata and state
- `vmv_workshop_participants` - Participant information
- `vmv_workshop_messages` - Chat messages
- `vmv_value_selections` - Individual value selections
- `vmv_votes` - Voting records
- `vmv_stage_progress` - Stage completion tracking

### Realtime Configuration

Supabase Realtime is automatically enabled for these tables through Row Level Security policies.

**Important**: Ensure Realtime is enabled in Supabase dashboard:
1. Go to Database → Replication
2. Enable replication for all VMV tables
3. Set up RLS policies (already in migration)

---

## Testing

### Testing Real-time Features

#### 1. Manual Testing

Open multiple browser windows/tabs:

```bash
# Terminal 1
npm run dev

# Open in multiple browsers/incognito windows
# - http://localhost:3000/workshops/vmv/1/session/values-select
# - Simulate different participants
# - Test value selections, chat, presence
```

#### 2. Integration Tests

```typescript
// tests/workshop-realtime.test.ts
import { subscribeToMessages, sendMessage } from '@/lib/workshops/vmv-realtime.service';

describe('Workshop Realtime', () => {
  it('should broadcast messages to all subscribers', async () => {
    const workshopId = 1;
    const messages: any[] = [];

    // Subscribe
    const unsubscribe = subscribeToMessages(workshopId, (msg) => {
      messages.push(msg);
    });

    // Send message
    await sendMessage(workshopId, 123, 'Test message');

    // Wait for message
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(messages).toHaveLength(1);
    expect(messages[0].message).toBe('Test message');

    unsubscribe();
  });
});
```

#### 3. Load Testing

Test with many concurrent users:

```typescript
// tests/load-test.ts
async function simulateParticipants(workshopId: number, count: number) {
  const participants = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Participant ${i + 1}`,
  }));

  // Connect all participants
  const connections = participants.map(p =>
    subscribeToPresence(workshopId, (state) => {
      console.log(`[${p.name}] Online:`, Object.keys(state).length);
    })
  );

  // Simulate activity
  for (const conn of connections) {
    await trackPresence(conn, {
      user_id: '',
      participant_id: Math.random(),
      participant_name: 'Test',
      online_at: new Date().toISOString(),
      current_stage: 1,
    });
  }
}
```

---

## Troubleshooting

### Common Issues

#### 1. Messages Not Appearing

**Problem**: Real-time messages don't show up

**Solutions**:
- Check if Realtime is enabled in Supabase dashboard
- Verify RLS policies allow reading messages
- Check browser console for WebSocket errors
- Ensure correct channel name and filters

```typescript
// Debug subscription
const channel = supabase
  .channel(`workshop:${workshopId}:messages`)
  .on('postgres_changes', { ... }, (payload) => {
    console.log('Message received:', payload); // Add logging
  })
  .subscribe((status) => {
    console.log('Subscription status:', status); // Check status
  });
```

#### 2. Presence Not Updating

**Problem**: Participant presence shows incorrect status

**Solutions**:
- Check if presence tracking is called
- Verify channel is subscribed before tracking
- Check for network issues
- Ensure participant IDs are unique

```typescript
// Debug presence
channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    console.log('Presence state:', state); // Check state
  })
  .subscribe();
```

#### 3. High Latency

**Problem**: Updates are slow

**Solutions**:
- Check network connection
- Verify Supabase region is close to users
- Use debouncing for frequent updates
- Optimize queries and reduce payload size

```typescript
// Debounce cursor updates
const debouncedUpdateCursor = debounce((position) => {
  realtime.updateCursor(position);
}, 100); // Update max once per 100ms
```

#### 4. Memory Leaks

**Problem**: Component doesn't cleanup subscriptions

**Solutions**:
- Always cleanup in useEffect return
- Use the hook's disconnect method
- Avoid creating multiple subscriptions

```typescript
useEffect(() => {
  realtime.connect();

  return () => {
    realtime.disconnect(); // Cleanup
  };
}, [workshopId]);
```

### Debug Mode

Enable debug logging:

```typescript
// Add to service file
const DEBUG = process.env.NODE_ENV === 'development';

function log(...args: any[]) {
  if (DEBUG) {
    console.log('[Workshop Realtime]', ...args);
  }
}

// Use in subscriptions
.on('postgres_changes', { ... }, (payload) => {
  log('Update received:', payload);
  // ...
})
```

---

## Performance Optimization

### 1. Debouncing Updates

```typescript
import { debounce } from 'lodash';

// Debounce typing indicator
const debouncedSetTyping = debounce((isTyping: boolean) => {
  realtime.setTyping(isTyping);
}, 300);
```

### 2. Throttling Cursor Updates

```typescript
import { throttle } from 'lodash';

const throttledUpdateCursor = throttle((position) => {
  realtime.updateCursor(position);
}, 100); // Max 10 updates per second
```

### 3. Conditional Subscriptions

```typescript
// Only subscribe to features you need
const realtime = useWorkshopRealtime({
  workshopId,
  currentParticipantId,
  currentParticipantName,
  autoConnect: false, // Connect manually
});

// Connect only when needed
useEffect(() => {
  if (isActiveStage) {
    realtime.connect();
  } else {
    realtime.disconnect();
  }
}, [isActiveStage]);
```

### 4. Message Pagination

```typescript
// Load messages in batches
const [messages, setMessages] = useState<Message[]>([]);
const [offset, setOffset] = useState(0);
const LIMIT = 50;

async function loadMoreMessages() {
  const { data } = await supabase
    .from('vmv_workshop_messages')
    .select('*')
    .eq('workshop_id', workshopId)
    .order('created_at', { ascending: false })
    .range(offset, offset + LIMIT - 1);

  if (data) {
    setMessages(prev => [...prev, ...data]);
    setOffset(prev => prev + LIMIT);
  }
}
```

---

## Security Considerations

### Row Level Security (RLS)

All tables have RLS enabled. Only workshop participants can:
- Read messages and value selections
- Write their own selections and messages
- View presence of other participants

### Data Validation

```typescript
// Validate message length
export async function sendMessage(
  workshopId: number,
  participantId: number,
  message: string
) {
  if (message.length > 1000) {
    throw new Error('Message too long');
  }

  if (message.trim().length === 0) {
    throw new Error('Message is empty');
  }

  // Send message...
}
```

### Rate Limiting

Consider implementing rate limiting for:
- Message sending (e.g., max 10 per minute)
- Value selections (prevent rapid toggling)
- Cursor updates (throttle to 10/second)

---

## Future Enhancements

1. **Audio/Video Integration**: Add Jitsi/Zoom integration for synchronous workshops
2. **Screen Sharing**: Allow facilitators to share their screen
3. **Reactions**: Add emoji reactions to messages and values
4. **Notifications**: Push notifications for important events
5. **Analytics**: Track engagement metrics and workshop effectiveness
6. **Offline Support**: Queue updates when offline, sync when online
7. **File Sharing**: Allow participants to share documents
8. **Breakout Rooms**: Support for small group discussions

---

## Support

For issues or questions:
- Check [Supabase Realtime docs](https://supabase.com/docs/guides/realtime)
- Review [implementation plan](./.claude/vmv-workshop-implementation-plan.md)
- Contact development team

---

**Last Updated**: 2025-12-15
**Version**: 1.0.0

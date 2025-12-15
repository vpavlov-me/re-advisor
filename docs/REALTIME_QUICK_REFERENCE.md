# VMV Workshop Real-time - Quick Reference

## 🚀 Quick Start (5 minutes)

### 1. Import Hook
```typescript
import { useWorkshopRealtime } from '@/lib/hooks/use-workshop-realtime';
```

### 2. Use in Component
```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 1,
  autoConnect: true,
});
```

### 3. Display Data
```typescript
// Connection status
{realtime.isConnected ? '🟢 Live' : '🔴 Offline'}

// Online participants
{realtime.onlineParticipants.length} online

// Messages
{realtime.messages.map(msg => <div key={msg.id}>{msg.message}</div>)}

// Send message
<button onClick={() => realtime.sendMessage('Hello!')}>Send</button>
```

---

## 📊 Common Patterns

### Show Online Users
```typescript
{realtime.onlineParticipants.map(p => (
  <Avatar key={p.participant_id} title={p.participant_name}>
    <AvatarFallback>{p.participant_name[0]}</AvatarFallback>
  </Avatar>
))}
```

### Chat with Typing Indicators
```typescript
// Messages
{realtime.messages.map(msg => <Message key={msg.id} {...msg} />)}

// Typing
{realtime.typingUsers.length > 0 && (
  <div>{realtime.typingUsers.join(', ')} typing...</div>
)}

// Input
<Input
  onChange={(e) => {
    setMessage(e.target.value);
    realtime.setTyping(e.target.value.length > 0);
  }}
/>
<Button onClick={() => realtime.sendMessage(message)}>Send</Button>
```

### Value Popularity
```typescript
const popularity = realtime.valueStats[valueName]?.percentage || 0;
const count = realtime.valueStats[valueName]?.count || 0;

<Badge>
  {popularity}% ({count} people)
</Badge>
```

### Check Online Status
```typescript
const isOnline = realtime.isParticipantOnline(participantId);

<div className={isOnline ? 'online' : 'offline'}>
  {participantName}
</div>
```

### Collaborative Cursors
```typescript
{Array.from(realtime.cursors.entries()).map(([id, cursor]) => (
  cursor.position && (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: cursor.position.x,
        top: cursor.position.y,
      }}
    >
      <Cursor name={cursor.name} />
    </div>
  )
))}

// Update cursor on mouse move
<div onMouseMove={(e) => realtime.updateCursor({ x: e.clientX, y: e.clientY })}>
  {/* Editable content */}
</div>
```

### Voting Results
```typescript
// Refresh stats for specific vote type
useEffect(() => {
  realtime.refreshVotingStats('mission_approve');
}, []);

// Display results
const total = realtime.votingStats?.total || 0;
const approved = realtime.votingStats?.byOption['approve:true'] || 0;

<Progress value={(approved / total) * 100} />
<span>{approved}/{total} approved</span>
```

---

## 🎯 Hook API

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `isConnected` | boolean | Connection status |
| `isConnecting` | boolean | Connecting in progress |
| `error` | string \| null | Error message if any |
| `onlineParticipants` | WorkshopPresence[] | List of online users |
| `participants` | WorkshopParticipant[] | All workshop participants |
| `messages` | WorkshopMessage[] | Chat messages |
| `typingUsers` | string[] | Names of users typing |
| `valueStats` | Record<string, {...}> | Value selection statistics |
| `votingStats` | {...} \| null | Current voting results |
| `cursors` | Map<number, {...}> | Participant cursor positions |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `sendMessage` | (message: string) | Send chat message |
| `setTyping` | (isTyping: boolean) | Update typing status |
| `updateCursor` | (position \| null) | Update cursor position |
| `isParticipantOnline` | (id: number) | Check if user is online |
| `refreshValueStats` | () | Refresh value statistics |
| `refreshVotingStats` | (type) | Refresh voting results |
| `connect` | () | Manually connect |
| `disconnect` | () | Manually disconnect |

---

## 🔧 Service Functions (Advanced)

### Presence
```typescript
import {
  subscribeToPresence,
  trackPresence,
  untrackPresence
} from '@/lib/workshops/vmv-realtime.service';

const channel = subscribeToPresence(workshopId, (state) => {
  console.log('Presence:', state);
});

trackPresence(channel, { participant_id, participant_name, ... });
```

### Messages
```typescript
import {
  subscribeToMessages,
  sendMessage
} from '@/lib/workshops/vmv-realtime.service';

subscribeToMessages(workshopId, (message) => {
  console.log('New message:', message);
});

await sendMessage(workshopId, participantId, 'Hello!');
```

### Value Selections
```typescript
import {
  subscribeToValueSelections,
  getValueSelectionStats
} from '@/lib/workshops/vmv-realtime.service';

subscribeToValueSelections(
  workshopId,
  (selection) => console.log('Selected:', selection),
  (selection) => console.log('Deselected:', selection)
);

const { data: stats } = await getValueSelectionStats(workshopId);
```

---

## ⚡ Performance Tips

### Debounce Typing
```typescript
import { debounce } from 'lodash';

const handleTyping = debounce((isTyping: boolean) => {
  realtime.setTyping(isTyping);
}, 300);
```

### Throttle Cursor
```typescript
import { throttle } from 'lodash';

const handleMouseMove = throttle((e: MouseEvent) => {
  realtime.updateCursor({ x: e.clientX, y: e.clientY });
}, 100);
```

### Conditional Connection
```typescript
// Only connect when on active stage
useEffect(() => {
  if (isActiveStage && !realtime.isConnected) {
    realtime.connect();
  }
  return () => {
    if (!isActiveStage) {
      realtime.disconnect();
    }
  };
}, [isActiveStage]);
```

---

## 🐛 Debugging

### Enable Logging
```typescript
// In service file
const DEBUG = true;

function log(...args: any[]) {
  if (DEBUG) console.log('[Realtime]', ...args);
}
```

### Check Connection
```typescript
// Check subscription status
channel.subscribe((status) => {
  console.log('Status:', status);
});

// Check presence state
const state = channel.presenceState();
console.log('Presence:', state);
```

### Monitor Messages
```typescript
// Log all incoming messages
subscribeToMessages(workshopId, (msg) => {
  console.log('Message received:', {
    id: msg.id,
    type: msg.message_type,
    content: msg.message,
    timestamp: new Date(msg.created_at),
  });
});
```

---

## 🔒 Security

### RLS Policies
- All tables have Row Level Security enabled
- Only workshop participants can read/write
- Facilitators have full access
- Guests have limited access

### Rate Limiting
Recommended limits:
- Messages: 10 per minute
- Cursor updates: 10 per second
- Value selections: Debounce 500ms

---

## 📦 Database Operations

### Insert Value Selection
```typescript
await supabase.from('vmv_value_selections').insert({
  workshop_id: workshopId,
  participant_id: participantId,
  value_name: 'Integrity',
  is_custom: false,
});
```

### Delete Value Selection
```typescript
await supabase.from('vmv_value_selections')
  .delete()
  .eq('workshop_id', workshopId)
  .eq('participant_id', participantId)
  .eq('value_name', 'Integrity');
```

### Cast Vote
```typescript
await supabase.from('vmv_votes').upsert({
  workshop_id: workshopId,
  participant_id: participantId,
  vote_type: 'mission_approve',
  vote_data: { approve: true },
});
```

---

## 📱 Example: Complete Chat Component

```typescript
function WorkshopChat({ workshopId, participantId, participantName }) {
  const realtime = useWorkshopRealtime({
    workshopId,
    currentParticipantId: participantId,
    currentParticipantName: participantName,
  });

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    realtime.sendMessage(message);
    setMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        <Badge variant={realtime.isConnected ? 'default' : 'secondary'}>
          {realtime.isConnected ? 'Live' : 'Offline'}
        </Badge>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96">
          {realtime.messages.map(msg => (
            <div key={msg.id} className="mb-2">
              <div className="font-bold text-sm">{msg.participant_name}</div>
              <div className="text-sm">{msg.message}</div>
            </div>
          ))}

          {realtime.typingUsers.length > 0 && (
            <div className="text-xs text-muted-foreground italic">
              {realtime.typingUsers.join(', ')} typing...
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              realtime.setTyping(e.target.value.length > 0);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 🎨 UI Components

### Online Badge
```typescript
<Badge variant={realtime.isConnected ? 'default' : 'secondary'}>
  {realtime.isConnected ? (
    <><Wifi className="h-3 w-3 mr-1" /> Live</>
  ) : (
    <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
  )}
</Badge>
```

### Participant Count
```typescript
<Badge variant="outline">
  <Users className="h-3 w-3 mr-1" />
  {realtime.onlineParticipants.length}/{realtime.participants.length}
</Badge>
```

### Value Popularity
```typescript
<Badge variant="secondary">
  {realtime.valueStats[valueName]?.percentage || 0}%
</Badge>
```

---

## 📚 Full Documentation

- **Complete Guide**: [VMV_WORKSHOP_REALTIME.md](./VMV_WORKSHOP_REALTIME.md)
- **Implementation Summary**: [VMV_REALTIME_SUMMARY.md](./VMV_REALTIME_SUMMARY.md)
- **Implementation Plan**: [.claude/vmv-workshop-implementation-plan.md](../.claude/vmv-workshop-implementation-plan.md)

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Messages not appearing | Check Realtime enabled in Supabase dashboard |
| Presence not updating | Verify `trackPresence` called after subscribe |
| High latency | Use debouncing/throttling for frequent updates |
| Memory leak | Always cleanup subscriptions in useEffect return |
| Not receiving updates | Check RLS policies and subscription filters |

---

**Quick Links**:
- [Service Code](../src/lib/workshops/vmv-realtime.service.ts)
- [Hook Code](../src/lib/hooks/use-workshop-realtime.ts)
- [Example Page](../src/app/workshops/vmv/[id]/session/values-select/page-with-realtime.tsx)

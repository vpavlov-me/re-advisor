# VMV Workshop Real-time Integration Guide

Step-by-step guide to enable real-time features in your VMV Workshop.

## Prerequisites

- ✅ VMV Workshop tables created (migration 017 applied)
- ✅ Supabase project configured
- ✅ Database types generated
- ⬜ Real-time enabled in Supabase (we'll do this)

---

## Step 1: Enable Supabase Realtime (5 minutes)

### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Replication**
3. Enable replication for these tables:
   - ✅ `vmv_workshop_sessions`
   - ✅ `vmv_workshop_participants`
   - ✅ `vmv_workshop_messages`
   - ✅ `vmv_value_selections`
   - ✅ `vmv_value_definitions`
   - ✅ `vmv_mission_drafts`
   - ✅ `vmv_votes`
   - ✅ `vmv_stage_progress`

4. Click **Save** to apply changes

### Option B: Using SQL

Run this SQL in Supabase SQL Editor:

```sql
-- Enable realtime for all VMV tables
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_workshop_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_workshop_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_workshop_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_value_selections;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_value_definitions;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_mission_drafts;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_votes;
ALTER PUBLICATION supabase_realtime ADD TABLE vmv_stage_progress;
```

### Verify Realtime is Enabled

```sql
-- Check which tables have realtime enabled
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime';
```

You should see all `vmv_*` tables listed.

---

## Step 2: Update Database Types (2 minutes)

Generate fresh TypeScript types from your database:

```bash
# Using Supabase CLI
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts

# Or if you have supabase CLI installed
supabase gen types typescript --linked > src/lib/database.types.ts
```

---

## Step 3: Install Dependencies (1 minute)

Verify you have the required dependencies:

```bash
npm list @supabase/supabase-js
# Should show version 2.x or higher

# If missing, install:
npm install @supabase/supabase-js
```

---

## Step 4: Test Real-time Connection (5 minutes)

Create a test file to verify real-time works:

```typescript
// test-realtime.ts
import { supabase } from '@/lib/supabaseClient';

async function testRealtime() {
  console.log('Testing Realtime connection...');

  const channel = supabase
    .channel('test-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vmv_workshop_messages',
      },
      (payload) => {
        console.log('✅ Realtime working! Received:', payload);
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);

      if (status === 'SUBSCRIBED') {
        console.log('✅ Successfully subscribed to realtime');
      }
    });

  // Test by inserting a message
  setTimeout(async () => {
    const { data, error } = await supabase
      .from('vmv_workshop_messages')
      .insert({
        workshop_id: 1,
        message: 'Test message',
        message_type: 'system',
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting test message:', error);
    } else {
      console.log('✅ Test message inserted');
    }
  }, 2000);
}

testRealtime();
```

Run the test:

```bash
npx ts-node test-realtime.ts
```

Expected output:
```
Testing Realtime connection...
Subscription status: SUBSCRIBED
✅ Successfully subscribed to realtime
✅ Test message inserted
✅ Realtime working! Received: { ... }
```

---

## Step 5: Integrate into Existing Page (10 minutes)

### Option A: Replace Existing Page

Backup current implementation:
```bash
mv src/app/workshops/vmv/[id]/session/values-select/page.tsx \
   src/app/workshops/vmv/[id]/session/values-select/page-static.tsx
```

Use real-time version:
```bash
mv src/app/workshops/vmv/[id]/session/values-select/page-with-realtime.tsx \
   src/app/workshops/vmv/[id]/session/values-select/page.tsx
```

### Option B: Manual Integration

Add to your existing page:

```typescript
// 1. Import the hook
import { useWorkshopRealtime } from '@/lib/hooks/use-workshop-realtime';

// 2. Get current participant info (add this useEffect)
const [currentParticipant, setCurrentParticipant] = useState<{
  id: number;
  name: string;
} | null>(null);

useEffect(() => {
  async function fetchCurrentParticipant() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: familyMember } = await supabase
      .from('family_members')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (familyMember) {
      const { data: participant } = await supabase
        .from('vmv_workshop_participants')
        .select(`
          id,
          family_member:family_members(
            user:profiles(first_name, last_name)
          )
        `)
        .eq('workshop_id', workshopId)
        .eq('family_member_id', familyMember.id)
        .single();

      if (participant) {
        const user = (participant.family_member as any)?.user;
        setCurrentParticipant({
          id: participant.id,
          name: user ? `${user.first_name} ${user.last_name}`.trim() : 'You'
        });
      }
    }
  }

  fetchCurrentParticipant();
}, [workshopId]);

// 3. Initialize real-time hook
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 1,
  autoConnect: !!currentParticipant,
});

// 4. Replace static data with real-time data
// Instead of:
const [messages, setMessages] = useState([]);

// Use:
const messages = realtime.messages;

// 5. Replace manual message sending
// Instead of:
const handleSendMessage = () => {
  // manual message insertion
};

// Use:
const handleSendMessage = async () => {
  await realtime.sendMessage(newMessage);
  setNewMessage('');
};
```

---

## Step 6: Test with Multiple Users (10 minutes)

### Setup Test Users

1. **Create test workshop:**
```sql
INSERT INTO vmv_workshop_sessions (family_id, facilitator_id, title, format, mode, facilitation_type, status)
VALUES (1, 'your-user-id', 'Test Workshop', 'online', 'synchronous', 'human', 'in_progress')
RETURNING id;
```

2. **Add test participants:**
```sql
-- Get family member IDs first
SELECT id, user_id FROM family_members LIMIT 5;

-- Add as participants
INSERT INTO vmv_workshop_participants (workshop_id, family_member_id, status)
VALUES
  (workshop_id, family_member_id_1, 'confirmed'),
  (workshop_id, family_member_id_2, 'confirmed');
```

### Test Scenarios

1. **Test Presence:**
   - Open workshop in 2 different browser windows
   - Sign in as different users
   - Verify both appear in "Active Participants"

2. **Test Chat:**
   - Send message from User 1
   - Verify it appears instantly for User 2
   - Test typing indicators

3. **Test Value Selections:**
   - Select a value as User 1
   - Verify popularity percentage updates for User 2
   - Deselect and verify update

4. **Test Connection Resilience:**
   - Disconnect internet
   - Verify "Offline" badge appears
   - Reconnect
   - Verify "Live" badge returns and data syncs

---

## Step 7: Apply to Other Workshop Stages (30 minutes)

Repeat for each workshop stage:

### values-collective page

```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 2,
  autoConnect: true,
});

// Use realtime.votingStats for live voting
// Use realtime.valueStats for final value selection
```

### values-matrix page

```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 3,
  autoConnect: true,
});

// Subscribe to collaborative edits
import { subscribeToCollaborativeEdits } from '@/lib/workshops/vmv-realtime.service';

useEffect(() => {
  const unsubscribe = subscribeToCollaborativeEdits(
    workshopId,
    'vmv_value_definitions',
    (payload) => {
      // Update local state with changes
    }
  );

  return unsubscribe;
}, [workshopId]);
```

### mission-draft page

```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 4,
  autoConnect: true,
});

// Individual drafts don't need much real-time
// But keep chat and presence active
```

### mission-final page

```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 5,
  autoConnect: true,
});

// Use realtime.cursors for collaborative editing
// Use realtime.votingStats for approval voting
```

### vision page

```typescript
const realtime = useWorkshopRealtime({
  workshopId: parseInt(id),
  currentParticipantId: currentParticipant?.id,
  currentParticipantName: currentParticipant?.name,
  currentStage: 6,
  autoConnect: true,
});

// Collaborative vision editing
// Use cursors and collaborative edits
```

---

## Step 8: Performance Optimization (15 minutes)

### 1. Add Debouncing

```bash
npm install lodash
```

```typescript
import { debounce } from 'lodash';

// Debounce typing indicator
const debouncedSetTyping = useCallback(
  debounce((isTyping: boolean) => {
    realtime.setTyping(isTyping);
  }, 300),
  [realtime]
);

// Use in input
onChange={(e) => {
  setMessage(e.target.value);
  debouncedSetTyping(e.target.value.length > 0);
}}
```

### 2. Throttle Cursor Updates

```typescript
import { throttle } from 'lodash';

const throttledUpdateCursor = useCallback(
  throttle((position: { x: number; y: number }) => {
    realtime.updateCursor(position);
  }, 100),
  [realtime]
);
```

### 3. Conditional Subscriptions

```typescript
// Only connect on active stages
useEffect(() => {
  if (isActiveStage && currentParticipant) {
    realtime.connect();
  }

  return () => {
    if (!isActiveStage) {
      realtime.disconnect();
    }
  };
}, [isActiveStage, currentParticipant]);
```

---

## Step 9: Production Checklist

Before deploying to production:

- [ ] Realtime enabled for all VMV tables
- [ ] RLS policies tested and working
- [ ] Error handling added for network failures
- [ ] Loading states implemented
- [ ] Reconnection logic tested
- [ ] Memory leaks checked (no lingering subscriptions)
- [ ] Performance optimized (debouncing, throttling)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Mobile responsive
- [ ] Analytics/monitoring added
- [ ] Documentation updated

---

## Step 10: Monitoring & Debugging

### Add Logging

```typescript
// Create logger utility
// src/lib/logger.ts
export const logger = {
  realtime: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Realtime] ${message}`, ...args);
    }
  },
};

// Use in service
import { logger } from '@/lib/logger';

subscribeToMessages(workshopId, (msg) => {
  logger.realtime('New message received:', msg);
  onNewMessage(msg);
});
```

### Monitor Connection Status

```typescript
// Add to your component
useEffect(() => {
  if (realtime.error) {
    console.error('Realtime error:', realtime.error);
    toast.error('Connection issue. Trying to reconnect...');
  }
}, [realtime.error]);

useEffect(() => {
  if (realtime.isConnected) {
    console.log('✅ Connected to workshop');
  } else {
    console.log('❌ Disconnected from workshop');
  }
}, [realtime.isConnected]);
```

### Set Up Analytics

```typescript
// Track realtime events
useEffect(() => {
  if (realtime.isConnected) {
    // Analytics: Track workshop join
    analytics.track('workshop_joined', {
      workshopId,
      participantId: currentParticipant?.id,
      stage: 1,
    });
  }
}, [realtime.isConnected]);

// Track message sends
const handleSendMessage = async () => {
  await realtime.sendMessage(message);

  analytics.track('workshop_message_sent', {
    workshopId,
    messageLength: message.length,
  });
};
```

---

## Troubleshooting

### Issue: "Subscriptions not working"

**Symptom**: No real-time updates

**Check:**
```typescript
// 1. Verify subscription status
channel.subscribe((status) => {
  console.log('Status:', status);
  // Should be "SUBSCRIBED"
});

// 2. Check Supabase connection
const { data, error } = await supabase.from('vmv_workshop_messages').select('*').limit(1);
console.log('Supabase connection:', error ? 'Failed' : 'OK');

// 3. Verify realtime is enabled
// Run in Supabase SQL Editor:
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```

### Issue: "High memory usage"

**Solution**: Ensure cleanup

```typescript
useEffect(() => {
  realtime.connect();

  return () => {
    console.log('Cleaning up real-time connections');
    realtime.disconnect();
  };
}, [workshopId]);
```

### Issue: "Messages duplicating"

**Solution**: Check for duplicate subscriptions

```typescript
// Ensure only one subscription per workshop
useEffect(() => {
  if (subscriptionRef.current) {
    console.warn('Subscription already exists, skipping');
    return;
  }

  subscriptionRef.current = subscribeToMessages(workshopId, handleMessage);

  return () => {
    subscriptionRef.current?.();
    subscriptionRef.current = null;
  };
}, [workshopId]);
```

---

## Next Steps

1. ✅ Complete integration checklist above
2. 📖 Read [Complete Documentation](./VMV_WORKSHOP_REALTIME.md)
3. 🔍 Review [Quick Reference](./REALTIME_QUICK_REFERENCE.md)
4. 🚀 Deploy to staging
5. 🧪 User acceptance testing
6. 🎉 Deploy to production

---

## Support

Need help? Check:
- [Quick Reference](./REALTIME_QUICK_REFERENCE.md)
- [Full Documentation](./VMV_WORKSHOP_REALTIME.md)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)

---

**Last Updated**: 2025-12-15
**Version**: 1.0.0

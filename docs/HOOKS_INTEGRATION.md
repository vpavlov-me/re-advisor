# Hooks Integration Guide

This guide explains how to integrate the centralized hooks into existing pages.

## Available Hooks

### `usePayments`

Manages payment-related state and operations.

```tsx
import { usePayments } from '@/lib/hooks';

function PaymentsPage() {
  const {
    isLoading,
    isMockMode,
    subscription,
    stripeAccount,
    balance,
    transactions,
    paymentMethods,
    refresh,
    startOnboarding,
    requestPayout,
    error,
  } = usePayments();

  // Use in your component...
}
```

**Features:**
- Auto-fetches payment methods, transactions, balance
- Stripe account status
- Subscription info
- Mock mode support for GitHub Pages

### `useMessaging`

Manages messaging state with real-time updates.

```tsx
import { useMessaging } from '@/lib/hooks';

function MessagesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  
  // Get userId from auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);

  const {
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
  } = useMessaging(userId);

  // Use in your component...
}
```

**Features:**
- Auto-fetches conversations and messages
- Real-time message updates via Supabase
- Optimistic UI updates
- Typing indicators

---

## Migration Strategy

### Step 1: Import Hook

Replace manual useState/useEffect with hook:

```tsx
// Before
const [transactions, setTransactions] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchTransactions();
}, []);

// After
const { transactions, isLoading } = usePayments();
```

### Step 2: Use Hook Actions

Replace manual functions with hook methods:

```tsx
// Before
const handleSend = async () => {
  await supabase.from('messages').insert(...);
  fetchMessages();
};

// After
const { sendMessage } = useMessaging(userId);
const handleSend = async () => {
  await sendMessage(content);
};
```

### Step 3: Remove Redundant State

Clean up state that's now managed by hook.

---

## Mock Mode

When `NEXT_PUBLIC_STRIPE_MODE=mock`, the hooks use mock data:

```tsx
const { isMockMode, transactions } = usePayments();

if (isMockMode) {
  // Show demo banner
}
```

---

## Error Handling

```tsx
const { error, refresh } = usePayments();

if (error) {
  return (
    <div>
      <p>Error: {error}</p>
      <Button onClick={refresh}>Retry</Button>
    </div>
  );
}
```

---

## Real-time Updates

`useMessaging` automatically subscribes to real-time updates:

```tsx
// Messages are automatically updated when new ones arrive
const { messages } = useMessaging(userId);

// No need to poll or manually refresh
```

---

## TypeScript Types

```tsx
import type { 
  PaymentMethod, 
  UsePaymentsResult 
} from '@/lib/hooks';

import type { 
  Message, 
  Conversation, 
  UseMessagingResult 
} from '@/lib/hooks';
```

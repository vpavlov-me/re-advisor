# Architecture Decisions

## Deployment: Vercel

This project is deployed to **Vercel**, taking full advantage of Next.js features.

### What This Means

1. **Full Next.js Support**
   - Server-Side Rendering (SSR) available
   - API Routes work seamlessly
   - Dynamic routes with no workarounds needed
   - Middleware runs at the edge

2. **Available Features**
   - ✅ API Routes (`/api/*`)
   - ✅ Server Actions
   - ✅ Server-Side Rendering (SSR)
   - ✅ Incremental Static Regeneration (ISR)
   - ✅ Edge Middleware
   - ✅ Image Optimization

3. **Hybrid Architecture**
   - ✅ Data fetching via Supabase client SDK
   - ✅ Authentication via Supabase Auth + Middleware
   - ✅ Real-time updates via Supabase Realtime
   - ✅ File uploads via Supabase Storage
   - ✅ Server-side and client-side rendering

### Service Architecture

```
src/lib/services/
├── stripe.service.ts   # Payments (mock + real Stripe)
├── email.service.ts    # Emails (mock + Resend/Supabase Edge Functions)
├── avatar.service.ts   # Avatar uploads (Supabase Storage)
└── index.ts            # Exports
```

#### Mock Mode

All services support mock mode for development:

```env
NEXT_PUBLIC_STRIPE_MODE=mock    # 'mock' or 'live'
NEXT_PUBLIC_EMAIL_MODE=mock     # 'mock' or 'edge-function'
```

### Authentication Flow

```
User visits /dashboard
    ↓
Middleware checks auth
    ↓
If no session → redirect to /auth/login
If session → render dashboard
```

### Data Fetching Pattern

All data operations go through Supabase client:

```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);
```

### Environment Variables

```env
# Public (available at runtime - client-side)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_STRIPE_MODE=mock
NEXT_PUBLIC_EMAIL_MODE=mock

# Server-only (available in API routes/server components)
SUPABASE_SERVICE_KEY=...
STRIPE_SECRET_KEY=...
RESEND_API_KEY=...
```

### Payment Integration

```
┌─────────────────────────────────────────────────────────┐
│                    Payment Flow                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Mock Mode:                                              │
│  ┌──────────┐    ┌───────────────┐    ┌──────────────┐  │
│  │  Client  │───▶│ stripe.service│───▶│   Supabase   │  │
│  │          │◀───│    (mock)     │◀───│   Database   │  │
│  └──────────┘    └───────────────┘    └──────────────┘  │
│                                                          │
│  Live Mode:                                              │
│  ┌──────────┐    ┌───────────────┐    ┌──────────────┐  │
│  │  Client  │───▶│ API Route     │───▶│   Stripe     │  │
│  │          │◀───│  /api/stripe  │◀───│   API        │  │
│  └──────────┘    └───────────────┘    └──────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Build & Deploy

```bash
# Development
npm run dev

# Build
npm run build

# Deploy (via Vercel CLI or git push)
vercel --prod
# or
git push origin main  # with Vercel GitHub integration
```

### Features Available

| Feature | Works? | Notes |
|---------|--------|-------|
| API Routes | ✅ | Fully supported |
| Server Actions | ✅ | Fully supported |
| Middleware | ✅ | Edge runtime |
| Dynamic routes | ✅ | No workarounds needed |
| Image optimization | ✅ | Built-in Vercel optimization |
| Environment secrets | ✅ | Server-side available |
| Server-side Stripe | ✅ | Via API routes |
| Server-side Email | ✅ | Via API routes |

### Supabase Edge Functions

For complex background tasks, you can also use Edge Functions:

```bash
# Deploy email function
supabase functions deploy send-email

# Deploy Stripe checkout function  
supabase functions deploy stripe-checkout
```

See `/supabase/functions/` for Edge Function implementations.

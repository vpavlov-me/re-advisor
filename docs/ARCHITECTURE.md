# Architecture Decisions

## Deployment: GitHub Pages (Static Export)

This project is deployed as a **static site to GitHub Pages**. This fundamental constraint influences all architectural decisions.

### What This Means

1. **Static Export Only**
   - Next.js config uses `output: 'export'` in production
   - All pages are pre-rendered at build time
   - No Node.js server at runtime

2. **No Server-Side Features Available**
   - ❌ API Routes (`/api/*`) - **NOT AVAILABLE** at runtime
   - ❌ Server Actions - **NOT AVAILABLE**
   - ❌ Server-Side Rendering (SSR) - **NOT AVAILABLE**
   - ❌ Incremental Static Regeneration (ISR) - **NOT AVAILABLE**
   - ⚠️ Middleware - runs at build time only

3. **Client-Side Architecture**
   - ✅ All data fetching via Supabase client SDK
   - ✅ Authentication via Supabase Auth (client-side)
   - ✅ Real-time updates via Supabase Realtime
   - ✅ File uploads via Supabase Storage
   - ✅ Static pages with client-side hydration

### Service Architecture

Since API routes don't work on GitHub Pages, we use **client-side services**:

```
src/lib/services/
├── stripe.service.ts   # Payments (mock + Supabase Edge Functions)
├── email.service.ts    # Emails (mock + Supabase Edge Functions)
├── avatar.service.ts   # Avatar uploads (Supabase Storage)
└── index.ts            # Exports
```

#### Mock Mode

All services support mock mode for development:

```env
NEXT_PUBLIC_STRIPE_MODE=mock    # 'mock' or 'live'
NEXT_PUBLIC_EMAIL_MODE=mock     # 'mock' or 'live'
```

#### Production Mode

For real Stripe/Email functionality:
1. Deploy Supabase Edge Functions
2. Set `NEXT_PUBLIC_STRIPE_MODE=live`
3. Set `NEXT_PUBLIC_EMAIL_MODE=live`

### Authentication Flow

```
User visits /dashboard
    ↓
Page loads (static HTML)
    ↓
AuthProvider initializes
    ↓
Check session in localStorage/cookies
    ↓
If no session → client-side redirect to /auth/login
If session → render dashboard content
```

### Asset Handling

GitHub Pages hosts at a subdirectory (e.g., `username.github.io/repo-name/`):

```typescript
// Use assetPath() helper for all static assets
import { assetPath } from '@/lib/utils';

// ✅ Correct
<Image src={assetPath('/logo.svg')} />

// ❌ Wrong - won't work on GitHub Pages
<Image src="/logo.svg" />
```

### Data Fetching Pattern

All data operations go through Supabase client directly:

```typescript
// ✅ Correct - Client-side data fetching
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

// ❌ Wrong - API routes don't work on GitHub Pages
const res = await fetch('/api/profiles');
```

### Environment Variables

Only `NEXT_PUBLIC_*` variables are available at runtime:

```env
# ✅ Available at runtime (client-side)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_STRIPE_MODE=mock
NEXT_PUBLIC_EMAIL_MODE=mock

# ❌ NOT available at runtime (server-only)
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
│  │  Client  │───▶│ stripe.service│───▶│   Supabase   │  │
│  │          │    └───────────────┘    │ Edge Function│  │
│  │          │                         │      │       │  │
│  │          │                         │      ▼       │  │
│  │          │◀────────────────────────│   Stripe     │  │
│  └──────────┘                         └──────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Build & Deploy

```bash
# Development
npm run dev

# Build for GitHub Pages
npm run build

# Test locally (simulates GitHub Pages)
npx serve out

# Deploy (via GitHub Actions)
git push origin main
```

### Limitations

| Feature | Works? | Alternative |
|---------|--------|-------------|
| API Routes | ❌ | Supabase Edge Functions |
| Server Actions | ❌ | Client-side with Supabase |
| Middleware redirects | ⚠️ | Client-side ProtectedRoute |
| Dynamic routes | ⚠️ | Must use `generateStaticParams` |
| Image optimization | ⚠️ | `unoptimized: true` or external |
| Environment secrets | ❌ | Only `NEXT_PUBLIC_*` vars |
| Server-side Stripe | ❌ | Mock or Edge Functions |
| Server-side Email | ❌ | Mock or Edge Functions |

### When to Consider Vercel/Railway

If you need:
- Real-time Stripe webhooks (consider Supabase Edge Functions)
- Server-side rendered pages for SEO
- API routes for complex integrations
- Edge middleware with dynamic routing
- Server-side secrets handling

### Supabase Edge Functions

For production payments and emails, deploy Edge Functions:

```bash
# Deploy email function
supabase functions deploy send-email

# Deploy Stripe checkout function  
supabase functions deploy stripe-checkout
```

See `/supabase/functions/` for Edge Function implementations.

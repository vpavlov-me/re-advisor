# Architecture Decisions

## Deployment: GitHub Pages

This project is deployed as a **static site to GitHub Pages**. This fundamental constraint influences all architectural decisions.

### What This Means

1. **Static Export Only**
   - Next.js config uses `output: 'export'`
   - All pages are pre-rendered at build time
   - No Node.js server at runtime

2. **No Server-Side Features**
   - ❌ API Routes (`/api/*`) - don't work
   - ❌ Server Actions - don't work
   - ❌ Server-Side Rendering (SSR) - don't work
   - ❌ Incremental Static Regeneration (ISR) - don't work
   - ⚠️ Middleware - runs at build time only, limited functionality

3. **Client-Side Everything**
   - ✅ All data fetching via Supabase client
   - ✅ Authentication handled by Supabase Auth (client-side)
   - ✅ Real-time updates via Supabase Realtime
   - ✅ Static pages with client-side hydration

### Authentication Flow

Since middleware doesn't work at runtime on GitHub Pages:

1. **Initial Load**: Page loads, `AuthProvider` initializes
2. **Session Check**: Supabase client checks for existing session in localStorage
3. **Protected Routes**: `ProtectedRoute` component shows loading state while checking auth
4. **Redirect Logic**: Client-side redirects via `useRouter` based on auth state

```
User visits /dashboard
    ↓
Page loads (static HTML)
    ↓
AuthProvider initializes
    ↓
Check session in localStorage
    ↓
If no session → redirect to /auth/login
If session → render dashboard
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
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

// ❌ Wrong - API routes don't work
const res = await fetch('/api/profiles');
```

### Environment Variables

Only `NEXT_PUBLIC_*` variables are available at runtime:

```env
# ✅ Available at runtime (client-side)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# ❌ NOT available at runtime
SUPABASE_SERVICE_KEY=...  # Server-side only
```

### Build & Deploy

```bash
# Build static export
npm run build

# Test locally (simulates GitHub Pages)
npx serve out

# Deploy (via GitHub Actions)
git push origin main
```

### Limitations to Remember

| Feature | Works? | Alternative |
|---------|--------|-------------|
| API Routes | ❌ | Use Supabase directly |
| Server Actions | ❌ | Use Supabase directly |
| Middleware redirects | ⚠️ | Client-side redirects |
| Dynamic routes | ⚠️ | Must use `generateStaticParams` |
| Image optimization | ⚠️ | Use unoptimized or external |
| Environment secrets | ❌ | Only NEXT_PUBLIC_* vars |

### When GitHub Pages Won't Work

Consider moving to Vercel/Netlify if you need:
- Server-side rendering for SEO
- API routes for webhooks
- Server-side secrets handling
- Edge middleware
- Incremental Static Regeneration

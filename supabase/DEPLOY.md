# Supabase Database Deployment Guide

## 🚀 Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key

### 2. Deploy Schema

Run the following SQL files in order in the Supabase SQL Editor:

```bash
# Order of execution:
1. supabase/schema.sql           # Base schema
2. supabase/migrations/001_*.sql # Onboarding & Stripe fields
3. supabase/migrations/002_*.sql # Service types seed data
4. supabase/migrations/003_*.sql # Family invitations
4. supabase/migrations/004_*.sql # Availability tables
5. supabase/migrations/005_*.sql # Knowledge resources
6. supabase/migrations/006_*.sql # Push subscriptions
7. supabase/migrations/007_*.sql # Avatars bucket
8. supabase/migrations/20240601*.sql # Learning paths
```

### 3. Create Storage Bucket

In Supabase Dashboard → Storage:
1. Create bucket named `avatars`
2. Set to **public**
3. File size limit: 5MB
4. Allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`

### 4. Configure Environment

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STRIPE_MODE=mock
NEXT_PUBLIC_EMAIL_MODE=mock
```

---

## 📊 Database Tables Overview

### Core Tables
| Table | Description |
|-------|-------------|
| `profiles` | User profiles with Stripe & KYC fields |
| `families` | Family entities managed by advisors |
| `family_members` | Members belonging to families |
| `family_invitations` | Pending invitations to join families |

### Services & Scheduling
| Table | Description |
|-------|-------------|
| `services` | Advisory services offered |
| `service_types` | Service categories taxonomy |
| `consultations` | Scheduled meetings |
| `availability_settings` | Advisor availability config |
| `weekly_schedule` | Recurring availability |
| `blocked_dates` | Vacation/unavailable dates |

### Communication
| Table | Description |
|-------|-------------|
| `conversations` | Message threads |
| `messages` | Individual messages |
| `notifications` | User notifications |
| `push_subscriptions` | Web push subscriptions |

### Payments
| Table | Description |
|-------|-------------|
| `transactions` | Payment transactions |
| `payment_methods` | Saved cards |
| `bank_accounts` | Linked bank accounts |
| `subscriptions` | Subscription plans |

### Knowledge Base
| Table | Description |
|-------|-------------|
| `knowledge_resources` | Articles, docs, videos |
| `resource_categories` | Resource categories |
| `learning_paths` | Curated learning journeys |
| `learning_path_resources` | Path-resource links |
| `family_constitutions` | Family governance documents |

### Other
| Table | Description |
|-------|-------------|
| `credentials` | Advisor certifications |
| `expertise` | Advisor expertise areas |
| `tasks` | Family-related tasks |
| `team_members` | Team/staff members |
| `onboarding_steps` | Onboarding progress tracking |

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with policies:
- **Profiles**: Users can only access their own profile
- **Families**: Advisors can only access families they manage
- **Messages**: Access through conversation → family → advisor chain
- **Payments**: Users can only see their own transactions

---

## 🔄 Real-time Subscriptions

Enabled for:
- `messages` - Real-time chat
- `notifications` - Push notifications
- `conversations` - Conversation updates

---

## 🧪 Test Data

After deploying schema, you can seed test data:

```bash
# In project root
npm run seed:test-users
```

Or manually run `scripts/seed-test-users.sql` in SQL Editor.

---

## ⚠️ Troubleshooting

### "relation does not exist"
Run migrations in order. Some tables depend on others.

### RLS blocks access
Check that:
1. User is authenticated
2. User ID matches advisor_id in relevant table
3. Join path to parent tables is correct

### Storage upload fails
Ensure avatars bucket exists and has correct policies.

---

## 📚 Related Docs

- [Architecture](/docs/ARCHITECTURE.md)
- [Getting Started](/docs/GETTING_STARTED.md)
- [Test Users](/docs/TEST_USERS.md)

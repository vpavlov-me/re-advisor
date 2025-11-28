-- ============================================
-- SEED TEST USERS FOR READVISOR
-- Run this script in Supabase SQL Editor
-- ============================================

-- Step 1: Temporarily disable the trigger that causes issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 2: Create test users in auth.users
-- Password for all users: TestAdvisor123!
-- Password hash generated with bcrypt

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES 
-- Victoria Sterling - Senior Advisor
(
  'a1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'victoria.sterling@readvisor.app',
  '$2a$10$PwD5FHfU5hQJXBpJjD5oG.4Fh8.EbL2TxF2yZSyKdE8L3qC2W5nUy', -- TestAdvisor123!
  NOW(),
  '{"first_name": "Victoria", "last_name": "Sterling"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
),
-- Marcus Chen - New Advisor
(
  'a2222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'marcus.chen@readvisor.app',
  '$2a$10$PwD5FHfU5hQJXBpJjD5oG.4Fh8.EbL2TxF2yZSyKdE8L3qC2W5nUy', -- TestAdvisor123!
  NOW(),
  '{"first_name": "Marcus", "last_name": "Chen"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
),
-- Elizabeth Blackwell - Enterprise Advisor
(
  'a3333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'elizabeth.blackwell@readvisor.app',
  '$2a$10$PwD5FHfU5hQJXBpJjD5oG.4Fh8.EbL2TxF2yZSyKdE8L3qC2W5nUy', -- TestAdvisor123!
  NOW(),
  '{"first_name": "Elizabeth", "last_name": "Blackwell"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Create identities for email login
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  created_at,
  updated_at
) VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'a1111111-1111-1111-1111-111111111111',
  '{"sub": "a1111111-1111-1111-1111-111111111111", "email": "victoria.sterling@readvisor.app"}',
  'email',
  'victoria.sterling@readvisor.app',
  NOW(),
  NOW()
),
(
  'a2222222-2222-2222-2222-222222222222',
  'a2222222-2222-2222-2222-222222222222',
  '{"sub": "a2222222-2222-2222-2222-222222222222", "email": "marcus.chen@readvisor.app"}',
  'email',
  'marcus.chen@readvisor.app',
  NOW(),
  NOW()
),
(
  'a3333333-3333-3333-3333-333333333333',
  'a3333333-3333-3333-3333-333333333333',
  '{"sub": "a3333333-3333-3333-3333-333333333333", "email": "elizabeth.blackwell@readvisor.app"}',
  'email',
  'elizabeth.blackwell@readvisor.app',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Step 4: Create profiles
INSERT INTO public.profiles (
  id, email, first_name, last_name, title, phone, company, 
  location, timezone, bio, linkedin, completion_percentage
) VALUES 
-- Victoria Sterling
(
  'a1111111-1111-1111-1111-111111111111',
  'victoria.sterling@readvisor.app',
  'Victoria',
  'Sterling',
  'Senior Family Advisor',
  '+1 (555) 100-0001',
  'Sterling Advisory Group',
  'New York, NY',
  'America/New_York',
  'Senior family advisor with 15+ years of experience in wealth management, succession planning, and family governance.',
  'https://linkedin.com/in/victoria-sterling',
  95
),
-- Marcus Chen
(
  'a2222222-2222-2222-2222-222222222222',
  'marcus.chen@readvisor.app',
  'Marcus',
  'Chen',
  'Family Advisor',
  '+1 (555) 100-0002',
  'Chen Consulting',
  'San Francisco, CA',
  'America/Los_Angeles',
  'Emerging family advisor specializing in tech entrepreneur families and next-generation wealth transition.',
  'https://linkedin.com/in/marcus-chen',
  60
),
-- Elizabeth Blackwell
(
  'a3333333-3333-3333-3333-333333333333',
  'elizabeth.blackwell@readvisor.app',
  'Elizabeth',
  'Blackwell',
  'Principal Family Advisor',
  '+1 (555) 100-0003',
  'Blackwell & Partners',
  'Chicago, IL',
  'America/Chicago',
  'Principal advisor managing complex multi-family office relationships. Expert in cross-border family governance.',
  'https://linkedin.com/in/elizabeth-blackwell',
  100
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  title = EXCLUDED.title,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company,
  location = EXCLUDED.location,
  timezone = EXCLUDED.timezone,
  bio = EXCLUDED.bio,
  linkedin = EXCLUDED.linkedin,
  completion_percentage = EXCLUDED.completion_percentage;

-- Step 5: Create families for Victoria Sterling (Senior Advisor)
INSERT INTO public.families (
  advisor_id, name, members_count, role, payment_status, status,
  industry, location, email, phone, description, last_contact
) VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'Harrington Family',
  4,
  'personal-advisor',
  'paid',
  'active',
  'Real Estate',
  'Los Angeles, CA',
  'office@harringtonfamily.com',
  '+1 (310) 555-0456',
  'Established real estate dynasty transitioning to third generation leadership. Managing $2.5B in assets.',
  NOW()
),
(
  'a1111111-1111-1111-1111-111111111111',
  'Morrison Family',
  2,
  'consultant',
  'paid',
  'active',
  'Healthcare',
  'Boston, MA',
  'info@morrisonhealthcare.com',
  '+1 (617) 555-0789',
  'Healthcare professionals establishing family governance framework.',
  NOW() - INTERVAL '3 days'
);

-- Step 6: Create families for Marcus Chen (New Advisor)
INSERT INTO public.families (
  advisor_id, name, members_count, role, payment_status, status,
  industry, location, email, phone, description, last_contact
) VALUES 
(
  'a2222222-2222-2222-2222-222222222222',
  'Chen Tech Family',
  2,
  'consultant',
  'pending',
  'active',
  'Technology',
  'Palo Alto, CA',
  'family@chentech.io',
  '+1 (650) 555-0100',
  'First-generation wealth family from successful startup exit. New to family governance.',
  NOW() - INTERVAL '1 day'
);

-- Step 7: Create families for Elizabeth Blackwell (Enterprise Advisor)
INSERT INTO public.families (
  advisor_id, name, members_count, role, payment_status, status,
  industry, location, email, phone, description, last_contact
) VALUES 
(
  'a3333333-3333-3333-3333-333333333333',
  'Blackwell Dynasty',
  5,
  'personal-advisor',
  'paid',
  'active',
  'Finance',
  'Chicago, IL',
  'office@blackwelldynasty.com',
  '+1 (312) 555-0001',
  'Multi-generational financial dynasty with complex trust structures and global operations.',
  NOW()
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Van Der Berg Family',
  3,
  'personal-advisor',
  'paid',
  'active',
  'Manufacturing',
  'Amsterdam, Netherlands',
  'office@vandenbergholdings.eu',
  '+31 20 555 0001',
  'European industrial family with cross-border governance needs.',
  NOW() - INTERVAL '2 days'
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Al-Rashid Family Office',
  3,
  'consultant',
  'paid',
  'active',
  'Investment',
  'Dubai, UAE',
  'info@alrashidfo.ae',
  '+971 4 555 0001',
  'Middle Eastern family office seeking Western governance best practices.',
  NOW() - INTERVAL '5 days'
);

-- Step 8: Add family members
-- Harrington Family members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('Clara Harrington', 'Matriarch', 'clara@harrington.com'),
  ('Oliver Harrington', 'CEO', 'oliver@harrington.com'),
  ('Emma Harrington', 'CFO', 'emma@harrington.com'),
  ('William Harrington', 'Board Member', 'william@harrington.com')
) AS m(name, role, email)
WHERE f.name = 'Harrington Family';

-- Morrison Family members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('Dr. James Morrison', 'Patriarch', 'james@morrisonmed.com'),
  ('Dr. Sarah Morrison', 'Co-Founder', 'sarah@morrisonmed.com')
) AS m(name, role, email)
WHERE f.name = 'Morrison Family';

-- Chen Tech Family members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('David Chen', 'Founder', 'david@chentech.io'),
  ('Linda Chen', 'Co-Founder', 'linda@chentech.io')
) AS m(name, role, email)
WHERE f.name = 'Chen Tech Family';

-- Blackwell Dynasty members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('Richard Blackwell III', 'Chairman', 'richard@blackwell.com'),
  ('Victoria Blackwell', 'Vice Chair', 'victoria@blackwell.com'),
  ('Thomas Blackwell', 'Director', 'thomas@blackwell.com'),
  ('Catherine Blackwell', 'Director', 'catherine@blackwell.com'),
  ('James Blackwell Jr.', 'Next Gen Lead', 'james.jr@blackwell.com')
) AS m(name, role, email)
WHERE f.name = 'Blackwell Dynasty';

-- Van Der Berg Family members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('Henrik Van Der Berg', 'CEO', 'henrik@vdb.eu'),
  ('Marta Van Der Berg', 'CFO', 'marta@vdb.eu'),
  ('Johan Van Der Berg', 'COO', 'johan@vdb.eu')
) AS m(name, role, email)
WHERE f.name = 'Van Der Berg Family';

-- Al-Rashid Family members
INSERT INTO public.family_members (family_id, name, role, email)
SELECT f.id, m.name, m.role, m.email
FROM public.families f
CROSS JOIN (VALUES 
  ('Ahmed Al-Rashid', 'Principal', 'ahmed@alrashid.ae'),
  ('Fatima Al-Rashid', 'Director', 'fatima@alrashid.ae'),
  ('Omar Al-Rashid', 'Advisor', 'omar@alrashid.ae')
) AS m(name, role, email)
WHERE f.name = 'Al-Rashid Family Office';

-- Step 9: Add tasks
INSERT INTO public.tasks (family_id, advisor_id, title, priority, completed, due_date)
SELECT 
  f.id,
  f.advisor_id,
  'Review ' || f.name || ' quarterly governance report',
  'high',
  false,
  NOW() + INTERVAL '7 days'
FROM public.families f;

INSERT INTO public.tasks (family_id, advisor_id, title, priority, completed, due_date)
SELECT 
  f.id,
  f.advisor_id,
  'Schedule family council meeting for ' || f.name,
  'medium',
  false,
  NOW() + INTERVAL '14 days'
FROM public.families f
WHERE f.payment_status = 'paid';

-- Step 10: Add services
INSERT INTO public.services (family_id, advisor_id, name, status, progress, price, start_date)
SELECT 
  f.id,
  f.advisor_id,
  'Family Governance Advisory',
  'Active',
  FLOOR(RANDOM() * 60 + 30)::int,
  '$15,000',
  NOW() - INTERVAL '30 days'
FROM public.families f;

INSERT INTO public.services (family_id, advisor_id, name, status, progress, price, start_date)
SELECT 
  f.id,
  f.advisor_id,
  'Succession Planning',
  'In Progress',
  FLOOR(RANDOM() * 40 + 20)::int,
  '$25,000',
  NOW() - INTERVAL '60 days'
FROM public.families f
WHERE f.payment_status = 'paid';

-- Step 11: Add consultations
INSERT INTO public.consultations (family_id, advisor_id, title, date, time, status)
SELECT 
  f.id,
  f.advisor_id,
  'Quarterly Strategy Review',
  (NOW() + INTERVAL '14 days')::date,
  '10:00 AM',
  'scheduled'
FROM public.families f;

INSERT INTO public.consultations (family_id, advisor_id, title, date, time, status)
SELECT 
  f.id,
  f.advisor_id,
  'Initial Consultation',
  (NOW() - INTERVAL '30 days')::date,
  '2:00 PM',
  'completed'
FROM public.families f;

-- Step 12: Add notifications
INSERT INTO public.notifications (user_id, type, title, description, read)
VALUES 
-- Victoria's notifications
('a1111111-1111-1111-1111-111111111111', 'message', 'New message from Harrington Family', 'Clara sent you a message about the upcoming council meeting.', false),
('a1111111-1111-1111-1111-111111111111', 'alert', 'Upcoming consultation', 'You have a scheduled meeting with Morrison Family in 2 hours.', false),
('a1111111-1111-1111-1111-111111111111', 'update', 'Document updated', 'Family constitution draft has been updated.', true),
-- Marcus's notifications
('a2222222-2222-2222-2222-222222222222', 'reminder', 'Complete your profile', 'Your profile is 60% complete. Add more details to attract clients.', false),
('a2222222-2222-2222-2222-222222222222', 'message', 'Welcome to ReadVisor!', 'Start by exploring the knowledge center.', true),
-- Elizabeth's notifications
('a3333333-3333-3333-3333-333333333333', 'alert', 'New family inquiry', 'A new family has expressed interest in your services.', false),
('a3333333-3333-3333-3333-333333333333', 'update', 'Report ready', 'The quarterly report for Blackwell Dynasty is ready for review.', false),
('a3333333-3333-3333-3333-333333333333', 'reminder', 'Task due soon', 'Review Van Der Berg Family governance report is due tomorrow.', false);

-- Step 13: Recreate the trigger with improved error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- DONE! Test users created successfully
-- ============================================
-- 
-- TEST CREDENTIALS:
-- ================================================
-- 
-- 👤 SENIOR ADVISOR
--    Email:    victoria.sterling@readvisor.app
--    Password: TestAdvisor123!
--    Families: 2 (Harrington, Morrison)
-- 
-- 👤 NEW ADVISOR  
--    Email:    marcus.chen@readvisor.app
--    Password: TestAdvisor123!
--    Families: 1 (Chen Tech Family)
-- 
-- 👤 ENTERPRISE ADVISOR
--    Email:    elizabeth.blackwell@readvisor.app
--    Password: TestAdvisor123!
--    Families: 3 (Blackwell Dynasty, Van Der Berg, Al-Rashid)
-- 
-- ================================================

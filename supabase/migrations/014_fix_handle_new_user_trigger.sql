-- Migration: Fix handle_new_user trigger for user registration
-- This trigger creates a profile when a new user signs up via Supabase Auth

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    is_first_login,
    onboarding_progress,
    onboarding_step,
    onboarding_completed,
    onboarding_skipped,
    profile_status,
    stripe_account_status,
    kyc_status,
    subscription_plan,
    subscription_status,
    completion_percentage,
    joined_date,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    TRUE,  -- is_first_login
    0,     -- onboarding_progress
    1,     -- onboarding_step
    FALSE, -- onboarding_completed
    FALSE, -- onboarding_skipped
    'draft', -- profile_status
    'not_started', -- stripe_account_status
    'not_started', -- kyc_status
    'free', -- subscription_plan
    'inactive', -- subscription_status
    0,     -- completion_percentage
    NOW(), -- joined_date
    NOW()  -- updated_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = COALESCE(NULLIF(EXCLUDED.first_name, ''), profiles.first_name),
    last_name = COALESCE(NULLIF(EXCLUDED.last_name, ''), profiles.last_name),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT ALL ON public.profiles TO supabase_auth_admin;

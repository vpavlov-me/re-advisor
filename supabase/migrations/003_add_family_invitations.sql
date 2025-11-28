-- Migration: Add family invitations system
-- Description: Tables for inviting family members via email/link/QR

-- Create family_invitations table
CREATE TABLE IF NOT EXISTS family_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id BIGINT REFERENCES families(id) ON DELETE CASCADE,
  invited_by UUID REFERENCES profiles(id),
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member', -- 'consul', 'council', 'member'
  invite_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'expired', 'cancelled'
  message TEXT, -- Optional personal message
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  accepted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add onboarding tracking fields to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_skipped BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP WITH TIME ZONE;

-- Add invite link fields to families table
ALTER TABLE families
ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS invite_link_enabled BOOLEAN DEFAULT TRUE;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_family_invitations_family_id ON family_invitations(family_id);
CREATE INDEX IF NOT EXISTS idx_family_invitations_email ON family_invitations(email);
CREATE INDEX IF NOT EXISTS idx_family_invitations_invite_code ON family_invitations(invite_code);
CREATE INDEX IF NOT EXISTS idx_family_invitations_status ON family_invitations(status);
CREATE INDEX IF NOT EXISTS idx_families_invite_code ON families(invite_code);

-- RLS Policies
ALTER TABLE family_invitations ENABLE ROW LEVEL SECURITY;

-- Advisors can view invitations for their families
CREATE POLICY "Advisors can view their family invitations" ON family_invitations 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM families 
    WHERE families.id = family_invitations.family_id 
    AND families.advisor_id = auth.uid()
  )
);

-- Advisors can create invitations for their families
CREATE POLICY "Advisors can create family invitations" ON family_invitations 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM families 
    WHERE families.id = family_invitations.family_id 
    AND families.advisor_id = auth.uid()
  )
);

-- Advisors can update invitations for their families
CREATE POLICY "Advisors can update their family invitations" ON family_invitations 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM families 
    WHERE families.id = family_invitations.family_id 
    AND families.advisor_id = auth.uid()
  )
);

-- Advisors can delete invitations for their families
CREATE POLICY "Advisors can delete their family invitations" ON family_invitations 
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM families 
    WHERE families.id = family_invitations.family_id 
    AND families.advisor_id = auth.uid()
  )
);

-- Public can view invitation by code (for accepting)
CREATE POLICY "Anyone can view invitation by code" ON family_invitations
FOR SELECT USING (true);

-- Function to generate unique invite code
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to generate family invite code on insert
CREATE OR REPLACE FUNCTION set_family_invite_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invite_code IS NULL THEN
    NEW.invite_code := generate_invite_code();
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM families WHERE invite_code = NEW.invite_code AND id != NEW.id) LOOP
      NEW.invite_code := generate_invite_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate invite code for families
DROP TRIGGER IF EXISTS trigger_set_family_invite_code ON families;
CREATE TRIGGER trigger_set_family_invite_code
BEFORE INSERT ON families
FOR EACH ROW EXECUTE FUNCTION set_family_invite_code();

-- Update existing families with invite codes
UPDATE families SET invite_code = generate_invite_code() WHERE invite_code IS NULL;

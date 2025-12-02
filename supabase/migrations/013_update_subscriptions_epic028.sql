-- Migration: Update subscriptions table for Epic-028
-- Description: Add fields for Family Portal tracking and new plan structure

-- Add new columns for Epic-028 portal management
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS portals_used INTEGER DEFAULT 0;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS portals_included INTEGER DEFAULT 0;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS additional_portals INTEGER DEFAULT 0;

-- Update plan_id comments to reflect new structure
COMMENT ON COLUMN subscriptions.plan_id IS 'Subscription plan: standard, premium (legacy: starter, professional, enterprise)';
COMMENT ON COLUMN subscriptions.portals_used IS 'Number of Family Portals created by this advisor';
COMMENT ON COLUMN subscriptions.portals_included IS 'Number of portals included in plan (0 for standard, 3 for premium)';
COMMENT ON COLUMN subscriptions.additional_portals IS 'Number of additional portal slots purchased';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_advisor_id ON subscriptions(advisor_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);

-- Update existing subscriptions to use new plan IDs (migration from legacy)
UPDATE subscriptions SET plan_id = 'standard' WHERE plan_id IN ('starter', 'professional');
UPDATE subscriptions SET plan_id = 'premium' WHERE plan_id = 'enterprise';

-- Set portals_included based on plan
UPDATE subscriptions SET portals_included = 0 WHERE plan_id = 'standard';
UPDATE subscriptions SET portals_included = 3 WHERE plan_id = 'premium';

-- Ensure RLS is enabled
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "Advisors can view their subscription" ON subscriptions;
CREATE POLICY "Advisors can view their subscription" ON subscriptions FOR SELECT USING (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can insert their subscription" ON subscriptions;
CREATE POLICY "Advisors can insert their subscription" ON subscriptions FOR INSERT WITH CHECK (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can update their subscription" ON subscriptions;
CREATE POLICY "Advisors can update their subscription" ON subscriptions FOR UPDATE USING (
  advisor_id = auth.uid()
);

-- Function to increment portal usage when creating a family
CREATE OR REPLACE FUNCTION increment_portal_usage()
RETURNS TRIGGER AS $$
BEGIN
  -- Only increment if the family was created by an advisor (has advisor_id)
  IF NEW.advisor_id IS NOT NULL THEN
    UPDATE subscriptions 
    SET portals_used = portals_used + 1,
        updated_at = NOW()
    WHERE advisor_id = NEW.advisor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-increment portal usage (optional, can be done from app)
-- DROP TRIGGER IF EXISTS on_family_created ON families;
-- CREATE TRIGGER on_family_created
--   AFTER INSERT ON families
--   FOR EACH ROW
--   EXECUTE FUNCTION increment_portal_usage();

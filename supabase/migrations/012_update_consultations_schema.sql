-- Migration: Update consultations table with missing fields
-- Description: Add fields required by the consultations form: type, duration, payment_status, price, location, agenda, notes, documents

-- Add missing columns to consultations table
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Video Call';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '1 hour';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'awaiting';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS price TEXT DEFAULT '$0';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS agenda TEXT[] DEFAULT '{}';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_consultations_advisor_id ON consultations(advisor_id);
CREATE INDEX IF NOT EXISTS idx_consultations_family_id ON consultations(family_id);
CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(date);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);

-- Update RLS policies to ensure advisor can create and manage their consultations
DROP POLICY IF EXISTS "Advisors can manage their consultations" ON consultations;
CREATE POLICY "Advisors can manage their consultations" ON consultations FOR ALL USING (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can view their consultations" ON consultations;
CREATE POLICY "Advisors can view their consultations" ON consultations FOR SELECT USING (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can insert consultations" ON consultations;
CREATE POLICY "Advisors can insert consultations" ON consultations FOR INSERT WITH CHECK (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can update their consultations" ON consultations;
CREATE POLICY "Advisors can update their consultations" ON consultations FOR UPDATE USING (
  advisor_id = auth.uid()
);

DROP POLICY IF EXISTS "Advisors can delete their consultations" ON consultations;
CREATE POLICY "Advisors can delete their consultations" ON consultations FOR DELETE USING (
  advisor_id = auth.uid()
);

COMMENT ON COLUMN consultations.type IS 'Consultation type: Video Call, In-Person, Phone Call';
COMMENT ON COLUMN consultations.payment_status IS 'Payment status: paid, awaiting, overdue';
COMMENT ON COLUMN consultations.documents IS 'JSON array of attached documents with name and size';

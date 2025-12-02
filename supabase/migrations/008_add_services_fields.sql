-- Add missing fields to services table for the services page functionality
ALTER TABLE services
ADD COLUMN IF NOT EXISTS price_model TEXT DEFAULT 'Fixed Package',
ADD COLUMN IF NOT EXISTS price_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '1 hour',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Governance',
ADD COLUMN IF NOT EXISTS active_clients INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_revenue TEXT DEFAULT '$0',
ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0;

-- Update status values to match new format (lowercase)
UPDATE services SET status = 'active' WHERE LOWER(status) = 'active';
UPDATE services SET status = 'draft' WHERE status = 'Pending' OR LOWER(status) = 'pending' OR LOWER(status) = 'draft';
UPDATE services SET status = 'paused' WHERE LOWER(status) = 'paused' OR LOWER(status) = 'in progress';

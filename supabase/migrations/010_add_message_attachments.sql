-- Add attachment fields to messages table
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS attachment_url TEXT,
ADD COLUMN IF NOT EXISTS attachment_name TEXT,
ADD COLUMN IF NOT EXISTS attachment_type TEXT,
ADD COLUMN IF NOT EXISTS attachment_size INTEGER;

-- Create index for messages with attachments
CREATE INDEX IF NOT EXISTS idx_messages_attachment 
  ON messages(conversation_id) WHERE attachment_url IS NOT NULL;

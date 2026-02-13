-- =====================================================
-- SUPABASE DATABASE SETUP FOR VALENTINE'S DAY PROJECT
-- =====================================================

-- Create the valentine_responses table
CREATE TABLE IF NOT EXISTS valentine_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response BOOLEAN NOT NULL,
  responded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries on timestamp
CREATE INDEX IF NOT EXISTS idx_valentine_responses_timestamp 
ON valentine_responses(responded_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE valentine_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the public page)
CREATE POLICY "Allow public inserts" 
ON valentine_responses 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow reads (optional - if you want to view responses)
CREATE POLICY "Allow public reads" 
ON valentine_responses 
FOR SELECT 
TO anon 
USING (true);

-- =====================================================
-- INSTRUCTIONS:
-- =====================================================
-- 1. Go to your Supabase project: https://app.supabase.com
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Copy and paste this entire SQL script
-- 5. Click "Run" to execute
-- 6. Verify the table was created in "Table Editor"
-- =====================================================

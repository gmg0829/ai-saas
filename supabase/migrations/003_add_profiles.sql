-- Add profiles table for user data
-- Run this in Supabase SQL Editor

-- Create profiles table to store user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for now - improve later)
CREATE POLICY "Allow all profiles operations"
  ON profiles FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Trigger for updated_at (requires function from 001_initial_schema.sql)
-- CREATE TRIGGER update_profiles_updated_at
--   BEFORE UPDATE ON profiles
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

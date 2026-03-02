-- Add JSONB column to store all site settings
ALTER TABLE app_settings ADD COLUMN IF NOT EXISTS site_settings JSONB DEFAULT '{}'::jsonb;

-- Update RLS policies to allow public insert (for initial setup)
CREATE POLICY IF NOT EXISTS "Allow public insert on app_settings"
  ON app_settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_requests table
CREATE TABLE IF NOT EXISTS training_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  branches TEXT,
  preferred_date TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app_settings table (single row config)
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  play_store_url TEXT,
  app_store_url TEXT,
  apk_download_url TEXT,
  apk_version TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default app_settings row if it doesn't exist
INSERT INTO app_settings (id, play_store_url, app_store_url, apk_download_url, apk_version)
SELECT gen_random_uuid(), '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM app_settings LIMIT 1);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_training_requests_created_at ON training_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_training_requests_status ON training_requests(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at on row updates
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_training_requests_updated_at ON training_requests;
CREATE TRIGGER update_training_requests_updated_at
  BEFORE UPDATE ON training_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_messages
-- Allow anyone to insert (for public contact form)
CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all messages
CREATE POLICY "Allow authenticated read on contact_messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update all messages
CREATE POLICY "Allow authenticated update on contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete all messages
CREATE POLICY "Allow authenticated delete on contact_messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for training_requests
-- Allow anyone to insert (for public training form)
CREATE POLICY "Allow public insert on training_requests"
  ON training_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all requests
CREATE POLICY "Allow authenticated read on training_requests"
  ON training_requests FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update all requests
CREATE POLICY "Allow authenticated update on training_requests"
  ON training_requests FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete all requests
CREATE POLICY "Allow authenticated delete on training_requests"
  ON training_requests FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for app_settings
-- Allow anyone to read app settings (for public app download page)
CREATE POLICY "Allow public read on app_settings"
  ON app_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to update app settings
CREATE POLICY "Allow authenticated update on app_settings"
  ON app_settings FOR UPDATE
  TO authenticated
  USING (true);

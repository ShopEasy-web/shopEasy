-- Create app_screenshots table
CREATE TABLE IF NOT EXISTS app_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  screenshot_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE app_screenshots ENABLE ROW LEVEL SECURITY;

-- Create policies for app_screenshots
-- Allow anyone to read screenshots (for public app download page)
CREATE POLICY "Allow public read on app_screenshots"
  ON app_screenshots FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert screenshots
CREATE POLICY "Allow authenticated insert on app_screenshots"
  ON app_screenshots FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update screenshots
CREATE POLICY "Allow authenticated update on app_screenshots"
  ON app_screenshots FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete screenshots
CREATE POLICY "Allow authenticated delete on app_screenshots"
  ON app_screenshots FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_app_screenshots_order ON app_screenshots(display_order);

-- Create storage bucket for APK files (run this in Supabase Dashboard SQL Editor)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('apk-files', 'apk-files', true)
-- ON CONFLICT (id) DO NOTHING;

-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('app-screenshots', 'app-screenshots', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage policies (uncomment and run separately if needed)
-- CREATE POLICY "Allow public read access to APK files"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'apk-files');

-- CREATE POLICY "Allow authenticated upload to APK files"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'apk-files' AND auth.role() = 'authenticated');

-- CREATE POLICY "Allow public read access to screenshots"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'app-screenshots');

-- CREATE POLICY "Allow authenticated upload to screenshots"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'app-screenshots' AND auth.role() = 'authenticated');

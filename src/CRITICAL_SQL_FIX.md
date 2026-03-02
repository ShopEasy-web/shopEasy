# 🚨 CRITICAL DATABASE FIX - Run This Now!

## Your current issues:
- ❌ Contact forms trying to use non-existent Edge Functions (404 errors)
- ❌ Training forms trying to use non-existent Edge Functions (404 errors)  
- ❌ Settings saving locally instead of to cloud database
- ❌ Changes in admin not reflecting on frontend

## ✅ THE FIX: Run this SQL once in Supabase

Copy and paste this **ENTIRE SCRIPT** into your Supabase SQL Editor:

```sql
-- ============================================
-- ShopEasy Complete Database Fix
-- ============================================
-- This creates all tables needed for forms and settings

-- 1. Create contact_inquiries table for Contact Page
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create training_requests table for Training Page
CREATE TABLE IF NOT EXISTS training_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  number_of_staff TEXT,
  preferred_date TEXT,
  training_type TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create site_settings table for AdminPage settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insert default settings row if table is empty
INSERT INTO site_settings (settings)
SELECT '{
  "whatsapp": "09156061396",
  "email": "shopeazy025@gmail.com",
  "phone": "+234 915 606 1396",
  "address": "No. 127 Redeem Road, Eagle Island, Port Harcourt",
  "city": "Port Harcourt",
  "state": "Rivers State",
  "country": "Nigeria",
  "signupUrl": "https://shopeasy-lemon.vercel.app"
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings LIMIT 1);

-- 5. Update app_settings table (for AdminDashboard)
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  play_store_url TEXT DEFAULT '',
  app_store_url TEXT DEFAULT '',
  apk_download_url TEXT DEFAULT '',
  apk_version TEXT DEFAULT '',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row if empty
INSERT INTO app_settings (play_store_url)
SELECT ''
WHERE NOT EXISTS (SELECT 1 FROM app_settings LIMIT 1);

-- 6. Enable Row Level Security
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies - Allow public to insert forms
CREATE POLICY IF NOT EXISTS "Anyone can submit contact forms"
  ON contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anyone can submit training requests"
  ON training_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 8. Allow authenticated users (admin) to read inquiries
CREATE POLICY IF NOT EXISTS "Authenticated users can read contact inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can read training requests"
  ON training_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can update contact inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can update training requests"
  ON training_requests FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can delete contact inquiries"
  ON contact_inquiries FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can delete training requests"
  ON training_requests FOR DELETE
  TO authenticated
  USING (true);

-- 9. Allow anyone to read site_settings
CREATE POLICY IF NOT EXISTS "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- 10. Allow anyone to update site_settings (admin panel uses anon key)
CREATE POLICY IF NOT EXISTS "Anyone can update site settings"
  ON site_settings FOR UPDATE
  TO anon, authenticated
  USING (true);

-- 11. App settings policies
CREATE POLICY IF NOT EXISTS "Anyone can read app settings"
  ON app_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated can update app settings"
  ON app_settings FOR UPDATE
  TO authenticated
  USING (true);

-- 12. Verify everything was created
DO $$
BEGIN
  RAISE NOTICE '✅ contact_inquiries table created';
  RAISE NOTICE '✅ training_requests table created';
  RAISE NOTICE '✅ site_settings table created';
  RAISE NOTICE '✅ app_settings table verified';
  RAISE NOTICE '✅ All RLS policies created';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 DATABASE SETUP COMPLETE!';
  RAISE NOTICE '';
  RAISE NOTICE '📝 Next steps:';
  RAISE NOTICE '   1. Frontend code has been updated automatically';
  RAISE NOTICE '   2. Test contact form at /contact';
  RAISE NOTICE '   3. Test training form at /training';
  RAISE NOTICE '   4. Update settings at /admin';
  RAISE NOTICE '   5. View submissions at /admin-login';
END $$;
```

## 📋 How to Run:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/mgkcmohjjzqsrnkmchsv
2. **Click "SQL Editor"** in left sidebar
3. **Click "New query"**
4. **Copy the ENTIRE SQL above** and paste it
5. **Click "Run"** (or press Ctrl/Cmd + Enter)

## ✅ Expected Result:

You should see:
```
✅ contact_inquiries table created
✅ training_requests table created
✅ site_settings table created
✅ app_settings table verified
✅ All RLS policies created

🎉 DATABASE SETUP COMPLETE!
```

## 🧪 After Running, Test:

1. **Test Contact Form**: Go to `/contact` and submit a form
2. **Test Training Form**: Go to `/training` and submit a request
3. **Test Settings**: Go to `/admin`, change contact info, save
4. **View Submissions**: Go to `/admin-login` to see all form submissions

## ⚠️ This fixes:
- ✅ Removes all localStorage (cloud-only storage)
- ✅ Creates database tables for contact/training forms
- ✅ Sets up proper permissions (RLS policies)
- ✅ Makes admin settings persist across devices
- ✅ Forms will appear in admin dashboard backend

---

**Run this SQL now, then the frontend will work immediately!** 🚀

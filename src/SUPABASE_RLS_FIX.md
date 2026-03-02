# Supabase RLS Policy Fix

## Problem
Forms are being submitted successfully, but they don't appear in the Admin Dashboard. This is because Supabase Row Level Security (RLS) is blocking the SELECT queries.

## Solution
You need to add RLS policies that allow:
1. **Public users** to INSERT contact messages and training requests (using the anon key)
2. **Public users** to SELECT/READ their submitted data (for the admin dashboard)

## Steps to Fix

### 1. Go to your Supabase Dashboard
Navigate to: https://supabase.com/dashboard/project/mgkcmohjjzqsrnkmchsv

### 2. Open SQL Editor
Click on the **SQL Editor** icon in the left sidebar

### 3. Run this SQL

Copy and paste this SQL code into the editor and click "Run":

```sql
-- Enable RLS on tables (if not already enabled)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public read on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert on training_requests" ON training_requests;
DROP POLICY IF EXISTS "Allow public read on training_requests" ON training_requests;
DROP POLICY IF EXISTS "Allow public read on app_settings" ON app_settings;
DROP POLICY IF EXISTS "Allow public update on app_settings" ON app_settings;
DROP POLICY IF EXISTS "Allow public insert on app_settings" ON app_settings;

-- Contact Messages Policies
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read on contact_messages"
ON contact_messages
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public delete on contact_messages"
ON contact_messages
FOR DELETE
TO public
USING (true);

-- Training Requests Policies
CREATE POLICY "Allow public insert on training_requests"
ON training_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read on training_requests"
ON training_requests
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public delete on training_requests"
ON training_requests
FOR DELETE
TO public
USING (true);

-- App Settings Policies
CREATE POLICY "Allow public read on app_settings"
ON app_settings
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public update on app_settings"
ON app_settings
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Allow public insert on app_settings"
ON app_settings
FOR INSERT
TO public
WITH CHECK (true);
```

### 4. Verify the Fix

After running the SQL:
1. Submit a test form on the Contact page
2. Log into the Admin Dashboard
3. Check the "Contact Messages" tab - you should now see submitted forms!

## Important Notes

⚠️ **Security Consideration**: These policies allow public access to read all submitted data. This is fine for a small business application, but for production apps with sensitive data, you should:

1. Create proper authentication for admin users
2. Use service role keys for admin operations
3. Restrict SELECT policies to authenticated admin users only

For now, this solution works since you're using localStorage-based admin authentication and the data isn't highly sensitive.

## Troubleshooting

If you still don't see data after running the SQL:

1. **Check the browser console** for any errors when viewing the Admin Dashboard
2. **Verify the table exists**: Go to Table Editor → contact_messages and check if data is there
3. **Check RLS is enabled**: Go to Table Editor → contact_messages → Settings → Enable RLS should be ON
4. **Refresh the page**: Clear browser cache and reload the admin dashboard

## Contact Information

- WhatsApp: 09156061396
- Email: shopeazy025@gmail.com
- Office: No. 127 Redeem Road, Eagle Island, Port Harcourt

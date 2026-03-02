# Training Form Debugging Guide

## Systematic Debugging Steps

### Step 1: Check Browser Console
1. Open the Training page
2. Press F12 to open Developer Tools
3. Click on the **Console** tab
4. Fill out and submit the training form
5. Look for any error messages (they will be red)
6. Take a screenshot of any errors

### Step 2: Check Network Tab
1. Keep Developer Tools open (F12)
2. Click on the **Network** tab
3. Submit the training form
4. Look for a request to `training_requests` 
5. Click on it to see:
   - **Status Code** (should be 201 for success)
   - **Response** tab to see any error messages
   - **Payload** tab to see what data was sent

### Step 3: Verify Supabase Table
1. Go to: https://supabase.com/dashboard/project/mgkcmohjjzqsrnkmchsv
2. Click **Table Editor** in the left sidebar
3. Click on the **training_requests** table
4. Check if any rows exist
5. If rows exist, check their column names match these:
   - `id` (uuid)
   - `contact_name` (text)
   - `email` (text)
   - `phone` (text)
   - `business_name` (text)
   - `location` (text)
   - `number_of_staff` (text or integer)
   - `preferred_date` (text or date)
   - `training_type` (text)
   - `additional_notes` (text)
   - `status` (text)
   - `created_at` (timestamp)

### Step 4: Check RLS Policies
1. Still in Supabase Dashboard
2. Go to **Authentication** → **Policies** in left sidebar
3. Find **training_requests** table
4. Verify these policies exist:
   - ✅ "Allow public insert on training_requests"
   - ✅ "Allow public read on training_requests"
   - ✅ "Allow public delete on training_requests"

### Step 5: Test Direct Database Insert
Run this SQL in Supabase SQL Editor to manually test:

```sql
-- Test INSERT
INSERT INTO training_requests (
  contact_name,
  email,
  phone,
  business_name,
  location,
  number_of_staff,
  preferred_date,
  training_type,
  additional_notes,
  status
) VALUES (
  'Test User',
  'test@example.com',
  '08012345678',
  'Test Business',
  'Lagos',
  '5',
  '2025-01-01',
  'Standard Training',
  'Test notes',
  'unread'
);

-- Test SELECT
SELECT * FROM training_requests ORDER BY created_at DESC LIMIT 5;
```

If this works, the table structure is correct.

### Step 6: Check Form Field Names
The form sends these fields (verify in TrainingPage.tsx):
- `contactName` → `contact_name`
- `email` → `email`
- `phone` → `phone`
- `businessName` → `business_name`
- `location` → `location`
- `numberOfStaff` → `number_of_staff`
- `preferredDate` → `preferred_date`
- `trainingType` → `training_type`
- `additionalNotes` → `additional_notes`

### Step 7: Test the Form
1. Go to the Training page
2. Fill in ALL required fields:
   - Full Name
   - Email Address
   - Phone Number
   - Business Name
   - Location/City
3. Optional fields:
   - Number of Staff
   - Preferred Training Date
   - Type of Training
   - Additional Information
4. Click "Request Training"
5. Check console for:
   - "Submit error:" (if error occurred)
   - Toast notification (success or error)

## Common Issues and Fixes

### Issue 1: "Database Permission Error"
**Cause:** RLS policies not set correctly
**Fix:** Run the SQL from SUPABASE_RLS_FIX.md

### Issue 2: "Failed to submit training request"
**Cause:** Missing required fields or wrong data types
**Fix:** Check all field mappings in Step 6

### Issue 3: Forms submit but don't show in admin
**Cause:** RLS blocks SELECT queries
**Fix:** Ensure SELECT policy exists for training_requests

### Issue 4: "Table does not exist"
**Cause:** training_requests table not created
**Fix:** Run this SQL to create it:

```sql
CREATE TABLE IF NOT EXISTS training_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public insert on training_requests"
ON training_requests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public read on training_requests"
ON training_requests FOR SELECT TO public USING (true);

CREATE POLICY "Allow public delete on training_requests"
ON training_requests FOR DELETE TO public USING (true);
```

## Success Checklist
- [ ] Training form submits without errors in console
- [ ] Success message appears after submission
- [ ] Data appears in Supabase Table Editor
- [ ] Data appears in Admin Dashboard Training Requests tab
- [ ] Can delete training requests from admin panel

## Still Not Working?
1. Send screenshots of:
   - Browser console errors
   - Network tab showing the failed request
   - Supabase table structure
2. Contact via:
   - WhatsApp: 09156061396
   - Email: shopeazy025@gmail.com

# 🎯 ShopEasy Admin Dashboard - Quick Start Guide

**Great news!** You no longer need to edit code files manually. Everything can be managed from the Admin Dashboard!

## 🚀 How to Access Admin Dashboard

### Method 1: Footer Link (Easiest)
1. Scroll to the bottom of any page
2. Look for "Admin" link in the Legal section
3. Click it!

### Method 2: Direct Navigation
- The admin page is always available in your navigation system

---

## 📋 What You Can Manage

The Admin Dashboard has **5 tabs** where you can update everything:

### 1. 💰 Pricing Plans Tab
Update all your subscription pricing:
- **Plan Names** - Starter, Standard, Growth, Enterprise
- **Prices** - Current: ₦7,500, ₦50,000, ₦95,000, ₦250,000
- **Descriptions** - What each plan is for
- **Features** - Add/remove/edit features for each plan

**Example:**
- Change Starter from ₦7,500 to ₦10,000
- Add a new feature like "Email support"
- Remove features you don't offer

---

### 2. 📺 YouTube Videos Tab
Manage all your tutorial videos:

**YouTube Channel URL:**
- Add: `https://www.youtube.com/@YourChannelName`
- This links the YouTube icon in your footer

**Tutorial Playlist URL:**
- Add: `https://www.youtube.com/playlist?list=PLxxxxx`
- This links the "Watch Tutorial" buttons

**Individual Tutorial Videos:**
For each of the 8 tutorial videos, you can update:
- Title (e.g., "Getting Started with ShopEasy")
- Duration (e.g., "5:30")
- Video ID (e.g., "dQw4w9WgXcQ" from youtube.com/watch?v=**dQw4w9WgXcQ**)

---

### 3. 📱 App Downloads Tab
Manage your mobile app:

**APK Download URL:**
- Add the direct link to your Android APK file
- Options provided:
  - Google Drive (easiest)
  - Dropbox
  - GitHub Releases
  - Your own server

**Signup/Login URL:**
- Already set to: `https://shopeasy-lemon.vercel.app`
- All "Sign Up" and "Register" buttons link here

---

### 4. 📝 Google Forms Tab
Connect your Google Forms for submissions:

**Contact Form URL:**
- Create a Google Form for contact inquiries
- Paste the form URL here
- Instructions included in the dashboard

**Training Booking Form URL:**
- Create a Google Form for training bookings
- Paste the form URL here
- Instructions included in the dashboard

**Why Google Forms?**
- Free and easy to use
- Get email notifications for every submission
- View all responses in Google Sheets
- No backend coding required!

---

### 5. 📞 Contact Info Tab
Update your business contact details:

- WhatsApp Number: `09156061396`
- Email: `shopeazy025@gmail.com`
- Phone: `+234 915 606 1396`
- Office Address: `No. 127 Redeem Road, Eagle Island, Port Harcourt`
- City: `Port Harcourt`
- State: `Rivers State`
- Country: `Nigeria`

All these appear across your entire website automatically!

---

## 💾 Saving Changes

### After Making Any Changes:
1. Click the **"Save Changes"** button (top-right or bottom)
2. You'll see a green success message: "✓ Settings saved successfully!"
3. **Changes are LIVE immediately** across your entire website
4. No need to refresh - just navigate to any page to see updates

### Reset to Default:
- Click **"Reset to Default"** button to undo all changes
- This restores original settings
- ⚠️ Warning: This cannot be undone!

---

## 🎬 Step-by-Step: Adding YouTube Videos

### Quick Setup (5 minutes):

**Step 1:** Create a YouTube Playlist
- Go to YouTube Studio
- Create a playlist called "ShopEasy Tutorials"
- Add all your tutorial videos to it
- Copy the playlist URL

**Step 2:** Add to Admin Dashboard
- Go to Admin → YouTube Videos tab
- Paste playlist URL in "Tutorial Playlist URL"
- Click "Save Changes"

**Step 3:** Done!
- All "Watch Tutorial" buttons now work
- Visitors can watch your entire playlist

### Advanced: Individual Videos

If you want each tutorial card on the Support page to open a specific video:

1. Upload your videos to YouTube
2. For each video, get the Video ID:
   - Video URL: `youtube.com/watch?v=ABC123XYZ`
   - Video ID: `ABC123XYZ`
3. In Admin → YouTube Videos → Individual Tutorial Videos
4. Enter the Video ID for each tutorial
5. Update the title and duration if needed
6. Save!

---

## 📱 Step-by-Step: Adding Your APK

### Option 1: Google Drive (Recommended)

1. **Upload APK:**
   - Go to drive.google.com
   - Click "+ New" → "File upload"
   - Select your `shopeasy.apk` file
   - Wait for upload to complete

2. **Get Shareable Link:**
   - Right-click the uploaded APK
   - Click "Share"
   - Change "Restricted" to "Anyone with the link"
   - Click "Copy link"

3. **Add to Admin:**
   - Go to Admin → App Downloads tab
   - Paste the link in "Android APK Download URL"
   - Click "Save Changes"

4. **Test It:**
   - Go to your Download page
   - Click "Download Android App"
   - Should download your APK!

### Option 2: Dropbox

1. Upload APK to Dropbox
2. Click "Share" → "Create link"
3. Copy link and paste in Admin
4. Save!

---

## 📝 Step-by-Step: Setting Up Google Forms

### For Contact Form:

1. **Create Form:**
   - Go to forms.google.com
   - Click "+ Blank form"
   - Title: "ShopEasy Contact Form"

2. **Add Fields:**
   - Name (Short answer)
   - Email (Short answer)
   - Phone Number (Short answer)
   - Company Name (Short answer)
   - Message (Paragraph)

3. **Get URL:**
   - Click "Send" button (top-right)
   - Click the link icon 🔗
   - Copy the link

4. **Add to Admin:**
   - Go to Admin → Google Forms tab
   - Paste in "Contact Form URL"
   - Save!

5. **View Submissions:**
   - Go to your Google Form
   - Click "Responses" tab
   - See all submissions!
   - Click the Google Sheets icon to export

### For Training Form:
- Follow same steps above
- Add fields: Name, Email, Phone, Company, Training Type, Preferred Date, Number of Staff, etc.

---

## ✅ What Happens When You Update Settings?

### Pricing Changes:
- ✅ Homepage pricing cards update
- ✅ Full pricing page updates
- ✅ All "Choose Plan" buttons still work

### YouTube Links:
- ✅ "Watch Tutorial" buttons open your playlist
- ✅ YouTube icon in footer opens your channel
- ✅ Tutorial cards on Support page open specific videos

### APK Link:
- ✅ "Download Android App" button downloads your APK
- ✅ Download page shows download button
- ✅ Works on all devices

### Google Forms:
- ✅ Contact form submissions go to your Google Form
- ✅ Training form submissions go to your Google Form
- ✅ You get email notifications
- ✅ All responses saved in Google Sheets

### Contact Info:
- ✅ Footer updates across all pages
- ✅ Contact page shows new details
- ✅ WhatsApp buttons open correct number
- ✅ Email links open correct address

---

## 🔒 Security Note

The Admin Dashboard is accessible to anyone who visits your site. 

**For Production:** You should add password protection or move it behind authentication. For now, it's fine for managing your site during development.

---

## 💡 Pro Tips

1. **Save Often** - Click "Save Changes" after each update
2. **Test Everything** - After saving, navigate to different pages to see changes
3. **Backup Settings** - Take screenshots of your settings before making big changes
4. **Use Google Forms** - They're free, reliable, and send you email notifications
5. **YouTube Playlists** - Easier than managing individual videos
6. **Google Drive for APK** - Most reliable free hosting option

---

## 🆘 Need Help?

If something isn't working:

1. **Check if you saved** - Click "Save Changes" button
2. **Refresh the page** - Sometimes browsers cache old data
3. **Check the format** - Make sure URLs start with `https://`
4. **Test links** - Open URLs in a new tab to verify they work
5. **Reset to default** - If all else fails, click "Reset to Default" and start over

---

## 🎉 You're All Set!

No more editing code files! Just use the Admin Dashboard for everything:
- ✅ Update pricing in seconds
- ✅ Add YouTube videos easily
- ✅ Upload APK with one click
- ✅ Connect Google Forms instantly
- ✅ Change contact info anytime

**Everything is visual, easy, and saves immediately!** 🚀

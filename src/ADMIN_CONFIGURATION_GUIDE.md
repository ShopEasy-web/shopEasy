# ShopEasy Admin Configuration Guide

## 🎉 What's New - Dynamic Settings System

Your ShopEasy website now has a **fully functional Admin Panel** that allows you to manage ALL website settings without editing code files!

---

## ✅ What Was Fixed

### 1. **Contact Information Updates**
**Problem:** When you changed the phone number in the admin panel, it wasn't reflected on the contact page.

**Solution:** 
- Updated ContactPage, SupportPage, TermsPage, and PrivacyPage to use dynamic settings
- All pages now read contact info from the admin panel settings
- Changes apply **instantly** across the entire website

**Affected Pages:**
- ✅ Contact Page - Phone, WhatsApp, Email, Address
- ✅ Support Page - All support channel contact details
- ✅ Terms Page - Contact information section
- ✅ Privacy Page - Contact details section
- ✅ Footer - All contact links (was already working)
- ✅ Navbar - WhatsApp and contact links (was already working)

### 2. **Google Forms Integration**
**Problem:** Forms were using hardcoded Google Form URLs.

**Solution:**
- Contact and Training forms now read URLs from admin panel settings
- You can configure form URLs via the Admin Panel → Google Forms tab
- No need to edit code files for form URL changes

**How It Works:**
- Admin Panel stores the Google Form URLs
- Contact page and Training page read these URLs when submitting forms
- If no URL is configured, users still see a success message (forms just won't actually submit)

### 3. **YouTube Video Links**
**Problem:** YouTube links needed to be configured properly.

**Solution:**
- Admin Panel → YouTube Videos tab allows you to configure:
  - YouTube Channel URL (for footer icon)
  - Tutorial Playlist URL (for "Watch Tutorial" buttons)
  - Individual video IDs for each tutorial
- All changes apply instantly across the website

---

## 🔐 Accessing the Admin Panel

### Two Admin Systems:

#### 1. **Main Admin Panel** (For Website Settings)
**Access:**
- Click the **shield icon** (🛡️) in the website footer
- Password: `shopeasy2024`

**What You Can Manage:**
- ✅ Pricing Plans (all 4 tiers)
- ✅ YouTube Channel & Tutorial Videos
- ✅ App Download Links (APK, signup URL)
- ✅ Google Forms URLs (Contact & Training)
- ✅ Contact Information (Phone, WhatsApp, Email, Address)

**Storage:** localStorage (browser-based, instant updates)

#### 2. **Admin Dashboard** (For Form Submissions)
**Access:**
- Navigate to `/admin-dashboard` in your browser
- Or click "Admin" link if available in footer (Supabase-based)

**What You Can Manage:**
- Contact form submissions
- Training requests
- App settings (APK downloads)

**Storage:** Supabase backend

---

## 📋 Complete Admin Panel Features

### Tab 1: Pricing Plans
Update pricing for all subscription tiers without touching code:

**What You Can Edit:**
- Plan names (Starter, Standard, Growth, Enterprise)
- Prices (₦7,500, ₦50,000, etc.)
- Period (/month, /year, etc.)
- Plan descriptions
- Feature lists (add, remove, edit features)

**Current Pricing:**
- Starter: ₦7,500/month
- Standard: ₦50,000/month
- Growth: ₦95,000/month
- Enterprise: ₦250,000/month

### Tab 2: YouTube Videos
Manage all YouTube tutorial links:

**Settings:**
- **YouTube Channel URL**: For footer social icon
  - Example: `https://www.youtube.com/@ShopEasy`
  
- **Tutorial Playlist URL**: For "Watch Tutorial" buttons
  - Example: `https://www.youtube.com/playlist?list=PLxxxxx`

- **Individual Video IDs**: For 8 tutorial videos
  - Just enter the video ID (e.g., `dQw4w9WgXcQ`)
  - Update title, duration, and video ID for each

**Where These Appear:**
- Homepage: "Watch Tutorial" button → Uses Playlist URL
- Support Page: Video player + 8 tutorial cards → Uses individual Video IDs
- Footer: YouTube icon → Uses Channel URL

### Tab 3: App Downloads
Configure mobile app download links:

**Settings:**
- **Android APK Download URL**: Direct download link for APK file
  - Can host on Google Drive, Dropbox, GitHub Releases, or your own server
  
- **Signup/Login URL**: Where all "Get Started" buttons redirect
  - Current: `https://shopeasy-lemon.vercel.app`

**Instructions for APK Hosting:**
The admin panel provides detailed instructions for:
- Hosting on Google Drive
- Hosting on Dropbox
- Hosting on GitHub Releases

### Tab 4: Google Forms
Configure form submission URLs:

**Settings:**
- **Contact Form URL**: For Contact page submissions
  - Format: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`
  
- **Training Booking Form URL**: For Training page submissions
  - Format: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`

**Important:**
- Use `formResponse` URL, NOT `viewform`
- See `/GOOGLE_FORMS_SETUP.md` for detailed instructions
- You still need to update entry IDs in code files (for now)

### Tab 5: Contact Info
Update all business contact details:

**Settings:**
- WhatsApp Number (e.g., `09156061396`)
- Email Address (e.g., `shopeazy025@gmail.com`)
- Phone Number (e.g., `+234 915 606 1396`)
- Office Address (e.g., `No. 127 Redeem Road, Eagle Island, Port Harcourt`)
- City (e.g., `Port Harcourt`)
- State (e.g., `Rivers State`)
- Country (e.g., `Nigeria`)

**Where This Appears:**
- Contact Page: All contact cards
- Support Page: All support channels
- Footer: Contact links
- Terms & Privacy Pages: Contact sections
- Navbar: WhatsApp and contact links

---

## 🔄 How Real-Time Updates Work

### Instant Synchronization:
When you save changes in the Admin Panel:

1. Settings are saved to **localStorage**
2. A custom event (`settingsUpdated`) is triggered
3. All pages listening for this event update **immediately**
4. **No page refresh required!**

### What Updates Automatically:
- ✅ All contact information across all pages
- ✅ Pricing on Pricing Page and Homepage
- ✅ YouTube links on all pages
- ✅ Google Form URLs (internal)
- ✅ App download links
- ✅ Footer links and information

---

## 📝 Setup Checklist

### Initial Setup (One-Time):

- [ ] **1. Access Admin Panel**
  - Find shield icon in footer
  - Login with password: `shopeasy2024`

- [ ] **2. Update Contact Information** (Tab 5)
  - Enter your WhatsApp number
  - Enter your business email
  - Enter your phone number
  - Enter your office address
  - Click "Save Changes"

- [ ] **3. Create Google Forms** (See `/GOOGLE_FORMS_SETUP.md`)
  - Create Contact Form on Google Forms
  - Create Training Request Form
  - Get formResponse URLs
  - Get entry IDs for each field

- [ ] **4. Configure Google Forms** (Tab 4)
  - Add Contact Form URL
  - Add Training Form URL
  - Click "Save Changes"

- [ ] **5. Update Entry IDs in Code** (Required)
  - Edit `/components/pages/ContactPage.tsx`
  - Edit `/components/pages/TrainingPage.tsx`
  - Replace placeholder entry IDs with your actual ones

- [ ] **6. Add YouTube Links** (Tab 2)
  - Add YouTube Channel URL
  - Add Tutorial Playlist URL
  - Optionally add individual video IDs
  - Click "Save Changes"

- [ ] **7. Configure App Downloads** (Tab 3)
  - Upload APK to file hosting service
  - Add APK download URL
  - Verify signup URL is correct
  - Click "Save Changes"

- [ ] **8. Review Pricing** (Tab 1)
  - Verify pricing matches your plans
  - Update if needed
  - Click "Save Changes"

- [ ] **9. Test Everything**
  - Test contact form submission
  - Test training form submission
  - Click all YouTube links
  - Try downloading APK
  - Verify contact info displays correctly

---

## 🎯 Common Tasks

### Changing Phone Number:
1. Admin Panel → Contact Info tab
2. Update "Phone Number" field
3. Click "Save Changes"
4. ✅ Instant update across all pages!

### Updating Pricing:
1. Admin Panel → Pricing Plans tab
2. Edit the price for any tier
3. Click "Save Changes"
4. ✅ Pricing page updates instantly!

### Adding YouTube Tutorials:
1. Admin Panel → YouTube Videos tab
2. Add Playlist URL or individual Video IDs
3. Click "Save Changes"
4. ✅ All tutorial links work immediately!

### Changing WhatsApp Number:
1. Admin Panel → Contact Info tab
2. Update "WhatsApp Number"
3. Click "Save Changes"
4. ✅ WhatsApp links update everywhere!

---

## 🛠️ Technical Details

### Data Storage:
- **Method**: Browser localStorage
- **Key**: `shopeasy_settings`
- **Format**: JSON

### Settings Structure:
```javascript
{
  // Contact Info
  whatsapp: '09156061396',
  email: 'shopeazy025@gmail.com',
  phone: '+234 915 606 1396',
  address: 'No. 127 Redeem Road, Eagle Island, Port Harcourt',
  city: 'Port Harcourt',
  state: 'Rivers State',
  country: 'Nigeria',
  
  // URLs
  signupUrl: 'https://shopeasy-lemon.vercel.app',
  apkDownloadUrl: '',
  youtubePlaylistUrl: '',
  youtubeChannelUrl: '',
  contactFormUrl: '',
  trainingFormUrl: '',
  
  // Pricing Plans
  pricingPlans: [ ... ],
  
  // Tutorial Videos
  tutorialVideos: [ ... ]
}
```

### Event System:
- **Event Name**: `settingsUpdated`
- **When Triggered**: After clicking "Save Changes"
- **Who Listens**: All pages with dynamic settings
- **Result**: Instant UI updates without refresh

---

## 🔒 Security Notes

### Admin Password:
- **Current**: `shopeasy2024`
- **Storage**: In code (sessionStorage for sessions)
- **Recommendation**: Change this in production
- **How to Change**: Edit `/components/pages/AdminPage.tsx` line 11

### Data Security:
- Settings stored in browser localStorage
- Not encrypted (it's public data anyway)
- No sensitive data stored
- Admin session cleared on logout

---

## 📚 Additional Resources

### Documentation Files:
- `/GOOGLE_FORMS_SETUP.md` - Complete Google Forms guide
- `/YOUTUBE_TUTORIAL_SETUP.md` - YouTube integration guide
- `/ADMIN_GUIDE.md` - General admin guide (if exists)

### Code Files (For Reference):
- `/lib/settings.ts` - Settings management logic
- `/components/pages/AdminPage.tsx` - Main admin panel
- `/components/pages/ContactPage.tsx` - Contact form
- `/components/pages/TrainingPage.tsx` - Training form

---

## ❓ Troubleshooting

### Contact info not updating?
- Make sure you clicked "Save Changes"
- Check browser console for errors
- Try clearing browser cache
- Verify you're on the correct page

### Forms not submitting?
- Verify Google Form URLs are correct (formResponse, not viewform)
- Check entry IDs match your form fields
- Test forms on Google Forms directly first

### YouTube videos not playing?
- Verify video IDs are correct
- Check videos are set to Public
- Try opening video URL directly

### Admin panel not accessible?
- Look for shield icon in footer
- Clear browser cache
- Try different browser
- Check JavaScript is enabled

### Settings reset after browser close?
- This is normal for sessionStorage (admin login)
- Settings in localStorage persist
- Only affects admin authentication, not your settings

---

## 🆘 Support

Need help? Contact:
- **Email**: shopeazy025@gmail.com
- **WhatsApp**: 09156061396

---

**Last Updated**: December 17, 2025
**Admin Password**: shopeasy2024
**System Version**: 2.0 (Dynamic Settings)

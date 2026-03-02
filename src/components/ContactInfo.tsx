// Centralized contact information for ShopSpot
export const CONTACT_INFO = {
  whatsapp: '09156061396',
  displayWhatsapp: '+234 915 606 1396',
  email: 'shopeazy025@gmail.com',
  address: 'No. 127 Redeem Road',
  area: 'Eagle Island',
  city: 'Port Harcourt',
  state: 'Rivers State',
  country: 'Nigeria',
  signupUrl: 'https://app.shopspot.com.ng',
  
  // YouTube Tutorial Links - ADD YOUR LINKS HERE:
  youtubePlaylistUrl: '', // Add your YouTube playlist URL here (e.g., 'https://www.youtube.com/playlist?list=PLxxxxx')
  youtubeChannelUrl: '', // Add your YouTube channel URL here (e.g., 'https://www.youtube.com/@ShopSpot')
};

// Note about training forms:
// The training booking forms on this website are client-side only and do not
// currently send data to a backend server. To receive training requests, you should:
//
// 1. Set up a backend API endpoint to receive form submissions
// 2. Use a service like Formspree, EmailJS, or similar to forward form data to your email
// 3. Integrate with Google Forms or Typeform
// 4. Set up a database to store submissions
//
// Current form submissions only show a browser alert and don't persist data.
// Update the handleSubmit functions in ContactPage.tsx and TrainingPage.tsx
// to actually send the data to your preferred backend service.
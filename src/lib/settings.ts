// Centralized settings management for ShopSpot
// Settings are stored in the app_settings.site_settings JSONB column.

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export interface TutorialVideo {
  title: string;
  duration: string;
  videoId: string;
}

export interface SiteSettings {
  // Contact Information
  whatsapp: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  
  // URLs
  signupUrl: string;
  apkDownloadUrl: string;
  youtubePlaylistUrl: string;
  youtubeChannelUrl: string;
  contactFormUrl: string;
  trainingFormUrl: string;
  
  // Pricing Plans
  pricingPlans: PricingPlan[];
  
  // Tutorial Videos
  tutorialVideos: TutorialVideo[];
}

// Default settings
const DEFAULT_SETTINGS: SiteSettings = {
  // Contact Information
  whatsapp: '09156061396',
  email: 'shopeazy025@gmail.com',
  phone: '+234 915 606 1396',
  address: 'No. 127 Redeem Road, Eagle Island, Port Harcourt',
  city: 'Port Harcourt',
  state: 'Rivers State',
  country: 'Nigeria',
  
  // URLs
  signupUrl: 'https://app.shopspot.com.ng',
  apkDownloadUrl: '',
  youtubePlaylistUrl: '',
  youtubeChannelUrl: '',
  contactFormUrl: '',
  trainingFormUrl: '',
  
  // Pricing Plans
  pricingPlans: [
    {
      name: 'Starter',
      price: '₦7,500',
      period: '/month',
      description: 'For individual stores',
      features: ['1 branch access', 'POS dashboard', 'Sales tracking', 'Barcode support'],
    },
    {
      name: 'Standard',
      price: '₦50,000',
      period: '/month',
      description: 'For growing businesses',
      features: ['2 branches', '1 warehouse', 'Supplier management', 'Staff roles'],
    },
    {
      name: 'Growth',
      price: '₦95,000',
      period: '/month',
      description: 'For scaling businesses',
      features: ['4 branches', '2 warehouses', 'Advanced analytics', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: '₦250,000',
      period: '/month',
      description: 'For large enterprises',
      features: ['Unlimited branches', 'API access', 'Dedicated manager', '24/7 support'],
    },
  ],
  
  // Tutorial Videos
  tutorialVideos: [
    { title: 'Getting Started with ShopSpot', duration: '5:30', videoId: '' },
    { title: 'Setting Up Your First Branch', duration: '8:15', videoId: '' },
    { title: 'Adding Products & Inventory', duration: '6:45', videoId: '' },
    { title: 'Processing Your First Sale', duration: '4:20', videoId: '' },
    { title: 'Managing Multiple Branches', duration: '10:30', videoId: '' },
    { title: 'Warehouse & Transfer Management', duration: '12:00', videoId: '' },
    { title: 'Understanding Reports', duration: '9:15', videoId: '' },
    { title: 'Staff Roles & Permissions', duration: '7:40', videoId: '' },
  ],
};

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const isNetworkFailure = (error: unknown) => {
  const message =
    typeof error === 'object' && error && 'message' in error
      ? String((error as { message?: unknown }).message)
      : String(error);

  return message.toLowerCase().includes('failed to fetch');
};

const reportSettingsError = (context: string, error: unknown) => {
  // Figma previews can temporarily block external requests. This is an
  // expected offline state, so use the built-in defaults without raising
  // an error overlay.
  if (isNetworkFailure(error)) {
    console.warn(`${context}: Supabase is unreachable; using ShopSpot defaults.`);
    return;
  }

  console.error(context, error);
};

// Get settings from the same app_settings table used by the Edge Function.
export async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('site_settings')
      .limit(1)
      .maybeSingle();

    if (error) {
      reportSettingsError('Unable to load settings from Supabase', error);
      return DEFAULT_SETTINGS;
    }

    if (data?.site_settings) {
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_SETTINGS, ...data.site_settings };
    }

    return DEFAULT_SETTINGS;
  } catch (error) {
    reportSettingsError('Unable to load settings from Supabase', error);
    return DEFAULT_SETTINGS;
  }
}

// Synchronous version - returns defaults (must use getSettings() for fresh data)
export function getSettingsSync(): SiteSettings {
  return DEFAULT_SETTINGS;
}

// Save settings to app_settings.site_settings.
export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('app_settings')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      reportSettingsError('Unable to locate ShopSpot settings', fetchError);
      return false;
    }

    if (existingData && existingData.id) {
      const { error: updateError } = await supabase
        .from('app_settings')
        .update({
          site_settings: settings,
          last_updated: new Date().toISOString(),
        })
        .eq('id', existingData.id);

      if (updateError) {
        reportSettingsError('Unable to update ShopSpot settings', updateError);
        return false;
      }
    } else {
      const { error: insertError } = await supabase
        .from('app_settings')
        .insert({
          site_settings: settings,
          last_updated: new Date().toISOString(),
        });

      if (insertError) {
        reportSettingsError('Unable to create ShopSpot settings', insertError);
        return false;
      }
    }

    // Trigger a custom event to notify all components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('settingsUpdated'));
    }

    return true;
  } catch (error) {
    reportSettingsError('Unable to save settings to Supabase', error);
    return false;
  }
}

// Synchronous version - delegates to async (don't use this, use saveSettings directly)
export function saveSettingsSync(settings: SiteSettings): void {
  saveSettings(settings).catch(err => console.error('Save failed:', err));
}

// Reset to default settings
export function resetSettings(): void {
  saveSettings(DEFAULT_SETTINGS).catch(err => console.error('Reset failed:', err));
}

// Helper to get WhatsApp URL
export function getWhatsAppUrl(settings: SiteSettings): string {
  const phone = settings.whatsapp.replace(/\D/g, '');
  return `https://wa.me/234${phone.startsWith('0') ? phone.slice(1) : phone}`;
}

// Helper to open YouTube video
export function openYouTubeVideo(videoId: string): void {
  if (videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }
}

// Helper to open YouTube playlist
export function openYouTubePlaylist(settings: SiteSettings): void {
  if (settings.youtubePlaylistUrl) {
    window.open(settings.youtubePlaylistUrl, '_blank');
  } else {
    window.open('https://www.youtube.com/results?search_query=ShopSpot+POS+tutorial', '_blank');
  }
}

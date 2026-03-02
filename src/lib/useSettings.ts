import { useState, useEffect } from 'react';
import { getSettings, getSettingsSync, SiteSettings } from './settings';

/**
 * Custom hook to manage site settings with cloud sync
 * Loads from cache immediately, then fetches from Supabase
 */
export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(getSettingsSync());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load settings from Supabase on mount
    const loadSettings = async () => {
      try {
        const freshSettings = await getSettings();
        setSettings(freshSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();

    // Listen for settings updates from admin panel
    const handleSettingsUpdate = async () => {
      try {
        const freshSettings = await getSettings();
        setSettings(freshSettings);
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    };

    window.addEventListener('settingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  return { settings, loading };
}

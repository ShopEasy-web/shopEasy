import { useState, useEffect } from 'react';
import { Save, RotateCcw, CheckCircle, Settings, DollarSign, Youtube, Download, FileText, Phone, Lock, Shield, MessageSquare, Smartphone, Upload, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import { getSettings, getSettingsSync, saveSettings, resetSettings, SiteSettings } from '../../lib/settings';
import { PageType } from '../../App';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { FormSubmissions } from '../FormSubmissions';

interface AdminPageProps {
  onNavigate: (page: PageType) => void;
}

// Simple password - in production, you'd want something more secure
const ADMIN_PASSWORD = 'shopspot2024';
const SESSION_KEY = 'shopspot_admin_session';

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

interface TrainingRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  branches: string;
  preferredDate: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

interface AppSettings {
  playStoreUrl: string;
  appStoreUrl: string;
  apkDownloadUrl: string;
  apkVersion: string;
  lastUpdated: string;
}

interface AppScreenshot {
  id: string;
  screenshot_url: string;
  display_order: number;
  caption: string;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [settings, setSettings] = useState<SiteSettings>(getSettingsSync());
  const [activeTab, setActiveTab] = useState<'pricing' | 'youtube' | 'apps' | 'forms' | 'contact'>('pricing');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [trainingRequests, setTrainingRequests] = useState<TrainingRequest[]>([]);
  const [formSubmissionsTab, setFormSubmissionsTab] = useState<'contact' | 'training'>('contact');
  const [loadingForms, setLoadingForms] = useState(false);
  const [formsError, setFormsError] = useState('');
  
  // App Settings & Screenshots state
  const [appSettings, setAppSettings] = useState<AppSettings>({
    playStoreUrl: '',
    appStoreUrl: '',
    apkDownloadUrl: '',
    apkVersion: '',
    lastUpdated: '',
  });
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');
  const [newScreenshotCaption, setNewScreenshotCaption] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  useEffect(() => {
    // Check if already authenticated in this session
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Load settings from Supabase when authenticated
      loadSettings();
    }
  }, [isAuthenticated]);

  // Load form submissions when forms tab is active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'forms') {
      loadFormSubmissions();
    }
  }, [isAuthenticated, activeTab]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      // Fallback to localStorage
      setSettings(getSettingsSync());
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
    setPassword('');
    onNavigate('home');
  };

  const handleReset = () => {
    resetSettings();
    setSettings(getSettingsSync());
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await saveSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Trigger custom event to notify other components
      window.dispatchEvent(new CustomEvent('settingsUpdated'));
      
      if (!success) {
        console.warn('Settings saved locally but failed to sync to cloud');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updatePricing = (index: number, key: 'name' | 'price' | 'period' | 'description', value: string) => {
    const newPricingPlans = [...settings.pricingPlans];
    newPricingPlans[index][key] = value;
    setSettings({ ...settings, pricingPlans: newPricingPlans });
  };

  const updatePricingFeature = (index: number, fIndex: number, value: string) => {
    const newPricingPlans = [...settings.pricingPlans];
    newPricingPlans[index].features[fIndex] = value;
    setSettings({ ...settings, pricingPlans: newPricingPlans });
  };

  const addPricingFeature = (index: number) => {
    const newPricingPlans = [...settings.pricingPlans];
    newPricingPlans[index].features.push('');
    setSettings({ ...settings, pricingPlans: newPricingPlans });
  };

  const removePricingFeature = (index: number, fIndex: number) => {
    const newPricingPlans = [...settings.pricingPlans];
    newPricingPlans[index].features.splice(fIndex, 1);
    setSettings({ ...settings, pricingPlans: newPricingPlans });
  };

  const updateTutorial = (index: number, key: 'title' | 'duration' | 'videoId', value: string) => {
    const newTutorialVideos = [...settings.tutorialVideos];
    newTutorialVideos[index][key] = value;
    setSettings({ ...settings, tutorialVideos: newTutorialVideos });
  };

  const loadFormSubmissions = async () => {
    setLoadingForms(true);
    setFormsError('');

    try {
      const { data: contactData, error: contactError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: trainingData, error: trainingError } = await supabase
        .from('training_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) {
        console.error('Contact error:', contactError);
      }

      if (trainingError) {
        console.error('Training error:', trainingError);
      }

      // Transform contact data to match interface
      const transformedContacts = (contactData || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        status: item.status || 'unread',
      }));

      // Transform training data to match interface
      const transformedTraining = (trainingData || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        businessName: item.business_name,
        location: item.location,
        branches: item.branches || '',
        preferredDate: item.preferred_date || '',
        message: item.message || '',
        createdAt: item.created_at,
        status: item.status || 'unread',
      }));

      setContacts(transformedContacts);
      setTrainingRequests(transformedTraining);
    } catch (error: any) {
      console.error('Error loading form submissions:', error);
      setFormsError(`Failed to load form submissions: ${error.message}`);
    } finally {
      setLoadingForms(false);
    }
  };

  const deleteContactMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact message:', error);
    }
  };

  const deleteTrainingRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this training request?')) return;
    
    try {
      const { error } = await supabase
        .from('training_requests')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setTrainingRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error deleting training request:', error);
    }
  };

  // App Settings & Screenshots Functions
  const fetchAppSettings = async () => {
    setError('');
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message || 'Failed to fetch app settings');
      }

      if (data) {
        setAppSettings({
          playStoreUrl: data.play_store_url || '',
          appStoreUrl: data.app_store_url || '',
          apkDownloadUrl: data.apk_download_url || '',
          apkVersion: data.apk_version || '',
          lastUpdated: data.last_updated || '',
        });
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching app settings:', err);
    }
  };

  const fetchScreenshots = async () => {
    setError('');
    try {
      const { data, error } = await supabase
        .from('app_screenshots')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase error fetching app screenshots:', error);
        throw new Error(`Database Error: ${error.message}`);
      }

      const transformedScreenshots = (data || []).map((item: any) => ({
        id: item.id,
        screenshot_url: item.screenshot_url,
        display_order: item.display_order,
        caption: item.caption || '',
      }));

      setScreenshots(transformedScreenshots);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch app screenshots';
      setError(errorMessage);
      console.error('Error fetching app screenshots:', err);
    }
  };

  const updateAppSettings = async () => {
    setSaving(true);
    setError('');
    setSuccessMessage('');
    try {
      const { data: existingData, error: fetchError } = await supabase
        .from('app_settings')
        .select('id')
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(fetchError.message);
      }

      if (existingData && existingData.id) {
        const { error: updateError } = await supabase
          .from('app_settings')
          .update({
            play_store_url: appSettings.playStoreUrl,
            app_store_url: appSettings.appStoreUrl,
            apk_download_url: appSettings.apkDownloadUrl,
            apk_version: appSettings.apkVersion,
            last_updated: new Date().toISOString(),
          })
          .eq('id', existingData.id);

        if (updateError) {
          throw new Error(updateError.message);
        }
      } else {
        const { error: insertError } = await supabase
          .from('app_settings')
          .insert({
            play_store_url: appSettings.playStoreUrl,
            app_store_url: appSettings.appStoreUrl,
            apk_download_url: appSettings.apkDownloadUrl,
            apk_version: appSettings.apkVersion,
          });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      setSuccessMessage('App settings updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchAppSettings();
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating app settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddScreenshot = async () => {
    if (!newScreenshotUrl) {
      setError('Please enter a screenshot URL');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setSaving(true);
    setError('');
    setSuccessMessage('');
    try {
      const maxOrder = screenshots.length > 0 ? Math.max(...screenshots.map(s => s.display_order)) : -1;
      
      const { error: insertError } = await supabase
        .from('app_screenshots')
        .insert({
          screenshot_url: newScreenshotUrl,
          caption: newScreenshotCaption || '',
          display_order: maxOrder + 1,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSuccessMessage('Screenshot added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setNewScreenshotUrl('');
      setNewScreenshotCaption('');
      fetchScreenshots();
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding screenshot:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteScreenshot = async (id: string) => {
    if (!confirm('Are you sure you want to delete this screenshot?')) return;

    try {
      const { error } = await supabase
        .from('app_screenshots')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message || 'Failed to delete screenshot');
      }

      setScreenshots(screenshots.filter((s) => s.id !== id));
      setSuccessMessage('Screenshot deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting screenshot:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Load app settings and screenshots when apps tab is active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'apps') {
      fetchAppSettings();
      fetchScreenshots();
    }
  }, [isAuthenticated, activeTab]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005EEA] to-purple-600 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <Shield className="text-[#005EEA]" size={32} />
              </div>
            </div>
            <h1 className="text-white mb-2">ShopSpot Admin</h1>
            <p className="text-blue-100">Enter password to access admin dashboard</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#005EEA] to-purple-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Website
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-blue-100 text-sm">
            <p>🔒 Secure access • Session-based authentication</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage all website settings in one place</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Lock size={18} />
                Logout
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={18} />
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-[#005EEA] text-white rounded-lg hover:bg-[#0047B3] transition-colors"
              >
                {saving ? <Settings size={18} /> : saved ? <CheckCircle size={18} /> : <Save size={18} />}
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Save Banner */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
            ✓ Settings saved successfully! Changes are now live on your website.
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'border-[#005EEA] text-[#005EEA]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <DollarSign size={20} />
                Pricing Plans
              </button>
              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'youtube'
                    ? 'border-[#005EEA] text-[#005EEA]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Youtube size={20} />
                YouTube Videos
              </button>
              <button
                onClick={() => setActiveTab('apps')}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'apps'
                    ? 'border-[#005EEA] text-[#005EEA]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Download size={20} />
                App Downloads
              </button>
              <button
                onClick={() => setActiveTab('forms')}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'forms'
                    ? 'border-[#005EEA] text-[#005EEA]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare size={20} />
                Form Submissions
                {(contacts.filter(c => c.status === 'unread').length + trainingRequests.filter(r => r.status === 'unread').length) > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {contacts.filter(c => c.status === 'unread').length + trainingRequests.filter(r => r.status === 'unread').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'contact'
                    ? 'border-[#005EEA] text-[#005EEA]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Phone size={20} />
                Contact Info
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-gray-900 mb-2">Pricing Plans</h2>
                  <p className="text-gray-600 mb-6">Update pricing for all subscription tiers</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {settings.pricingPlans.map((plan, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Plan Name</label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => updatePricing(index, 'name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Price</label>
                            <input
                              type="text"
                              value={plan.price}
                              onChange={(e) => updatePricing(index, 'price', e.target.value)}
                              placeholder="₦7,500"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Period</label>
                            <input
                              type="text"
                              value={plan.period}
                              onChange={(e) => updatePricing(index, 'period', e.target.value)}
                              placeholder="/month"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Description</label>
                          <input
                            type="text"
                            value={plan.description}
                            onChange={(e) => updatePricing(index, 'description', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Features</label>
                          <div className="space-y-2">
                            {plan.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => updatePricingFeature(index, fIndex, e.target.value)}
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                                />
                                <button
                                  onClick={() => removePricingFeature(index, fIndex)}
                                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addPricingFeature(index)}
                              className="text-[#005EEA] hover:text-[#0047B3] transition-colors text-sm"
                            >
                              + Add Feature
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Tab */}
            {activeTab === 'youtube' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-gray-900 mb-2">YouTube Settings</h2>
                  <p className="text-gray-600 mb-6">Add your YouTube channel and tutorial video links</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 mb-2">YouTube Channel URL</label>
                    <input
                      type="url"
                      value={settings.youtubeChannelUrl}
                      onChange={(e) => setSettings({ ...settings, youtubeChannelUrl: e.target.value })}
                      placeholder="https://www.youtube.com/@ShopSpot"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">Used for YouTube icon in footer</p>
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">Tutorial Playlist URL</label>
                    <input
                      type="url"
                      value={settings.youtubePlaylistUrl}
                      onChange={(e) => setSettings({ ...settings, youtubePlaylistUrl: e.target.value })}
                      placeholder="https://www.youtube.com/playlist?list=PLxxxxx"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">Used for "Watch Tutorial" buttons across the site</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-gray-900 mb-4">Individual Tutorial Videos</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Add YouTube video IDs for each tutorial. Get the video ID from the URL: youtube.com/watch?v=<strong>VIDEO_ID</strong>
                    </p>

                    <div className="space-y-4">
                      {settings.tutorialVideos.map((video, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={video.title}
                                onChange={(e) => updateTutorial(index, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-2">Duration</label>
                              <input
                                type="text"
                                value={video.duration}
                                onChange={(e) => updateTutorial(index, 'duration', e.target.value)}
                                placeholder="5:30"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-2">Video ID</label>
                              <input
                                type="text"
                                value={video.videoId}
                                onChange={(e) => updateTutorial(index, 'videoId', e.target.value)}
                                placeholder="dQw4w9WgXcQ"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Apps Tab */}
            {activeTab === 'apps' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-gray-900 mb-2">App Downloads</h2>
                  <p className="text-gray-600 mb-6">Manage mobile app download links</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 mb-2">Android APK Download URL</label>
                    <input
                      type="url"
                      value={settings.apkDownloadUrl}
                      onChange={(e) => setSettings({ ...settings, apkDownloadUrl: e.target.value })}
                      placeholder="https://yourserver.com/shopspot.apk"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">Direct link to your APK file (can be hosted on Google Drive, Dropbox, or your server)</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-3">📱 How to Upload Your APK</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Option 1: Google Drive</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Upload your APK to Google Drive</li>
                        <li>Right-click → Share → Change to "Anyone with the link"</li>
                        <li>Copy the sharing link and paste it above</li>
                      </ol>
                      
                      <p className="mt-4"><strong>Option 2: Dropbox</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Upload APK to Dropbox</li>
                        <li>Click "Share" → "Create link"</li>
                        <li>Copy link and paste above</li>
                      </ol>

                      <p className="mt-4"><strong>Option 3: GitHub Releases</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Go to your repository → Releases → Create new release</li>
                        <li>Upload APK as a release asset</li>
                        <li>Copy the download URL</li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">Signup/Login URL</label>
                    <input
                      type="url"
                      value={settings.signupUrl}
                      onChange={(e) => setSettings({ ...settings, signupUrl: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">URL where all signup/login buttons redirect to</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-gray-900 mb-4">App Store Links</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Add links to your app on the Google Play Store and Apple App Store.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Play Store URL</label>
                        <input
                          type="url"
                          value={appSettings.playStoreUrl}
                          onChange={(e) => setAppSettings({ ...appSettings, playStoreUrl: e.target.value })}
                          placeholder="https://play.google.com/store/apps/details?id=com.shopspot"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">App Store URL</label>
                        <input
                          type="url"
                          value={appSettings.appStoreUrl}
                          onChange={(e) => setAppSettings({ ...appSettings, appStoreUrl: e.target.value })}
                          placeholder="https://apps.apple.com/ng/app/shopspot/id123456789"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-gray-900 mb-4">App Version & Last Updated</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Update the app version and the last updated date.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">App Version</label>
                        <input
                          type="text"
                          value={appSettings.apkVersion}
                          onChange={(e) => setAppSettings({ ...appSettings, apkVersion: e.target.value })}
                          placeholder="1.0.0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Last Updated</label>
                        <input
                          type="text"
                          value={formatDate(appSettings.lastUpdated)}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-gray-900 mb-4">App Screenshots</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Add screenshots of your app to showcase its features.
                    </p>

                    <div className="space-y-4">
                      {screenshots.map((screenshot) => (
                        <div key={screenshot.id} className="flex items-center gap-4">
                          <img
                            src={screenshot.screenshot_url}
                            alt={`App Screenshot ${screenshot.display_order}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={screenshot.caption}
                              onChange={(e) => {
                                const updatedScreenshots = screenshots.map((s) =>
                                  s.id === screenshot.id ? { ...s, caption: e.target.value } : s
                                );
                                setScreenshots(updatedScreenshots);
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => handleDeleteScreenshot(screenshot.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <input
                        type="url"
                        value={newScreenshotUrl}
                        onChange={(e) => setNewScreenshotUrl(e.target.value)}
                        placeholder="Enter screenshot URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newScreenshotCaption}
                        onChange={(e) => setNewScreenshotCaption(e.target.value)}
                        placeholder="Enter caption (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                      />
                      <button
                        onClick={handleAddScreenshot}
                        className="flex items-center gap-2 px-4 py-2 bg-[#005EEA] text-white rounded-lg hover:bg-[#0047B3] transition-colors"
                      >
                        Add Screenshot
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={updateAppSettings}
                      className="flex items-center gap-2 px-4 py-2 bg-[#005EEA] text-white rounded-lg hover:bg-[#0047B3] transition-colors"
                    >
                      {saving ? <Settings size={18} /> : saved ? <CheckCircle size={18} /> : <Save size={18} />}
                      {saving ? 'Saving...' : saved ? 'Changes Saved!' : 'Save App Settings'}
                    </button>
                  </div>

                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                      {successMessage}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Forms Tab */}
            {activeTab === 'forms' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-gray-900 mb-2">Form Submissions</h2>
                  <p className="text-gray-600 mb-6">View and manage contact and training form submissions</p>
                </div>

                <FormSubmissions
                  contacts={contacts}
                  trainingRequests={trainingRequests}
                  formSubmissionsTab={formSubmissionsTab}
                  setFormSubmissionsTab={setFormSubmissionsTab}
                  loading={loadingForms}
                  error={formsError}
                  onDeleteContact={deleteContactMessage}
                  onDeleteTraining={deleteTrainingRequest}
                />
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-gray-900 mb-2">Contact Information</h2>
                  <p className="text-gray-600 mb-6">Update business contact details displayed across the website</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 mb-2">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      placeholder="09156061396"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      placeholder="+234 915 606 1396"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">City</label>
                    <input
                      type="text"
                      value={settings.city}
                      onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-900 mb-2">Office Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">State</label>
                    <input
                      type="text"
                      value={settings.state}
                      onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2">Country</label>
                    <input
                      type="text"
                      value={settings.country}
                      onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-[#005EEA] text-white rounded-lg hover:bg-[#0047B3] transition-colors"
          >
            {saving ? <Settings size={20} /> : saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saving ? 'Saving...' : saved ? 'Changes Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
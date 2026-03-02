import { useState, useEffect } from 'react';
import {
  MessageSquare,
  GraduationCap,
  Settings,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Building,
  MapPin,
  CheckCircle,
  Trash2,
  Download,
  Smartphone,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'contacts' | 'training' | 'app-settings';

interface ContactMessage {
  key?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

interface TrainingRequest {
  key?: string;
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

interface ExportData {
  contacts: ContactMessage[];
  trainingRequests: TrainingRequest[];
  appSettings: AppSettings;
  exportDate: string;
  version: string;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('contacts');
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [trainingRequests, setTrainingRequests] = useState<TrainingRequest[]>([]);
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const accessToken = localStorage.getItem('admin_access_token');

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    } else if (activeTab === 'training') {
      fetchTrainingRequests();
    } else if (activeTab === 'app-settings') {
      fetchAppSettings();
      fetchScreenshots();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      // Query directly from database
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching contacts:', error);
        throw new Error(`Database Error: ${error.message}${error.hint ? ' - ' + error.hint : ''}${error.code ? ' (Code: ' + error.code + ')' : ''}`);
      }

      console.log('Fetched contacts:', data?.length || 0, 'records');

      // Transform to match expected format
      const transformedContacts = (data || []).map((item: any) => ({
        key: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        status: item.status || 'unread',
      }));

      setContacts(transformedContacts);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch contacts';
      setError(errorMessage);
      console.error('Error fetching contacts:', err);
      
      // Check if it's an RLS policy issue
      if (err.message?.includes('policy') || err.code === '42501') {
        setError('Database Permission Error: Unable to read contact messages. Please check Supabase RLS policies.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainingRequests = async () => {
    setLoading(true);
    setError('');
    try {
      // Query directly from database
      const { data, error } = await supabase
        .from('training_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching training requests:', error);
        throw new Error(`Database Error: ${error.message}${error.hint ? ' - ' + error.hint : ''}${error.code ? ' (Code: ' + error.code + ')' : ''}`);
      }

      console.log('Fetched training requests:', data?.length || 0, 'records');

      // Transform to match expected format
      const transformedRequests = (data || []).map((item: any) => ({
        key: item.id,
        name: item.name,  // Changed from contact_name to name
        email: item.email,
        phone: item.phone,
        businessName: item.business_name,
        location: item.location,
        branches: item.branches || '',  // Changed from number_of_staff to branches
        preferredDate: item.preferred_date || '',
        message: item.message || '',  // Changed from additional_notes to message
        createdAt: item.created_at,
        status: item.status || 'unread',
      }));

      setTrainingRequests(transformedRequests);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch training requests';
      setError(errorMessage);
      console.error('Error fetching training requests:', err);
      
      // Check if it's an RLS policy issue
      if (err.message?.includes('policy') || err.code === '42501') {
        setError('Database Permission Error: Unable to read training requests. Please check Supabase RLS policies.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAppSettings = async () => {
    setLoading(true);
    setError('');
    try {
      // Query directly from database
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
    } finally {
      setLoading(false);
    }
  };

  const fetchScreenshots = async () => {
    setLoading(true);
    setError('');
    try {
      // Query directly from database
      const { data, error } = await supabase
        .from('app_screenshots')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase error fetching app screenshots:', error);
        throw new Error(`Database Error: ${error.message}${error.hint ? ' - ' + error.hint : ''}${error.code ? ' (Code: ' + error.code + ')' : ''}`);
      }

      console.log('Fetched app screenshots:', data?.length || 0, 'records');

      // Transform to match expected format
      const transformedScreenshots = (data || []).map((item: any) => ({
        id: item.id,
        screenshot_url: item.screenshot_url,
        display_order: item.display_order,
        caption: item.caption,
      }));

      setScreenshots(transformedScreenshots);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch app screenshots';
      setError(errorMessage);
      console.error('Error fetching app screenshots:', err);
      
      // Check if it's an RLS policy issue
      if (err.message?.includes('policy') || err.code === '42501') {
        setError('Database Permission Error: Unable to read app screenshots. Please check Supabase RLS policies.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAppSettings = async () => {
    setSaving(true);
    setError('');
    setSuccessMessage('');
    try {
      // First get the existing row ID
      const { data: existingData, error: fetchError } = await supabase
        .from('app_settings')
        .select('id')
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(fetchError.message);
      }

      if (existingData && existingData.id) {
        // Update existing row
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
        // Insert new row
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
      fetchAppSettings(); // Refresh data
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating app settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const deleteContact = async (key: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', key);

      if (error) {
        throw new Error(error.message || 'Failed to delete contact');
      }

      setContacts(contacts.filter((c) => c.key !== key));
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting contact:', err);
    }
  };

  const deleteTrainingRequest = async (key: string) => {
    if (!confirm('Are you sure you want to delete this training request?')) return;

    try {
      const { error } = await supabase
        .from('training_requests')
        .delete()
        .eq('id', key);

      if (error) {
        throw new Error(error.message || 'Failed to delete training request');
      }

      setTrainingRequests(trainingRequests.filter((r) => r.key !== key));
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting training request:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('admin_access_token');
    onLogout();
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

  // Export all data to JSON file
  const handleExportData = () => {
    const exportData: ExportData = {
      contacts,
      trainingRequests,
      appSettings,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shopspot-admin-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMessage('Data exported successfully! Save this file to import on other browsers.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // Import data from JSON file
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData: ExportData = JSON.parse(e.target?.result as string);
        
        // Validate data structure
        if (!importedData.contacts || !importedData.trainingRequests || !importedData.appSettings) {
          throw new Error('Invalid backup file format');
        }

        setContacts(importedData.contacts);
        setTrainingRequests(importedData.trainingRequests);
        setAppSettings(importedData.appSettings);

        setSuccessMessage(
          `Data imported successfully! Loaded ${importedData.contacts.length} contacts, ${importedData.trainingRequests.length} training requests, and app settings.`
        );
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (err: any) {
        setError(`Failed to import data: ${err.message}`);
        setTimeout(() => setError(''), 5000);
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
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
      fetchScreenshots(); // Refresh data
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white">SE</span>
              </div>
              <div>
                <h1 className="text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 text-sm">Manage ShopSpot enquiries and app settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Export Data Button */}
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#005EEA] to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity text-sm"
                title="Export all data to JSON file for backup or cross-browser sync"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export Data</span>
              </button>
              
              {/* Import Data Button */}
              <label
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer text-sm"
                title="Import data from previously exported JSON file"
              >
                <Upload size={18} />
                <span className="hidden sm:inline">Import Data</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-4 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'border-[#005EEA] text-[#005EEA]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={20} />
            Contact Messages
            {contacts.filter((c) => c.status === 'unread').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {contacts.filter((c) => c.status === 'unread').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`pb-4 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'training'
                ? 'border-[#005EEA] text-[#005EEA]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <GraduationCap size={20} />
            Training Requests
            {trainingRequests.filter((r) => r.status === 'unread').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {trainingRequests.filter((r) => r.status === 'unread').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('app-settings')}
            className={`pb-4 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'app-settings'
                ? 'border-[#005EEA] text-[#005EEA]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={20} />
            App Settings
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
            {successMessage}
          </div>
        )}

        {/* Tab Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#005EEA] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        ) : (
          <>
            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No contact messages yet</p>
                  </div>
                ) : (
                  contacts.map((contact, index) => (
                    <div
                      key={contact.key || index}
                      className={`bg-white border rounded-2xl p-6 ${
                        contact.status === 'unread' ? 'border-[#005EEA] border-2' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-gray-900">{contact.name}</h3>
                            {contact.status === 'unread' && (
                              <span className="bg-blue-100 text-[#005EEA] text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Mail size={16} />
                              {contact.email}
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-1">
                                <Phone size={16} />
                                {contact.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {formatDate(contact.createdAt)}
                            </div>
                          </div>
                          <div className="bg-blue-50 rounded-lg px-3 py-1 inline-block text-sm text-[#005EEA] mb-3">
                            Subject: {contact.subject}
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                        <button
                          onClick={() => deleteContact(contact.key!)}
                          className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Training Requests Tab */}
            {activeTab === 'training' && (
              <div className="space-y-4">
                {trainingRequests.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                    <GraduationCap size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No training requests yet</p>
                  </div>
                ) : (
                  trainingRequests.map((request, index) => (
                    <div
                      key={request.key || index}
                      className={`bg-white border rounded-2xl p-6 ${
                        request.status === 'unread' ? 'border-[#005EEA] border-2' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-gray-900">{request.name}</h3>
                            {request.status === 'unread' && (
                              <span className="bg-blue-100 text-[#005EEA] text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Mail size={16} />
                              {request.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone size={16} />
                              {request.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building size={16} />
                              {request.businessName}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {request.location}
                            </div>
                            {request.branches && (
                              <div className="flex items-center gap-1">
                                <Building size={16} />
                                {request.branches} branch{request.branches !== '1' ? 'es' : ''}
                              </div>
                            )}
                            {request.preferredDate && (
                              <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                Preferred: {new Date(request.preferredDate).toLocaleDateString('en-NG')}
                              </div>
                            )}
                            <div className="flex items-center gap-1 col-span-2">
                              <Calendar size={16} />
                              Submitted: {formatDate(request.createdAt)}
                            </div>
                          </div>
                          {request.message && (
                            <div className="bg-gray-50 rounded-lg p-4 mt-3">
                              <p className="text-gray-700 whitespace-pre-wrap">{request.message}</p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteTrainingRequest(request.key!)}
                          className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* App Settings Tab */}
            {activeTab === 'app-settings' && (
              <div className="max-w-3xl">
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <h2 className="text-gray-900 mb-6">App Download Links</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="playStoreUrl" className="block text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Smartphone size={20} />
                          Google Play Store URL
                        </div>
                      </label>
                      <input
                        type="url"
                        id="playStoreUrl"
                        value={appSettings.playStoreUrl}
                        onChange={(e) =>
                          setAppSettings({ ...appSettings, playStoreUrl: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        placeholder="https://play.google.com/store/apps/details?id=..."
                      />
                    </div>

                    <div>
                      <label htmlFor="appStoreUrl" className="block text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Smartphone size={20} />
                          Apple App Store URL
                        </div>
                      </label>
                      <input
                        type="url"
                        id="appStoreUrl"
                        value={appSettings.appStoreUrl}
                        onChange={(e) =>
                          setAppSettings({ ...appSettings, appStoreUrl: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                        placeholder="https://apps.apple.com/app/..."
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-gray-900 mb-4">Direct APK Download</h3>
                      
                      <div className="mb-4">
                        <label htmlFor="apkDownloadUrl" className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Download size={20} />
                            APK Download URL
                          </div>
                        </label>
                        <input
                          type="url"
                          id="apkDownloadUrl"
                          value={appSettings.apkDownloadUrl}
                          onChange={(e) =>
                            setAppSettings({ ...appSettings, apkDownloadUrl: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          placeholder="https://your-storage-url.com/shopspot.apk"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          💡 Upload your APK to a file hosting service (Google Drive, Dropbox, or your own server) and paste the direct download link here
                        </p>
                      </div>

                      <div>
                        <label htmlFor="apkVersion" className="block text-gray-700 mb-2">
                          APK Version
                        </label>
                        <input
                          type="text"
                          id="apkVersion"
                          value={appSettings.apkVersion}
                          onChange={(e) =>
                            setAppSettings({ ...appSettings, apkVersion: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          placeholder="v1.0.0"
                        />
                      </div>
                    </div>

                    {appSettings.lastUpdated && (
                      <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
                        Last updated: {formatDate(appSettings.lastUpdated)}
                      </div>
                    )}

                    <button
                      onClick={updateAppSettings}
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-[#005EEA] to-purple-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-8">
                  <h2 className="text-gray-900 mb-6">App Screenshots</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="screenshotUrl" className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <ImageIcon size={20} />
                            Screenshot URL
                          </div>
                        </label>
                        <input
                          type="url"
                          id="screenshotUrl"
                          value={newScreenshotUrl}
                          onChange={(e) => setNewScreenshotUrl(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          placeholder="https://your-storage-url.com/screenshot.png"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          💡 Upload your screenshot to Imgur, Supabase Storage, or any image hosting service
                        </p>
                      </div>
                      <div>
                        <label htmlFor="screenshotCaption" className="block text-gray-700 mb-2">
                          Caption (Optional)
                        </label>
                        <input
                          type="text"
                          id="screenshotCaption"
                          value={newScreenshotCaption}
                          onChange={(e) => setNewScreenshotCaption(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                          placeholder="e.g., Dashboard View, POS Screen"
                        />
                      </div>
                      <button
                        onClick={handleAddScreenshot}
                        disabled={saving}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Upload size={20} />
                        {saving ? 'Adding...' : 'Add Screenshot'}
                      </button>
                    </div>

                    {/* Display existing screenshots */}
                    {screenshots.length > 0 && (
                      <>
                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="text-gray-900 mb-4">Current Screenshots ({screenshots.length})</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {screenshots.map((screenshot, index) => (
                            <div
                              key={screenshot.id}
                              className="bg-gray-50 rounded-xl p-4 relative border border-gray-200"
                            >
                              <img
                                src={screenshot.screenshot_url}
                                alt={screenshot.caption || `Screenshot ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/400x800?text=Image+Not+Found';
                                }}
                              />
                              <button
                                onClick={() => handleDeleteScreenshot(screenshot.id)}
                                className="absolute top-6 right-6 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                title="Delete screenshot"
                              >
                                <X size={16} />
                              </button>
                              {screenshot.caption && (
                                <p className="text-sm text-gray-700 mt-2">
                                  {screenshot.caption}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                Order: {screenshot.display_order + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {screenshots.length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">No screenshots uploaded yet</p>
                        <p className="text-sm text-gray-400 mt-1">Add your first screenshot above</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
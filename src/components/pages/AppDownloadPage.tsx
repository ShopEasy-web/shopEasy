import { 
  Smartphone, Download, CheckCircle2, Wifi, 
  ShoppingCart, Package, BarChart3, Clock 
} from 'lucide-react';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AppDownloadPageProps {
  onNavigate: (page: PageType) => void;
}

interface AppSettings {
  playStoreUrl: string;
  appStoreUrl: string;
  apkDownloadUrl: string;
  apkVersion: string;
}

interface AppScreenshot {
  id: string;
  screenshot_url: string;
  display_order: number;
  caption: string;
}

export function AppDownloadPage({ onNavigate }: AppDownloadPageProps) {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    playStoreUrl: '',
    appStoreUrl: '',
    apkDownloadUrl: '',
    apkVersion: '',
  });
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  useEffect(() => {
    fetchAppSettings();
    fetchScreenshots();
  }, []);

  const fetchAppSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching app settings:', error);
        return;
      }

      if (data) {
        setAppSettings({
          playStoreUrl: data.play_store_url || '',
          appStoreUrl: data.app_store_url || '',
          apkDownloadUrl: data.apk_download_url || '',
          apkVersion: data.apk_version || '',
        });
      }
    } catch (err) {
      console.error('Error loading app settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchScreenshots = async () => {
    try {
      const { data, error } = await supabase
        .from('app_screenshots')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching screenshots:', error);
        return;
      }

      if (data) {
        setScreenshots(data.map((item: any) => ({
          id: item.id,
          screenshot_url: item.screenshot_url,
          display_order: item.display_order,
          caption: item.caption || '',
        })));
      }
    } catch (err) {
      console.error('Error loading screenshots:', err);
    }
  };

  const features = [
    {
      icon: ShoppingCart,
      title: 'Mobile POS',
      description: 'Process sales on the go from your phone or tablet',
    },
    {
      icon: Package,
      title: 'Inventory Check',
      description: 'Check stock levels in real-time from anywhere',
    },
    {
      icon: BarChart3,
      title: 'Live Reports',
      description: 'View sales, profit, and analytics on your mobile',
    },
    {
      icon: Wifi,
      title: 'Online System',
      description: 'Cloud-based system with real-time data synchronization',
    },
    {
      icon: Clock,
      title: 'Real-Time Sync',
      description: 'All data syncs automatically across all devices',
    },
  ];

  const faqs = [
    {
      question: 'Is the mobile app free?',
      answer: 'Yes! The mobile app is free to download and is included with all ShopSpot plans. No additional fees.',
    },
    {
      question: 'Does it require internet?',
      answer: 'Yes, ShopSpot is a cloud-based system that requires an active internet connection to function. This ensures real-time data sync across all your branches and devices.',
    },
    {
      question: 'Can multiple devices use the same account?',
      answer: 'Yes, you can log in on multiple devices (phones, tablets, computers) with the same account. All data syncs in real-time.',
    },
    {
      question: 'What devices are supported?',
      answer: 'Android 6.0 and above. iOS version coming soon. The app also works on tablets.',
    },
    {
      question: 'Can I print receipts from mobile?',
      answer: 'Yes, the app supports Bluetooth receipt printers. You can connect and print directly from your mobile device.',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-3xl flex items-center justify-center">
              <Smartphone className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-gray-900 mb-4">ShopSpot Mobile App</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Run your business from anywhere. Process sales, manage inventory, and view reports on the go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            {/* Google Play Store */}
            {appSettings.playStoreUrl ? (
              <a
                href={appSettings.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors"
              >
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div>Google Play</div>
                </div>
              </a>
            ) : (
              <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl opacity-60 cursor-not-allowed">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Coming Soon</div>
                  <div>Google Play</div>
                </div>
              </button>
            )}
            
            {/* Apple App Store */}
            {appSettings.appStoreUrl ? (
              <a
                href={appSettings.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors"
              >
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div>App Store</div>
                </div>
              </a>
            ) : (
              <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl opacity-60 cursor-not-allowed">
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Coming Soon</div>
                  <div>App Store</div>
                </div>
              </button>
            )}
            
            {/* Direct APK Download */}
            {appSettings.apkDownloadUrl && (
              <a
                href={appSettings.apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#005EEA] to-purple-600 text-white px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-blue-100">Direct Download</div>
                  <div>APK File {appSettings.apkVersion && `(${appSettings.apkVersion})`}</div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* App Preview */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-3xl p-8 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-white mb-6">Everything You Need in Your Pocket</h2>
                <p className="text-blue-100 mb-8">
                  The ShopSpot mobile app brings the power of your POS system to your smartphone. Manage your business from anywhere, anytime.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="flex-shrink-0" />
                    <div>
                      <h3 className="text-white mb-1">Full POS Functionality</h3>
                      <p className="text-blue-100">Process sales as quickly as on desktop</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="flex-shrink-0" />
                    <div>
                      <h3 className="text-white mb-1">Real-Time Updates</h3>
                      <p className="text-blue-100">See changes instantly across all devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="flex-shrink-0" />
                    <div>
                      <h3 className="text-white mb-1">Cloud-Based System</h3>
                      <p className="text-blue-100">Secure online platform with automatic data sync</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzY0NjY3NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="ShopSpot Mobile App"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Mobile App Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All the power of ShopSpot, optimized for mobile
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Screenshots */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">App Screenshots</h2>
            <p className="text-gray-600">Preview the ShopSpot mobile experience</p>
          </div>
          {screenshots.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 pb-4">
              {screenshots.map((screen, index) => (
                <div key={screen.id || index} className="flex-shrink-0 w-64">
                  <div className="bg-gray-900 rounded-3xl p-4 aspect-[9/19] overflow-hidden">
                    <img
                      src={screen.screenshot_url}
                      alt={screen.caption || `Screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  {screen.caption && (
                    <p className="text-center text-gray-600 mt-3">{screen.caption}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 pb-4">
              {['Dashboard', 'POS Screen', 'Inventory', 'Reports', 'Settings'].map((screen, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  <div className="bg-gray-900 rounded-3xl p-4 aspect-[9/19]">
                    <div className="bg-gray-800 rounded-2xl h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Smartphone size={48} className="mx-auto mb-2 opacity-50" />
                        <p className="opacity-75">{screen}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-r from-[#005EEA] to-purple-600 rounded-3xl p-12 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Download className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-white mb-4">Download ShopSpot Today</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Take your business mobile and manage everything from your smartphone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            {/* Google Play Store */}
            {appSettings.playStoreUrl ? (
              <a
                href={appSettings.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors"
              >
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div>Google Play</div>
                </div>
              </a>
            ) : (
              <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl opacity-60 cursor-not-allowed">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Coming Soon</div>
                  <div>Google Play</div>
                </div>
              </button>
            )}
            
            {/* Apple App Store */}
            {appSettings.appStoreUrl ? (
              <a
                href={appSettings.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors"
              >
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div>App Store</div>
                </div>
              </a>
            ) : (
              <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl opacity-60 cursor-not-allowed">
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Coming Soon</div>
                  <div>App Store</div>
                </div>
              </button>
            )}
            
            {/* Direct APK Download */}
            {appSettings.apkDownloadUrl && (
              <a
                href={appSettings.apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#005EEA] to-purple-600 text-white px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-blue-100">Direct Download</div>
                  <div>APK File {appSettings.apkVersion && `(${appSettings.apkVersion})`}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
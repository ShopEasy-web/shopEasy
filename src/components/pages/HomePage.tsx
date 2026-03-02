import { CheckCircle2, BarChart3, TrendingUp, Users, ShoppingBag, Zap, Play, Download, Smartphone, Headphones as HeadphonesIcon, GraduationCap } from 'lucide-react';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CONTACT_INFO } from '../ContactInfo';
import { openYouTubePlaylist } from '../../lib/settings';
import { useSettings } from '../../lib/useSettings';
import dashboardImage from 'figma:asset/503cdb7f69b403d177c0ab1f10c659026cbc3827.png';
import mobileAppImage from 'figma:asset/976aec07f1cfa552efa95a68fdb014e75e5aff83.png';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { settings } = useSettings();
  
  const handleSignup = () => {
    window.open(settings.signupUrl, '_blank');
  };

  const handleDownloadApp = () => {
    // If APK URL is set, download directly, otherwise navigate to download page
    if (settings.apkDownloadUrl) {
      window.open(settings.apkDownloadUrl, '_blank');
    } else {
      onNavigate('download');
    }
  };

  const handleWatchTutorial = () => {
    openYouTubePlaylist(settings);
  };

  const features = [
    { icon: CheckCircle2, label: 'Smart POS' },
    { icon: BarChart3, label: 'Barcode Scanning' },
    { icon: TrendingUp, label: 'Multi-Branch' },
    { icon: Users, label: 'Warehouse Management' },
    { icon: ShoppingBag, label: 'Supplier Management' },
    { icon: Zap, label: 'Transfers & Receiving' },
    { icon: Play, label: 'No Duplication' },
  ];

  const pricingPlans = [
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
      popular: true,
    },
    {
      name: 'Growth / Pro',
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
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#005EEA] via-[#0047B3] to-purple-600 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white mb-6">
                Smart POS for Growing Businesses Across Africa
              </h1>
              <p className="text-blue-100 mb-8 max-w-xl">
                Multi-branch POS, Inventory, Warehouses, Suppliers, and Full Business Management — all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleSignup}
                  className="bg-white text-[#005EEA] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Register Free
                </button>
                <button 
                  onClick={handleDownloadApp}
                  className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#005EEA] transition-colors"
                >
                  Download App
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={dashboardImage}
                  alt="ShopSpot Dashboard"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-8">
            Trusted by retailers and businesses across Nigeria & Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400">🏪 1,000+ Retailers</div>
            <div className="text-gray-400">🌍 50+ Cities</div>
            <div className="text-gray-400">📦 10M+ Transactions</div>
          </div>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Everything You Need to Manage Your Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for African businesses
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <p className="text-gray-900">{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">How ShopSpot Works</h2>
            <p className="text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                1
              </div>
              <h3 className="text-gray-900 mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for free and choose your plan
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                2
              </div>
              <h3 className="text-gray-900 mb-3">Add Your Setup</h3>
              <p className="text-gray-600">
                Add branches, warehouses, and products
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                3
              </div>
              <h3 className="text-gray-900 mb-3">Start Selling</h3>
              <p className="text-gray-600">
                Begin processing sales instantly
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={handleWatchTutorial}
              className="inline-flex items-center gap-2 text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              <Play size={20} />
              Watch Tutorial on YouTube
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Choose the plan that fits your business size</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl p-8 ${
                  index === 1 
                    ? 'bg-gradient-to-br from-[#005EEA] to-purple-600 text-white shadow-xl' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {index === 1 && (
                  <span className="bg-white text-[#005EEA] px-3 py-1 rounded-full text-sm inline-block mb-4">
                    Popular
                  </span>
                )}
                <h3 className={index === 1 ? 'text-white mb-2' : 'text-gray-900 mb-2'}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={index === 1 ? 'text-white' : 'text-gray-900'}>
                    {plan.price}
                  </span>
                  <span className={index === 1 ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mb-6 ${index === 1 ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle2 size={20} className={index === 1 ? 'text-white flex-shrink-0' : 'text-[#005EEA] flex-shrink-0'} />
                      <span className={index === 1 ? 'text-white' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleSignup}
                  className={`w-full py-3 rounded-full transition-colors ${
                    index === 1 
                      ? 'bg-white text-[#005EEA] hover:bg-gray-100' 
                      : 'bg-[#005EEA] text-white hover:bg-[#0047B3]'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('pricing')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              View Full Pricing Details →
            </button>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-6">Take Your Business Mobile</h2>
              <p className="text-gray-300 mb-8">
                Manage your business on-the-go with our mobile app. Process sales, check inventory, and view reports from anywhere with internet connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {settings.apkDownloadUrl ? (
                  <a
                    href={settings.apkDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                  >
                    <Download size={24} />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Download</div>
                      <div>APK File</div>
                    </div>
                  </a>
                ) : (
                  <button 
                    onClick={() => onNavigate('download')}
                    className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                  >
                    <Download size={24} />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Learn More</div>
                      <div>Mobile App</div>
                    </div>
                  </button>
                )}
                <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors opacity-60 cursor-not-allowed">
                  <Smartphone size={24} />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Coming Soon</div>
                    <div>App Store</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src={mobileAppImage}
                alt="ShopSpot Mobile App"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support & Training */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-gray-900 mb-4">We're Here to Help</h2>
                <p className="text-gray-600 mb-6">
                  We offer 24/7 support, onboarding assistance, and physical setup for businesses. Our team ensures you get the most out of ShopSpot.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#005EEA] rounded-xl flex items-center justify-center flex-shrink-0">
                      <HeadphonesIcon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">24/7 Customer Support</h3>
                      <p className="text-gray-600">WhatsApp, phone, and email support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#005EEA] rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">On-Site Training</h3>
                      <p className="text-gray-600">Professional setup and staff training at your location</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button 
                    onClick={() => onNavigate('support')}
                    className="bg-[#005EEA] text-white px-6 py-3 rounded-full hover:bg-[#0047B3] transition-colors"
                  >
                    Contact Support
                  </button>
                  <button 
                    onClick={() => onNavigate('training')}
                    className="border-2 border-[#005EEA] text-[#005EEA] px-6 py-3 rounded-full hover:bg-[#005EEA] hover:text-white transition-colors"
                  >
                    Book Training
                  </button>
                </div>
              </div>
              <div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3VwcG9ydCUyMHRlYW18ZW58MXx8fHwxNzY0NzU4MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Customer Support"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#005EEA] to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Start Using ShopSpot Today</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses across Africa managing their operations with ShopSpot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleSignup}
              className="bg-white text-[#005EEA] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              Register Free Account
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#005EEA] transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
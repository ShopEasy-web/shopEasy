import { MessageCircle, Mail, Phone, Youtube, HelpCircle, BookOpen, Video } from 'lucide-react';
import { PageType } from '../../App';
import { useState, useEffect } from 'react';
import { getSettings, getWhatsAppUrl } from '../../lib/settings';

interface SupportPageProps {
  onNavigate: (page: PageType) => void;
}

export function SupportPage({ onNavigate }: SupportPageProps) {
  const [settings, setSettings] = useState(getSettings());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Listen for settings updates
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getSettings());
    };
    
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => window.removeEventListener('settingsUpdated', handleSettingsUpdate);
  }, []);

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Chat with our support team',
      contact: settings.whatsapp,
      cta: 'Chat on WhatsApp',
      color: 'from-green-500 to-green-600',
      action: () => window.open(getWhatsAppUrl(settings), '_blank'),
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly to our team',
      contact: settings.phone,
      cta: 'Call Now',
      color: 'from-blue-500 to-blue-600',
      action: () => window.location.href = `tel:${settings.phone}`,
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: settings.email,
      cta: 'Send Email',
      color: 'from-purple-500 to-purple-600',
      action: () => window.location.href = `mailto:${settings.email}`,
    },
  ];

  const faqs = [
    {
      question: 'How do I set up my first branch?',
      answer: 'After signing up, navigate to Settings > Branches > Add New Branch. Enter your branch details including name, location, and assign a manager. You can then start adding products to that branch.',
    },
    {
      question: 'Does ShopSpot require internet connection?',
      answer: 'Yes, ShopSpot is a cloud-based system that requires an active internet connection to function. This ensures real-time data sync across all your branches and devices.',
    },
    {
      question: 'How do I transfer stock between branches?',
      answer: 'Go to Inventory > Transfers > New Transfer. Select the source branch/warehouse, destination, products, and quantities. The receiving location will be notified to accept or reject the transfer.',
    },
    {
      question: 'Can I customize receipt templates?',
      answer: 'Yes, you can customize your receipt template with your logo, business information, and footer message. Go to Settings > Receipt Settings.',
    },
    {
      question: 'How do I add staff members?',
      answer: 'Navigate to Settings > Staff > Add Staff Member. Enter their details and assign a role (Owner, Admin, Manager, Cashier, Auditor, or Warehouse Manager). They will receive login credentials.',
    },
    {
      question: 'What payment methods are supported?',
      answer: 'ShopSpot supports cash, card, bank transfer, and mobile money payments. You can track all payment methods in your reports.',
    },
    {
      question: 'How do I export my data?',
      answer: 'All reports can be exported to Excel or PDF. Go to Reports, select your report type, choose date range, and click Export.',
    },
    {
      question: 'Is my data backed up?',
      answer: 'Yes, we automatically backup your data multiple times daily. Your information is encrypted and stored securely in multiple locations.',
    },
  ];

  const tutorials = [
    { title: 'Getting Started with ShopSpot', duration: '5:30' },
    { title: 'Setting Up Your First Branch', duration: '8:15' },
    { title: 'Adding Products & Inventory', duration: '6:45' },
    { title: 'Processing Your First Sale', duration: '4:20' },
    { title: 'Managing Multiple Branches', duration: '10:30' },
    { title: 'Warehouse & Transfer Management', duration: '12:00' },
    { title: 'Understanding Reports', duration: '9:15' },
    { title: 'Staff Roles & Permissions', duration: '7:40' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-4">We're Here to Help</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get support 24/7 through multiple channels. Our team is ready to assist you.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <p className="text-gray-900 mb-6">{channel.contact}</p>
                <button className="bg-[#005EEA] text-white px-6 py-2 rounded-full hover:bg-[#0047B3] transition-colors" onClick={channel.action}>
                  {channel.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Video Tutorials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Youtube className="text-red-600" size={32} />
              <h2 className="text-gray-900">Video Tutorials</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch step-by-step video guides on how to use ShopSpot
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <Youtube className="text-white mx-auto mb-4" size={64} />
                <p className="text-white">ShopSpot Tutorial Playlist</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="text-red-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{tutorial.title}</h3>
                    <p className="text-gray-500">{tutorial.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-4">Common Issues & Solutions</h2>
            <p className="text-gray-600">Quick fixes for the most common problems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-2">App Not Syncing?</h3>
              <p className="text-gray-600 mb-3">Check your internet connection and try manually syncing from Settings → Sync Now.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-2">Printer Not Working?</h3>
              <p className="text-gray-600 mb-3">Ensure your printer is connected and turned on. Check Settings → Printer Settings.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-2">Forgot Password?</h3>
              <p className="text-gray-600 mb-3">Click "Forgot Password" on the login page and follow the reset instructions sent to your email.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-2">Stock Count Incorrect?</h3>
              <p className="text-gray-600 mb-3">Perform a stock audit from Inventory → Stock Audit to reconcile your counts.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-gray-900">{faq.question}</span>
                  <HelpCircle
                    size={20}
                    className={`text-[#005EEA] flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* On-Site Training CTA */}
        <div className="bg-gradient-to-r from-[#005EEA] to-purple-600 rounded-3xl p-12 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="text-white" size={32} />
          </div>
          <h2 className="text-white mb-4">Need In-Person Training?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We offer professional on-site training and setup services. Our team can visit your location to train your staff and ensure smooth implementation.
          </p>
          <button
            onClick={() => onNavigate('training')}
            className="bg-white text-[#005EEA] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Request On-Site Training
          </button>
        </div>
      </div>
    </div>
  );
}
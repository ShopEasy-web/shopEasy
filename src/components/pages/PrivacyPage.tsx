import { PageType } from '../../App';
import { getSettings } from '../../lib/settings';
import { useState, useEffect } from 'react';

interface PrivacyPageProps {
  onNavigate: (page: PageType) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  const [settings, setSettings] = useState(getSettings());

  // Listen for settings updates
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getSettings());
    };
    
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => window.removeEventListener('settingsUpdated', handleSettingsUpdate);
  }, []);

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: December 3, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 m-0">
              At ShopSpot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              When you register for ShopSpot, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Name and contact information (email, phone number)</li>
              <li>Business name and address</li>
              <li>Payment information (processed securely through payment providers)</li>
              <li>Account credentials (username and encrypted password)</li>
            </ul>

            <h3 className="text-gray-900 mb-3">Business Data</h3>
            <p className="text-gray-600 mb-4">
              When you use our service, we store:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Product inventory and pricing information</li>
              <li>Sales transactions and customer data</li>
              <li>Employee information and access logs</li>
              <li>Branch and warehouse details</li>
              <li>Supplier information</li>
            </ul>

            <h3 className="text-gray-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Usage data and analytics</li>
              <li>Log files and error reports</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and maintain the ShopSpot service</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Send important notifications and updates</li>
              <li>Provide customer support and training</li>
              <li>Improve our service and develop new features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">3. Data Storage and Security</h2>
            
            <h3 className="text-gray-900 mb-3">Where We Store Data</h3>
            <p className="text-gray-600 mb-4">
              Your data is stored on secure cloud servers. We use reputable cloud infrastructure providers with data centers that comply with international security standards.
            </p>

            <h3 className="text-gray-900 mb-3">Security Measures</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Data encryption in transit (SSL/TLS) and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Regular automated backups</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>

            <p className="text-gray-600 mb-4">
              While we implement strong security measures, no system is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>

            <h3 className="text-gray-900 mb-3">Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We work with third-party service providers who help us operate our business:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>Email service providers</li>
              <li>Analytics services</li>
            </ul>

            <h3 className="text-gray-900 mb-3">Legal Requirements</h3>
            <p className="text-gray-600 mb-4">
              We may disclose your information if required by law, court order, or government request.
            </p>

            <h3 className="text-gray-900 mb-3">Business Transfers</h3>
            <p className="text-gray-600 mb-4">
              In case of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">5. Your Data Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li><strong>Export:</strong> Export your business data in standard formats</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request restriction of data processing</li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise these rights, contact us at {settings.email}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your data for as long as your account is active or as needed to provide services. After account termination:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Active data is retained for 90 days</li>
              <li>Backup data may be retained for up to 1 year</li>
              <li>Some data may be retained longer for legal or regulatory requirements</li>
              <li>You can request immediate deletion by contacting support</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve service performance</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You can control cookie settings in your browser, but this may affect service functionality.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              ShopSpot is not intended for use by individuals under 18 years of age. We do not knowingly collect data from children. If we discover we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              Your data may be transferred to and processed in countries other than Nigeria. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">10. Changes to Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the service. The "Last updated" date at the top indicates when the policy was last revised.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-2">
              <li><strong>Email:</strong> {settings.email}</li>
              <li><strong>Phone:</strong> {settings.phone}</li>
              <li><strong>Address:</strong> {settings.address}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">12. Consent</h2>
            <p className="text-gray-600 mb-4">
              By using ShopSpot, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree, please do not use our service.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-center">
            Your privacy and data security are important to us. We are committed to protecting your information.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              Back to Home
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => onNavigate('terms')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
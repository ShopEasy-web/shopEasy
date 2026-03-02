import { PageType } from '../../App';
import { getSettings } from '../../lib/settings';
import { useState, useEffect } from 'react';

interface TermsPageProps {
  onNavigate: (page: PageType) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
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
          <h1 className="text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-gray-600">Last updated: December 3, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 m-0">
              Please read these Terms of Use carefully before using ShopSpot. By accessing or using our service, you agree to be bound by these terms.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By creating an account and using ShopSpot ("the Service"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-600 mb-4">
              ShopSpot provides a cloud-based point of sale (POS) and business management platform for retail businesses. The service includes inventory management, multi-branch operations, warehouse management, reporting, and related features.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">3. Account Registration</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must notify us immediately of any unauthorized access to your account</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>Accounts are non-transferable</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">4. Subscription and Payment</h2>
            <p className="text-gray-600 mb-4">
              ShopSpot operates on a subscription-based model:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Subscription fees are billed monthly in advance</li>
              <li>All fees are stated in Nigerian Naira (₦)</li>
              <li>Payment is due at the beginning of each billing cycle</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>Refunds are provided in accordance with our refund policy</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the service for any illegal purposes</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Upload malicious code or viruses</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Resell or redistribute the service without authorization</li>
              <li>Use the service to compete with ShopSpot</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">6. Data and Privacy</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your data. By using ShopSpot, you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">7. Data Backup and Security</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>We perform regular automated backups of your data</li>
              <li>You are responsible for maintaining your own backup copies</li>
              <li>We implement industry-standard security measures</li>
              <li>We cannot guarantee absolute security of data transmission</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-600 mb-4">
              While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the service. We may perform scheduled maintenance with advance notice. We are not liable for any downtime or service interruptions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content, features, and functionality of ShopSpot are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, ShopSpot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account at any time for violation of these terms. You may cancel your subscription at any time. Upon termination, your access to the service will cease, and we may delete your data after a reasonable period.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Nigeria.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these Terms of Use, please contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-2">
              <li>Email: {settings.email}</li>
              <li>Phone: {settings.phone}</li>
              <li>Address: {settings.address}</li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-center">
            By using ShopSpot, you acknowledge that you have read and understood these Terms of Use.
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
              onClick={() => onNavigate('privacy')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { PageType } from '../../App';
import { useSettings } from '../../lib/useSettings';
import { getWhatsAppUrl } from '../../lib/settings';
import { useState } from 'react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { settings } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Initialize Supabase client
  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save directly to Supabase database (no Edge Functions)
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'unread',
        });

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to send message. Please try WhatsApp or email.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: [settings.phone],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: [settings.whatsapp],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [settings.email],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: [settings.address, `${settings.city}, ${settings.state}`],
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, dIndex) => (
                  <p key={dIndex} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-gray-900 mb-6">Send Us a Message</h2>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-2">Message Sent Successfully! ✓</h3>
                    <p className="text-green-700 text-sm">
                      Thank you for contacting us. We've received your message and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-3 text-green-600 hover:text-green-800 text-sm underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="training">On-Site Training</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#005EEA] text-white px-8 py-4 rounded-full hover:bg-[#0047B3] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div>
            <h2 className="text-gray-900 mb-6">Visit Our Office</h2>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-6" style={{ height: '400px' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Map Location</p>
                  <p>123 Business District, Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  For urgent support outside office hours, please use our 24/7 WhatsApp or email support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-gray-900 mb-3">Sales Inquiry</h3>
            <p className="text-gray-600 mb-6">
              Interested in ShopSpot for your business? Talk to our sales team.
            </p>
            <button className="text-[#005EEA] hover:text-[#0047B3] transition-colors">
              Contact Sales →
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-gray-900 mb-3">Technical Support</h3>
            <p className="text-gray-600 mb-6">
              Need help with your account? Our support team is ready to assist.
            </p>
            <button
              onClick={() => onNavigate('support')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              Get Support →
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-gray-900 mb-3">On-Site Training</h3>
            <p className="text-gray-600 mb-6">
              Book professional training at your business location.
            </p>
            <button
              onClick={() => onNavigate('training')}
              className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
            >
              Book Training →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
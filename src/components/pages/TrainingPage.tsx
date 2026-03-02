import { Calendar, MapPin, Users, Clock, Send, CheckCircle2, DollarSign, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TrainingPageProps {
  onNavigate: (page: PageType) => void;
}

export function TrainingPage({ onNavigate }: TrainingPageProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    preferredDate: '',
    numberOfStaff: '',
    trainingType: '',
    additionalNotes: '',
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
        .from('training_requests')
        .insert({
          name: formData.contactName,  // Changed from contact_name to name
          email: formData.email,
          phone: formData.phone,
          business_name: formData.businessName,
          location: formData.location,
          branches: formData.numberOfStaff,  // Changed from number_of_staff to branches
          preferred_date: formData.preferredDate,
          message: formData.additionalNotes,  // Changed from additional_notes to message
          status: 'unread',
        });

      if (error) {
        throw new Error(error.message || 'Failed to submit training request');
      }

      toast.success('Training request submitted! We\'ll contact you within 24 hours.');
      setSubmitSuccess(true);  // Show success message
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        location: '',
        preferredDate: '',
        numberOfStaff: '',
        trainingType: '',
        additionalNotes: '',
      });
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to submit request. Please contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const included = [
    'Complete system setup at your location',
    'Staff training (all roles: cashiers, managers, warehouse staff)',
    'Product catalog setup',
    'Barcode scanner configuration',
    'Receipt printer setup',
    'Branch and warehouse configuration',
    'Live demonstration with real sales',
    'Post-training support (2 weeks)',
    'Training materials and guides',
    'Follow-up session (optional)',
  ];

  const pricingOptions = [
    {
      title: 'Basic Training',
      price: '₦50,000',
      duration: 'Half Day (4 hours)',
      features: [
        'Up to 5 staff members',
        'Single location',
        'Basic POS operations',
        'Inventory basics',
        'Sales & reports',
      ],
    },
    {
      title: 'Standard Training',
      price: '₦100,000',
      duration: 'Full Day (8 hours)',
      features: [
        'Up to 10 staff members',
        '1-2 locations',
        'Complete POS training',
        'Full inventory management',
        'Warehouse operations',
        'Staff roles setup',
        'Advanced reporting',
      ],
      popular: true,
    },
    {
      title: 'Premium Training',
      price: '₦200,000',
      duration: '2 Days',
      features: [
        'Up to 20 staff members',
        'Multiple locations',
        'Everything in Standard',
        'Multi-branch operations',
        'Supplier management',
        'Custom workflows',
        'Dedicated trainer',
        '30 days support',
      ],
    },
  ];

  const areas = [
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Benin City',
    'Enugu',
    'Kaduna',
    'Custom Location (Extra Fee)',
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-3xl flex items-center justify-center">
              <GraduationCap className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-gray-900 mb-4">Professional On-Site Training</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your team up and running with professional training at your business location. We handle setup, training, and ongoing support.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758873268998-2f77c2d38862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYWluaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NjQ3NTgxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Training Session"
            className="w-full"
          />
        </div>

        {/* What's Included */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">What's Included</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete setup and training package
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-[#005EEA] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Options */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Training Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the package that fits your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded-3xl p-8 ${
                  option.popular
                    ? 'bg-gradient-to-br from-[#005EEA] to-purple-600 text-white shadow-2xl transform scale-105'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {option.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`mb-2 text-center ${option.popular ? 'text-white' : 'text-gray-900'}`}>
                  {option.title}
                </h3>
                <div className="text-center mb-4">
                  <div className={`${option.popular ? 'text-white' : 'text-gray-900'}`}>
                    {option.price}
                  </div>
                  <div className={`${option.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {option.duration}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle2
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${
                          option.popular ? 'text-white' : 'text-[#005EEA]'
                        }`}
                      />
                      <span className={option.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full transition-colors ${
                    option.popular
                      ? 'bg-white text-[#005EEA] hover:bg-gray-100'
                      : 'bg-[#005EEA] text-white hover:bg-[#0047B3]'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Areas Covered */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Areas We Cover</h2>
            <p className="text-gray-600">We provide on-site training across Nigeria</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {areas.map((area, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <MapPin size={20} className="text-[#005EEA] flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Don't see your location? Contact us for availability and pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <h2 className="text-gray-900 mb-6 text-center">Request Training Session</h2>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-2">Training Request Submitted Successfully! ✓</h3>
                    <p className="text-green-700 text-sm mb-2">
                      Thank you for requesting training. Our team will review your request and contact you within 24 hours to confirm the schedule and finalize arrangements.
                    </p>
                    <p className="text-green-700 text-sm">
                      <strong>What's Next?</strong> We'll call or WhatsApp you to discuss your training package, confirm the date, and answer any questions.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-3 text-green-600 hover:text-green-800 text-sm underline"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-gray-700 mb-2">
                    Location/City *
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="numberOfStaff" className="block text-gray-700 mb-2">
                    Number of Staff
                  </label>
                  <input
                    type="number"
                    id="numberOfStaff"
                    value={formData.numberOfStaff}
                    onChange={(e) => setFormData({ ...formData, numberOfStaff: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-gray-700 mb-2">
                  Preferred Training Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="trainingType" className="block text-gray-700 mb-2">
                  Type of Training
                </label>
                <select
                  id="trainingType"
                  value={formData.trainingType}
                  onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent"
                >
                  <option value="">Select Training Type</option>
                  <option value="Basic Training">Basic Training</option>
                  <option value="Standard Training">Standard Training</option>
                  <option value="Premium Training">Premium Training</option>
                </select>
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EEA] focus:border-transparent resize-none"
                  placeholder="Tell us about your specific training needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#005EEA] text-white px-8 py-4 rounded-full hover:bg-[#0047B3] transition-colors"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Request Training'}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Choose dates and times that work for your business</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Expert Trainers</h3>
            <p className="text-gray-600">Experienced professionals who understand retail</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Money-Back Guarantee</h3>
            <p className="text-gray-600">Satisfied or your money back, no questions asked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
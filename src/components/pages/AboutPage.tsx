import { Target, Eye, Heart, Award, Users, Zap } from 'lucide-react';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CONTACT_INFO } from '../ContactInfo';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const handleSignup = () => {
    window.open(CONTACT_INFO.signupUrl, '_blank');
  };

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the center of everything we do',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly improving and adapting to business needs',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building stronger businesses across Africa together',
    },
  ];

  const stats = [
    { number: '1,000+', label: 'Active Businesses' },
    { number: '50+', label: 'Cities Covered' },
    { number: '10M+', label: 'Transactions Processed' },
    { number: '99.9%', label: 'Uptime' },
  ];

  const reasons = [
    {
      title: 'Built for Africa',
      description: 'Understanding the unique challenges of African businesses, from unreliable internet to complex inventory needs.',
    },
    {
      title: 'Proven Track Record',
      description: 'Trusted by hundreds of businesses across Nigeria and beyond, processing millions of transactions daily.',
    },
    {
      title: 'Continuous Support',
      description: '24/7 customer support, regular training, and on-site assistance whenever you need it.',
    },
    {
      title: 'Scalable Solution',
      description: 'Grow from a single shop to a nationwide chain without changing systems.',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-6">Empowering African Businesses</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ShopSpot was born from a simple mission: to provide African businesses with world-class retail management technology that actually works in African conditions.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758633854855-3059c5b48674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcmV0YWlsJTIwc3RvcmV8ZW58MXx8fHwxNzY0NzU4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="About ShopSpot"
            className="w-full"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-3xl p-8 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="text-white" size={24} />
            </div>
            <h2 className="text-white mb-4">Our Mission</h2>
            <p className="text-blue-100">
              To empower African businesses with smart retail technology that simplifies operations, increases profits, and enables growth. We believe every business, regardless of size, deserves access to professional-grade tools.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Eye className="text-white" size={24} />
            </div>
            <h2 className="text-white mb-4">Our Vision</h2>
            <p className="text-purple-100">
              To become the leading retail management platform across Africa, helping millions of businesses streamline their operations and achieve sustainable growth through technology.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* The ShopSpot Team */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">The ShopSpot Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team combines decades of experience in retail, technology, and business management to deliver a solution that truly understands your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-gray-900 mb-2">Experienced Engineers</h3>
              <p className="text-gray-600">
                Building robust, scalable software that works in real African conditions
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-gray-900 mb-2">Retail Experts</h3>
              <p className="text-gray-600">
                Deep understanding of retail operations and business challenges
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-gray-900 mb-2">Support Specialists</h3>
              <p className="text-gray-600">
                Dedicated to ensuring your success every step of the way
              </p>
            </div>
          </div>
        </div>

        {/* Why Trust ShopSpot */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Businesses Trust ShopSpot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#005EEA] to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Join Thousands of Growing Businesses</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start managing your business the smart way with ShopSpot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSignup}
              className="bg-white text-[#005EEA] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#005EEA] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
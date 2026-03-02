import { CheckCircle2, HelpCircle } from 'lucide-react';
import { PageType } from '../../App';
import { useState } from 'react';
import { useSettings } from '../../lib/useSettings';

interface PricingPageProps {
  onNavigate: (page: PageType) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { settings } = useSettings();

  const handleSignup = () => {
    window.open(settings.signupUrl, '_blank');
  };

  const plans = settings.pricingPlans;

  const faqs = [
    {
      question: 'Can I upgrade anytime?',
      answer: 'Yes! You can upgrade your plan at any time. The changes will take effect immediately, and you\'ll only pay the prorated difference for the remainder of your billing cycle.',
    },
    {
      question: 'Do I get a free trial?',
      answer: 'Yes, we offer a 7-day free trial for all new users. No credit card required to start your trial. Experience all the features before committing to a plan.',
    },
    {
      question: 'Will my data stay safe?',
      answer: 'Absolutely. We use enterprise-grade encryption and security measures to protect your data. Regular backups ensure your information is always safe and recoverable.',
    },
    {
      question: 'Can I add more users?',
      answer: 'Yes, you can add more users based on your plan. Each plan supports different staff roles including owners, admins, managers, cashiers, auditors, and warehouse managers.',
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'If you need more branches or warehouses than your current plan allows, we\'ll notify you and help you upgrade to a suitable plan that meets your needs.',
    },
    {
      question: 'Do you offer discounts for annual payments?',
      answer: 'Yes! Pay annually and get 2 months free (equivalent to 16% discount). Contact our sales team for details on annual billing.',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include core POS features, with scalability options as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 relative ${
                plan.popular
                  ? 'bg-gradient-to-br from-[#005EEA] to-purple-600 text-white shadow-2xl transform scale-105'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className={`${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-white' : 'text-[#005EEA]'
                      }`}
                    />
                    <span className={`${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleSignup}
                className={`w-full py-3 rounded-full transition-colors ${
                  plan.popular
                    ? 'bg-white text-[#005EEA] hover:bg-gray-100'
                    : 'bg-[#005EEA] text-white hover:bg-[#0047B3]'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Note */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-20 text-center">
          <p className="text-gray-700">
            Not sure which plan is right for you?{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#005EEA] hover:text-[#0047B3]"
            >
              Contact our sales team
            </button>{' '}
            for a personalized recommendation.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
                  <div className="px-6 pb-5 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#005EEA] to-purple-600 rounded-3xl p-12 text-center text-white mt-20">
          <h2 className="text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your 7-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#005EEA] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors" onClick={handleSignup}>
              Start Free Trial
            </button>
            <button
              onClick={() => onNavigate('features')}
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#005EEA] transition-colors"
            >
              View All Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
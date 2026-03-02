import { Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { PageType } from '../App';
import { CONTACT_INFO } from './ContactInfo';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignup = () => {
    window.open(CONTACT_INFO.signupUrl, '_blank');
  };

  const navItems = [
    { label: 'Home', page: 'home' as PageType },
    { label: 'Features', page: 'features' as PageType },
    { label: 'Pricing', page: 'pricing' as PageType },
    { label: 'About', page: 'about' as PageType },
    { label: 'Support', page: 'support' as PageType },
    { label: 'Contact', page: 'contact' as PageType },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white">SE</span>
            </div>
            <span className="text-gray-900">ShopSpot</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === item.page
                    ? 'text-[#005EEA]'
                    : 'text-gray-600 hover:text-[#005EEA]'
                } transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleSignup}
              className="text-gray-600 hover:text-[#005EEA] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleSignup}
              className="bg-[#005EEA] text-white px-6 py-2 rounded-full hover:bg-[#0047B3] transition-colors"
            >
              Register Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 ${
                    currentPage === item.page
                      ? 'text-[#005EEA]'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                <button 
                  onClick={handleSignup}
                  className="w-full text-center py-2 text-gray-600 border border-gray-300 rounded-full"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignup}
                  className="w-full text-center py-2 bg-[#005EEA] text-white rounded-full"
                >
                  Register Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
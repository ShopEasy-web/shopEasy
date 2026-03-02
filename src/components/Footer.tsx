import { Facebook, Twitter, Instagram, Linkedin, Youtube, Shield } from 'lucide-react';
import { PageType } from '../App';
import { CONTACT_INFO } from './ContactInfo';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleYouTubeClick = () => {
    if (CONTACT_INFO.youtubeChannelUrl) {
      window.open(CONTACT_INFO.youtubeChannelUrl, '_blank');
    } else {
      window.open('https://www.youtube.com', '_blank');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white">SE</span>
              </div>
              <span className="text-white">ShopSpot</span>
            </div>
            <p className="text-gray-400 mb-4">
              Smart POS for Growing Businesses Across Africa. Multi-branch POS, Inventory, Warehouses, and Full Business Management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#005EEA] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#005EEA] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#005EEA] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#005EEA] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#005EEA] transition-colors" onClick={handleYouTubeClick}>
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-[#005EEA] transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-[#005EEA] transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('download')} className="hover:text-[#005EEA] transition-colors">
                  Download App
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-[#005EEA] transition-colors">
                  On-Site Training
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#005EEA] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-[#005EEA] transition-colors">
                  Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#005EEA] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#005EEA] transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#005EEA] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hover:text-[#005EEA] transition-colors opacity-50 hover:opacity-100"
                  title="Admin Dashboard"
                >
                  <Shield size={16} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ShopSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
import { 
  ShoppingCart, Package, Building2, Warehouse, Users, 
  Shield, BarChart3, Plug, CheckCircle2, Barcode,
  Wifi, WifiOff, ArrowRightLeft, FileText, TrendingUp,
  DollarSign, Clock, UserCheck
} from 'lucide-react';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CONTACT_INFO } from '../ContactInfo';

interface FeaturesPageProps {
  onNavigate: (page: PageType) => void;
}

export function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  const handleSignup = () => {
    window.open(CONTACT_INFO.signupUrl, '_blank');
  };

  const featureSections = [
    {
      title: 'Point of Sale',
      icon: ShoppingCart,
      description: 'Lightning-fast checkout experience designed for busy retail environments',
      features: [
        'Fast checkout process',
        'Barcode scanning',
        'Real-time stock sync',
        'Works online/offline',
        'Multiple payment methods',
        'Receipt printing',
        'Customer tracking',
        'Discounts & promotions',
      ],
      image: 'https://images.unsplash.com/photo-1641029956071-272caab5857a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGNoZWNrb3V0fGVufDF8fHx8MTc2NDc1ODEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Inventory Management',
      icon: Package,
      description: 'Complete control over your stock with intelligent tracking and alerts',
      features: [
        'Separate inventory for each branch',
        'Warehouse → Branch transfers',
        'Receiving page for new stock',
        'Auto-prevents duplicate products',
        'Accurate quantity tracking',
        'Low stock alerts',
        'Product categories & variants',
        'Batch & expiry tracking',
      ],
      image: 'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnZlbnRvcnl8ZW58MXx8fHwxNzY0NzI0NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Multi-Branch Dashboard',
      icon: Building2,
      description: 'Manage all your locations from a single, unified interface',
      features: [
        'Dedicated dashboards per branch',
        'Easy branch switching',
        'Staff access by role',
        'Branch-level analytics',
        'Consolidated reporting',
        'Inter-branch comparisons',
        'Centralized product catalog',
        'Branch-specific pricing',
      ],
      image: 'https://images.unsplash.com/photo-1758633854855-3059c5b48674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcmV0YWlsJTIwc3RvcmV8ZW58MXx8fHwxNzY0NzU4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Warehouse Management',
      icon: Warehouse,
      description: 'Efficiently manage your central stock distribution',
      features: [
        'Manage warehouse stock',
        'Send items to branches',
        'Accept or reject transfers',
        'Track all movement logs',
        'Stock taking & audits',
        'Warehouse-to-warehouse transfers',
        'Bulk operations',
        'Stock reconciliation',
      ],
      image: 'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnZlbnRvcnl8ZW58MXx8fHwxNzY0NzI0NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Supplier Management',
      icon: Users,
      description: 'Keep track of your suppliers and procurement history',
      features: [
        'Add and manage suppliers',
        'Upload supplier invoices',
        'Track supply history',
        'Supplier performance metrics',
        'Payment tracking',
        'Order management',
        'Supplier contact details',
        'Purchase order generation',
      ],
      image: 'https://images.unsplash.com/photo-1687422808191-93810cd07ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBvd25lcnxlbnwxfHx8fDE3NjQ3NTgxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const staffRoles = [
    {
      role: 'Owner',
      icon: Shield,
      description: 'Full system access and control',
      permissions: ['All permissions', 'User management', 'Billing & subscriptions', 'System settings'],
    },
    {
      role: 'Admin',
      icon: UserCheck,
      description: 'Manage operations and staff',
      permissions: ['Manage branches', 'Manage staff', 'View all reports', 'Inventory control'],
    },
    {
      role: 'Manager',
      icon: Building2,
      description: 'Branch-level management',
      permissions: ['Branch operations', 'Staff scheduling', 'Branch reports', 'Price adjustments'],
    },
    {
      role: 'Cashier',
      icon: ShoppingCart,
      description: 'Process sales and transactions',
      permissions: ['POS access', 'Process sales', 'View product info', 'Generate receipts'],
    },
    {
      role: 'Auditor',
      icon: FileText,
      description: 'Review and audit operations',
      permissions: ['View all reports', 'Export data', 'Stock audits', 'Transaction reviews'],
    },
    {
      role: 'Warehouse Manager',
      icon: Warehouse,
      description: 'Manage warehouse operations',
      permissions: ['Warehouse access', 'Manage stock', 'Process transfers', 'Receiving goods'],
    },
  ];

  const reportingFeatures = [
    { icon: DollarSign, title: 'Sales Reports', description: 'Track daily, weekly, and monthly sales' },
    { icon: TrendingUp, title: 'Profit Analysis', description: 'Monitor profit margins and trends' },
    { icon: Package, title: 'Inventory Valuation', description: 'Real-time stock value calculation' },
    { icon: FileText, title: 'Expense Reports', description: 'Track business expenses' },
    { icon: ArrowRightLeft, title: 'Transfer Reports', description: 'Monitor stock movements' },
    { icon: BarChart3, title: 'Custom Reports', description: 'Build reports for your needs' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-4">Powerful Features for Modern Businesses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage and grow your retail business across multiple locations
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-24 mb-24">
          {featureSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-2xl flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h2 className="text-gray-900">{section.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{section.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-[#005EEA] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback src={section.image} alt={section.title} className="w-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staff Management Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Staff Management & Roles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Assign roles and permissions to control what each team member can access
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h3 className="text-gray-900">{role.role}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <ul className="space-y-2">
                    {role.permissions.map((permission, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-[#005EEA] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reports & Analytics */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make data-driven decisions with comprehensive reporting and analytics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Integrations & Deployment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect ShopSpot with your existing systems
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="text-white" size={24} />
              </div>
              <h3 className="text-gray-900 mb-3">On-Site Deployment</h3>
              <p className="text-gray-600 mb-4">
                We can deploy ShopSpot directly at your business location with full setup and staff training.
              </p>
              <button
                onClick={() => onNavigate('training')}
                className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
              >
                Learn More →
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#005EEA] to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Plug className="text-white" size={24} />
              </div>
              <h3 className="text-gray-900 mb-3">ERP/API Integration</h3>
              <p className="text-gray-600 mb-4">
                Enterprise plan includes API access for integration with your existing ERP systems and custom applications.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="text-[#005EEA] hover:text-[#0047B3] transition-colors"
              >
                Contact Sales →
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#005EEA] to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Ready to Experience These Features?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial and see how ShopSpot can transform your business operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#005EEA] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors" onClick={handleSignup}>
              Start Free Trial
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#005EEA] transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
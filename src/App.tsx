import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { PricingPage } from './components/pages/PricingPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { AboutPage } from './components/pages/AboutPage';
import { SupportPage } from './components/pages/SupportPage';
import { ContactPage } from './components/pages/ContactPage';
import { AppDownloadPage } from './components/pages/AppDownloadPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { AdminPage } from './components/pages/AdminPage';
import { DiagnosticPage } from './components/pages/DiagnosticPage';
import { Toaster } from './components/ui/sonner';

export type PageType = 'home' | 'pricing' | 'features' | 'about' | 'support' | 'contact' | 'download' | 'training' | 'terms' | 'privacy' | 'admin' | 'diagnostic';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'pricing':
        return <PricingPage onNavigate={setCurrentPage} />;
      case 'features':
        return <FeaturesPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'support':
        return <SupportPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'download':
        return <AppDownloadPage onNavigate={setCurrentPage} />;
      case 'training':
        return <TrainingPage onNavigate={setCurrentPage} />;
      case 'terms':
        return <TermsPage onNavigate={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      case 'diagnostic':
        return <DiagnosticPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
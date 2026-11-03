import { useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation, useNavigate } from "react-router";
import type { PageType } from "./App";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./components/pages/HomePage";
import { PricingPage } from "./components/pages/PricingPage";
import { FeaturesPage } from "./components/pages/FeaturesPage";
import { AboutPage } from "./components/pages/AboutPage";
import { SupportPage } from "./components/pages/SupportPage";
import { ContactPage } from "./components/pages/ContactPage";
import { AppDownloadPage } from "./components/pages/AppDownloadPage";
import { TrainingPage } from "./components/pages/TrainingPage";
import { TermsPage } from "./components/pages/TermsPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { AdminPage } from "./components/pages/AdminPage";
import { DiagnosticPage } from "./components/pages/DiagnosticPage";

const pagePaths: Record<PageType, string> = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  about: "/about",
  support: "/support",
  contact: "/contact",
  download: "/download",
  training: "/training",
  terms: "/terms",
  privacy: "/privacy",
  admin: "/admin",
  diagnostic: "/diagnostic",
};

const pathPages = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page]),
) as Record<string, PageType>;

function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pathPages[location.pathname] ?? "home";
  const onNavigate = (page: PageType) => navigate(pagePaths[page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main><Outlet /></main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

function RoutedPage({
  Component,
}: {
  Component: React.ComponentType<{ onNavigate: (page: PageType) => void }>;
}) {
  const navigate = useNavigate();
  const onNavigate = (page: PageType) => navigate(pagePaths[page]);
  return <Component onNavigate={onNavigate} />;
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 font-mono text-sm text-primary">404 / PAGE NOT FOUND</p>
      <h1 className="mb-4 text-4xl font-semibold text-gray-950">This page has moved.</h1>
      <p className="mb-8 text-gray-600">Return to the ShopSpot homepage to keep exploring.</p>
      <button onClick={() => navigate("/")} className="rounded-full bg-primary px-7 py-3 text-primary-foreground transition hover:opacity-90">
        Back to home
      </button>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, element: <RoutedPage Component={HomePage} /> },
      { path: "features", element: <RoutedPage Component={FeaturesPage} /> },
      { path: "pricing", element: <RoutedPage Component={PricingPage} /> },
      { path: "about", element: <RoutedPage Component={AboutPage} /> },
      { path: "support", element: <RoutedPage Component={SupportPage} /> },
      { path: "contact", element: <RoutedPage Component={ContactPage} /> },
      { path: "download", element: <RoutedPage Component={AppDownloadPage} /> },
      { path: "training", element: <RoutedPage Component={TrainingPage} /> },
      { path: "terms", element: <RoutedPage Component={TermsPage} /> },
      { path: "privacy", element: <RoutedPage Component={PrivacyPage} /> },
      { path: "admin", element: <RoutedPage Component={AdminPage} /> },
      { path: "diagnostic", Component: DiagnosticPage },
      { path: "*", Component: NotFound },
    ],
  },
]);

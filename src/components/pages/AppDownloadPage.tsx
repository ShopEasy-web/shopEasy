import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, BarChart3, Check, Download, HardDriveDownload, Package,
  ShieldCheck, ShoppingCart, Smartphone, Wifi, X,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import type { PageType } from "../../App";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import dashboardScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.07_PM.jpeg";
import posScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.06_PM__3_.jpeg";
import inventoryScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.06_PM__2_.jpeg";
import analyticsScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.06_PM__1_.jpeg";
import settingsScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.06_PM.jpeg";
import warehouseScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.05_PM.jpeg";
import supplierScreenshot from "../../../imports/WhatsApp_Image_2026-11-03_at_4.21.05_PM__1_.jpeg";

interface AppDownloadPageProps {
  onNavigate: (page: PageType) => void;
}

interface AppSettings {
  playStoreUrl: string;
  appStoreUrl: string;
  apkDownloadUrl: string;
  apkVersion: string;
}

interface Screenshot {
  id: string;
  screenshot_url: string;
  caption: string;
}

const suppliedScreenshots: Screenshot[] = [
  { id: "dashboard", screenshot_url: dashboardScreenshot, caption: "Business dashboard" },
  { id: "pos", screenshot_url: posScreenshot, caption: "Mobile POS terminal" },
  { id: "inventory", screenshot_url: inventoryScreenshot, caption: "Inventory management" },
  { id: "analytics", screenshot_url: analyticsScreenshot, caption: "Revenue & profit analytics" },
  { id: "settings", screenshot_url: settingsScreenshot, caption: "Organisation settings" },
  { id: "warehouse", screenshot_url: warehouseScreenshot, caption: "Warehouse management" },
  { id: "suppliers", screenshot_url: supplierScreenshot, caption: "Supplier management" },
];

const features = [
  { icon: ShoppingCart, title: "Sell anywhere", copy: "A fast mobile POS with barcode scanning." },
  { icon: Package, title: "Know your stock", copy: "Live inventory across branches and warehouses." },
  { icon: BarChart3, title: "See the full picture", copy: "Sales, revenue and profit reports on demand." },
  { icon: Wifi, title: "Always in sync", copy: "Cloud updates keep every device current." },
];

export function AppDownloadPage({ onNavigate }: AppDownloadPageProps) {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    playStoreUrl: "", appStoreUrl: "", apkDownloadUrl: "", apkVersion: "",
  });
  const [remoteScreenshots, setRemoteScreenshots] = useState<Screenshot[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [activeImage, setActiveImage] = useState<Screenshot | null>(null);
  const supabase = useMemo(
    () => createClient(`https://${projectId}.supabase.co`, publicAnonKey),
    [],
  );

  useEffect(() => {
    const loadContent = async () => {
      const [settingsResult, screenshotsResult] = await Promise.all([
        supabase.from("app_settings").select("*").limit(1).maybeSingle(),
        supabase.from("app_screenshots").select("*").order("display_order", { ascending: true }),
      ]);
      if (settingsResult.data) {
        setAppSettings({
          playStoreUrl: settingsResult.data.play_store_url || "",
          appStoreUrl: settingsResult.data.app_store_url || "",
          apkDownloadUrl: settingsResult.data.apk_download_url || "",
          apkVersion: settingsResult.data.apk_version || "",
        });
      }
      if (screenshotsResult.data) {
        setRemoteScreenshots(screenshotsResult.data.map((item) => ({
          id: item.id,
          screenshot_url: item.screenshot_url,
          caption: item.caption || "ShopSpot app screen",
        })));
      }
    };
    loadContent();
  }, [supabase]);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else onNavigate("home");
  };

  const downloadApk = async () => {
    if (!appSettings.apkDownloadUrl || downloading) return;
    setDownloading(true);
    try {
      const response = await fetch(appSettings.apkDownloadUrl);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `ShopSpot${appSettings.apkVersion ? `-${appSettings.apkVersion}` : ""}.apk`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      toast.success("ShopSpot download started");
    } catch {
      toast.error("The app file is temporarily unavailable. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const screenshots = [...suppliedScreenshots, ...remoteScreenshots];

  return (
    <div className="overflow-hidden bg-[#f8faff]">
      <section className="relative border-b border-blue-100 bg-[#071b4b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(114,63,255,0.45),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(0,94,234,0.45),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <button onClick={goBack} className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-50 backdrop-blur transition hover:bg-white/20">
              <ArrowLeft size={17} /> Go back
            </button>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-blue-200">
              <span className="h-px w-8 bg-blue-300" /> Android app
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">
              Your entire business, in your pocket.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/80">
              Sell, track inventory and follow every branch from one fast, secure ShopSpot app.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={downloadApk} disabled={!appSettings.apkDownloadUrl || downloading} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-[#071b4b] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                <HardDriveDownload size={22} />
                <span className="text-left">
                  <span className="block text-xs font-normal text-slate-500">
                    {appSettings.apkDownloadUrl ? "Direct from ShopSpot" : "File being prepared"}
                  </span>
                  <span className="block font-semibold">{downloading ? "Preparing download…" : "Download Android APK"}</span>
                </span>
              </button>
              {appSettings.apkVersion && <span className="flex items-center justify-center px-4 text-sm text-blue-200">Version {appSettings.apkVersion}</span>}
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/75">
              <span className="flex items-center gap-2"><ShieldCheck size={17} /> Secure APK</span>
              <span className="flex items-center gap-2"><Check size={17} /> Android 6+</span>
              <span className="flex items-center gap-2"><Check size={17} /> Included with every plan</span>
            </div>
          </div>
          <div className="relative mt-16 hidden min-h-[550px] lg:block">
            <div className="absolute left-12 top-2 w-64 rotate-[-7deg] overflow-hidden rounded-[2.2rem] border-[7px] border-slate-950 bg-white shadow-2xl shadow-black/40">
              <ImageWithFallback src={posScreenshot} alt="ShopSpot mobile point of sale screen" className="block w-full" />
            </div>
            <div className="absolute right-2 top-20 w-64 rotate-[6deg] overflow-hidden rounded-[2.2rem] border-[7px] border-slate-950 bg-white shadow-2xl shadow-black/40">
              <ImageWithFallback src={dashboardScreenshot} alt="ShopSpot mobile dashboard screen" className="block w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="bg-white p-7">
              <Icon className="mb-8 text-[#005EEA]" size={26} />
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#005EEA]">Real product screens</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">See ShopSpot in action</h2>
            </div>
            <p className="max-w-md text-slate-600">Tap any screen for a closer look. Swipe horizontally on mobile to explore all seven views.</p>
          </div>
          <div className="flex snap-x gap-5 overflow-x-auto pb-5">
            {screenshots.map((screen) => (
              <button key={screen.id} onClick={() => setActiveImage(screen)} className="group w-[235px] flex-none snap-start text-left sm:w-[270px]">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <ImageWithFallback src={screen.screenshot_url} alt={screen.caption} className="aspect-[540/1230] w-full object-cover" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-800">{screen.caption}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Smartphone className="mx-auto mb-6 text-[#005EEA]" size={40} />
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl">Ready to take ShopSpot with you?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">Download the Android app directly. No Google Drive, no third-party download page.</p>
        <button onClick={downloadApk} disabled={!appSettings.apkDownloadUrl || downloading} className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#005EEA] to-[#7938E8] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
          <Download size={21} /> {downloading ? "Preparing download…" : "Download ShopSpot APK"}
        </button>
      </section>

      {activeImage && (
        <div role="dialog" aria-modal="true" aria-label={activeImage.caption} onClick={() => setActiveImage(null)} className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-5 backdrop-blur-sm">
          <button onClick={() => setActiveImage(null)} className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Close screenshot"><X /></button>
          <ImageWithFallback onClick={(event) => event.stopPropagation()} src={activeImage.screenshot_url} alt={activeImage.caption} className="max-h-[88vh] w-auto rounded-3xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardHome } from "./components/dashboard/DashboardHome";
import { TradingTerminal } from "./components/dashboard/TradingTerminal";
import { SpotTrading } from "./components/dashboard/SpotTrading";
import { MarginTrading } from "./components/dashboard/MarginTrading";
import { CopyTrading } from "./components/dashboard/CopyTrading";
import { BotTrading } from "./components/dashboard/BotTrading";
import { StocksTrading } from "./components/dashboard/StocksTrading";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import PublicLayout from "./layouts/PublicLayout";
import Markets from "./pages/public/Markets";
import Features from "./pages/public/Features";
import About from "./pages/public/About";
import CopyTradingInfo from "./pages/public/CopyTradingInfo";
import FAQ from "./pages/public/FAQ";
import Privacy from "./pages/public/Privacy";
import Contact from "./pages/public/Contact";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";
import Notifications from "./pages/Notifications";
import ProfileSettings from "./pages/settings/ProfileSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import PaymentSettings from "./pages/settings/PaymentSettings";
import ApiKeySettings from "./pages/settings/ApiKeySettings";
import HelpSettings from "./pages/settings/HelpSettings";
import LegalSettings from "./pages/settings/LegalSettings";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<PublicLayout />}>
            <Route path="/markets" element={<Markets />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/copy-trading-info" element={<CopyTradingInfo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="terminal" element={<TradingTerminal />} />
            <Route path="spot" element={<SpotTrading />} />
            <Route path="margin" element={<MarginTrading />} />
            <Route path="copy-trading" element={<CopyTrading />} />
            <Route path="bot-trading" element={<BotTrading />} />
            <Route path="stocks" element={<StocksTrading />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />}>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="payment" element={<PaymentSettings />} />
              <Route path="api-keys" element={<ApiKeySettings />} />
              <Route path="help" element={<HelpSettings />} />
              <Route path="legal" element={<LegalSettings />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

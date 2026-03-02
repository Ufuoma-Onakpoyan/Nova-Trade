import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Settings, User, Shield, Bell, CreditCard, Key, HelpCircle, FileText, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const settingsSections = [
  { icon: User, label: "Profile", path: "/settings/profile", description: "Manage your personal information" },
  { icon: Shield, label: "Security", path: "/settings/security", description: "Two-factor authentication, password" },
  { icon: Bell, label: "Notifications", path: "/settings/notifications", description: "Email and push notification preferences" },
  { icon: CreditCard, label: "Payment Methods", path: "/settings/payment", description: "Manage deposit and withdrawal methods" },
  { icon: Key, label: "API Keys", path: "/settings/api-keys", description: "Create and manage API access keys" },
  { icon: HelpCircle, label: "Help & Support", path: "/settings/help", description: "FAQ, contact support, documentation" },
  { icon: FileText, label: "Legal", path: "/settings/legal", description: "Terms of service, privacy policy" },
];

const SettingsIndex = () => (
  <>
    {/* Profile card */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">JD</div>
        <div>
          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-muted-foreground">john.doe@email.com</p>
          <p className="text-xs text-primary mt-1">Verified Account ✓</p>
        </div>
      </div>
    </motion.div>

    {/* Settings list */}
    <div className="space-y-2">
      {settingsSections.map((section, i) => (
        <motion.div key={section.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
          <Link to={section.path} className="w-full glass-card-hover p-4 rounded-xl flex items-center gap-4 text-left block">
            <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <section.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{section.label}</div>
              <div className="text-xs text-muted-foreground">{section.description}</div>
            </div>
            <span className="text-muted-foreground text-sm">›</span>
          </Link>
        </motion.div>
      ))}
    </div>

    <div className="pt-4">
      <Button variant="outline" asChild className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10">
        <Link to="/auth">Sign Out</Link>
      </Button>
    </div>
  </>
);

const SettingsPage = () => {
  const location = useLocation();
  const isIndex = location.pathname === "/settings";

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full min-w-0">
      <div className="flex items-center gap-3">
        {!isIndex && (
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences and security</p>
        </div>
      </div>

      {isIndex ? <SettingsIndex /> : <Outlet />}
    </div>
  );
};

export default SettingsPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

const categories = [
  { key: "trades", label: "Trade Alerts", desc: "Order fills, liquidations, PnL updates" },
  { key: "price", label: "Price Alerts", desc: "Price targets and significant moves" },
  { key: "system", label: "System", desc: "Maintenance, updates, security notices" },
  { key: "promo", label: "Promotions", desc: "Rewards, referrals, and campaigns" },
];

const channels = ["Email", "Push", "SMS"] as const;

export default function NotificationSettings() {
  const [settings, setSettings] = useState<Record<string, Record<string, boolean>>>(() => {
    const init: Record<string, Record<string, boolean>> = {};
    categories.forEach((c) => { init[c.key] = { Email: true, Push: true, SMS: false }; });
    return init;
  });

  const toggle = (cat: string, ch: string) => {
    setSettings((prev) => ({
      ...prev,
      [cat]: { ...prev[cat], [ch]: !prev[cat][ch] },
    }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Notifications</h2>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_repeat(3,64px)] gap-2 p-4 border-b border-border/30 text-xs text-muted-foreground font-medium">
          <span>Category</span>
          {channels.map((ch) => <span key={ch} className="text-center">{ch}</span>)}
        </div>

        {categories.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-[1fr_repeat(3,64px)] gap-2 p-4 items-center border-b border-border/20 last:border-0"
          >
            <div>
              <p className="text-sm font-medium">{cat.label}</p>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </div>
            {channels.map((ch) => (
              <div key={ch} className="flex justify-center">
                <Switch checked={settings[cat.key][ch]} onCheckedChange={() => toggle(cat.key, ch)} />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

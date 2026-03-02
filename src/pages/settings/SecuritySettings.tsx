import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Smartphone, Monitor, Globe } from "lucide-react";
import { toast } from "sonner";

const sessions = [
  { id: 1, device: "Chrome — macOS", icon: Monitor, location: "San Francisco, US", time: "Active now" },
  { id: 2, device: "Safari — iPhone", icon: Smartphone, location: "San Francisco, US", time: "2 hrs ago" },
  { id: 3, device: "Firefox — Windows", icon: Globe, location: "New York, US", time: "3 days ago" },
];

export default function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Security</h2>
        <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold">Change Password</h3>
        <div className="space-y-3 max-w-sm">
          <div><label className="text-xs text-muted-foreground mb-1 block">Current Password</label><Input type="password" className="h-10 bg-muted/50 border-border/50 rounded-xl" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">New Password</label><Input type="password" className="h-10 bg-muted/50 border-border/50 rounded-xl" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Confirm Password</label><Input type="password" className="h-10 bg-muted/50 border-border/50 rounded-xl" /></div>
        </div>
        <Button className="rounded-xl" onClick={() => toast.success("Password updated")}>Update Password</Button>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><Shield className="h-5 w-5 text-primary" /></div>
            <div>
              <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
          </div>
          <Switch checked={twoFA} onCheckedChange={(v) => { setTwoFA(v); toast(v ? "2FA enabled" : "2FA disabled"); }} />
        </div>
        {twoFA && (
          <div className="mt-4 p-4 bg-muted/30 rounded-xl text-center">
            <div className="h-32 w-32 mx-auto bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground text-xs mb-2">QR Code Placeholder</div>
            <p className="text-xs text-muted-foreground">Scan with your authenticator app</p>
          </div>
        )}
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-sm font-semibold mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{s.device}</p>
                  <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                </div>
              </div>
              {s.time !== "Active now" && (
                <Button variant="ghost" size="sm" className="text-destructive text-xs" onClick={() => toast("Session revoked")}>Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

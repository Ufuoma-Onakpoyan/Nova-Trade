import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfileSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">JD</div>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast("Avatar upload — Coming soon")}>Change Avatar</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className="text-xs text-muted-foreground mb-1 block">First Name</label><Input className="h-10 bg-muted/50 border-border/50 rounded-xl" defaultValue="John" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Last Name</label><Input className="h-10 bg-muted/50 border-border/50 rounded-xl" defaultValue="Doe" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Email</label><Input className="h-10 bg-muted/50 border-border/50 rounded-xl" defaultValue="john.doe@email.com" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Phone</label><Input className="h-10 bg-muted/50 border-border/50 rounded-xl" defaultValue="+1 234 567 890" /></div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Bio</label>
          <textarea className="w-full h-20 bg-muted/50 border border-border/50 rounded-xl p-3 text-sm outline-none focus:border-primary/50 transition-colors resize-none" defaultValue="Crypto enthusiast and swing trader since 2020." />
        </div>

        <div className="flex justify-end">
          <Button className="rounded-xl" onClick={() => toast.success("Profile saved")}>Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
}

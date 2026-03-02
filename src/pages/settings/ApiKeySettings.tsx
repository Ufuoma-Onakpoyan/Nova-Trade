import { motion } from "framer-motion";
import { Key, Plus, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const apiKeys = [
  { id: 1, name: "Trading Bot", key: "ntk_****...a3f2", created: "Feb 15, 2026", permissions: "Read, Trade", status: "Active" },
  { id: 2, name: "Portfolio Tracker", key: "ntk_****...b7d1", created: "Jan 20, 2026", permissions: "Read Only", status: "Active" },
  { id: 3, name: "Test Key", key: "ntk_****...c9e4", created: "Dec 10, 2025", permissions: "Read, Trade, Withdraw", status: "Expired" },
];

export default function ApiKeySettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold mb-1">API Keys</h2>
          <p className="text-sm text-muted-foreground">Create and manage API access keys</p>
        </div>
        <Button className="rounded-xl" onClick={() => toast("Create key — Coming soon")}>
          <Plus className="h-4 w-4 mr-1" /> Create Key
        </Button>
      </div>

      <div className="space-y-3">
        {apiKeys.map((k, i) => (
          <motion.div
            key={k.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 rounded-xl"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <Key className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{k.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{k.key}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${k.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {k.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Created {k.created} · {k.permissions}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast("Key copied")}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast("Delete — Coming soon")}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

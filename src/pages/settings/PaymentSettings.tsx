import { motion } from "framer-motion";
import { CreditCard, Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const methods = [
  { id: 1, type: "card", label: "Visa ending in 4242", expiry: "12/27", icon: CreditCard },
  { id: 2, type: "card", label: "Mastercard ending in 8888", expiry: "06/26", icon: CreditCard },
  { id: 3, type: "bank", label: "Chase Checking ••••1234", expiry: null, icon: Building2 },
];

export default function PaymentSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold mb-1">Payment Methods</h2>
          <p className="text-sm text-muted-foreground">Manage your deposit and withdrawal methods</p>
        </div>
        <Button className="rounded-xl" onClick={() => toast("Add method — Coming soon")}>
          <Plus className="h-4 w-4 mr-1" /> Add Method
        </Button>
      </div>

      <div className="space-y-3">
        {methods.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 rounded-xl flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <m.icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{m.label}</p>
              {m.expiry && <p className="text-xs text-muted-foreground">Expires {m.expiry}</p>}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => toast("Edit — Coming soon")}>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => toast("Delete — Coming soon")}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { walletData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const filterTabs = ["All", "Deposits", "Withdrawals", "Transfers"] as const;
type FilterTab = typeof filterTabs[number];

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", className: "text-success bg-success/10" },
  pending: { icon: Clock, label: "Pending", className: "text-warning bg-warning/10" },
  failed: { icon: XCircle, label: "Failed", className: "text-destructive bg-destructive/10" },
};

const typeIcons = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  transfer: ArrowLeftRight,
};

export default function WalletPage() {
  const [filter, setFilter] = useState<FilterTab>("All");
  const [displayBalance, setDisplayBalance] = useState(walletData.totalBalance);

  const filtered = walletData.transactions.filter((tx) => {
    if (filter === "All") return true;
    if (filter === "Deposits") return tx.type === "deposit";
    if (filter === "Withdrawals") return tx.type === "withdrawal";
    return tx.type === "transfer";
  });

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto min-w-0 px-0 sm:px-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Wallet</h1>
        <p className="text-sm text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Balance cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h2 className="text-3xl font-bold font-mono-num">${displayBalance.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "Spot", value: walletData.accounts.spot },
            { label: "Margin", value: walletData.accounts.margin },
            { label: "Funding", value: walletData.accounts.funding },
          ].map((acc) => (
            <div key={acc.label} className="bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">{acc.label}</p>
              <p className="text-sm font-bold font-mono-num">${acc.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 rounded-xl"
            onClick={() => {
              toast("Deposit requested (demo)");
              setDisplayBalance((prev) => prev + 5000);
            }}
          >
            <ArrowDownToLine className="h-4 w-4 mr-2" /> Deposit
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => toast("Withdrawal requested (demo)")}>
            <ArrowUpFromLine className="h-4 w-4 mr-2" /> Withdraw
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => toast("Transfer requested (demo)")}>
            <ArrowLeftRight className="h-4 w-4 mr-2" /> Transfer
          </Button>
        </div>
      </motion.div>

      {/* Transaction history */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Transaction History</h3>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filter === tab ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((tx, i) => {
            const Icon = typeIcons[tx.type as keyof typeof typeIcons];
            const status = statusConfig[tx.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/20 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-mono-num font-semibold ${tx.amount >= 0 ? "text-success" : "text-destructive"}`}>
                    {tx.amount >= 0 ? "+" : ""}{tx.amount.toLocaleString()}
                  </p>
                  <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${status.className}`}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

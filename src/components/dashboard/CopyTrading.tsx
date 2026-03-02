import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { topTraders } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Target, TrendingUp, X } from "lucide-react";

export function CopyTrading() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<typeof topTraders[0] | null>(null);

  const handleCopy = (trader: typeof topTraders[0]) => {
    setSelectedTrader(trader);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Copy Trading</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" /> Top Performing Traders
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topTraders.map((trader, i) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card-hover p-5 rounded-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {trader.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{trader.name}</h3>
                  <p className="text-xs text-muted-foreground">{trader.strategy}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                trader.risk === "Low" ? "bg-success/10 text-success" :
                trader.risk === "Medium" ? "bg-warning/10 text-warning" :
                "bg-destructive/10 text-destructive"
              }`}>
                {trader.risk}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="h-3 w-3 text-warning" />
                </div>
                <div className="text-sm font-bold font-mono-num price-up">+{trader.roi}%</div>
                <div className="text-[10px] text-muted-foreground">ROI</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-3 w-3 text-primary" />
                </div>
                <div className="text-sm font-bold font-mono-num">{trader.winRate}%</div>
                <div className="text-[10px] text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-3 w-3 text-chart-4" />
                </div>
                <div className="text-sm font-bold font-mono-num">{(trader.followers / 1000).toFixed(1)}K</div>
                <div className="text-[10px] text-muted-foreground">Followers</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>PnL: <span className="price-up font-mono-num">{trader.pnl}</span></span>
              <span>{trader.trades.toLocaleString()} trades</span>
            </div>

            <Button
              onClick={() => handleCopy(trader)}
              className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              variant="ghost"
            >
              <Users className="h-4 w-4 mr-2" /> Copy Trader
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Copy confirmation modal */}
      <AnimatePresence>
        {showModal && selectedTrader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl w-full max-w-md border border-primary/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Copy {selectedTrader.name}</h3>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="glass-card p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    {selectedTrader.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{selectedTrader.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedTrader.strategy}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROI</span>
                    <span className="price-up font-mono-num">+{selectedTrader.roi}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-mono-num">{selectedTrader.winRate}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Investment Amount (USDT)</label>
                  <input
                    className="w-full h-10 px-3 rounded-xl bg-muted/50 border border-border/50 text-sm font-mono-num outline-none focus:border-primary/50"
                    placeholder="1,000"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/5 border border-warning/20 mb-4">
                <TrendingUp className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground">
                  Past performance is not indicative of future results. Copy trading involves risk.
                </p>
              </div>

              <Button
                className="w-full h-11 rounded-xl glow-button bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => {
                  if (selectedTrader) {
                    toast(`Now copying ${selectedTrader.name}`);
                    setShowModal(false);
                  }
                }}
              >
                Start Copying
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

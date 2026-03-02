import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Bot, Grid3X3, TrendingDown, AlertTriangle, X, Play, Pause, Settings2 } from "lucide-react";

const botStrategies = [
  {
    id: "grid",
    name: "Grid Bot",
    icon: Grid3X3,
    description: "Place buy and sell orders at preset intervals within a price range to profit from market fluctuations.",
    color: "primary",
    status: "running",
    profit: "+$1,245.67",
    runtime: "14d 6h",
  },
  {
    id: "dca",
    name: "DCA Bot",
    icon: TrendingDown,
    description: "Automatically buy at regular intervals to average down your entry price over time.",
    color: "success",
    status: "stopped",
    profit: "+$432.12",
    runtime: "30d",
  },
];

export function BotTrading() {
  const [showConfig, setShowConfig] = useState(false);
  const [configBot, setConfigBot] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [gridRange, setGridRange] = useState([60000, 72000]);
  const [gridCount, setGridCount] = useState([10]);

  const handleConfigure = (botId: string) => {
    setConfigBot(botId);
    setShowWarning(true);
  };

  const confirmConfigure = () => {
    setShowWarning(false);
    setShowConfig(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Bot Trading</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bot className="h-4 w-4" /> Automated Strategies
        </div>
      </div>

      {/* Active bots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {botStrategies.map((bot, i) => (
          <motion.div
            key={bot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 rounded-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-11 w-11 rounded-xl bg-${bot.color}/10 flex items-center justify-center`}>
                  <bot.icon className={`h-5 w-5 text-${bot.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{bot.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${bot.status === "running" ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
                    <span className="text-xs text-muted-foreground capitalize">{bot.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                  {bot.status === "running" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <Settings2 size={14} />
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{bot.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="glass-card p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground">Profit</p>
                <p className="text-sm font-mono-num font-bold price-up">{bot.profit}</p>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground">Runtime</p>
                <p className="text-sm font-mono-num font-bold">{bot.runtime}</p>
              </div>
            </div>

            <Button
              onClick={() => handleConfigure(bot.id)}
              variant="ghost"
              className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              Configure Strategy
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Risk Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl w-full max-w-md border border-warning/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Risk Warning</h3>
                  <p className="text-xs text-muted-foreground">Please read before proceeding</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automated trading bots operate based on predefined parameters and market conditions. While they can execute strategies consistently, they carry inherent risks:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Market volatility can lead to unexpected losses",
                    "Past performance does not guarantee future results",
                    "Technical failures may occur during high-volume periods",
                    "You should only invest what you can afford to lose",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-warning mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowWarning(false)} className="flex-1 rounded-xl border-border">
                  Cancel
                </Button>
                <Button onClick={confirmConfigure} className="flex-1 rounded-xl bg-warning hover:bg-warning/90 text-warning-foreground font-semibold">
                  I Understand
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configuration Modal */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowConfig(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl w-full max-w-md border border-primary/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Configure Grid Bot</h3>
                <button onClick={() => setShowConfig(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Trading Pair</label>
                  <Input className="h-10 bg-muted/50 border-border/50 rounded-xl" value="BTC/USDT" readOnly />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price Range (USDT)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" value={gridRange[0].toLocaleString()} readOnly />
                    <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" value={gridRange[1].toLocaleString()} readOnly />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Number of Grids</span>
                    <span className="font-mono-num">{gridCount[0]}</span>
                  </div>
                  <Slider value={gridCount} onValueChange={setGridCount} min={3} max={50} step={1} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Investment (USDT)</label>
                  <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" placeholder="5,000" />
                </div>

                {/* Visual preview */}
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-2">Grid Preview</p>
                  <div className="space-y-1">
                    {Array.from({ length: Math.min(gridCount[0], 8) }, (_, i) => {
                      const price = gridRange[0] + ((gridRange[1] - gridRange[0]) / gridCount[0]) * (gridCount[0] - i);
                      return (
                        <div key={i} className="flex items-center gap-2 text-[10px]">
                          <div className="flex-1 h-px bg-border/50" />
                          <span className="font-mono-num text-muted-foreground w-16 text-right">${Math.round(price).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button
                  className="w-full h-11 rounded-xl glow-button bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  onClick={() => {
                    toast("Bot deployed (demo)");
                    setShowConfig(false);
                  }}
                >
                  Deploy Bot
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

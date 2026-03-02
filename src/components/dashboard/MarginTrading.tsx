import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle, TrendingUp, TrendingDown, Shield } from "lucide-react";

export function MarginTrading() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState([10]);

  const entryPrice = 67842.5;
  const liqPrice = side === "long" 
    ? entryPrice * (1 - 1 / leverage[0]) 
    : entryPrice * (1 + 1 / leverage[0]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Margin Trading</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Risk indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-2xl lg:col-span-2"
        >
          <h3 className="text-sm font-semibold mb-4">Position Calculator</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Entry Price</p>
              <p className="text-xl font-mono-num font-bold">${entryPrice.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Liquidation Price</p>
              <p className={`text-xl font-mono-num font-bold ${side === "long" ? "price-down" : "price-up"}`}>
                ${Math.round(liqPrice).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Leverage selector */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Leverage</span>
              <span className="font-mono-num font-bold text-warning">{leverage[0]}x</span>
            </div>
            <Slider
              value={leverage}
              onValueChange={setLeverage}
              min={1}
              max={125}
              step={1}
              className="[&_[role=slider]]:bg-warning [&_[role=slider]]:border-warning"
            />
            <div className="flex justify-between mt-2">
              {[1, 5, 10, 25, 50, 100, 125].map((v) => (
                <button
                  key={v}
                  onClick={() => setLeverage([v])}
                  className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                    leverage[0] === v ? "bg-warning/20 text-warning" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}x
                </button>
              ))}
            </div>
          </div>

          {/* Risk meter */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Risk Level</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(leverage[0] / 1.25, 100)}%`,
                  background: leverage[0] <= 10 ? "hsl(142, 76%, 46%)" : leverage[0] <= 50 ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {leverage[0] <= 10 ? "Low risk — suitable for most traders" : leverage[0] <= 50 ? "Medium risk — experienced traders recommended" : "⚠️ Extreme risk — potential for rapid liquidation"}
            </p>
          </div>
        </motion.div>

        {/* Order form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-2xl"
        >
          <div className="flex rounded-xl overflow-hidden mb-4 border border-border/50">
            <button
              onClick={() => setSide("long")}
              className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                side === "long" ? "bg-success/20 text-success" : "text-muted-foreground"
              }`}
            >
              <TrendingUp size={14} /> Long
            </button>
            <button
              onClick={() => setSide("short")}
              className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                side === "short" ? "bg-destructive/20 text-destructive" : "text-muted-foreground"
              }`}
            >
              <TrendingDown size={14} /> Short
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Margin (USDT)</label>
              <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" placeholder="1,000" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Take Profit</label>
              <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" placeholder="Optional" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Stop Loss</label>
              <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" placeholder="Optional" />
            </div>

            <div className="glass-card p-3 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Position Size</span>
                <span className="font-mono-num">${(1000 * leverage[0]).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin Ratio</span>
                <span className="font-mono-num">{(100 / leverage[0]).toFixed(1)}%</span>
              </div>
            </div>

            <Button
              className={`w-full h-11 rounded-xl font-semibold text-sm ${
                side === "long"
                  ? "bg-success hover:bg-success/90 text-success-foreground"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }`}
            >
              Open {side === "long" ? "Long" : "Short"} Position
            </Button>

            {leverage[0] > 50 && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-[11px] text-destructive/80">
                  High leverage trading carries significant risk. You could lose your entire margin.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

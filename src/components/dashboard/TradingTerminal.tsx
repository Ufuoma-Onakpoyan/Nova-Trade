import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { generateChartData, generateOrderBook, openPositions, tradeHistory, marketPairs } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const chartData = generateChartData(60);
const orderBook = generateOrderBook();

type DemoTrade = {
  id: number;
  pair: string;
  side: string;
  price: number;
  amount: number;
  total: number;
  time: string;
  status: string;
};

export function TradingTerminal() {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState([25]);
  const [leverage, setLeverage] = useState([10]);
  const [demoTrades, setDemoTrades] = useState<DemoTrade[]>([]);

  const handlePlaceOrder = () => {
    const price = 67842.5;
    const orderAmount = 0.25;
    const total = price * orderAmount;
    toast(side === "buy" ? "Buy order placed (demo)" : "Sell order placed (demo)");
    setDemoTrades((prev) => [
      ...prev,
      {
        id: Date.now(),
        pair: "BTC/USDT",
        side: side === "buy" ? "Buy" : "Sell",
        price,
        amount: orderAmount,
        total,
        time: "Just now",
        status: "Filled",
      },
    ]);
  };

  return (
    <div className="space-y-4 w-full min-w-0 max-w-full">
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-w-0">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-3 glass-card p-4 rounded-2xl min-w-0 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold">BTC/USDT</h3>
              <span className="text-lg sm:text-xl font-mono-num font-bold">$67,842.50</span>
              <span className="text-sm font-mono-num price-up">+2.34%</span>
            </div>
            <div className="flex gap-1">
              {["1H", "4H", "1D", "1W"].map((tf) => (
                <button
                  key={tf}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    tf === "1D" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(192, 95%, 55%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(192, 95%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} interval={10} />
                <YAxis domain={["auto", "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} orientation="right" tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(220, 20%, 7%)", border: "1px solid hsl(220, 15%, 15%)", borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(215, 15%, 50%)" }}
                />
                <Area type="monotone" dataKey="close" stroke="hsl(192, 95%, 55%)" strokeWidth={2} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Volume bars */}
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="volume" fill="hsl(192, 95%, 55%)" opacity={0.2} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Order entry */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 rounded-2xl min-w-0"
        >
          {/* Buy/Sell toggle */}
          <div className="flex rounded-xl overflow-hidden mb-4 border border-border/50">
            <button
              onClick={() => setSide("buy")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                side === "buy" ? "bg-success/20 text-success" : "text-muted-foreground"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSide("sell")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                side === "sell" ? "bg-destructive/20 text-destructive" : "text-muted-foreground"
              }`}
            >
              Sell
            </button>
          </div>

          {/* Order type tabs */}
          <div className="flex gap-2 mb-4">
            {(["market", "limit"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  orderType === t ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {orderType === "limit" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Price (USDT)</label>
                <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" defaultValue="67,842.50" />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Amount (BTC)</label>
              <Input className="h-10 bg-muted/50 border-border/50 rounded-xl font-mono-num" placeholder="0.00" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-mono-num">{amount[0]}%</span>
              </div>
              <Slider value={amount} onValueChange={setAmount} max={100} step={1} className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary" />
              <div className="flex justify-between mt-1">
                {[25, 50, 75, 100].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount([v])}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {v}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Leverage</span>
                <span className="font-mono-num">{leverage[0]}x</span>
              </div>
              <Slider value={leverage} onValueChange={setLeverage} min={1} max={100} step={1} className="[&_[role=slider]]:bg-warning [&_[role=slider]]:border-warning" />
            </div>

            <div className="glass-card p-3 rounded-xl space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Est. Total</span>
                <span className="font-mono-num">$16,960.63</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-mono-num">$8.48</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              className={`w-full h-11 rounded-xl font-semibold text-sm ${
                side === "buy"
                  ? "bg-success hover:bg-success/90 text-success-foreground"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }`}
            >
              {side === "buy" ? "Buy" : "Sell"} BTC
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Order book & positions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Order book */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 rounded-2xl"
        >
          <h4 className="text-sm font-semibold mb-3">Order Book</h4>
          <div className="space-y-0.5 text-xs font-mono-num">
            <div className="flex justify-between text-muted-foreground mb-2">
              <span>Price</span><span>Amount</span>
            </div>
            {orderBook.asks.slice(-8).map((ask, i) => (
              <div key={i} className="flex justify-between py-0.5 relative">
                <div className="absolute right-0 top-0 bottom-0 bg-destructive/10" style={{ width: `${(ask.amount / 5) * 100}%` }} />
                <span className="price-down relative z-10">{ask.price.toLocaleString()}</span>
                <span className="relative z-10">{ask.amount}</span>
              </div>
            ))}
            <div className="text-center py-2 text-base font-bold">67,842.50</div>
            {orderBook.bids.slice(0, 8).map((bid, i) => (
              <div key={i} className="flex justify-between py-0.5 relative">
                <div className="absolute right-0 top-0 bottom-0 bg-success/10" style={{ width: `${(bid.amount / 5) * 100}%` }} />
                <span className="price-up relative z-10">{bid.price.toLocaleString()}</span>
                <span className="relative z-10">{bid.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Positions & History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-3 glass-card rounded-2xl overflow-hidden"
        >
          <Tabs defaultValue="positions" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-transparent h-auto p-0">
              <TabsTrigger value="positions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-xs">
                Open Positions ({openPositions.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-xs">
                Trade History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-left pb-3 font-medium">Pair</th>
                      <th className="text-left pb-3 font-medium">Side</th>
                      <th className="text-right pb-3 font-medium">Size</th>
                      <th className="text-right pb-3 font-medium">Entry</th>
                      <th className="text-right pb-3 font-medium">Mark</th>
                      <th className="text-right pb-3 font-medium">PnL</th>
                      <th className="text-right pb-3 font-medium">Leverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openPositions.map((pos) => (
                      <tr key={pos.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="py-3 font-medium">{pos.pair}</td>
                        <td className={`py-3 ${pos.side === "Long" ? "price-up" : "price-down"}`}>{pos.side}</td>
                        <td className="py-3 text-right font-mono-num">{pos.size}</td>
                        <td className="py-3 text-right font-mono-num">${pos.entryPrice.toLocaleString()}</td>
                        <td className="py-3 text-right font-mono-num">${pos.markPrice.toLocaleString()}</td>
                        <td className={`py-3 text-right font-mono-num ${pos.pnl >= 0 ? "price-up" : "price-down"}`}>
                          ${pos.pnl.toLocaleString()} ({pos.pnlPercent}%)
                        </td>
                        <td className="py-3 text-right">
                          <span className="px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[10px] font-medium">
                            {pos.leverage}x
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-left pb-3 font-medium">Pair</th>
                      <th className="text-left pb-3 font-medium">Side</th>
                      <th className="text-right pb-3 font-medium">Price</th>
                      <th className="text-right pb-3 font-medium">Amount</th>
                      <th className="text-right pb-3 font-medium">Total</th>
                      <th className="text-right pb-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...tradeHistory, ...demoTrades].map((trade) => (
                      <tr key={trade.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="py-3 font-medium">{trade.pair}</td>
                        <td className={`py-3 ${trade.side === "Buy" ? "price-up" : "price-down"}`}>{trade.side}</td>
                        <td className="py-3 text-right font-mono-num">${trade.price.toLocaleString()}</td>
                        <td className="py-3 text-right font-mono-num">{trade.amount}</td>
                        <td className="py-3 text-right font-mono-num">${trade.total.toLocaleString()}</td>
                        <td className="py-3 text-right text-muted-foreground">{trade.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Wallet, ArrowLeftRight, Users, TrendingUp } from "lucide-react";
import { portfolioData, activityFeed, generateSparkline, stockPairs } from "@/data/mockData";
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useLivePrices } from "@/hooks/useLivePrices";
import { LivePrice } from "@/components/ui/LivePrice";
import { useStockMarketsQuery } from "@/hooks/useStockMarketsQuery";

const sparklineData = generateSparkline(24, 1);
const COLORS = ["hsl(43, 96%, 56%)", "hsl(30, 80%, 40%)", "hsl(142, 76%, 46%)", "hsl(38, 92%, 50%)"];

const quickActions = [
  { label: "Deposit", icon: Wallet, color: "from-success/20 to-success/5", path: "/dashboard/wallet" },
  { label: "Withdraw", icon: ArrowUpRight, color: "from-warning/20 to-warning/5", path: "/dashboard/wallet" },
  { label: "Trade", icon: ArrowLeftRight, color: "from-primary/20 to-primary/5", path: "/dashboard/terminal" },
  { label: "Copy", icon: Users, color: "from-chart-4/20 to-chart-4/5", path: "/dashboard/copy-trading" },
];

export function DashboardHome() {
  const { data: apiStocks, isError } = useStockMarketsQuery();
  const baseStocks = apiStocks && !isError ? apiStocks : stockPairs;
  const stockMovers = baseStocks.slice(0, 4);
  const liveStocks = useLivePrices(stockMovers);

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Portfolio overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl lg:col-span-2"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <h2 className="text-3xl font-bold font-mono-num">${portfolioData.totalValue.toLocaleString()}</h2>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-4 w-4 text-success" />
                <span className="text-sm font-mono-num text-success">
                  +${portfolioData.totalPnl.toLocaleString()} ({portfolioData.totalPnlPercent}%)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {["24H", "7D", "30D", "ALL"].map((period) => (
                <button
                  key={period}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    period === "30D"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="hsl(43, 96%, 56%)" strokeWidth={2} fill="url(#sparkGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-2xl"
        >
          <p className="text-sm text-muted-foreground mb-4">Asset Allocation</p>
          <div className="h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData.assets} dataKey="allocation" nameKey="symbol" cx="50%" cy="50%" innerRadius={35} outerRadius={55} strokeWidth={0}>
                  {portfolioData.assets.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {portfolioData.assets.map((asset, i) => (
              <div key={asset.symbol} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground">{asset.symbol}</span>
                </div>
                <span className="font-mono-num">{asset.allocation}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Link
              to={action.path}
              className="glass-card-hover p-4 rounded-xl flex items-center gap-3 text-left block"
            >
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stock market movers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Stock Market Movers</h3>
          </div>
          <Link to="/dashboard/stocks" className="text-xs text-primary hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {liveStocks.map((stock) => (
            <Link to="/dashboard/stocks" key={stock.symbol} className="bg-muted/20 rounded-xl p-3 hover:bg-muted/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{stock.symbol}</span>
                <span className={`text-[10px] font-mono-num ${stock.liveChange >= 0 ? "price-up" : "price-down"}`}>
                  {stock.liveChange >= 0 ? "+" : ""}{stock.liveChange}%
                </span>
              </div>
              <p className="text-sm font-mono-num font-semibold">
                <LivePrice price={stock.livePrice} direction={stock.direction} />
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Assets & activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Your Assets</h3>
            <Link to="/dashboard/spot" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {portfolioData.assets.filter(a => a.symbol !== "MISC").map((asset) => (
              <Link
                to="/dashboard/spot"
                key={asset.symbol}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 hover:bg-muted/20 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {asset.symbol}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{asset.name}</div>
                    <div className="text-xs text-muted-foreground font-mono-num">{asset.amount} {asset.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono-num">${asset.value.toLocaleString()}</div>
                  <div className={`text-xs font-mono-num ${asset.pnlPercent >= 0 ? "price-up" : "price-down"}`}>
                    {asset.pnlPercent >= 0 ? "+" : ""}{asset.pnlPercent}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <Link to="/dashboard/terminal" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

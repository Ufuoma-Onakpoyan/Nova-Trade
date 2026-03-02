import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { marketPairs, generateChartData } from "@/data/mockData";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Search, Star } from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";
import { LivePrice } from "@/components/ui/LivePrice";
import { useCryptoMarketsQuery } from "@/hooks/useCryptoMarketsQuery";

export function SpotTrading() {
  const [selected, setSelected] = useState("BTC/USDT");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: apiPairs, isError } = useCryptoMarketsQuery();

  const basePairs = apiPairs && !isError ? apiPairs : marketPairs;

  const miniCharts = useMemo(
    () =>
      basePairs.map((p) => ({
        ...p,
        chart: generateChartData(20),
      })),
    [basePairs]
  );

  const livePairs = useLivePrices(miniCharts);

  const filtered = livePairs.filter((p) =>
    p.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold shrink-0">Spot Trading</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border/50 min-w-0">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            placeholder="Search pairs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-full min-w-0 max-w-[8rem] sm:max-w-none sm:w-36"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((pair, i) => (
          <motion.button
            key={pair.symbol}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(pair.symbol)}
            className={`glass-card-hover p-4 rounded-xl text-left ${
              selected === pair.symbol ? "border-primary/40" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-semibold">{pair.symbol}</span>
              </div>
              <span className={`text-xs font-mono-num ${pair.liveChange >= 0 ? "price-up" : "price-down"}`}>
                {pair.liveChange >= 0 ? "+" : ""}{pair.liveChange}%
              </span>
            </div>
            <div className="text-lg font-mono-num font-bold mb-2">
              <LivePrice price={pair.livePrice} direction={pair.direction} />
            </div>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pair.chart}>
                  <defs>
                    <linearGradient id={`spot-${pair.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={pair.liveChange >= 0 ? "hsl(142, 76%, 46%)" : "hsl(0, 72%, 51%)"} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={pair.liveChange >= 0 ? "hsl(142, 76%, 46%)" : "hsl(0, 72%, 51%)"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke={pair.liveChange >= 0 ? "hsl(142, 76%, 46%)" : "hsl(0, 72%, 51%)"}
                    strokeWidth={1.5}
                    fill={`url(#spot-${pair.symbol})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Vol: {pair.volume}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

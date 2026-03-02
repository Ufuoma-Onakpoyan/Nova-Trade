import { marketPairs } from "@/data/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";
import { LivePrice } from "@/components/ui/LivePrice";
import { useCryptoMarketsQuery } from "@/hooks/useCryptoMarketsQuery";

export function MarketTicker() {
  const { data: apiPairs, isError } = useCryptoMarketsQuery();
  const basePairs = apiPairs && !isError ? apiPairs : marketPairs;

  const livePairs = useLivePrices(basePairs);
  const doubled = [...livePairs, ...livePairs];

  return (
    <div className="border-t border-b border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {doubled.map((pair, i) => (
          <div
            key={`${pair.symbol}-${i}`}
            className="inline-flex items-center gap-3 px-6 py-3 border-r border-border/30"
          >
            <span className="text-sm font-semibold text-foreground">{pair.symbol}</span>
            <span className="font-mono-num text-sm text-foreground">
              <LivePrice price={pair.livePrice} direction={pair.direction} />
            </span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium font-mono-num ${
                pair.liveChange >= 0 ? "price-up" : "price-down"
              }`}
            >
              {pair.liveChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {pair.liveChange >= 0 ? "+" : ""}
              {pair.liveChange}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

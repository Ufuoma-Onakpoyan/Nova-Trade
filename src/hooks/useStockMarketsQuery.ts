import { useQuery } from "@tanstack/react-query";
import { stockPairs as fallbackStockPairs } from "@/data/mockData";
import type { MarketPair } from "@/types/markets";

/** Stock Price API (stockprices.dev) - no API key required */
interface StockPriceApiQuote {
  Ticker: string;
  Name?: string;
  Price: number;
  ChangeAmount: number;
  ChangePercentage: number;
}

const STOCK_API_BASE = "https://stockprices.dev/api/stocks";

async function fetchQuote(symbol: string): Promise<StockPriceApiQuote | null> {
  try {
    const res = await fetch(`${STOCK_API_BASE}/${encodeURIComponent(symbol)}`);
    if (!res.ok) return null;
    return (await res.json()) as StockPriceApiQuote;
  } catch {
    return null;
  }
}

export function useStockMarketsQuery() {
  return useQuery<MarketPair[]>({
    queryKey: ["stock-markets"],
    queryFn: async () => {
      const updatedPairs = await Promise.all(
        fallbackStockPairs.map(async (pair) => {
          try {
            const quote = await fetchQuote(pair.symbol);
            if (!quote || quote.Price == null) return pair;

            const change = Number((quote.ChangePercentage ?? 0).toFixed(2));
            const price = quote.Price;
            const spread = price * 0.01;

            return {
              ...pair,
              price,
              change,
              high: price + Math.abs(quote.ChangeAmount ?? spread) || pair.high,
              low: price - Math.abs(quote.ChangeAmount ?? spread) || pair.low,
            };
          } catch {
            return pair;
          }
        })
      );

      return updatedPairs;
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
    initialData: fallbackStockPairs,
  });
}

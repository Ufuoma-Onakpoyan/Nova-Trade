import { useQuery } from "@tanstack/react-query";
import { marketPairs as fallbackMarketPairs } from "@/data/mockData";
import type { MarketPair } from "@/types/markets";
import { formatVolume } from "@/types/markets";

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
}

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

function mapCoinGeckoToMarketPairs(data: CoinGeckoMarket[]): MarketPair[] {
  return data.map((d) => ({
    symbol: `${d.symbol.toUpperCase()}/USDT`,
    price: d.current_price,
    change: Number((d.price_change_percentage_24h ?? 0).toFixed(2)),
    volume: formatVolume(d.total_volume),
    high: d.high_24h ?? d.current_price,
    low: d.low_24h ?? d.current_price,
  }));
}

export function useCryptoMarketsQuery() {
  return useQuery<MarketPair[]>({
    queryKey: ["crypto-markets"],
    queryFn: async () => {
      const res = await fetch(COINGECKO_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch crypto markets");
      }
      const json = (await res.json()) as CoinGeckoMarket[];
      return mapCoinGeckoToMarketPairs(json);
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
    initialData: fallbackMarketPairs,
  });
}


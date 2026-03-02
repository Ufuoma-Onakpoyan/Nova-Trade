import { useState, useEffect, useRef, useCallback } from "react";

export type PriceDirection = "up" | "down" | null;

export interface LivePriceEntry {
  symbol: string;
  price: number;
  direction: PriceDirection;
  change: number;
}

interface PairInput {
  symbol: string;
  price: number;
  change: number;
  [key: string]: any;
}

export function useLivePrices<T extends PairInput>(pairs: T[]): (T & { livePrice: number; direction: PriceDirection; liveChange: number })[] {
  const [priceMap, setPriceMap] = useState<Map<string, { price: number; direction: PriceDirection; basePrice: number }>>(
    () => new Map(pairs.map(p => [p.symbol, { price: p.price, direction: null, basePrice: p.price }]))
  );

  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceMap(prev => {
        const next = new Map(prev);
        pairs.forEach(p => {
          const entry = next.get(p.symbol);
          if (!entry) return;
          const delta = entry.price * (Math.random() - 0.5) * 0.01;
          const newPrice = Math.max(0.01, entry.price + delta);
          const direction: PriceDirection = delta >= 0 ? "up" : "down";
          next.set(p.symbol, { ...entry, price: newPrice, direction });
        });
        return next;
      });

      // Reset directions after 600ms
      const resetTimeout = setTimeout(() => {
        setPriceMap(prev => {
          const next = new Map(prev);
          for (const [key, val] of next) {
            if (val.direction !== null) {
              next.set(key, { ...val, direction: null });
            }
          }
          return next;
        });
      }, 600);

      timeoutsRef.current.set("reset", resetTimeout);
    }, 2000);

    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [pairs.length]);

  return pairs.map(p => {
    const entry = priceMap.get(p.symbol);
    const livePrice = entry?.price ?? p.price;
    const basePrice = entry?.basePrice ?? p.price;
    const liveChange = Number((((livePrice - basePrice) / basePrice) * 100).toFixed(2));
    return {
      ...p,
      livePrice,
      direction: entry?.direction ?? null,
      liveChange,
    };
  });
}

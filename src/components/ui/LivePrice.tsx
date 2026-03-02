import { PriceDirection } from "@/hooks/useLivePrices";
import { cn } from "@/lib/utils";

interface LivePriceProps {
  price: number;
  direction: PriceDirection;
  className?: string;
  prefix?: string;
  fractionDigits?: number;
}

export function LivePrice({ price, direction, className, prefix = "$", fractionDigits = 2 }: LivePriceProps) {
  return (
    <span
      className={cn(
        "inline-block rounded px-1 -mx-1 transition-colors duration-500",
        direction === "up" && "price-flash-up",
        direction === "down" && "price-flash-down",
        className
      )}
    >
      {prefix}{price.toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}
    </span>
  );
}

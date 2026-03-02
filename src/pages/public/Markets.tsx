import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketPairs, stockPairs } from "@/data/mockData";

export default function Markets() {
  return (
    <section className="relative overflow-hidden py-24 min-h-screen">
      <div className="absolute inset-0 bg-grid animate-grid-move opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Crypto & stocks • Real-time data</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3"><span className="text-gradient">Markets</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trade crypto and stocks on one platform. Real-time prices, deep liquidity, and professional tools.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Cryptocurrency</h2>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border/50">
                  <th className="text-left py-3 px-4 font-medium">Pair</th>
                  <th className="text-right py-3 px-4 font-medium">Price</th>
                  <th className="text-right py-3 px-4 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {marketPairs.slice(0, 10).map((p) => (
                  <tr key={p.symbol} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{p.symbol}</td>
                    <td className="py-3 px-4 text-right font-mono-num">${p.price.toLocaleString()}</td>
                    <td className={`py-3 px-4 text-right font-mono-num ${p.change >= 0 ? "text-success" : "text-destructive"}`}>
                      {p.change >= 0 ? "+" : ""}{p.change}%
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{p.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Stocks</h2>
        </div>
        <div className="glass-card-hover rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border/50">
                  <th className="text-left py-3 px-4 font-medium">Symbol</th>
                  <th className="text-right py-3 px-4 font-medium">Price</th>
                  <th className="text-right py-3 px-4 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stockPairs.map((p) => (
                  <tr key={p.symbol} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{p.symbol}</td>
                    <td className="py-3 px-4 text-right font-mono-num">${p.price.toLocaleString()}</td>
                    <td className={`py-3 px-4 text-right font-mono-num ${p.change >= 0 ? "text-success" : "text-destructive"}`}>
                      {p.change >= 0 ? "+" : ""}{p.change}%
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{p.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center"
      >
        <Button asChild className="glow-button bg-primary text-primary-foreground">
          <Link to="/auth">Start Trading</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

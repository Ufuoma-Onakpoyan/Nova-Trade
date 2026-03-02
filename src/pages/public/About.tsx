import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Users, Shield, Zap, Rocket, LineChart, Coins, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const journey = [
  { year: "2020", icon: Rocket, title: "Founded", desc: "NovaTrade started in San Francisco with a small team focused on making institutional-grade tools accessible to retail traders." },
  { year: "2021", icon: LineChart, title: "Crypto launch", desc: "We launched spot and margin trading for major cryptocurrencies with real-time charts and a lightning-fast order engine." },
  { year: "2023", icon: Coins, title: "Stocks & copy trading", desc: "Expanded into US equities and introduced copy trading so users could follow top performers with one click." },
  { year: "2024", icon: TrendingUp, title: "AI & bots", desc: "Rolled out AI-powered insights and automated bot strategies—grid, DCA, and custom algorithms." },
  { year: "2026", icon: Globe, title: "Global scale", desc: "Serving 2.4M+ traders across 180+ countries with crypto and stocks in one unified platform." },
];

export default function About() {
  return (
    <section className="relative overflow-hidden py-24 min-h-screen">
      <div className="absolute inset-0 bg-grid animate-grid-move opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3"><span className="text-gradient">About NovaTrade</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">We're building the next-generation trading platform for the modern investor.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-card-hover p-6 sm:p-8 rounded-2xl mb-8"
      >
        <h2 className="text-xl font-semibold mb-4"><span className="text-gradient">Our Mission</span></h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          NovaTrade exists to make professional-grade trading accessible to everyone. We combine powerful tools—advanced charts, AI insights, copy trading, and automated bots—with a clean, fast interface so you can focus on your strategy.
        </p>
        <p className="text-muted-foreground leading-relaxed">Whether you trade crypto, stocks, or both, we give you one place to execute, analyze, and grow.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold mb-6 text-center"><span className="text-gradient">Our Journey</span></h2>
        <div className="space-y-4">
          {journey.map((step, i) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-5 rounded-2xl flex gap-4 items-start"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">{step.year}</span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, staggerChildren: 0.08 }}
        className="grid grid-cols-2 gap-4 mb-12"
      >
        {[
          { icon: Users, label: "Active Traders", value: "2.4M+" },
          { icon: Zap, label: "24h Volume", value: "$12.8B+" },
          { icon: Shield, label: "Assets Secured", value: "350+" },
          { icon: Target, label: "Countries", value: "180+" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass-card-hover p-4 rounded-xl text-center"
          >
            <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xl font-bold font-mono-num text-gradient">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button asChild className="glow-button bg-primary text-primary-foreground">
          <Link to="/auth">Join NovaTrade</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

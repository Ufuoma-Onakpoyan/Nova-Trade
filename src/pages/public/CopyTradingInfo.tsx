import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CopyTradingInfo() {
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
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Copy the best • Crypto & stocks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3"><span className="text-gradient">Copy Trading</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mirror top-performing traders automatically. Set your allocation and let the pros trade for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="space-y-6 mb-12"
      >
        <div className="glass-card-hover p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">How It Works</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Browse leaderboards of verified traders, view their performance (ROI, win rate, drawdown), and choose who to follow. When you start copying, their trades are replicated in your account proportionally to your allocated amount. You stay in control: set a max allocation and stop copying anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, title: "Proven performance", desc: "See real returns and risk metrics before you follow." },
            { icon: Shield, title: "You stay in control", desc: "Set allocation limits and pause or stop copying instantly." },
            { icon: BarChart3, title: "Diversify easily", desc: "Copy multiple traders to spread risk and strategy." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-4 rounded-xl"
            >
              <item.icon className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button asChild className="glow-button bg-primary text-primary-foreground">
          <Link to="/auth">Start Copy Trading</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

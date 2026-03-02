import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Brain, Users, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: BarChart3, title: "Advanced Charts", description: "Professional-grade charting with 100+ indicators, drawing tools, and real-time data streaming.", gradient: "from-primary/20 to-primary/5" },
  { icon: Brain, title: "AI-Powered Insights", description: "Machine learning models analyze market patterns and deliver actionable trading signals in real time.", gradient: "from-chart-4/20 to-chart-4/5" },
  { icon: Users, title: "Copy Trading", description: "Mirror top-performing traders automatically. Track their strategies, returns, and risk metrics.", gradient: "from-success/20 to-success/5" },
  { icon: Bot, title: "Bot Automation", description: "Deploy grid bots, DCA strategies, and custom algorithms. Set it, refine it, let it trade.", gradient: "from-warning/20 to-warning/5" },
];

export default function Features() {
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
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4">
          <BarChart3 className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Tech-first trading platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3"><span className="text-gradient">Features</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to dominate the markets. Institutional-grade tools in an elegant interface.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card-hover p-6 rounded-2xl"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
              <feature.icon className="h-6 w-6 text-foreground" />
            </div>
            <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center"
      >
        <Button asChild className="glow-button bg-primary text-primary-foreground">
          <Link to="/auth">Get Started</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

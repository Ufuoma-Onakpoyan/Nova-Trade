import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Shield, label: "Secured Assets", value: 12.8, suffix: "B+", prefix: "$" },
  { icon: Zap, label: "Trades Executed", value: 2.4, suffix: "M+" },
  { icon: Globe, label: "Countries", value: 150, suffix: "+" },
  { icon: Clock, label: "Uptime", value: 99.99, suffix: "%" },
];

function AnimatedCounter({ value, prefix = "", suffix = "", inView }: { value: number; prefix?: string; suffix?: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(start * 100) / 100);
      }
    }, step);
    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="font-mono-num">
      {prefix}{Number.isInteger(value) ? Math.round(display).toLocaleString() : display.toFixed(2)}{suffix}
    </span>
  );
}

const testimonials = [
  { name: "Alex Chen", role: "Professional Trader", quote: "NovaTrade's terminal is the fastest I've used. The AI signals alone paid for themselves in the first week.", avatar: "AC" },
  { name: "Sarah Kim", role: "Fund Manager", quote: "Copy trading on NovaTrade outperforms every other platform. The trader analytics are unmatched.", avatar: "SK" },
  { name: "James Wright", role: "Algorithmic Trader", quote: "The bot automation suite is incredibly powerful. I've automated my entire grid strategy in minutes.", avatar: "JW" },
];

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center rounded-2xl">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Trusted by <span className="text-gradient">Serious Traders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

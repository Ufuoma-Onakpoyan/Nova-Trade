import { motion } from "framer-motion";
import { BarChart3, Brain, Users, Bot } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Charts",
    description: "Professional-grade charting with 100+ indicators, drawing tools, and real-time data streaming.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Machine learning models analyze market patterns and deliver actionable trading signals in real time.",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
  {
    icon: Users,
    title: "Copy Trading",
    description: "Mirror top-performing traders automatically. Track their strategies, returns, and risk metrics.",
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: Bot,
    title: "Bot Automation",
    description: "Deploy grid bots, DCA strategies, and custom algorithms. Set it, refine it, let it trade.",
    gradient: "from-warning/20 to-warning/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function FeatureCards() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Dominate</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Institutional-grade tools packed into an elegant interface designed for speed and precision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card-hover group p-6 rounded-2xl cursor-pointer"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

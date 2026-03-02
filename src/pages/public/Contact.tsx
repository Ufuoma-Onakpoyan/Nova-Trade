import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Send, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <BarChart2 className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Crypto & stocks in one platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-gradient">Contact Us</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to partner with us? We’re here to help. Reach out and our team will get back to you soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "support@novatrade.io", href: "mailto:support@novatrade.io" },
              { icon: MapPin, label: "HQ", value: "San Francisco, CA", href: "#" },
              { icon: MessageCircle, label: "Live chat", value: "Available 24/7 in-app", href: "/auth" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card-hover p-4 rounded-xl flex items-center gap-4 group"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              <h2 className="text-lg font-semibold mb-4">
                <span className="text-gradient">Send a message</span>
              </h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <p className="text-muted-foreground mb-4">
                    Thanks for reaching out. We’ll get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your name"
                      className="bg-card border-border/60 rounded-xl h-11"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="bg-card border-border/60 rounded-xl h-11"
                      required
                    />
                  </div>
                  <Input
                    placeholder="Subject"
                    className="bg-card border-border/60 rounded-xl h-11"
                    required
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={4}
                    className="w-full rounded-xl bg-card border border-border/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 resize-none"
                    required
                  />
                  <Button type="submit" className="glow-button bg-primary text-primary-foreground w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Send message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/welcome">Back to home</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

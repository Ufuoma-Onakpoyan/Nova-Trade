import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "How do I deposit funds?", a: "Navigate to the Wallet page and click the Deposit button. You can deposit crypto or fiat via supported payment methods." },
  { q: "What are the trading fees?", a: "Maker fees are 0.1% and taker fees are 0.15%. Volume-based discounts are available for high-volume traders." },
  { q: "How does copy trading work?", a: "Browse top traders, choose one to follow, and set your allocation. Their trades will be automatically replicated in your account proportionally." },
  { q: "Is my account insured?", a: "We maintain an insurance fund to protect users against unforeseen events. Additionally, the majority of assets are stored in cold wallets." },
  { q: "How do I enable 2FA?", a: "Go to Settings → Security, and toggle on Two-Factor Authentication. Scan the QR code with your authenticator app." },
  { q: "Can I trade both crypto and stocks?", a: "Yes. NovaTrade supports cryptocurrency pairs and major stocks in one platform. Switch between Spot, Margin, and Stocks from the navigation." },
];

export default function FAQ() {
  return (
    <section className="relative overflow-hidden py-24 min-h-screen">
      <div className="absolute inset-0 bg-grid animate-grid-move opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold"><span className="text-gradient">FAQ</span></h1>
        </div>
        <p className="text-muted-foreground">Frequently asked questions about trading crypto and stocks on NovaTrade</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-card p-4 sm:p-6 rounded-2xl"
      >
        <Accordion type="single" collapsible className="space-y-1">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
              <AccordionTrigger className="text-sm hover:no-underline py-3">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 text-center"
      >
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/auth">Sign in to get help</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

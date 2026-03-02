import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, FileText } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  { q: "How do I deposit funds?", a: "Navigate to the Wallet page and click the Deposit button. You can deposit crypto or fiat via supported payment methods." },
  { q: "What are the trading fees?", a: "Maker fees are 0.1% and taker fees are 0.15%. Volume-based discounts are available for high-volume traders." },
  { q: "How does copy trading work?", a: "Browse top traders, choose one to follow, and set your allocation. Their trades will be automatically replicated in your account proportionally." },
  { q: "Is my account insured?", a: "We maintain an insurance fund to protect users against unforeseen events. Additionally, the majority of assets are stored in cold wallets." },
  { q: "How do I enable 2FA?", a: "Go to Settings → Security, and toggle on Two-Factor Authentication. Scan the QR code with your authenticator app." },
];

export default function HelpSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Help & Support</h2>
        <p className="text-sm text-muted-foreground">Find answers or reach out to our team</p>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold">Frequently Asked Questions</h3>
        </div>
        <Accordion type="single" collapsible className="space-y-1">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
              <AccordionTrigger className="text-sm hover:no-underline py-3">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold">Contact Support</h3>
        </div>
        <div className="space-y-3 max-w-md">
          <Input placeholder="Subject" className="h-10 bg-muted/50 border-border/50 rounded-xl" />
          <textarea className="w-full h-24 bg-muted/50 border border-border/50 rounded-xl p-3 text-sm outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Describe your issue..." />
          <Button className="rounded-xl" onClick={() => toast.success("Message sent! We'll respond within 24 hours.")}>Send Message</Button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold">Documentation</h3>
        </div>
        <div className="space-y-2">
          {["API Reference", "Trading Guide", "Security Best Practices"].map((doc) => (
            <button key={doc} onClick={() => toast(`${doc} — Coming soon`)} className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-muted/30 transition-colors text-primary">
              {doc} →
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

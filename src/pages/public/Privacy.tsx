import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Your data • Our commitment</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold"><span className="text-gradient">Privacy Policy</span></h1>
        </div>
        <p className="text-sm text-muted-foreground">Last updated: February 1, 2026</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 rounded-2xl text-sm text-muted-foreground space-y-4"
      >
        <p>Your privacy is important to us. This policy describes how NovaTrade collects, uses, and protects your personal information.</p>
        <p><strong className="text-foreground">1. Data Collection</strong> — We collect information you provide directly (name, email, ID documents) and data generated through your use of the platform (trading history, IP addresses).</p>
        <p><strong className="text-foreground">2. Data Use</strong> — Your data is used to provide and improve our services, comply with regulatory requirements, and communicate with you about your account.</p>
        <p><strong className="text-foreground">3. Data Protection</strong> — We implement industry-standard security measures including encryption, access controls, and regular security audits.</p>
        <p><strong className="text-foreground">4. Third Parties</strong> — We do not sell your personal data. We may share data with regulatory authorities, payment processors, and identity verification providers as necessary.</p>
        <p><strong className="text-foreground">5. Your Rights</strong> — You have the right to access, correct, or delete your personal data. Contact our support team to exercise these rights.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 text-center"
      >
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/welcome">Back to home</Link>
        </Button>
      </motion.div>
      </div>
    </section>
  );
}

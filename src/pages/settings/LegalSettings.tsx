import { motion } from "framer-motion";
import { FileText, Shield } from "lucide-react";

export default function LegalSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Legal</h2>
        <p className="text-sm text-muted-foreground">Terms of service and privacy policy</p>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Terms of Service</h3>
            <p className="text-xs text-muted-foreground">Last updated: February 1, 2026</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-3 max-h-64 overflow-y-auto pr-2">
          <p>Welcome to NovaTrade. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.</p>
          <p><strong className="text-foreground">1. Account Registration</strong> — You must be at least 18 years old and provide accurate, complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.</p>
          <p><strong className="text-foreground">2. Trading Services</strong> — NovaTrade provides cryptocurrency and stock trading services. All trades are executed at your own risk. Past performance is not indicative of future results.</p>
          <p><strong className="text-foreground">3. Fees</strong> — Trading fees, withdrawal fees, and other charges are detailed on our fee schedule page. We reserve the right to modify fees with prior notice.</p>
          <p><strong className="text-foreground">4. Prohibited Activities</strong> — Market manipulation, wash trading, and any form of fraudulent activity are strictly prohibited and may result in account termination.</p>
          <p><strong className="text-foreground">5. Limitation of Liability</strong> — NovaTrade shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Privacy Policy</h3>
            <p className="text-xs text-muted-foreground">Last updated: February 1, 2026</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-3 max-h-64 overflow-y-auto pr-2">
          <p>Your privacy is important to us. This policy describes how NovaTrade collects, uses, and protects your personal information.</p>
          <p><strong className="text-foreground">1. Data Collection</strong> — We collect information you provide directly (name, email, ID documents) and data generated through your use of the platform (trading history, IP addresses).</p>
          <p><strong className="text-foreground">2. Data Use</strong> — Your data is used to provide and improve our services, comply with regulatory requirements, and communicate with you about your account.</p>
          <p><strong className="text-foreground">3. Data Protection</strong> — We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your information.</p>
          <p><strong className="text-foreground">4. Third Parties</strong> — We do not sell your personal data. We may share data with regulatory authorities, payment processors, and identity verification providers as necessary.</p>
          <p><strong className="text-foreground">5. Your Rights</strong> — You have the right to access, correct, or delete your personal data. Contact our support team to exercise these rights.</p>
        </div>
      </div>
    </motion.div>
  );
}

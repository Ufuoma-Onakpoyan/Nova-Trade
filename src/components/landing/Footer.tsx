import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Spot Trading", to: "/auth" },
    { label: "Margin Trading", to: "/auth" },
    { label: "Copy Trading", to: "/copy-trading-info" },
    { label: "Bot Trading", to: "/auth" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Careers", to: "#" },
    { label: "Press", to: "#" },
    { label: "Blog", to: "#" },
  ],
  Support: [
    { label: "Help Center", to: "/faq" },
    { label: "API Docs", to: "#" },
    { label: "Status", to: "#" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Terms", to: "#" },
    { label: "Privacy", to: "/privacy" },
    { label: "Cookies", to: "#" },
    { label: "Licenses", to: "#" },
  ],
};

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border/50 bg-card/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/welcome" className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-sm bg-primary" />
              </div>
              <span className="text-lg font-bold">Nova<span className="text-gradient">Trade</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Next-generation trading platform for the modern investor.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 NovaTrade. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "Discord", "Telegram", "GitHub"].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

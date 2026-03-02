import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme toggle"
      className="relative inline-flex items-center rounded-full bg-muted/70 border border-border/60 px-1 py-1 shadow-[0_0_0_1px_hsla(var(--primary)/0.12)] backdrop-blur-sm min-w-[120px]"
    >
      <motion.div
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-[0_0_18px_hsla(var(--primary)/0.35)] z-0"
        animate={{ x: theme === "dark" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className="relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        aria-pressed={theme === "dark"}
        aria-label="Dark mode"
      >
        <Moon
          className={
            theme === "dark"
              ? "h-3.5 w-3.5 shrink-0 text-primary-foreground"
              : "h-3.5 w-3.5 shrink-0 text-muted-foreground"
          }
          strokeWidth={2}
        />
        <span className={theme === "dark" ? "text-primary-foreground" : "text-muted-foreground"}>Dark</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className="relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        aria-pressed={theme === "light"}
        aria-label="Light mode"
      >
        <Sun
          className={
            theme === "light"
              ? "h-3.5 w-3.5 shrink-0 text-primary-foreground"
              : "h-3.5 w-3.5 shrink-0 text-muted-foreground"
          }
          strokeWidth={2}
        />
        <span className={theme === "light" ? "text-primary-foreground" : "text-muted-foreground"}>Light</span>
      </button>
    </div>
  );
}

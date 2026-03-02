import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, ArrowLeftRight, Users, Bot,
  TrendingUp, Bell, Wallet, Settings, LogOut, ChevronLeft, ChevronRight, Search, MoreHorizontal,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "terminal", label: "Terminal", icon: BarChart3, path: "/dashboard/terminal" },
  { id: "spot", label: "Spot", icon: ArrowLeftRight, path: "/dashboard/spot" },
  { id: "margin", label: "Margin", icon: TrendingUp, path: "/dashboard/margin" },
  { id: "copy", label: "Copy Trading", icon: Users, path: "/dashboard/copy-trading" },
  { id: "bot", label: "Bot Trading", icon: Bot, path: "/dashboard/bot-trading" },
  { id: "stocks", label: "Stocks", icon: TrendingUp, path: "/dashboard/stocks" },
  { id: "wallet", label: "Wallet", icon: Wallet, path: "/dashboard/wallet" },
];

const mobileMainNav = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "terminal", label: "Terminal", icon: BarChart3, path: "/dashboard/terminal" },
  { id: "spot", label: "Spot", icon: ArrowLeftRight, path: "/dashboard/spot" },
  { id: "wallet", label: "Wallet", icon: Wallet, path: "/dashboard/wallet" },
];

const getPageLabel = (path: string): string => {
  if (path === "/") return "Dashboard";
  const match = Object.entries({
    "/terminal": "Terminal",
    "/spot": "Spot",
    "/margin": "Margin",
    "/copy-trading": "Copy Trading",
    "/bot-trading": "Bot Trading",
    "/stocks": "Stocks",
    "/wallet": "Wallet",
    "/notifications": "Notifications",
  }).find(([p]) => path === p || path.startsWith(p + "/"));
  return match?.[1] ?? (path.startsWith("/settings") ? "Settings" : "NovaTrade");
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isMoreActive = isActive("/copy-trading") || isActive("/bot-trading") || isActive("/settings") || isActive("/stocks") || isActive("/notifications") || isActive("/margin");

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden max-w-[100vw] w-full">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden md:flex flex-col border-r border-border/50 bg-sidebar h-screen sticky top-0"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <div className="h-4 w-4 rounded-sm bg-primary" />
            </div>
            {!collapsed && <span className="text-lg font-bold whitespace-nowrap">Nova<span className="text-gradient">Trade</span></span>}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 space-y-1 border-t border-border/50">
          <Link to="/dashboard/settings" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/settings") ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <Link to="/auth" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 border-t border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Link to="/" className="md:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-sm bg-primary" />
              </div>
            </Link>
            <span className="hidden sm:block text-sm font-medium text-foreground shrink-0">
              {getPageLabel(location.pathname)}
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border/50 min-w-0 max-w-[12rem] lg:max-w-none">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                placeholder="Search markets..."
                className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-full min-w-0"
              />
            </div>
            <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground border border-border/50 shrink-0">
              Demo – simulated data
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Link to="/dashboard/wallet" className="glass-card px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-2 hover:border-primary/30 transition-colors">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono-num font-semibold hidden xs:inline">$124,567.89</span>
            </Link>
            <Link to="/dashboard/notifications" className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            </Link>
            <Link to="/dashboard/settings" className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary hover:bg-primary/30 transition-colors">
              JD
            </Link>
          </div>
        </header>

        {/* Content with page transitions */}
        <main className="flex-1 p-4 lg:p-6 pb-20 md:pb-6 min-w-0 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile bottom nav — app-style dock */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-2xl border-t border-border/40 z-50 safe-area-bottom">
          <div className="flex items-end justify-around px-2 pt-2 pb-3">
            {mobileMainNav.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex flex-col items-center gap-1 min-w-[56px] relative group"
                >
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                    active
                      ? "bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                      : "group-hover:bg-muted/50"
                  }`}>
                    <item.icon className={`h-[22px] w-[22px] transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`} strokeWidth={active ? 2.2 : 1.8} />
                  </div>
                  <span className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}>{item.label}</span>
                </Link>
              );
            })}

            {/* More tab */}
            <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1 min-w-[56px] relative group">
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                    isMoreActive
                      ? "bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                      : "group-hover:bg-muted/50"
                  }`}>
                    <MoreHorizontal className={`h-[22px] w-[22px] transition-colors duration-200 ${
                      isMoreActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`} strokeWidth={isMoreActive ? 2.2 : 1.8} />
                  </div>
                  <span className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                    isMoreActive ? "text-primary" : "text-muted-foreground"
                  }`}>More</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl border-t border-border/40 bg-card pb-10">
                <SheetHeader>
                  <SheetTitle className="text-left text-base">More</SheetTitle>
                </SheetHeader>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: TrendingUp, label: "Stocks", path: "/dashboard/stocks" },
                    { icon: Users, label: "Copy Trade", path: "/dashboard/copy-trading" },
                    { icon: Bot, label: "Bot Trade", path: "/dashboard/bot-trading" },
                    { icon: TrendingUp, label: "Margin", path: "/dashboard/margin" },
                    { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
                    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMoreOpen(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 ${
                        isActive(item.path)
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/30 hover:bg-muted/60 border border-transparent"
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isActive(item.path) ? "bg-primary/20" : "bg-muted/50"
                      }`}>
                        <item.icon className={`h-5 w-5 ${
                          isActive(item.path) ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className={`text-xs font-medium ${
                        isActive(item.path) ? "text-primary" : "text-muted-foreground"
                      }`}>{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/30">
                  <Link
                    to="/auth"
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;

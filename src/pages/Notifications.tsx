import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check } from "lucide-react";
import { notificationsData } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const filterTabs = ["All", "Trades", "Alerts", "System"] as const;
type FilterTab = typeof filterTabs[number];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<FilterTab>("All");

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Trades") return n.type === "trade";
    if (filter === "Alerts") return n.type === "alert";
    return n.type === "system";
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full min-w-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Notifications</h1>
          <p className="text-sm text-muted-foreground">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="rounded-xl" onClick={markAllRead}>
            <Check className="h-4 w-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === tab ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n, i) => (
          <motion.button
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => markRead(n.id)}
            className={`w-full text-left glass-card-hover p-4 rounded-xl flex items-start gap-3 ${!n.read ? "border-primary/20" : ""}`}
          >
            {!n.read && <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary shrink-0 animate-pulse-glow" />}
            <span className="text-xl shrink-0">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.read ? "font-semibold" : ""}`}>{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

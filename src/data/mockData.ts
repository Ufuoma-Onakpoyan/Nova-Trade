// Market data
export const marketPairs = [
  { symbol: "BTC/USDT", price: 67842.50, change: 2.34, volume: "4.2B", high: 68100, low: 66200 },
  { symbol: "ETH/USDT", price: 3456.78, change: -1.12, volume: "2.1B", high: 3520, low: 3410 },
  { symbol: "SOL/USDT", price: 178.92, change: 5.67, volume: "890M", high: 182, low: 168 },
  { symbol: "BNB/USDT", price: 612.34, change: 0.89, volume: "650M", high: 618, low: 605 },
  { symbol: "XRP/USDT", price: 0.6234, change: -0.45, volume: "420M", high: 0.635, low: 0.618 },
  { symbol: "ADA/USDT", price: 0.4521, change: 3.21, volume: "310M", high: 0.462, low: 0.438 },
  { symbol: "DOGE/USDT", price: 0.1234, change: 1.56, volume: "280M", high: 0.128, low: 0.119 },
  { symbol: "AVAX/USDT", price: 38.67, change: -2.34, volume: "210M", high: 40.1, low: 37.8 },
  { symbol: "DOT/USDT", price: 7.82, change: 1.45, volume: "180M", high: 8.05, low: 7.60 },
  { symbol: "LINK/USDT", price: 14.56, change: 3.78, volume: "320M", high: 15.10, low: 13.90 },
  { symbol: "MATIC/USDT", price: 0.8912, change: -0.67, volume: "150M", high: 0.912, low: 0.875 },
  { symbol: "UNI/USDT", price: 9.34, change: 2.15, volume: "95M", high: 9.62, low: 9.10 },
  { symbol: "ATOM/USDT", price: 11.23, change: -1.89, volume: "110M", high: 11.65, low: 10.90 },
  { symbol: "FTM/USDT", price: 0.4123, change: 6.42, volume: "85M", high: 0.438, low: 0.385 },
  { symbol: "NEAR/USDT", price: 5.67, change: 4.12, volume: "130M", high: 5.89, low: 5.35 },
  { symbol: "APT/USDT", price: 12.45, change: -3.21, volume: "160M", high: 13.10, low: 12.15 },
  { symbol: "ARB/USDT", price: 1.234, change: 1.87, volume: "200M", high: 1.28, low: 1.19 },
  { symbol: "OP/USDT", price: 2.56, change: 2.93, volume: "140M", high: 2.65, low: 2.42 },
  { symbol: "SUI/USDT", price: 1.89, change: 8.34, volume: "250M", high: 1.98, low: 1.72 },
  { symbol: "TIA/USDT", price: 15.67, change: -2.56, volume: "170M", high: 16.20, low: 15.10 },
];

// Stock pairs
export const stockPairs = [
  { symbol: "AAPL", price: 189.84, change: 1.23, volume: "52M", high: 191.50, low: 188.20 },
  { symbol: "TSLA", price: 248.42, change: -2.45, volume: "98M", high: 255.10, low: 245.30 },
  { symbol: "NVDA", price: 875.28, change: 4.56, volume: "45M", high: 892.00, low: 860.15 },
  { symbol: "AMZN", price: 178.25, change: 0.89, volume: "38M", high: 180.40, low: 176.50 },
  { symbol: "GOOGL", price: 141.80, change: -0.34, volume: "25M", high: 143.20, low: 140.60 },
  { symbol: "MSFT", price: 415.56, change: 1.67, volume: "22M", high: 419.80, low: 412.30 },
  { symbol: "META", price: 493.50, change: 2.89, volume: "18M", high: 499.00, low: 485.20 },
  { symbol: "AMD", price: 162.34, change: -1.56, volume: "42M", high: 166.80, low: 160.10 },
  { symbol: "NFLX", price: 628.90, change: 3.12, volume: "8M", high: 635.50, low: 618.40 },
  { symbol: "JPM", price: 196.78, change: 0.45, volume: "12M", high: 198.20, low: 195.30 },
  { symbol: "V", price: 278.45, change: 1.02, volume: "7M", high: 280.90, low: 276.10 },
  { symbol: "DIS", price: 112.30, change: -0.78, volume: "15M", high: 114.50, low: 111.20 },
];

// Wallet data
export const walletData = {
  totalBalance: 124567.89,
  accounts: {
    spot: 89234.56,
    margin: 28456.78,
    funding: 6876.55,
  },
  transactions: [
    { id: 1, type: "deposit", description: "USDT Deposit", amount: 5000, status: "completed", date: "2026-03-01 14:23" },
    { id: 2, type: "withdrawal", description: "BTC Withdrawal", amount: -0.15, status: "completed", date: "2026-02-28 09:45" },
    { id: 3, type: "transfer", description: "Spot → Margin", amount: 2000, status: "completed", date: "2026-02-27 18:12" },
    { id: 4, type: "deposit", description: "ETH Deposit", amount: 3.5, status: "completed", date: "2026-02-26 11:30" },
    { id: 5, type: "withdrawal", description: "USDT Withdrawal", amount: -1500, status: "pending", date: "2026-02-25 16:45" },
    { id: 6, type: "deposit", description: "SOL Deposit", amount: 25, status: "completed", date: "2026-02-24 08:15" },
    { id: 7, type: "transfer", description: "Margin → Spot", amount: 5000, status: "completed", date: "2026-02-23 20:30" },
    { id: 8, type: "withdrawal", description: "BNB Withdrawal", amount: -2.5, status: "failed", date: "2026-02-22 13:00" },
    { id: 9, type: "deposit", description: "USDC Deposit", amount: 10000, status: "completed", date: "2026-02-21 07:45" },
    { id: 10, type: "transfer", description: "Spot → Funding", amount: 3000, status: "completed", date: "2026-02-20 15:20" },
  ],
};

// Notifications data
export const notificationsData = [
  { id: 1, type: "trade", message: "BTC/USDT buy order filled at $67,200", time: "2 min ago", read: false, icon: "📈" },
  { id: 2, type: "alert", message: "ETH price dropped below $3,400 alert triggered", time: "15 min ago", read: false, icon: "🔔" },
  { id: 3, type: "system", message: "System maintenance scheduled for March 5, 2026", time: "1 hr ago", read: false, icon: "⚙️" },
  { id: 4, type: "trade", message: "SOL/USDT sell order filled at $180.50", time: "2 hrs ago", read: true, icon: "📉" },
  { id: 5, type: "promo", message: "Earn 2x rewards on all trades this weekend!", time: "3 hrs ago", read: true, icon: "🎉" },
  { id: 6, type: "alert", message: "BTC reached your $68,000 price target", time: "5 hrs ago", read: true, icon: "🎯" },
  { id: 7, type: "system", message: "New feature: Stock trading is now available!", time: "8 hrs ago", read: true, icon: "🚀" },
  { id: 8, type: "trade", message: "Copy trade from CryptoWhale: Bought 0.5 BTC", time: "12 hrs ago", read: true, icon: "👥" },
  { id: 9, type: "alert", message: "Unusual volume detected on NVDA", time: "1 day ago", read: true, icon: "⚠️" },
  { id: 10, type: "promo", message: "Refer a friend and earn $50 in trading credits", time: "2 days ago", read: true, icon: "💝" },
];

// Generate candlestick-like chart data
export function generateChartData(days = 90) {
  const data = [];
  let price = 64000;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const volatility = (Math.random() - 0.48) * 2000;
    price = Math.max(55000, Math.min(72000, price + volatility));
    const open = price + (Math.random() - 0.5) * 800;
    const close = price;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    data.push({
      date: new Date(now - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      open: Math.round(open * 100) / 100,
      close: Math.round(close * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      volume: Math.round(Math.random() * 50000 + 10000),
    });
  }
  return data;
}

// Portfolio data
export const portfolioData = {
  totalValue: 124567.89,
  totalPnl: 12456.78,
  totalPnlPercent: 11.12,
  assets: [
    { name: "Bitcoin", symbol: "BTC", amount: 1.234, value: 83734.23, allocation: 67.2, pnl: 8234.12, pnlPercent: 10.9 },
    { name: "Ethereum", symbol: "ETH", amount: 8.5, value: 29382.63, allocation: 23.6, pnl: 3102.45, pnlPercent: 11.8 },
    { name: "Solana", symbol: "SOL", amount: 45.2, value: 8087.18, allocation: 6.5, pnl: 892.34, pnlPercent: 12.4 },
    { name: "Others", symbol: "MISC", amount: 0, value: 3363.85, allocation: 2.7, pnl: 227.87, pnlPercent: 7.3 },
  ],
};

// Order book
export function generateOrderBook() {
  const midPrice = 67842.50;
  const asks = Array.from({ length: 12 }, (_, i) => ({
    price: Math.round((midPrice + (i + 1) * (Math.random() * 15 + 5)) * 100) / 100,
    amount: Math.round(Math.random() * 5 * 1000) / 1000,
    total: 0,
  }));
  const bids = Array.from({ length: 12 }, (_, i) => ({
    price: Math.round((midPrice - (i + 1) * (Math.random() * 15 + 5)) * 100) / 100,
    amount: Math.round(Math.random() * 5 * 1000) / 1000,
    total: 0,
  }));
  let askTotal = 0;
  asks.forEach(a => { askTotal += a.amount; a.total = Math.round(askTotal * 1000) / 1000; });
  let bidTotal = 0;
  bids.forEach(b => { bidTotal += b.amount; b.total = Math.round(bidTotal * 1000) / 1000; });
  return { asks: asks.reverse(), bids };
}

// Open positions
export const openPositions = [
  { id: 1, pair: "BTC/USDT", side: "Long", size: 0.5, entryPrice: 65200, markPrice: 67842.50, pnl: 1321.25, pnlPercent: 4.05, leverage: 10, liquidation: 58900 },
  { id: 2, pair: "ETH/USDT", side: "Short", size: 5.0, entryPrice: 3520, markPrice: 3456.78, pnl: 316.10, pnlPercent: 1.80, leverage: 5, liquidation: 4200 },
  { id: 3, pair: "SOL/USDT", side: "Long", size: 20, entryPrice: 165, markPrice: 178.92, pnl: 278.40, pnlPercent: 8.44, leverage: 3, liquidation: 120 },
];

// Trade history
export const tradeHistory = [
  { id: 1, pair: "BTC/USDT", side: "Buy", price: 67200, amount: 0.25, total: 16800, time: "2 min ago", status: "Filled" },
  { id: 2, pair: "ETH/USDT", side: "Sell", price: 3480, amount: 3.0, total: 10440, time: "15 min ago", status: "Filled" },
  { id: 3, pair: "SOL/USDT", side: "Buy", price: 175.50, amount: 10, total: 1755, time: "1 hr ago", status: "Filled" },
  { id: 4, pair: "BTC/USDT", side: "Buy", price: 66800, amount: 0.1, total: 6680, time: "3 hrs ago", status: "Filled" },
  { id: 5, pair: "AVAX/USDT", side: "Sell", price: 39.20, amount: 50, total: 1960, time: "5 hrs ago", status: "Filled" },
];

// Top traders for copy trading
export const topTraders = [
  { id: 1, name: "CryptoWhale", avatar: "🐋", roi: 342.5, winRate: 78, followers: 12400, trades: 1245, pnl: "+$2.4M", strategy: "Swing Trading", risk: "Medium" },
  { id: 2, name: "AlphaBot", avatar: "🤖", roi: 189.2, winRate: 82, followers: 8900, trades: 3420, pnl: "+$890K", strategy: "Scalping", risk: "High" },
  { id: 3, name: "SteadyEddie", avatar: "🎯", roi: 67.8, winRate: 91, followers: 15200, trades: 560, pnl: "+$450K", strategy: "DCA", risk: "Low" },
  { id: 4, name: "MoonShot", avatar: "🚀", roi: 520.1, winRate: 65, followers: 6700, trades: 890, pnl: "+$1.8M", strategy: "Momentum", risk: "Very High" },
  { id: 5, name: "GridMaster", avatar: "📊", roi: 98.4, winRate: 88, followers: 11300, trades: 2100, pnl: "+$670K", strategy: "Grid Trading", risk: "Low" },
  { id: 6, name: "TrendRider", avatar: "🏄", roi: 156.7, winRate: 74, followers: 9400, trades: 780, pnl: "+$1.1M", strategy: "Trend Following", risk: "Medium" },
];

// Activity feed
export const activityFeed = [
  { id: 1, type: "trade", message: "Bought 0.25 BTC at $67,200", time: "2 min ago", icon: "📈" },
  { id: 2, type: "deposit", message: "Deposited $5,000 USDT", time: "1 hr ago", icon: "💰" },
  { id: 3, type: "trade", message: "Sold 3.0 ETH at $3,480", time: "2 hrs ago", icon: "📉" },
  { id: 4, type: "copy", message: "Started copying CryptoWhale", time: "5 hrs ago", icon: "👥" },
  { id: 5, type: "alert", message: "BTC reached $68,000 target", time: "8 hrs ago", icon: "🔔" },
];

// Sparkline data for portfolio mini charts
export function generateSparkline(points = 24, trend = 1) {
  const data = [];
  let val = 100;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - 0.45) * 5 * trend;
    data.push({ value: Math.max(80, val) });
  }
  return data;
}

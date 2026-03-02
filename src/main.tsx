import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme class on html element before render
const stored = localStorage.getItem("nova-theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = stored === "light" || stored === "dark" ? stored : (systemDark ? "dark" : "light");
document.documentElement.classList.add(initialTheme);

createRoot(document.getElementById("root")!).render(<App />);

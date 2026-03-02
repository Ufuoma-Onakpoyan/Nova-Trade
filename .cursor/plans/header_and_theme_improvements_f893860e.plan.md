---
name: Header and theme improvements
overview: Improve header design with active page indication, add scroll-to-top on navigation, align public pages with landing style (bg-grid, radial glow, text-gradient, motion), and replace the Sun/Moon icon theme toggle with a creative sliding Dark/Light toggle.
todos: []
isProject: false
---

# Header, Navigation, and Theme Toggle Improvements

## 1. Active page indicator in header

**Landing/public Navbar** — [src/components/landing/Navbar.tsx](src/components/landing/Navbar.tsx)

- Import `useLocation` from react-router-dom.
- For each nav link, compute `isActive = location.pathname === link.to` (handle `/copy-trading-info` exactly).
- Apply active styles when `isActive`: `text-primary font-medium` and a bottom border (`border-b-2 border-primary`) or subtle pill background (`bg-primary/10`). Inactive: `text-muted-foreground`.
- In mobile menu, apply the same active logic to each link.

**Dashboard header** — [src/layouts/DashboardLayout.tsx](src/layouts/DashboardLayout.tsx)

- Optionally add a page label in the header (e.g. "Dashboard", "Terminal") derived from `location.pathname` so the current page is visible. This can sit next to the search bar as a small label or breadcrumb.

---

## 2. Scroll to top on navigation

**ScrollToTop component** — Create `src/components/ScrollToTop.tsx`

- Component that uses `useLocation()` and `useEffect` to call `window.scrollTo(0, 0)` when `location.pathname` changes.
- Return `null`; it is a side-effect only.

**Integration** — [src/App.tsx](src/App.tsx)

- Render `<ScrollToTop />` inside `<BrowserRouter>`, as a sibling to `<Routes>`, so it can use `useLocation`.

---

## 3. Public pages design aligned with landing style

Landing uses: `bg-grid`, radial glows (`bg-primary/5 blur-[120px]`), `text-gradient` in headings, `glass-card` / `glass-card-hover`, `py-24` sections, motion (`initial`, `animate`, `whileInView`).

**Markets** — [src/pages/public/Markets.tsx](src/pages/public/Markets.tsx)

- Wrap content in a `section` with `relative overflow-hidden`.
- Add `bg-grid` and a radial glow (`absolute top-0 left-1/2 ... bg-primary/5 blur-[150px]`).
- Use `text-gradient` for the main heading (e.g. "Markets" or key phrase).
- Apply `glass-card-hover` to market cards/sections.
- Add `whileInView` motion to sections for reveal on scroll.

**Features** — [src/pages/public/Features.tsx](src/pages/public/Features.tsx)

- Same wrapper: `section` + `bg-grid` + radial glow.
- Use `text-gradient` in h1 and keep feature cards as `glass-card-hover` with gradient icon backgrounds.
- Add `whileInView` to sections.

**About** — [src/pages/public/About.tsx](src/pages/public/About.tsx)

- Same background treatment.
- Use `text-gradient` in h1 and mission heading.
- Apply `glass-card-hover` to stat cards.
- Add motion for content and stats.

**CopyTradingInfo** — [src/pages/public/CopyTradingInfo.tsx](src/pages/public/CopyTradingInfo.tsx)

- Same background and typography treatment.
- Use `glass-card-hover` for benefit cards.
- Add motion for sections.

**FAQ** — [src/pages/public/FAQ.tsx](src/pages/public/FAQ.tsx)

- Same background treatment.
- Use `text-gradient` in h1.
- Keep accordion in a `glass-card` and add motion.

**Privacy** — [src/pages/public/Privacy.tsx](src/pages/public/Privacy.tsx)

- Same background and typography treatment.
- Apply `glass-card` to the policy content.
- Add motion for the main block.

---

## 4. Creative theme toggle: Dark / Light slider

**ThemeToggle component** — Create `src/components/ThemeToggle.tsx`

- Pill-shaped container with "Dark" on the left and "Light" on the right.
- Uses `useTheme()` for `theme` and `setTheme`.
- Layout: two clickable labels in a flex row, with a sliding indicator behind the active one.
- Design:
  - Container: `flex` row, `rounded-full`, `p-1`, `bg-muted/80` or `border border-border/50`.
  - Labels: "Dark" and "Light" as buttons, each with `text-xs font-medium`, inactive = `text-muted-foreground`, active = `text-primary-foreground`.
  - Sliding pill: a `motion.div` that moves left/right based on theme (`x: theme === "dark" ? 0 : "100%"` or equivalent), with `layoutId` for shared layout animation. Pill uses `bg-primary` and `rounded-full`.
  - Ensure min touch target (44px) for accessibility.

**useTheme** — [src/hooks/useTheme.ts](src/hooks/useTheme.ts)

- Already exposes `setTheme`; no change needed. `ThemeToggle` will call `setTheme("dark")` or `setTheme("light")` on label click.

**Integration**

- **Navbar** — Replace the Sun/Moon `button` with `<ThemeToggle />`.
- **DashboardLayout** — Replace the Sun/Moon `button` with `<ThemeToggle />`.

---

## File summary


| File                                                                         | Action                                                                              |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [src/components/ScrollToTop.tsx](src/components/ScrollToTop.tsx)             | Create; useEffect scroll on location change                                         |
| [src/components/ThemeToggle.tsx](src/components/ThemeToggle.tsx)             | Create; Dark/Light slider with motion                                               |
| [src/App.tsx](src/App.tsx)                                                   | Add ScrollToTop inside BrowserRouter                                                |
| [src/components/landing/Navbar.tsx](src/components/landing/Navbar.tsx)       | Add useLocation, active styles for nav links; replace theme button with ThemeToggle |
| [src/layouts/DashboardLayout.tsx](src/layouts/DashboardLayout.tsx)           | Replace theme button with ThemeToggle; optionally add page title                    |
| [src/pages/public/Markets.tsx](src/pages/public/Markets.tsx)                 | Add bg-grid, radial glow, text-gradient, motion                                     |
| [src/pages/public/Features.tsx](src/pages/public/Features.tsx)               | Same design treatment                                                               |
| [src/pages/public/About.tsx](src/pages/public/About.tsx)                     | Same design treatment                                                               |
| [src/pages/public/CopyTradingInfo.tsx](src/pages/public/CopyTradingInfo.tsx) | Same design treatment                                                               |
| [src/pages/public/FAQ.tsx](src/pages/public/FAQ.tsx)                         | Same design treatment                                                               |
| [src/pages/public/Privacy.tsx](src/pages/public/Privacy.tsx)                 | Same design treatment                                                               |


---

## Theme toggle design sketch

```
[ Dark ] [ Light ]   ← when dark mode
   ^^^^
  gold pill

[ Dark ] [ Light ]   ← when light mode
            ^^^^
           gold pill
```

The pill slides smoothly between positions using Framer Motion `layoutId` or `animate={{ x }}` for a creative, polished feel.
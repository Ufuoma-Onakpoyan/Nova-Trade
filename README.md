# NovaTrade

A modern trading dashboard built with Vite, React, TypeScript, and shadcn/ui. Includes crypto and stock trading UIs, copy trading, bot trading, wallet, and notifications — all frontend with mock data, ready for backend integration.

## Tech stack

- **Vite** — build tool and dev server
- **React 18** — UI
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **shadcn/ui** (Radix) — components
- **React Router v6** — routing
- **Framer Motion** — animations
- **Recharts** — charts
- **TanStack Query** — data layer (ready for API)
- **Sonner** — toasts

## Getting started

**Requirements:** Node.js and npm (e.g. [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080). Use `/welcome` for the landing page or `/auth` to “log in” (demo flow), then `/` for the dashboard.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |
| `npm run test` | Run tests                |

## Deploying

### GitHub + Vercel

1. **Push to GitHub**
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/zenith-trade.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **Add New** → **Project** and import your repo
   - Vercel auto-detects Vite: build command `npm run build`, output `dist`
   - Click **Deploy**

   The project includes `vercel.json` so client-side routing (React Router) works out of the box.

3. **Optional:** Use the [Vercel CLI](https://vercel.com/docs/cli) for preview deploys:
   ```sh
   npm i -g vercel
   vercel
   ```

### Other hosts

Build the app, then upload `dist/` to any static host:

```sh
npm run build
```

- **Netlify** — connect the repo or drag-and-drop `dist/`
- **Cloudflare Pages** — connect the repo, build output `dist`
- **GitHub Pages** — use a GitHub Action to build and deploy `dist/`

Ensure the host redirects all routes to `index.html` for React Router (SPA fallback).

## Project structure

- `src/` — app code
  - `main.tsx` — entry, theme init
  - `App.tsx` — providers and routes
  - `layouts/` — dashboard layout
  - `pages/` — route pages and settings
  - `components/` — dashboard, landing, and UI components
  - `data/mockData.ts` — mock data
  - `hooks/` — theme, live prices, etc.

No backend or Lovable dependency — plain Vite + React.

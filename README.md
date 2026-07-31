# Fuel Price Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://retail-fuel-price-dashboard.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paruljamwal/fuel-price-dashboard)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-Private-lightgrey?style=flat)](https://github.com/paruljamwal/fuel-price-dashboard)

A clean, responsive dashboard for exploring **monthly retail fuel prices** across Indian metro cities.

Filter by month, fuel type, and city · view KPIs and interactive charts · export a presentation-ready PDF — all driven by a single filtered dataset.

> Built with React, TypeScript, Vite, Recharts, and thoughtful UX polish for a production-quality frontend assignment.

---

## Live Demo

**Production:** [https://retail-fuel-price-dashboard.netlify.app](https://retail-fuel-price-dashboard.netlify.app)

---

## GitHub Repository

**Source:** [https://github.com/paruljamwal/fuel-price-dashboard](https://github.com/paruljamwal/fuel-price-dashboard)

---

## Tech Stack

| Category | Technology | Role |
| --- | --- | --- |
| UI Library | **React 19** | Component-driven UI |
| Build Tool | **Vite 8** | Fast dev server & production bundling |
| Language | **TypeScript** | Type-safe application code |
| Styling | **Tailwind CSS v4** + component CSS | Layout utilities & polished UI surfaces |
| Charts | **Recharts** | Line, bar, and donut visualizations |
| Animation | **React CountUp** | Animated KPI counters |
| Toasts | **Sonner** | Reset / export / error notifications |
| PDF Export | **jsPDF** + **modern-screenshot** | Chart capture & multi-page PDF report |
| CSV Parsing | **PapaParse** | Client-side CSV → JSON |
| Icons | **Lucide React** | Consistent action & UI icons |

---

## Features

### Dashboard

- KPI cards (average, highest, lowest price, total records)
- Animated counters
- Responsive layout (desktop → tablet → mobile)
- Modern dark UI with high-contrast chart cards
- Loading state while fuel data is fetched
- Empty / no-data states on charts

### Filters

- Month filter (options derived from CSV, e.g. `November, 2024`)
- Fuel type filter (Petrol / Diesel)
- Metro city filter
- Per-filter clear (×)
- Reset filters

### Charts

| Chart | Type | Question it answers |
| --- | --- | --- |
| Monthly Retail Selling Price | Line | How have prices changed over time? |
| Fuel Price by Metro City | Bar | Which city is higher or lower? |
| Fuel Type Distribution | Donut | What share is Petrol vs Diesel? |

### Export

- **Export PDF** — filters, KPI summary, charts, and timestamp
- Charts captured from the live dashboard
- Exports the **currently filtered** dataset context
- Toast feedback (loading / success / error)

### UX Improvements

- Animated KPIs
- Icons on Reset / Export
- Responsive charts
- Rich tooltips & legends
- Consistent Petrol / Diesel color language
- Smooth filter interactions
- Semantic layout & accessible controls

---

## Screenshots

> Place assets in the [`images/`](./images) folder using the filenames below.

### Dashboard — Desktop

![Fuel Price Dashboard – Desktop](images/home.png)

### Dashboard — Mobile

![Fuel Price Dashboard – Mobile](images/mobile.png)

### Charts

![Bar chart – Fuel Price by Metro City](images/bar-chart.png)

![Donut chart – Fuel Type Distribution](images/donut-chart.png)

### PDF Export

![PDF export preview](images/pdf-export.png)

---

## Lighthouse Performance

Performance work focused on **first paint**: the ~2MB CSV was removed from the JS bundle, charts were lazy-loaded, and PDF libraries load only on export.

### Score comparison

| Metric | Before | After |
| --- | ---: | ---: |
| **Performance** | 64 | **99** |
| **Accessibility** | 96 | 96 |
| **Best Practices** | 100 | 100 |
| **SEO** | 82 | **91** |

### Core Web Vitals (approx.)

| Metric | Before | After |
| --- | ---: | ---: |
| First Contentful Paint (FCP) | ~2.9–3.0s | **~0.7s** |
| Largest Contentful Paint (LCP) | **6.33s** (Perf panel) / ~3.0–3.4s (Lighthouse) | **1.62s** (Perf panel) / ~0.7s (Lighthouse) |
| Total Blocking Time (TBT) | ~90–270ms | **~10ms** |
| Cumulative Layout Shift (CLS) | 0 | **0** |

### LCP — Chrome Performance panel

Side-by-side capture from DevTools **Performance** insights (same dashboard shell).

**Before improvement — LCP 6.33s**

![LCP before improvement – 6.33s](./images/lcp-before.png)

**After improvement — LCP 1.62s**

![LCP after improvement – 1.62s](./images/lcp-after.png)

### Lighthouse screenshots

**Before optimization**

| Desktop | Mobile |
| --- | --- |
| ![Lighthouse before – Desktop](images/lighthouse-before-desktop.png) | ![Lighthouse before – Mobile](images/lighthouse-before-mobile.png) |

**After optimization**

| Desktop | Mobile |
| --- | --- |
| ![Lighthouse after – Desktop](images/lighthouse-after-desktop.png) | ![Lighthouse after – Mobile](images/lighthouse-after-mobile.png) |

### What improved

- **Async CSV fetch** from `public/` (no longer inlined into the main bundle)
- **Lazy-loaded** chart chunks (`React.lazy` + `Suspense`)
- **Code-split PDF** path (`import()` on Export click)
- **Memoized** derived data (`useMemo` for filters, KPIs, chart series)
- Shared **filtered dataset** as a single source of truth
- Meta description for SEO

---

## Project Structure

```text
fuel-price-dashboard/
├── public/
│   └── data/
│       └── retail-fuel-prices.csv    # Fetched at runtime
├── images/                           # README screenshots
├── src/
│   ├── assets/                       # Brand mark & static assets
│   ├── components/
│   │   ├── AnimatedCounter/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── FilterBar/
│   │   ├── KpiCard/
│   │   ├── KpiCards/
│   │   ├── PageHeader/
│   │   ├── Section/
│   │   ├── Select/
│   │   └── charts/                   # Line, bar, donut + container
│   ├── constants/
│   ├── types/
│   ├── utils/                        # Normalize, charts, PDF export
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── APPROACH.md                       # Design philosophy & decisions
├── netlify.toml
└── package.json
```

---

## Installation

```bash
# Clone
git clone https://github.com/paruljamwal/fuel-price-dashboard.git
cd fuel-price-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

> Node **22+** recommended (see `engines` in `package.json`). Yarn works as well (`yarn install` / `yarn dev`).

---

## Decisions & Trade-offs

| Decision | Why |
| --- | --- |
| **Recharts** | Familiar React API, solid defaults for line/bar/pie, good enough for assignment-scale datasets without the weight of a heavier viz stack. |
| **PapaParse** | Battle-tested CSV parser with header mapping; keeps data ingestion simple and synchronous once the file is fetched. |
| **modern-screenshot + jsPDF** | Captures live chart DOM into a multi-page PDF. Chosen over `html2canvas` because Tailwind v4 `oklch()` colors break `html2canvas` during export. |
| **Client-side filtering** | Dataset is static (~23k rows). Filtering in memory keeps UX instant, needs no backend, and guarantees KPIs/charts/PDF stay in sync. |
| **CSV in `public/`** | Avoids bloating the JS bundle (~3MB → ~270KB main chunk). Shell paints first; data hydrates after fetch. |
| **Responsive strategy** | Mobile-first CSS + fluid grids: filters stack, KPIs wrap, charts use responsive containers so axes/legends remain readable. |

---

## Performance Optimizations

- Memoization of month options, filtered rows, and chart context
- Lazy loading for chart components
- Efficient single-pass filtering reused everywhere
- Reusable presentational components (`Card`, `Select`, `KpiCard`)
- Minimal work on the critical path (header + filters before charts)
- Responsive chart containers (no fixed oversized canvases)
- Bundle optimization via async data + dynamic PDF import

---

## Responsive Design

| Breakpoint | Experience |
| --- | --- |
| **Desktop** | Filters + actions on one row; four KPI cards; wide charts |
| **Tablet** | Filters wrap; KPIs reflow to 2×2; charts stay readable |
| **Mobile** | Stacked filters & full-width actions; single-column KPIs; touch-friendly controls |

---

## Accessibility

- Semantic landmarks (`main`, `section`, labeled controls)
- Keyboard-friendly selects and buttons
- Visible focus styles
- Sufficient contrast on dark UI + light chart surfaces
- `aria-label` on icon-only / clear actions
- Responsive typography that scales with viewport

---

## Deployment

Hosted on **[Netlify](https://retail-fuel-price-dashboard.netlify.app)**.

1. Connect the GitHub repository to Netlify
2. Build command: `yarn build` (or `npm run build`)
3. Publish directory: `dist`
4. Node version: `22` (see `netlify.toml`)
5. Deploy on every push to `main`

Static assets under `public/` (including the CSV) are copied to `dist/` automatically.

---

## Future Improvements

- Explicit light / dark theme toggle
- Multiple-year comparison views
- Date range picker
- Drill-down analytics
- Live fuel-price API integration
- Authentication for saved views
- Export to Excel
- Real-time price updates
- PWA / offline support
- Shareable filtered URLs

---

## Author

**Parul Jamwal** · Frontend Developer

| | |
| --- | --- |
| GitHub | [github.com/paruljamwal](https://github.com/paruljamwal) |
| Repository | [fuel-price-dashboard](https://github.com/paruljamwal/fuel-price-dashboard) |
| Live Demo | [retail-fuel-price-dashboard.netlify.app](https://retail-fuel-price-dashboard.netlify.app) |

---

## Documentation

For incremental build order, UX rationale, and engineering principles, see **[APPROACH.md](./APPROACH.md)**.

---

<div align="center">

Built with care for clarity, maintainability, and performance.

[Live Demo](https://retail-fuel-price-dashboard.netlify.app) · [Source](https://github.com/paruljamwal/fuel-price-dashboard)

</div>

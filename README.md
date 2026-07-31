# Fuel Price Dashboard

Interactive dashboard to explore **monthly retail fuel prices** across Indian metro cities.

Filter by month, fuel type, and city · view KPIs and charts · export a PDF report.

[Live Demo](https://retail-fuel-price-dashboard.netlify.app) · [GitHub](https://github.com/paruljamwal/fuel-price-dashboard)

---

## Tech Stack

| Area | Tool |
| --- | --- |
| App | React 19, TypeScript, Vite |
| Styling | Tailwind CSS + component CSS |
| Charts | Recharts |
| Data | PapaParse |
| KPIs | React CountUp |
| Toasts | Sonner |
| PDF | jsPDF + modern-screenshot |
| Icons | Lucide React |

---

## Features

- **Filters** — month (from CSV), fuel type, metro city, clear (×), reset
- **KPIs** — average / highest / lowest price, total records (animated)
- **Charts** — line (monthly trend), bar (by city), donut (fuel type)
- **Export PDF** — filters + KPIs + charts + timestamp
- **UX** — loading state, empty state, tooltips, legends, responsive layout

---

## Screenshots

### Desktop

![Dashboard home](images/home.png)

![Filters](images/filters.png)

![Filtered view](images/filtered.png)

### Charts

![Line and bar charts](images/charts-line-bar.png)

![Bar and donut charts](images/charts-bar-donut.png)

### Mobile

![Mobile layout](images/mobile.png)

![Mobile charts](images/mobile-charts.png)

### PDF export

![PDF report page 1](images/pdf-page1.png)

![PDF report page 2](images/pdf-page2.png)

### Toasts

![PDF export success](images/toast-success.png)

![PDF export error](images/toast-error.png)

---

## Performance

| | Before | After |
| --- | ---: | ---: |
| Lighthouse Performance (desktop) | 64 | **94** |
| Lighthouse Performance (mobile) | 68 | **99** |
| Lighthouse SEO | 82 | **91** |
| LCP (Chrome Performance) | **6.33s** | **1.62s** |
| CLS | 0 | 0 |

### Lighthouse (desktop)

**Before — Performance 64**

![Lighthouse before desktop – Performance 64](images/lighthouse-before.png)

**After — Performance 94**

![Lighthouse after desktop – Performance 94](images/lighthouse-after.png)

### Lighthouse (mobile)

**Before — Performance 68**

![Lighthouse before mobile – Performance 68](images/lighthouse-before-mobile.png)

**After — Performance 99**

![Lighthouse after mobile – Performance 99](images/lighthouse-after-mobile.png)

### LCP (Chrome Performance panel)

**Before — LCP 6.33s**

![LCP before – 6.33s](images/lcp-before.png)

**After — LCP 1.62s**

![LCP after – 1.62s](images/lcp-after.png)

**What changed:** CSV moved to `public/` and fetched async · charts lazy-loaded · PDF code loaded only on Export · memoized filtered data.

---

## Run locally

```bash
git clone https://github.com/paruljamwal/fuel-price-dashboard.git
cd fuel-price-dashboard
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Node 22+ recommended.

---

## Project structure

```text
src/
  components/     # UI + charts
  utils/          # data, charts, PDF
  types/
public/data/      # CSV (fetched at runtime)
```

More detail: [APPROACH.md](./APPROACH.md)

---

## Deployment

Hosted on **Netlify** → [retail-fuel-price-dashboard.netlify.app](https://retail-fuel-price-dashboard.netlify.app)

- Build: `yarn build` / `npm run build`
- Publish: `dist`
- Node: 22 (`netlify.toml`)

---

## Author

**Parul Jamwal** · Frontend Developer

- GitHub: [paruljamwal](https://github.com/paruljamwal)
- Repo: [fuel-price-dashboard](https://github.com/paruljamwal/fuel-price-dashboard)
- Demo: [Netlify](https://retail-fuel-price-dashboard.netlify.app)

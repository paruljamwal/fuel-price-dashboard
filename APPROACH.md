# Fuel Price Dashboard - Project Approach

## Objective

The goal of this assignment is to build a clean, responsive, and maintainable Fuel Price Dashboard that allows users to explore fuel price data through interactive filters, KPIs, and charts.

The focus is not only on completing the required features but also on demonstrating good frontend engineering practices, thoughtful UI/UX decisions, and clean code organization.

---

## Development Philosophy

This project was built incrementally.

Each feature was implemented, tested, and committed independently to keep changes small, reviewable, and easy to debug.

Rather than building everything at once, the dashboard evolved feature by feature.

---

## Feature Development Order

The implementation followed this sequence:

1. **Project Setup**
   - React + Vite + TypeScript
   - Tailwind CSS + component-level CSS
   - Basic folder structure

2. **Layout**
   - Dashboard container
   - Header
   - Responsive page layout

3. **Data Integration**
   - CSV parsing using PapaParse
   - Data normalization
   - Initial application state

4. **Filters**
   - Month (options derived from CSV periods, e.g. `June, 2025`)
   - Fuel Type
   - Metro City
   - Per-filter clear (×) and Reset Filters

5. **KPI Cards**
   - Average Price
   - Highest Price
   - Lowest Price
   - Total Records

6. **Charts**
   - Monthly Retail Selling Price (Line Chart)
   - Fuel Price by Metro City (Bar Chart)
   - Fuel Type Distribution (Donut Chart)

7. **Dashboard Enhancements**
   - Animated KPI counters
   - Toast notifications
   - Export Dashboard as PDF

8. **UX & Performance**
   - Async CSV fetch after first paint
   - Lazy-loaded charts and on-demand PDF code
   - Loading and empty states
   - Responsive design
   - Dynamic chart titles and subtitles

---

## Design Decisions

### Keep the UI Simple

The dashboard avoids unnecessary visual complexity.

Instead of using many colors or excessive animations, the focus is on readability and usability.

### Filters as the Single Source of Truth

Every KPI, chart, and export feature is driven by the same filtered dataset.

This ensures consistency across the application and avoids duplicate filtering logic.

### Incremental Development

Each feature was completed before moving to the next one.

Benefits:

- Easier debugging
- Easier code reviews
- Smaller Git commits
- Reduced risk of regressions

### Reusable Components

Reusable components were created only when they were actually needed.

Examples:

- KPI Card
- Filter Select
- Dashboard Card
- Animated Counter

Avoided creating generic components that would only be used once.

### Performance Considerations

Performance optimizations were applied where they provided clear value.

Examples:

- Fuel CSV served from `public/` and fetched asynchronously (keeps it out of the JS bundle)
- `useMemo` for derived chart and filter data
- Lazy-loaded chart components
- PDF export libraries loaded only when Export is clicked
- Shared filtered dataset reused by KPIs, charts, and export

The project intentionally avoids premature optimization.

### Chart Design Decisions

Charts were chosen based on the questions they answer.

#### Line Chart

Purpose: show fuel price trends over time.

Question answered: "How have prices changed month by month?"

#### Bar Chart

Purpose: compare fuel prices across metro cities.

Question answered: "Which city has the highest or lowest fuel price?"

#### Donut Chart

Purpose: show the distribution of fuel types.

Question answered: "What proportion of the filtered dataset is Petrol vs Diesel?"

### UX Decisions

Several small improvements were added to improve the user experience.

Examples:

- Reset and Export actions with icons
- Clear control on each filter select
- Animated KPI values
- Toast notifications
- Dynamic chart subtitles
- Responsive layout
- Loading state while data fetches
- Empty / no-data messaging on charts

These improvements make the dashboard feel more polished without adding unnecessary complexity.

### Export Strategy

PDF export was chosen as the primary export option because it provides a richer, presentation-ready report.

The exported report includes:

- Applied filters
- KPI summary
- Charts
- Generation timestamp

### Code Quality Principles

Throughout the project, the following principles were followed:

- Keep components focused
- Prefer readable code over clever code
- Avoid unnecessary abstractions
- Reuse existing components
- Keep commits feature-specific
- Preserve existing functionality when adding new features

---

## Future Enhancements

If this project were extended further, possible improvements include:

- Date range filtering
- Explicit light/dark theme toggle (system preference is already respected)
- Shareable dashboard URLs
- Dashboard snapshots
- Comparative analytics
- Predictive trend analysis
- Export to Excel
- Further accessibility enhancements

---

## Outcome

The final dashboard demonstrates:

- Responsive UI
- Interactive filtering
- Data visualization
- Component reusability
- Clean React architecture
- Production-oriented development practices

The emphasis throughout the project has been on building a dashboard that is simple, maintainable, and user-friendly rather than over-engineered.

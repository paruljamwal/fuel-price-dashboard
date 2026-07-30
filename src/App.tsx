import './App.css'

function App() {
  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <header className="page-header">
          <div className="page-title-group">
            <svg
              className="brand-mark"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20 3.5C20 3.5 8 16.5 8 24.5C8 31.127 13.373 36.5 20 36.5C26.627 36.5 32 31.127 32 24.5C32 16.5 20 3.5 20 3.5Z"
                fill="var(--brand)"
              />
              <path
                d="M12.5 18.5C12.5 18.5 10.5 21.5 10.5 24.5"
                stroke="var(--brand-accent)"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
              <rect x="12.5" y="25" width="4" height="7" rx="1" fill="#fff" />
              <rect x="17.75" y="21.5" width="4" height="10.5" rx="1" fill="#fff" />
              <rect x="23" y="18" width="4" height="14" rx="1" fill="var(--brand-accent)" />
            </svg>
            <h1 className="page-title">
              <span className="page-title-primary">Fuel Price</span>
              <span className="page-title-secondary">Dashboard</span>
            </h1>
          </div>
          <p className="page-subtitle">
            Monthly retail fuel price visualization across metro cities.
          </p>
        </header>

        <section className="dashboard-section" aria-labelledby="filters-heading">
          <h2 id="filters-heading" className="section-heading">
            Filters
          </h2>
          <div className="section-body" />
        </section>

        <section className="dashboard-section" aria-labelledby="chart-heading">
          <h2 id="chart-heading" className="section-heading">
            Monthly Retail Selling Price
          </h2>
          <div className="section-body section-body-chart" />
        </section>
      </div>
    </main>
  )
}

export default App

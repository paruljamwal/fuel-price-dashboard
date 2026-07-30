import PageHeader from './components/PageHeader/PageHeader'
import Section from './components/Section/Section'
import './App.css'

function App() {
  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <PageHeader
          title={
            <>
              <span className="page-title-primary">Fuel Price</span>
              <span className="page-title-secondary">Dashboard</span>
            </>
          }
          subtitle="Monthly retail fuel price visualization across metro cities."
        />

        <Section title="Filters">
          <div className="section-body" />
        </Section>

        <Section title="Monthly Retail Selling Price">
          <div className="section-body section-body-chart" />
        </Section>
      </div>
    </main>
  )
}

export default App

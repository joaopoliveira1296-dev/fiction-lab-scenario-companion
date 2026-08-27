import { Navigate, Route, Routes } from "react-router-dom";

function Placeholder({ title }: { title: string }) {
  return (
    <main className="app-shell" id="main-content">
      <section className="placeholder-surface" aria-labelledby="page-title">
        <p className="eyebrow">Fiction Lab Scenario Companion</p>
        <h1 id="page-title">{title}</h1>
        <p>
          Implementation scaffold initialized from the v3.0 Implementation-Ready PRD.
        </p>
      </section>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/library" element={<Placeholder title="Scenario Library" />} />
      <Route path="/trash" element={<Placeholder title="Trash" />} />
      <Route path="/settings" element={<Placeholder title="Settings" />} />
      <Route path="/scenario/:scenarioId/*" element={<Placeholder title="Scenario Workspace" />} />
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
}

import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ScenarioWorkspace() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="button button-ghost" onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          Library
        </button>

        <div className="brand">Fiction Lab Scenario Companion</div>
      </header>

      <main className="workspace-placeholder">
        <p className="page-subtitle">Scenario Workspace</p>

        <h1>Overview</h1>

        <p>
          Scenario ID:
          <code>{scenarioId}</code>
        </p>
      </main>
    </div>
  );
}

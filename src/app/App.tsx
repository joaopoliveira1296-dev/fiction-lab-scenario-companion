import { Navigate, Route, Routes } from "react-router-dom";

import { ScenarioLibrary } from "../features/library/ScenarioLibrary";
import { ScenarioWorkspace } from "../features/scenario/ScenarioWorkspace";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ScenarioLibrary />} />

      <Route
        path="/scenario/:scenarioId/:section"
        element={<ScenarioWorkspace />}
      />

      <Route
        path="/scenario/:scenarioId"
        element={<Navigate to="overview" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Boxes,
  FileText,
  Image,
  Link2,
  LayoutDashboard,
  Upload,
} from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface ScenarioSummary {
  id: string;
  name: string;
  description: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ScenarioOverview {
  loreCount: number;
  connectionCount: number;
  visualCanonCount: number;
}

type WorkspaceSection =
  | "overview"
  | "story"
  | "lore"
  | "visuals"
  | "connections"
  | "exports";

const WORKSPACE_SECTIONS: {
  id: WorkspaceSection;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "story",
    label: "Story",
    icon: BookOpen,
  },
  {
    id: "lore",
    label: "Lore",
    icon: FileText,
  },
  {
    id: "visuals",
    label: "Visuals",
    icon: Image,
  },
  {
    id: "connections",
    label: "Connections",
    icon: Link2,
  },
  {
    id: "exports",
    label: "Exports",
    icon: Upload,
  },
];

export function ScenarioWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scenarioId, section } = useParams();

  const [scenario, setScenario] = useState<ScenarioSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [overview, setOverview] = useState<ScenarioOverview | null>(null);

  const activeSection: WorkspaceSection = WORKSPACE_SECTIONS.some(
    (item) => item.id === section,
  )
    ? (section as WorkspaceSection)
    : "overview";

  useEffect(() => {
    async function loadScenario() {
      if (!scenarioId) {
        setLoadError("Scenario ID is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadError(null);

      try {
        const result = await invoke<ScenarioSummary>("get_scenario", {
          scenarioId,
        });

        setScenario(result);

        const overviewResult = await invoke<ScenarioOverview>(
          "get_scenario_overview",
          {
            scenarioId,
          },
        );

        setOverview(overviewResult);
      } catch (error) {
        setLoadError(
          typeof error === "string" ? error : "Could not load the Scenario.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadScenario();
  }, [scenarioId]);

  if (isLoading) {
    return (
      <div className="app-shell">
        <main className="workspace-loading">Loading Scenario...</main>
      </div>
    );
  }

  if (loadError || !scenario) {
    return (
      <div className="app-shell">
        <main className="workspace-loading">
          <h1>Could not open Scenario</h1>

          <p>{loadError ?? "Scenario not found."}</p>

          <button
            className="button button-secondary"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Library
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="workspace-shell">
      <header className="workspace-topbar">
        <div className="workspace-topbar-left">
          <button className="button button-ghost" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            Library
          </button>

          <div className="workspace-topbar-divider" />

          <div className="workspace-scenario-title">
            <span className="workspace-scenario-name">{scenario.name}</span>

            <span className="workspace-scenario-status">{scenario.status}</span>
          </div>
        </div>

        <div className="brand">Fiction Lab Scenario Companion</div>
      </header>

      <div className="workspace-layout">
        <aside className="workspace-sidebar">
          <nav className="workspace-nav" aria-label="Scenario sections">
            {WORKSPACE_SECTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`workspace-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => navigate(`/scenario/${scenarioId}/${item.id}`)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="workspace-main">
          {activeSection === "overview" && (
            <section className="workspace-section">
              <div className="workspace-section-header">
                <div>
                  <p className="workspace-eyebrow">Scenario Workspace</p>

                  <h1>Overview</h1>
                </div>
              </div>

              <div className="overview-hero">
                <div className="overview-hero-icon">
                  <Boxes size={28} />
                </div>

                <div className="overview-hero-content">
                  <div className="overview-title-row">
                    <h2>{scenario.name}</h2>

                    <span className="scenario-status">{scenario.status}</span>
                  </div>

                  <p>{scenario.description || "No description yet."}</p>

                  {scenario.tags.length > 0 && (
                    <div className="scenario-card-tags">
                      {scenario.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="overview-grid">
                <article className="overview-card">
                  <span className="overview-card-label">Lore</span>

                  <strong>{overview?.loreCount ?? 0} Cards</strong>

                  <span className="overview-card-helper">
                    No Lore Cards yet.
                  </span>
                </article>

                <article className="overview-card">
                  <span className="overview-card-label">Connections</span>

                  <strong>{overview?.connectionCount ?? 0} Connections</strong>

                  <span className="overview-card-helper">
                    No Connections yet.
                  </span>
                </article>

                <article className="overview-card">
                  <span className="overview-card-label">Visuals</span>

                  <strong>
                    {overview?.visualCanonCount ?? 0} VISUAL CANON
                  </strong>

                  <span className="overview-card-helper">
                    No approved visuals yet.
                  </span>
                </article>
              </div>
            </section>
          )}

          {activeSection === "story" && (
            <WorkspacePlaceholder
              title="Story"
              text="Backstory, Greeting and Custom Scenario Instructions will live here."
            />
          )}

          {activeSection === "lore" && (
            <WorkspacePlaceholder
              title="Lore"
              text="Lore Card creation, search, filters and lifecycle will live here."
            />
          )}

          {activeSection === "visuals" && (
            <WorkspacePlaceholder
              title="Visuals"
              text="Creation Prompts, Refinements and VISUAL CANON management will live here."
            />
          )}

          {activeSection === "connections" && (
            <WorkspacePlaceholder
              title="Connections"
              text="The directional Connection Ledger will live here."
            />
          )}

          {activeSection === "exports" && (
            <WorkspacePlaceholder
              title="Exports"
              text="Scenario documentation export profiles will live here."
            />
          )}
        </main>
      </div>
    </div>
  );
}

interface WorkspacePlaceholderProps {
  title: string;
  text: string;
}

function WorkspacePlaceholder({ title, text }: WorkspacePlaceholderProps) {
  return (
    <section className="workspace-section">
      <div className="workspace-section-header">
        <div>
          <p className="workspace-eyebrow">Scenario Workspace</p>

          <h1>{title}</h1>
        </div>
      </div>

      <div className="workspace-placeholder-card">
        <p>{text}</p>
      </div>
    </section>
  );
}

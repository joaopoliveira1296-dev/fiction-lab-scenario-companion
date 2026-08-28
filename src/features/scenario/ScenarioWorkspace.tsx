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

interface ScenarioStory {
  backstory: string;
  greeting: string;
  customInstructions: string;
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
  const [activeStoryField, setActiveStoryField] = useState<
    "backstory" | "greeting" | "customInstructions"
  >("backstory");

  const [backstoryDraft, setBackstoryDraft] = useState("");
  const [savedBackstory, setSavedBackstory] = useState("");
  const [greetingDraft, setGreetingDraft] = useState("");
  const [savedGreeting, setSavedGreeting] = useState("");
  const [customInstructionsDraft, setCustomInstructionsDraft] = useState("");
  const [savedCustomInstructions, setSavedCustomInstructions] = useState("");
  const [isSavingGreeting, setIsSavingGreeting] = useState(false);
  const [isSavingCustomInstructions, setIsSavingCustomInstructions] =
    useState(false);

  const [greetingSaveStatus, setGreetingSaveStatus] = useState<
    "idle" | "saved" | "error"
  >("idle");

  const [customInstructionsSaveStatus, setCustomInstructionsSaveStatus] =
    useState<"idle" | "saved" | "error">("idle");

  const [isSavingBackstory, setIsSavingBackstory] = useState(false);
  const [backstorySaveStatus, setBackstorySaveStatus] = useState<
    "idle" | "saved" | "error"
  >("idle");

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

        const storyResult = await invoke<ScenarioStory>("get_scenario_story", {
          scenarioId,
        });

        setBackstoryDraft(storyResult.backstory);
        setSavedBackstory(storyResult.backstory);
        setGreetingDraft(storyResult.greeting);
        setSavedGreeting(storyResult.greeting);
        setCustomInstructionsDraft(storyResult.customInstructions);
        setSavedCustomInstructions(storyResult.customInstructions);

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

  useEffect(() => {
    if (backstoryDraft === savedBackstory) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveBackstory();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [backstoryDraft, savedBackstory]);

  useEffect(() => {
    if (greetingDraft === savedGreeting) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveGreeting();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [greetingDraft, savedGreeting]);

  useEffect(() => {
    if (customInstructionsDraft === savedCustomInstructions) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveCustomInstructions();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [customInstructionsDraft, savedCustomInstructions]);

  async function saveBackstory() {
    if (!scenarioId) {
      return;
    }

    setIsSavingBackstory(true);
    setBackstorySaveStatus("idle");

    try {
      await invoke("update_scenario_backstory", {
        input: {
          scenarioId,
          backstory: backstoryDraft,
        },
      });

      setSavedBackstory(backstoryDraft);
      setBackstorySaveStatus("saved");
      setTimeout(() => {
        setBackstorySaveStatus("idle");
      }, 1800);
    } catch (error) {
      console.error("Could not save Backstory:", error);
      setBackstorySaveStatus("error");
    } finally {
      setIsSavingBackstory(false);
    }
  }

  async function saveGreeting() {
    if (!scenarioId) {
      return;
    }

    setIsSavingGreeting(true);
    setGreetingSaveStatus("idle");

    try {
      await invoke("update_scenario_greeting", {
        input: {
          scenarioId,
          greeting: greetingDraft,
        },
      });

      setSavedGreeting(greetingDraft);
      setGreetingSaveStatus("saved");
      setTimeout(() => {
        setGreetingSaveStatus("idle");
      }, 1800);
    } catch (error) {
      console.error("Could not save Greeting:", error);
      setGreetingSaveStatus("error");
    } finally {
      setIsSavingGreeting(false);
    }
  }

  async function saveCustomInstructions() {
    if (!scenarioId) {
      return;
    }

    setIsSavingCustomInstructions(true);
    setCustomInstructionsSaveStatus("idle");

    try {
      await invoke("update_scenario_custom_instructions", {
        input: {
          scenarioId,
          customInstructions: customInstructionsDraft,
        },
      });

      setSavedCustomInstructions(customInstructionsDraft);
      setCustomInstructionsSaveStatus("saved");
      setTimeout(() => {
        setCustomInstructionsSaveStatus("idle");
      }, 1800);
    } catch (error) {
      console.error("Could not save Custom Scenario Instructions:", error);
      setCustomInstructionsSaveStatus("error");
    } finally {
      setIsSavingCustomInstructions(false);
    }
  }

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
            <section className="workspace-section">
              <div className="workspace-section-header">
                <div>
                  <p className="workspace-eyebrow">Scenario Workspace</p>
                  <h1>Story</h1>
                </div>
              </div>

              <div className="story-field-tabs">
                <button
                  type="button"
                  className={
                    activeStoryField === "backstory"
                      ? "story-field-tab story-field-tab-active"
                      : "story-field-tab"
                  }
                  aria-pressed={activeStoryField === "backstory"}
                  onClick={() => setActiveStoryField("backstory")}
                >
                  Backstory / World Details
                </button>

                <button
                  type="button"
                  className={
                    activeStoryField === "greeting"
                      ? "story-field-tab story-field-tab-active"
                      : "story-field-tab"
                  }
                  aria-pressed={activeStoryField === "greeting"}
                  onClick={() => setActiveStoryField("greeting")}
                >
                  Greeting
                </button>

                <button
                  type="button"
                  className={
                    activeStoryField === "customInstructions"
                      ? "story-field-tab story-field-tab-active"
                      : "story-field-tab"
                  }
                  aria-pressed={activeStoryField === "customInstructions"}
                  onClick={() => setActiveStoryField("customInstructions")}
                >
                  Custom Scenario Instructions
                </button>
              </div>
              {activeStoryField === "backstory" && (
                <div className="story-field-card">
                  <div className="story-field-header">
                    <h2>Backstory / World Details</h2>

                    <div className="story-field-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => void saveBackstory()}
                        disabled={
                          isSavingBackstory || backstoryDraft === savedBackstory
                        }
                      >
                        {isSavingBackstory ? "Saving..." : "Save Backstory"}
                      </button>

                      {backstorySaveStatus === "saved" && (
                        <span className="story-save-status">Saved</span>
                      )}

                      {backstoryDraft !== savedBackstory &&
                        backstorySaveStatus !== "error" && (
                          <span className="story-save-status">Unsaved</span>
                        )}

                      {backstorySaveStatus === "error" && (
                        <span className="story-save-status story-save-status-error">
                          Could not save
                        </span>
                      )}
                    </div>
                  </div>
                  <textarea
                    className="story-textarea"
                    value={backstoryDraft}
                    onChange={(event) => {
                      setBackstoryDraft(event.target.value);
                      setBackstorySaveStatus("idle");
                    }}
                    placeholder="No Backstory yet."
                  />
                </div>
              )}

              {activeStoryField === "greeting" && (
                <div className="story-field-card">
                  <div className="story-field-header">
                    <h2>Greeting</h2>

                    <div className="story-field-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => void saveGreeting()}
                        disabled={
                          isSavingGreeting || greetingDraft === savedGreeting
                        }
                      >
                        {isSavingGreeting ? "Saving..." : "Save Greeting"}
                      </button>

                      {greetingSaveStatus === "saved" && (
                        <span className="story-save-status">Saved</span>
                      )}

                      {greetingDraft !== savedGreeting &&
                        greetingSaveStatus !== "error" && (
                          <span className="story-save-status">Unsaved</span>
                        )}

                      {greetingSaveStatus === "error" && (
                        <span className="story-save-status story-save-status-error">
                          Could not save
                        </span>
                      )}
                    </div>
                  </div>

                  <textarea
                    className="story-textarea"
                    value={greetingDraft}
                    onChange={(event) => {
                      setGreetingDraft(event.target.value);
                      setGreetingSaveStatus("idle");
                    }}
                    placeholder="No Greeting yet."
                  />
                </div>
              )}

              {activeStoryField === "customInstructions" && (
                <div className="story-field-card">
                  <div className="story-field-header">
                    <h2>Custom Scenario Instructions</h2>

                    <div className="story-field-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => void saveCustomInstructions()}
                        disabled={
                          isSavingCustomInstructions ||
                          customInstructionsDraft === savedCustomInstructions
                        }
                      >
                        {isSavingCustomInstructions
                          ? "Saving..."
                          : "Save Custom Instructions"}
                      </button>

                      {customInstructionsSaveStatus === "saved" && (
                        <span className="story-save-status">Saved</span>
                      )}

                      {customInstructionsDraft !== savedCustomInstructions &&
                        customInstructionsSaveStatus !== "error" && (
                          <span className="story-save-status">Unsaved</span>
                        )}

                      {customInstructionsSaveStatus === "error" && (
                        <span className="story-save-status story-save-status-error">
                          Could not save
                        </span>
                      )}
                    </div>
                  </div>

                  <textarea
                    className="story-textarea"
                    value={customInstructionsDraft}
                    onChange={(event) => {
                      setCustomInstructionsDraft(event.target.value);
                      setCustomInstructionsSaveStatus("idle");
                    }}
                    placeholder="No Custom Scenario Instructions yet."
                  />
                </div>
              )}
            </section>
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

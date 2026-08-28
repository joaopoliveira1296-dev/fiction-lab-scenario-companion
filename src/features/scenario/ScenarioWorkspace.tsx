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
import {
  FICTION_LAB_PLAN_PROFILES,
  type FictionLabPlan,
} from "../../config/fictionLabPlatform";

interface ScenarioSummary {
  id: string;
  name: string;
  description: string;
  status: string;
  fictionLabPlan: FictionLabPlan;
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

interface ScenarioStoryLimits {
  backstory: number;
  greeting: number;
  customInstructions: number;
}

interface LoreCardSummary {
  id: string;
  loreType: string;
  internalCategory: string;
  title: string;
  description: string;
  weight: string;
  pinned: boolean;
  textCanonStatus: string;
  visualCanonStatus: string;
  displayOrder: number;
}

type SaveStatus = "idle" | "saved" | "error";

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

function countCharacters(text: string): number {
  return Array.from(text).length;
}

export function ScenarioWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scenarioId, section } = useParams();

  const [scenario, setScenario] = useState<ScenarioSummary | null>(null);

  const [storyLimits, setStoryLimits] = useState<ScenarioStoryLimits | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSavingFictionLabPlan, setIsSavingFictionLabPlan] = useState(false);

  const [overview, setOverview] = useState<ScenarioOverview | null>(null);
  const [loreCards, setLoreCards] = useState<LoreCardSummary[]>([]);
  const [selectedLoreCardId, setSelectedLoreCardId] = useState<string | null>(
    null,
  );
  const [selectedLoreWeight, setSelectedLoreWeight] = useState("STANDARD");
  const [isCreatingLoreCard, setIsCreatingLoreCard] = useState(false);
  const [newLoreType, setNewLoreType] = useState("CHARACTER");
  const [newLoreInternalCategory, setNewLoreInternalCategory] =
    useState("Other");
  const [newLoreTitle, setNewLoreTitle] = useState("");
  const [newLoreWeight, setNewLoreWeight] = useState("STANDARD");
  const [loreCreateError, setLoreCreateError] = useState<string | null>(null);
  const [activeStoryField, setActiveStoryField] = useState<
    "backstory" | "greeting" | "customInstructions"
  >("backstory");

  const [backstoryDraft, setBackstoryDraft] = useState("");
  const [savedBackstory, setSavedBackstory] = useState("");
  const [isSavingBackstory, setIsSavingBackstory] = useState(false);

  const [greetingDraft, setGreetingDraft] = useState("");
  const [savedGreeting, setSavedGreeting] = useState("");
  const [isSavingGreeting, setIsSavingGreeting] = useState(false);

  const [customInstructionsDraft, setCustomInstructionsDraft] = useState("");
  const [savedCustomInstructions, setSavedCustomInstructions] = useState("");
  const [isSavingCustomInstructions, setIsSavingCustomInstructions] =
    useState(false);

  const [backstorySaveStatus, setBackstorySaveStatus] =
    useState<SaveStatus>("idle");
  const [backstorySaveError, setBackstorySaveError] = useState<string | null>(
    null,
  );

  const [greetingSaveStatus, setGreetingSaveStatus] =
    useState<SaveStatus>("idle");
  const [greetingSaveError, setGreetingSaveError] = useState<string | null>(
    null,
  );

  const [customInstructionsSaveStatus, setCustomInstructionsSaveStatus] =
    useState<SaveStatus>("idle");
  const [customInstructionsSaveError, setCustomInstructionsSaveError] =
    useState<string | null>(null);
  const activeSection: WorkspaceSection = WORKSPACE_SECTIONS.some(
    (item) => item.id === section,
  )
    ? (section as WorkspaceSection)
    : "overview";

  const backstoryLimit = storyLimits?.backstory ?? null;
  const greetingLimit = storyLimits?.greeting ?? null;
  const customInstructionsLimit = storyLimits?.customInstructions ?? null;

  const backstoryCharacterCount = countCharacters(backstoryDraft);
  const greetingCharacterCount = countCharacters(greetingDraft);
  const customInstructionsCharacterCount = countCharacters(
    customInstructionsDraft,
  );
  const selectedLoreCard =
    loreCards.find((card) => card.id === selectedLoreCardId) ?? null;

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

        const storyLimitsResult = await invoke<ScenarioStoryLimits>(
          "get_scenario_story_limits",
          {
            scenarioId,
          },
        );

        const loreCardsResult = await invoke<LoreCardSummary[]>(
          "list_lore_cards",
          {
            scenarioId,
          },
        );

        setBackstoryDraft(storyResult.backstory);
        setSavedBackstory(storyResult.backstory);
        setGreetingDraft(storyResult.greeting);
        setSavedGreeting(storyResult.greeting);
        setCustomInstructionsDraft(storyResult.customInstructions);
        setSavedCustomInstructions(storyResult.customInstructions);

        setStoryLimits(storyLimitsResult);
        setLoreCards(loreCardsResult);
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

  async function createLoreCard() {
    if (!scenarioId) {
      return;
    }

    setLoreCreateError(null);

    try {
      const createdCard = await invoke<LoreCardSummary>("create_lore_card", {
        input: {
          scenarioId,
          loreType: newLoreType,
          internalCategory: newLoreInternalCategory,
          title: newLoreTitle,
          weight: newLoreWeight,
        },
      });

      setLoreCards((currentCards) => [...currentCards, createdCard]);

      setNewLoreType("CHARACTER");
      setNewLoreInternalCategory("Other");
      setNewLoreTitle("");
      setNewLoreWeight("STANDARD");
      setIsCreatingLoreCard(false);
    } catch (error) {
      setLoreCreateError(
        typeof error === "string" ? error : "Could not create the Lore Card.",
      );
    }
  }

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

  async function saveFictionLabPlan(fictionLabPlan: FictionLabPlan) {
    if (!scenarioId || !scenario) {
      return;
    }

    setIsSavingFictionLabPlan(true);

    try {
      await invoke("update_scenario_fiction_lab_plan", {
        input: {
          scenarioId,
          fictionLabPlan,
        },
      });

      setScenario({
        ...scenario,
        fictionLabPlan,
      });

      try {
        const storyLimitsResult = await invoke<ScenarioStoryLimits>(
          "get_scenario_story_limits",
          {
            scenarioId,
          },
        );

        setStoryLimits(storyLimitsResult);
      } catch (error) {
        setStoryLimits(null);
        console.error("Could not reload Story limits:", error);
      }
    } catch (error) {
      console.error("Could not save Fiction Lab plan:", error);
    } finally {
      setIsSavingFictionLabPlan(false);
    }
  }

  async function saveBackstory() {
    if (!scenarioId) {
      return;
    }

    setIsSavingBackstory(true);
    setBackstorySaveStatus("idle");
    setBackstorySaveError(null);

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

      setBackstorySaveError(
        typeof error === "string" ? error : "Could not save Backstory.",
      );

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
    setGreetingSaveError(null);

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

      setGreetingSaveError(
        typeof error === "string" ? error : "Could not save Greeting.",
      );

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
    setCustomInstructionsSaveError(null);

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

      setCustomInstructionsSaveError(
        typeof error === "string"
          ? error
          : "Could not save Custom Scenario Instructions.",
      );

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

                  <label>
                    Fiction Lab Plan:{" "}
                    <select
                      value={scenario.fictionLabPlan}
                      onChange={(event) =>
                        void saveFictionLabPlan(
                          event.target.value as FictionLabPlan,
                        )
                      }
                      disabled={isSavingFictionLabPlan}
                    >
                      {(
                        Object.entries(FICTION_LAB_PLAN_PROFILES) as [
                          FictionLabPlan,
                          (typeof FICTION_LAB_PLAN_PROFILES)[FictionLabPlan],
                        ][]
                      ).map(([plan, profile]) => (
                        <option key={plan} value={plan}>
                          {profile.label}
                        </option>
                      ))}
                    </select>
                  </label>

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
                          {backstorySaveError ?? "Could not save Backstory."}
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
                  <div
                    className={
                      backstoryLimit !== null &&
                      backstoryCharacterCount > backstoryLimit
                        ? "story-character-count story-character-count-over-limit"
                        : "story-character-count"
                    }
                  >
                    {backstoryLimit === null
                      ? `${backstoryCharacterCount} characters`
                      : `${backstoryCharacterCount} / ${backstoryLimit} characters`}
                  </div>
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
                          {greetingSaveError ?? "Could not save Greeting."}
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
                  <div
                    className={
                      greetingLimit !== null &&
                      greetingCharacterCount > greetingLimit
                        ? "story-character-count story-character-count-over-limit"
                        : "story-character-count"
                    }
                  >
                    {greetingLimit === null
                      ? `${greetingCharacterCount} characters`
                      : `${greetingCharacterCount} / ${greetingLimit} characters`}
                  </div>
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
                          {customInstructionsSaveError ??
                            "Could not save Custom Scenario Instructions."}
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
                  <div
                    className={
                      customInstructionsLimit !== null &&
                      customInstructionsCharacterCount > customInstructionsLimit
                        ? "story-character-count story-character-count-over-limit"
                        : "story-character-count"
                    }
                  >
                    {customInstructionsLimit === null
                      ? `${customInstructionsCharacterCount} characters`
                      : `${customInstructionsCharacterCount} / ${customInstructionsLimit} characters`}
                  </div>
                </div>
              )}
            </section>
          )}
          {activeSection === "lore" && (
            <section className="workspace-section">
              <div className="workspace-section-header">
                <div>
                  <h2>Lore</h2>
                  <p>Manage the Lore Cards stored for this Scenario.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreatingLoreCard(true)}
                >
                  New Lore Card
                </button>
              </div>
              {isCreatingLoreCard && (
                <div className="lore-create-form">
                  <label>
                    Type
                    <select
                      value={newLoreType}
                      onChange={(event) => setNewLoreType(event.target.value)}
                    >
                      <option value="CHARACTER">Character</option>
                      <option value="LOCATION">Location</option>
                      <option value="PREMISE">Premise</option>
                      <option value="FACTION">Faction</option>
                      <option value="ITEM">Item</option>
                      <option value="RACE">Race</option>
                      <option value="RULE">Rule</option>
                    </select>
                  </label>

                  <label>
                    Internal Category
                    <select
                      value={newLoreInternalCategory}
                      onChange={(event) =>
                        setNewLoreInternalCategory(event.target.value)
                      }
                    >
                      <option value="World Premise">World Premise</option>
                      <option value="Conflict Matrix">Conflict Matrix</option>
                      <option value="Routine / Schedule">
                        Routine / Schedule
                      </option>
                      <option value="Wardrobe">Wardrobe</option>
                      <option value="Relationship">Relationship</option>
                      <option value="Arc">Arc</option>
                      <option value="Visual Notes">Visual Notes</option>
                      <option value="Professional Procedures">
                        Professional Procedures
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <div className="lore-weight-field">
                    <span className="lore-weight-label">Weight</span>

                    <div className="lore-weight-selector">
                      {[
                        "MINOR",
                        "SUPPLEMENTARY",
                        "STANDARD",
                        "IMPORTANT",
                        "CRITICAL",
                      ].map((weight) => (
                        <button
                          key={weight}
                          type="button"
                          className={`lore-weight-option ${
                            newLoreWeight === weight ? "is-selected" : ""
                          }`}
                          onClick={() => setNewLoreWeight(weight)}
                        >
                          <span className="lore-weight-dot" />
                          <span>{weight}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <label>
                    Title
                    <input
                      type="text"
                      value={newLoreTitle}
                      onChange={(event) => setNewLoreTitle(event.target.value)}
                    />
                  </label>
                  {loreCreateError && (
                    <div className="lore-create-error">{loreCreateError}</div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsCreatingLoreCard(false)}
                    >
                      Cancel
                    </button>

                    <button type="button" onClick={() => void createLoreCard()}>
                      Create
                    </button>
                  </div>
                </div>
              )}
              {loreCards.length === 0 ? (
                <div className="workspace-empty-state">
                  <strong>No Lore Cards yet.</strong>
                  <span>
                    Lore Cards created for this Scenario will appear here.
                  </span>
                </div>
              ) : (
                <div className="lore-list">
                  {loreCards.map((card) => (
                    <article
                      key={card.id}
                      className={`lore-list-card ${
                        selectedLoreCardId === card.id ? "is-selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedLoreCardId(card.id);
                        setSelectedLoreWeight(card.weight);
                      }}
                    >
                      <div className="lore-list-card-header">
                        <div>
                          <span>{card.loreType}</span>
                          <h3>{card.title}</h3>
                        </div>

                        {card.pinned && (
                          <span className="lore-pinned-badge">Pinned</span>
                        )}
                      </div>

                      {card.description && <p>{card.description}</p>}

                      <div className="lore-list-card-meta">
                        <span>{card.internalCategory}</span>
                        <span>{card.weight}</span>
                        <span className="lore-text-status">
                          {card.textCanonStatus}
                        </span>
                        <span className="lore-visual-status">
                          {card.visualCanonStatus}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {selectedLoreCard && (
                <div className="lore-editor-preview">
                  <div className="lore-editor-preview-header">
                    <div>
                      <span>{selectedLoreCard.loreType}</span>
                      <h3>{selectedLoreCard.title}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedLoreCardId(null)}
                    >
                      Close
                    </button>
                  </div>

                  <dl>
                    <div>
                      <dt>Internal Category</dt>
                      <dd>{selectedLoreCard.internalCategory}</dd>
                    </div>

                    <div className="lore-editor-weight">
                      <dt>Weight</dt>

                      <dd>
                        <div className="lore-weight-selector">
                          {[
                            "MINOR",
                            "SUPPLEMENTARY",
                            "STANDARD",
                            "IMPORTANT",
                            "CRITICAL",
                          ].map((weight) => (
                            <button
                              key={weight}
                              type="button"
                              className={`lore-weight-option ${
                                selectedLoreWeight === weight
                                  ? "is-selected"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedLoreWeight(weight);

                                void invoke("update_lore_card_weight", {
                                  input: {
                                    loreCardId: selectedLoreCard.id,
                                    weight,
                                  },
                                }).then(() => {
                                  setLoreCards((currentCards) =>
                                    currentCards.map((card) =>
                                      card.id === selectedLoreCard.id
                                        ? { ...card, weight }
                                        : card,
                                    ),
                                  );
                                });
                              }}
                            >
                              <span className="lore-weight-dot" />
                              <span>{weight}</span>
                            </button>
                          ))}
                        </div>
                      </dd>
                    </div>

                    <div>
                      <dt>Text Canon Status</dt>
                      <dd>{selectedLoreCard.textCanonStatus}</dd>
                    </div>

                    <div>
                      <dt>Visual Canon Status</dt>
                      <dd>{selectedLoreCard.visualCanonStatus}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </section>
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

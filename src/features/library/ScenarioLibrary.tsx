import { useEffect, useRef, useState } from "react";
import {
  Search,
  Plus,
  Grid2X2,
  List,
  Settings,
  X,
  ImagePlus,
  Trash2,
} from "lucide-react";

import { FICTION_LAB_TAGS } from "../../data/fictionLabTags";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

interface ScenarioSummary {
  id: string;
  name: string;
  description: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export function ScenarioLibrary() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [description, setDescription] = useState("");

  const [tagSearch, setTagSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const newScenarioButtonRef = useRef<HTMLButtonElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const [isLoadingScenarios, setIsLoadingScenarios] = useState(true);
  const [scenarioLoadError, setScenarioLoadError] = useState<string | null>(
    null,
  );

  const canCreate = scenarioName.trim().length > 0;

  const filteredTags = FICTION_LAB_TAGS.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.trim().toLowerCase()),
  );

  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  function handleCoverChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function removeCover() {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverFile(null);
    setCoverPreview(null);

    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  }

  function toggleTag(tag: string) {
    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      setSelectedTags((current) =>
        current.filter((selectedTag) => selectedTag !== tag),
      );
      return;
    }

    if (selectedTags.length >= 5) {
      return;
    }

    setSelectedTags((current) => [...current, tag]);
  }

  function removeTag(tag: string) {
    setSelectedTags((current) =>
      current.filter((selectedTag) => selectedTag !== tag),
    );
  }

  useEffect(() => {
    if (!isCreateOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCreateModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCreateOpen]);

  useEffect(() => {
    if (!isCreateOpen) {
      newScenarioButtonRef.current?.focus();
    }
  }, [isCreateOpen]);

  useEffect(() => {
    void loadScenarios();
  }, []);

  async function loadScenarios() {
    setIsLoadingScenarios(true);
    setScenarioLoadError(null);

    try {
      const result = await invoke<ScenarioSummary[]>("list_scenarios");

      setScenarios(result);
    } catch (error) {
      setScenarioLoadError(
        typeof error === "string" ? error : "Could not load Scenarios.",
      );
    } finally {
      setIsLoadingScenarios(false);
    }
  }

  async function handleCreateScenario() {
    const trimmedName = scenarioName.trim();

    if (!trimmedName || isCreating) {
      return;
    }

    setIsCreating(true);
    setCreateError(null);

    try {
      const createdScenario = await invoke<ScenarioSummary>("create_scenario", {
        input: {
          name: trimmedName,
          description: description.trim() || null,
          tags: selectedTags,
        },
      });

      setScenarios((current) => [createdScenario, ...current]);

      setScenarioName("");
      setDescription("");
      setSelectedTags([]);
      setTagSearch("");
      removeCover();

      closeCreateModal();
    } catch (error) {
      setCreateError(
        typeof error === "string" ? error : "Could not create the Scenario.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Fiction Lab Scenario Companion</div>

        <div className="topbar-actions">
          <button className="icon-button" aria-label="Settings">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="library-page">
        <section className="library-header">
          <div>
            <h1>Scenario Library</h1>

            <p className="page-subtitle">
              Create, organize and manage your Fiction Lab scenarios.
            </p>
          </div>

          <button
            ref={newScenarioButtonRef}
            className="button button-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={18} />
            New Scenario
          </button>
        </section>

        <section className="library-toolbar">
          <div className="search-field">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search scenarios..."
              aria-label="Search scenarios"
            />
          </div>

          <div className="toolbar-actions">
            <select aria-label="Scenario filter" defaultValue="all">
              <option value="all">All</option>
              <option value="recent">Recently Edited</option>
              <option value="progress">In Progress</option>
              <option value="complete">Completed</option>
            </select>

            <select aria-label="Sort scenarios" defaultValue="recent">
              <option value="recent">Recently Edited</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
              <option value="created">Recently Created</option>
              <option value="oldest">Oldest Created</option>
            </select>

            <div className="view-toggle" aria-label="View mode">
              <button className="icon-button active" aria-label="Grid view">
                <Grid2X2 size={18} />
              </button>

              <button className="icon-button" aria-label="List view">
                <List size={18} />
              </button>
            </div>
          </div>
        </section>

        {isLoadingScenarios ? (
          <section className="library-message">Loading Scenarios...</section>
        ) : scenarioLoadError ? (
          <section className="library-message library-message-error">
            <p>{scenarioLoadError}</p>

            <button
              className="button button-secondary"
              onClick={() => void loadScenarios()}
            >
              Retry
            </button>
          </section>
        ) : scenarios.length === 0 ? (
          <section className="empty-state">
            <div className="empty-state-card">
              <div className="empty-state-icon">
                <Grid2X2 size={30} />
              </div>

              <h2>No scenarios yet</h2>

              <p>
                Create your first Scenario to start building Story, Lore,
                Connections and visual references.
              </p>

              <button
                className="button button-primary"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus size={18} />
                New Scenario
              </button>
            </div>
          </section>
        ) : (
          <section className="scenario-grid">
            {scenarios.map((scenario) => (
              <article
                className="scenario-card"
                key={scenario.id}
                tabIndex={0}
                role="button"
                onClick={() => navigate(`/scenario/${scenario.id}/overview`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/scenario/${scenario.id}/overview`);
                  }
                }}
              >
                <div className="scenario-card-cover">
                  <span>
                    {scenario.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>

                <div className="scenario-card-content">
                  <div className="scenario-card-heading">
                    <h2>{scenario.name}</h2>

                    <span className="scenario-status">{scenario.status}</span>
                  </div>

                  {scenario.description && <p>{scenario.description}</p>}

                  {scenario.tags.length > 0 && (
                    <div className="scenario-card-tags">
                      {scenario.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}

                      {scenario.tags.length > 3 && (
                        <span>+{scenario.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {isCreateOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCreateModal();
            }
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-scenario-title"
          >
            <header className="modal-header">
              <div>
                <h2 id="new-scenario-title">New Scenario</h2>

                <p>
                  Create the basic Scenario details. You can add more later.
                </p>
              </div>

              <button
                className="icon-button"
                aria-label="Close dialog"
                onClick={closeCreateModal}
              >
                <X size={18} />
              </button>
            </header>

            <div className="modal-body">
              <label className="field">
                <span className="field-label">
                  Scenario Name
                  <span className="required-label">Required</span>
                </span>

                <input
                  autoFocus
                  type="text"
                  value={scenarioName}
                  onChange={(event) => setScenarioName(event.target.value)}
                  placeholder="e.g. Alpine Estate"
                />
              </label>

              <label className="field">
                <span className="field-label">Description</span>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="A short description of this Scenario..."
                  rows={4}
                />
              </label>

              <div className="field">
                <span className="field-label">
                  Cover Image
                  <span className="required-label">Optional</span>
                </span>

                <input
                  ref={coverInputRef}
                  className="visually-hidden"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleCoverChange}
                />

                {!coverPreview ? (
                  <button
                    className="cover-picker"
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <ImagePlus size={22} />

                    <span>
                      <strong>Choose Image</strong>
                      <small>PNG, JPEG or WebP</small>
                    </span>
                  </button>
                ) : (
                  <div className="cover-preview">
                    <img
                      src={coverPreview}
                      alt="Selected Scenario cover preview"
                    />

                    <div className="cover-preview-details">
                      <div className="cover-file-name" title={coverFile?.name}>
                        {coverFile?.name}
                      </div>

                      <div className="cover-preview-actions">
                        <button
                          className="button button-secondary button-small"
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                        >
                          Replace
                        </button>

                        <button
                          className="button button-ghost button-small"
                          type="button"
                          onClick={removeCover}
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="field">
                <span className="field-label">
                  Tags &amp; Genres
                  <span className="tag-counter">{selectedTags.length} / 5</span>
                </span>

                {selectedTags.length > 0 && (
                  <div className="selected-tags">
                    {selectedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="selected-tag"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        {tag}
                        <X size={14} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="tag-picker">
                  <div className="tag-search">
                    <Search size={16} />

                    <input
                      type="search"
                      value={tagSearch}
                      onChange={(event) => setTagSearch(event.target.value)}
                      placeholder="Search tags..."
                      aria-label="Search Tags and Genres"
                    />
                  </div>

                  <div className="tag-options">
                    {filteredTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      const isDisabled =
                        selectedTags.length >= 5 && !isSelected;

                      return (
                        <button
                          key={tag}
                          type="button"
                          className={`tag-option ${
                            isSelected ? "selected" : ""
                          }`}
                          disabled={isDisabled}
                          onClick={() => toggleTag(tag)}
                        >
                          <span>{tag}</span>

                          {isSelected && <span aria-hidden="true">✓</span>}
                        </button>
                      );
                    })}

                    {filteredTags.length === 0 && (
                      <div className="tag-empty">
                        No matching Tags &amp; Genres.
                      </div>
                    )}
                  </div>
                </div>

                <span className="field-helper">
                  Choose up to 5 official Fiction Lab Tags &amp; Genres.
                </span>
              </div>
            </div>
            {createError && (
              <div className="form-error" role="alert">
                {createError}
              </div>
            )}
            <footer className="modal-footer">
              <button
                className="button button-ghost"
                onClick={closeCreateModal}
              >
                Cancel
              </button>

              <button
                className="button button-primary"
                disabled={!canCreate || isCreating}
                onClick={handleCreateScenario}
              >
                {isCreating ? "Creating..." : "Create Scenario"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}

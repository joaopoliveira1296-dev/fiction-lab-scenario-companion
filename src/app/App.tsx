import { useState } from "react";
import {
  Search,
  Plus,
  Grid2X2,
  List,
  Settings,
  X,
} from "lucide-react";

export function App() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [description, setDescription] = useState("");

  const canCreate = scenarioName.trim().length > 0;

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
      </main>

      {isCreateOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsCreateOpen(false);
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
                <p>Create the basic Scenario details. You can add more later.</p>
              </div>

              <button
                className="icon-button"
                aria-label="Close dialog"
                onClick={() => setIsCreateOpen(false)}
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
                <span className="field-label">Cover Image</span>
                <button className="button button-secondary" type="button">
                  Choose Image
                </button>
                <span className="field-helper">Optional</span>
              </div>

              <div className="field">
                <span className="field-label">Tags &amp; Genres</span>
                <div className="field-placeholder">
                  Tag selector will be connected next.
                </div>
                <span className="field-helper">Up to 5</span>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                className="button button-ghost"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>

              <button
                className="button button-primary"
                disabled={!canCreate}
              >
                Create Scenario
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
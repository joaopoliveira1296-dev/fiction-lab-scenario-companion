# Development Status

## Current milestone

Lore Workspace implementation in progress.

## Last confirmed working state

- Tauri app launches successfully.
- SQLite is the authoritative data source.
- Scenario Library loads persisted Scenarios.
- New Scenario creates a real database record.
- Tags persist.
- Scenario cards open routed Workspace.
- Workspace routes:
  - Overview
  - Story
  - Lore
  - Visuals
  - Connections
  - Exports
- Scenario Overview displays real SQLite metrics.

## Overview Workspace

Overview is functional and connected to SQLite.

Current metrics include:

- Lore Card count.
- Connection count.
- VISUAL CANON count.

## Story Workspace

Story is functional, persisted, autosaving and plan-aware.

Implemented Scenario-level Fiction Lab fields:

- Backstory / World Details.
- Greeting.
- Custom Scenario Instructions.

Story currently includes:

- SQLite persistence;
- autosave after a short idle delay;
- manual Save buttons;
- Saving / Saved / Unsaved / error states;
- Unicode-aware character counting;
- plan-aware Fiction Lab limits;
- backend enforcement of active plan limits;
- preservation of existing over-limit content when switching to a more restrictive plan.

Supported Fiction Lab Target Plans:

- Free
- Plus
- Ultra

Verified Story limits:

### Free

- Backstory / World Details: 3000 characters
- Greeting: 2000 characters
- Custom Scenario Instructions: 3000 characters

### Plus

- Backstory / World Details: 10000 characters
- Greeting: 4000 characters
- Custom Scenario Instructions: 6000 characters

### Ultra

- Backstory / World Details: 10000 characters
- Greeting: 4000 characters
- Custom Scenario Instructions: 6000 characters

## Lore Workspace

Lore is no longer a placeholder.

### Lore list

Implemented:

- Lore Cards load from SQLite;
- trashed cards are excluded;
- cards are ordered by display_order;
- empty state;
- styled Lore Card list;
- visible metadata:
  - Type
  - Title
  - Description
  - Internal Category
  - Weight
  - Pinned
  - Text Canon Status
  - Visual Canon Status

### Lore Card creation

Implemented and manually tested:

- New Lore Card form;
- Type selection:
  - Character
  - Location
  - Premise
  - Faction
  - Item
  - Race
  - Rule
- Internal Category selection:
  - World Premise
  - Conflict Matrix
  - Routine / Schedule
  - Wardrobe
  - Relationship
  - Arc
  - Visual Notes
  - Professional Procedures
  - Other
- Title;
- Weight;
- title-required validation;
- SQLite persistence;
- automatic display_order assignment.

### Weight control

Weight uses a horizontal five-position selector rather than a generic dropdown.

Supported values:

- MINOR
- SUPPLEMENTARY
- STANDARD
- IMPORTANT
- CRITICAL

STANDARD is the default for new Lore Cards.

Weight is editable both during creation and in the Lore Card editor.

Persistence has been manually confirmed.

### Lore Card detail editor

A Lore Card can be selected from the list to open its detail/editor panel.

Currently editable and persisted:

- Title
- Type
- Internal Category
- Weight
- Description
- Content
- Pinned
- Text Canon Status
- Visual Canon Status

Text Canon Status values:

- OPEN
- DRAFT
- READY_FOR_PLATFORM_CHECK
- CANON_CLOSED

Visual Canon Status values:

- NOT_STARTED
- IN_PROGRESS
- VISUAL_CANON

The editor updates the Lore list immediately after successful persistence.

Update failures restore the previous local value where appropriate and display an editor error.

### Lore fields not implemented yet

The existing SQLite model contains additional Lore Card functionality that is not yet exposed in the editor, including:

- Triggers;
- linked pieces / Connections representation;
- Character Traits;
- Notes;
- revision note;
- source reference note;
- verified Fiction Lab count;
- creation prompt;
- refinement prompts;
- managed active/final image;
- archived prior images;
- remaining lifecycle / deletion / ordering behaviour.

Lore-specific Fiction Lab limits and combined Lore length handling are also still pending.

## Current Workspace state

- Overview — functional and connected to SQLite metrics.
- Story — functional, persisted, autosaving and plan-aware.
- Lore — active implementation; creation and core text/metadata editor functional and persisted.
- Visuals — placeholder.
- Connections — placeholder.
- Exports — placeholder.

## Latest validation

Before the current checkpoint:

- `npm run build` passed.
- `cargo check --manifest-path .\src-tauri\Cargo.toml` passed.
- `git diff --check` passed.
- Manual persistence tests passed for the currently implemented Lore fields.

Latest confirmed remote feature commit:

`7b25032` — `Expand Lore Card content editor`

## Do not rebuild

Do not rebuild the following unless a later change specifically requires it:

- Scenario Library;
- Scenario creation flow;
- Workspace routing;
- Scenario Overview;
- Story persistence;
- Story autosave;
- Fiction Lab Target Plan support;
- plan-aware Story limits;
- Lore Card loading;
- Lore Card creation;
- current Lore Card core editor.

## Next development task

Resume Lore Workspace development.

Recommended next sequence:

1. review current Lore editor state after the pause;
2. decide the next PRD-backed Lore Card fields/lifecycle feature;
3. continue in small isolated checkpoints;
4. add Lore-specific platform-limit handling when the relevant fields are implemented;
5. only move to another major Workspace after the planned Lore milestone is sufficiently complete.

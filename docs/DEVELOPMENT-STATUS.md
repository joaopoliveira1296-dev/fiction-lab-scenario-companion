# Development Status

## Current milestone

Real Story Workspace connected to SQLite persistence.

## Last confirmed working state

- Tauri app launches successfully.
- SQLite database initializes and migration 001 runs.
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
- get_scenario works.
- get_scenario_overview works.
- Scenario Overview displays real SQLite metrics:
  - Lore Card count.
  - Connection count.
  - VISUAL CANON count.

## Story Workspace

The real Story Workspace is now implemented for the three Scenario-level Fiction Lab text fields:

- Backstory / World Details.
- Greeting.
- Custom Scenario Instructions.

The existing scenarios table already contained:

- backstory
- greeting
- custom_instructions

No new migration was required.

## Story backend

The Tauri backend now provides:

- get_scenario_story
- update_scenario_backstory
- update_scenario_greeting
- update_scenario_custom_instructions

Story content is read from and written directly to SQLite.

Each update also refreshes scenarios.updated_at.

## Story frontend

ScenarioWorkspace.tsx now:

- loads Story data from SQLite;
- maintains local draft state for each Story field;
- provides editable textareas;
- saves each field explicitly;
- shows Saving... while a save is running;
- shows Saved after successful persistence;
- clears the Saved state when the user edits the field again;
- shows Could not save when persistence fails.

Story fields currently use individual Save buttons.

## Persistence tests completed

Backstory persistence was manually confirmed:

- text saved and remained after leaving and reopening the Scenario;
- edits made without pressing Save were not persisted;
- clearing the field and pressing Save persisted the empty value.

Greeting persistence was tested with the same workflow and passed.

Custom Scenario Instructions is implemented using the same persistence pattern.

## Current Workspace state

- Overview — functional and connected to SQLite metrics.
- Story — functional and persisted in SQLite.
- Lore — placeholder.
- Visuals — placeholder.
- Connections — placeholder.
- Exports — placeholder.

Do not rebuild the Scenario Library, Scenario creation flow, Workspace routing, Scenario Overview or basic Story persistence unless a later change specifically requires it.

## Next check

Run the application and confirm all three Story fields:

- display correctly;
- can be edited;
- can be saved;
- remain persisted after leaving and reopening the Scenario;
- preserve the previous persisted value when edits are abandoned without saving.

## If successful

Run:

git add .
git commit -m "Build persisted Story workspace"
git push

## Next development task

After the Story checkpoint is committed, review the Story Workspace for the next small UX/data-integrity improvement before beginning another major Workspace section.

## Story UX progress

The Story Workspace now:

- uses dedicated tabs for:
  - Backstory / World Details;
  - Greeting;
  - Custom Scenario Instructions;
- shows only one Story field as the primary editor at a time;
- autosaves each Story field after a short idle delay;
- keeps manual Save buttons available;
- shows Unsaved while local edits differ from the persisted value;
- shows Saved briefly after successful persistence;
- disables Save when no changes exist;
- displays live character counts for all three Story fields;
- persists Story content directly to SQLite.

---

## Fiction Lab Target Plan — implemented

PRD v3.1 introduces a per-Scenario Fiction Lab Target Plan.

Supported values:

- Free
- Plus
- Ultra

The selected plan is now persisted per Scenario and determines the Fiction Lab Story limits used by the application.

Implemented behaviour:

- existing Scenarios default conservatively to Free through migration;
- the selected plan persists in SQLite;
- changing plan recalculates Story limits immediately;
- changing plan never truncates, rewrites or deletes existing Scenario content;
- switching from a less restrictive plan to a more restrictive plan may leave existing content over-limit;
- over-limit content remains visible and preserved;
- future saves above the currently selected plan limit are rejected by the backend;
- reducing content back within the active limit allows persistence again.

## Plan-aware Story limits — implemented and tested

Verified Story limits currently used:

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

Implementation now includes:

- centralized Fiction Lab plan profiles;
- SQLite platform profiles and limits;
- plan-aware Story character counters;
- Unicode character counting aligned between frontend and backend;
- visual over-limit state;
- backend enforcement before SQLite updates;
- specific backend validation messages displayed in the Story UI.

Manual testing confirmed:

- Free rejects Story saves above its limits;
- Plus accepts Story content above Free limits when still within Plus limits;
- switching Plus → Free preserves existing over-limit content;
- no crash or data loss occurs when switching to a more restrictive plan;
- over-limit content remains visible and clearly marked;
- the last valid persisted value is preserved when a new save is rejected.

## Current Workspace state

- Overview — functional and connected to SQLite metrics.
- Story — functional, persisted, autosaving and plan-aware.
- Lore — placeholder.
- Visuals — placeholder.
- Connections — placeholder.
- Exports — placeholder.

Do not rebuild the Scenario Library, Scenario creation flow, Workspace routing, Scenario Overview, basic Story persistence or Fiction Lab Target Plan support unless a later change specifically requires it.

## Next development task

Review the Story Workspace for any remaining small UX/data-integrity cleanup, then begin the next planned major Workspace section from the PRD.

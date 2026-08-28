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

## Fiction Lab Target Plan decision

PRD v3.1 introduces a per-Scenario Fiction Lab Target Plan.

Supported values:

- Free
- Plus
- Ultra

The selected plan will determine which centralized Fiction Lab platform-limit profile is used for character-limit display and validation.

Rules:

- the plan is stored per Scenario;
- changing plan recalculates limits;
- changing plan must never truncate or rewrite stored Scenario content;
- Settings may later provide a default plan for newly created Scenarios;
- existing Scenarios should default conservatively to Free when the database field is introduced.

## Next development task

Add Fiction Lab Target Plan to Scenario persistence and introduce the centralized plan-aware platform-limit configuration before enforcing Story character limits.

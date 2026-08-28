# Fiction Lab Scenario Companion
## Project Definition & Requirements Document — v3.1 IMPLEMENTATION-READY

# Table of Contents

- [Implementation-Ready Baseline Note](#implementation-ready-baseline-note)
- [1. Project Summary](#1-project-summary)
- [2. Core Product Goal](#2-core-product-goal)
- [3. Product Principles](#3-product-principles)
- [4. Intended User](#4-intended-user)
- [4A. Companion-Only Boundary](#4a-companion-only-boundary)
- [5. Main Product Structure](#5-main-product-structure)
- [6. Scenario Model](#6-scenario-model)
- [6A. Main Details](#6a-main-details)
- [7. Lore Card Model](#7-lore-card-model)
- [8. Supported Lore Types](#8-supported-lore-types)
- [8A. Fiction Lab Weight Values](#8a-fiction-lab-weight-values)
- [9. CANON Lifecycle](#9-canon-lifecycle)
- [10. Character Count System](#10-character-count-system)
- [11. Linked Pieces Data Model](#11-linked-pieces-data-model)
- [12. Linked Pieces Interface](#12-linked-pieces-interface)
- [12A. Scenario-Level Status and Overview](#12a-scenario-level-status-and-overview)
- [13. Linked Pieces Connection Validation](#13-linked-pieces-connection-validation)
- [14. Connection Ledger](#14-connection-ledger)
- [14A. Story Editor UX v1](#14a-story-editor-ux-v1)
- [15. Lore Card Editor](#15-lore-card-editor)
- [16. Reader Mode](#16-reader-mode)
- [17. Lore List](#17-lore-list)
- [18. Search](#18-search)
- [18A. Fiction Lab Platform Limits](#18a-fiction-lab-platform-limits)
- [19. Filters](#19-filters)
- [20. Sorting](#20-sorting)
- [21. Visual CANON](#21-visual-canon)
- [22. Visual Prompt History](#22-visual-prompt-history)
- [23. Clipboard Utilities](#23-clipboard-utilities)
- [24. Single Card PDF Export](#24-single-card-pdf-export)
- [24A. Managed Scenario Storage](#24a-managed-scenario-storage)
- [25. Scenario Compendium PDF](#25-scenario-compendium-pdf)
- [26. PDF Export Profiles](#26-pdf-export-profiles)
- [27. Markdown Export](#27-markdown-export)
- [27A. Lore Card Creation, Editing and Lifecycle](#27a-lore-card-creation-editing-and-lifecycle)
- [28. Structured Backup Data](#28-structured-backup-data)
- [29. Restore](#29-restore)
- [30. Scenario Library Screen](#30-scenario-library-screen)
- [31. Scenario Workspace](#31-scenario-workspace)
- [31A. Connection Ledger v1](#31a-connection-ledger-v1)
- [32. Top-Level Navigation](#32-top-level-navigation)
- [32A. Visuals Workspace v1](#32a-visuals-workspace-v1)
- [33. Autosave](#33-autosave)
- [34. Editing Safety](#34-editing-safety)
- [34A. Exports Workspace v1](#34a-exports-workspace-v1)
- [35. Duplicate Card](#35-duplicate-card)
- [36. Pin Warnings](#36-pin-warnings)
- [37. Validation System](#37-validation-system)
- [38. Runtime Compression Support — Future Enhancement](#38-runtime-compression-support-future-enhancement)
- [39. Scenario Architect Documentation — Phase 2](#39-scenario-architect-documentation-phase-2)
- [40. Project Change Log Support — Phase 2](#40-project-change-log-support-phase-2)
- [41. Technical Architecture v1 — Finalized](#41-technical-architecture-v1-finalized)
- [41A. Backup Strategy](#41a-backup-strategy)
- [41B. Backup & Restore v1](#41b-backup-restore-v1)
- [42. Core Database Entities — v1](#42-core-database-entities-v1)
- [43. Data Integrity Rules](#43-data-integrity-rules)
- [44. Deleting a Card](#44-deleting-a-card)
- [45. Entering Existing Fiction Lab Content](#45-entering-existing-fiction-lab-content)
- [45A. Scenario Library](#45a-scenario-library)
- [46. Accessibility and Readability Requirements](#46-accessibility-and-readability-requirements)
- [46A. Modern Accessibility-First Desktop UI](#46a-modern-accessibility-first-desktop-ui)
- [46B. Scenario Workspace](#46b-scenario-workspace)
- [47. Theme](#47-theme)
- [47A. Settings v1](#47a-settings-v1)
- [48. MVP Scope](#48-mvp-scope)
- [48A. Feedback, Notifications & Error Handling v1](#48a-feedback-notifications-error-handling-v1)
- [49. Explicitly Out of MVP Scope](#49-explicitly-out-of-mvp-scope)
- [49A. Accessibility & Keyboard v1](#49a-accessibility-keyboard-v1)
- [50. Phase 2 Candidates](#50-phase-2-candidates)
- [50A. Design System v1](#50a-design-system-v1)
- [51. Phase 3 Candidates](#51-phase-3-candidates)
- [52. Primary User Workflows](#52-primary-user-workflows)
- [53. Acceptance Criteria for MVP](#53-acceptance-criteria-for-mvp)
- [53A. Edge Cases & Recovery Behaviour v1](#53a-edge-cases-recovery-behaviour-v1)
- [54. Main Risks](#54-main-risks)
- [55. Decision Register](#55-decision-register)
- [56. Finalized Implementation Decisions for v1](#56-finalized-implementation-decisions-for-v1)
- [57. Suggested Development Order](#57-suggested-development-order)
- [58. Definition of Done for Planning Phase](#58-definition-of-done-for-planning-phase)
- [59. Current Project Position](#59-current-project-position)
- [Appendix A — Official Fiction Lab Scenario Tags & Genres](#appendix-a-official-fiction-lab-scenario-tags-genres)

---

# Implementation-Ready Baseline Note

This v3.1 baseline incorporates the final consistency and redundancy audit plus the Fiction Lab plan-aware platform-limit requirement.

During the audit:

- legacy requirements superseded by later decisions were corrected or collapsed into canonical sections;
- direct Fiction Lab copy/export wording was removed;
- Scenario Status, Text Canon Status and Visual Canon Status were reconciled;
- Backup/Restore was normalized to the complete ZIP model;
- MVP, Phase 2 and Phase 3 scope were reconciled;
- primary workflows and MVP acceptance criteria were rewritten against the final architecture;
- SQLite was confirmed as the sole authoritative application data source;
- duplicate summary sections now point to their detailed canonical specifications where appropriate.

No implementation-blocking product decision remains open.

---

**Status:** DRAFT  
**Purpose:** Define the product, scope, data model, workflows, interface, export system and MVP before implementation begins.

---

# 1. Project Summary

The **Fiction Lab Scenario Companion** is a local desktop application designed to support the creation, maintenance, consultation and export of Fiction Lab scenario material.

### Canonical project name

**Fiction Lab Scenario Companion** is the approved CANON name of the application. Treat this name as fixed unless the user explicitly renames the project.

It is not intended to replace Fiction Lab itself.

Its purpose is to provide a structured working environment where scenario information can be stored outside long ChatGPT conversations and outside the Fiction Lab interface, while remaining compatible with the Fiction Lab Scenario Architect workflow.

The application should allow the user to:

- create and manage multiple scenarios;
- create, edit and review Lore Cards;
- preserve card metadata separately from runtime Content;
- track CANON state;
- manage directional Linked Pieces;
- associate visual CANON with cards;
- search and filter scenario material;
- export individual cards or complete scenarios;
- produce human-readable PDF documentation;
- produce LLM-friendly Markdown exports;
- create portable backups.

The application should reduce repeated copy/paste work and make it easier to send the current state of a scenario back to the Fiction Lab Scenario Architect.

---

# 2. Core Product Goal

The primary goal is:

> Maintain a reliable, readable and portable source of truth for Fiction Lab scenario development.

The application should make it possible to answer questions such as:

- What cards currently exist?
- Which cards are CANON CLOSED?
- Which cards are still DRAFT?
- How many characters does this card contain?
- Which cards are Pinned?
- Which cards link to which other cards?
- Is a connection outgoing or incoming?
- Which characters already have VISUAL CANON?
- What changed recently?
- Can I export the whole scenario and give it to the Scenario Architect without manually copying dozens of cards?

---

# 3. Product Principles

## 3.1 Clarity over visual complexity

The interface should reduce cognitive load.

Prefer:

- explicit labels;
- visible status;
- concrete wording;
- predictable navigation;
- clear separation between editable fields;
- confirmation for destructive actions;
- readable tables and lists;
- obvious distinction between outgoing and incoming Linked Pieces.

Avoid:

- hidden gestures;
- excessive icon-only controls;
- ambiguous visual metaphors;
- unnecessarily artistic UI;
- complicated animations;
- information-dense screens without hierarchy.

## 3.2 Fiction Lab compatibility

The application should mirror Fiction Lab concepts where useful, but should not pretend that internal application features are official Fiction Lab features.

Example:

**Official Fiction Lab Type:** Premise  
**Internal Category:** Conflict Matrix

Internal categories may improve organisation without altering the platform type.

## 3.3 Single Source of Truth

Each piece of information should have one authoritative stored value.

Example:

- card Title exists once;
- card Content exists once;
- Linked Piece direction is stored once as Origin → Destination;
- an incoming backlink is derived from that connection rather than stored as a second reverse connection.

## 3.4 Local-first

The first version should work entirely on the user's computer.

No account, cloud service or external server should be required for the MVP.

## 3.5 Exportability

The user must never be trapped inside the application.

The user must be able to take data out of the application through:

- PDF documentation export;
- Markdown documentation export;
- complete ZIP Backup containing versioned structured Scenario data and managed images.

---

# 4. Intended User

Primary user:

A Fiction Lab scenario creator who develops large, structured scenarios with ChatGPT and Fiction Lab and needs a stable external place to store, inspect and export the current scenario state.

The application is initially designed as a single-user tool.

Multi-user collaboration is outside MVP scope.

---

# 4A. Companion-Only Boundary

The Fiction Lab Scenario Companion is a **companion application only**.

It does not integrate directly with Fiction Lab and must not behave as a Fiction Lab client.

Out of scope:

- sending or publishing Scenario data to Fiction Lab;
- direct Fiction Lab export;
- automatic field population in Fiction Lab;
- Fiction Lab API integration;
- Fiction Lab account authentication;
- synchronization with Fiction Lab;
- browser automation for Fiction Lab;
- automatic creation or modification of Lore Cards on Fiction Lab;
- automatic creation or modification of Linked Pieces on Fiction Lab.

The application may mirror verified Fiction Lab field structures, labels and limits so the user's local project remains organized and compatible with their manual workflow.

PDF, Markdown and JSON outputs are Companion documentation/backup formats. They are not Fiction Lab transfer formats.

Clipboard utilities are generic local convenience features only and must not be framed as Fiction Lab integration.

---

# 5. Main Product Structure

The application is organised around:

1. **Scenario Library**
2. **Scenario Workspace**
3. **Lore Cards**
4. **Linked Pieces**
5. **Visual CANON**
6. **Search & Filters**
7. **Exports**
8. **Backup / Restore**

---

# 6. Scenario Model

Each Scenario should contain at minimum:

- Scenario ID
- Scenario Name
- Scenario Description
- Scenario Cover Image
- Scenario Tags & Genres
- Status
- Created At
- Updated At
- Notes
- Backstory / World Details
- Greeting
- Custom Scenario Instructions
- Fiction Lab Target Plan
- Lore Cards
- Connections
- export settings

`Main Details`, `Backstory / World Details`, `Greeting` and `Custom Scenario Instructions` are top-level Scenario fields, not Lore Cards.


## Fiction Lab Target Plan

Each Scenario stores a **Fiction Lab Target Plan** used to determine the applicable Fiction Lab platform limits.

Supported v1 values:

- `Free`
- `Plus`
- `Ultra`

Rules:

- the plan is selected manually by the user;
- the selected plan is stored per Scenario;
- changing the plan changes limit validation and character-limit displays, but never rewrites, truncates or deletes Scenario content;
- changing to a more restrictive plan may cause existing fields to become over-limit and should surface validation clearly;
- changing to a less restrictive plan should immediately recalculate the applicable limits;
- the plan represents the Scenario's intended Fiction Lab compatibility target, not the user's authenticated Fiction Lab subscription;
- the Companion does not log in to Fiction Lab or verify subscription ownership;
- existing Scenarios created before this field is introduced should receive a conservative `Free` default during migration and remain user-editable.

A separate Settings preference may define the default plan used when creating new Scenarios. That preference does not retroactively change existing Scenarios.

Scenario-level organisational statuses:

- `Draft`
- `In Development`
- `Ready for Review`
- `Complete`
- `Archived`

These statuses are manually controlled and are separate from Lore Card Text Canon Status and Visual Canon Status. See Section 12A for the canonical behaviour.

---

# 6A. Main Details

Main Details should mirror the useful structural fields from Fiction Lab without copying unrelated public/community features.

Required fields:

- **Scenario Name**
- **Scenario Description**
- **Scenario Cover Image**
- **Scenario Tags & Genres**

Do **not** include Bounty / Challenge Participation. The application is designed for private scenario development and this Fiction Lab publishing/community field is outside project scope.

## Scenario Tags & Genres

Scenario Tags & Genres use the official Fiction Lab controlled vocabulary.

Rules:

- preserve the official labels exactly;
- maximum **5** selected tags/genres per Scenario;
- multi-select;
- no custom Scenario Tags in v1;
- do not rename, merge or reinterpret the Fiction Lab taxonomy;
- store the controlled vocabulary in one maintainable configuration source rather than hardcoding it across multiple UI components.

The vocabulary is intentionally heterogeneous: it includes genre, setting, POV, relationship dynamics, tone, character type, structure and other scenario descriptors. The Companion must preserve the platform labels rather than attempting to normalise the taxonomy.

Current captured official list: **232 unique labels**. See Appendix A.

---

# 7. Lore Card Model

Each Lore Card distinguishes official Fiction Lab-compatible content from Companion-only workflow metadata.

## 7.1 Fiction Lab-compatible fields

- Type
- Title
- Description
- Content
- Weight
- Pinned
- Triggers
- Linked Pieces / directional Connection representation
- Traits — Character only

## 7.2 Companion-only fields

- Card ID
- Internal Category
- Text Canon Status
- Visual Canon Status
- Notes
- Created At
- Updated At
- local Character Count
- optional Verified Fiction Lab Count
- Creation Prompt
- ordered Refinement Prompts
- managed active/final image
- archived prior images
- optional revision/source notes

Creation/Refinement Prompts and managed images belong to the Companion visual workflow; they are not treated as official Lore Card fields.

Companion-only metadata appears in local documentation exports only when the selected export profile includes it.

---

# 8. Supported Lore Types

Official Fiction Lab types currently represented:

- Character
- Location
- Premise
- Faction
- Item
- Race
- Rule

The application provides a fixed **Internal Category** controlled list:

- World Premise
- Conflict Matrix
- Routine / Schedule
- Wardrobe
- Relationship
- Arc
- Visual Notes
- Professional Procedures
- Other

Rules:
- no custom Internal Categories in v1;
- Internal Category is application-only metadata;
- Internal Category never replaces the official Fiction Lab Type;
- `Other` is the fallback category when no predefined category fits.

---

# 8A. Fiction Lab Weight Values

Weight uses the official Fiction Lab controlled values exactly as shown in the current interface:

- **Minor**
- **Supplementary**
- **Standard**
- **Important**
- **Critical**

Rules:

- no custom Weight values in v1;
- preserve the official labels exactly;
- `Standard` is the normal/default Lore weight;
- store Weight as a controlled value rather than arbitrary text;
- if Fiction Lab changes the available values later, update the central configuration source rather than changing UI logic in multiple places.

---

# 9. CANON Lifecycle

Lore Card text and visual state are separate axes.

## Text Canon Status

- **OPEN** — deliberately undefined or incomplete.
- **DRAFT** — being developed.
- **READY FOR PLATFORM CHECK** — conceptually ready for the user's manual Fiction Lab verification.
- **CANON CLOSED** — platform check/runtime review completed and final text approved.

## Visual Canon Status

- **NOT STARTED**
- **IN PROGRESS**
- **VISUAL CANON**

Example:

**Text:** CANON CLOSED  
**Visual:** VISUAL CANON

A visual state never replaces the text state. Detailed transition rules are defined in Section 27A.

---

# 10. Character Count System

The editor should display live character counts.

At minimum:

- Title count
- Description count
- Content count

Where known and applicable to a Fiction Lab-compatible field, display Fiction Lab limits.

Example:

`Title: 24 / 35`

`Description: 163 / 200`

`Content: 2,742`

The application count is a working tool.

The real Fiction Lab interface remains the final authority for platform validation.

The application should therefore support an optional field:

**Verified Fiction Lab Count**

Example:

Application count: 2,742  
Verified Fiction Lab count: 2,739

This allows differences to be recorded rather than ignored.

---

# 11. Linked Pieces Data Model

Linked Pieces must be stored directionally.

Canonical internal representation:

`ORIGIN_CARD_ID → DESTINATION_CARD_ID`

Example:

`Evelyn Millard → João Millard`

Do not store the incoming backlink as a second connection.

If:

`Evelyn → João`

exists, then João's interface should derive:

**Incoming from:** Evelyn Millard

The application must distinguish:

- RELATIONSHIP
- OUTGOING CONNECTION
- INCOMING BACKLINK

These are not the same concept.

---

# 12. Linked Pieces Interface

Inside a card, show two separate areas:

## Outgoing Linked Pieces

Connections manually originating from the current card.

Example:

**Outgoing**
- João Millard
- Millard Estate

## Incoming Linked Pieces

Automatically derived backlinks.

Example:

**Incoming**
- Evelyn Millard

Incoming links must not be editable as if they were new outgoing links.

The user should not be able to accidentally create the reverse connection for an already connected pair.

---

# 12A. Scenario-Level Status and Overview

Scenario-level status is an organizational state for the Scenario as a whole.

It is separate from Lore Card Text Canon Status and Visual Canon Status.

Supported v1 Scenario statuses:

- `Draft`
- `In Development`
- `Ready for Review`
- `Complete`
- `Archived`

## Status semantics

### Draft
The Scenario exists but remains early or structurally incomplete.

### In Development
Active scenario-building work is underway.

### Ready for Review
The Scenario is considered ready for a broader review pass.

### Complete
The Scenario is considered complete by the user.

### Archived
The Scenario is retained for reference but is not currently active.

Archived is an organizational state and is not equivalent to Trash.

## Manual status control

Scenario Status is set manually by the user.

The application must not automatically change Scenario Status based on Lore Card counts, CANON states, visual progress or validation results.

The Companion may offer a non-blocking suggestion such as:

`Most Lore Cards are CANON CLOSED. Consider moving this Scenario to Ready for Review.`

Such suggestions never change state automatically.

Marking a Scenario `Complete` does not lock it.

If the user later edits it, the application may surface a reminder that the Scenario is marked Complete, but should not silently change the status.

Archived Scenarios remain:

- searchable;
- viewable;
- exportable;
- restorable to an active organizational status.

## Overview purpose

Overview is a concise resume-and-review surface.

It should answer:

- What Scenario is this?
- What is its current overall status?
- What needs attention?
- What was edited recently?
- Where should the user continue?

Avoid generic dashboard clutter or decorative metrics.

## Overview header

Recommended header content:

- Scenario Cover Image;
- Scenario Name;
- Scenario Status;
- short Scenario Description;
- last edited information.

Recommended primary actions:

- Continue Editing;
- Open Lore;
- Export.

Less frequent actions belong in a contextual menu.

## Progress summary

Do not show a single artificial completion percentage.

Use concrete state counts instead.

Recommended summary:

### Lore Cards
- total count.

### Text progress
- CANON CLOSED;
- READY FOR PLATFORM CHECK;
- DRAFT;
- OPEN.

### Visual progress
- VISUAL CANON;
- IN PROGRESS;
- NOT STARTED.

These counts describe state without pretending all cards or workflow steps have equal weight.

## Needs Attention

`Needs Attention` is a primary Overview section.

Items must be concrete and actionable.

Examples:

- Lore Cards exceeding verified hard limits;
- Lore Cards exceeding operational targets;
- affected Connections;
- missing managed images;
- visuals still IN PROGRESS;
- invalid controlled values;
- broken file references.

Each item should link directly to the relevant context where practical.

Avoid vague messages such as `Something needs attention`.

## Recently Edited

Show a short list of recently modified items to help the user resume work.

Possible entries:

- Lore Cards;
- Backstory / World Details;
- Greeting;
- Custom Scenario Instructions;
- Connections;
- visual records.

Each item should display:

- title / field name;
- relevant type where useful;
- last edited time.

Keep the list intentionally short.

## Scenario Details

A compact details area may show:

- Tags & Genres;
- created date;
- updated date;
- Lore Card count;
- Connection count;
- VISUAL CANON image count;
- current Scenario Status.

Do not expose internal IDs or low-value technical metadata in the normal Overview.

## Quick Actions

Recommended actions:

- Continue Editing;
- New Lore Card;
- Review Connections;
- Open Visuals;
- Export Scenario.

Avoid filling Overview with a large button grid.

## Canonical v1 principles

- **Scenario Status is manual and organizational.**
- **Scenario Status is independent from Lore Card CANON states.**
- **Overview shows state and actionable context, not decorative analytics.**
- **No fake single completion percentage.**
- **Needs Attention is concrete and directly navigable.**
- **Recently Edited supports easy work resumption.**
- **Complete does not lock editing.**
- **Archived is not Trash.**

---

# 13. Linked Pieces Connection Validation

Before creating a connection:

1. Check whether the pair is already connected.
2. Check either direction.
3. If A → B already exists, block B → A.
4. Show the existing direction.
5. Require Origin and Destination to be explicit.

Example warning:

> Evelyn Millard → João Millard already exists.  
> João Millard → Evelyn Millard cannot be added as a reverse duplicate.

---

# 14. Connection Ledger

Each Scenario includes a directional Connection Ledger.

Canonical v1 statuses:

- `Active`
- `Deferred`
- `Affected`
- `Inactive`

Each row represents one stored `Origin → Destination` Connection.

Incoming backlinks are derived views of those same records and are never duplicated as separate rows.

The Ledger supports search/filtering by Origin, Destination and Status.

`Reason / Retrieval Purpose` may be stored to preserve why a direction exists.

Section 31A is the canonical detailed Connection Ledger specification.

---

# 14A. Story Editor UX v1

The Story workspace contains three dedicated top-level Scenario fields:

- Backstory / World Details
- Greeting
- Custom Scenario Instructions

All three should use the same focused plain-text editor architecture so behaviour remains predictable and consistent.

## Navigation

Use clear Story tabs or equivalent section switching:

- Backstory / World Details
- Greeting
- Custom Scenario Instructions

Only one field should dominate the main workspace at a time.

## Editor structure

Each field should provide:

- Edit Mode;
- Reader Mode;
- Focus Mode;
- visible character count;
- visible save state;
- validation;
- local count;
- optional manually recorded Verified Fiction Lab Count.

The editor should occupy most of the available content width.

## Focus Mode

Focus Mode reduces visual noise without forcing operating-system fullscreen.

When active:

- collapse or hide the primary sidebar;
- hide non-essential workspace chrome;
- keep the editor centred;
- keep character count visible;
- keep save state visible;
- preserve access to Exit Focus;
- allow `Esc` to leave Focus Mode when appropriate.

## Reader Mode

Reader Mode presents the current field as a clean document rather than a disabled input.

Use:

- controlled line width;
- readable line spacing;
- clear paragraph spacing;
- strong but calm hierarchy.

Reader Mode should be especially comfortable for long Backstory content.

## Character counts and hard limits

Character count remains visible while editing.

Hard Fiction Lab limits come from the centralized platform profile for the Scenario's selected Fiction Lab Target Plan.

Example:

`9,742 / 10,000`
`258 characters remaining`

When over a verified hard limit:

`10,184 / 10,000`
`184 characters over the Fiction Lab limit`

Never rely on colour alone to communicate overflow.

## Operational guidance

Operational recommendations must remain visually separate from platform hard limits.

Example:

`Guidance: Consider whether this section can be made more concise.`

Guidance must never be labelled as a Fiction Lab platform error.

## Local versus verified Fiction Lab count

Where needed, support:

- Local Count;
- Verified Fiction Lab Count;
- Difference.

The Fiction Lab interface count remains authoritative.

Example:

```text
Local Count
9,998

Verified Fiction Lab Count
10,001

Difference
+3
```

## Autosave

Autosave should be quiet and non-disruptive.

Use persistent state text rather than repeated success toasts:

- `Saving...`
- `Saved`
- `Save failed — Retry`

Do not generate a toast for every successful autosave.

## Undo and Redo

Undo/Redo are required.

Recommended shortcuts:

- `Ctrl + Z` — Undo
- `Ctrl + Y` or `Ctrl + Shift + Z` — Redo

Autosave must not clear the active undo/redo history unnecessarily.

## Search

`Ctrl + F` searches within the current Story field.

`Ctrl + Shift + F` remains Scenario-wide search.

## Plain-text editing

v1 does not use a rich-text/WYSIWYG editor.

Do not provide:

- font controls;
- text colours;
- alignment tools;
- rich heading styles;
- WYSIWYG bullets;
- embedded formatting toolbars.

The content is plain text.

If Markdown syntax is typed manually, preserve it as plain text.

## Paste behaviour

Paste should preserve:

- paragraphs;
- line breaks;
- normal Unicode text.

Rich formatting from sources such as Word or web pages should be stripped so the editor receives clean plain text.

## Keyboard behaviour

`Tab` should preserve normal accessible focus navigation rather than unexpectedly inserting tab characters into content.

Any future indentation behaviour should require an explicit interaction design.

## Validation

The Story workspace may surface a compact issue summary.

Examples:

- field exceeds verified hard limit;
- required field is empty where the product later defines such a requirement;
- manually recorded platform count conflicts materially with local count.

Issues should navigate directly to the relevant field when practical.

## Save-failure navigation protection

If save fails and leaving the field could lose work, block destructive navigation with a clear explanation.

Recommended actions:

- Retry;
- Stay Here.

Do not default to an easy destructive `Discard` option.

## Story field lifecycle

v1 does not introduce separate CANON lifecycle states for Backstory, Greeting or Custom Scenario Instructions.

Use:

- Scenario-level Status;
- validation state;
- last updated information;
- optional platform verification data.

Avoid unnecessary additional status systems.

## Empty states

An empty Story field may show a simple starting prompt such as:

`No Greeting yet`
`Add the opening message for this Scenario.`

Provide one clear `Start Writing` action where helpful.

Avoid wizard-like behaviour.

## Shared editor component

All three Story fields should use the same reusable long-text editor component.

Conceptual configuration may include:

```text
LongTextFieldEditor
- title
- hardLimit
- localCount
- verifiedCount
- readerMode
- focusMode
- validation
- saveState
```

This reduces implementation inconsistency and keeps UX predictable.

## Canonical v1 principles

- **Backstory, Greeting and Custom Scenario Instructions share the same editor architecture.**
- **Edit, Reader and Focus modes are supported.**
- **Character count and save state remain visible.**
- **Hard limits and operational guidance remain separate.**
- **Paste strips rich formatting and preserves clean plain text.**
- **Undo/Redo survives normal autosave behaviour.**
- **No rich-text editor in v1.**
- **No separate Story-field CANON lifecycle in v1.**

---

# 15. Lore Card Editor

The editor should use explicit sections.

Suggested layout:

## Primary Fields
- Type
- Internal Category
- Title
- Description

## Content
- Content editor
- live character count

## Retrieval
- Weight
- Pinned
- Triggers

## Linked Pieces
- outgoing list
- incoming list
- add connection control

## Character Metadata
Visible only when Type = Character:
- Traits

## Visual
- Creation Prompt
- Refinement Prompts
- Final VISUAL CANON Image
- Visual Status

## Internal
- Text Canon Status
- Visual Canon Status
- Notes
- Revision note

---

# 16. Reader Mode

Every Lore Card has a non-editing Reader Mode.

Reader Mode may display:

- final image, when available;
- Title;
- Description;
- Type;
- Internal Category;
- Content;
- Weight;
- Pinned;
- Triggers;
- outgoing Connections;
- incoming backlinks;
- Traits where relevant;
- Text Canon Status;
- Visual Canon Status;
- visual prompt history when the current context/profile calls for it.

Reader Mode prioritises readability over editing controls.

---

# 17. Lore List

The Lore workspace provides a Card view and Compact List view.

It is not a permanently visible global card sidebar.

Each Lore entry should expose useful scan information such as:

- Title;
- Type;
- Internal Category where useful;
- Text Canon Status;
- Visual Canon Status or image indicator where useful;
- Weight;
- Pinned state;
- last modified information;
- optional Content character count;
- optional outgoing Connection count.

The list follows the persistent manual Lore display order unless the user applies an explicit temporary sort.

---

# 18. Search

Scenario-wide search should search at minimum:

- Scenario Name and Description;
- Story fields;
- Lore Title, Description and Content;
- Triggers;
- Notes;
- Visual Prompt text;
- Connection Reason.

Search results should identify where the match occurred.

Example:

**Gabriel Fournier — Character**  
Match in Title

**Millard Estate Overnight Routine — Premise**  
Match in Content

---

# 18A. Fiction Lab Platform Limits

Fiction Lab platform limits must be stored in one centralized platform configuration system rather than scattered or duplicated across UI code.

The centralized configuration is **plan-aware**.

Supported Fiction Lab Target Plans:

- `Free`
- `Plus`
- `Ultra`

Each plan has its own platform-limit profile. Validation and character-limit displays use the profile that matches the current Scenario's selected Fiction Lab Target Plan.

Canonical behaviour:

```text
Scenario
└── fictionLabPlan: Free | Plus | Ultra
        ↓
Central Platform Configuration
        ↓
Plan-specific limits
        ↓
Character counts / remaining count / validation
```

Rules:

- current verified Fiction Lab interface/documentation values are the defaults for each plan;
- exact plan-specific limits are maintained in one central configuration source;
- UI components must not hardcode plan-specific numeric limits;
- hard platform limits and internal operational recommendations are separate concepts;
- hard limits represent values enforced by Fiction Lab for the selected plan;
- operational targets represent Scenario Architect guidance and must never be presented as Fiction Lab hard limits;
- if Fiction Lab changes a limit, the value should be updateable in one central configuration source;
- validation throughout the application reads from the selected plan profile;
- switching plan recalculates validation immediately;
- switching plan never truncates or rewrites stored text;
- if a field exceeds the newly selected plan limit, preserve the text and show an explicit over-limit state;
- Fiction Lab remains the final authority for live platform validation.

Example configuration shape:

```text
PlatformProfile
- Free
  - Scenario Name
  - Scenario Description
  - Backstory / World Details
  - Greeting
  - Custom Scenario Instructions
  - Lore limits
  - other verified limits

- Plus
  - same keys with Plus-specific values

- Ultra
  - same keys with Ultra-specific values
```

Example categories include:

- Scenario Name limit;
- Scenario Description limit;
- Scenario Tags maximum;
- Backstory / World Details limit;
- Greeting limit;
- Custom Scenario Instructions limit;
- Lore field limits;
- pin limits where applicable.

Official reference for tier behaviour and current plan differences:

`https://fictionlab.gitbook.io/fictionlab/site-information/fictionlab-tiers`

The UI does not need to expose every platform limit as an unrestricted user-editable setting. The architectural requirement is centralized, plan-aware configurability and clean separation from operational guidance.

---

# 19. Filters

Recommended filters:

- Type
- Internal Category
- Text Canon Status
- Visual Canon Status
- Weight
- Pinned
- Has Image
- Has Prompt
- Has Outgoing Connections
- Has Incoming Connections
- Recently Modified

Multiple filters should be combinable.

---

# 20. Sorting

Recommended sorting:

- Title A–Z
- Title Z–A
- Recently Updated
- Oldest Updated
- Type
- Text Canon Status
- Visual Canon Status
- Weight
- Character Count

---

# 21. Visual CANON

Cards may participate in the Companion visual workflow.

Minimum v1 visual features:

- zero or one Creation Prompt;
- zero or more ordered Refinement Prompts;
- one active managed image at most;
- explicit VISUAL CANON approval;
- replacement/archive handling;
- preview and Reader Mode display;
- inclusion in eligible local documentation exports.

The application **must not generate images**.

Image generation remains external. The Companion stores prompt lineage and managed image assets only.

Section 32A is the canonical detailed Visuals Workspace specification.

---

# 22. Visual Prompt History

The application should store the prompt history used to create the final visual.

For each card, support:

- **Creation Prompt** — the original standalone prompt used to create the image;
- **Refinement Prompt 1..N** — each refinement prompt, stored in sequence;
- optional notes per prompt;
- created timestamp;
- final VISUAL CANON image.

Generation itself is always external.

The application should make the visual lineage readable as:

`Creation Prompt → Refinement 1 → Refinement 2 → ... → VISUAL CANON`

The MVP does not need to store every intermediate generated image. It stores the active managed image and automatically archived prior active images created through replacement; arbitrary intermediate generator outputs are not required.


# 23. Clipboard Utilities

The Companion may provide normal local clipboard actions for convenience.

Useful actions include:

- Copy Title;
- Copy Description;
- Copy Content;
- Copy Traits;
- Copy prompt text;
- Copy a readable card summary;
- Copy a readable Connection summary.

These are generic clipboard utilities only.

They must not be presented as Fiction Lab export, synchronization, automated field population or platform integration.

No special Fiction Lab transfer format exists in v1.

---

# 24. Single Card PDF Export

The user may export one Lore Card as a local readable PDF.

Configurable contents may include:

- Title;
- final image;
- Description;
- Content;
- Type;
- Internal Category;
- Weight;
- Pinned;
- Triggers;
- outgoing Connections;
- incoming backlinks;
- Traits;
- Creation/Refinement Prompt history;
- Text Canon Status;
- Visual Canon Status;
- optional Notes.

The default PDF should be clean and readable and should follow the Companion Design System rather than imitate Fiction Lab.

---

# 24A. Managed Scenario Storage

The Fiction Lab Scenario Companion manages scenario assets inside a predictable scenario folder structure.

Canonical structure:

```text
Fiction Lab Scenario Companion/
└── scenarios/
    └── Scenario Name/
        ├── images/
        │   └── archive/
        ├── exports/
        │   ├── pdf/
        │   └── markdown/
        ├── backups/
        │   └── safety/
        └── scenario.json
```

Rules:

- `images/` stores active managed images and `images/archive/` preserves replaced managed images;
- importing a final image copies it into the scenario-managed `images/` folder;
- the original source file is never moved or deleted;
- internal references should use the managed copy so scenarios remain portable;
- `exports/pdf/` stores PDF outputs;
- `exports/markdown/` stores Markdown outputs;
- `backups/` stores manually created backup archives;
- exported documents are outputs, not the source of truth;
- scenario data remains structured in the application/database;
- renaming a scenario must not break image references or exports;
- each Scenario keeps a stable internal `scenarioId` independent of its display name.

Image naming should be predictable and collision-resistant, preferably based on a slug and/or stable card identifier rather than a generic `image.png`.

---

# 25. Scenario Compendium PDF

The whole Scenario may be exported as a local PDF using the profiles defined in Section 34A.

The export uses the Scenario's persistent Lore display order and may include:

- Cover and Main Details;
- Story;
- Lore Cards;
- Connection Ledger;
- visual material;
- optional appendices according to the chosen profile.

Images preserve aspect ratio, and cards use clear section boundaries.

Section 34A is authoritative for profile contents and export behaviour.

---

# 26. PDF Export Profiles

The v1 documentation profiles are fixed:

- **Scenario Architect Review**
- **Full Documentation**
- **Human Review**

PDF availability and default inclusions follow Section 34A.

Profile customization is secondary and does not create new permanent profile types.

---

# 27. Markdown Export

The Companion exports deterministic UTF-8 Markdown as local documentation.

Primary uses:

- Scenario Architect / LLM review;
- archival;
- Git/version-control compatibility;
- human inspection.

Markdown uses clear headings, explicit field labels, stable Lore ordering, explicit Connection direction and ordered visual prompt history according to the selected profile.

Scenario Architect Review may optionally use `Package with Images`, producing a ZIP containing the Markdown document plus referenced VISUAL CANON images.

Markdown Import is out of scope for v1.

Section 34A is authoritative for export profiles and customization.

---

# 27A. Lore Card Creation, Editing and Lifecycle

Lore Card creation should begin with only the minimum required information and progressively reveal the rest of the workflow.

## Create Lore Card

`+ New Lore Card` opens a short focused creation dialog.

Initial fields:

- Fiction Lab Type;
- Title;
- Internal Category;
- Weight.

The user should not be forced to complete Description, Content, Traits, Visual, Connections or other advanced data before creating the card.

After creation, open the Lore Card directly in the editor.

## Official Fiction Lab Types

Supported Types:

- Character
- Location
- Premise
- Faction
- Item
- Race
- Rule

The editor adapts to Type.

Character-only fields such as Traits must not appear for non-Character cards.

## Lore Card editor structure

Recommended tabs:

- **Content**
- **Visual**
- **Connections**
- **Details**

A breadcrumb should keep location clear, for example:

`Lore › Characters › Evelyn Millard`

The header should show at minimum:

- Title;
- Type;
- current Text Canon Status;
- current Visual Canon Status where relevant.

## Content

Content contains the official Fiction Lab card fields:

- Title;
- Description;
- Content;
- Traits when Type = Character.

The UI should distinguish official Fiction Lab fields from Companion-only metadata.

Character counters should be shown adjacent to fields where useful.

## Character counting

The Companion may calculate a local character count immediately.

Where needed, it also supports an optional manually recorded `Verified Fiction Lab Count`.

Rules:

- local count is advisory;
- the Fiction Lab interface count is authoritative;
- if both values exist and differ, show the difference clearly;
- never present the local count as overriding the platform count.

## Canon states

Text and Visual lifecycle states are separate.

### Text Canon Status

- OPEN
- DRAFT
- READY FOR PLATFORM CHECK
- CANON CLOSED

### Visual Canon Status

- NOT STARTED
- IN PROGRESS
- VISUAL CANON

A card may be `CANON CLOSED` for text while remaining `IN PROGRESS` visually.

## Platform Check

A card may move to `READY FOR PLATFORM CHECK` when the text appears ready for Fiction Lab verification.

A local `Record Platform Check` action may let the user manually record observations from their own Fiction Lab check:

- verified Fiction Lab character count;
- whether Fiction Lab accepted the content;
- optional verification notes.

A manually recorded successful platform check may support subsequent transition to `CANON CLOSED`. The Companion does not perform the check itself.

This separates “appears ready” from “verified in Fiction Lab”.

## Editing a CANON CLOSED card

CANON CLOSED is not a permanent lock.

If the user edits an official Fiction Lab content field on a CANON CLOSED card:

- automatically reopen Text Canon Status to `DRAFT`;
- record that canon was reopened due to content modification.

Companion-only metadata changes do not reopen Text Canon Status.

Do not add extra lifecycle states such as `CANON MODIFIED` unless a future requirement proves them necessary.

## Visual workflow

The application never generates images.

The Visual tab stores:

- one Creation Prompt;
- zero or more ordered Refinement Prompts;
- final approved VISUAL CANON image.

Adding an image does not automatically set `VISUAL CANON`.

The user must explicitly mark the image as VISUAL CANON.

When an image is added:

1. copy it into the Scenario-managed `images/` folder;
2. preserve the original source file;
3. display a preview;
4. keep Visual Status as `IN PROGRESS` until explicitly approved.

## Connections within a Lore Card

The Connections tab must separate:

### Outgoing
Connections where the current card is Origin.

### Incoming
Backlinks where the current card is Destination.

Incoming backlinks are informative and must not be misrepresented as outgoing links.

Creating a connection requires explicit:

- Origin;
- Destination;
- Status;
- optional Reason / retrieval purpose.

If the pair is already connected in the reverse direction, the app must block creation of a mirrored pair and explain the existing direction.

Linked Pieces remain progressive architecture and may be added whenever enough context exists; they are not restricted to a final linking phase.

## Details

Details contains operational metadata such as:

- Type;
- Weight;
- Pinned;
- Internal Category;
- Text Canon Status;
- Visual Canon Status;
- character counts;
- created timestamp;
- updated timestamp;
- platform verification information.

## Pin guidance

Pinned Lore Cards use Fiction Lab platform capability plus Companion operational guidance.

Rules:

- verified hard platform limits are enforced;
- operational recommendations are warnings, not hard blocks;
- if the user exceeds the recommended ≤5 pinned cards, show a clear performance warning;
- do not present the warning as a Fiction Lab hard-limit error;
- if the platform hard maximum is reached, prevent additional pins.

## Traits

Character Traits use only the official Fiction Lab controlled list.

Rules:

- maximum 10;
- no custom Traits;
- searchable selector;
- once 10 are selected, further additions are blocked until one is removed.

## Validation

Validation should distinguish:

### Errors
Hard platform violations or structurally invalid states that must be corrected.

### Warnings
Supported configurations that may reduce performance or deserve attention.

### Passed checks
Useful confirmations where appropriate.

Errors and warnings must not look semantically identical.

## Copy and Clipboard Utilities

The Companion may provide normal clipboard utilities for the user's convenience, such as copying an individual field or a formatted card summary.

These are generic clipboard actions only.

The application must not present them as documentation export, Fiction Lab transfer, Fiction Lab synchronization or automated platform-entry functionality.

The Companion does not send data to Fiction Lab.


## Reader Mode

Reader Mode presents a clean document-style representation rather than disabled form fields.

It may include:

- Title;
- Type;
- Weight;
- Text Canon Status;
- Description;
- Content;
- Traits;
- VISUAL CANON image;
- Linked Pieces.

## Duplicate Lore Card

Duplicating a Lore Card copies reusable content/structure and useful metadata, but must not create false architectural or visual state.

Do not copy:

- Linked Pieces;
- final VISUAL CANON image;
- VISUAL CANON status.

A duplicated card starts with:

- Text Canon Status: `DRAFT`;
- Visual Canon Status: `NOT STARTED`;
- no Connections.

Any copied content is treated as a new draft requiring independent validation.

## Lore Card Trash and Restore

Deleting a Lore Card moves it to internal Trash first.

Associated Connections must not be silently destroyed.

While the card is in Trash:

- associated Connections remain preserved;
- they are marked inactive/affected for runtime purposes;
- validation may surface them as depending on a trashed card.

Restoring the card restores the preserved relationship state where still valid.

Permanent deletion requires explicit confirmation and must clearly explain the effect on associated Connections.

## Lifecycle summary

```text
NEW CARD
   ↓
DRAFT
   ↓
WRITE / REFINE CONTENT
   ↓
VALIDATE
   ↓
READY FOR PLATFORM CHECK
   ↓
VERIFY IN FICTION LAB
   ↓
CANON CLOSED

Visual lifecycle may proceed independently:

NOT STARTED
   ↓
CREATION PROMPT
   ↓
REFINEMENT PROMPTS
   ↓
FINAL IMAGE
   ↓
VISUAL CANON
```

Connections may be evaluated and added progressively throughout development.

---

# 28. Structured Backup Data

A v1 backup is a complete ZIP archive, not a standalone JSON export.

Inside the ZIP, `scenario.json` contains the versioned structured reconstruction data for the Scenario.

The backup package also includes:

- `metadata.json`;
- active managed images;
- archived managed images.

The structured schema has its own `backupFormatVersion` and must not be treated as a raw SQLite database dump.

Section 41B is authoritative for Backup & Restore behaviour.

---

# 29. Restore

Restore accepts a compatible Companion backup ZIP.

Before modifying local Scenario data, the Companion validates the package and detects identity conflicts.

For the same `scenarioId`, v1 offers:

- Restore as Copy;
- Replace Existing Scenario;
- Cancel.

There is no Merge in v1.

Replace Existing creates the mandatory pre-restore safety snapshot defined in Section 41B.

Markdown/JSON document import is not part of this workflow.

---

# 30. Scenario Library Screen

The Scenario Library is the dedicated application home screen.

It supports:

- Grid default and optional List view;
- immediate search;
- simple filters and sorting;
- Favourite;
- New Scenario;
- contextual actions;
- Scenario Trash.

Section 45A is the canonical detailed Library specification.

---

# 31. Scenario Workspace

The Scenario Workspace is the primary editing environment.

Top-level destinations:

- Overview
- Story
- Lore
- Visuals
- Connections
- Exports

The main workspace shows one principal task/context at a time; secondary metadata is contextual.

Section 46B is the canonical detailed Workspace specification.

---

# 31A. Connection Ledger v1

The Connection Ledger is an internal Companion tool for managing directional Lore Card architecture.

It does not export, synchronize or apply Linked Pieces to Fiction Lab.

## Core rule

For the same pair of Lore Cards, only one Connection may exist, regardless of direction.

If `A → B` exists, the application must block both:

- another `A → B`;
- `B → A`.

This should be enforced in both UI validation and the data layer.

## Connection data model

```text
Connection
- id
- scenarioId
- originCardId
- destinationCardId
- status
- reason
- previousStatus
- createdAt
- updatedAt
```

## Status values

Supported v1 statuses:

- `Active`
- `Deferred`
- `Affected`
- `Inactive`

Meaning:

- **Active** — currently valid connection.
- **Deferred** — considered but not currently active.
- **Affected** — temporarily compromised by another structural state, such as a related Lore Card being in Trash.
- **Inactive** — deliberately disabled but preserved locally.

Avoid adding more states unless a concrete workflow requires them.

## Global Ledger view

The primary Connections view is a readable table/list.

Recommended columns:

- Origin;
- Destination;
- Status;
- Updated.

Primary controls:

- Search;
- Filters;
- `+ Add Connection`.

A graph is not the default representation.

## Card-level Connections view

Within a Lore Card, Connections must be split into:

### Outgoing
Connections where the current card is Origin.

### Incoming
Connections where the current card is Destination.

Incoming and Outgoing are two views of the same Connection record, not separate links.

Helpful UI explanation:

- **Outgoing:** cards this Lore Card points to as contextual destinations.
- **Incoming:** cards that point to this Lore Card.

## Creating a Connection

Creation requires:

- Origin;
- Destination;
- Status;
- optional Reason / Retrieval Purpose.

The Reason should be encouraged because it explains why the direction exists and remains useful when revisiting the Scenario later.

## Defensive destination selection

After Origin is selected, Destination choices should exclude:

- the Origin itself;
- cards already connected to the Origin in either direction;
- cards currently in Trash.

## Reverse Direction

Do not allow casual direction changes by directly editing both card selectors.

Use an explicit `Reverse Direction` action.

Before confirmation, show:

- current direction;
- proposed new direction.

Reversal must be deliberate and clearly explained.

## Trash behaviour

When a related Lore Card moves to Trash:

- affected active Connections change to `Affected`;
- record which endpoint is unavailable;
- preserve the prior status in `previousStatus`.

When the Lore Card is restored:

- the Connection may return to its previous status when still structurally valid.

Trash must never silently destroy Connection architecture.

## Permanent deletion

Before permanent deletion of a Lore Card, show every associated Connection and explicitly state that permanent deletion will remove those Connections.

Permanent removal requires confirmation.

## Validation

### Errors

Examples:

- Origin and Destination are the same card.
- The pair is already connected.
- An endpoint no longer exists.
- The Connection is structurally invalid.

### Warnings

Examples:

- a Connection references a card still in `OPEN`;
- a Connection is `Affected`;
- a Lore Card has unusually high outgoing connection density.

Warnings are Companion guidance and must not be represented as Fiction Lab hard limits.

## Connection density

The UI may show counts such as:

`Outgoing: 8 · Incoming: 3`

High density may trigger a review warning, but the Companion must not invent a technical maximum where none has been verified.

## Search

Search should cover:

- Origin title;
- Destination title;
- Reason.

## Filters

Useful filters:

- Active;
- Deferred;
- Affected;
- Inactive;
- Origin Type;
- Destination Type;
- Lore Card;
- Internal Category.

## Sorting

Recommended v1 sorting:

- Recently Updated;
- Origin A–Z;
- Destination A–Z;
- Status.

## Minimal history

The MVP does not require full version control.

Important Connection events should still be recordable, including:

- creation;
- status change;
- direction reversal;
- reactivation after Restore;
- deletion.

## Graph view

Graph visualization is not required for MVP.

It may be considered in Phase 2 as a secondary representation only if it adds clarity without increasing visual complexity.

## Canonical v1 principles

- **One pair, one direction, one record.**
- **Incoming and Outgoing are views of the same Connection.**
- **Direction is never inferred or automatically created.**
- **Trash never destroys Connection architecture silently.**
- **Reason explains why the Connection exists.**

---

# 32. Top-Level Navigation

Recommended sections:

- Scenarios
- Current Scenario
- Cards
- Connections
- Exports
- Settings

Avoid adding sections that do not have a clear function.

---

# 32A. Visuals Workspace v1

The Visuals Workspace is a local visual-management and review area.

It does not generate images and does not integrate with Fiction Lab.

Its purpose is to make visual progress, prompt lineage and final VISUAL CANON assets easy to inspect.

## Global Visual Gallery

The primary Visuals view is a clean gallery linked to Lore Cards.

Recommended quick filters:

- All
- Characters
- Locations
- Other

Each visual tile should show:

- final image if available;
- associated Lore Card title;
- Lore Type;
- Visual Canon Status.

Supported visual states:

- `NOT STARTED`
- `IN PROGRESS`
- `VISUAL CANON`

Status must always be shown as text and never communicated through colour alone.

Lore Cards without a final image remain visible.

## Search

Visual search may cover:

- Lore Card title;
- image filename;
- Creation Prompt;
- Refinement Prompt text.

## Additional filters

Useful optional filters:

- Visual Status;
- Lore Type;
- Internal Category;
- Has Image / No Image;
- Has Refinements;
- Updated Date.

## Visual detail view

Opening a visual should show a dedicated visual page with:

- Lore Card title;
- Lore Type;
- Visual Canon Status;
- large final-image preview where available;
- `Open Full Size`;
- `Replace Image`;
- `Open Lore Card`.

The image should receive meaningful workspace space rather than being reduced to a small thumbnail.

## Prompt lineage

Each Lore Card may store:

- exactly one Creation Prompt;
- zero or more Refinement Prompts.

Sequence is preserved as:

`Creation Prompt → Refinement 1 → Refinement 2 → ...`

Refinement sequence represents the actual workflow and should not be arbitrarily reordered later.

Each prompt may contain:

- title / short note;
- full prompt text;
- optional internal notes;
- created timestamp;
- updated timestamp.

Prompt text can be copied through generic clipboard utilities.

## Creation Prompt rule

Only one Creation Prompt exists for a given Lore Card visual lineage.

Editing it updates the existing Creation Prompt rather than creating a second active Creation Prompt.

## Refinement Prompts

`+ Add Refinement Prompt` appends a new Refinement Prompt to the sequence.

Prompt history remains ordered by explicit sequence, not merely by display-date sorting.

## Final image and approval

Adding an image does not automatically mark it as VISUAL CANON.

New or replacement images enter as `IN PROGRESS`.

The user must explicitly choose `Mark as VISUAL CANON`.

This action identifies the current image as the final approved visual for the Lore Card.

## Managed image storage

The active managed image is stored under the Scenario's `images/` folder.

When an active image is replaced:

- the previous managed image is automatically moved into `images/archive/`;
- the previous image is never automatically deleted;
- prompt history is preserved;
- the replacement becomes the active image;
- Visual Canon Status returns to `IN PROGRESS`;
- the replacement must be explicitly approved before returning to `VISUAL CANON`.

Canonical pattern:

```text
Scenario Name/
└── images/
    ├── current-image.ext
    └── archive/
        ├── previous-image_YYYY-MM-DD_01.ext
        └── previous-image_YYYY-MM-DD_02.ext
```

Archive filenames must be collision-resistant and predictable.

## Prompt edits after VISUAL CANON

Editing prompt text alone does not automatically invalidate VISUAL CANON because the user may only be correcting wording or notes.

Replacing the active final image does invalidate the current visual approval and changes the status to `IN PROGRESS`.

## Cards without prompt history

A Lore Card may contain a final image even when historical prompts are unavailable.

This is valid.

The UI may show a non-blocking warning such as:

`No Creation Prompt recorded for this visual.`

The user should never be forced to invent retrospective prompt history.

## Prompt-only visual state

A Lore Card may contain prompt history without a final image.

This remains `IN PROGRESS`.

The gallery may indicate:

`Prompt ready · No image`

## Visual progress summary

The Visuals Workspace may show a compact summary such as:

- number of Lore Cards with visual data;
- VISUAL CANON count;
- IN PROGRESS count;
- NOT STARTED count.

Avoid decorative or oversized dashboard charts.

## Visual validation

### Errors

Examples:

- managed image file is missing;
- image cannot be read;
- multiple active VISUAL CANON images are associated with one Lore Card.

### Warnings

Examples:

- VISUAL CANON exists without a Creation Prompt;
- prompt history exists without a final image;
- active image is outside the managed Scenario storage;
- final image exists but status remains `IN PROGRESS`.

The Companion validates file/state consistency only.

It does not judge artistic quality, character likeness, visual convergence, body design or whether the image is narratively correct.

## Visual comparison

MVP may support simple manual comparison of two Lore Card visuals side by side.

No automatic image analysis is required.

Advanced multi-image visual-convergence tools may be considered for Phase 2.

## Full-screen viewer

The image viewer should support only useful inspection controls such as:

- fit to screen;
- 100%;
- zoom;
- pan;
- close with `Esc`.

The Companion is not an image editor.

## File utilities

Useful local actions:

- Open Image File;
- Open Images Folder.

## Removing an image

Removing the active image should ask whether the managed file should also be removed from active storage.

Status logic:

- prompts exist but no active image → `IN PROGRESS`;
- no prompts and no active image → `NOT STARTED`.

Archived previous images are not silently removed.

## Documentation exports

Scenario Architect Review and Full Documentation exports include by default:

- Visual Canon Status;
- Creation Prompt;
- ordered Refinement Prompts;
- final VISUAL CANON image where available.

Human Review may allow prompt history to be omitted for a cleaner document.

These are local Companion documentation exports only.

## Data model

```text
VisualPrompt
- id
- cardId
- type: CREATION | REFINEMENT
- sequence
- title
- prompt
- notes
- createdAt
- updatedAt
```

```text
CardImage
- id
- cardId
- managedPath
- originalFilename
- status
- createdAt
- updatedAt
```

For MVP, only one active image exists per Lore Card.

## Canonical v1 principles

- **The Companion stores visual lineage but never generates images.**
- **VISUAL CANON requires explicit user approval.**
- **Replacing an active image reopens visual state to IN PROGRESS.**
- **Previous managed images are automatically preserved in `images/archive/`.**
- **Prompt sequence preserves the real refinement history.**
- **Incomplete visual work remains visible rather than disappearing from the gallery.**
- **Visual validation is structural, not artistic.**

---

# 33. Autosave

Autosave is required for MVP.

Changes should save automatically after a short delay.

The interface should show:

- Saving…
- Saved
- Save error

A manual Save shortcut may still be supported.

---

# 34. Editing Safety

Required/provided protections:

- autosave;
- confirmation before deletion;
- undo for recent text edits where practical;
- duplicate card before major rewrite;
- manual complete backup;
- optional revision note.

Full version history is not required for MVP.

---

# 34A. Exports Workspace v1

The Exports Workspace creates local documentation outputs only.

It does not export to Fiction Lab, synchronize with Fiction Lab, or automate any Fiction Lab action.

## Fixed export profiles

v1 provides three fixed profiles:

- **Scenario Architect Review**
- **Full Documentation**
- **Human Review**

Each profile has clear defaults and may expose optional customization through a secondary `Customize` action.

## Scenario Architect Review

Designed for review by the Fiction Lab Scenario Architect Project.

Primary format:
- Markdown

Optional format:
- PDF

Include by default:

- Scenario Name;
- Scenario Description;
- Scenario Tags & Genres;
- Backstory / World Details;
- Greeting;
- Custom Scenario Instructions;
- Lore Cards;
- Text Canon Status;
- Visual Canon Status;
- Internal Categories;
- Weight;
- Pinned state;
- Traits;
- Connection Ledger;
- Creation Prompts;
- ordered Refinement Prompts;
- final VISUAL CANON images where available;
- relevant validation warnings;
- useful structural metadata.

A compact Scenario State summary should appear near the beginning.

Example information:

- Lore Card count;
- CANON CLOSED count;
- DRAFT count;
- OPEN count;
- VISUAL CANON count;
- IN PROGRESS count;
- NOT STARTED count.

## Scenario Architect Review — Package with Images

Markdown export supports an optional `Package with Images` mode.

This creates a ZIP package containing:

- the generated Markdown document;
- all referenced VISUAL CANON images needed by that document.

The purpose is portability when transferring the review package to another tool or Project.

This is a documentation package, not a backup format and not Fiction Lab integration.

## Full Documentation

Produces a complete readable representation of the Scenario.

Available formats:

- PDF;
- Markdown.

Include by default:

- Main Details;
- Story;
- all Lore Cards;
- CANON states;
- Connection Ledger;
- visual lineage;
- final images;
- prompts;
- useful metadata;
- relevant timestamps;
- validation information.

## Human Review

Optimized for clean human reading.

Include by default:

- cover;
- Scenario Name;
- Scenario Description;
- Tags & Genres;
- Story;
- Lore Cards in Reader-style presentation;
- final VISUAL CANON images;
- summarized Connections.

Exclude by default:

- internal IDs;
- technical timestamps;
- detailed validation internals;
- visual prompt history.

Human Review may expose an optional `Include Visual Prompt History` setting.

## Preview

Before export, show a structured preview of what will be generated.

The preview should communicate:

- selected export profile;
- output format;
- ordered major sections;
- Lore Card count;
- image count;
- prompt count where relevant.

Preview is informational and does not change Scenario state.

## Customize

Each profile may expose optional inclusion controls behind `Customize`.

Examples:

- Main Details;
- Story;
- Lore Cards;
- Connections;
- VISUAL CANON Images;
- Visual Prompts;
- Canon Status;
- Validation Details;
- Internal Timestamps.

Customization applies to that export operation unless a later Settings feature explicitly supports saved defaults.

Avoid displaying a large matrix of options on the primary Exports screen.

## Supported documentation formats

v1 documentation formats:

- `.md`
- `.pdf`

JSON belongs to structured backup/data portability and should not be presented as a normal documentation export profile.

## Managed export location

Exports are written into the managed Scenario directory:

```text
Scenario Name/
└── exports/
    ├── markdown/
    └── pdf/
```

The normal export action should not force the user to select a folder every time.

After export, provide:

- `Open File`;
- `Open Folder`.

A future `Export As...` convenience action may allow an additional copy outside managed storage, but is not required for MVP.

## File naming

Use predictable names.

Recommended pattern:

```text
Scenario-Name_Scenario-Architect-Review_YYYY-MM-DD.md
Scenario-Name_Full-Documentation_YYYY-MM-DD.pdf
Scenario-Name_Human-Review_YYYY-MM-DD.pdf
```

Never silently overwrite an existing export.

When a filename collision occurs, append a stable increment such as:

```text
Scenario-Name_Human-Review_YYYY-MM-DD_02.pdf
```

## Recent Exports

The Exports Workspace may show recent output files with:

- timestamp;
- profile;
- format;
- Open action.

The application may derive this list from the managed `exports/` folders rather than maintaining a large separate export-history database.

## Export progress and failure

Large exports must not freeze the UI.

Progress should be visible when meaningful, for example image-processing progress during PDF generation.

On failure:

- show a clear readable error;
- identify the affected asset when known;
- provide Retry where appropriate.

## Warnings and export

Normal Scenario warnings do not block documentation export.

Before export, the UI may summarize issues such as:

- Lore Cards still in DRAFT;
- Visuals still IN PROGRESS;
- missing optional prompt history.

Provide:

- `Review Issues`;
- `Export Anyway`.

Hard failures that make output impossible should be reported as errors.

## Lore Card ordering

Exports must use a predictable Lore Card order.

Recommended hierarchy:

1. Pinned Lore Cards first;
2. user-defined manual Lore order;
3. fallback order if no manual order exists.

The Lore Workspace should therefore support a persistent manual display order.

Do not allow export generation to arbitrarily reorder Lore Cards.

## Images in PDF

PDF image rules:

- preserve aspect ratio;
- never crop merely to fit a template;
- use a readable size;
- avoid wasting a full page when unnecessary;
- do not insert large empty placeholders for cards without an image.

## Images in Markdown

Markdown may use relative paths to managed images when appropriate.

A plain standalone `.md` may reference the filename/path but does not itself embed local image bytes.

When portability with images is required, use `Package with Images`.

## Long prompt presentation

Prompts should be clearly separated and titled.

Example structure:

- Creation Prompt;
- Refinement 1 — title/note;
- Refinement 2 — title/note.

Use readable spacing and page breaks where needed in PDF.

## Connection Ledger presentation

Connection Ledger export should list each Connection once.

Group by operational state when helpful, for example:

- Active;
- Deferred;
- Affected;
- Inactive.

Each entry may include:

- Origin;
- Destination;
- Direction;
- Status;
- Reason.

Incoming backlinks must not be duplicated as separate Connection records.

## Export side effects

Exporting documentation must not:

- change Text Canon Status;
- change Visual Canon Status;
- mark cards as reviewed;
- alter Connections;
- modify Scenario content.

Export is output only.

## Canonical v1 principles

- **Three fixed profiles: Scenario Architect Review, Full Documentation, Human Review.**
- **Markdown and PDF are local documentation formats.**
- **Scenario Architect Review supports Package with Images as a ZIP containing Markdown plus referenced VISUAL CANON images.**
- **JSON remains a structured backup/data format, not a documentation profile.**
- **Preview precedes export.**
- **Customization is secondary and progressive.**
- **Managed export folders are used by default.**
- **Existing exports are never silently overwritten.**
- **Warnings do not normally block export.**
- **Lore Card order follows Scenario organization rather than arbitrary generation order.**
- **Export has no effect on CANON or Scenario state.**

---

# 35. Duplicate Card

The application allows Lore Card duplication.

The duplicate:

- receives a new Card ID;
- copies reusable content/metadata;
- starts with Text Canon Status `DRAFT`;
- starts with Visual Canon Status `NOT STARTED`;
- receives no Connections;
- receives no active/final image;
- does not inherit VISUAL CANON approval.

This avoids accidental architectural and visual duplication.

---

# 36. Pin Warnings

The application displays Scenario-wide Pinned Lore information.

Rules:

- 0–5: recommended operational range;
- above 5 and at/below the current verified platform hard maximum: performance warning;
- above the current verified platform hard maximum: blocked as invalid.

The currently observed interface may support up to 10, but the hard maximum is stored in the centralized platform profile because Fiction Lab may change it.

---

# 37. Validation System

The application supports both hard validation errors and non-destructive warnings.

Examples of errors or warnings, depending on the rule involved:

- Title exceeds a verified hard limit.
- Description exceeds a verified hard limit.
- Card is READY FOR PLATFORM CHECK but no verified Fiction Lab count is stored.
- Card is marked CANON CLOSED without a recorded verification count.
- More than 5 Pins are active — operational warning until the verified platform hard maximum is reached.
- Duplicate or reverse Connection pair is attempted.
- Character Traits contain unsupported values.
- Weight contains an unsupported value.
- Duplicate Trigger usage deserves review.
- Card exceeds a configured operational content target.

Validation must identify whether a finding is a platform hard error, structural error or Companion operational warning.

It must explain the issue and never silently rewrite user content.

Section 48A defines the canonical feedback presentation.

---

# 38. Runtime Compression Support — Future Enhancement

The application may later help detect:

- repeated phrases;
- repeated behavioural meaning;
- very similar sections;
- redundant card content.

This is not required for the first MVP because semantic compression requires more complex analysis.

MVP may provide only existing size/limit guidance; semantic redundancy analysis remains deferred.

---

# 39. Scenario Architect Documentation — Phase 2

A later phase may add a separate area for project-support documents such as:

- Fiction Lab Guide;
- Character Design Guide;
- Visual Design Guide;
- Project Change Log.

These documents remain separate from Scenario Lore.

This feature is out of MVP and assigned to Phase 2.

---

# 40. Project Change Log Support — Phase 2

Phase 2 may support:

- loading a project Change Log;
- displaying entries;
- appending entries manually;
- exporting the updated document.

This is explicitly out of MVP.

The Companion does not need to understand or automatically rewrite Scenario Architect guides in v1.

---

# 41. Technical Architecture v1 — Finalized

The MVP technical architecture is now considered sufficiently defined for implementation.

The application remains:

- Windows-only for v1;
- local-first;
- single-user;
- offline-capable;
- Companion-only;
- without Fiction Lab API integration, authentication, synchronization or automated browser control.

## 41.1 Core stack

### Desktop shell
**Tauri 2**

Why:

- small desktop footprint compared with bundling a full browser runtime;
- strong Windows desktop support;
- Rust backend for filesystem, ZIP, database and other sensitive local operations;
- access to native dialogs and file opening;
- suitable permission/capability model for a local application.

### Frontend
**React + TypeScript**

Build tooling:

- Vite;
- strict TypeScript configuration.

### Database
**SQLite**

Database access should be owned by the Tauri/Rust application layer rather than allowing arbitrary SQL to spread through React components.

Recommended implementation:

- Rust service/repository layer;
- SQLite through `sqlx` or an equivalently mature Rust SQLite layer;
- transactional migrations bundled with the application.

The exact low-level SQLite crate may change during implementation if a compatibility issue appears, but the architectural boundary does not change: the UI does not own database integrity.

### Styling and accessible primitives

Recommended v1 frontend foundation:

- custom semantic design tokens / CSS variables;
- Tailwind CSS or an equivalent utility layer for implementation efficiency;
- Radix-style accessible primitives where they reduce accessibility risk;
- Lucide for the single icon family.

The app must not inherit a generic component-library visual identity. Components are styled to the Companion Design System.

## 41.2 Application layers

Use a clear layered structure.

```text
React UI
   ↓
Feature hooks / application services
   ↓
Typed Tauri command boundary
   ↓
Rust domain/service layer
   ↓
Repositories
   ↓
SQLite + managed filesystem
```

Responsibilities:

### React UI
- rendering;
- local form state;
- navigation;
- accessible interaction;
- optimistic presentation where safe.

### Frontend application services
- typed calls into Tauri;
- query/cache coordination;
- mapping backend errors into user-facing categories.

### Rust domain/service layer
- business invariants;
- transactions;
- file operations;
- backup/restore;
- connection integrity;
- managed image movement/archive;
- export package creation;
- database migrations.

### Repository layer
- database reads/writes;
- no UI logic.

This separation prevents critical rules from existing only in React.

## 41.3 Frontend state

Use separate tools for persistent data and temporary UI state.

Recommended approach:

### Persistent / database-backed state
**TanStack Query** or equivalent query-cache layer around typed Tauri commands.

Use it for:

- Scenario data;
- Lore Cards;
- Connections;
- Visual records;
- validation summaries;
- Library lists.

### Ephemeral UI state
A small state store such as **Zustand**, or narrowly scoped React state/context, for:

- sidebar collapsed state before persistence;
- active drawer;
- temporary selection;
- compare mode;
- local dialog state.

Do not mirror the complete database into one global frontend store.

### Forms
Recommended:

- React Hook Form;
- Zod or equivalent typed client validation.

Backend validation remains authoritative for structural invariants.

## 41.4 Navigation

Use route-based application navigation even though the app is a single desktop window.

Conceptual routes:

```text
/library
/trash
/scenario/:scenarioId/overview
/scenario/:scenarioId/story/:field
/scenario/:scenarioId/lore
/scenario/:scenarioId/lore/:cardId/:tab
/scenario/:scenarioId/visuals
/scenario/:scenarioId/connections
/scenario/:scenarioId/exports
/settings
```

Routes provide:

- reliable Back behaviour;
- deep internal navigation;
- stable breadcrumbs;
- easier restoration of the previous workspace location.

No external web routing is implied.

## 41.5 Database location and source of truth

SQLite is the authoritative application data source.

Recommended default managed root on Windows:

```text
%LOCALAPPDATA%/
└── Fiction Lab Scenario Companion/
    └── Data/
        ├── companion.db
        ├── scenarios/
        ├── cache/
        ├── logs/
        └── temp/
```

The user may change the managed data root through Settings.

Changing the data root must be implemented as a validated managed migration, not by simply changing a path string while files remain behind.

## 41.6 Scenario filesystem

Within the managed `scenarios/` directory:

```text
Scenario Name/
├── images/
│   └── archive/
├── exports/
│   ├── pdf/
│   └── markdown/
├── backups/
│   └── safety/
└── scenario.json
```

The visible folder name is derived from the Scenario Name.

Windows-invalid characters, reserved names and collisions must be normalized safely while preserving the human-readable Scenario Name inside the application.

`scenarioId` remains the stable identity even when a Scenario is renamed.

## 41.7 `scenario.json` role

`companion.db` is authoritative.

`scenario.json` is a managed structured mirror / portability aid and must never silently override newer database state.

To avoid rewriting a potentially large JSON file on every keystroke:

- autosave writes the authoritative database;
- mark the Scenario structured mirror as dirty;
- refresh `scenario.json` at safe persistence checkpoints such as idle flush, explicit export/backup, clean Scenario close or other controlled checkpoints;
- always refresh it before creating a backup.

Structured mirror writes should use atomic temp-file + replace behaviour.

If database and `scenario.json` disagree, the database wins unless an explicit recovery workflow is invoked.

## 41.8 Autosave architecture

Recommended text autosave behaviour:

- local editor state updates immediately;
- debounce persistent writes during continuous typing;
- target approximately 500–1000 ms after the last edit, subject to usability testing;
- serialize writes for the same record;
- use database transactions where multiple fields/state changes belong together;
- surface `Saving...`, `Saved` or a concrete failure state.

Autosave is persistence, not backup.

Undo/Redo history remains an editor concern and must not be reset by successful autosave.

## 41.9 SQLite operational configuration

At startup:

- enable foreign keys;
- use transactional migrations;
- configure a reasonable busy timeout;
- prefer WAL mode where testing confirms it is reliable for the packaged Windows app;
- use transactions for multi-record mutations.

Only one Companion process should actively use the managed database.

Use a single-instance application strategy to reduce accidental concurrent writers.

## 41.10 Database migrations

Maintain an explicit integer database schema version.

Migrations:

- are bundled with the application;
- run in order;
- run before normal workspace access;
- are transactional where SQLite permits;
- never silently destroy user Scenario content.

Before any future destructive migration, define a migration-specific safety strategy.

Database schema version and backup format version are separate concepts.

## 41.11 Identifiers and timestamps

Use stable generated IDs, preferably UUIDs.

Requirements:

- IDs are never derived from display names;
- renamed Scenarios/Cards retain identity;
- restored-as-copy entities receive new IDs where required.

Persist timestamps in UTC.

Render timestamps in the user's local Windows timezone in the UI.

## 41.12 Search architecture

Scenario-wide search should use SQLite FTS5 or an equivalent indexed local full-text strategy once content volume makes simple filtering insufficient.

Searchable domains include:

- Scenario Name/Description;
- Story fields;
- Lore titles/descriptions/content;
- Visual Prompt text;
- Connection Reason.

The implementation may begin with the indexed design immediately to avoid later search-model migration.

Search must remain local.

## 41.13 Managed image pipeline

The Companion does not transform the user's canonical artwork except where a rebuildable preview/thumbnail cache is needed.

On image import:

1. validate readable file type;
2. copy into managed Scenario storage;
3. record the managed path;
4. preserve original filename metadata;
5. create/rebuild thumbnail cache where useful;
6. never delete the user's original source file.

When replacing an active image:

1. move previous managed copy into `images/archive/`;
2. write the new managed copy;
3. update database state transactionally as far as filesystem/database boundaries permit;
4. set Visual Canon Status to `IN PROGRESS`.

## 41.14 Thumbnail cache

Large galleries should not decode full-resolution artwork unnecessarily.

Use a rebuildable thumbnail cache, for example:

```text
Data/
└── cache/
    └── thumbnails/
```

Rules:

- cache is not a backup;
- cache is not included in Scenario backup archives;
- cache may be deleted/rebuilt safely;
- cache failure never destroys the source image;
- thumbnail generation must preserve aspect ratio.

## 41.15 Filesystem operations

Sensitive managed filesystem work belongs in Rust/backend services.

This includes:

- moving/renaming Scenario folders;
- image copy/archive;
- permanent deletion;
- backup creation;
- restore extraction;
- ZIP packaging;
- export package file assembly.

Use native file dialogs for choosing external files/folders.

Use the platform opener for `Open File` / `Open Folder`.

Do not grant broad shell execution when an opener/file API is sufficient.

## 41.16 Windows path handling

Every managed filename/path operation must account for:

- invalid Windows filename characters;
- reserved device names;
- trailing spaces/dots;
- path-length constraints;
- case-insensitive name collisions;
- duplicate Scenario names;
- files locked by other programs.

Display names remain unchanged where possible; filesystem-safe names are an implementation detail.

## 41.17 Backup and ZIP implementation

Backup/restore packaging should run in the Rust/backend layer.

Requirements:

- streaming or bounded-memory ZIP creation for large image sets;
- normalized paths;
- path-traversal protection on restore;
- format/schema version validation;
- integrity checks where available;
- staged extraction before commit.

`Package with Images` uses the same safe ZIP infrastructure but remains a documentation package, not a backup.

## 41.18 Export architecture

Build exports from a format-neutral intermediate representation.

Conceptual flow:

```text
Scenario database
    ↓
ExportDocumentModel
    ├── Markdown renderer
    └── PDF renderer
```

Benefits:

- Scenario Architect Review / Full Documentation / Human Review share one extraction layer;
- Markdown and PDF cannot silently disagree about Scenario ordering/selection;
- profile rules are unit-testable;
- a PDF library can be changed without rewriting export selection logic.

### Markdown
Use a deterministic custom serializer.

Requirements:

- stable heading order;
- explicit Connection direction;
- predictable prompt sequence;
- relative image references when appropriate;
- UTF-8.

### PDF
Use an asynchronous PDF renderer suitable for long text and images.

Preferred initial implementation candidate:

**pdfmake** or an equivalently mature renderer behind the `ExportDocumentModel` abstraction.

PDF generation must not block the UI thread for long-running exports; use worker/background execution or the backend where implementation testing proves more reliable.

The renderer choice may be substituted during the implementation spike without changing product behaviour.

## 41.19 Backup JSON schema

Define a versioned backup schema before implementation of Restore.

Top-level structure should include at minimum:

```text
backupFormatVersion
applicationVersion
createdAt
scenario
scenarioTags
loreCards
triggers
characterTraits
connections
visualPrompts
cardImages
platformVerification
```

References use stable IDs.

Backup JSON is a reconstruction format, not an internal database dump.

Do not serialize SQLite implementation details as the public backup contract.

## 41.20 Validation architecture

Validation exists at multiple layers.

### UI validation
Fast feedback:
- required fields;
- controlled values;
- character counters;
- obvious form constraints.

### Domain validation
Authoritative structural rules:
- same-Scenario Connection endpoints;
- unordered-pair Connection uniqueness;
- card Type/Traits compatibility;
- Trash restrictions;
- CANON transitions;
- active-image invariants.

### Database constraints
Last-line integrity:
- foreign keys;
- unique indexes;
- check constraints where useful.

A UI bug must not be able to create structurally invalid stored data.

## 41.21 Tauri capability/security model

Use least privilege.

The MVP should not request network capabilities it does not need.

Permit only the filesystem/dialog/opener/database operations required by the Companion.

Recommended security posture:

- no Fiction Lab credentials;
- no embedded Fiction Lab login;
- no arbitrary shell execution;
- no remote content as trusted application UI;
- restrictive CSP appropriate to the packaged frontend;
- sanitize/escape user text in rendered HTML contexts;
- validate all external backup paths/files.

## 41.22 Local logging

Use local rotating application logs for diagnostics.

Logs should contain:

- application/version information;
- operation names;
- non-sensitive error codes;
- technical failure context where useful.

Logs should avoid storing Scenario prose, prompts or other user-created content by default.

No remote telemetry is required for MVP.

## 41.23 Crash and recovery boundaries

Critical mutations should use transactions and staged filesystem operations.

Operations requiring explicit recovery handling:

- database migration;
- Scenario folder rename/move;
- image replacement/archive;
- Restore;
- permanent deletion;
- data-root migration.

On startup after abnormal termination:

- run database integrity/open checks;
- inspect unfinished staged operations where a journal marker exists;
- surface concrete recovery guidance rather than silently guessing.

## 41.24 Packaging for Windows

Primary v1 distribution target:

**Tauri NSIS setup executable**.

An MSI build may additionally be produced if useful, but NSIS is the primary installer path.

Use the normal supported WebView2 distribution strategy first.

Do not bundle a large fixed WebView2 runtime unless offline installation requirements justify the extra installer size.

Code signing is recommended before public distribution, but private/local development builds do not block MVP development.

Automatic application updating is out of MVP unless explicitly added later.

## 41.25 Testing architecture

Recommended test layers:

### Rust/domain tests
Test:

- Connection uniqueness/direction rules;
- Trash/Restore transitions;
- backup validation;
- path normalization;
- archive behaviour;
- CANON state transitions;
- migrations.

### Frontend unit/component tests
Use Vitest + Testing Library or equivalent for:

- forms;
- accessibility semantics;
- validation rendering;
- keyboard interaction;
- reusable design-system components.

### Integration tests
Test typed frontend → Tauri command → database workflows for critical operations.

### Manual Windows QA
Required for:

- installer;
- Windows path edge cases;
- 125% / 150% scaling;
- keyboard-only workflows;
- Light/Dark;
- long-content performance;
- large images;
- backup/restore.

## 41.26 Performance targets

The application should feel immediate for ordinary local operations.

Design rules:

- do not load full-resolution images in gallery grids;
- paginate or virtualize very large Lore/visual lists when required;
- use indexed search;
- debounce text persistence;
- move heavy ZIP/PDF/image-cache work off the UI-critical path;
- avoid rebuilding complete Scenario exports during normal editing;
- keep database queries scoped to the active view.

No artificial animation should hide slow architecture.

## 41.27 Implementation project structure

Recommended conceptual repository:

```text
/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   └── domain/
│   ├── features/
│   │   ├── library/
│   │   ├── scenario/
│   │   ├── story/
│   │   ├── lore/
│   │   ├── visuals/
│   │   ├── connections/
│   │   ├── exports/
│   │   ├── backups/
│   │   └── settings/
│   ├── services/
│   ├── state/
│   ├── styles/
│   └── types/
│
└── src-tauri/
    ├── src/
    │   ├── commands/
    │   ├── domain/
    │   ├── repositories/
    │   ├── services/
    │   ├── storage/
    │   ├── backup/
    │   ├── export/
    │   └── errors/
    └── migrations/
```

The exact folder names may evolve, but feature and infrastructure boundaries should remain explicit.

## 41.28 Final stack decision

For v1, consider the following architecture approved:

- **Tauri 2**
- **React**
- **TypeScript**
- **Vite**
- **SQLite**
- **Rust-owned service/repository boundary**
- **TanStack Query-style persistent-data cache**
- **small ephemeral UI state store**
- **React Hook Form + typed schema validation**
- **semantic custom design tokens**
- **accessible primitives**
- **Lucide**
- **versioned database migrations**
- **versioned structured backup schema**
- **format-neutral export model**
- **NSIS primary Windows installer**

This is sufficiently specific to begin implementation after the final PRD audit.

---
# 41A. Backup Strategy

v1 uses complete manual Scenario backups in standard ZIP archives.

Canonical contents:

```text
Scenario-Name_Backup_YYYY-MM-DD_HHMM.zip
├── scenario.json
├── metadata.json
└── images/
    ├── active managed images
    └── archive/
```

PDF and Markdown are documentation exports, not backups.

Normal backups are manual-only. The sole automatic backup exception is the pre-restore safety snapshot required by `Replace Existing Scenario`.

Section 41B is authoritative for creation, verification, Restore, conflicts and recovery behaviour.

---

# 41B. Backup & Restore v1

Backup and Restore are local Companion functions for preserving and recovering complete Scenario state.

They do not interact with Fiction Lab.

## Backup scope

A backup is always complete in v1.

It includes:

- Scenario structured data;
- Main Details;
- Story fields;
- Lore Cards;
- Text Canon Status;
- Visual Canon Status;
- Connections / Connection Ledger;
- visual prompt history;
- active managed images;
- archived managed images;
- backup metadata.

There are no partial backup profiles in v1.

## Create Backup

`Create Backup` may be available from the Scenario Workspace and the Scenario Library contextual menu.

Before creation, show a concise summary:

- Scenario name;
- included data categories;
- estimated backup size;
- destination.

Managed destination:

```text
Scenario Name/
└── backups/
```

## Backup archive structure

Recommended structure:

```text
Scenario-Name_Backup_YYYY-MM-DD_HHMM.zip
├── scenario.json
├── metadata.json
└── images/
    ├── active managed images
    └── archive/
        └── archived images
```

`metadata.json` may contain:

- backupFormatVersion;
- applicationVersion;
- createdAt;
- scenarioId;
- scenarioName;
- activeImageCount;
- archivedImageCount;
- optional integrity information/checksums.

## Manual-only backup policy

Normal backup archives are created manually only.

The application must not create scheduled, daily, background or close-on-exit backup archives.

Autosave remains separate from backup creation.

## Safety snapshot exception

A single exception exists for destructive restore operations.

When the user explicitly chooses `Replace Existing Scenario`, the Companion automatically creates a pre-restore safety snapshot of the current Scenario before replacement begins.

This safety snapshot exists solely to protect against destructive restore mistakes.

It is not part of the normal automatic-backup system.

Recommended location:

```text
Scenario Name/
└── backups/
    └── safety/
        └── Scenario-Name_Pre-Restore_YYYY-MM-DD_HHMM.zip
```

The replacement operation should not continue if the safety snapshot cannot be created successfully, unless the user is explicitly warned and a later product decision permits bypassing this safeguard.

## Restore sources

Restore supports:

- backups already stored under the managed Scenario backup folders;
- an external compatible backup ZIP selected from Windows.

This allows transfer between computers without introducing synchronization.

## Restore validation

Selecting a backup must not immediately modify local Scenario data.

First validate:

- backup format version;
- required structured files;
- `scenario.json`;
- metadata;
- Lore Card structure;
- Connection references;
- available managed images;
- archived image contents where applicable;
- file readability;
- path safety.

Only after validation should the restore decision screen appear.

## Unsupported backup version

If the backup was created with a newer unsupported backup format, block restore and explain the incompatibility clearly.

Do not guess how to interpret a future format.

## Identity handling

### Scenario does not exist locally

Restore using the stored `scenarioId`.

### Same name, different scenarioId

Treat as a different Scenario.

Do not merge automatically.

Suggest a collision-safe name such as:

`Scenario Name (Restored)`

Allow the user to change the restored display name before completion.

### Same scenarioId already exists

Offer only:

- **Restore as Copy**
- **Replace Existing Scenario**
- Cancel

Do not offer automatic Merge in v1.

`Restore as Copy` creates a new `scenarioId`.

`Replace Existing Scenario` restores the backed-up state over the current Scenario only after the pre-restore safety snapshot has been created successfully.

## No Merge in v1

Automatic merge of current and backed-up Scenario state is out of scope.

The Companion must not attempt to automatically reconcile:

- divergent Lore Cards;
- Connection directions;
- CANON states;
- visual prompt histories;
- active or archived images;
- deletions.

## Same Scenario in Trash

If the same `scenarioId` already exists in Trash, do not silently create a duplicate.

Provide explicit options such as:

- Restore Existing from Trash;
- Replace with Backup;
- Cancel.

## Restore atomicity

Restore should use a temporary staging area.

Recommended flow:

1. validate source backup;
2. prepare temporary restore directory;
3. extract safely;
4. validate extracted state;
5. prepare destination;
6. commit restored Scenario;
7. verify committed state;
8. expose restored Scenario in the Library.

If a restore fails before commit, preserve the existing Scenario unchanged where possible.

## Missing or damaged assets

Differentiate structured-data failure from optional asset failure.

### Blocking errors

Examples:

- missing or invalid `scenario.json`;
- unsupported schema;
- structurally invalid required Scenario data.

These block restore.

### Recoverable warnings

Examples:

- one or more referenced images are missing;
- an archived image cannot be read.

The user may be allowed to `Restore Anyway` when the structured Scenario data remains valid.

Affected visual entries should be marked clearly as missing rather than silently discarded.

## Restore progress

For large backups, display progress by meaningful stage such as:

- Scenario data;
- Lore Cards;
- Connections;
- active images;
- archived images.

The Scenario being restored must not become editable until restore completion/commit.

## Restore completion

After success, show:

- Scenario name;
- Lore Card count;
- active-image count;
- archived-image count;
- warnings if any.

Useful actions:

- Open Scenario;
- Open Folder;
- Review Warnings when applicable.

## Backup retention

Backup ZIP files are never automatically deleted by the Companion.

Deletion is a deliberate user action.

The Companion does not enforce retention schedules in v1.

## Verify Backup

Provide a standalone `Verify Backup` action that checks integrity without restoring.

It may report:

- metadata validity;
- Scenario data validity;
- format compatibility;
- expected vs available images;
- archive readability;
- overall result.

## Backup versus documentation export

Keep these concepts visually and functionally separate:

- **Backup** = complete restorable Scenario state.
- **Export** = readable documentation output.

PDF and Markdown are not backups.

## Security

ZIP extraction must prevent path traversal.

No archive entry may escape the designated temporary restore directory.

Archive paths must be normalized and validated before extraction.

## Canonical v1 principles

- **Backups are complete, not profile-based.**
- **Active and archived images are included.**
- **Normal backup creation is manual-only.**
- **Replace Existing creates an automatic pre-restore safety snapshot.**
- **Restore validates before changing local data.**
- **No Merge in v1.**
- **Same-ID conflicts offer Restore as Copy or Replace Existing.**
- **Invalid structured Scenario data blocks restore.**
- **Missing non-critical assets may allow restore with warnings.**
- **Backup ZIPs are never automatically deleted.**
- **External compatible ZIPs may be restored.**
- **Verify Backup is available independently of Restore.**
- **Restore uses safe staged extraction and path validation.**

---

# 42. Core Database Entities — v1

The database schema should model product concepts directly rather than duplicating UI structure.

## Scenario
- id
- name
- description
- coverImagePath
- managedFolderName
- status
- backstory
- greeting
- customInstructions
- fictionLabPlan
- notes
- favorite
- isTrashed
- trashedAt
- createdAt
- updatedAt

## ScenarioTag
- id
- scenarioId
- value
- displayOrder

Constraints:
- maximum 5 active tags per Scenario;
- value must come from the configured official Fiction Lab vocabulary;
- no duplicate value within the same Scenario.

## LoreCard
- id
- scenarioId
- type
- internalCategory
- title
- description
- content
- weight
- pinned
- textCanonStatus
- visualCanonStatus
- notes
- revisionNote
- sourceReferenceNote
- verifiedFictionLabCount
- displayOrder
- isTrashed
- trashedAt
- createdAt
- updatedAt

Rules:
- `visualCanonStatus` may remain NOT STARTED for cards with no visual workflow;
- local character count may be derived rather than persisted unless profiling shows a need;
- `verifiedFictionLabCount` is optional/manual.

## Trigger
- id
- cardId
- value
- displayOrder

## CharacterTrait
- id
- cardId
- value
- displayOrder

Constraints:
- Character cards only;
- official controlled vocabulary only;
- maximum 10;
- no duplicate Trait on one card.

## Connection
- id
- scenarioId
- originCardId
- destinationCardId
- status
- reason
- previousStatus
- createdAt
- updatedAt

Statuses:
- ACTIVE
- DEFERRED
- AFFECTED
- INACTIVE

Database invariant:

for one unordered pair of Lore Cards, only one Connection may exist.

Implement this with a database-level unique strategy over:

`scenarioId + unordered(originCardId, destinationCardId)`

so both exact duplicates and reverse duplicates are impossible even if UI validation fails.

## ConnectionEvent
Minimal local history:
- id
- connectionId
- eventType
- previousValue
- newValue
- createdAt

Use only for meaningful structural events such as:
- CREATED
- STATUS_CHANGED
- DIRECTION_REVERSED
- REACTIVATED
- DELETED

This is not a full project Change Log system.

## VisualPrompt
- id
- cardId
- type
- sequence
- title
- prompt
- notes
- createdAt
- updatedAt

Types:
- CREATION
- REFINEMENT

Rules:
- exactly zero or one CREATION prompt per Lore Card;
- zero or more REFINEMENT prompts;
- sequence preserves actual refinement order.

## CardImage
- id
- cardId
- managedPath
- originalFilename
- state
- wasVisualCanon
- archivedAt
- createdAt
- updatedAt

States:
- ACTIVE
- ARCHIVED
- MISSING

Rules:
- maximum one ACTIVE image per Lore Card in MVP;
- archived images remain preserved;
- VISUAL CANON approval itself is represented by the Lore Card visual status, not by pretending archived images are active.

## PlatformVerification
- id
- cardId
- verifiedCount
- accepted
- notes
- verifiedAt

A card may have multiple historical verification records if useful, with the latest one surfaced in normal UI.

## PlatformProfile
Represents the centrally maintained Fiction Lab reference configuration:
- id
- plan
- name
- version
- updatedAt

`plan` is a controlled value:

- FREE
- PLUS
- ULTRA

## PlatformLimit
- id
- profileId
- key
- value
- unit
- sourceNote

Hard platform limits remain separate from operational guidance.

The same logical limit key may have different values in the Free, Plus and Ultra profiles.

Scenario validation resolves limits through:

`Scenario.fictionLabPlan → PlatformProfile.plan → PlatformLimit`

A plan change never mutates Scenario text. It only changes the active validation/reference profile.

## AppSetting
- key
- value
- updatedAt

Store user preferences that belong to the Companion.

## OperationJournal
Small crash-recovery marker table for multi-step destructive/staged filesystem operations:
- id
- operationType
- scenarioId
- state
- stagingPath
- createdAt
- updatedAt

This is used for recovery detection, not ordinary history.

---
# 43. Data Integrity Rules

The application and database must enforce:

- every Lore Card belongs to exactly one Scenario;
- Connection Origin and Destination belong to the same Scenario;
- a card cannot connect to itself;
- one unordered card pair may contain only one Connection;
- reverse duplicate Connections cannot exist;
- Character Traits apply only to Character cards;
- Character Traits use only the official controlled list and max 10;
- Scenario Tags use only the official controlled list and max 5;
- Scenario `fictionLabPlan` must be one of FREE / PLUS / ULTRA;
- Weight uses only the five supported controlled values;
- Internal Category uses only the fixed controlled list;
- Pinned and Favourite are boolean values;
- only one active managed image exists per Lore Card in MVP;
- prompt refinement sequence is stable and ordered;
- official content edits reopen CANON CLOSED Lore Cards to DRAFT;
- Trash is soft deletion until Delete Permanently;
- moving a card to Trash preserves associated Connections as Affected rather than deleting them;
- restoring a card revalidates affected Connections before reactivation;
- permanent card deletion may physically remove associated Connections only after explicit confirmation;
- timestamps update consistently;
- foreign keys are enabled;
- multi-entity structural mutations use transactions.

Database constraints should back critical invariants wherever SQLite can express them.

---
# 44. Deleting a Card

`Delete` from normal Lore management means **Move to Trash**.

If the card participates in Connections, show the affected Incoming and Outgoing counts.

Moving to Trash:

- does not physically delete the card;
- does not silently delete Connections;
- changes associated active/deferred Connections to `Affected` where appropriate;
- preserves previous Connection state for Restore.

`Delete Permanently` is available from Trash and requires explicit confirmation.

Before permanent deletion, show every associated Connection that will be physically removed.

The database may use cascade deletion for the final physical delete after the application has presented and confirmed the consequence.

The app must never leave broken stored references.

---
# 45. Entering Existing Fiction Lab Content

The Companion may be used with content that already exists in Fiction Lab, but it does not connect to or import directly from the platform.

MVP supports:

- normal manual field entry;
- paste into the relevant plain-text fields;
- adding existing managed images manually.

Out of scope for v1:

- Markdown import;
- automatic Scenario Architect output parsing;
- Fiction Lab scraping;
- Fiction Lab API import;
- automated synchronization.

Structured import may be reconsidered in a later phase only if a concrete workflow justifies it.

---
# 45A. Scenario Library

The Scenario Library is the dedicated home screen of the Fiction Lab Scenario Companion.

It must feel modern, visual, uncluttered and immediately understandable.

## Default presentation

- Grid view is the default.
- List view is also available.
- The application remembers the user's preferred view.
- The application remembers the user's preferred sort order.

Each Scenario entry should show only recognition-oriented information:

- Scenario Cover Image;
- Scenario Name;
- short Scenario Description;
- Scenario Status;
- Lore Card count;
- up to 3 visible Tags & Genres, with an overflow indicator when more exist;
- last-edited information.

The primary interaction is opening the Scenario.

Secondary actions belong in a contextual menu rather than appearing as a row of permanent buttons.

Recommended contextual actions:

- Rename;
- Duplicate;
- Create Backup;
- Export;
- Open Scenario Folder;
- Move to Trash.

## Search

Library search is immediate and filters while typing.

Search at minimum:

- Scenario Name;
- Scenario Description;
- Scenario Tags & Genres;
- Fiction Lab Target Plan.

Full Lore content search belongs inside the Scenario Workspace rather than the Library.

## Filters

Keep the default filter surface intentionally small.

Recommended quick filters:

- All;
- Recently Edited;
- In Progress;
- Completed.

Additional filtering may be exposed through a dedicated `Filters` control.

## Sorting

Recommended v1 options:

- Recently Edited;
- Name A–Z;
- Name Z–A;
- Recently Created;
- Oldest Created.

## New Scenario

`+ New Scenario` must remain easy to find.

Creation uses a short focused form rather than a long multi-step wizard.

Initial fields:

- Scenario Name;
- Scenario Description;
- Scenario Cover Image — optional;
- Scenario Tags & Genres — up to 5.

After creation, open the new Scenario directly in the Scenario Workspace.

## Empty state

When no Scenarios exist, show a simple explanatory empty state and one clear `Create Scenario` action.

Avoid decorative cartoons, motivational filler or ambiguous onboarding.

## Missing cover

If a Scenario has no cover image, use a clean placeholder such as initials derived from the Scenario Name.

## Favourite

The Companion may support an internal `Favourite` flag for Scenario organization.

Do not call this feature `Pinned`, because `Pinned` already has a specific Fiction Lab meaning for Lore Cards.

## Trash

Deleting a Scenario from the Library moves it to an internal Trash first.

Trash supports:

- Restore;
- Delete Permanently.

Permanent deletion requires explicit confirmation.

Moving a Scenario to Trash must preserve its managed files until permanent deletion.

## Accessibility

- important actions must use clear text labels;
- icons may reinforce meaning but should not be the only cue for primary actions;
- state must never rely on colour alone;
- focus order and keyboard access must remain predictable;
- destructive actions must be clearly differentiated and confirmed.

---

# 46. Accessibility and Readability Requirements

Accessibility is a default product requirement.

Core requirements include:

- scalable readable text;
- strong contrast;
- complete primary keyboard workflows;
- visible focus;
- no reliance on colour alone;
- explicit important-action labels;
- predictable control placement;
- comfortable long-form reading;
- restrained motion;
- usable layout at 150% Windows scaling.

Section 49A is the canonical detailed accessibility and keyboard specification.

---


# 46A. Modern Accessibility-First Desktop UI

The Fiction Lab Scenario Companion must use a modern, intuitive and user-friendly desktop interface rather than a dense traditional desktop layout.

The product should feel contemporary without becoming visually wasteful or hiding important actions behind ambiguous minimalism.

Core principles:

- progressive disclosure: show the information needed for the current task and reveal secondary controls contextually;
- predictable navigation and consistent control placement;
- low visual noise;
- clear visual hierarchy;
- plain, concrete labels;
- icons should normally be paired with text for important actions;
- primary content receives the majority of workspace space;
- secondary metadata should appear in contextual panels/drawers rather than permanently occupying a large fixed column;
- animation should be subtle and should not interfere with orientation;
- application state must be explicit, e.g. `Saved`, `CANON CLOSED`, `VISUAL CANON`, validation warnings;
- no important state may rely on colour alone;
- avoid unnecessarily dense walls of text;
- use controlled line width, readable spacing and clear headings;
- avoid routine ALL CAPS interface text;
- preserve strong contrast without making the visual environment harsh.

Accessibility is a product requirement from the beginning, not a later optional theme.

The UI should be designed with:
- autism-friendly predictability and consistency;
- dyslexia-conscious readability;
- low cognitive load;
- minimal reliance on memorized iconography or hidden gestures.

## Proposed information architecture

### Scenario Library
A dedicated modern library screen with:
- scenario cover;
- scenario name;
- short description or useful summary;
- last edited information;
- search;
- clear New Scenario action.

Avoid a permanently visible global scenario list while editing a Scenario.

### Scenario Workspace
Use a modern workspace structure rather than a rigid legacy three-pane desktop interface.

Suggested primary navigation:
- Overview
- Story
- Lore
- Visuals
- Connections
- Exports

The central workspace displays one main task/context at a time.

Secondary properties, validation, metadata and advanced controls should open contextually in a drawer, inspector or dedicated view when needed.

### Lore editing
A Lore Card should provide a spacious editor with clearly named sections/tabs such as:
- Content
- Visual
- Connections
- History

Reader Mode and Edit Mode remain distinct.

### Status feedback
A lightweight status area may show information such as:
- save state;
- number of Lore Cards;
- tag usage;
- validation warning count.

Do not turn the application into a generic SaaS dashboard full of oversized cards, decorative metrics or unnecessary charts.

---

# 46B. Scenario Workspace

The Scenario Workspace is the primary editing environment.

The v1 top-level navigation is:

- **Overview**
- **Story**
- **Lore**
- **Visuals**
- **Connections**
- **Exports**

The workspace should display one main task/context at a time and keep secondary controls contextual.

## Overview

Overview provides a concise state summary of the Scenario.

Recommended content:

- cover;
- name;
- description;
- selected Tags & Genres;
- overall Scenario status;
- Lore Card count;
- Text CANON progress;
- VISUAL CANON progress;
- validation warning count;
- last edited information.

Useful actions may include:

- Continue Editing;
- Open Lore;
- Review Connections;
- Export Scenario.

Avoid decorative charts unless a chart communicates genuinely useful information.

## Story

Story contains the dedicated top-level Scenario fields:

- Backstory / World Details;
- Greeting;
- Custom Scenario Instructions.

Use clearly labelled tabs or sections.

Character counts must remain visible and use the centralized Fiction Lab platform-limit profile.

When a field exceeds a verified hard limit, the UI must state the exact overflow in text rather than relying on colour.

Example:

`10,143 / 10,000 — 143 over limit`

## Lore

Lore is the main card-management workspace.

Provide:

- immediate Lore search;
- filters;
- `+ New Lore Card`;
- Type filtering;
- Card view;
- Compact List view.

Lore entries should make important state easy to scan, such as:

- title;
- Type;
- Text Canon Status;
- Weight;
- Linked Piece count where useful.

## Lore Card editor

A Lore Card opens into a spacious focused editor.

Recommended tabs:

- **Content**
- **Visual**
- **Connections**
- **Details**

### Content
Contains the main Fiction Lab card fields, including Traits when the Type is Character.

### Visual
Contains:

- final VISUAL CANON image;
- Creation Prompt;
- ordered Refinement Prompt history;
- relevant image metadata.

### Connections
Contains:

- outgoing Linked Pieces;
- incoming backlinks;
- related Connection Ledger information;
- `Add Connection` action.

Direction must always remain explicit as `ORIGIN → DESTINATION`.

### Details
Contains operational metadata such as:

- Type;
- Weight;
- Pinned;
- Internal Category;
- Text Canon Status;
- Visual Canon Status;
- character counts;
- created and updated timestamps.

## Edit and Reader modes

Lore Cards support distinct:

- **Edit Mode**
- **Reader Mode**

Edit Mode exposes editable fields.

Reader Mode presents the card as a clean document for review, reducing form-control noise.

## Visuals

Visuals provides a scenario-level gallery of available visual material.

At minimum, support filtering such as:

- Characters;
- Locations;
- All.

Each visual entry should show:

- final image where available;
- associated card/title;
- Visual Canon Status.

The purpose is not image generation. It is visual review, navigation and comparison support.

Advanced side-by-side visual-convergence comparison may be deferred beyond MVP if implementation cost is high.

## Connections

Connections has a dedicated scenario-level view.

The default v1 representation should be a readable directional table/list rather than a graph.

Recommended columns:

- Origin;
- Destination;
- Status.

Selecting a connection reveals:

- Origin;
- Destination;
- Status;
- Reason / retrieval purpose where stored;
- incoming backlink consequence.

A graph view may exist later as a secondary visualization, but it is not the primary v1 connection-management surface.

## Exports

Exports provides the Scenario export profiles and their included content.

Primary profiles:

- Scenario Architect Review;
- Full Documentation;
- Human Review.

Expose clear actions for:

- Export Markdown;
- Export PDF;
- Open Exports Folder.

The UI should clearly communicate what each export profile includes before export.

## Global search

The Scenario Workspace includes global search.

Search may cover:

- Story fields;
- Lore titles;
- Lore descriptions;
- Lore content;
- Tags;
- Connections.

Results should be grouped by source/context so the user can understand where each match came from.

## Contextual controls

Secondary properties, validation details and metadata should open in a contextual drawer, inspector or dedicated view when needed.

Do not permanently reserve a large right-hand column for metadata.

## Breadcrumbs

Use clear breadcrumbs in deeper views, for example:

`Lore › Characters › Evelyn Millard`

or:

`Story › Backstory`

Breadcrumbs must support orientation without becoming visually dominant.

## Keyboard support

Recommended shortcuts:

- `Ctrl + S` — Save;
- `Ctrl + F` — Search current area;
- `Ctrl + Shift + F` — Global Search;
- `Ctrl + N` — New Lore Card when in Lore;
- `Esc` — Close active drawer/dialog where appropriate.

All shortcut actions must also remain available through visible UI controls.

## Save state

Save state must be explicit:

- `Saving...`
- `Saved`
- `Save failed — Retry`

Autosave should minimize disruptive unsaved-changes dialogs.

If persistence fails and navigation could lose changes, the UI must clearly explain the failure before allowing destructive navigation.

---

# 47. Theme

v1 supports:

- System
- Light
- Dark

Theme changes do not alter information hierarchy or reset editing state.

The complete visual specification is defined in Section 50A.

---

# 47A. Settings v1

Settings must remain small, understandable and focused on preferences that materially improve the user's workflow.

Do not expose options merely because they are technically configurable.

Recommended top-level categories:

- **General**
- **Appearance**
- **Accessibility**
- **Reading**
- **Fiction Lab Reference**
- **Exports**
- **Backups**
- **Storage**
- **About**

Search Settings is not required for v1. If Settings becomes large enough to require search, the structure should first be simplified.

## General

Recommended options:

- Application Data Folder;
- Default Library View;
- Default Sort;
- Open Last Scenario on Startup.

Defaults:

- Library opens on startup;
- Grid remains the default Library view;
- Recently Edited remains the default sort.

`Open Last Scenario on Startup` should default to Off for predictable startup behaviour.

## Appearance

Recommended options:

- Theme: System / Light / Dark;
- Interface Density: Comfortable / Compact;
- Text Size;
- Reduce Motion.

Defaults:

- Theme: System;
- Density: Comfortable;
- Reduce Motion: On.

Avoid excessive density controls or decorative themes in v1.

## Accessibility

Accessibility is a first-class product feature rather than a hidden optional mode.

Useful options may include:

- Reduce Motion;
- Increase Text Spacing;
- Enhanced Focus Indicators;
- Confirm Destructive Actions.

Some accessibility behaviours are application rules rather than toggles.

For example:

- important controls require accessible text labels;
- important state must not rely on colour alone;
- keyboard access remains available;
- destructive actions remain clearly identified.

Do not allow users to disable essential accessibility safeguards merely to expose more settings.

## Reading

Provide a small reading-preferences group for long-form content.

Recommended controls:

- Reader Text Size;
- Line Spacing;
- Content Width;
- Paragraph Spacing.

Use simple named choices rather than overly granular numerical tuning where possible.

The product should prioritize:

- controlled line length;
- readable spacing;
- strong structural hierarchy;
- clear headings;
- comfortable contrast.

Do not treat a single specialized font as a substitute for broader readability design.

## Fiction Lab Reference

The application uses centralized Fiction Lab platform profiles for verified field structures, labels and hard limits.

Normal users should not need to edit numeric platform values frequently.

Settings should provide:

- **Default Fiction Lab Plan for new Scenarios:** Free / Plus / Ultra;
- current platform-profile version;
- last updated date;
- `View Platform Limits`.

The default plan is only a creation default. Every Scenario stores its own Fiction Lab Target Plan and changing the Settings default must not silently alter existing Scenarios.

Advanced editing of verified platform values may be available behind a clearly labelled secondary action if needed.

Hard platform limits must remain visually and conceptually separate from internal operational guidance.

## Operational Guidance

Scenario Architect recommendations must be labelled as recommendations rather than Fiction Lab limits.

Examples:

- recommended operational maximum for pinned Lore Cards;
- preferred Character content targets.

The UI should explicitly state that such values are workflow guidance, not platform hard limits.

## Exports

Recommended persistent preferences:

- Default Human Review Format;
- Default Scenario Architect Review Format;
- Include Visual Prompts in Human Review;
- Open Folder After Export.

Do not persist every per-export `Customize` choice automatically unless a later requirement justifies it.

## Backups

Recommended Settings display:

- Default managed backup location;
- Verify Backup After Creation;
- informational statement that archived images are included.

There is no automatic backup frequency setting in v1 because scheduled/background backups are out of scope.

## Confirmations

The product may expose a small number of confirmation preferences.

Examples that may be configurable:

- Move Scenario to Trash;
- Move Lore Card to Trash;
- Replace VISUAL CANON Image;
- Reverse Connection Direction.

The following destructive confirmations should remain mandatory:

- Permanent Delete;
- Replace Existing Scenario during Restore.

## Storage

Provide a readable local storage summary where practical.

Useful categories:

- Scenarios;
- Active Images;
- Archived Images;
- Exports;
- Backups.

Provide:

- `Open Data Folder`;
- optional `View Storage Details`.

Do not implement automatic cleanup in v1.

Archived images and backup files are never automatically removed by the application.

## Reset UI Preferences

A `Reset UI Preferences` action may restore interface preferences such as:

- theme;
- density;
- Reader settings;
- Library view;
- sorting.

It must not delete or modify:

- Scenarios;
- Lore Cards;
- images;
- backups;
- platform limits;
- CANON state.

The confirmation text must state this clearly.

## About

Keep About simple.

Useful information:

- Fiction Lab Scenario Companion;
- application version;
- local companion description;
- Open Application Folder;
- View Licenses.

## Canonical v1 principles

- **Settings remain small and understandable.**
- **Good defaults are preferred over excessive configurability.**
- **Accessibility is built into the product, not delegated to a special theme.**
- **Reading controls focus on legibility and cognitive comfort.**
- **Fiction Lab hard limits and Scenario Architect operational guidance remain separate.**
- **Automatic cleanup and automatic backup scheduling are not present in v1.**
- **Mandatory destructive confirmations cannot be disabled.**
- **Settings reset never touches Scenario data.**

---

# 48. MVP Scope

The implementation-ready v1 MVP includes:

1. Windows local-first desktop application.
2. Scenario Library with Grid/List, search, sorting, Favourite and Scenario Trash.
3. Scenario creation/editing, per-Scenario Fiction Lab Target Plan and manual Scenario Status.
4. Main Details, Story and Scenario Overview.
5. Official Fiction Lab Lore Types.
6. Fixed Companion Internal Categories.
7. Official controlled Weight, Trait and Scenario Tag vocabularies.
8. Lore Card creation/editing/duplication/Trash/Restore.
9. Separate Text Canon and Visual Canon lifecycle.
10. live local character counting with plan-aware Fiction Lab limits plus optional manually recorded Fiction Lab count.
11. Lore search, filters, sorting and persistent manual display order.
12. directional Connections with Incoming/Outgoing views and unordered-pair reverse prevention.
13. Connection Ledger with Active / Deferred / Affected / Inactive states.
14. Pinned Lore guidance and platform-limit validation.
15. Visuals Workspace with Creation Prompt, ordered Refinements, managed image, VISUAL CANON approval and automatic prior-image archive.
16. simple manual two-image visual comparison.
17. Edit / Reader / Focus modes where specified.
18. generic clipboard utilities.
19. local Single Card PDF.
20. Scenario Architect Review, Full Documentation and Human Review export profiles.
21. local Markdown and PDF documentation export.
22. optional Scenario Architect Markdown `Package with Images`.
23. complete manual ZIP Backup.
24. Restore as Copy / Replace Existing with safety snapshot and no Merge.
25. Verify Backup.
26. autosave and explicit save-state feedback.
27. Settings, Storage summary and managed data-root configuration.
28. accessibility-first keyboard-capable UI.
29. Light / Dark / System themes and the v1 Design System.
30. validation, failure feedback and recovery behaviour defined in this PRD.

Anything listed in Sections 49–51 as deferred/out of scope is not part of MVP.

---

# 48A. Feedback, Notifications & Error Handling v1

The application should communicate clearly without interrupting the user unnecessarily.

Use the least intrusive feedback mechanism that still makes the state understandable.

## Feedback hierarchy

Use four main feedback levels:

- **Inline Status** — continuous or persistent state.
- **Toast** — lightweight non-blocking confirmation.
- **Warning Banner / Panel** — non-blocking issue that deserves attention.
- **Modal Dialog** — required decision, destructive confirmation or unavoidable blocking failure.

Avoid using modal dialogs for routine success feedback.

## Inline Status

Use inline status for continuous states such as:

- `Saving...`
- `Saved`
- validation warning counts;
- Visual Canon Status;
- backup validation progress.

Inline status should remain visible when it helps orientation.

Do not show a toast for every successful autosave.

## Toasts

Use toasts for short, non-critical confirmations such as:

- Backup created;
- Export completed;
- Image moved to archive;
- Lore Card restored;
- Connection created;
- Scenario duplicated.

Toasts should:

- be concise;
- disappear automatically;
- not block the workspace;
- optionally expose one useful action such as `Open File`.

Limit simultaneous visible toasts to approximately three and queue additional messages rather than stacking indefinitely.

## Warnings

Warnings mean the user may continue, but something deserves review.

Warnings should explain:

1. what happened;
2. why it matters;
3. whether the action is blocked;
4. what the user can do next.

Examples:

- high pinned-card count;
- VISUAL CANON without Creation Prompt;
- Connection referencing an OPEN card;
- backup with missing non-critical images.

Warnings must never be represented as platform hard-limit errors unless they actually are hard-limit violations.

## Errors

Error messages should be concrete.

Avoid generic messages such as:

`Something went wrong.`

Prefer:

`The image could not be copied because the destination folder is not writable.`

When useful, provide actions such as:

- Retry;
- Open Folder;
- Locate File;
- Show Technical Details.

If the application knows the affected file or record, identify it.

## Technical details

Technical information should be secondary.

Expose a `Show Technical Details` action for information such as:

- error codes;
- file paths;
- SQLite messages;
- diagnostic details.

The primary message should remain readable and human-oriented.

## Destructive confirmations

Use modal confirmation for actions such as:

- Delete Permanently;
- Replace Existing Scenario;
- Reverse Connection Direction;
- replacing an active VISUAL CANON image where history/state changes;
- deleting a managed file;
- other genuinely destructive operations.

Do not use generic `Are you sure?` prompts.

Name the action and affected object explicitly.

Prefer explicit action buttons:

- `Cancel / Delete Permanently`
- `Cancel / Replace Scenario`
- `Stay Here / Retry Save`

Avoid ambiguous `Yes / No` buttons.

## Severity must not rely on colour alone

Errors, warnings and success states may use colour and iconography as reinforcement, but meaning must also be expressed through text and accessible labels.

## Form-level error summary

When multiple validation issues exist, provide a concise summary.

Each issue should navigate to the affected field or record where practical.

Example:

- Description exceeds limit.
- Trait count exceeds maximum.
- Destination pair already has a Connection.

Do not force the user to visually search for coloured fields.

## Field-level validation

Show validation near the affected control.

Example:

`224 / 200`
`24 characters over the Fiction Lab limit.`

Field-level messages and summary-level navigation should work together.

## Validation timing

Avoid aggressive validation while the user is still typing.

Recommended behaviour:

- hard-limit counters may update live;
- some validation may run on field blur;
- structural validation may run when committing a meaningful state transition;
- avoid noisy incomplete-field warnings while the user has only just started editing.

## Undo for reversible actions

Where appropriate, lightweight reversible actions may use an Undo toast.

Example:

`Lore Card moved to Trash — Undo`

Irreversible or destructive operations still require explicit confirmation.

## Long-running operations

Operations such as:

- Create Backup;
- Restore;
- large PDF generation;
- Package with Images;

should show meaningful progress.

Example stages:

- Scenario data;
- Lore Cards;
- Images;
- Archived Images;
- Finalizing.

The UI must remain responsive.

## Cancel behaviour

Only show `Cancel` when cancellation is actually supported and safe.

If an operation reaches a critical non-interruptible stage, replace Cancel with a clear status such as:

`Finishing restore — please wait`

Do not provide decorative Cancel buttons that fail to cancel.

## Local-first error language

The v1 application is local-first.

Typical errors concern:

- filesystem permissions;
- disk space;
- SQLite;
- ZIP handling;
- PDF generation;
- invalid structured data;
- missing files.

Do not display network-related language unless a future feature genuinely uses the network.

## Disk-space feedback

When possible, explain insufficient disk space with useful numbers.

Example:

`Not enough disk space to create this backup.`

`Required: approximately 2.1 GB`
`Available: 740 MB`

## Missing managed files

When a managed image cannot be found, identify the expected asset and path.

Useful actions may include:

- Locate File;
- Open Images Folder.

Do not silently remove the visual record.

## Save failures

If Scenario data cannot be saved:

- keep current editor content available;
- clearly state that persistence failed;
- provide Retry;
- provide technical details only as secondary information.

Do not eject the user from the editor.

## Closing with unsaved failed state

If persistence has failed and closing may lose work, show a blocking warning with explicit options such as:

- Return to App;
- Retry Save;
- Close Anyway.

`Close Anyway` must be visually and textually identified as potentially destructive.

## Unexpected shutdown recovery

After an abnormal shutdown, the application should validate persisted Scenario state.

If the state is intact, report that clearly and allow normal continuation.

If recent data may require review, identify the affected area where possible rather than using vague alarming language.

## Terminology consistency

Use stable terminology throughout the application.

Examples:

- `Restore`
- `Trash`
- `Delete Permanently`
- `VISUAL CANON`
- `Connection`

Do not alternate between near-synonyms for the same operation.

## Message-writing rule

Prefer:

**What happened → consequence → available action**

Example:

`The backup is missing 2 images. Scenario data is still valid. You can restore with missing visuals or cancel.`

Keep explanations concrete and concise.

## Notification Center

A dedicated notification center, bell icon, inbox or read/unread notification history is out of scope for v1.

Persistent relevant information should live in the appropriate Scenario, validation or history context instead.

## Canonical v1 principles

- **Inline status for continuous state.**
- **Toasts for lightweight non-blocking success feedback.**
- **Warnings for non-blocking issues.**
- **Dialogs only for decisions, destructive actions or blocking failures.**
- **Concrete errors replace generic failure language whenever possible.**
- **Explicit action labels replace Yes/No where practical.**
- **Validation points directly to affected fields or records.**
- **Long-running operations show meaningful progress.**
- **Cancel is shown only when cancellation is real and safe.**
- **Technical details are available but secondary.**
- **No Notification Center in v1.**
- **Terminology remains consistent across the product.**

---

# 49. Explicitly Out of MVP Scope

Do not build in v1:

- in-application image generation;
- image-generation API integration;
- user accounts;
- cloud synchronisation;
- cloud backup;
- multi-user collaboration;
- mobile application;
- macOS/Linux distribution;
- direct Fiction Lab API integration;
- Fiction Lab authentication or embedded login;
- Fiction Lab scraping/browser automation;
- direct Fiction Lab export/publishing/synchronization;
- automatic ChatGPT API integration;
- semantic AI compression;
- automatic rewriting;
- advanced graph visualisation;
- full Git-like version history;
- Markdown import;
- automatic Scenario Architect output parsing;
- automatic backup scheduling;
- automatic cleanup;
- automatic application updater;
- Notification Center;
- custom accent colours;
- plugin marketplace;
- publishing/community features.

Deferred items may be reconsidered only through an explicit later-phase decision.

---

# 49A. Accessibility & Keyboard v1

Accessibility is part of the default interface and is not a separate special mode.

The application must support complete primary workflows through:

- mouse;
- keyboard;
- a combination of both.

No essential function may require hover, drag-and-drop, hidden gestures, memorized icon meanings or obscure keyboard shortcuts.

## Visible focus

Keyboard focus must always be clearly visible.

Focus indicators should:

- be easy to distinguish in both Light and Dark themes;
- not rely on subtle colour changes alone;
- remain visible around buttons, fields, tabs, menus and interactive cards.

## Predictable focus order

Tab order should follow the visible interface structure.

Recommended conceptual sequence:

1. top-level controls;
2. primary navigation;
3. current main content;
4. primary actions;
5. contextual/secondary controls.

Dialogs must trap focus while open.

When a dialog closes, focus should return to the control that opened it whenever practical.

## Skip navigation

Large workspace views should provide keyboard-accessible skip navigation to the main content area so users do not need to traverse the entire sidebar repeatedly.

## Keyboard shortcuts

Keep the shortcut set intentionally small and conventional.

Recommended v1 shortcuts:

- `Ctrl + S` — Save
- `Ctrl + F` — Search current area
- `Ctrl + Shift + F` — Global Search
- `Ctrl + N` — New item in the current context
- `Ctrl + Z` — Undo
- `Ctrl + Y` or `Ctrl + Shift + Z` — Redo
- `Esc` — close temporary UI / exit Focus Mode where appropriate
- `Enter` — activate focused primary control

`Ctrl + N` is contextual:

- Library → New Scenario
- Lore → New Lore Card
- Connections → New Connection

All shortcut actions must also remain available through visible controls.

## Standard editing shortcuts

Do not hijack common text-editing shortcuts.

Within text fields, standard actions must behave normally, including:

- `Ctrl + A`
- `Ctrl + C`
- `Ctrl + V`
- `Ctrl + X`
- `Ctrl + Z`

## Escape hierarchy

`Esc` should behave consistently:

1. close an open dropdown;
2. close a contextual drawer;
3. close a cancelable dialog;
4. exit Focus Mode;
5. otherwise do nothing destructive.

`Esc` must never delete content or unexpectedly leave the Scenario.

## Drag-and-drop alternatives

Drag-and-drop may be supported for convenience but must never be the only method.

Provide visible alternatives such as:

- Move Up;
- Move Down;
- Move to Position;
- Choose Image.

For example, an image drop zone must also provide a `Choose Image` action.

## Control target size

Desktop controls should remain comfortably clickable.

Avoid tiny icon-only targets for important actions.

Important actions should generally use icon + text where appropriate.

## Typography and scaling

Use a highly legible mainstream sans-serif typeface.

Avoid experimental or decorative typography for interface text.

Important information must not be rendered at very small sizes.

The interface must support text/UI scaling without:

- clipping labels;
- overlapping controls;
- hiding actions;
- introducing unnecessary horizontal scrolling.

v1 QA must verify usability at **150% scaling minimum**.

Higher scaling support should be pursued where feasible.

## Reading width

Long-form Reader Mode content should use controlled line length rather than filling an ultrawide display.

Target a comfortable reading width broadly equivalent to approximately 65–85 characters per line depending on selected text size.

## Spacing

Use enough whitespace to separate conceptual blocks without creating excessive scrolling.

The target is comfortable density rather than either cramped form layouts or oversized sparse SaaS layouts.

## Text alignment

Long-form text is left aligned.

Do not use full justification.

## Capitalization

Avoid routine ALL CAPS in interface language.

Workflow terms such as `CANON CLOSED` and `VISUAL CANON` may preserve their established naming.

## Icons

Use familiar icons as reinforcement.

Important actions should normally pair iconography with visible text.

Tooltips may explain secondary icons or specialized concepts but must not contain the only critical explanation.

## Colour

Colour may reinforce state but must never carry meaning alone.

Pair colour with:

- text;
- iconography;
- accessible labels.

Examples:

- `Warning`
- `Saved`
- `Error`

must remain understandable without colour.

## Themes

Light and Dark themes must be intentionally designed rather than produced through simple colour inversion.

Both themes must preserve:

- adequate contrast;
- visible field boundaries;
- clear focus states;
- readable disabled states;
- clear warnings/errors.

## Reduce Motion

`Reduce Motion` defaults to On.

When enabled:

- minimize sliding;
- avoid zoom/bounce effects;
- remove unnecessary decorative animation;
- keep transitions short and functional.

Even with Reduce Motion disabled, animation should remain restrained.

## Stable spatial layout

Primary controls should remain in consistent locations across states.

Avoid moving important actions merely because a card changes from DRAFT to CANON CLOSED or another status changes.

Stable spatial organization supports predictable navigation and memory.

## Progressive disclosure boundaries

Progressive disclosure must reduce clutter without hiding essential orientation.

Always visible where relevant:

- primary navigation;
- title/context;
- important current state;
- primary action;
- save state.

Contextual/secondary:

- advanced metadata;
- technical details;
- timestamps;
- advanced filters;
- infrequent settings.

## Plain and concrete UI language

Use direct labels and explanations.

Prefer:

`Restore Scenario`

over:

`Proceed with operation`

Prefer:

`This Lore Card has 3 Connections.`

over:

`The selected entity has dependencies.`

Prefer:

`Editing this content will reopen the card as DRAFT.`

over:

`Modification may invalidate status.`

## Confirmation consistency

Confirmation-dialog button placement and naming must remain consistent.

Prefer explicit verbs rather than Yes/No.

Destructive actions should occupy a consistent conceptual position throughout the app.

## Semantic UI implementation

Use proper semantic elements and accessibility roles from the beginning.

Examples:

- real headings;
- labelled inputs;
- real buttons;
- real lists;
- tables with headers;
- correctly identified dialogs;
- accessible state announcements.

Avoid building core interactive controls from generic unlabelled containers.

## Accessible names

Icon-only secondary controls must have accessible names, for example:

`Close dialog`

Important functions should still generally expose visible text.

## Live status announcements

State changes such as Saving → Saved may be exposed through non-intrusive accessible status announcements.

Do not announce rapidly changing counters on every keystroke.

Character-count accessibility feedback should become more prominent near or beyond a meaningful limit.

## Focus Mode orientation

Focus Mode must retain enough context to identify:

- current Scenario;
- current field/card.

Do not remove orientation so aggressively that the user can no longer tell what is being edited.

## Reader preferences

Reader Mode uses the global Reading preferences:

- text size;
- content width;
- line spacing;
- paragraph spacing.

Changes should apply immediately where practical without an unnecessary `Apply` button.

## Empty states

Empty-state language should be concrete and task-oriented.

Prefer:

`No Lore Cards yet.`
`Create your first Lore Card.`

Avoid decorative or vague copy that does not explain the next action.

## Loading states

Local operations should usually be fast.

When loading becomes noticeable:

- show a simple progress indicator or skeleton where appropriate;
- provide concrete progress text for longer operations;
- avoid indefinite unexplained spinners.

## Disabled controls

Where possible, explain why an unavailable action cannot currently be used.

Example:

`Add a final image before marking VISUAL CANON.`

Do not force the user to infer the reason from a disabled button alone.

## Required fields

Do not rely only on an asterisk.

Where needed, pair the field label with clear text such as `Required`.

Keep required fields minimal through progressive creation flows.

## Accessibility QA checklist

A release candidate should not be considered ready until the following are checked:

- primary workflows can be completed using keyboard only;
- focus is always visible;
- information does not rely exclusively on colour;
- UI remains usable at 150% scaling;
- Reader Mode preserves comfortable width;
- inputs have labels;
- dialogs trap and return focus correctly;
- `Esc` behaves consistently;
- drag-and-drop has a keyboard/button alternative;
- validation identifies affected fields;
- interface messages use concrete language;
- Light and Dark themes maintain readable contrast;
- Reduce Motion meaningfully reduces animation.

## Canonical v1 principles

- **Accessibility is the default interface, not a separate mode.**
- **Keyboard support supplements visible controls rather than replacing them.**
- **Focus, navigation order and control placement are predictable.**
- **Long-form reading uses controlled width and spacing.**
- **Important actions use explicit labels.**
- **Colour and icons reinforce meaning but never carry it alone.**
- **Drag-and-drop always has an alternative.**
- **Reduce Motion is enabled by default.**
- **The UI must remain usable at 150% scale.**
- **Accessibility receives a formal QA pass before release.**

---

# 50. Phase 2 Candidates

After MVP stability:

- visual graph of Connections;
- richer revision history;
- intermediate generated-image history beyond the managed active/archive model;
- Markdown/structured card importer, if later justified;
- automated duplicate detection;
- advanced Trigger diagnostics;
- runtime redundancy analysis;
- scenario statistics;
- configurable export templates;
- comparison between two card revisions;
- richer multi-image visual comparison;
- Scenario Architect documentation area;
- direct Project Change Log management.

---

# 50A. Design System v1

The Fiction Lab Scenario Companion uses a **Modern Editorial Workspace** visual direction.

Core personality:

- Calm
- Refined
- Clear
- Focused

The interface should feel contemporary and premium without becoming visually decorative, game-like, overly corporate, or generically SaaS.

Scenario artwork should remain the strongest visual element; the UI stays intentionally restrained around it.

## Colour system

Use semantic design tokens rather than hardcoding raw colour values throughout components.

### Light theme — proposed base

```text
Background        #F4F6F5
Surface           #FAFBFA
Raised Surface    #FFFFFF

Text Primary      #1F2929
Text Secondary    #667171
Text Muted        #8A9494

Border            #D9DFDE
Border Strong     #BEC8C6
```

### Dark theme — proposed base

```text
Background        #171C1C
Surface           #1D2424
Raised Surface    #252D2D

Text Primary      #EEF2F1
Text Secondary    #B5C0BE
Text Muted        #879492

Border            #35403F
Border Strong     #465351
```

These values are design-system defaults and may be tuned during implementation/visual QA without changing the product direction.

## Primary accent

Use a deep desaturated teal family.

Proposed base accent:

```text
Primary Accent
#34777A
```

Create semantic variants such as:

- Accent Hover
- Accent Active
- Accent Soft
- Accent Border

Do not use unrelated accent families for routine navigation.

## Semantic colours

Provide restrained semantic families for:

- Success
- Warning
- Error
- Info

Semantic colour never carries meaning alone; pair it with text and/or iconography.

## Typography

Primary UI typeface:

**Segoe UI Variable**

Fallback:

```text
"Segoe UI Variable", "Segoe UI", system-ui, sans-serif
```

Recommended scale:

```text
Page Title          28px / Semibold
Section Heading     21px / Semibold
Subsection Heading  17px / Semibold
Body                15px / Regular
Comfortable Body    16px / Regular
Secondary           14px / Regular
Metadata            13px / Regular
Small               12px / Regular
```

Essential information must not rely on the smallest text size.

Reader Mode may use approximately 16–18px according to Reading preferences.

## Line height

Recommended targets:

```text
UI labels       ~1.35
Body            ~1.5
Reader content  ~1.6
```

## Spacing

Use a 4px-based spacing system:

```text
4
8
12
16
20
24
32
40
48
64
```

Prefer a small consistent subset such as 16 / 24 / 32 for most layout work.

## Corner radius

Recommended values:

```text
Small controls       6px
Inputs / Buttons     8px
Cards               10px
Large Cards         12px
Dialogs             14px
```

Avoid oversized pill-shaped surfaces except where pill/badge semantics genuinely apply.

## Shadows and elevation

Use minimal elevation.

Recommended conceptual levels:

- `shadow-sm` — dropdowns/popovers
- `shadow-md` — dialogs/floating surfaces

Normal cards should rely primarily on surface contrast and subtle borders rather than heavy shadows.

## Buttons

v1 uses four primary button roles:

### Primary
Main action for the current context.

Examples:
- Create Scenario
- Create Backup
- Export

### Secondary
Supporting action.

Examples:
- Preview
- Replace Image
- Open Lore

### Ghost
Low-emphasis action.

Examples:
- Cancel
- Open Folder
- View Details

### Destructive
Reserved for truly destructive actions.

Example:
- Delete Permanently

Avoid introducing many stylistic button variants.

Recommended heights:

```text
Small      32px
Default    38–40px
Large      44px
```

## Inputs

Default single-line input height should be approximately 40px.

Standard structure:

```text
Label
[ Input ]
Helper / Validation
```

Supported states:

- Default
- Hover
- Focus
- Disabled
- Error

Focus must include a clearly visible border/focus ring.

## Search

Search uses a dedicated search component with:

- search icon;
- placeholder text;
- clear action when populated;
- keyboard behaviour consistent with the rest of the app.

## Select and MultiSelect

Selected values must remain readable and not rely on colour alone.

Large controlled vocabularies such as Traits and Connection destinations should support search.

## Tabs

Use restrained editorial tabs, preferably text with clear selected underline/accent.

Avoid oversized pill-tabs.

## Sidebar

Recommended expanded width:

**approximately 232px**

Items use:

- small consistent icon;
- visible text;
- subtle selected background/accent.

Collapsed sidebar may be supported at approximately 64px.

Default remains expanded for clarity and accessibility.

The application remembers the user's preference.

## Scenario Library cards

Library cards should include:

- cover;
- Scenario Name;
- short description;
- Scenario Status;
- concise metadata;
- tags where useful;
- last edited information.

Use subtle borders and raised surfaces.

Hover may strengthen border/surface contrast but must not use zoom animation.

## Lore list items

Lore entries should be denser than Scenario cards while remaining readable.

Show only useful scan information such as:

- title;
- Type;
- Weight;
- Text Canon Status;
- concise relationship/trait metadata;
- updated information.

## Badges

Use badges intentionally.

Primary categories:

- Neutral metadata badge;
- Status badge;
- Warning/problem badge.

Avoid turning all metadata into badges.

## CANON visual language

Finalized states such as:

- `CANON CLOSED`
- `VISUAL CANON`

may use a restrained confirmation indicator such as a checkmark plus label.

Do not use celebratory effects, glow, trophies, gradients or game-like achievement styling.

## Tables

Connections and other truly tabular information remain real tables.

Requirements:

- clear headers;
- comfortable row height;
- visible selected row;
- subtle hover;
- accessible table semantics.

Do not replace useful tables with decorative card grids.

## Dialogs

Recommended widths:

```text
Small      ~420px
Default    ~520px
Large      ~720px
```

Simple confirmation dialogs must not occupy the full screen.

Use consistent structure:

- title;
- concise explanation;
- optional supporting content;
- predictable action row.

## Toasts

Place toasts in a consistent low-interference location, recommended bottom-right.

Maximum visible stack remains approximately 3.

## Contextual drawers

Recommended default width:

**approximately 360px**

May expand modestly when content genuinely requires it.

Do not consume half the workspace for routine metadata.

## Tooltips

Use a short appearance delay.

Tooltips are for secondary explanation, icon clarification and shortcuts.

Critical information must not exist only inside a tooltip.

## Empty states

Use typography and simple restrained iconography.

Do not use generic stock illustrations or decorative onboarding art.

## Scroll behaviour

Keep scrollbars available when useful.

Sticky headers/tabs may be used where they improve orientation.

Avoid nested scroll regions wherever possible.

## Responsive desktop behaviour

Target Windows desktop layouts.

Suggested breakpoints:

### Wide
`≥ 1440px`

### Standard
`1024–1439px`

### Narrow desktop
`800–1023px`

Recommended comfortable minimum:

**1280×720**

Technical hard minimum target:

**approximately 800×600**, subject to implementation testing.

At narrow sizes, sidebar collapse/compact behaviour may be used.

## High-DPI support

Design for normal Windows scaling such as 125% and 150%.

Avoid rigid component heights that clip scaled text.

## Iconography

v1 uses one consistent outline icon family.

Preferred library:

**Lucide**

Do not mix multiple icon libraries without a concrete need.

## Brand mark

The eventual app icon/logo should conceptually relate to:

- document/card;
- context/connection.

Avoid generic AI imagery such as:

- robot heads;
- brains;
- magic wands;
- sparkle-heavy AI symbols.

Detailed brand asset design may occur outside the PRD.

## Theme options

v1 supports:

- System
- Light
- Dark

Custom Accent Color is out of scope for v1.

## Interaction states

Every reusable interactive component must define appropriate states:

- Default
- Hover
- Focus
- Pressed
- Disabled
- Error where applicable

## Token architecture

Organize design tokens into domains such as:

```text
colors
typography
spacing
radius
shadow
motion
z-index
sizes
```

Components should consume semantic tokens rather than raw palette values.

Example:

Use:

`color.action.primary`

rather than directly consuming:

`color.teal.600`

This improves Light/Dark theming and future maintenance.

## Base component library

Recommended reusable primitives:

- Button
- IconButton
- TextInput
- TextArea
- SearchInput
- Select
- MultiSelect
- Checkbox
- Radio
- Switch
- Tabs
- Badge
- Card
- Table
- Dialog
- Drawer
- DropdownMenu
- Tooltip
- Toast
- Banner
- Progress
- EmptyState
- Breadcrumbs
- ContextMenu
- FilePicker
- ImageViewer

Recommended domain components:

- ScenarioCard
- LoreCardRow
- CanonBadge
- VisualStatusBadge
- CharacterCounter
- ConnectionRow
- VisualTile
- PromptHistory
- ValidationSummary
- SaveStatus

## Component consistency rule

The same concept should use the same component semantics throughout the application.

Examples:

- `CANON CLOSED` should not appear as a badge in one place and a toggle in another.
- Weight should use the same controlled selector pattern wherever editable.
- Scenario Status should not switch unpredictably between unrelated control types.

Consistency is preferred over local visual novelty.

## Canonical v1 principles

- **Style: Modern Editorial Workspace.**
- **Personality: Calm · Refined · Clear · Focused.**
- **Typeface: Segoe UI Variable.**
- **Iconography: Lucide.**
- **Accent: deep desaturated teal.**
- **Spacing: 4px scale.**
- **Radius: moderate 6–14px.**
- **Shadows: minimal.**
- **Surfaces: neutral and layered.**
- **Themes: System / Light / Dark.**
- **Comfortable density by default; Compact optional.**
- **No custom accent colour in v1.**
- **No decorative gradients as a core UI language.**
- **No oversized generic dashboard cards.**
- **No essential icon-only actions.**
- **No nested-scroll complexity where avoidable.**
- **The same concept keeps the same component semantics across the product.**

---

# 51. Phase 3 Candidates

Only if justified later:

- optional AI-assisted text review;
- optional ChatGPT API integration for non-image review only, if ever justified;
- optional AI-assisted scenario validation assistant;
- automated runtime-compression suggestions;
- richer visual analytics;
- optional encrypted cloud backup, only if explicitly approved in a future product phase.

These are intentionally excluded from early development.

---

# 52. Primary User Workflows

## Workflow A — Create a Scenario

1. Open Scenario Library.
2. Select `New Scenario`.
3. Enter Scenario Name, optional Description/Cover and up to 5 Tags & Genres.
4. Create.
5. Open Scenario Workspace.

## Workflow B — Develop Story

1. Open Story.
2. Choose Backstory / Greeting / Custom Scenario Instructions.
3. Edit in the shared plain-text editor.
4. Observe local count and hard-limit validation where applicable.
5. Autosave persists changes.
6. Use Reader or Focus Mode as needed.

## Workflow C — Create and Develop a Lore Card

1. Select `New Lore Card`.
2. Choose Type, Title, Internal Category and Weight.
3. Create card; it begins as DRAFT.
4. Fill official content fields and optional Companion metadata.
5. Add Traits only for Character cards.
6. Observe local counts and validation.
7. Add Connections when architecturally appropriate.
8. Move to READY FOR PLATFORM CHECK when ready.
9. Manually verify in Fiction Lab outside the Companion if desired.
10. Record the platform check/count locally.
11. Mark CANON CLOSED when approved.

## Workflow D — Add a Connection

1. Open Connections or a Lore Card's Connections tab.
2. Select Origin.
3. Select Destination.
4. Companion excludes invalid/already-connected pairs.
5. Choose status and optional Reason.
6. Create the single directional Connection.
7. Destination automatically shows the same record as Incoming.

## Workflow E — Build Visual Lineage

1. Open a Lore Card's Visual tab.
2. Add/edit the single Creation Prompt.
3. Append Refinement Prompts in real sequence.
4. Generate/refine images externally.
5. Add the chosen image to the Companion.
6. Companion copies it into managed Scenario storage.
7. Explicitly mark the active image VISUAL CANON when approved.
8. If later replaced, the old managed image moves automatically to `images/archive/` and the new image returns to IN PROGRESS.

## Workflow F — Create Documentation for Scenario Architect

1. Open Exports.
2. Choose `Scenario Architect Review`.
3. Preview the included sections.
4. Optionally Customize.
5. Export Markdown or PDF.
6. For a portable Markdown bundle, choose `Package with Images`.
7. Use the resulting local file/package wherever needed.

No step sends or synchronizes data to Fiction Lab.

## Workflow G — Create a Backup

1. Choose `Create Backup`.
2. Review Scenario, included data, estimated size and managed destination.
3. Create the complete ZIP.
4. Companion validates the finished archive.
5. Keep/delete backup manually as desired.

## Workflow H — Restore a Backup

1. Choose a managed or external compatible backup ZIP.
2. Companion validates the package before changing data.
3. Resolve identity conflict if present.
4. Choose Restore as Copy or Replace Existing for same-ID conflicts.
5. Replace Existing creates a safety snapshot first.
6. Restore occurs through staging and commit.
7. Review any recoverable warnings.
8. Open restored Scenario.

---

# 53. Acceptance Criteria for MVP

The MVP is functionally acceptable when the user can, on Windows:

- install and launch the Companion locally;
- create, rename, Favourite, archive, Trash, restore and permanently delete Scenarios with the defined safeguards;
- reopen the application without losing successfully saved data;
- use Scenario Main Details and all three Story fields;
- select Free / Plus / Ultra as the Scenario's Fiction Lab Target Plan and see applicable limits update without content loss;
- create/edit/duplicate/Trash/restore every supported Lore Type;
- use the official controlled Tags, Traits and Weight values;
- see accurate local character counts against the selected plan profile and manually store Fiction Lab verification counts;
- distinguish Text Canon and Visual Canon states;
- edit a CANON CLOSED official field and see it reopen to DRAFT;
- create `A → B` and be prevented from creating either duplicate `A → B` or reverse `B → A`;
- see Incoming and Outgoing as two views of one Connection record;
- use Deferred/Affected/Inactive Connection states;
- search/filter/sort Lore content and use manual Lore ordering;
- store one Creation Prompt and ordered Refinement Prompts;
- add, replace, archive and inspect managed images;
- explicitly approve VISUAL CANON;
- compare two visuals manually;
- use Reader and Focus behaviour where specified;
- export a Lore Card to local PDF;
- generate all three Scenario documentation profiles;
- generate Markdown `Package with Images`;
- create and verify a complete manual backup ZIP;
- Restore as Copy;
- Replace Existing only after safety snapshot creation;
- recover from missing optional visual assets with clear warnings where permitted;
- use core workflows by keyboard;
- use the application at 150% Windows scaling without losing access to essential controls;
- receive clear inline/toast/warning/dialog feedback according to severity;
- recover safely from the principal edge cases defined in Section 53A;
- complete all of the above without Fiction Lab API/login/synchronization or in-app image generation.

---

# 53A. Edge Cases & Recovery Behaviour v1

The MVP must define predictable behaviour for common Windows/local-data failures.

## Duplicate Scenario names

Scenario display names do not have to be globally unique.

When two Scenarios normalize to the same filesystem folder name:

- keep each Scenario's display name;
- generate a collision-safe managed folder name;
- never merge folders automatically;
- preserve identity through `scenarioId`.

## Invalid Windows filenames

Scenario/Card names may contain characters unsuitable for filenames.

The filesystem layer must sanitize only the managed filename/path representation.

Do not silently rewrite the Scenario/Lore title shown in the application.

## Windows reserved names

Handle names such as:

- CON
- PRN
- AUX
- NUL
- COM1–COM9
- LPT1–LPT9

by generating a safe managed folder/file representation.

## Rename failure

If a Scenario rename succeeds in the database but the filesystem move cannot safely complete, the operation must not leave a half-renamed Scenario.

Use staged rename/rollback behaviour.

If a file lock prevents rename:

- keep the existing managed folder;
- retain the intended display-name change only if the mapping remains valid;
- clearly report the filesystem problem;
- offer Retry / Open Folder where useful.

Prefer an atomic all-or-nothing user-visible result.

## Files locked by another application

If Windows reports a managed image, export or backup as locked:

- do not force-delete or corrupt it;
- explain which file is locked;
- allow Retry;
- allow Open Folder.

## Disk full

Before large operations where size can be estimated, check free space.

Affected operations include:

- backup;
- restore;
- Package with Images;
- image import;
- large PDF export;
- data-root migration.

If space is insufficient:

- stop before destructive commit;
- preserve current Scenario state;
- report required/available space when known.

## Database cannot open

If `companion.db` cannot be opened:

- do not initialize an empty replacement database over the same path;
- keep the original file untouched;
- show a recovery-oriented error;
- offer Open Data Folder / Retry / technical details.

Creating a fresh database must be an explicit recovery choice, not an automatic fallback.

## Database migration failure

If a schema migration fails:

- rollback when possible;
- block normal editing on the partially migrated database;
- preserve the original database;
- provide technical details;
- never continue as though migration succeeded.

## Database integrity concern

If SQLite reports an integrity/open problem:

- enter a restricted recovery state;
- avoid destructive automatic repair;
- offer validation/recovery guidance;
- allow access to backups where possible.

## Save failure while editing

Keep unsaved editor text in memory.

Do not replace it with older database content while the failing editor remains open.

Provide Retry and prevent destructive navigation where loss would occur.

## Abnormal application shutdown

On next launch:

- open/check the database;
- inspect OperationJournal/staging markers;
- remove only clearly safe temporary debris;
- resume or rollback only operations with an explicitly supported recovery path;
- otherwise explain what needs review.

## Image source disappears before import completes

Because import copies the source:

- validate source readability before committing the managed image record;
- if copy fails, keep current image state unchanged;
- do not create a dangling ACTIVE image record.

## Managed active image disappears from disk

Keep the database visual record.

Set/surface the image as `MISSING`.

Provide:

- Locate File;
- Open Images Folder;
- Replace Image.

Do not silently mark the visual NOT STARTED or delete prompt history.

## Archived image disappears

Surface a warning in visual/storage validation.

Do not invalidate the active VISUAL CANON image merely because an archived historical file is missing.

## Unsupported image format

Reject the image before managed copy where possible.

Explain supported formats.

Do not rename an unsupported binary extension and pretend it is valid.

## Corrupt/unreadable image

Do not replace the current active image until the candidate image has passed basic readability validation.

## Export destination conflict

Managed export filenames use collision-safe suffixes.

Never silently overwrite an existing export.

## Export failure mid-generation

Write to a temporary output path first.

Only rename/move to the final filename after successful generation.

Clean safe temporary output on failure.

Existing prior exports remain untouched.

## PDF renderer failure on one image

If a required image cannot be embedded:

- identify the image;
- allow the user to return and fix it;
- where profile semantics permit, optionally export without that optional image only after explicit user choice.

Do not silently omit it.

## Backup creation interrupted

Build backups into a temporary file.

Only expose/rename the final `.zip` after validation succeeds.

An interrupted temporary archive is not shown as a valid backup.

## Restore interrupted

Restore uses staging and commit boundaries.

Before commit:
- current Scenario remains unchanged.

During Replace Existing:
- pre-restore safety snapshot already exists;
- if commit fails, use rollback/recovery workflow rather than silently mixing versions.

## Restore with same ID

No merge.

Offer:
- Restore as Copy;
- Replace Existing.

## Restore with same display name but different ID

Treat as a different Scenario and produce a collision-safe restored name/path.

## Corrupt backup

Block if required structured data is invalid.

Allow warning-based restore only for explicitly non-critical missing assets as already defined.

## ZIP bomb / malicious archive

Restore must enforce safety limits where practical:

- normalized extraction paths;
- no traversal outside staging;
- reject unreasonable entry/path behaviour;
- avoid blindly allocating memory from claimed archive sizes.

## Data-root move

Changing the application data folder is a managed migration.

Required flow:

1. validate destination;
2. check available space;
3. ensure destination is writable;
4. copy/stage data;
5. verify database and managed files;
6. switch configured root;
7. only then remove old managed copies after explicit safe completion.

A failed migration leaves the old root authoritative.

## Scenario folder manually moved by user

Because the application manages Scenario folders, manual external moves can break the mapping.

If expected folder is missing:

- do not create an empty replacement automatically;
- surface Missing Managed Folder;
- allow Locate Folder / Restore from Backup / Open Data Folder.

## User manually edits `scenario.json`

The database remains authoritative.

External changes to `scenario.json` are not automatically imported.

The next managed mirror refresh may overwrite manual edits.

The application should document this clearly.

## User manually edits export files

Exports are outputs.

Manual changes do not update the Scenario database.

## User manually deletes export or backup file

The app refreshes the local file listing and removes the missing output from Recent Exports/Backups display.

No Scenario content changes.

## Large Scenario

For very large Scenarios:

- virtualize long lists when needed;
- avoid loading all full-resolution images;
- indexed search;
- asynchronous heavy operations;
- no whole-Scenario JSON regeneration on every keystroke.

## Many prompts / long text

Editors remain plain text.

Rendering should not mount every long prompt body in the visual gallery; use collapsed/history rows and load prompt content on demand.

## Very long filenames after slugging

Enforce a safe managed filename length and append a stable collision suffix when needed.

The UI title remains complete.

## Scaling / small window

At 150% Windows scaling and narrow supported window sizes:

- important actions remain reachable;
- drawers/dialogs fit or scroll internally in one controlled region;
- no essential horizontal-scroll-only action placement.

## Theme switch during editing

Theme changes must not:

- remount editors in a way that loses selection or undo history;
- discard unsaved local state;
- reset navigation.

## App update with existing data

Startup migration occurs before normal editing.

Never require the user to recreate Scenarios because of a normal app update.

## Canonical v1 principles

- **Never replace missing/corrupt user data with empty defaults silently.**
- **Stage destructive filesystem operations before commit.**
- **Database remains authoritative over managed mirrors/exports.**
- **Missing files are surfaced, not silently erased from history.**
- **Failures preserve the last known good state whenever possible.**
- **Windows filename/path rules are handled by the storage layer, not pushed onto the user's creative titles.**

---

# 54. Main Risks

## Risk 1 — Scope explosion

Because the tool can naturally expand into AI generation, graph visualisation, version control and cloud services, the project may become too large before producing a useful version.

Mitigation:

Keep MVP focused on local Scenario management, Story/Lore/Connections/Visual lineage, documentation export and manual Backup/Restore.

## Risk 2 — Fiction Lab interface changes

Platform limits may change.

Mitigation:

Store configurable limits rather than hardcoding assumptions throughout the application.

## Risk 3 — PDF becomes the primary data format

PDF is excellent for reading but poor as the application's source of truth.

Mitigation:

SQLite remains authoritative. `scenario.json` is a managed mirror; PDF/Markdown are outputs only.

## Risk 4 — Linked Piece confusion

Directionality can be misunderstood.

Mitigation:

Store only Origin → Destination and derive Incoming backlinks automatically.

## Risk 5 — Too much UI

Displaying every field, warning and feature simultaneously may make the application harder to use than Fiction Lab.

Mitigation:

Use progressive disclosure and separate Editor / Reader modes.

---

# 55. Decision Register

Resolved:
- **Technical architecture:** Tauri 2 + React + TypeScript + Vite + SQLite with Rust-owned domain/filesystem boundary.
- **State architecture:** query-cache for persistent data; small separate ephemeral UI state.
- **Storage authority:** SQLite database is authoritative; `scenario.json` is a managed mirror.
- **Search:** local indexed full-text strategy / SQLite FTS5.
- **Windows packaging:** NSIS primary installer.
- **Edge cases/recovery:** staged destructive operations and last-known-good-state preservation.
- **Design System:** Modern Editorial Workspace with Calm / Refined / Clear / Focused visual personality.
- **Typography:** Segoe UI Variable.
- **Iconography:** Lucide for v1.
- **Primary accent:** deep desaturated teal.
- **Themes:** System / Light / Dark; no custom accent colours in v1.
- **Component system:** semantic tokens plus a small reusable primitive/domain component library.
- **Accessibility & Keyboard:** accessibility is the default UI, with complete keyboard-capable primary workflows.
- **Accessibility scaling:** v1 QA minimum target is usable layout at 150% scaling.
- **Motion:** Reduce Motion enabled by default; animations remain restrained.
- **Drag-and-drop:** convenience only; every essential drag/drop action has a visible alternative.
- **Accessibility QA:** formal pre-release checklist required.
- **Feedback hierarchy:** inline status / toast / warning / modal according to severity and required action.
- **Error messaging:** concrete cause-first wording with technical details secondary.
- **Validation UX:** field-level messages plus navigable summaries; avoid aggressive validation while typing.
- **Notification Center:** excluded from v1.
- **Long-running operations:** meaningful progress; Cancel only when genuinely supported.
- **Story Editor UX:** shared plain-text editor architecture for Backstory, Greeting and Custom Scenario Instructions.
- **Story modes:** Edit / Reader / Focus.
- **Story editing:** plain text only in v1; rich formatting stripped on paste.
- **Story lifecycle:** no separate CANON status per Story field in v1.
- **Story save behaviour:** autosave with persistent state text and non-destructive failure handling.
- **Scenario Status:** Draft / In Development / Ready for Review / Complete / Archived.
- **Scenario Status control:** manual and independent from Lore Card Text/Visual CANON states.
- **Overview:** state-focused summary with Needs Attention, Recently Edited, concrete progress counts and limited quick actions.
- **Scenario completion display:** no single percentage; use real state counts.
- **Archived Scenario:** organizational only; remains searchable, viewable and exportable.
- **Settings v1:** General / Appearance / Accessibility / Reading / Fiction Lab Reference / Exports / Backups / Storage / About.
- **Settings philosophy:** good defaults and limited meaningful configuration; no Settings search required in v1.
- **Mandatory confirmations:** Permanent Delete and Replace Existing cannot be disabled.
- **Automatic cleanup:** excluded from v1.
- **UI preference reset:** never modifies Scenario data, images, backups, limits or CANON state.
- **Backup & Restore:** v1 workflow defined with complete manual backups and staged validation-first restore.
- **Restore merge:** excluded from v1; same-ID conflicts offer Restore as Copy or Replace Existing.
- **Safety snapshot:** Replace Existing automatically creates a pre-restore safety ZIP before destructive replacement.
- **Backup contents:** include active and archived managed images.
- **Backup retention:** no automatic deletion or retention schedule in v1.
- **Verify Backup:** standalone integrity check supported.
- **Exports Workspace:** three fixed local documentation profiles with preview and secondary customization.
- **Scenario Architect Review:** Markdown-first and supports optional `Package with Images` ZIP.
- **Export formats:** Markdown and PDF; JSON remains backup/structured data.
- **Export storage:** managed `exports/markdown/` and `exports/pdf/` folders.
- **Export naming:** predictable filenames with collision-safe numbering; never silently overwrite.
- **Export side effects:** none; exporting never changes CANON or Scenario state.
- **Lore export ordering:** persistent user-defined Lore order, with Pinned items surfaced first.
- **Visuals Workspace:** gallery-based local visual management linked to Lore Cards.
- **Visual lineage:** one Creation Prompt, ordered Refinement Prompts and one active final image per Lore Card.
- **Visual approval:** image addition/replacement never automatically creates VISUAL CANON; approval is explicit.
- **Image replacement:** previous managed image is automatically preserved in `images/archive/`.
- **Visual validation:** structural/file-state checks only; no artistic judgement or automatic image analysis.
- **Visual comparison:** simple two-item manual comparison is included in MVP; advanced comparison is deferred.
- **Connection Ledger v1:** one pair / one direction / one record, with Active / Deferred / Affected / Inactive states.
- **Connection direction changes:** explicit Reverse Direction action only.
- **Connection Trash behaviour:** preserve affected architecture and previous status; never silently destroy links.
- **Connection graph:** not required for MVP; Phase 2 consideration only.
- **Connection Reason:** optional but encouraged to preserve retrieval rationale.
- **Companion boundary:** no direct Fiction Lab export, synchronization, publishing, automation or API integration; the app remains local companion tooling only.
- **Lore Card creation:** short focused creation dialog followed by the full editor.
- **Lore Card lifecycle:** separate Text Canon and Visual Canon states with optional platform verification.
- **CANON CLOSED edits:** official Fiction Lab field changes reopen Text Canon to DRAFT; internal metadata changes do not.
- **Lore Card duplication:** copies reusable content/metadata but not Linked Pieces, final image or VISUAL CANON; duplicate begins DRAFT / NOT STARTED.
- **Lore Card deletion:** moves to Trash; associated Connections are preserved but marked inactive/affected until Restore or permanent deletion.
- **Visual approval:** adding an image does not automatically create VISUAL CANON; approval is explicit.
- **Platform check:** Fiction Lab interface count remains authoritative over local counting.
- **Scenario Library:** visual Grid default with optional List view, immediate search, simple filters/sorting, contextual secondary actions, Favourite and internal Trash.
- **Scenario deletion:** move to internal Trash first; Restore and Delete Permanently supported.
- **Scenario creation:** short focused form, not a multi-step wizard.
- **Scenario Workspace:** Overview / Story / Lore / Visuals / Connections / Exports.
- **Lore editing:** focused editor with Content / Visual / Connections / Details plus separate Edit and Reader modes.
- **Connections UI:** readable directional list/table is primary in v1; graph is secondary/later.
- **Workspace search:** global search with grouped results.
- **Fiction Lab limits:** centralized plan-aware configurable platform profiles; verified current values as defaults; hard limits kept separate from operational targets.
- **Fiction Lab Target Plan:** every Scenario stores Free / Plus / Ultra and uses that plan to resolve applicable platform limits; plan changes never truncate content.
- **Visual prompts in exports:** included by default in Scenario Architect Review and Full Documentation, together with final VISUAL CANON images.
- **Image storage:** managed scenario copies under `Scenario Name/images/`.
- **Scenario folder structure:** managed `images/`, `exports/pdf/`, `exports/markdown/`, `backups/`, plus structured scenario data.
- **Markdown import:** excluded from v1; Markdown export only.
- **Project Documentation / Change Log:** Phase 2.
- **Backup format:** standard ZIP with structured scenario data, managed images and metadata.
- **Backup scheduling:** manual-only in v1.
- **UI direction:** modern, accessibility-first, predictable and low-cognitive-load desktop interface.
- **Internal Categories:** fixed controlled list; no custom categories in v1.
- **Weight values:** Minor, Supplementary, Standard, Important, Critical; no custom values.
- **Application name:** Fiction Lab Scenario Companion — CANON.
- **Initial platform:** Windows-only.
- **Image generation:** external only; generation happens in Fiction Lab or ChatGPT.
- **Scenario structure:** Main Details, Backstory / World Details, Greeting and Custom Scenario Instructions are dedicated top-level Scenario fields, not special Lore Cards.
- **Main Details:** Scenario Name, Scenario Description, Scenario Cover Image, Scenario Tags & Genres.
- **Bounty / Challenge Participation:** excluded from scope.
- **Scenario Tags & Genres:** official Fiction Lab controlled vocabulary, maximum 5, no custom tags in v1.

Open implementation-blocking product decisions:

- **None.**

# 56. Finalized Implementation Decisions for v1


The principal v1 product and architecture decisions are now resolved.

Finalized implementation direction:

- **Platform:** Windows-only.
- **Application:** local-first Companion only; no Fiction Lab integration.
- **Core stack:** Tauri 2 + React + TypeScript + Vite + SQLite.
- **Backend boundary:** Rust owns structural/domain integrity and sensitive filesystem operations.
- **UI:** Modern Editorial Workspace, accessibility-first.
- **Scenario structure:** dedicated top-level Main Details / Story fields plus Lore Cards.
- **Controlled platform values:** official Types, Traits, Weights, Tags & Genres.
- **Fiction Lab Target Plan:** Free / Plus / Ultra stored per Scenario, with centralized plan-specific platform limits.
- **Internal Categories:** fixed list, no custom categories in v1.
- **Visual workflow:** external generation only; Companion stores prompt lineage and managed final images.
- **Connections:** one pair / one direction / one record.
- **Exports:** local Markdown/PDF documentation only.
- **Backup:** manual complete ZIP; destructive Replace Restore creates a safety snapshot.
- **Markdown import:** out of scope.
- **Project Documentation / Change Log management:** Phase 2.
- **Graph visualization:** Phase 2.
- **AI integration:** out of MVP.
- **Automatic backups / cleanup / updater:** out of MVP unless separately approved.
- **Design System:** semantic tokens, Segoe UI Variable, Lucide, deep desaturated teal, System/Light/Dark.
- **Installer:** NSIS primary Windows packaging target.
- **Edge-case principle:** preserve last known good state; never silently replace or erase user data.

This section is the concise decision baseline for implementation. Any future behavioural change requires an explicit PRD revision.

# 57. Suggested Development Order

1. Freeze the v1 database schema and migration `001`.
2. Freeze the versioned backup JSON schema.
3. Freeze the `ExportDocumentModel`.
4. Initialize the Tauri + React + TypeScript codebase.
5. Implement semantic design tokens and base accessible components.
6. Implement SQLite migrations/repositories/domain services.
7. Implement Scenario Library and managed storage.
8. Implement Scenario Workspace shell and Story editor.
9. Implement Lore Card lifecycle/editor.
10. Implement Connections.
11. Implement Visuals and managed image archive/cache.
12. Implement Exports.
13. Implement Backup & Restore.
14. Implement Settings, Trash and recovery surfaces.
15. Run accessibility, Windows-path, scaling and failure-mode QA.
16. Package an internal Windows build and complete acceptance testing.

Wireframes may be created during the implementation-design pass, but a separate exhaustive wireframe phase is not required before initializing the codebase because the screen-level behaviour is already extensively specified in this PRD.

---
# 58. Definition of Done for Planning Phase

The planning criteria are now satisfied:

- product name is fixed;
- Windows-only v1 target is fixed;
- MVP scope is approved;
- primary screens/workspaces are defined;
- Scenario/Lore/Visual/Connection lifecycles are unambiguous;
- controlled vocabularies are documented;
- export and backup behaviour is defined;
- accessibility requirements are defined;
- Design System direction is defined;
- technical stack and architecture are confirmed;
- data model is coherent;
- backup schema and export intermediate model are ready to freeze;
- edge-case/recovery behaviour is documented;
- final contradiction/redundancy audit is complete.

**Status: COMPLETE.**

Implementation may continue from this v3.1 Implementation-Ready baseline.

---
# 59. Current Project Position

**Current phase:** Implementation-ready.

**PRD baseline:** v3.1 IMPLEMENTATION-READY.

**Code status:** Implementation has not started.

**Major product decisions:** Resolved.

**Implementation-blocking PRD decisions:** None.

**Latest product requirement added in v3.1:** per-Scenario Fiction Lab Target Plan (Free / Plus / Ultra) with plan-aware centralized platform limits.

**Next project action:** freeze migration `001`, the v1 backup JSON schema and `ExportDocumentModel`, then initialize the Tauri + React + TypeScript codebase according to Section 57.


# Appendix A — Official Fiction Lab Scenario Tags & Genres

Captured from the Fiction Lab Scenario Tags & Genres selector during planning. **232 unique labels** were recorded.

The application must preserve these labels exactly and allow a maximum of 5 selections per Scenario.

- Anime
- Game
- Magic
- Romantic
- Action
- Parallel World
- Slice of Life
- Urban
- Historical
- Male
- Female
- RPG
- Comedy
- Furry
- Villain
- Pirate
- Novel
- Gory
- Violence
- Celebrities
- Ancient
- Sci-Fi
- Medieval
- Non-Human
- LGBTQ
- Horror
- Lover
- Platonic
- Cartoon
- Adventure
- Demon
- Angel
- Medical
- School
- Cyberpunk
- Monster
- Thriller
- Supernatural
- Martial Arts
- Crime
- Time Travel
- Holiday
- Steampunk
- Survival
- Alien
- Jungle
- Mafia
- Sports
- Apocalyptic
- Mecha
- Any POV
- Music
- Space
- Female Lead
- Male Lead
- Zombie
- Level System
- Superheroes
- Gritty
- Biopunk
- Dark Fantasy
- Male POV
- Vampire
- Aquatic
- Female POV
- Large Cast
- Isekai
- Psychological Horror
- WLW
- MLM
- Reverse Harem
- Yandere
- Dinosaurs
- Western
- Harem
- Enemies To Lovers
- Straight
- Toxic Relationship
- Friendship
- Revenge
- Betrayal
- Academia
- Allegory
- Dining
- Labor
- Beastkin
- Tsundere
- Android
- Kuudere
- Forced Character
- Kitsune
- Witchcraft
- Dragon
- Kichidere
- Nautical
- Tragedy
- Transit
- Prison
- Age Gap
- Isolation
- Noir
- Grimdark
- Religious
- Dandere
- Family
- Neko
- Dystopia
- Military
- Utopia
- Commune
- Party
- Otome
- Japanese
- Tribal
- Carnival
- Dieselpunk
- Solarpunk
- Femboy
- K-Pop
- Restaurant
- Elderly
- Regency
- Chinese
- Undead
- Racing
- Cult
- Band
- War
- Multi-Starter
- Café
- Fast-Paced
- Slow Burn
- Cozy
- Lore-Heavy
- Alt History
- Utility
- Rural / Countryside
- Whimsical
- Gothic
- Battle Royale
- Post Apocalypse
- Retro-Future
- Open World
- Scripted
- Fairy Tale
- Puzzle
- Simulator
- Eldritch
- Slavery
- Tokusatsu
- Kaiju
- Delinquent
- Demihuman
- Morbid
- Virtual World
- Stats & Progression
- Christmas
- Serialized
- Disability
- Craft
- Island
- Night Life
- Cards
- Ocean
- Law Enforcement
- Friends to Lovers
- Dungeon
- Quest
- Political
- MMO
- Slow-Paced
- American
- Objective-Based
- Mind-Control
- Time Loop
- Wrestling
- Small Town
- Wholesome
- Gods
- Detective
- Prehistoric
- Winter
- Farm/Ranch
- Secret Identity
- Underwater
- Travel
- Superpowers
- Rock
- Mythology
- Combat
- Media
- Afterlife
- Robots
- Royalty
- Scenario Collab
- Dark World
- Mixed Cast
- Love Triangle
- Elves
- Dark-Romance
- Police
- Secret Agents
- Astrology
- Punk
- Rural
- Assassin
- Escape Room
- Maids
- Slime
- Weak to Strong
- Culinary
- Transformation
- Inheritance
- Ghost
- Modern Fantasy
- Half-human
- Game Show
- Satire
- Edgy
- Hidden World
- Hidden Society
- Angst
- Food
- Aviation
- Reincarnation
- Shonen
- High Stakes
- Domestic
- Tutorial
- AI Assistant
- Realistic
- Cold War


## Resolved Export Scope

- Markdown Export is supported in v1.
- Markdown Import is out of scope for v1.

- Project Documentation and Change Log management are out of scope for MVP and planned for Phase 2.

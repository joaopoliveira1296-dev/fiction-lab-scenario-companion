# Fiction Lab Scenario Companion

Windows-only, local-first companion application for developing and managing Fiction Lab scenarios.

## Current status

Implementation scaffold initialized from **PRD v3.0 IMPLEMENTATION-READY**.

Frozen implementation contracts in this scaffold:

1. `src-tauri/migrations/001_initial.sql`
2. `schemas/backup-scenario-v1.schema.json`
3. `schemas/backup-metadata-v1.schema.json`
4. `schemas/export-document-model-v1.schema.json`
5. `src/types/export-document-model.ts`

## Architectural boundary

The Companion does **not** integrate with Fiction Lab. It does not authenticate, synchronize, publish, scrape, automate the browser, or generate images.

SQLite is authoritative. `scenario.json` is a managed mirror / reconstruction document and PDF/Markdown are local documentation outputs.

## First implementation milestone

- bootstrap Tauri database service;
- run migration `001`;
- implement Scenario repository + Scenario Library read/create flow;
- add managed data-root initialization.

## Local setup

Dependencies are declared but not installed in this generated artifact. On a Windows development machine with current Node.js and Rust/Tauri prerequisites installed:

```text
npm install
npm run tauri dev
```

Before producing a distributable build, resolve and commit exact dependency versions in the lockfiles.

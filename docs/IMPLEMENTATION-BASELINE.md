# Implementation Baseline

The following contracts are frozen for the first implementation pass:

- Database schema version: **1**
- Backup format version: **1**
- ExportDocumentModel version: **1**
- Product PRD: **v3.0 IMPLEMENTATION-READY**

Changes to these contracts after implementation begins require an explicit migration/schema version decision rather than silent edits.

## Source of truth

- SQLite: authoritative application data.
- `scenario.json`: managed structured mirror and backup reconstruction representation.
- Markdown/PDF: documentation outputs only.
- Thumbnail cache: disposable/rebuildable.

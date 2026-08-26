# STEP-FLOW BY SK AI ART — RECOVERY CHECKPOINT

Date: 2026-08-26
Repository: `serikaiart-design/Step-Flow`
Production: `https://serikaiart-design.github.io/Step-Flow/`
Branch: `main`

## Recovery instruction

If the original ChatGPT conversation is unavailable, read these files first:

1. `project-memory/MASTER_CONTEXT.md`
2. `project-memory/DECISIONS.md`
3. `project-memory/TODO.md`
4. `project-memory/SOURCES.md`
5. this `CHECKPOINT.md`

Then inspect current `main` before changing code.

## Stable baseline before memory files

Latest stable production code commit: `a8106b01ea6194a36732048fb93c185c75672709`
Message: `Load Step Flow legal and privacy content`

The project-memory commits follow that baseline and do not intentionally modify production UI logic.

## Current product state

Working/implemented:

- Main Step & Flow landing page on GitHub Pages.
- Six primary troubleshooting problem cards.
- Smart top start/search routing.
- Floating green Assistant.
- Back navigation in Assistant flows.
- Recommended-program section.
- Windows section.
- System-components section.
- Collapsible section UI.
- Program knowledge for AIDA64, CrystalDiskInfo, Snappy Driver Installer, Wise Disk Cleaner, Wise Registry Cleaner, Geek Uninstaller and other existing cards.
- Windows 11 installation/reference knowledge.
- Windows 10 Enterprise LTSC 2021 reference/caveat knowledge.
- BSOD knowledge module based on Microsoft Bug Check codes.
- Common Windows `0x800...` error knowledge.
- Plain-language Windows error interpreter.
- Colloquial-Russian and common-typo normalization for supported scenarios.
- Multi-symptom clarification before routing.
- Original-problem, observation and error-code persistence in `sessionStorage`.
- BSOD-code recurrence flow connected to the existing boot FSM.
- Required behavioral NLU regression test.
- Photo/screenshot selection UI with local preview and privacy warning.
- Rules/conditions and privacy content adapted toward Kazakhstan operation.

## Important code files

- `index.html` — main page.
- `assistant-widget.js` — main Assistant state machine / dialogue logic.
- `assistant-theme.js` — theme + supporting module loader.
- `assistant-image.js` — image-selection/preview UI; no real Vision backend yet.
- `assistant-bsod-data.js` — BSOD lookup.
- `assistant-windows-errors-data.js` — common Windows error codes.
- `assistant-error-interpreter.js` — plain-language error interpretation.
- `assistant-windows11-data.js` — Windows installation knowledge.
- `assistant-maintenance-tools-data.js` — maintenance utility knowledge.
- `assistant-activation-data.js` — activation-related knowledge/rules.
- `restore-sections.js` — restores Windows/System-components sections.
- `search-fix.js` — smart top start/search behavior.

## Verified milestone — 2026-08-26

- GitHub `FSM Safety Check`: success, including real NLU behavior assertions.
- GitHub Pages build and deployment: success.
- Production Assistant contains the new routing and BSOD context logic.
- No existing troubleshooting instruction text or static HTML/CSS/JS architecture was replaced.

## Next major work

1. Extend entity extraction for Windows version, app, device, driver and BIOS/UEFI.
2. Implement protected Vision/OCR backend.
3. Connect image analysis to structured facts and existing scenarios.
4. Add protected crash-dump/WinDbg path for recurring BSOD cases.
5. Run regression tests after each major change.

## Safety / privacy constraints

- Never put secret API keys into GitHub Pages frontend code.
- Do not request passwords, BitLocker recovery keys, product keys, banking details or other confidential data.
- Do not diagnose a failed hardware component from a stop code alone.
- Prefer reversible/read-only checks before destructive repair actions.
- Before remote image processing is activated, update privacy wording and consent flow.

## Chat preservation plan

ChatGPT itself is the working conversation, not the only backup.

Use three layers:

1. ChatGPT conversation/project for day-to-day work.
2. `project-memory/` in GitHub for durable project state and decisions.
3. Periodic official ChatGPT data export for the full raw conversation archive.

Important: this repository is public. Do **not** commit a raw private ChatGPT export here if it contains personal/private information. Store the raw export privately/offline or in a private repository. Only sanitized project-memory summaries belong in this public repo.

## Owner workflow

Routine continuation and project-level changes are generally pre-approved. Pause only for genuine owner-required actions such as payments, signatures, contracts, identity/account authorization, legal commitments or actions that require external account authority.

## Rule for future checkpoints

After a major project milestone, update this file with:

- date,
- latest stable commit,
- what changed,
- what is verified working,
- known regressions/risks,
- next task.

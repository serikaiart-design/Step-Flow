# Step & Flow — MASTER CONTEXT

Updated: 2026-08-25
Repository: serikaiart-design/Step-Flow
Production: https://serikaiart-design.github.io/Step-Flow/

## Project purpose

Step & Flow is a Russian-language Windows help site for ordinary users. The core promise is simple, safe, step-by-step troubleshooting without requiring technical expertise.

## Product principles

- One safe step at a time.
- Explain errors in plain language.
- Prefer official sources and reversible checks.
- Treat a symptom as evidence, not as a final diagnosis.
- Do not recommend destructive actions first.
- Do not ask the user to expose passwords, BitLocker recovery keys, product keys, banking information or other confidential data.
- Use local knowledge and deterministic scenarios first; escalate to a ChatGPT/AI wrapper when the local assistant is uncertain or stuck.

## Current site structure

- Hero with a smart start field.
- Problem scenarios: Windows does not start, program will not install, no internet, slow PC, something stopped working, post-Windows-install setup.
- Collapsible sections: Recommended programs, Windows, System components.
- About, Rules and conditions, Privacy, FAQ.
- Floating green Step & Flow Assistant.

## Assistant architecture

Existing main widget: `assistant-widget.js`.
Supporting modules currently include:

- `assistant-theme.js`
- `assistant-windows11-data.js`
- `assistant-activation-data.js`
- `assistant-maintenance-tools-data.js`
- `assistant-bsod-data.js`
- `assistant-windows-errors-data.js`
- `assistant-error-interpreter.js`
- `assistant-image.js`
- `restore-sections.js`
- `search-fix.js`

The assistant keeps case state/history and supports Back navigation.

## Image / screenshot direction

The UI already allows selecting a JPEG/PNG/WebP screenshot or photo and showing a local preview. The image currently remains in the browser; there is no production Vision/OCR backend yet.

Target future flow:

image -> protected Vision/OCR backend -> extracted facts -> confidence check -> local Step & Flow scenario -> AI wrapper only if necessary.

For OCR-derived error codes, ask the user to confirm the code character-for-character before making a diagnosis.

## Error knowledge

- BSOD knowledge is based on Microsoft Bug Check references.
- Common Windows `0x800...` error codes have a plain-language interpreter.
- Stop codes are treated as starting evidence, not proof of a specific failed component.
- WinDbg/crash dumps are a future advanced diagnostic layer for recurring/unclear BSOD cases.

## Legal / privacy direction

Rules and privacy content are adapted for Kazakhstan-oriented operation. Before a commercial/public legal launch, add verified owner/operator identification and a real contact for personal-data requests. Do not invent legal identity details.

## Current recovery baseline

Stable project checkpoint immediately before project-memory files: commit `308f22c2b721786c234eed6ee05b91fd7ebc18c3` (`Load Step Flow legal and privacy content`).

This document is the high-level authority for restoring project context after a chat loss.
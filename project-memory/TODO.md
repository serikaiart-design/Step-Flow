# Step-Flow by SK AI Art — TODO

Updated: 2026-08-26

## Completed on 2026-08-26

- Added baseline colloquial-Russian and typo normalization: «винда», «инет», «прога» and common variants.
- Added multi-symptom detection with one primary-problem clarification instead of guessing.
- Prevented free text inside an active case from becoming an invalid FSM state.
- Preserved the original user problem, observations and error codes in the Assistant session.
- Connected recognized BSOD codes to a saved recurrence flow that survives page refresh.
- Added behavioral NLU regression tests to the required GitHub test suite.
- Added conservative extraction of Windows version/build, known programs, devices, driver vendors, BIOS/UEFI and error codes.
- Persisted extracted facts in the current Assistant session with backward-compatible loading of older sessions.
- Added a visible saved-facts note during clarification without treating a detected entity as a diagnosis.
- Added behavioral regression tests for entity extraction and session fact merging.

## Highest priority

- Build a protected Vision/OCR backend for real screenshot/photo analysis.
- Add confidence handling for OCR and code confirmation.
- Extend recurring-BSOD routing toward a protected crash-dump / WinDbg analysis path.
- Expand the known entity catalogue only from verified user phrases and regression cases.
- Run regression tests after every assistant change.

## Assistant understanding

- Add colloquial Russian and typo normalization: «винда тупит», «комп висит», «инет отвалился» etc.
- Keep entity extraction conservative: save only recognized facts and ask when an important detail remains unknown.
- Handle multiple symptoms in one message and choose/confirm the primary issue.
- Preserve previous user facts/actions during a case.
- Ask one targeted question when confidence is low.
- Escalate to ChatGPT wrapper only after local logic is insufficient.

## Image / Vision

- Protected endpoint; no secret key in GitHub Pages.
- Validate file type and size server-side.
- OCR text and error codes.
- Detect likely active dialog / relevant screen region.
- Return structured output: platform, app, event, error text, error code, confidence.
- Confirm uncertain codes before using them.
- No unnecessary image retention.
- Add explicit consent/privacy copy when remote image processing is enabled.

## Testing set

Test at least:

- Windows 11 BSOD photo.
- `MEMORY_MANAGEMENT`.
- `WHEA_UNCORRECTABLE_ERROR` / `0x124`.
- Windows installation errors.
- Driver/device-manager errors.
- Frozen program.
- Browser/network error.
- BIOS/UEFI screen.
- Blurry photo of monitor.
- Clean desktop screenshot.
- Unknown `0x800...` code.
- Mixed request with two symptoms.

## Legal / launch

- Add verified owner/operator identity where required.
- Add a real contact for privacy/data requests.
- Re-check Kazakhstan legal/privacy requirements before commercial launch.
- Update privacy wording when Vision/OCR backend starts transmitting images.

## Maintenance

- Keep `CHECKPOINT.md` current after major work blocks.
- Update `DECISIONS.md` when architecture/product decisions change.
- Update `SOURCES.md` when a source materially affects the assistant.
- Periodically export ChatGPT data and store a private/offline archive; do not publish private chat exports in a public repository.
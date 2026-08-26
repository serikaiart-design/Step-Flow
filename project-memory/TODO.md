# Step-Flow by SK AI Art — TODO

Updated: 2026-08-26

## Completed on 2026-08-26

- Added baseline colloquial-Russian and typo normalization: «винда», «инет», «прога» and common variants.
- Added multi-symptom detection with one primary-problem clarification instead of guessing.
- Prevented free text inside an active case from becoming an invalid FSM state.
- Preserved the original user problem, observations and error codes in the Assistant session.
- Connected recognized BSOD codes to a saved recurrence flow that survives page refresh.
- Added behavioral NLU regression tests to the required GitHub test suite.

## Highest priority

- Extend entity extraction for Windows version, program, device, driver and BIOS/UEFI.
- Extend recurring-BSOD routing toward protected crash-dump / WinDbg analysis.
- Build a protected Vision/OCR backend for real screenshot/photo analysis.
- Add confidence handling for OCR and code confirmation.
- Add advanced recurring-BSOD flow using crash dumps / WinDbg.
- Run regression tests after every assistant change.

## Assistant understanding

- Add colloquial Russian and typo normalization: «винда тупит», «комп висит», «инет отвалился» etc.
- Extract entities: Windows version, program, device, error code, BSOD name, driver, BIOS/UEFI.
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
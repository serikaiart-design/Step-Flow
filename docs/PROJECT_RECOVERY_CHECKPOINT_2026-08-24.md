# Step & Flow — Project Recovery Checkpoint

Date: 2026-08-24

Purpose: recover the project quickly if the chat/session is lost. This is a distilled project handoff, not a verbatim export of private conversation.

## Product idea

Step & Flow is a Windows troubleshooting product for non-technical users. The surface must be extremely simple while the diagnostic system behind it can be sophisticated.

Primary UX:

`Что случилось?` → one question → one safe step → user result → next step.

Preferred controls: `Сделал`, `Помогло`, `Не помогло`, `Не понимаю`, plus only necessary context choices.

Do not expose internal complexity unless required to complete a step.

## Product inspirations

- B2A principle: one obvious task/action, near-zero learning curve.
- Taplink principle: complex capabilities exist as modules behind a progressively disclosed simple surface.

Applied rule: complexity belongs behind the interface.

## Core architecture

1. User describes problem in ordinary language.
2. Lightweight intent/family classification.
3. Case State Engine (deterministic FSM) owns routing.
4. Validator maps user wording/results to allowed state values.
5. Invariant/Safety Guard blocks unsafe transitions.
6. Curated Microsoft/OEM/tool knowledge supplies evidence-backed actions.
7. One step is displayed.
8. Result returns to FSM.
9. Only a true dead end is eligible for guarded GPT fallback.

LLM is not allowed to own the diagnostic workflow.

## GPT fallback rule

GPT is a fallback expert behind the scenes, not the normal user experience.

Eligible only when:
- no supported family matches after clarification;
- deterministic branch is exhausted;
- required evidence exists but no safe deterministic next state exists;
- uncertainty exceeds attempt limit;
- unusual error/device/build combination is outside curated cases.

Send a structured case packet containing: case id, family, current state, original problem, attempted steps, observations, error codes, Windows version/build, device vendor/model, and risk context.

Model output is a candidate next step only. Safety Guard validates it. Approved output becomes a normal Step & Flow card and control returns to FSM.

Never repeat already failed steps without new evidence/reason.

## Safety invariants

- Evidence before diagnosis.
- A process/module/error code is a clue, not automatically root cause.
- Prefer read-only observation before repair.
- Prefer Microsoft/native or OEM-supported paths before random third-party repair tools.
- Never jump directly to destructive recovery.
- Registry, BCD, partition, firmware and similar expert operations require a dedicated expert flow.
- Data-loss/recovery actions require explicit risk gate.
- BitLocker key requirements must be surfaced before flows that can require it.
- Smoke, sparks, burning smell or liquid exposure → STOP and power safety guidance.
- `Не понимаю` explains the current state; it must not reset the case.
- `Не помогло` must continue the same case and must not blindly repeat the same failed step.

## Knowledge/technology decisions so far

High-value Windows layers:
- Microsoft Knowledge Base / Microsoft Support / Microsoft Learn.
- Windows Error Reporting concepts and bucketing as evidence architecture inspiration.
- Get Help / native troubleshooters.
- Windows Release Health / known issue routing.
- Windows Recovery Environment (WinRE).
- Startup Repair.
- Quick Machine Recovery when capability/version supports it.
- Point-in-time / other recovery capabilities only with version/capability and risk checks.
- Surface/OEM-specific recovery through OEM-aware routing.
- Windows activation as a separate diagnostic family.
- SFC/DISM only in justified branches, not universal first steps.
- WMI/CIM for system facts; WMIC is legacy.
- Reliability History, Device Manager and Task Manager for novice-friendly evidence.
- PowerToys/Sysinternals selectively.
- ETW/WPR/WPA and ETW/WPA MCP as advanced evidence layers, not novice first steps.
- Windows Sandbox as a possible isolated-testing technology, not an antivirus and not a generic repair tool.
- Malwarebytes AdwCleaner only as a specialized fallback for matching adware/PUP cases.
- .NET Framework Repair Tool only for matching .NET Framework repair cases.

Do not inflate the product with every utility/article encountered. New technology must improve accuracy, safety, novice UX, evidence collection or automation.

## Recovery ladder

Always use the least destructive justified supported action first. Conceptually:

Known issue/native safe diagnostic → Startup Repair/appropriate WinRE tool → QMR/rollback when supported and justified → restore mechanisms → reset/reinstall → destructive rebuild/clean install only as last resort.

Exact route depends on Windows version/build, boot stage, device/OEM, evidence and available capabilities; do not mechanically execute every rung.

## Boot architecture

Classify what the user sees rather than teaching boot-stage terminology:
- no image / apparent hardware start issue;
- manufacturer/boot error;
- Windows logo/loading;
- BSOD;
- black screen after logo.

Then choose the matching safe recovery route. Boot-stage concepts stay internal.

## Current implemented scope

`assistant-widget.js` currently contains deterministic branches for:
- slow whole PC;
- slow copying (internal, USB, network, cloud);
- application hang;
- basic network/Wi-Fi;
- basic Windows boot failure;
- safety stop for smoke/burning smell/sparks/liquid.

Static FSM acceptance/check infrastructure exists under `tests/`, and GitHub Actions was added to run the FSM safety check.

## Known implementation debt / next work

1. Replace visible `Помощник` framing with `Разобраться по шагам` / problem-solving framing.
2. Keep first surface minimal: `Что случилось?`.
3. Replace generic `escalate_basic` ending with a real dead-end handoff point.
4. Preserve complete attempted-step/history data for fallback.
5. Build structured case packet.
6. Add deterministic Safety Guard for fallback candidate.
7. Convert approved candidate to exactly one normal Step & Flow step.
8. Return control to deterministic flow.
9. Continue closing dead transitions/loops and run end-to-end novice journeys.
10. Add new diagnostic families only after core stability.

## Acceptance cases

P0 includes:
- `комп не работает` → clarify, never guess internet or another family;
- `компьютер медленно работает` → slow/scope;
- slow copy → ask where copying before SSD assumptions;
- `не понимаю` → explain current state;
- `не помогло` → continue defined route;
- every visible transition has a valid destination or explicit terminal/escalation;
- destructive action is impossible without risk gate;
- boot failure routes by observed stage and supported recovery capability.

## Continuation instruction

If work resumes without chat context, read this file plus:
- `docs/UX_FALLBACK_FLOW.md`
- `tests/assistant-fsm-cases.md`
- `tests/fsm-static-check.mjs`
- `assistant-widget.js`

Then continue from **Known implementation debt / next work** above. Do not restart product discovery or redesign the architecture unless testing produces evidence that a change is required.

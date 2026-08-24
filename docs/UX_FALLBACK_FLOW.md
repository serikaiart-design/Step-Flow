# Step & Flow — simple UX + guarded fallback

## Product surface

The user should not feel that they are operating a general-purpose AI assistant.

Primary surface:

`Что случилось?`

Then exactly one useful question or one safe action at a time.

Preferred result controls:
- `Сделал`
- `Помогло`
- `Не помогло`
- `Не понимаю`
- context-specific choices only when required

Avoid exposing internal terms such as FSM, WER, ETW, WinRE, classifier, evidence engine, GPT, or knowledge base unless the user actually needs the term to complete a Windows step.

## Naming

Replace visible `Помощник` framing with `Разобраться по шагам` / `Решить проблему` framing.

The input placeholder remains simple: `Что случилось?`

## Normal path

User text
→ intent/family classification
→ active case
→ deterministic state
→ one step
→ user result
→ validator
→ next deterministic state
→ resolved

## Dead-end definition

GPT fallback is NOT called merely because a user presses `Не помогло`.

A case is eligible only when one of these is true:
1. no supported family matches after clarification;
2. the deterministic branch is exhausted;
3. required evidence was collected but no safe deterministic next state exists;
4. repeated uncertainty exceeds the case attempt limit;
5. an unusual error/code/device combination is outside the curated case library.

## Fallback handoff

Build a structured case packet:

```json
{
  "case_id": "...",
  "family": "...",
  "current_state": "...",
  "original_problem": "...",
  "attempted_steps": [],
  "observations": [],
  "error_codes": [],
  "windows": {"version": null, "build": null},
  "device": {"vendor": null, "model": null},
  "risk_context": {"important_unsaved_data": null, "bitlocker": null}
}
```

The fallback model returns a candidate next step, never an unrestricted chat response.

## Guard before display

Reject a candidate when it:
- invents a diagnosis without evidence;
- repeats a failed step without new reason/evidence;
- requests disabling security controls as a generic fix;
- proposes registry/BCD/partition/firmware edits without an expert flow;
- proposes destructive disk/recovery action without explicit risk gate;
- asks for passwords, recovery keys, product keys, or unnecessary identifiers;
- recommends random cleaners/optimizers when native/vendor diagnostics exist;
- conflicts with a known Microsoft/OEM supported path.

Approved candidate → convert into normal Step & Flow card → return to deterministic flow.

## User-facing fallback copy

Do not say `ChatGPT wrapper`, `LLM escalation`, or similar.

Use:

**Нужна более точная проверка**

`Обычные шаги не дали однозначного ответа. Я учту то, что вы уже проверили, и предложу один следующий безопасный шаг.`

The user remains in the same case. Do not reset history.

## B2A-inspired simplicity rule

Complexity belongs behind the interface.

At any moment the user should be able to answer: **what do I do now?**

If a screen contains multiple explanations, diagnostic technologies, alternative repair routes, or expert terminology before the user needs them, simplify it.

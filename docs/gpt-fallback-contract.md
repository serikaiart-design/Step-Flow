# Step & Flow — Guarded GPT Fallback Contract

## Product rule
The normal user experience is NOT a free-form AI chat. Step & Flow guides a novice one small step at a time through deterministic cases.

GPT fallback is invoked only when the deterministic engine reaches a defined dead end or lacks a verified case.

## Trigger conditions
Invoke fallback only when one of these is true:
- `state = escalate_basic` after the current safe branch is exhausted;
- no verified case family matches the user's symptom with sufficient confidence;
- the user supplies an error/message that the local knowledge base cannot classify;
- evidence collected by the FSM conflicts and no deterministic transition is allowed.

Do NOT invoke GPT merely because the user presses `Не понимаю`. Explain the current step first.

## Input contract
Send structured case context, not an uncontrolled transcript dump:

```json
{
  "case_id": "...",
  "family": "...",
  "current_state": "...",
  "user_problem": "...",
  "windows": {"version": null, "build": null, "kb": []},
  "device": {"manufacturer": null, "model": null},
  "evidence": [],
  "attempted_steps": [],
  "results": [],
  "risk_constraints": ["no_destructive_action_without_gate"],
  "audience": "complete_beginner"
}
```

## Output contract
GPT may return only a proposed next diagnostic action:

```json
{
  "status": "PROPOSE_NEXT_STEP | NEED_MORE_EVIDENCE | ESCALATE_HUMAN",
  "hypothesis": "short internal hypothesis",
  "confidence": 0.0,
  "next_step": {
    "title": "plain-language title",
    "instruction": "one beginner-safe step",
    "expected_answers": ["..."],
    "risk": "none | low | medium | high | critical"
  },
  "evidence_needed": [],
  "source_requirement": "official | vendor | none"
}
```

## Guard before display
The GPT result is a proposal, never an authorized transition.

Reject or quarantine the proposal if it:
- formats, resets, reinstalls, deletes, edits registry/BCD, disables security, changes firmware, or otherwise risks data/system integrity without an explicit deterministic risk gate;
- claims a root cause without evidence;
- contradicts already collected evidence;
- repeats a failed step without new evidence;
- asks a complete beginner to use an advanced tool when a safer native Windows path exists;
- recommends an unknown download when an official Microsoft/OEM path is sufficient.

Approved proposal -> convert to ONE Step & Flow card -> collect result -> return to deterministic FSM.

## User-facing fallback copy
Never say: `ИИ не знает`, `GPT решил`, or expose model internals.

Use simple copy such as:

> Нужна ещё одна проверка. Сделаем её безопасно и по шагам.

If no safe next action can be validated:

> По имеющимся данным безопасно продолжать автоматически нельзя. Я собрал, что уже проверено, чтобы не повторять шаги.

## UX principle inspired by single-purpose tools
Keep the visible product as simple as a one-action utility:

`Что случилось? -> один вопрос -> один шаг -> результат`

Complex routing, evidence, knowledge sources and GPT fallback stay behind the interface.

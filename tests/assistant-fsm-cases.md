# Step & Flow assistant — acceptance cases

Purpose: prevent routing regressions before adding more knowledge sources.

## P0 — must pass

1. `комп не работает` -> CLARIFY, never auto-route to internet.
2. `компьютер медленно работает` -> slow/scope.
3. slow/scope -> `Копирование файлов` -> slow/copy_scope.
4. copy_scope -> internal / USB / network / cloud must each render a next step.
5. `не знаю` or `не понимаю` must explain the CURRENT step, not reset the case.
6. `не помогло` must keep active case and move to a defined next state.
7. Every button value emitted by render() must have a handler and a renderable destination, or explicitly close/escalate the case.
8. Smoke/liquid/sparks/burning smell -> STOP safety state.
9. No destructive repair command is allowed without explicit risk gate and consent.
10. A faulting module/process is evidence, not automatically the root cause.

## Core novice journeys

### Slow whole PC
`комп тормозит` -> whole computer -> restart -> still slow -> Task Manager evidence -> CPU/RAM/Disk branch -> guided next evidence -> resolution/escalation.

### Slow copying
`копирует медленно` -> where copying? -> internal/USB/network/cloud -> route-specific evidence. Do not assume SSD failure.

### App hang
`программа зависла` -> wait -> Task Manager only if needed -> reopen -> repeat? -> app-specific diagnosis. Do not loop on the same failed step.

### Network
`нет интернета` -> same Wi-Fi works on phone? -> router vs PC branch -> defined next states -> Get Help/native diagnostics before third-party tools.

### Boot failure
`Windows не загружается` -> boot-stage clarification -> WinRE capability -> Startup Repair / QMR / known issue / rollback as appropriate -> progressively more destructive recovery only when justified.

## Evidence-first architecture

Preferred order when relevant:
1. Simple observation / Task Manager / Get Help.
2. Reliability History / Device Manager / WER / Windows Release Health.
3. PowerToys or Sysinternals only for a matching case.
4. OEM/vendor diagnostics.
5. ETW/WPR/WPA/WinDbg for advanced evidence.

## Recovery safety

Always prefer least-destructive supported action. Capability-detect Windows version/build/device before suggesting newer recovery features. BitLocker recovery-key requirements must be surfaced before entering flows that can require it.

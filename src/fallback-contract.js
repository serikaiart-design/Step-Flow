export const FALLBACK_REASONS = Object.freeze({
  NO_SUPPORTED_FAMILY: 'no_supported_family',
  BRANCH_EXHAUSTED: 'branch_exhausted',
  EVIDENCE_WITHOUT_ROUTE: 'evidence_without_route',
  ATTEMPT_LIMIT: 'attempt_limit',
  UNKNOWN_COMBINATION: 'unknown_combination'
});

const uniq = values => [...new Set((values || []).filter(Boolean))];

export function buildCasePacket(session = {}, reason) {
  if (!Object.values(FALLBACK_REASONS).includes(reason)) {
    throw new Error('Invalid fallback reason');
  }

  return Object.freeze({
    schema_version: 1,
    case_id: session.caseId || null,
    family: session.family || null,
    current_state: session.state || null,
    fallback_reason: reason,
    original_problem: session.originalProblem || null,
    attempted_steps: uniq(session.attempted),
    observations: uniq(session.observations),
    error_codes: uniq(session.errorCodes),
    windows: {
      version: session.windows?.version || null,
      build: session.windows?.build || null
    },
    device: {
      vendor: session.device?.vendor || null,
      model: session.device?.model || null
    },
    risk_context: {
      important_unsaved_data: session.riskContext?.importantUnsavedData ?? null,
      bitlocker: session.riskContext?.bitlocker ?? null
    }
  });
}

export function isFallbackEligible(session = {}, reason) {
  if (!session.caseId) return false;
  if (!Object.values(FALLBACK_REASONS).includes(reason)) return false;
  if (reason === FALLBACK_REASONS.ATTEMPT_LIMIT) {
    return Number(session.uncertainAttempts || 0) >= Number(session.maxAttempts || 3);
  }
  return true;
}

const BLOCKED_PATTERNS = [
  /format\b|форматир/i,
  /diskpart/i,
  /delete\s+partition|удал.*раздел/i,
  /regedit|реестр/i,
  /bcdedit|bootrec/i,
  /disable.*defender|отключ.*защитник/i,
  /disable.*antivirus|отключ.*антивирус/i,
  /парол|password|product\s*key|ключ\s+bitlocker/i
];

export function guardFallbackCandidate(candidate = {}, session = {}) {
  const text = String(candidate.instruction || candidate.text || '').trim();
  const reasons = [];

  if (!text) reasons.push('empty_instruction');
  if (text.length > 900) reasons.push('too_long_for_one_step');
  if (BLOCKED_PATTERNS.some(rx => rx.test(text))) reasons.push('expert_or_sensitive_action');

  const normalized = text.toLowerCase().replace(/\s+/g, ' ');
  const repeated = (session.attemptedInstructions || [])
    .map(v => String(v).toLowerCase().replace(/\s+/g, ' '))
    .some(v => v && (normalized.includes(v) || v.includes(normalized)));
  if (repeated) reasons.push('repeats_failed_step');

  if (candidate.risk && !['none', 'low'].includes(candidate.risk)) {
    reasons.push('risk_requires_deterministic_flow');
  }

  return Object.freeze({
    approved: reasons.length === 0,
    reasons,
    candidate: reasons.length === 0 ? {
      title: String(candidate.title || 'Следующая проверка').trim(),
      instruction: text,
      expected_result: candidate.expected_result || null,
      risk: candidate.risk || 'low'
    } : null
  });
}

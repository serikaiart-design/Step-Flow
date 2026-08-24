import assert from 'node:assert/strict';
import { FALLBACK_REASONS, buildCasePacket, isFallbackEligible, guardFallbackCandidate } from '../src/fallback-contract.js';

const session = {
  caseId: 'case_test',
  family: 'slow',
  state: 'perf_next',
  originalProblem: 'компьютер тормозит',
  attempted: ['slow:whole', 'slow:resource'],
  observations: ['disk 100%'],
  errorCodes: [],
  uncertainAttempts: 3,
  maxAttempts: 3,
  attemptedInstructions: ['перезагрузите компьютер']
};

assert.equal(isFallbackEligible(session, FALLBACK_REASONS.BRANCH_EXHAUSTED), true);
assert.equal(isFallbackEligible({}, FALLBACK_REASONS.BRANCH_EXHAUSTED), false);
assert.equal(isFallbackEligible(session, FALLBACK_REASONS.ATTEMPT_LIMIT), true);

const packet = buildCasePacket(session, FALLBACK_REASONS.BRANCH_EXHAUSTED);
assert.equal(packet.case_id, 'case_test');
assert.equal(packet.original_problem, 'компьютер тормозит');
assert.deepEqual(packet.attempted_steps, ['slow:whole', 'slow:resource']);

const safe = guardFallbackCandidate({
  title: 'Проверим историю надёжности',
  instruction: 'Откройте «Просмотр журнала надёжности» и скажите, есть ли красный крестик в момент зависания.',
  risk: 'low'
}, session);
assert.equal(safe.approved, true);

const destructive = guardFallbackCandidate({
  instruction: 'Откройте diskpart и удалите раздел.',
  risk: 'high'
}, session);
assert.equal(destructive.approved, false);

const repeat = guardFallbackCandidate({
  instruction: 'Перезагрузите компьютер.',
  risk: 'low'
}, session);
assert.equal(repeat.approved, false);

console.log('PASS: guarded fallback contract');

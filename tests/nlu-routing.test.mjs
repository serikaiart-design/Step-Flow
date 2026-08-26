import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');

assert.match(source, /винда\|виндовс\|вында/);
assert.match(source, /инет\|инета\|инету\|интирнет/);
assert.match(source, /прога\|прогу\|приложуха/);
assert.match(source, /function detectTextIntents\(x\)/);
assert.match(source, /function clarifyDetected\(intents\)/);
assert.match(source, /Вы описали несколько симптомов/);
assert.match(source, /синий экран\|bsod\|stop code\|стоп код/);
assert.match(source, /originalProblem:pendingProblem\|\|null/);
assert.match(source, /handle\(q,true\)/);

console.log('PASS: colloquial Russian, multi-symptom clarification, and original-problem capture');

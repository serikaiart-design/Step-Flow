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

const normLine = source.split('\n').find(line => line.startsWith('const norm='));
assert.ok(normLine, 'norm function must be extractable');
const normExpression = normLine.slice('const norm='.length, -1);
const norm = Function(`return (${normExpression})`)();

const detectMatch = source.match(/function detectTextIntents\(x\)\{[\s\S]*?\n\}/);
assert.ok(detectMatch, 'intent detector must be extractable');
const detectTextIntents = Function(`${detectMatch[0]}; return detectTextIntents`)();

assert.equal(norm('Винда тупит!'), 'windows тупит');
assert.equal(norm('Инет отвалился.'), 'интернет отвалился');
assert.equal(norm('Прога зависла'), 'программа зависла');
assert.deepEqual(detectTextIntents(norm('Комп тормозит и инет отвалился')), ['slow','network']);
assert.deepEqual(detectTextIntents(norm('Прога зависла')), ['app']);
assert.deepEqual(detectTextIntents(norm('Синий экран')), ['boot']);
assert.deepEqual(detectTextIntents(norm('Сайты не открываются')), ['network']);

console.log('PASS: colloquial Russian, multi-symptom clarification, and original-problem capture');

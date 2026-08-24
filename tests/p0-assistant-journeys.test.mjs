import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');

// Core intent routing must remain explicit and conservative.
assert.match(source, /комп\.\*не работ\|ничего не работ\|все не работ/);
assert.match(source, /clarify\(\);return/);
assert.match(source, /копир\.\*медлен\|медлен\.\*копир/);
assert.match(source, /start\('slow','copy_scope'\)/);
assert.match(source, /медлен\|тормоз\|лага\|подвиса/);
assert.match(source, /start\('slow','scope'\)/);

// Slow-copy must ask where the files are being copied before any storage diagnosis.
assert.match(source, /if\(s==='copy_scope'\)[\s\S]*Куда именно вы копируете файлы\?/);
assert.match(source, /\['Внутри компьютера','internal'\]/);
assert.match(source, /\['На флешку \/ USB-диск','usb'\]/);
assert.match(source, /\['По сети','network_copy'\]/);
assert.match(source, /\['В облако','cloud'\]/);

// "Не понимаю" helpers must preserve the same case instead of resetting it.
assert.match(source, /function currentHelp\(text\)/);
assert.match(source, /Остаёмся в этой же проблеме/);
assert.doesNotMatch(source, /function currentHelp\(text\)[\s\S]{0,400}clear\(\)/);

// Back must restore a prior deterministic state and keep attempted history.
assert.match(source, /function goBack\(\)/);
assert.match(source, /session\.history\.pop\(\)/);
assert.doesNotMatch(source, /function goBack\(\)[\s\S]{0,500}session\.attempted\s*=\s*\[\]/);

// Safety stop has to pre-empt normal routing.
assert.match(source, /дым\|запах\.\{0,8\}гар\|искр\|жидкост/);
assert.match(source, /Остановите диагностику/);

// Boot flow must expose BitLocker gate before continuing recovery.
assert.match(source, /if\(s==='bitlocker_gate'\)/);
assert.match(source, /ключ восстановления BitLocker/);
assert.match(source, /Не подбирайте его/);

// Unknown/dead states must preserve the active case rather than silently reset it.
assert.match(source, /Я сохранил текущую проблему/);
assert.match(source, /Случай не сброшен/);

console.log('PASS: P0 assistant journey guards');

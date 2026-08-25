import fs from 'node:fs';
import assert from 'node:assert/strict';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const theme = fs.readFileSync(new URL('../assistant-theme.js', import.meta.url), 'utf8');

assert.match(index, /assistant-widget\.js/);
assert.match(index, /assistant-theme\.js/);
assert.match(theme, /textContent='Помощник'/);
assert.match(theme, /linear-gradient\(135deg,#49a982,#278d69\)/);
assert.match(theme, /boxShadow:/);
assert.match(theme, /wireAsk/);

console.log('PASS: Assistant label, green entry styling, and FAQ handoff are preserved.');

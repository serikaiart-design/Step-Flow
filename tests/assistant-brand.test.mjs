import fs from 'node:fs';
import assert from 'node:assert/strict';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const theme = fs.readFileSync(new URL('../assistant-theme.js', import.meta.url), 'utf8');

assert.match(index, /assistant-widget\.js/);
assert.match(index, /assistant-theme\.js/);
assert.match(theme, /btn\.textContent='Помощник'/);
assert.match(theme, /Step & Flow · Помощник/);
assert.match(theme, /linear-gradient\(135deg,#ff3d00 0%,#ff007a 52%,#7c3aed 100%\)/);
assert.match(theme, /boxShadow:/);

console.log('PASS: Assistant label is preserved and the entry button has vivid styling.');

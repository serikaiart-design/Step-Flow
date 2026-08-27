import fs from 'node:fs';
import assert from 'node:assert/strict';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const theme = fs.readFileSync(new URL('../assistant-theme.js', import.meta.url), 'utf8');
const themeBase = fs.readFileSync(new URL('../assistant-theme-base.js', import.meta.url), 'utf8');
const themeBundle = `${themeBase}\n${theme}`;

assert.match(index, /assistant-widget\.js/);
assert.match(index, /assistant-theme\.js/);
assert.match(themeBundle, /textContent='Помощник'/);
assert.match(themeBundle, /linear-gradient\(135deg,#49a982,#278d69\)/);
assert.match(themeBundle, /boxShadow:/);
assert.match(themeBundle, /wireAsk/);
assert.match(theme, /aria-label','Открыть помощника'/);

console.log('PASS: Assistant label, green entry styling, and FAQ handoff are preserved.');

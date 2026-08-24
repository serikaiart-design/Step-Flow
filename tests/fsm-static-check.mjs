import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');
const renderedStates = new Set();
const stateRe = /if\(s==='([^']+)'\)/g;
let m;
while ((m = stateRe.exec(source))) renderedStates.add(m[1]);

const terminal = new Set(['resolved']);
const ignored = new Set([
  // Values handled as global actions or classifiers before render-state routing.
  'whole','copy_scope','app_switch','boot','network_copy','cloud','scope_help'
]);

const values = new Set();
const buttonRe = /\[\s*'[^']*'\s*,\s*'([^']+)'/g;
while ((m = buttonRe.exec(source))) values.add(m[1]);

const missing = [...values].filter(v => !renderedStates.has(v) && !terminal.has(v) && !ignored.has(v)).sort();

console.log(`Rendered states: ${renderedStates.size}`);
console.log(`Button transition values: ${values.size}`);
if (missing.length) {
  console.error('Potential dead transitions:');
  for (const v of missing) console.error(` - ${v}`);
  process.exitCode = 1;
} else {
  console.log('PASS: no obvious dead button transitions found.');
}

import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');
const renderedStates = new Set();
// Capture every state comparison, including grouped conditions such as
// if(s==='windows_loading'||s==='black_after_logo').
const stateRe = /\bs==='([^']+)'/g;
let m;
while ((m = stateRe.exec(source))) renderedStates.add(m[1]);

const terminal = new Set(['resolved']);
const ignored = new Set([
  // Values handled as global actions/classifiers in handle() before render-state routing.
  'whole','copy_scope','app_switch','boot','network_copy','cloud','scope_help',
  'start_app','start_boot','start_network','start_slow','network_switch',
  'clarify_audio','clarify_power','clarify_unknown'
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

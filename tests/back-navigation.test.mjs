import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');
const required = [
  'class="sf-back"',
  'history:[]',
  'function pushHistory()',
  'function goBack()',
  'backBtn.onclick=goBack',
  'session.history.pop()',
  'session.attempted.push'
];

const missing = required.filter(token => !source.includes(token));
if (missing.length) {
  console.error('Back navigation contract missing:');
  missing.forEach(token => console.error(` - ${token}`));
  process.exit(1);
}

if (/function goBack\(\)[\s\S]*session\.attempted\s*=/.test(source)) {
  console.error('Back must not erase attempted diagnostic history.');
  process.exit(1);
}

console.log('PASS: Back navigation keeps deterministic case history.');

import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../assistant-image-ocr.js', import.meta.url), 'utf8');
const aliases = {
  CRITICAL_PROCESS_DIED: true,
  MEMORY_MANAGEMENT: true,
  WHEA_UNCORRECTABLE_ERROR: true,
  DPC_WATCHDOG_VIOLATION: true
};
const items = Object.keys(aliases).map(name => ({name, summary: name, first: 'safe step'}));
const unknown = {name: 'UNKNOWN_BUG_CHECK'};
const document = {
  querySelector: () => null,
  createElement: () => ({setAttribute(){}, appendChild(){}, style:{}}),
  head: {appendChild(){}},
  body: {appendChild(){}}
};
const window = {
  StepFlowBSOD: {
    aliases,
    find(value) {
      const text = String(value || '').toUpperCase();
      return items.find(item => text.includes(item.name)) || unknown;
    }
  },
  StepFlowWindowsErrors: {
    find(value) {
      const match = String(value || '').match(/0x80070005/i);
      return match
        ? {group: 'access', code: match[0], title: 'Access denied', summary: 'Denied', first: 'Check permissions'}
        : {group: 'unknown'};
    }
  }
};
vm.runInNewContext(source, {window, document, URL, Image: class {}, Event: class {}, setInterval, clearInterval, setTimeout, clearTimeout});

const ocr = window.StepFlowOCR;
assert.ok(ocr, 'OCR test interface must be available');
assert.equal(ocr.detect('Stop code: MEMORY MANAGEMENT').item.name, 'MEMORY_MANAGEMENT');
assert.equal(ocr.detect('STOP CODE CRITICAL PROCESS DIED').item.name, 'CRITICAL_PROCESS_DIED');
assert.equal(ocr.detect('WHEA UNCORRECTABLE ERR0R').item.name, 'WHEA_UNCORRECTABLE_ERROR');
assert.equal(ocr.detect('Your PC ran into a problem and needs to restart').kind, 'bsod-generic');
assert.equal(ocr.detect('Ошибка 0x80070005').kind, 'windows');
assert.equal(ocr.detect('Обычный рабочий стол'), null);
assert.equal(ocr.looksLikeBSOD('синий экран'), true);

console.log('PASS: local OCR normalization, stop-code recovery, Windows error routing, and safe unknown handling');

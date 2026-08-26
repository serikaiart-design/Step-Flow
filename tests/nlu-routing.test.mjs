import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../assistant-widget.js', import.meta.url), 'utf8');

assert.match(source, /винда\|винде\|винду\|виндовс\|вында/);
assert.match(source, /инет\|инета\|инету\|интирнет/);
assert.match(source, /прога\|прогу\|приложуха/);
assert.match(source, /function detectTextIntents\(x\)/);
assert.match(source, /function clarifyDetected\(intents\)/);
assert.match(source, /Вы описали несколько симптомов/);
assert.match(source, /синий экран\|bsod\|stop code\|стоп код/);
assert.match(source, /originalProblem:pendingProblem\|\|null/);
assert.match(source, /handle\(q,true\)/);
assert.match(source, /\/\/ ENTITY_EXTRACTOR_START/);
assert.match(source, /function extractEntities\(text\)/);
assert.match(source, /function mergeFacts\(target,facts\)/);
assert.match(source, /windows:\{version:null,build:null\}/);
assert.match(source, /Сохранил как факты/);

const normLine = source.split('\n').find(line => line.startsWith('const norm='));
assert.ok(normLine, 'norm function must be extractable');
const normExpression = normLine.slice('const norm='.length, -1);
const norm = Function('return ('+normExpression+')')();

const detectMatch = source.match(/function detectTextIntents\(x\)\{[\s\S]*?\n\}/);
assert.ok(detectMatch, 'intent detector must be extractable');
const detectTextIntents = Function(detectMatch[0]+'; return detectTextIntents')();

const extractorStart = source.indexOf('// ENTITY_EXTRACTOR_START');
const extractorEnd = source.indexOf('// ENTITY_EXTRACTOR_END');
assert.ok(extractorStart >= 0 && extractorEnd > extractorStart, 'entity extractor must be extractable');
const extractorBlock = source.slice(extractorStart, extractorEnd);
const emptyEntities = () => ({programs:[],devices:[],drivers:[],firmware:[]});
const entityApi = Function('norm','emptyEntities',extractorBlock+'; return {extractEntities,mergeFacts,factSummary}')(norm,emptyEntities);

assert.equal(norm('Винда тупит!'), 'windows тупит');
assert.equal(norm('На Винде 11'), 'на windows 11');
assert.equal(norm('Инет отвалился.'), 'интернет отвалился');
assert.equal(norm('Прога зависла'), 'программа зависла');
assert.deepEqual(detectTextIntents(norm('Комп тормозит и инет отвалился')), ['slow','network']);
assert.deepEqual(detectTextIntents(norm('Прога зависла')), ['app']);
assert.deepEqual(detectTextIntents(norm('Синий экран')), ['boot']);
assert.deepEqual(detectTextIntents(norm('Сайты не открываются')), ['network']);

const windowsApp = entityApi.extractEntities('На Винде 11 в Хроме ошибка 0x80072ee7');
assert.equal(windowsApp.windows.version, 'Windows 11');
assert.ok(windowsApp.entities.programs.includes('Google Chrome'));
assert.ok(windowsApp.errorCodes.includes('0x80072ee7'));

const hardware = entityApi.extractEntities('После обновления драйвера NVIDIA принтер не работает, открыт BIOS');
assert.equal(hardware.device.vendor, 'NVIDIA');
assert.equal(hardware.device.model, 'Принтер');
assert.ok(hardware.entities.drivers.includes('NVIDIA'));
assert.ok(hardware.entities.devices.includes('Принтер'));
assert.ok(hardware.entities.firmware.includes('BIOS'));

const build = entityApi.extractEntities('Windows 10, сборка 19045');
assert.equal(build.windows.version, 'Windows 10');
assert.equal(build.windows.build, '19045');

const vendorOnly = entityApi.extractEntities('Видеокарта NVIDIA показывает артефакты');
assert.equal(vendorOnly.device.vendor, 'NVIDIA');
assert.deepEqual(vendorOnly.entities.drivers, []);
assert.deepEqual(entityApi.extractEntities('Неизвестная программа сломалась').entities.programs, []);

const combined = {windows:{version:null,build:null},device:{vendor:null,model:null},entities:emptyEntities(),observations:[],errorCodes:[]};
entityApi.mergeFacts(combined,windowsApp);
entityApi.mergeFacts(combined,hardware);
assert.equal(combined.windows.version, 'Windows 11');
assert.equal(combined.device.vendor, 'NVIDIA');
assert.ok(combined.entities.programs.includes('Google Chrome'));
assert.ok(combined.entities.devices.includes('Принтер'));
assert.match(entityApi.factSummary(combined), /Windows 11/);

console.log('PASS: colloquial Russian, multi-symptom routing, entity extraction, and session fact merge');

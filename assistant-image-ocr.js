(()=>{
'use strict';
const TESS_URL='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
let loading=null,worker=null,busy=false;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function chatMsg(html){const chat=document.querySelector('.sf-help-panel .sf-help-chat');if(!chat)return null;const d=document.createElement('div');d.className='sf-msg sf-bot';d.innerHTML=html;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return d}
function addButtons(host,items){const row=document.createElement('div');row.className='sf-actions';items.forEach(([label,fn,primary])=>{const b=document.createElement('button');b.type='button';b.className=primary?'sf-primary':'sf-secondary';b.textContent=label;b.onclick=fn;row.appendChild(b)});host.appendChild(row)}
function ensureTesseract(){
 if(window.Tesseract)return Promise.resolve();
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=TESS_URL;s.async=true;s.onload=resolve;s.onerror=()=>reject(new Error('Не удалось загрузить OCR-модуль'));document.head.appendChild(s)});
 return loading;
}
async function getWorker(progress){
 await ensureTesseract();
 if(worker)return worker;
 worker=await window.Tesseract.createWorker('eng+rus',1,{logger:m=>{if(m&&typeof m.progress==='number')progress(Math.round(m.progress*100),m.status||'')}});
 return worker;
}
function detect(text){
 const bsod=window.StepFlowBSOD&&window.StepFlowBSOD.find?window.StepFlowBSOD.find(text):null;
 if(bsod&&bsod.name!=='UNKNOWN_BUG_CHECK')return {kind:'bsod',item:bsod};
 const win=window.StepFlowWindowsErrors&&window.StepFlowWindowsErrors.find?window.StepFlowWindowsErrors.find(text):null;
 if(win&&win.group!=='unknown')return {kind:'windows',item:win};
 const stopName=String(text||'').toUpperCase().match(/\b[A-Z][A-Z0-9]+(?:_[A-Z0-9]+){1,6}\b/);
 const hex=String(text||'').match(/0x[0-9a-fA-F]{6,8}/);
 if(bsod)return {kind:'bsod-unknown',item:bsod};
 if(win)return {kind:'windows-unknown',item:win};
 if(stopName)return {kind:'name',raw:stopName[0]};
 if(hex)return {kind:'hex',raw:hex[0]};
 return null;
}
function submitDetected(value){
 const form=document.querySelector('.sf-help-panel .sf-help-form');const input=form&&form.querySelector('input');
 if(!form||!input)return;
 if(window.StepFlowImage)window.StepFlowImage.status='analyzed';
 input.value=value;
 form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
}
function renderResult(text,confidence,hit){
 const safeConf=Number.isFinite(confidence)?Math.max(0,Math.min(100,Math.round(confidence))):null;
 let host;
 if(hit&&hit.kind==='bsod'){
  const x=hit.item;host=chatMsg(`<span class="sf-tag">Фото распознано</span><br><b>Похоже на BSOD: ${esc(x.name)}</b><br><code>${esc(x.code)}</code><div class="sf-note">${esc(x.summary)}</div><div class="sf-note">Первый безопасный шаг: ${esc(x.first)}</div>${safeConf!==null?`<div class="sf-note">Уверенность OCR: ${safeConf}%</div>`:''}<div class="sf-note"><b>Проверьте код на фото символ в символ.</b></div>`);
  addButtons(host,[['Да, код верный',()=>submitDetected(x.code),true],['Нет, прочитан неверно',()=>{const i=document.querySelector('.sf-help-form input');if(i){i.value='';i.placeholder='Введите Stop Code или текст ошибки вручную';i.focus()}},false]]);return;
 }
 if(hit&&hit.kind==='windows'){
  const x=hit.item;host=chatMsg(`<span class="sf-tag">Фото распознано</span><br><b>${esc(x.code)} — ${esc(x.title)}</b><div class="sf-note">${esc(x.summary)}</div><div class="sf-note">Первый безопасный шаг: ${esc(x.first)}</div>${safeConf!==null?`<div class="sf-note">Уверенность OCR: ${safeConf}%</div>`:''}<div class="sf-note"><b>Сверьте код с изображением.</b></div>`);
  addButtons(host,[['Да, код верный',()=>submitDetected(x.code),true],['Исправить код',()=>{const i=document.querySelector('.sf-help-form input');if(i){i.value='';i.placeholder='Введите код ошибки вручную';i.focus()}},false]]);return;
 }
 if(hit&&(hit.raw||hit.item)){
   const raw=hit.raw||(hit.item&&hit.item.code)||'';host=chatMsg(`<span class="sf-tag">Нужна проверка</span><br>На изображении удалось заметить <b>${esc(raw)}</b>, но локальная база пока не дала уверенного совпадения.${safeConf!==null?`<div class="sf-note">Уверенность OCR: ${safeConf}%</div>`:''}<div class="sf-note">Сверьте запись с экраном. Если она верна, можно передать её Помощнику.</div>`);
   addButtons(host,[['Передать Помощнику',()=>submitDetected(raw),true],['Ввести вручную',()=>{const i=document.querySelector('.sf-help-form input');if(i)i.focus()},false]]);return;
 }
 const excerpt=String(text||'').replace(/\s+/g,' ').trim().slice(0,420);
 host=chatMsg(`<span class="sf-tag">Текст с изображения</span><br>${excerpt?esc(excerpt):'Текст распознать не удалось.'}${safeConf!==null?`<div class="sf-note">Уверенность OCR: ${safeConf}%</div>`:''}<div class="sf-note">Код ошибки автоматически не найден. Можно описать, что происходило перед ошибкой, или ввести код вручную.</div>`);
}
async function analyze(){
 const sf=window.StepFlowImage;if(!sf||!sf.file||busy)return false;
 busy=true;sf.status='analyzing';
 const panel=document.querySelector('.sf-help-panel');const form=panel&&panel.querySelector('.sf-help-form');const submit=form&&form.querySelector('button');
 const status=chatMsg('<span class="sf-tag">Анализ изображения</span><br><b>Читаю текст на фото…</b><div class="sf-note sf-ocr-progress">Подготовка OCR. Первый запуск может занять немного времени.</div>');
 const note=status&&status.querySelector('.sf-ocr-progress');
 if(submit){submit.disabled=true;submit.textContent='Анализ…'}
 try{
   const w=await getWorker((p,s)=>{if(note)note.textContent=`${s||'Распознавание'} · ${p}%`});
   const ret=await w.recognize(sf.file);const text=(ret&&ret.data&&ret.data.text)||'';const confidence=ret&&ret.data&&ret.data.confidence;
   sf.status='analyzed';sf.ocr={text,confidence,at:Date.now()};
   if(status)status.remove();
   renderResult(text,confidence,detect(text));
 }catch(err){if(status)status.remove();chatMsg('<b>Не удалось прочитать изображение автоматически.</b><div class="sf-note">Фото остаётся на вашем устройстве. Введите код ошибки или коротко опишите, что видно на экране.</div>');sf.status='selected';}
 finally{busy=false;if(submit){submit.disabled=false;submit.textContent='Дальше'}}
 return true;
}
function boot(){
 const panel=document.querySelector('.sf-help-panel');const form=panel&&panel.querySelector('.sf-help-form');if(!form)return false;
 if(form.dataset.sfOcr==='1')return true;form.dataset.sfOcr='1';
 form.addEventListener('submit',e=>{const sf=window.StepFlowImage;if(sf&&sf.file&&sf.status==='selected'){e.preventDefault();e.stopImmediatePropagation();analyze()}},true);
 window.StepFlowAnalyzeImage=analyze;return true;
}
if(!boot()){const t=setInterval(()=>{if(boot())clearInterval(t)},100);setTimeout(()=>clearInterval(t),6000)}
})();
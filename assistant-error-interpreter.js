(()=>{
'use strict';
function boot(){
 const panel=document.querySelector('.sf-help-panel');
 const form=panel&&panel.querySelector('.sf-help-form');
 const input=form&&form.querySelector('input,textarea');
 const chat=panel&&panel.querySelector('.sf-help-chat');
 if(!panel||!form||!input||!chat)return false;
 if(form.dataset.sfErrorInterpreter)return true;
 form.dataset.sfErrorInterpreter='1';
 const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 function add(html){const d=document.createElement('div');d.className='sf-msg sf-bot';d.innerHTML=html;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
 function classify(text){
  const bsod=window.StepFlowBSOD&&window.StepFlowBSOD.find(text);
  if(bsod)return {kind:'bsod',data:bsod};
  const win=window.StepFlowWindowsErrors&&window.StepFlowWindowsErrors.find(text);
  if(win&&win.code)return {kind:'windows',data:win};
  return null;
 }
 form.addEventListener('submit',e=>{
  const text=input.value.trim();if(!text)return;
  const hit=classify(text);if(!hit)return;
  e.preventDefault();e.stopImmediatePropagation();
  const user=document.createElement('div');user.className='sf-msg sf-user';user.textContent=text;chat.appendChild(user);
  input.value='';
  if(hit.kind==='bsod'){
   const x=hit.data;
   add(`<span class="sf-tag">BSOD / синий экран</span><br><b>${esc(x.name)} · ${esc(x.code)}</b><br>${esc(x.summary)}<div class="sf-note"><b>Первый безопасный шаг:</b> ${esc(x.first)}<br>Код BSOD — отправная точка, а не окончательный диагноз. Если код был считан с фото, подтвердите его символ в символ.</div>`);
   if(window.StepFlowAssistant&&typeof window.StepFlowAssistant.captureEvidence==='function')window.StepFlowAssistant.captureEvidence('bsod',x,text);
   return;
  }
  const x=hit.data;
  add(`<span class="sf-tag">Перевод ошибки</span><br><b>${esc(x.code)} — ${esc(x.title)}</b><br>${esc(x.summary)}<div class="sf-note"><b>Что сделать сначала:</b> ${esc(x.first)}<br>Если напишете, где именно появилась ошибка, Помощник сможет сузить причину.</div>`);
  if(window.StepFlowAssistant&&typeof window.StepFlowAssistant.captureEvidence==='function')window.StepFlowAssistant.captureEvidence('windows',x,text);
 },true);
 return true;
}
if(!boot()){const t=setInterval(()=>{if(boot())clearInterval(t)},100);setTimeout(()=>clearInterval(t),6000)}
})();
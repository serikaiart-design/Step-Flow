(()=>{
const FEEDBACK_ENDPOINT='https://script.google.com/macros/s/AKfycbzK9xsCOuYT7bthNmqW58eK8SAOsyKHI9g1jyk2lU1_RL5F08My2KkMwr1KMNyPCxf_Zw/exec';
const style=document.createElement('style');
style.textContent=`#programs .accordions{grid-template-columns:repeat(4,minmax(0,1fr))!important}#programs .accordions>details{min-width:0}.sf-feedback{width:min(1180px,calc(100% - 40px));margin:10px auto 20px;border:1px solid rgba(124,58,237,.13);border-radius:16px;background:linear-gradient(135deg,#f7f3ff 0%,#fff8f3 100%);box-shadow:0 5px 16px rgba(76,52,130,.045);overflow:hidden}.sf-feedback summary{list-style:none;cursor:pointer;padding:13px 16px;display:flex;align-items:center;justify-content:space-between;gap:14px;font-size:15px;font-weight:900;color:#5422a8}.sf-feedback summary::-webkit-details-marker{display:none}.sf-feedback summary::after{content:'▾';font-size:16px;color:#7c3aed;transition:transform .18s ease}.sf-feedback[open] summary::after{transform:rotate(180deg)}.sf-feedback-body{padding:0 16px 16px;max-width:780px}.sf-feedback p{margin:0;color:#59657b;font-size:12px;line-height:1.5}.sf-feedback-form{display:grid;gap:10px;margin-top:12px}.sf-feedback-form label{display:grid;gap:5px;color:#344054;font-size:11px;font-weight:800}.sf-feedback-form select,.sf-feedback-form textarea{width:100%;border:1px solid rgba(84,34,168,.2);border-radius:12px;background:#fff;color:#172033;font:500 13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;padding:10px 12px;outline:none}.sf-feedback-form textarea{min-height:104px;resize:vertical}.sf-feedback-form select:focus,.sf-feedback-form textarea:focus{border-color:#7540e8;box-shadow:0 0 0 3px rgba(117,64,232,.1)}.sf-feedback-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.sf-feedback button{border:0;border-radius:12px;padding:11px 15px;background:linear-gradient(135deg,#7540e8,#9a3fd0);color:#fff;font:800 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;cursor:pointer;box-shadow:0 6px 15px rgba(116,64,220,.16)}.sf-feedback button:disabled{opacity:.55;cursor:not-allowed}.sf-feedback-hint,.sf-feedback-status{font-size:10px;color:#7a8293}.sf-feedback-status{min-height:15px}.sf-feedback-status.error{color:#b42318}.sf-feedback-status.ok{color:#087a45}@media(max-width:900px){#programs .accordions{grid-template-columns:repeat(2,minmax(0,1fr))!important}}@media(max-width:650px){#programs .accordions{grid-template-columns:1fr!important}.sf-feedback{width:min(100% - 28px,1180px);margin-bottom:17px}.sf-feedback summary{padding:12px 14px;font-size:14px}.sf-feedback-body{padding:0 14px 14px}.sf-feedback-actions{display:grid}.sf-feedback button{width:100%}.sf-feedback-hint{text-align:center}}`;
document.head.appendChild(style);
const footer=document.querySelector('.footer');
if(!footer||document.querySelector('.sf-feedback'))return;
const box=document.createElement('details');
box.className='sf-feedback';
box.setAttribute('aria-label','Обратная связь');
box.innerHTML=`<summary>Обратная связь</summary><div class="sf-feedback-body"><p>Заметили ошибку, что-то непонятно или есть идея для улучшения? Напишите короткий отзыв — он будет отправлен владельцу Step & Flow и не появится публично.</p><form class="sf-feedback-form" novalidate><label>Тип отзыва<select name="type"><option>Ошибка на сайте</option><option>Предложение</option><option>Непонятный момент</option><option>Другое</option></select></label><label>Ваш отзыв<textarea name="message" maxlength="2000" placeholder="Опишите, что произошло или что можно улучшить" required></textarea></label><div class="sf-feedback-actions"><button type="submit">Отправить</button><span class="sf-feedback-hint">Отзыв увидит только владелец сайта</span></div><div class="sf-feedback-status" role="status" aria-live="polite"></div></form></div>`;
footer.parentNode.insertBefore(box,footer);
const form=box.querySelector('form');
const message=form.elements.message;
const status=box.querySelector('.sf-feedback-status');
form.addEventListener('submit',async event=>{
 event.preventDefault();
 const text=message.value.trim();
 status.className='sf-feedback-status';
 if(text.length<5){status.textContent='Напишите хотя бы несколько слов.';status.classList.add('error');message.focus();return}
 const type=form.elements.type.value;
 const button=form.querySelector('button[type="submit"]');
 button.disabled=true;
 button.textContent='Отправляем…';
 status.textContent='';
 try{
  await fetch(FEEDBACK_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({type,message:text,page:location.href.split('#')[0]})});
  form.reset();
  status.textContent='Спасибо! Отзыв отправлен.';
  status.classList.add('ok');
 }catch(error){
  status.textContent='Не удалось отправить. Проверьте интернет и попробуйте ещё раз.';
  status.classList.add('error');
 }finally{
  button.disabled=false;
  button.textContent='Отправить';
 }
});
})();

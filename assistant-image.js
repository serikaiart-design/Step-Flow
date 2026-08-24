(()=>{
'use strict';
const MAX=10*1024*1024;
const TYPES=new Set(['image/jpeg','image/png','image/webp']);
const css=document.createElement('style');
css.textContent=`.sf-image-tools{display:flex;gap:7px;align-items:center;padding:0 12px 10px;background:#fbfbfd}.sf-image-pick{border:1px solid #cfe6db;background:#f1faf6;color:#28684e;border-radius:11px;padding:8px 10px;font:800 12px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;cursor:pointer}.sf-image-pick:hover{background:#e9f7f0}.sf-image-note{font-size:10.5px;color:#7a8292}.sf-image-preview{margin:0 12px 10px;padding:10px;border:1px solid #dce5e0;border-radius:14px;background:#f8fcfa;display:none;gap:10px;align-items:center}.sf-image-preview.show{display:flex}.sf-image-preview img{width:58px;height:58px;object-fit:cover;border-radius:10px;border:1px solid #d9e2de}.sf-image-meta{min-width:0;flex:1;font-size:11px;color:#667085}.sf-image-meta b{display:block;color:#26334b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px}.sf-image-remove{border:0;background:#fff;color:#8a4551;border-radius:9px;padding:7px 9px;cursor:pointer;font-weight:800}.sf-image-privacy{margin-top:5px;color:#8a6b37}.sf-image-hidden{display:none!important}@media(max-width:520px){.sf-image-tools{align-items:flex-start;flex-direction:column}.sf-image-pick{width:100%;text-align:center}}`;
document.head.appendChild(css);
function boot(){
 const panel=document.querySelector('.sf-help-panel');
 const form=panel&&panel.querySelector('.sf-help-form');
 if(!panel||!form)return false;
 if(panel.querySelector('.sf-image-tools'))return true;
 const tools=document.createElement('div');tools.className='sf-image-tools';
 tools.innerHTML='<button class="sf-image-pick" type="button">📷 Фото / скриншот</button><span class="sf-image-note">JPEG, PNG или WebP · до 10 МБ</span><input class="sf-image-hidden" type="file" accept="image/jpeg,image/png,image/webp,image/*">';
 const preview=document.createElement('div');preview.className='sf-image-preview';
 preview.innerHTML='<img alt="Предпросмотр"><div class="sf-image-meta"><b></b><span></span><div class="sf-image-privacy">Не показывайте пароли, ключ BitLocker, ключи продукта, банковские и другие личные данные.</div></div><button class="sf-image-remove" type="button" aria-label="Удалить изображение">×</button>';
 panel.insertBefore(tools,form);panel.insertBefore(preview,form);
 const pick=tools.querySelector('.sf-image-pick'),input=tools.querySelector('input'),img=preview.querySelector('img'),name=preview.querySelector('b'),meta=preview.querySelector('span'),remove=preview.querySelector('.sf-image-remove');
 let url='';
 const clear=()=>{if(url)URL.revokeObjectURL(url);url='';input.value='';preview.classList.remove('show');img.removeAttribute('src');window.StepFlowImage=null};
 pick.onclick=()=>input.click();remove.onclick=clear;
 input.onchange=()=>{
  const file=input.files&&input.files[0];if(!file)return;
  if(!TYPES.has(file.type)&&!file.type.startsWith('image/')){alert('Выберите изображение JPEG, PNG или WebP.');clear();return}
  if(file.size>MAX){alert('Изображение слишком большое. Максимальный размер — 10 МБ.');clear();return}
  if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(file);img.src=url;name.textContent=file.name||'Изображение';meta.textContent=(file.size/1024/1024).toFixed(1)+' МБ · изображение выбрано';preview.classList.add('show');
  window.StepFlowImage={file,status:'selected',selectedAt:Date.now()};
  const text=panel.querySelector('.sf-help-form input');if(text){text.placeholder='Коротко напишите, что произошло на экране';text.focus()}
 };
 return true;
}
if(!boot()){const t=setInterval(()=>{if(boot())clearInterval(t)},100);setTimeout(()=>clearInterval(t),5000)}
})();
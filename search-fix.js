(()=>{
const q=document.getElementById('siteSearch');if(!q)return;const btn=q.closest('.search')?.querySelector('button');
const routes=[
 {href:'windows-wont-start.html',keys:['компьютер не включается','комп не включается','не запускается компьютер','черный экран','чёрный экран','windows не загружается','виндовс не загружается','не грузится windows','не грузится виндовс']},
 {href:'program-not-installing.html',keys:['программа не устанавливается','не ставится программа','установка не запускается','ошибка установки','не устанавливается приложение','приложение не устанавливается']},
 {href:'no-internet.html',keys:['нет интернета','интернет не работает','не работает интернет','wifi не работает','wi-fi не работает','вайфай не работает','сайты не открываются','нет сети']},
 {href:'computer-slow.html',keys:['компьютер тормозит','комп тормозит','медленный компьютер','компьютер медленно работает','зависает компьютер','лагает компьютер','долго загружается','вентилятор шумит']},
 {href:'something-stopped-working.html',keys:['что-то перестало работать','что то перестало работать','перестало работать','раньше работало теперь нет','сломалось','нет звука','устройство не работает','ошибка после обновления']},
 {href:'windows-after-install.html',keys:['только установили windows','только установил windows','после установки windows','после установки виндовс','новая windows','установил windows что дальше','драйверы после установки windows']}
];
const norm=s=>(s||'').toLowerCase().replace(/ё/g,'е').replace(/[.,!?;:()\[\]"']/g,' ').replace(/\s+/g,' ').trim();
const routeByHref=href=>document.querySelector(`a[href="${href}"]`);
function exactRoute(text){const s=norm(text);for(const r of routes){for(const k of r.keys){if(s===norm(k))return r}}return null}
function strongRoute(text){const s=norm(text);const words=s.split(' ').filter(w=>w.length>2);let best=null,bestScore=0,second=0;for(const r of routes){let score=0;for(const k of r.keys){const nk=norm(k);if(s.includes(nk)||nk.includes(s))score=Math.max(score,8);const kw=nk.split(' ').filter(w=>w.length>2);const shared=words.filter(w=>kw.includes(w)).length;score=Math.max(score,shared)}if(score>bestScore){second=bestScore;bestScore=score;best=r}else if(score>second)second=score}return bestScore>=2&&bestScore>=second+1?best:null}
function openAssistant(text){document.querySelectorAll('.searchable').forEach(x=>x.classList.remove('hidden'));const help=document.querySelector('.sf-help-btn');if(!help)return;help.click();setTimeout(()=>{const input=document.querySelector('.sf-help-panel input,.sf-help-panel textarea');if(input){input.value=text;input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();const form=input.closest('form');if(form){if(typeof form.requestSubmit==='function')form.requestSubmit();else form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}}},180)}
function smartStart(){const raw=q.value.trim();if(!raw)return;const r=exactRoute(raw)||strongRoute(raw);if(r){const el=routeByHref(r.href);if(el){location.href=el.href;return}location.href=r.href;return}openAssistant(raw)}
q.oninput=null;q.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();smartStart()}};if(btn){btn.textContent='Начать';btn.onclick=smartStart}
q.placeholder='Опишите проблему своими словами — например: нет интернета или компьютер тормозит';
})();
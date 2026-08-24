(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .footer-inner{position:relative;min-height:28px}
    .footer .copy{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;text-align:center}
    .sf-help-btn{bottom:54px!important}
    .sf-help-panel{bottom:114px!important}
    .sf-bot{background:#eefbf4!important;color:#10231a!important;border:1px solid #b7e4c7!important}
    .sf-bot b{color:#073b21!important}
    .sf-bot .sf-tag{color:#047857!important}
    .sf-secondary{background:#fff!important;color:#075b36!important;border:1px solid #86d5aa!important;box-shadow:0 1px 0 rgba(4,120,87,.06)}
    .sf-secondary:hover{background:#e9f9f0!important;border-color:#34a66f!important}
    .sf-primary{background:#087f5b!important;color:#fff!important}
    .sf-help-form button{background:#087f5b!important;color:#fff!important}
    #programs>.section-lead{display:none!important}
    #problems.section{padding:20px 0 22px!important}
    #problems .section-lead{margin:3px 0 14px!important}
    #problems .problems{gap:10px!important}
    #problems .problem{min-height:150px!important;padding:14px 16px 38px!important;border-radius:19px!important}
    #problems .problem .picon{width:40px!important;height:40px!important;border-radius:12px!important;font-size:20px!important}
    #problems .problem strong{margin-top:10px!important;font-size:15px!important}
    #problems .problem span{margin-top:6px!important;font-size:12px!important;line-height:1.4!important}
    #problems .steps{left:16px!important;bottom:11px!important;font-size:11px!important}
    #problems .cta{margin-top:10px!important;padding:12px 18px!important;border-radius:17px!important}
    .sf-components{margin-top:26px;padding:20px;border:1px solid rgba(38,48,82,.10);border-radius:20px;background:#f8fafc}
    .sf-components h3{text-align:center;margin:0 0 6px;font-size:22px}
    .sf-components>p{text-align:center;margin:0 0 15px;color:#56627a;font-size:13px}
    .sf-component-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .sf-component{padding:14px;border:1px solid rgba(38,48,82,.10);border-radius:14px;background:#fff}
    .sf-component strong{display:block;font-size:14px;color:#091331}
    .sf-component span{display:block;margin-top:4px;color:#56627a;font-size:12px;line-height:1.4}
    .sf-component a{display:inline-block;margin-top:7px;color:#087f5b;text-decoration:none;font-size:12px;font-weight:800}
    @media(max-width:900px){.sf-component-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:650px){.footer-inner{align-items:center;padding-bottom:18px}.footer-nav{justify-content:center}.footer .copy{position:static;transform:none;width:100%;text-align:center;margin-top:8px}#problems .problem{min-height:142px!important}.sf-component-grid{grid-template-columns:1fr}}
    @media(max-width:520px){.sf-help-btn{bottom:46px!important}.sf-help-panel{bottom:104px!important}}
  `;
  document.head.appendChild(style);

  const programsTitle=document.querySelector('#programs h2');
  if(programsTitle) programsTitle.textContent='Рекомендуемые к установке программы';

  document.querySelectorAll('details summary').forEach(summary=>{
    if(summary.textContent.trim()==='Правила и честные условия') summary.textContent='Правила и условия';
  });

  const programsGrid=document.querySelector('#programs .programs');
  if(programsGrid&&!document.querySelector('[data-sf-extra="aida64"]')){
    const cards=[
      {id:'aida64',name:'AIDA64',desc:'Информация о железе, датчиках и системе.',domain:'aida64.com',url:'https://www.aida64.com/downloads'},
      {id:'crystaldiskinfo',name:'CrystalDiskInfo',desc:'Проверка состояния SSD и HDD.',domain:'crystalmark.info',url:'https://crystalmark.info/en/software/crystaldiskinfo/'}
    ];
    cards.forEach(x=>{
      const el=document.createElement('div');
      el.className='program searchable';
      el.dataset.sfExtra=x.id;
      el.innerHTML=`<div class="iconbox"><img class="icon" src="https://www.google.com/s2/favicons?domain=${x.domain}&sz=128" alt="${x.name}"></div><div><div class="name">${x.name}</div><div class="desc">${x.desc}</div><div class="status">✓ Официальная ссылка</div><a class="action" href="${x.url}" target="_blank" rel="noopener">Скачать →</a></div>`;
      programsGrid.appendChild(el);
    });
  }

  const programsSection=document.querySelector('#programs');
  if(programsSection&&!document.querySelector('.sf-components')){
    const block=document.createElement('div');
    block.className='sf-components';
    block.innerHTML=`<h3>Системные компоненты</h3><p>Устанавливайте только при необходимости — если программа или игра требует конкретный компонент.</p><div class="sf-component-grid">
      <div class="sf-component searchable"><strong>DirectX Runtime</strong><span>Компоненты DirectX для совместимости программ и игр.</span><a href="https://www.microsoft.com/en-us/download/details.aspx?id=35" target="_blank" rel="noopener">Microsoft →</a></div>
      <div class="sf-component searchable"><strong>Visual C++ Redistributable</strong><span>Библиотеки Microsoft Visual C++ для многих программ.</span><a href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist" target="_blank" rel="noopener">Microsoft →</a></div>
      <div class="sf-component searchable"><strong>Microsoft Edge WebView2 Runtime</strong><span>Веб-компонент, который используют многие приложения Windows.</span><a href="https://developer.microsoft.com/en-us/microsoft-edge/webview2/" target="_blank" rel="noopener">Microsoft →</a></div>
      <div class="sf-component searchable"><strong>Java Runtime Environment 8</strong><span>JRE 8 для приложений, которым нужен Java Runtime.</span><a href="https://www.java.com/download/" target="_blank" rel="noopener">Java →</a></div>
      <div class="sf-component searchable"><strong>Autoruns</strong><span>Sysinternals-утилита Microsoft для просмотра автозапуска.</span><a href="https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns" target="_blank" rel="noopener">Microsoft →</a></div>
      <div class="sf-component searchable"><strong>DirectX End-User Runtimes (June 2010)</strong><span>Старые библиотеки DirectX для некоторых старых игр и программ.</span><a href="https://www.microsoft.com/en-us/download/details.aspx?id=8109" target="_blank" rel="noopener">Microsoft →</a></div>
    </div>`;
    const accordions=programsSection.querySelector('.accordions');
    programsSection.insertBefore(block,accordions||null);
  }

  const apply=()=>{
    const btn=document.querySelector('.sf-help-btn');
    if(!btn)return false;
    btn.textContent='Помощник';
    btn.setAttribute('aria-label','Открыть помощник');
    Object.assign(btn.style,{
      background:'linear-gradient(135deg,#16a34a 0%,#059669 55%,#047857 100%)',
      color:'#fff',
      boxShadow:'0 12px 30px rgba(5,150,105,.30),0 0 0 3px rgba(255,255,255,.78)',
      fontWeight:'900',
      letterSpacing:'.1px'
    });
    const title=document.querySelector('.sf-help-title');
    if(title) title.textContent='Step & Flow · Помощник';

    document.querySelectorAll('a[href="#faq"],a[href="#ask"]').forEach(link=>{
      if(link.textContent.trim()!=='Задать вопрос')return;
      link.setAttribute('href','#ask');
      link.setAttribute('role','button');
      link.onclick=e=>{
        e.preventDefault();
        const panel=document.querySelector('.sf-help-panel');
        if(panel&&!panel.classList.contains('open')) btn.click();
        setTimeout(()=>document.querySelector('.sf-help-form input')?.focus(),60);
        history.replaceState(null,'',location.pathname+location.search+'#ask');
      };
    });
    return true;
  };
  if(!apply()){
    const timer=setInterval(()=>{if(apply())clearInterval(timer)},50);
    setTimeout(()=>clearInterval(timer),3000);
  }
})();

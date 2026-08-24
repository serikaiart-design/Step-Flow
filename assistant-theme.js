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
    @media(max-width:650px){.footer-inner{align-items:center;padding-bottom:18px}.footer-nav{justify-content:center}.footer .copy{position:static;transform:none;width:100%;text-align:center;margin-top:8px}#problems .problem{min-height:142px!important}}
    @media(max-width:520px){.sf-help-btn{bottom:46px!important}.sf-help-panel{bottom:104px!important}}
  `;
  document.head.appendChild(style);

  const programsTitle=document.querySelector('#programs h2');
  if(programsTitle) programsTitle.textContent='Рекомендуемые к установке программы';

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

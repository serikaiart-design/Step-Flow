(()=>{
  const apply=()=>{
    const btn=document.querySelector('.sf-help-btn');
    if(!btn)return false;
    btn.textContent='Помощник';
    btn.setAttribute('aria-label','Открыть помощник');
    Object.assign(btn.style,{
      background:'linear-gradient(135deg,#ff3d00 0%,#ff007a 52%,#7c3aed 100%)',
      color:'#fff',
      boxShadow:'0 12px 32px rgba(255,0,122,.38),0 0 0 3px rgba(255,255,255,.72)',
      fontWeight:'900',
      letterSpacing:'.1px'
    });
    const title=document.querySelector('.sf-help-title');
    if(title) title.textContent='Step & Flow · Помощник';
    return true;
  };
  if(!apply()){
    const timer=setInterval(()=>{if(apply())clearInterval(timer)},50);
    setTimeout(()=>clearInterval(timer),3000);
  }
})();

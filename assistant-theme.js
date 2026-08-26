(()=>{
  const base=new URL('.',document.currentScript&&document.currentScript.src?document.currentScript.src:location.href).href;
  const original=document.createElement('script');
  original.async=false;
  original.src=new URL('assistant-theme-base.js',base).href;
  original.onload=()=>{
    const style=document.createElement('style');
    style.textContent=`
      .sf-help-btn{
        width:68px!important;
        height:68px!important;
        min-width:68px!important;
        padding:0!important;
        border-radius:50%!important;
        display:grid!important;
        place-items:center!important;
        font-size:0!important;
        color:transparent!important;
        background:linear-gradient(145deg,#16d875 0%,#08b987 48%,#13a8d7 100%)!important;
        border:2px solid rgba(255,255,255,.95)!important;
        box-shadow:0 10px 28px rgba(0,196,132,.30),0 0 0 5px rgba(20,210,145,.10)!important;
        right:4px!important;
        bottom:38px!important;
      }
      .sf-help-btn::after{
        content:''!important;
        width:34px!important;
        height:34px!important;
        display:block!important;
        background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='white' d='M12 10h40a8 8 0 0 1 8 8v23a8 8 0 0 1-8 8H28L15 58l3-9h-6a8 8 0 0 1-8-8V18a8 8 0 0 1 8-8Z'/%3E%3Ccircle cx='24' cy='30' r='3.5' fill='%2308b987'/%3E%3Ccircle cx='32' cy='30' r='3.5' fill='%2308b987'/%3E%3Ccircle cx='40' cy='30' r='3.5' fill='%2308b987'/%3E%3C/svg%3E")!important;
      }
      .sf-help-btn::before{display:none!important}
      .sf-help-btn:hover{
        transform:translateY(-2px) scale(1.03)!important;
        box-shadow:0 14px 34px rgba(0,196,132,.38),0 0 0 6px rgba(20,210,145,.12)!important;
      }
      @media(max-width:650px){
        .sf-help-btn{width:64px!important;height:64px!important;min-width:64px!important;right:3px!important;bottom:24px!important}
        .sf-help-btn::after{width:32px!important;height:32px!important}
      }
    `;
    document.head.appendChild(style);
    const apply=()=>{
      const b=document.querySelector('.sf-help-btn');
      if(!b)return false;
      b.textContent='';
      b.setAttribute('aria-label','Открыть помощника');
      b.setAttribute('title','Помощник');
      return true;
    };
    if(!apply()){
      const timer=setInterval(()=>{if(apply())clearInterval(timer)},50);
      setTimeout(()=>clearInterval(timer),4000);
    }
  };
  document.body.appendChild(original);
})();
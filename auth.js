(function(){
  function decode(t){try{return JSON.parse(atob(t))}catch(e){return null}}
  var h=new URLSearchParams(location.hash.replace(/^#/,'')), inc=h.get('token');
  if(inc){sessionStorage.setItem('token',inc);history.replaceState(null,'',location.pathname+location.search);}
  var tok=decode(sessionStorage.getItem('token')||'');
  var back=encodeURIComponent(location.origin+location.pathname);
  var msg=document.getElementById('msg');
  if(!tok){location.replace(window.LOGIN_URL+'?return='+back);return;}
  if(tok.exp<Date.now()){sessionStorage.removeItem('token');msg.textContent='Session expired. Please log in again.';setTimeout(function(){location.replace(window.LOGIN_URL+'?return='+back+'&reason=expired')},1500);return;}
  var u=document.getElementById('user'); if(u)u.textContent=tok.user;
  document.getElementById('content').hidden=false;
  var lo=document.getElementById('logout'); if(lo)lo.onclick=function(){sessionStorage.removeItem('token');location.replace('index.html');};
  window.__user=tok.user;
})();

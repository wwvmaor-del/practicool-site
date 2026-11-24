(function(){
document.addEventListener('click',function(e){
var h=document.querySelector('.hdr'),b=document.getElementById('nx-burger');
if(h&&b){if(e.target.closest('#nx-burger')){var o=h.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');return}
if(e.target.closest('.hdr .nav a')){h.classList.remove('open');b.setAttribute('aria-expanded','false')}}
var t=e.target.closest('.pc-tour-btn');if(t){var w=t.parentNode,f=document.createElement('iframe');f.src=w.getAttribute('data-src');f.title='סיור תלת־ממד';f.allow='fullscreen';f.setAttribute('allowfullscreen','');w.appendChild(f);t.remove();return}
var v=e.target.closest('.pc-vid');if(v&&!v.querySelector('iframe')){var y=document.createElement('iframe');y.src='https://www.youtube-nocookie.com/embed/'+v.getAttribute('data-yt')+'?autoplay=1&rel=0';y.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';y.title='סרטון';v.appendChild(y)}});
document.addEventListener('submit',function(e){
if(!e.target||e.target.id!=='nx-form')return;e.preventDefault();
var g=function(i){var x=document.getElementById(i);return x?x.value.trim():''};
if(!g('f-name')||!g('f-phone')){var d=document.getElementById('nx-done');d.hidden=false;d.textContent='נא למלא שם וטלפון.';return}
var m='פנייה מטופס האתר\nשם: '+g('f-name')+'\nטלפון: '+g('f-phone')+'\nעיר / פרויקט: '+g('f-city')+'\nסוג לקוח: '+g('f-who')+(g('f-msg')?'\nהודעה: '+g('f-msg'):'')+'\n(נשלח מהאתר · דף: '+document.body.getAttribute('data-page')+' · טופס)';
var u='https://wa.me/972515002490?text='+encodeURIComponent(m);
if(window.__PC_PREVIEW){var d2=document.getElementById('nx-done');d2.hidden=false;d2.innerHTML='בתצוגה המקדימה: <a href="'+u+'" target="_blank" rel="noopener">לחצו כאן לפתיחת הפנייה בוואטסאפ</a>';return}
location.href=u});
})();
window.pcsInit=function(){
var el=document.getElementById('pcs-data');if(!el)return;var D=JSON.parse(el.textContent);
var nf=function(x){return x.toLocaleString('he-IL')};
var val=function(n){var c=document.querySelector('input[name="'+n+'"]:checked');return c?c.value:null};
var chosen=null;
var REC={live:['mini_split','mini_multi','vrf'],invest:['split','mini','mini_split']};
var TXT={big:'גדול',small:'קטן',unknown:'לא ידוע'};
function render(){
 var rooms=val('rooms'),shaft=val('shaft'),use=val('use');var res=document.getElementById('pcs-res');
 if(!rooms){return}
 document.getElementById('pcs-hint').hidden=true;res.hidden=false;if(shaft&&use&&!window.__pcsSeen){window.__pcsSeen=1;setTimeout(function(){res.scrollIntoView({behavior:'smooth',block:'start'})},150)}document.getElementById('pcs-note').hidden=false;document.getElementById('pcs-cta').hidden=false;
 var P=D.prices[rooms];var cards=D.options.map(function(o){
  var off=(shaft==='small'&&+rooms>=4&&(o.k==='split'||o.k==='mini_split'));
  var rec=!off&&REC[use].indexOf(o.k)>=0;
  return {o:o,off:off,rec:rec,p:P[o.k]||{}};
 });
 cards.sort(function(a,b){return (b.rec-a.rec)||(a.off-b.off)});
 if(!chosen||cards.some(function(c){return c.o.k===chosen&&c.off}))chosen=(cards.find(function(c){return c.rec})||cards[0]).o.k;
 res.innerHTML=cards.map(function(c){
  var rows='';
  if(c.p.il)rows+='<div class="pcs-row"><span>טורנדו, אלקטרה, תדיראן ועוד</span><b>'+nf(c.p.il[0])+' – '+nf(c.p.il[1])+' ₪</b></div>';
  if(c.p.jp)rows+='<div class="pcs-row"><span>מיצובישי, דייקין</span><b>החל מ-'+nf(c.p.jp[0])+' ₪</b></div>';
  var badge=c.off?'<span class="pcs-badge no">לא מתאים למסתור קטן בדירה כזו</span>':(c.rec?'<span class="pcs-badge">מתאים לכם</span>':'');
  var nm=c.o.n,ds=c.o.d;
  if(rooms==='6'&&c.o.k==='mini'){nm='מיני מרכזי + עילי בחדר הורים';ds='בדירת 6 חדרים: מיני לסלון ולחדרים · מזגן עילי בחדר ההורים'}
  return '<button type="button" class="pcs-card'+(c.off?' off':'')+'" data-k="'+c.o.k+'" aria-pressed="'+(c.o.k===chosen)+'"'+(c.off?' disabled':'')+'>'+badge+'<h3>'+nm+'</h3><p class="d">'+ds+'</p>'+rows+'</button>';
 }).join('');
 var opt=D.options.find(function(o){return o.k===chosen});
 var sum='דירת '+(rooms==='6'?'6+':rooms)+' חדרים · מסתור: '+TXT[shaft]+' · '+(use==='live'?'למגורים':'להשקעה')+'\nהאפשרות שמעניינת אותי: '+((rooms==='6'&&opt.k==='mini')?'מיני מרכזי + עילי בחדר הורים':opt.n)+'\n(נשלח מהאתר · מחשבון מחיר)';
 document.getElementById('pcs-wa').href='https://wa.me/'+D.wa+'?text='+encodeURIComponent('שלום, אשמח להצעת מחיר מדויקת.\n'+sum);
 document.getElementById('pcs-plan').href='https://wa.me/'+D.wa+'?text='+encodeURIComponent('שלום, מצרף/ת תוכנית דירה ואשמח לקבל סיור תלת־ממד והצעה.\n'+sum);
}
window.__pcs={render:render,pick:function(k){chosen=k;render()}};
if(!window.__pcsBound){window.__pcsBound=1;
document.addEventListener('change',function(e){if(e.target.closest&&e.target.closest('#pcs'))window.__pcs.render()});
document.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('.pcs-card');if(c&&!c.disabled){window.__pcs.pick(c.getAttribute('data-k'))}});}
render();
};
window.pcsInit();
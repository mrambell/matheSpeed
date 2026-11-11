"use strict";
/* ---------- input ---------- */
function key(k){const X=B&&!B.done?B:S&&!S.done?S:null;if(!X||X.lock||!$('#modal').hidden)return;
  if(k==='back')X.input=X.input.slice(0,-1);
  else if(k==='ok'){if(X===S)submit();return}
  else if(k===','){if(X===S&&S.q.comma&&X.input&&!X.input.includes(','))X.input+=','}
  else if(k==='R'){if(X===S&&S.q.rem&&X.input&&!X.input.includes('R'))X.input+='R'}
  else if(X.input.length<9)X.input+=k;
  drawInp();if(X===B&&B.input.length>=B.q.a.length)bCheck()}
const ACT={
 tab:d=>go(d.t),grade:d=>{state.grade=+d.g;save();render()},
 mission:()=>startSession('mission',missionPlan()),
 practice:d=>startSession('topic',Array(8).fill(d.id)),
 theory:d=>{tab='theory';ui={id:d.id};render();scrollTo(0,0)},
 again:()=>S.kind==='mission'?ACT.mission():startSession('topic',S.plan),
 quit:()=>go('home'),k:d=>key(d.k),help:()=>{if(!S.lock)openGuide('help')},
 gnext:()=>{G.i++;snd.tap();vGuide()},
 gdone:()=>{$('#modal').hidden=true;gain(3);if(S.twins<2){S.twins++;S.wantTwin=true}else toast('Das üben wir bald noch einmal.');save();next()},
 egg:()=>{const R=B||S;R.open=true;snd.win();if(R.egg.tier)confetti();B?vBlitzRes():vResult()},
 blitz:d=>{S=null;startBlitz(d.k)},
 sound:d=>{state.sound=d.v==='1';save();render();snd.ok()},
 exp:()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,1)],{type:'application/json'}));a.download=`mathespeed-${(state.name||'spielstand').toLowerCase().replace(/[^a-z0-9äöüß]+/g,'-')}-${day()}.json`;document.body.append(a);a.click();a.remove();toast('Datei wird gespeichert. Klappt es nicht, nutze „Als Text anzeigen“.')},
 exptxt:()=>{ui.txt=!ui.txt;render()},
 copy:()=>{const o=$('#out');navigator.clipboard.writeText(o.value).then(()=>toast('Kopiert.')).catch(()=>{o.select();toast('Text ist markiert. Jetzt kopieren.')})},
 imptxt:()=>importJSON($('#paste').value),
 install:()=>{installEvt&&installEvt.prompt()},
 reset1:()=>{ui.reset=1;render()},reset0:()=>{ui.reset=0;render()},
 reset2:()=>{state=DEF();save();go('home');toast('Spielstand gelöscht.')}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&ACT[b.dataset.a])ACT[b.dataset.a](b.dataset)});
document.addEventListener('change',e=>{if(e.target.id==='nm'){state.name=e.target.value.trim();save();shell()}
  if(e.target.id==='file'&&e.target.files[0]){const r=new FileReader();r.onload=()=>importJSON(r.result);r.readAsText(e.target.files[0])}});
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;
  if(!$('#modal').hidden){if(e.key==='Enter'){e.preventDefault();const b=$('#gbtn');b&&b.click()}return}
  if(/^\d$/.test(e.key))key(e.key);else if(e.key==='Backspace'){e.preventDefault();key('back')}else if(e.key==='Enter'&&(S||B)&&!e.target.closest('button'))key('ok');else if(e.key==='r'||e.key==='R')key('R');else if(e.key===','||e.key==='.')key(',')});
load();render();

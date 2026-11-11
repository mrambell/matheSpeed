"use strict";
/* ---------- shell ---------- */
let tab='home',S=null,B=null,G=null,view=null,openedAt=Date.now(),ui={};
const app=$('#app');
function shell(){const lv=level(),a=lvlAt(lv),b=lvlAt(lv+1),[em,ti]=title();
  $('#hd').innerHTML=`<div class="ava" aria-hidden="true">${em}</div><div class="who"><b>${esc(state.name||'Mathe-Fuchs')}</b>
  <div class="xpb" title="${state.xp-a} von ${b-a} Punkten"><i style="width:${Math.round((state.xp-a)/(b-a)*100)}%"></i></div><small>Stufe ${lv} · ${ti}</small></div>
  <span class="chip" title="Tage in Folge">🔥 ${shownStreak()}</span><button class="gear" data-a="tab" data-t="eltern" aria-label="Einstellungen und Elternbereich">⚙</button>`;
  $('#nav').innerHTML=[['home','⌂','Start'],['themen','▦','Themen'],['blitz','⚡','Blitz'],['album','★','Sammlung']].map(([k,i,l])=>`<button data-a="tab" data-t="${k}" class="${tab===k?'on':''}"><span aria-hidden="true">${i}</span>${l}</button>`).join('');
  document.body.classList.toggle('insess',!!(S||B))}
function go(t){tab=t;S=null;if(B){clearInterval(B.iv);B=null}ui={};render();scrollTo(0,0)}
function render(){shell();({home:vHome,themen:vTopics,blitz:vBlitzMenu,album:vAlbum,eltern:vParents,theory:vTheory})[tab]()}
const starsH=n=>`<span class="stars" aria-label="${n} von 3 Sternen">${'★'.repeat(n)}<s>${'★'.repeat(3-n)}</s></span>`;
const gradeSeg=()=>`<div class="seg" role="group" aria-label="Klasse">${[3,4].map(g=>`<button data-a="grade" data-g="${g}" class="${state.grade===g?'on':''}">${g}. Klasse</button>`).join('')}</div>`;

function vHome(){const t=tod(),goal=15,[em]=title(),nm=state.name?`, ${esc(state.name)}`:'',sk=shownStreak();
  const hello=t.mission?`Mission geschafft${nm}! Wenn du magst, wartet noch eine Blitzrunde auf dich.`:sk>1?`Hallo${nm}! ${sk} Tage in Folge. Heute machen wir ${sk+1} daraus.`:state.tot.sessions?`Schön, dass du wieder da bist${nm}! Deine Mission ist bereit.`:`Hallo${nm}! Ich bin dein Mathe-Begleiter. Tippe auf „Los geht's“ und wir fangen leicht an.`;
  const now=new Date(),mon=new Date(now);mon.setDate(now.getDate()-(now.getDay()+6)%7);
  const week=['Mo','Di','Mi','Do','Fr','Sa','So'].map((l,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);const k=dstr(d),on=state.hist[k]&&state.hist[k].n>0;return `<div class="${on?'on':''} ${k===day()?'now':''}"><i>${on?'✓':''}</i>${l}</div>`}).join('');
  const bb=Math.max(0,...Object.values(state.blitz).map(x=>x.best));
  app.innerHTML=`<div class="bubble"><div class="ava" aria-hidden="true">${em}</div><p>${hello}</p></div>
  <section class="card mission"><h2>${t.mission?'Extra-Mission':'Tagesmission'}</h2><p>10 Aufgaben, bunt gemischt und passend für dich. Dauert etwa 5 Minuten.</p>
   <button class="btn sun wide" data-a="mission">Los geht's</button></section>
  <section class="card goal"><div class="row sp"><b>Tagesziel</b><span class="muted">${Math.min(t.ok,goal)} von ${goal} richtigen Antworten</span></div><div class="bar"><i style="width:${Math.min(100,t.ok/goal*100)}%"></i></div>
   <div class="week" aria-label="Diese Woche">${week}</div>${state.joker?`<span class="muted">🛟 ${state.joker} Pausen-Joker: Ein verpasster Tag macht deine Serie nicht kaputt.</span>`:''}</section>
  <div class="tiles"><button class="card tile" data-a="tab" data-t="blitz"><div class="sym">⚡</div><b>Blitzrunde</b><small>${bb?`Rekord: ${bb} Punkte`:'60 Sekunden Kopfrechnen'}</small></button>
   <button class="card tile" data-a="tab" data-t="themen"><div class="sym">▦</div><b>Themen</b><small>Üben und Erklärungen</small></button></div>
  <div class="row sp"><span class="muted">Aufgaben für</span>${gradeSeg()}</div>`}

function vTopics(){app.innerHTML=`<div class="row sp"><h1>Themen</h1>${gradeSeg()}</div><p class="muted" style="margin:0">Vier richtige Antworten in Folge bringen dich eine Stufe höher. Drei Sterne heißt: Das kannst du.</p>
  <div class="topics">${T.filter(t=>t.g===state.grade).map(t=>{const s=st(t.id);return `<div class="card topic"><div class="row sp"><div class="sym">${t.sym}</div>${starsH(s.stars)}</div><h3>${t.name}</h3>
   <div class="row"><button class="btn sm" data-a="practice" data-id="${t.id}">Üben</button><button class="btn sm sec" data-a="theory" data-id="${t.id}">Erklärung</button></div></div>`}).join('')}</div>`}

function vTheory(){const t=TOP[ui.id],q=t.gen(1);app.innerHTML=`<button class="btn sm sec" style="align-self:flex-start" data-a="tab" data-t="themen">‹ Themen</button>
  <div class="row"><div class="sym">${t.sym}</div><h1>${t.name}</h1></div>
  <div class="rule"><b>So geht's</b><br>${t.rule}</div>
  <section class="card"><h3>Beispiel</h3><div class="ex">${t.ex}</div></section>
  <section class="card"><h3>Noch ein Beispiel, Schritt für Schritt</h3><div class="task" style="margin:8px 0">${q.t}</div>${q.fig||''}<ol class="steps">${q.steps.map(s=>`<li><span>${s}</span></li>`).join('')}</ol>
   <button class="btn sm sec" style="margin-top:10px" data-a="theory" data-id="${t.id}">Anderes Beispiel</button></section>
  <button class="btn wide" data-a="practice" data-id="${t.id}">Jetzt üben</button>`}

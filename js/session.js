"use strict";
/* ---------- practice session ---------- */
function mk(tid){const q=TOP[tid].gen(st(tid).lvl);q.tid=tid;q.a=String(q.a);return q}
function missionPlan(){const ts=T.filter(t=>t.g===state.grade),due=state.due.filter(id=>TOP[id]&&TOP[id].g===state.grade).slice(0,3);
  const rest=shuffle(ts.filter(t=>!due.includes(t.id))).sort((a,b)=>st(a.id).stars-st(b.id).stars).slice(0,5-due.length).map(t=>t.id);
  const ids=[...due,...rest];return shuffle([...ids,...ids])}
function startSession(kind,plan){S={kind,plan,i:0,ok:0,n:0,combo:0,xp:0,lv0:level(),ups:[],q:null,input:'',lock:false,twins:0};tab='sess';next()}
function next(){if(S.wantTwin){S.wantTwin=false;S.twin=true;S.q=mk(S.q.tid)}else{if(S.i>=S.plan.length)return finish();S.twin=false;S.twins=0;S.q=mk(S.plan[S.i++])}
  S.input='';S.lock=false;S.t0=Date.now();vQ()}
function padH(q){return `<div class="pad">${q.rem?'<button class="rk" data-a="k" data-k="R">R (Rest)</button>':q.comma?'<button class="rk" data-a="k" data-k=",">, (Komma)</button>':''}${[1,2,3,4,5,6,7,8,9].map(k=>`<button data-a="k" data-k="${k}">${k}</button>`).join('')}
  <button data-a="k" data-k="back" aria-label="Löschen">⌫</button><button data-a="k" data-k="0">0</button><button class="okb" data-a="k" data-k="ok" aria-label="Antwort prüfen">✓</button></div>`}
function vQ(){shell();const q=S.q,t=TOP[q.tid];
  app.innerHTML=`<div class="sess"><div class="sbar"><button class="x" data-a="quit" aria-label="Runde beenden">✕</button><div class="bar"><i style="width:${(S.i-1)/S.plan.length*100}%"></i></div><span class="combo">${S.combo>1?'🔥 '+S.combo:''}</span></div>
  <div class="card qcard"><div class="qtopic">${t.name}${S.twin?' · neuer Versuch':''}</div><div class="qtext ${q.w?'w':''}">${q.t}${q.w||q.t.startsWith('<pre')?'':' ='}</div>${q.fig||''}
   <div class="ans"><span class="inp" id="inp" aria-live="polite"></span>${q.u?`<span class="unit">${q.u}</span>`:''}</div></div>
  <div class="fb neutral" id="fb">Tippe dein Ergebnis und dann ✓</div>
  <button class="help" data-a="help">Das weiß ich noch nicht. Zeig es mir!</button>${padH(q)}</div>`;drawInp()}
function drawInp(){const e=$('#inp');if(e)e.textContent=(B?B.input:S.input).replace('R',' R ')}
function record(tid,ok,dt,twin){const s=st(tid),h=hist();s.n++;state.tot.n++;h.n++;
  if(ok){s.ok++;s.row++;s.miss=0;s.ms+=dt;state.tot.ok++;h.ok++;tod().ok++;if(!twin)state.due=state.due.filter(x=>x!==tid);
    if(s.row>=4){if(s.lvl<3){s.stars=Math.max(s.stars,s.lvl);s.lvl++;s.row=0;S.ups.push(tid)}else if(s.stars<3){s.stars=3;S.ups.push(tid)}}}
  else{s.row=0;s.miss++;if(s.miss>=2&&s.lvl>1){s.lvl--;s.miss=0}if(!state.due.includes(tid))state.due.push(tid)}}
function gain(x){state.xp+=x;if(S)S.xp+=x}
function submit(){if(!S.input||S.lock)return;const q=S.q,dt=Date.now()-S.t0;
  if(same(S.input,q)){S.lock=true;record(q.tid,true,dt,S.twin);S.ok++;S.n++;S.combo++;state.tot.maxCombo=Math.max(state.tot.maxCombo,S.combo);
    let x=S.twin?8:10+Math.min(S.combo-1,5),msg=pick(PRAISE);
    if(S.twin){state.tot.fixed++;msg='Geschafft! Aus dem Fehler gelernt.'}
    else if(q.fast&&dt<5000){x+=2;msg='Blitzschnell!'}
    if(S.combo===3)msg='3 in Folge!';if(S.combo===5)msg='5 in Folge. Du bist im Flow!';if(S.combo===10)msg='10 in Folge. Unaufhaltbar!';
    gain(x);save();snd.ok();$('#inp').classList.add('good');const fb=$('#fb');fb.className='fb';fb.textContent=`${msg} +${x} Punkte`;setTimeout(()=>S&&next(),1000)}
  else{record(q.tid,false,dt);S.n++;S.combo=0;save();snd.no();openGuide('wrong')}}
function openGuide(kind){S.lock=true;G={kind,i:0,given:S.input};if(kind==='help'){record(S.q.tid,false,0);S.n++;S.combo=0;state.tot.help++;save()}vGuide()}
function vGuide(){const q=S.q,t=TOP[q.tid],[em]=title(),done=G.i>=q.steps.length,m=$('#modal');
  const fresh=m.hidden;m.hidden=false;m.innerHTML=`<div class="sheet${fresh?' in':''}" role="dialog" aria-modal="true" aria-label="Erklärung">
  <div class="bubble"><div class="ava" aria-hidden="true">${em}</div><p>${G.kind==='help'?'Super, dass du fragst! So lernen Profis.':pick(CALM)}${G.kind==='wrong'?` Du hattest <b>${esc(G.given.replace('R',' R '))}</b>.`:''}</p></div>
  <div class="rule"><b>So geht's</b><br>${t.rule}</div>
  <div class="task">${q.t}</div>${q.fig||''}
  <ol class="steps">${q.steps.slice(0,G.i).map(s=>`<li><span>${s}</span></li>`).join('')}</ol>
  ${done?`<button class="btn wide" data-a="gdone" id="gbtn">${S.twins<2?'Verstanden. Ich probiere eine ähnliche Aufgabe':'Verstanden. Weiter geht es'}</button>`
    :`<button class="btn sun wide" data-a="gnext" id="gbtn">${G.i?'Nächster Schritt':'Zeig mir den ersten Schritt'} (${G.i+1} von ${q.steps.length})</button>`}
  <details><summary>Ein Beispiel ansehen</summary><div class="ex">${t.ex}</div></details></div>`;
  const sh=m.firstElementChild;sh.scrollTop=sh.scrollHeight}
function finish(){const first=!tod().mission&&S.kind==='mission';gain(20);if(first){gain(30);tod().mission=true}
  state.tot.sessions++;markActive();S.egg=drawSticker();S.first=first;S.newB=checkBadges();save();S.done=true;vResult()}
function drawSticker(){const r=Math.random(),tier=r<.08?2:r<.35?1:0,pool=STK[tier],fresh=pool.filter(e=>!state.stickers[e]),e=fresh.length&&Math.random()<.8?pick(fresh):pick(pool),dup=!!state.stickers[e];
  state.stickers[e]=(state.stickers[e]||0)+1;if(dup)state.xp+=15;return{e,tier,dup}}
function checkBadges(){const n=[];BADGES.forEach(b=>{if(!state.badges[b.id]&&b.t(state)){state.badges[b.id]=day();n.push(b)}});return n}
function rewardsH(R){return `<section class="card res" style="width:100%"><h3>Dein Überraschungs-Ei</h3>
   ${R.open?`<div class="stk tier${R.egg.tier}">${R.egg.e}</div><b>${TIER[R.egg.tier]||'Neuer Sticker!'}</b><span class="muted">${R.egg.dup?'Den hast du schon. Dafür gibt es 15 Extra-Punkte.':'Ab damit in deine Sammlung.'}</span>`
    :`<button class="egg" data-a="egg" aria-label="Ei öffnen">🥚</button><span class="muted">Tippe das Ei an!</span>`}</section>
  ${R.newB.length?`<section class="card list"><h3>Neue Abzeichen</h3>${R.newB.map(b=>`<div class="badge"><div class="sym">${b.i}</div><div><b>${b.n}</b><br><span class="muted">${b.d}</span></div></div>`).join('')}</section>`:''}
  ${level()>R.lv0?`<section class="card res" style="width:100%"><h3>Stufe ${level()} erreicht!</h3><div class="stk">${title()[0]}</div><b>Du bist jetzt ${title()[1]}.</b></section>`:''}
  ${Date.now()-openedAt>25*6e4?'<p class="muted">Du lernst schon eine ganze Weile. Eine Pause tut deinem Kopf gut. Morgen geht es weiter!</p>':''}`}
function vResult(){shell();const r=S.n?S.ok/S.n:0,head=r>=.9?'Fantastisch!':r>=.6?'Gut gemacht!':'Du bist drangeblieben!';
  app.innerHTML=`<div class="res"><h1>${head}</h1><div class="big">${S.ok} <span style="font-size:.45em">von ${S.n} richtig</span></div>
  <div class="row" style="justify-content:center"><span class="chip">+${S.xp} Punkte</span><span class="chip">🔥 ${shownStreak()} ${shownStreak()===1?'Tag':'Tage'}</span></div>
  ${S.first?'<p style="margin:0"><b>Tagesmission erledigt.</b> 30 Bonuspunkte!</p>':''}
  ${r<.6?'<p class="muted" style="margin:0">Jede Erklärung, die du gelesen hast, macht dich stärker. Die Aufgaben kommen bald noch einmal dran.</p>':''}
  ${S.ups.length?`<section class="card list"><h3>Aufgestiegen</h3>${[...new Set(S.ups)].map(id=>`<div class="row sp"><b>${TOP[id].name}</b>${starsH(st(id).stars)}</div>`).join('')}</section>`:''}
  ${rewardsH(S)}
  <div class="row" style="justify-content:center"><button class="btn" data-a="again">Noch eine Runde</button><button class="btn sec" data-a="tab" data-t="home">Fertig für jetzt</button></div></div>`;
  if(!S.shown){S.shown=1;snd.win();confetti()}}

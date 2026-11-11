"use strict";
/* ---------- speed round ---------- */
function vBlitzMenu(){app.innerHTML=`<h1>Blitzrunde</h1><p class="muted" style="margin:0">${BLITZ_SEC} Sekunden. So viele Aufgaben wie möglich. Du spielst nur gegen deinen eigenen Rekord.</p>
  <div class="list">${Object.entries(BL).map(([k,b])=>{const r=state.blitz[k];return `<button class="card row" style="text-align:left" data-a="blitz" data-k="${k}"><div class="sym">${b.sym}</div><div style="flex:1"><b style="font-family:var(--display);font-size:18px">${b.name}</b><br><span class="muted">${r?`Rekord: ${r.best} Punkte · ${r.runs} Runden`:'Noch nicht gespielt'}</span></div><span class="chip">Start</span></button>`}).join('')}</div>`}
function startBlitz(k){B={k,score:0,n:0,combo:0,max:0,miss:[],input:'',lock:false,end:Date.now()+BLITZ_SEC*1000,lv0:level()};tab='sess';shell();
  app.innerHTML=`<div class="sess"><div class="sbar"><button class="x" data-a="quit" aria-label="Runde beenden">✕</button><div class="bar"><i id="tb" style="width:100%;transition:none;background:var(--sun)"></i></div><span class="time" id="tt">${BLITZ_SEC}</span></div>
  <div class="row sp"><span class="chip">Punkte: <span id="bs">0</span></span><span class="chip" id="bc"></span><span class="muted">Rekord: ${state.blitz[k]?state.blitz[k].best:0}</span></div>
  <div class="card qcard"><div class="qtopic">${BL[k].name}</div><div class="bq" id="bq"></div><div class="ans"><span class="inp" id="inp"></span></div></div>
  <div class="fb neutral" id="fb">Die Antwort wird automatisch geprüft. Einfach tippen!</div>${padH({})}</div>`;
  bNext();B.iv=setInterval(()=>{const left=B.end-Date.now();if(left<=0)return bEnd();$('#tb').style.width=left/(BLITZ_SEC*10)+'%';$('#tt').textContent=Math.ceil(left/1000)},100)}
function bNext(){let q;do{q=BL[B.k].gen()}while(B.q&&q.t===B.q.t);q.a=String(q.a);B.q=q;B.input='';B.lock=false;$('#bq').textContent=q.t;const i=$('#inp');i.className='inp';drawInp()}
function bCheck(){const q=B.q,ok=B.input===q.a,fb=$('#fb'),h=hist();B.n++;B.lock=true;h.n++;state.tot.n++;
  if(ok){B.combo++;B.max=Math.max(B.max,B.combo);B.score+=1;h.ok++;state.tot.ok++;tod().ok++;snd.tap();$('#inp').classList.add('good');fb.className='fb';fb.textContent=B.combo>=3?`${B.combo} in Folge!`:pick(PRAISE);setTimeout(()=>B&&bNext(),160)}
  else{B.combo=0;B.miss.push(`${q.t} = ${q.a}`);snd.no();$('#inp').classList.add('oops');fb.className='fb neutral';fb.innerHTML=`Merk dir: <b>${q.t} = ${q.a}</b>`;setTimeout(()=>B&&bNext(),1100)}
  $('#bs').textContent=B.score;$('#bc').textContent=B.combo>1?'🔥 '+B.combo:''}
function bEnd(){clearInterval(B.iv);const r=state.blitz[B.k]||(state.blitz[B.k]={best:0,runs:0,last:[]}),rec=B.score>r.best&&B.score>0;B.prev=r.best;
  r.runs++;r.last=[...(r.last||[]),B.score].slice(-10);if(rec)r.best=B.score;B.rec=rec;B.xp=B.score*3+(rec?20:0)+10;state.xp+=B.xp;
  state.tot.maxCombo=Math.max(state.tot.maxCombo,B.max);state.tot.sessions++;markActive();B.egg=drawSticker();B.newB=checkBadges();save();B.done=true;vBlitzRes()}
function vBlitzRes(){shell();const miss=[...new Set(B.miss)];
  app.innerHTML=`<div class="res"><h1>${B.rec?'Neuer Rekord!':B.score>=B.prev*.8&&B.prev?'Ganz nah am Rekord!':'Stark gerechnet!'}</h1><div class="big">${B.score} <span style="font-size:.45em">Punkte</span></div>
  <div class="row" style="justify-content:center"><span class="chip">+${B.xp} Punkte</span><span class="chip">${B.n?`${(BLITZ_SEC/B.n).toFixed(1).replace('.',',')} s pro Aufgabe`:'0 Aufgaben'}</span><span class="chip">Beste Serie: ${B.max}</span></div>
  <p class="muted" style="margin:0">${B.rec?`Alter Rekord: ${B.prev}. Du wirst schneller!`:`Dein Rekord: ${state.blitz[B.k].best}. Beim nächsten Mal knackst du ihn vielleicht.`}</p>
  ${miss.length?`<section class="card list"><h3>Diese merken wir uns</h3>${miss.slice(0,6).map(m=>`<div class="ex">${m}</div>`).join('')}</section>`:''}
  ${rewardsH(B)}
  <div class="row" style="justify-content:center"><button class="btn" data-a="blitz" data-k="${B.k}">Nochmal</button><button class="btn sec" data-a="tab" data-t="home">Fertig für jetzt</button></div></div>`;
  if(!B.shown){B.shown=1;snd.win();if(B.rec)confetti()}}

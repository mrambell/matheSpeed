"use strict";
/* ---------- parents / settings / JSON save ---------- */
function vParents(){const days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(state.hist[dstr(d)]||{ok:0,n:0})}
  const mx=Math.max(1,...days.map(d=>d.n)),rows=T.filter(t=>state.topics[t.id]&&state.topics[t.id].n).map(t=>{const s=state.topics[t.id];return `<tr><td>${t.g}. ${t.name}</td><td>${'★'.repeat(s.stars)||'–'}</td><td>${s.lvl}</td><td>${Math.round(s.ok/s.n*100)} %</td><td>${s.ok?(s.ms/s.ok/1000).toFixed(1).replace('.',','):'–'} s</td></tr>`}).join('');
  app.innerHTML=`<h1>Einstellungen und Elternbereich</h1>
  <section class="card list"><label for="nm">Name des Kindes<input type="text" id="nm" maxlength="20" value="${esc(state.name)}" placeholder="z. B. Mia"></label>
   <div class="row sp"><b>Klasse</b>${gradeSeg()}</div>
   <div class="row sp"><b>Töne</b><div class="seg"><button data-a="sound" data-v="1" class="${state.sound?'on':''}">An</button><button data-a="sound" data-v="0" class="${state.sound?'':'on'}">Aus</button></div></div></section>
  <section class="card list"><h3>Fortschritt</h3><div class="row"><span class="chip">${state.tot.ok} richtig</span><span class="chip">${state.tot.n?Math.round(state.tot.ok/state.tot.n*100):0} % Trefferquote</span><span class="chip">Längste Serie: ${state.best} Tage</span><span class="chip">${state.tot.help} Erklärungen erbeten</span></div>
   <div><span class="muted">Aufgaben pro Tag, letzte 14 Tage</span><div class="days">${days.map(d=>`<i style="height:${d.n/mx*100}%" title="${d.ok} von ${d.n} richtig"></i>`).join('')}</div></div>
   ${rows?`<div class="scroll"><table><thead><tr><th>Thema</th><th>Sterne</th><th>Stufe</th><th>Richtig</th><th>Ø Zeit</th></tr></thead><tbody>${rows}</tbody></table></div>`:'<span class="muted">Noch keine Aufgaben gelöst.</span>'}
   ${state.due.length?`<span class="muted">Wird bald wiederholt: ${state.due.filter(i=>TOP[i]).map(i=>TOP[i].name).join(', ')}</span>`:''}</section>
  <section class="card list"><h3>Als App installieren</h3>${isApp()?'<span class="muted">matheSpeed ist installiert und läuft auch ohne Internet.</span>'
   :installEvt?'<button class="btn sm" style="justify-self:start" data-a="install">Auf diesem Gerät installieren</button><span class="muted">Danach läuft matheSpeed auch ohne Internet.</span>'
   :'<span class="muted">iPhone und iPad: in Safari auf „Teilen“ tippen, dann „Zum Home-Bildschirm“. Android: im Chrome-Menü ⋮ „App installieren“ wählen. Danach läuft matheSpeed auch ohne Internet.</span>'}</section>
  <section class="card list"><h3>Spielstand sichern</h3><p class="muted" style="margin:0">Alles bleibt in diesem Browser auf diesem Gerät. Es wird nichts ins Internet gesendet. Mit der JSON-Datei nimmst du den Spielstand auf ein anderes Gerät mit oder legst eine Sicherung an.</p>
   <div class="row"><button class="btn sm" data-a="exp">Als Datei speichern</button><button class="btn sm sec" data-a="exptxt">Als Text anzeigen</button></div>
   ${ui.txt?`<textarea id="out" readonly aria-label="Spielstand als JSON">${esc(JSON.stringify(state))}</textarea><button class="btn sm sec" data-a="copy">Text kopieren</button>`:''}
   <label for="file">Spielstand aus Datei laden<input type="file" id="file" accept=".json,application/json"></label>
   <label for="paste">Oder JSON-Text hier einfügen<textarea id="paste" placeholder='{"app":"mathespeed", ...}'></textarea></label>
   <button class="btn sm sec" data-a="imptxt">Eingefügten Text laden</button></section>
  <section class="card list"><h3>Neu anfangen</h3>${ui.reset?`<b>Wirklich den ganzen Spielstand löschen?</b><div class="row"><button class="btn sm" style="background:var(--bad);color:var(--card);box-shadow:none" data-a="reset2">Ja, alles löschen</button><button class="btn sm sec" data-a="reset0">Abbrechen</button></div>`:`<button class="btn sm sec" data-a="reset1">Spielstand löschen</button>`}</section>`}
function importJSON(txt){try{const s=JSON.parse(txt);if(!s||!['mathespeed','matheheft'].includes(s.app)||s.v!==1||typeof s.xp!=='number'||typeof s.topics!=='object')throw 0;state=merge(s);save();ui={};render();toast('Spielstand geladen.')}
  catch(e){toast('Das ist keine gültige matheSpeed-Datei.')}}

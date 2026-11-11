"use strict";
/* ---------- collection ---------- */
function vAlbum(){const all=STK.flat(),have=all.filter(e=>state.stickers[e]).length;
  app.innerHTML=`<h1>Sammlung</h1><section class="card"><div class="row sp"><h3>Sticker</h3><span class="muted">${have} von ${all.length}</span></div>
  <p class="muted">Nach jeder Runde gibt es ein Überraschungs-Ei.</p>
  <div class="album">${STK.map((tier,ti)=>tier.map(e=>state.stickers[e]?`<div class="tier${ti}">${e}${state.stickers[e]>1?`<small>×${state.stickers[e]}</small>`:''}</div>`:'<div class="no">?</div>').join('')).join('')}</div></section>
  <section class="card list"><div class="row sp"><h3>Abzeichen</h3><span class="muted">${Object.keys(state.badges).length} von ${BADGES.length}</span></div>
  ${BADGES.map(b=>`<div class="badge ${state.badges[b.id]?'':'off'}"><div class="sym">${state.badges[b.id]?b.i:'🔒'}</div><div><b>${b.n}</b><br><span class="muted">${b.d}</span></div></div>`).join('')}</section>`}

"use strict";
/* ---------- installable offline app: service worker, install prompt, persistent storage ---------- */
let installEvt=null;
const isApp=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if(tab==='eltern')render()});
addEventListener('appinstalled',()=>{installEvt=null;if(tab==='eltern')render()});
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});

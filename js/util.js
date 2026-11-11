"use strict";
/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[ri(0,a.length-1)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const f=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const eur=c=>(c/100).toFixed(2).replace('.',',')+' €';
const fr=(n,d)=>`<span class="fr"><b>${n}</b><b>${d}</b></span>`;
const pad2=n=>String(n).padStart(2,'0');
const dstr=d=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const day=()=>dstr(new Date());
const dayDiff=(a,b)=>Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NAMES=['Mia','Ben','Lina','Emil','Noah','Hanna','Paul','Ella'];
const PL=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender'];

/* answers: plain strings, or euro amounts with a comma ("2,5" counts as "2,50") */
const cents=s=>{const [e,c='']=String(s).split(',');return c.length>2?NaN:+e*100+ +c.padEnd(2,'0')};
const same=(input,q)=>q.comma?cents(input)===cents(q.a):input===q.a;

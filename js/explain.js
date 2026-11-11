"use strict";
/* ---------- step-by-step explanations ---------- */
function split(a,b,sg){
  const p=[Math.floor(b/100)*100,Math.floor(b%100/10)*10,b%10].filter(x=>x),op=sg>0?'+':'−',s=[];
  if(p.length>1)s.push(`Zerlege ${b} in ${p.join(' + ')}.`);
  let r=a;p.forEach(x=>{const n=r+sg*x;s.push(`${r} ${op} ${x} = <b>${n}</b>`);r=n});return s}
function vert(a,op,b){const A=f(a).replace(/ /g,' '),B=f(b).replace(/ /g,' '),w=Math.max(A.length,B.length);
  return `<pre class="col">  ${A.padStart(w)}\n${op} ${B.padStart(w)}\n${'─'.repeat(w+2)}</pre>`}
function colAdd(a,b){const s=['Schreibe die Zahlen genau untereinander: Einer unter Einer, Zehner unter Zehner. Fang rechts an.'];let c=0;
  const len=Math.max(String(a).length,String(b).length);
  for(let i=0;i<len;i++){const x=Math.floor(a/10**i)%10,y=Math.floor(b/10**i)%10,m=x+y+c;
    s.push(`${PL[i]}: ${x} + ${y}${c?' + 1 (gemerkt)':''} = ${m}. Schreibe <b>${m%10}</b>${m>9?' und merke 1':''}.`);c=m>9?1:0}
  if(c)s.push('Die gemerkte 1 kommt ganz nach vorne.');
  s.push(`Ergebnis: <b>${f(a+b)}</b>`);return s}
function colSub(a,b){const s=['Schreibe die Zahlen genau untereinander und fang rechts bei den Einern an.'];let c=0;
  const len=String(a).length;
  for(let i=0;i<len;i++){const x0=Math.floor(a/10**i)%10,y=Math.floor(b/10**i)%10,x=x0-c,was=c;
    if(i===len-1&&x-y===0&&y===0)break;
    if(x<y){s.push(`${PL[i]}: ${x0}${was?' − 1 (verliehen)':''} − ${y} geht nicht. Hol dir 10 von links: ${x+10} − ${y} = <b>${x+10-y}</b>`);c=1}
    else{s.push(`${PL[i]}: ${x0}${was?' − 1 (verliehen)':''} − ${y} = <b>${x-y}</b>`);c=0}}
  s.push(`Ergebnis: <b>${f(a-b)}</b>`);return s}
function malSteps(a,b){
  if(b===10)return['Mal 10 ist leicht: Hänge eine Null an.',`${a} · 10 = <b>${a*10}</b>`];
  if(b>5)return[`Zerlege ${b} in 5 + ${b-5}.`,`${a} · 5 = ${a*5}`,`${a} · ${b-5} = ${a*(b-5)}`,`${a*5} + ${a*(b-5)} = <b>${a*b}</b>`];
  const row=Array.from({length:b},(_,i)=>a*(i+1));
  return[`Zähle ${b}-mal in ${a}er-Schritten.`,row.join(', '),`${a} · ${b} = <b>${a*b}</b>`]}
function divSteps(n,d){const ds=String(n).split('').map(Number);let r=0,s=[],go=false;
  ds.forEach((g,i)=>{const cur=r*10+g,q=Math.floor(cur/d);
    if(!go&&q===0){s.push(`${cur} ist kleiner als ${d}. Nimm die nächste Ziffer dazu.`);r=cur;return}
    go=true;r=cur-q*d;
    s.push(`${cur} : ${d} = <b>${q}</b>${r?`, Rest ${r}`:''}.${i<ds.length-1?` Hol die ${ds[i+1]} herunter: ${r*10+ds[i+1]}`:''}`)});
  s.push(`Ergebnis: <b>${f(n/d)}</b>`);return s}
const rectFig=(a,b)=>`<svg class="fig" viewBox="0 0 230 120" role="img" aria-label="Rechteck ${a} cm mal ${b} cm"><rect x="20" y="12" width="150" height="76" rx="2"/><text x="95" y="110" text-anchor="middle">${a} cm</text><text x="178" y="56">${b} cm</text></svg>`;

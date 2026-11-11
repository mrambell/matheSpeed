"use strict";
/* ---------- money tasks: coins, comma notation, shopping, change (composed from parts) ---------- */
const GOODS=[['ein Heft','Hefte',60,180],['einen Radiergummi','Radiergummis',40,120],['einen Bleistift','Bleistifte',50,150],['eine Brezel','Brezeln',70,160],['einen Apfel','Äpfel',30,90],
 ['eine Eiskugel','Eiskugeln',100,200],['eine Schere','Scheren',250,480],['einen Klebestift','Klebestifte',120,290],['ein Lineal','Lineale',90,220],['einen Saft','Säfte',110,240],
 ['ein Brötchen','Brötchen',35,95],['einen Anspitzer','Anspitzer',80,190],['eine Postkarte','Postkarten',60,150],['einen Flummi','Flummis',50,130]];
const WISH=['ein Buch','ein Spiel','einen Ball','eine Mütze','ein Kuscheltier','einen Drachen','ein Puzzle','eine Taschenlampe'];
const COINS=[[200,'2 €','eu'],[100,'1 €','eu'],[50,'50','au'],[20,'20','au'],[10,'10','au'],[5,'5','cu'],[2,'2','cu'],[1,'1','cu']];
const PAY={100:'einer 1-€-Münze',200:'einer 2-€-Münze',500:'einem 5-€-Schein',1000:'einem 10-€-Schein',2000:'einem 20-€-Schein',5000:'einem 50-€-Schein'};
function money(L){
  const n=pick(NAMES),g=pick(GOODS),h=pick(GOODS.filter(x=>x!==g)),
   price=(x,step)=>ri(Math.ceil(x[2]/step),Math.floor(x[3]/step))*step,
   amt=c=>(c/100).toFixed(2).replace('.',','),
   W=(t,a,steps,o)=>Object.assign({t,a,steps,w:1},o),E={u:'€',comma:1},
   kind=pick([['toCt','fromComma','coins'],['sum','change','missing'],['multi','multiChange','howMany']][L-1]);
  switch(kind){
   case'toCt':{const e=ri(1,9),c=ri(1,19)*5;return W(`${e} € ${c} ct = ? ct`,e*100+c,['1 € = 100 ct',`${e} € = ${e*100} ct`,`${e*100} ct + ${c} ct = <b>${e*100+c} ct</b>`],{u:'ct'})}
   case'fromComma':{const p=ri(21,199)*5,e=Math.floor(p/100);return W(`${eur(p)} = ? ct`,p,['Vor dem Komma stehen die Euro, dahinter die Cent.',`${e} € = ${e*100} ct, dazu kommen ${p%100} ct.`,`${e*100} + ${p%100} = <b>${p} ct</b>`],{u:'ct'})}
   case'coins':{const set=shuffle(COINS).slice(0,3).sort((a,b)=>b[0]-a[0]).map(c=>[...c,ri(1,3)]),nm=v=>v>=100?`${v/100} €`:`${v} ct`,tot=set.reduce((s,c)=>s+c[0]*c[3],0);
     return W('Wie viel Cent liegen hier?',tot,[...set.map(([v,,,k])=>`${k} · ${nm(v)} = ${k*v} ct`),`${set.map(c=>c[0]*c[3]).join(' + ')} = <b>${tot} ct</b>`],
      {u:'ct',fig:`<div class="coins" role="img" aria-label="${set.map(([v,,,k])=>`${k} mal ${nm(v)}`).join(', ')}">${set.map(([,l,cl,k])=>`<span class="coin ${cl}">${l}</span>`.repeat(k)).join('')}</div>`})}
   case'sum':{const a=price(g,5),b=price(h,5);return W(`${n} kauft ${g[0]} für ${eur(a)} und ${h[0]} für ${eur(b)}. Wie viel Euro kostet das zusammen?`,amt(a+b),[`Rechne in Cent: ${a} ct und ${b} ct.`,`${a} + ${b} = ${a+b} ct`,`${a+b} ct = <b>${eur(a+b)}</b>`],E)}
   case'change':{const p=price(g,5),pay=[100,200,500,1000].find(v=>v>p),up=Math.ceil(p/100)*100,s=[];
     if(up>p)s.push(`Ergänze wie an der Kasse: von ${eur(p)} bis ${eur(up)} fehlen ${up-p} ct.`);
     if(pay>up)s.push(`Von ${eur(up)} bis ${eur(pay)} fehlen ${(pay-up)/100} €.`);
     s.push(`Rückgeld: <b>${eur(pay-p)}</b>`);
     return W(`${n} kauft ${g[0]} für ${eur(p)} und bezahlt mit ${PAY[pay]}. Wie viel Euro bekommt ${n} zurück?`,amt(pay-p),s,E)}
   case'missing':{const tp=ri(160,600)*5,have=ri(2,Math.floor(tp/100)-1)*100+pick([0,50]);
     return W(`${n} möchte ${pick(WISH)} für ${eur(tp)} kaufen und hat schon ${eur(have)} gespart. Wie viel Euro fehlen noch?`,amt(tp-have),['Gesucht: der Unterschied zwischen Preis und Erspartem.',`In Cent: ${tp} − ${have} = ${tp-have} ct`,`${tp-have} ct = <b>${eur(tp-have)}</b>`],E)}
   case'multi':{const k=ri(2,5),a=price(g,10),b=price(h,5),tot=k*a+b;return W(`${n} kauft ${k} ${g[1]} für je ${eur(a)} und ${h[0]} für ${eur(b)}. Wie viel Euro kostet alles zusammen?`,amt(tot),[`${k} ${g[1]}: ${k} · ${a} ct = ${k*a} ct`,`Dazu ${b} ct: ${k*a} + ${b} = ${tot} ct`,`${tot} ct = <b>${eur(tot)}</b>`],E)}
   case'multiChange':{const k=ri(2,5),a=price(g,10),tot=k*a,pay=[500,1000,2000,5000].find(v=>v>tot);
     return W(`${n} kauft ${k} ${g[1]} für je ${eur(a)} und bezahlt mit ${PAY[pay]}. Wie viel Euro bekommt ${n} zurück?`,amt(pay-tot),[`Der Preis: ${k} · ${a} ct = ${tot} ct`,`Bezahlt: ${pay} ct. Rückgeld: ${pay} − ${tot} = ${pay-tot} ct`,`${pay-tot} ct = <b>${eur(pay-tot)}</b>`],E)}
   default:{let a,bud,c;do{a=price(g,10);bud=pick([200,500,1000]);c=Math.floor(bud/a)}while(c<2||c>12||bud%a===0);
     return W(`${n} hat ${bud/100} €. Es gibt ${g[1]} für je ${eur(a)}. Wie viele ${g[1]} kann ${n} höchstens kaufen?`,c,[`${bud/100} € = ${bud} ct`,`${c} · ${a} = ${c*a} ct passt. ${c+1} · ${a} = ${(c+1)*a} ct ist zu viel.`,`${n} kann <b>${c}</b> ${g[1]} kaufen und behält ${bud-c*a} ct übrig.`])}
  }}

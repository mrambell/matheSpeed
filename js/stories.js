"use strict";
/* ---------- word problems: composed from parts (situation x objects x operation x numbers) ---------- */
const GRP=[['Tüte','Tüten','jeder','Sticker'],['Kiste','Kisten','jeder','Äpfel'],['Schachtel','Schachteln','jeder','Stifte'],['Regal','Regale','jedem','Bücher'],['Beutel','Beutel','jedem','Murmeln'],
 ['Packung','Packungen','jeder','Kekse'],['Korb','Körbe','jedem','Eier'],['Reihe','Reihen','jeder','Stühle'],['Karton','Kartons','jedem','Flaschen'],['Bus','Busse','jedem','Plätze'],
 ['Netz','Netze','jedem','Orangen'],['Dose','Dosen','jeder','Bälle'],['Album','Alben','jedem','Fotos'],['Glas','Gläser','jedem','Bonbons']];
const POOL=[['In der Bücherei stehen {x} Bücher.','Bücher','{y} Bücher werden ausgeliehen.','{y} neue Bücher kommen dazu.'],
 ['Im Stadion sitzen {x} Fans.','Fans','{y} Fans gehen nach Hause.','{y} Fans kommen noch dazu.'],
 ['{n} hat {x} Punkte gesammelt.','Punkte','{y} Punkte gibt {n} für einen Preis aus.','{y} Punkte kommen neu dazu.'],
 ['Auf dem Bauernhof leben {x} Hühner.','Hühner','{y} Hühner werden verkauft.','{y} Hühner kommen neu dazu.'],
 ['Im Lager liegen {x} Pakete.','Pakete','{y} Pakete werden abgeholt.','{y} Pakete werden geliefert.'],
 ['Im Zug sitzen {x} Fahrgäste.','Fahrgäste','{y} Fahrgäste steigen aus.','{y} Fahrgäste steigen ein.'],
 ['Die Bäckerei hat {x} Brötchen im Regal.','Brötchen','{y} Brötchen werden verkauft.','{y} Brötchen werden nachgebacken.'],
 ['Im Schwimmbad sind {x} Besucher.','Besucher','{y} Besucher gehen heim.','{y} Besucher kommen dazu.'],
 ['Im Aquarium schwimmen {x} Fische.','Fische','{y} Fische ziehen in ein anderes Becken um.','{y} Fische werden neu eingesetzt.'],
 ['Auf dem Parkplatz stehen {x} Autos.','Autos','{y} Autos fahren weg.','{y} Autos parken neu ein.']];
const SHOP=['Hefte','Bälle','Bücher','Spiele','Tickets','Poster','Eisbecher','T-Shirts','Malkästen','Pflanzen'];
const EXTRA=['einen Füller','eine Tasche','ein Lineal','einen Rucksack','eine Mappe','ein Geschenk'];
const COLL=['Sticker','Punkte','Murmeln','Karten','Muscheln','Kastanien'];
function story(g,L){
  const big=g===4,n=pick(NAMES),m=pick(NAMES.filter(x=>x!==n)),[cs,cp,je,it]=pick(GRP),P=pick(POOL),
   fill=(t,o)=>t.replace(/\{(\w)\}/g,(_,k)=>o[k]),
   mulS=(a,b)=>b<=10?[`${a} · ${b} = <b>${a*b}</b>`]:b%10===0?[`Rechne ohne Null: ${a} · ${b/10} = ${a*b/10}. Hänge die Null an: <b>${f(a*b)}</b>`]
     :[`Zerlege ${b}: ${a} · ${b-b%10} = ${a*(b-b%10)} und ${a} · ${b%10} = ${a*(b%10)}`,`Zusammen: <b>${f(a*b)}</b>`],
   plain=h=>h.replace(/<\/?b>/g,''),
   kind=pick(big?[['mul','add','sub','cmp'],['divQ','divP','shop'],['change','two','mulsub','mulmul']][L-1]:[['mul','divQ','divP'],['add','sub','cmp'],['shop','change','two','mulsub']][L-1]),
   a=ri(3,9),b=big?ri(12,60):ri(3,9),d=big?ri(3,8):ri(3,9),q=big?ri(12,120):ri(3,9),
   x=big?ri(2000,9000):ri(250,800),y=big?ri(300,Math.min(4000,x-500)):ri(60,190),
   k=ri(2,big?8:6),pr=big?ri(11,35):ri(3,9);
  const W=(t,a,steps,u)=>({t,a,steps,u,w:1});
  switch(kind){
   case'mul':return W(`Es gibt ${a} ${cp}. In ${je} ${cs} sind ${b} ${it}. Wie viele ${it} sind das zusammen?`,a*b,[`Gesucht: alle ${it} zusammen.`,`${a}-mal gleich viel. Das ist eine Mal-Aufgabe: ${a} · ${b}`,...mulS(a,b)]);
   case'divQ':return W(`Es sind insgesamt ${f(d*q)} ${it}. In ${je} ${cs} sind genau ${d} ${it}. Wie viele ${cp} sind es?`,q,[`Gesucht: die Anzahl der ${cp}.`,`Immer ${d} gehören zusammen. Das ist eine Geteilt-Aufgabe: ${f(d*q)} : ${d}`,...(big?divSteps(d*q,d):[`${d*q} : ${d} = <b>${q}</b>`])]);
   case'divP':return W(`${f(d*q)} ${it} werden gleichmäßig auf ${d} ${cp} verteilt. Wie viele ${it} sind in ${je==='jeder'?'einer':'einem'} ${cs}?`,q,[`Gesucht: die ${it} in ${je==='jeder'?'einer':'einem'} ${cs}.`,`Gerecht verteilen heißt teilen: ${f(d*q)} : ${d}`,...(big?divSteps(d*q,d):[`${d*q} : ${d} = <b>${q}</b>`])]);
   case'add':return W(`${fill(P[0],{x:f(x),n})} ${fill(P[3],{y:f(y),n})} Wie viele ${P[1]} sind es jetzt?`,x+y,[`Gesucht: alle ${P[1]} zusammen.`,`Es kommt etwas dazu. Das ist eine Plus-Aufgabe: ${f(x)} + ${f(y)}`,...(big?colAdd(x,y):split(x,y,1))]);
   case'sub':return W(`${fill(P[0],{x:f(x),n})} ${fill(P[2],{y:f(y),n})} Wie viele ${P[1]} sind es jetzt?`,x-y,[`Gesucht: die ${P[1]}, die übrig sind.`,`Es kommt etwas weg. Das ist eine Minus-Aufgabe: ${f(x)} − ${f(y)}`,...(big?colSub(x,y):split(x,y,-1))]);
   case'cmp':{const c=pick(COLL);return W(`${n} hat ${f(x)} ${c} gesammelt, ${m} hat ${f(y)}. Wie viele ${c} hat ${n} mehr als ${m}?`,x-y,[`Gesucht: der Unterschied zwischen ${n} und ${m}.`,`Den Unterschied findest du mit Minus: ${f(x)} − ${f(y)}`,...(big?colSub(x,y):split(x,y,-1))],undefined)}
   case'shop':{const c=big?ri(15,60):ri(8,20),th=pick(SHOP);return W(`${n} kauft ${k} ${th} für je ${pr} € und ${pick(EXTRA)} für ${c} €. Wie viele Euro kostet alles zusammen?`,k*pr+c,[`Schritt 1, die ${th}: ${k} · ${pr}`,...mulS(k,pr).map(plain),`Schritt 2, alles zusammen: ${k*pr} + ${c} = <b>${k*pr+c} €</b>`],'€')}
   case'change':{const th=pick(SHOP),note=[20,50,100,200,500].find(v=>v>k*pr);return W(`${n} kauft ${k} ${th} für je ${pr} € und bezahlt mit ${note} €. Wie viele Euro bekommt ${n} zurück?`,note-k*pr,[`Schritt 1, der Preis: ${k} · ${pr}`,...mulS(k,pr).map(plain),`Schritt 2, das Rückgeld: ${note} − ${k*pr} = <b>${note-k*pr} €</b>`],'€')}
   case'two':{const z=big?ri(200,900):ri(20,90),up=ri(0,1),r1=up?x+y:x-y,r2=up?r1-z:r1+z;
     return W(`${fill(P[0],{x:f(x),n})} ${fill(P[up?3:2],{y:f(y),n})} Danach: ${fill(P[up?2:3],{y:f(z),n})} Wie viele ${P[1]} sind es jetzt?`,r2,[`Es passiert zweimal etwas. Rechne nacheinander.`,`Schritt 1: ${f(x)} ${up?'+':'−'} ${f(y)} = ${f(r1)}`,`Schritt 2: ${f(r1)} ${up?'−':'+'} ${f(z)} = <b>${f(r2)}</b>`])}
   case'mulsub':{const z=ri(2,Math.max(3,Math.floor(a*b/3)));return W(`Es gibt ${a} ${cp}. In ${je} ${cs} sind ${b} ${it}. ${z} ${it} werden nicht gebraucht. Wie viele ${it} werden gebraucht?`,a*b-z,[`Schritt 1, alle ${it}: ${a} · ${b}`,...mulS(a,b).map(plain),`Schritt 2, ohne die übrigen: ${f(a*b)} − ${z} = <b>${f(a*b-z)}</b>`])}
   default:{const c=ri(2,6);return W(`Am Montag gibt es ${a} ${cp}, am Dienstag ${c} ${cp}. In ${je} ${cs} sind ${b} ${it}. Wie viele ${it} sind das an beiden Tagen zusammen?`,(a+c)*b,[`Schritt 1, alle ${cp}: ${a} + ${c} = ${a+c}`,`Schritt 2, alle ${it}: ${a+c} · ${b}`,...mulS(a+c,b)])}
  }}

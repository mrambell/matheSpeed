"use strict";
/* ---------- topics: theory + generators (L = level 1..3) ---------- */
const T=[
{id:'add',g:3,name:'Plus bis 1000',sym:'+',
 rule:'Zerlege die zweite Zahl in Hunderter, Zehner und Einer. Rechne sie dann Schritt für Schritt dazu.',
 ex:'<b>345 + 232</b><br>345 + 200 = 545<br>545 + 30 = 575<br>575 + 2 = <b>577</b>',
 gen(L){let a,b;if(L===1){a=ri(10,80)*10;b=ri(1,Math.min(30,(1000-a)/10))*10}else if(L===2){a=ri(101,899);b=ri(11,99)}else{a=ri(101,700);b=ri(101,999-a)}
  return{t:`${a} + ${b}`,a:a+b,steps:split(a,b,1)}}},
{id:'sub',g:3,name:'Minus bis 1000',sym:'−',
 rule:'Zerlege die zweite Zahl in Hunderter, Zehner und Einer. Zieh sie dann Schritt für Schritt ab.',
 ex:'<b>684 − 253</b><br>684 − 200 = 484<br>484 − 50 = 434<br>434 − 3 = <b>431</b>',
 gen(L){let a,b;if(L===1){a=ri(20,99)*10;b=ri(1,Math.min(30,a/10-1))*10}else if(L===2){a=ri(200,999);b=ri(11,99)}else{a=ri(300,999);b=ri(101,a-50)}
  return{t:`${a} − ${b}`,a:a-b,steps:split(a,b,-1)}}},
{id:'mal',g:3,name:'Kleines Einmaleins',sym:'·',
 rule:'Malnehmen ist schnelles Plusrechnen: 4 · 6 heißt 6 + 6 + 6 + 6. Schwere Aufgaben zerlegst du in zwei leichte.',
 ex:'<b>7 · 8</b><br>7 · 5 = 35<br>7 · 3 = 21<br>35 + 21 = <b>56</b>',
 gen(L){let a,b;if(L===1){a=pick([2,3,4,5,10]);b=ri(1,10)}else if(L===2){a=ri(2,10);b=ri(2,10)}else{a=ri(6,9);b=ri(6,9)}
  return{t:`${a} · ${b}`,a:a*b,steps:malSteps(a,b),fast:1}}},
{id:'div',g:3,name:'Geteilt',sym:':',
 rule:'Teilen ist die Umkehrung vom Malnehmen. Frage dich: Welche Zahl mal dem Teiler ergibt die große Zahl?',
 ex:'<b>42 : 6</b><br>Wie oft passt die 6 in die 42?<br>7 · 6 = 42<br>Also 42 : 6 = <b>7</b>',
 gen(L){let d,x;if(L===1){d=pick([2,3,4,5,10]);x=ri(1,10)}else if(L===2){d=ri(2,10);x=ri(2,10)}else{d=ri(6,9);x=ri(6,9)}
  const row=Array.from({length:x},(_,i)=>d*(i+1));
  return{t:`${d*x} : ${d}`,a:x,fast:1,steps:[`Denke an die Umkehraufgabe: ? · ${d} = ${d*x}`,`Die ${d}er-Reihe: ${row.join(', ')}`,`${x} · ${d} = ${d*x}, also ${d*x} : ${d} = <b>${x}</b>`]}}},
{id:'rest',g:3,name:'Geteilt mit Rest',sym:': R',
 rule:'Manchmal geht eine Aufgabe nicht genau auf. Suche die größte Zahl der Reihe, die noch hineinpasst. Was übrig bleibt, ist der Rest (R).',
 ex:'<b>23 : 5</b><br>4 · 5 = 20 passt noch (5 · 5 = 25 ist zu viel)<br>23 − 20 = 3 bleibt übrig<br>23 : 5 = <b>4 R 3</b>',
 gen(L){const d=L===1?pick([2,3,4,5]):L===2?ri(2,9):ri(6,9),x=L===1?ri(1,9):ri(2,9),r=ri(1,d-1),n=d*x+r;
  return{t:`${n} : ${d}`,a:`${x}R${r}`,rem:1,steps:[`Welche Zahl aus der ${d}er-Reihe passt gerade noch in ${n}? ${x} · ${d} = ${d*x} (${x+1} · ${d} = ${d*(x+1)} ist zu viel)`,`${n} − ${d*x} = ${r} bleibt übrig.`,`${n} : ${d} = <b>${x} R ${r}</b>. Tippe ${x}, dann R, dann ${r}.`]}}},
{id:'zehn',g:3,name:'Mal mit Zehnerzahlen',sym:'·10',
 rule:'Rechne zuerst ohne die Nullen. Hänge danach alle Nullen wieder an das Ergebnis.',
 ex:'<b>6 · 40</b><br>6 · 4 = 24<br>Eine Null anhängen: <b>240</b>',
 gen(L){const a=ri(2,9),b=ri(2,9);
  if(L===1)return{t:`${a} · ${b*10}`,a:a*b*10,fast:1,steps:[`Rechne ohne Null: ${a} · ${b} = ${a*b}`,`Hänge eine Null an: <b>${a*b*10}</b>`]};
  if(L===2)return{t:`${a*10} · ${b*10}`,a:a*b*100,steps:[`Rechne ohne Nullen: ${a} · ${b} = ${a*b}`,`Es waren zwei Nullen. Hänge beide an: <b>${f(a*b*100)}</b>`]};
  return ri(0,1)?{t:`${a} · ${b*100}`,a:a*b*100,steps:[`Rechne ohne Nullen: ${a} · ${b} = ${a*b}`,`Hänge zwei Nullen an: <b>${f(a*b*100)}</b>`]}
   :{t:`${a*b*10} : ${b}`,a:a*10,steps:[`Lass die letzte Null weg: ${a*b} : ${b} = ${a}`,`Hänge die Null wieder an: <b>${a*10}</b>`]}}},
{id:'geld',g:3,name:'Geld: Euro und Cent',sym:'€',
 rule:'Vor dem Komma stehen die Euro, dahinter die Cent: 3,45 € = 3 € 45 ct = 345 ct. Am sichersten rechnest du alles in Cent und wandelst am Ende zurück.',
 ex:'<b>1,20 € + 0,85 €</b><br>120 ct + 85 ct = 205 ct<br>205 ct = <b>2,05 €</b>',
 gen(L){return money(L)}},
{id:'lang',g:3,name:'Längen',sym:'cm',
 rule:'1 cm = 10 mm · 1 m = 100 cm · 1 km = 1000 m. Wechselst du zur kleineren Einheit, wird die Zahl größer.',
 ex:'<b>3 m 20 cm</b><br>3 m = 300 cm<br>300 cm + 20 cm = <b>320 cm</b>',
 gen(L){const U=[['m','cm',100],['cm','mm',10],['km','m',1000]];
  if(L===1){const [A,B,k]=pick(U),n=ri(2,9);return{t:`${n} ${A} = ? ${B}`,a:n*k,u:B,steps:[`1 ${A} = ${f(k)} ${B}`,`${n} · ${f(k)} = <b>${f(n*k)} ${B}</b>`]}}
  if(L===2){const [A,B,k]=pick([U[0],U[2]]),n=ri(1,9),r=k===100?ri(1,19)*5:ri(1,19)*50;return{t:`${n} ${A} ${r} ${B} = ? ${B}`,a:n*k+r,u:B,w:1,steps:[`1 ${A} = ${f(k)} ${B}`,`${n} ${A} = ${f(n*k)} ${B}`,`${f(n*k)} + ${r} = <b>${f(n*k+r)} ${B}</b>`]}}
  const x=ri(11,98)*10;return{t:`Wie viele Meter fehlen von ${x} m bis 1 km?`,a:1000-x,u:'m',w:1,steps:['1 km = 1000 m',`Ergänze: ${x} m + ? = 1000 m`,`1000 − ${x} = <b>${1000-x} m</b>`]}}},
{id:'zeit',g:3,name:'Zeit',sym:'min',
 rule:'1 Minute = 60 Sekunden · 1 Stunde = 60 Minuten · 1 Tag = 24 Stunden. Bei Zeitspannen rechnest du erst bis zur vollen Stunde.',
 ex:'<b>Von 14:40 Uhr bis 16:10 Uhr</b><br>Bis 15:00 Uhr: 20 min<br>Bis 16:00 Uhr: 60 min<br>Bis 16:10 Uhr: 10 min<br>Zusammen: <b>90 min</b>',
 gen(L){
  if(L===1){const [A,B,k]=pick([['h','min',60],['min','s',60],['Tage','h',24]]),n=ri(2,4);return{t:`${n} ${A} = ? ${B}`,a:n*k,u:B,steps:[`1 ${A==='Tage'?'Tag':A} = ${k} ${B}`,`${n} · ${k} = <b>${n*k} ${B}</b>`]}}
  if(L===2){const h=ri(1,4),m=ri(1,11)*5;return{t:`${h} h ${m} min = ? min`,a:h*60+m,u:'min',w:1,steps:['1 h = 60 min',`${h} h = ${h*60} min`,`${h*60} + ${m} = <b>${h*60+m} min</b>`]}}
  const h1=ri(7,16),m1=ri(1,11)*5,dur=ri(5,28)*5,e=h1*60+m1+dur,h2=Math.floor(e/60),m2=e%60,s=[];
  if(h2===h1)s.push(`Beide Zeiten liegen in derselben Stunde: ${m2} − ${m1} = <b>${dur} min</b>`);
  else{s.push(`Bis ${h1+1}:00 Uhr sind es ${60-m1} min.`);const k=h2-h1-1;if(k)s.push(`Von ${h1+1}:00 bis ${h2}:00 Uhr: ${k} h = ${k*60} min.`);if(m2)s.push(`Von ${h2}:00 bis ${h2}:${pad2(m2)} Uhr: ${m2} min.`);s.push(`Zusammen: <b>${dur} min</b>`)}
  return{t:`Der Film beginnt um ${h1}:${pad2(m1)} Uhr und endet um ${h2}:${pad2(m2)} Uhr. Wie viele Minuten dauert er?`,a:dur,u:'min',w:1,steps:s}}},
{id:'sach3',g:3,name:'Sachaufgaben',sym:'?',
 rule:'Lies genau. Was ist gesucht? Welche Zahlen brauchst du? Wähle dann die Rechnung: zusammen (+), weg (−), mehrmals gleich viel (·), gerecht verteilen (:).',
 ex:'<b>Mia hat 4 Tüten mit je 6 Stickern.</b><br>Gesucht: alle Sticker<br>4-mal gleich viel, also mal<br>4 · 6 = <b>24 Sticker</b>',
 gen(L){return story(3,L)}},
{id:'mio',g:4,name:'Zahlen bis 1 Million',sym:'1 Mio',
 rule:'Jede Ziffer hat ihren Platz: Einer (E), Zehner (Z), Hunderter (H), Tausender (T), Zehntausender (ZT), Hunderttausender (HT). Zehn von einer Sorte ergeben eins von der nächsten.',
 ex:'<b>300 000 + 40 000 + 500 + 7</b><br>HT 3 · ZT 4 · T 0 · H 5 · Z 0 · E 7<br>Die Zahl heißt <b>340 507</b>',
 gen(L){
  if(L===1){const d=[ri(1,9),ri(0,9),pick([0,ri(1,9)]),pick([0,ri(1,9)]),pick([0,ri(1,9)]),ri(1,9)],n=+d.join(''),parts=d.map((x,i)=>x*10**(5-i)).filter(x=>x);
   return{t:parts.map(f).join(' + '),a:n,w:1,steps:['Schreibe die Ziffern in die Stellenwerttafel: HT, ZT, T, H, Z, E.',['HT','ZT','T','H','Z','E'].map((p,i)=>`${p} ${d[i]}`).join(' · '),`Wo nichts steht, kommt eine 0 hin. Die Zahl heißt <b>${f(n)}</b>`]}}
  if(L===2){const up=ri(0,1),n=up?pick([ri(1,9)*100000-1,ri(10,99)*10000-1,ri(100,999)*1000-1]):pick([ri(1,9)*100000,ri(10,99)*10000,ri(100,999)*1000]);
   return{t:`Welche Zahl kommt direkt ${up?'nach':'vor'} ${f(n)}?`,a:up?n+1:n-1,w:1,steps:up?[`Nach heißt: plus 1.`,`Bei ${f(n)} werden alle Neunen am Ende zu Nullen, die Stelle davor wird um 1 größer.`,`<b>${f(n+1)}</b>`]:[`Vor heißt: minus 1.`,`Bei ${f(n)} werden die Nullen am Ende zu Neunen, die Stelle davor wird um 1 kleiner.`,`<b>${f(n-1)}</b>`]}}
  const a=ri(20,80),b=ri(2,19),m=ri(0,1);
  return{t:`${f(a*10000)} ${m?'−':'+'} ${f(b*10000)}`,a:(m?a-b:a+b)*10000,w:1,steps:[`Rechne mit Zehntausendern: ${a} ZT ${m?'−':'+'} ${b} ZT = ${m?a-b:a+b} ZT`,`${m?a-b:a+b} ZT = <b>${f((m?a-b:a+b)*10000)}</b>`]}}},
{id:'rund',g:4,name:'Runden',sym:'≈',
 rule:'Schau auf die Ziffer rechts neben der Rundungsstelle. Bei 0, 1, 2, 3, 4 rundest du ab. Bei 5, 6, 7, 8, 9 rundest du auf.',
 ex:'<b>3 472 auf Hunderter</b><br>Rechts neben den Hundertern steht die 7<br>7 heißt aufrunden<br>3 472 ≈ <b>3 500</b>',
 gen(L){const p=10**L;let n;do{n=L===1?ri(101,999):L===2?ri(1001,9999):ri(10001,999999)}while(n%p===0);
  const d=Math.floor(n/(p/10))%10,r=Math.round(n/p)*p;
  return{t:`Runde ${f(n)} auf ${PL[L]}.`,a:r,w:1,steps:[`Du rundest auf ${PL[L]}. Schau auf die Ziffer rechts daneben: <b>${d}</b>`,d<5?`${d} gehört zu 0, 1, 2, 3, 4. Also abrunden.`:`${d} gehört zu 5, 6, 7, 8, 9. Also aufrunden.`,`${f(n)} ≈ <b>${f(r)}</b>`]}}},
{id:'spm',g:4,name:'Schriftlich plus und minus',sym:'±',
 rule:'Schreibe die Zahlen stellengerecht untereinander. Rechne von rechts nach links. Wird es mehr als 9, merkst du dir eine 1 für die nächste Stelle.',
 ex:'<pre class="col">  4 372\n+ 1 859\n───────\n  6 231</pre>',
 gen(L){let a,b,m=L===2||(L===3&&ri(0,1));
  if(L===1){a=ri(1000,5999);b=ri(1000,3999)}else if(L===2){a=ri(3000,9999);b=ri(1000,a-500)}else{a=ri(20000,89999);b=ri(10000,m?a-1000:99999-a)}
  return{t:vert(a,m?'−':'+',b),a:m?a-b:a+b,steps:m?colSub(a,b):colAdd(a,b)}}},
{id:'smal',g:4,name:'Schriftlich malnehmen',sym:'×',
 rule:'Zerlege die große Zahl in ihre Stellen. Nimm jede Stelle einzeln mal und zähle die Teilergebnisse zusammen.',
 ex:'<b>243 · 6</b><br>200 · 6 = 1 200<br>40 · 6 = 240<br>3 · 6 = 18<br>1 200 + 240 + 18 = <b>1 458</b>',
 gen(L){let a,b;if(L===1){a=ri(12,99);b=ri(2,9)}else if(L===2){a=ri(101,999);b=ri(2,9)}else{a=ri(12,99);b=ri(12,49)}
  let s;if(L<3){const p=String(a).split('').map((d,i,r)=>d*10**(r.length-1-i)).filter(x=>x);s=p.map(x=>`${x} · ${b} = ${f(x*b)}`);s.push(`${p.map(x=>f(x*b)).join(' + ')} = <b>${f(a*b)}</b>`)}
  else{const z=Math.floor(b/10)*10,e=b%10;s=[`Zerlege ${b} in ${z} + ${e}.`,`${a} · ${z} = ${f(a*z)}`,`${a} · ${e} = ${f(a*e)}`,`${f(a*z)} + ${f(a*e)} = <b>${f(a*b)}</b>`]}
  return{t:`${a} · ${b}`,a:a*b,steps:s}}},
{id:'sdiv',g:4,name:'Schriftlich teilen',sym:'÷',
 rule:'Teile Stelle für Stelle von links nach rechts. Den Rest nimmst du mit zur nächsten Ziffer.',
 ex:'<b>936 : 4</b><br>9 : 4 = 2, Rest 1. Hol die 3 herunter: 13<br>13 : 4 = 3, Rest 1. Hol die 6 herunter: 16<br>16 : 4 = 4<br>Ergebnis: <b>234</b>',
 gen(L){const d=ri(2,9),q=L===1?ri(11,Math.floor(99/d)):L===2?ri(101,Math.floor(999/d)):ri(1001,Math.floor(9999/d));
  return{t:`${f(q*d)} : ${d}`,a:q,steps:divSteps(q*d,d)}}},
{id:'gew',g:4,name:'Gewichte und Liter',sym:'kg',
 rule:'1 kg = 1000 g · 1 t = 1000 kg · 1 l = 1000 ml. Ein halbes Kilo sind 500 g, ein Viertel sind 250 g.',
 ex:'<b>2 kg 350 g</b><br>2 kg = 2 000 g<br>2 000 g + 350 g = <b>2 350 g</b>',
 gen(L){const U=[['kg','g'],['l','ml'],['t','kg']];
  if(L===1){const [A,B]=pick(U),n=ri(2,9);return{t:`${n} ${A} = ? ${B}`,a:n*1000,u:B,steps:[`1 ${A} = 1 000 ${B}`,`${n} · 1 000 = <b>${f(n*1000)} ${B}</b>`]}}
  if(L===2){const [A,B]=pick(U),n=ri(1,9),r=ri(1,19)*50;return{t:`${n} ${A} ${r} ${B} = ? ${B}`,a:n*1000+r,u:B,w:1,steps:[`${n} ${A} = ${f(n*1000)} ${B}`,`${f(n*1000)} + ${r} = <b>${f(n*1000+r)} ${B}</b>`]}}
  if(ri(0,1)){const [A,B]=pick(U.slice(0,2)),[z,nn]=pick([[1,2],[1,4],[3,4]]);return{t:`${fr(z,nn)} ${A} = ? ${B}`,a:1000/nn*z,u:B,steps:[`1 ${A} = 1 000 ${B}`,`Teile in ${nn} gleiche Teile: 1 000 : ${nn} = ${1000/nn}`,z>1?`Nimm ${z} Teile: ${z} · ${1000/nn} = <b>${1000/nn*z} ${B}</b>`:`Ein Teil sind <b>${1000/nn} ${B}</b>`]}}
  const n=ri(2,6),r=ri(3,18)*50;return{t:`${n} kg − ${r} g = ? g`,a:n*1000-r,u:'g',w:1,steps:[`${n} kg = ${f(n*1000)} g`,`${f(n*1000)} − ${r} = <b>${f(n*1000-r)} g</b>`]}}},
{id:'fl',g:4,name:'Umfang und Fläche',sym:'cm²',
 rule:'Der Umfang ist der Weg einmal außen herum: alle Seiten zusammenzählen. Die Fläche ist das, was innen liegt: Länge mal Breite.',
 ex:'<b>Rechteck 6 cm lang, 4 cm breit</b><br>Umfang: 6 + 4 + 6 + 4 = <b>20 cm</b><br>Fläche: 6 · 4 = <b>24 cm²</b>',
 gen(L){const b=ri(2,8),a=b+ri(1,5);
  if(L===1)return{t:'Wie groß ist der Umfang?',fig:rectFig(a,b),a:2*(a+b),u:'cm',w:1,steps:['Der Umfang ist der Weg einmal außen herum.',`Zwei lange und zwei kurze Seiten: ${a} + ${b} + ${a} + ${b}`,`2 · ${a+b} = <b>${2*(a+b)} cm</b>`]};
  if(L===2)return{t:'Wie groß ist die Fläche?',fig:rectFig(a,b),a:a*b,u:'cm²',w:1,steps:['Die Fläche sagt, wie viele Kästchen von 1 cm² hineinpassen.',`${b} Reihen mit je ${a} Kästchen.`,`${a} · ${b} = <b>${a*b} cm²</b>`]};
  return ri(0,1)?{t:`Ein Rechteck hat ${a*b} cm² Fläche. Eine Seite ist ${a} cm lang. Wie lang ist die andere Seite?`,a:b,u:'cm',w:1,steps:['Fläche = Länge · Breite',`${a} · ? = ${a*b}`,`${a*b} : ${a} = <b>${b} cm</b>`]}
   :{t:`Ein Quadrat hat ${4*a} cm Umfang. Wie lang ist eine Seite?`,a:a,u:'cm',w:1,steps:['Ein Quadrat hat 4 gleich lange Seiten.',`${4*a} : 4 = <b>${a} cm</b>`]}}},
{id:'bru',g:4,name:'Bruchteile',sym:'¼',
 rule:'Die untere Zahl (Nenner) sagt, in wie viele gleiche Teile du teilst. Die obere Zahl (Zähler) sagt, wie viele Teile du nimmst.',
 ex:`<b>${fr(3,4)} von 20</b><br>20 : 4 = 5 (ein Viertel)<br>3 · 5 = <b>15</b> (drei Viertel)`,
 gen(L){const [z,n]=L===1?[1,pick([2,4])]:L===2?[1,pick([3,5,8,10])]:pick([[3,4],[2,3],[2,5],[3,5],[3,8]]),k=ri(2,10),g=n*k;
  return{t:`${fr(z,n)} von ${g}`,a:z*k,steps:[`Der Nenner ${n} sagt: Teile ${g} in ${n} gleiche Teile.`,`${g} : ${n} = ${k}`,z>1?`Der Zähler ${z} sagt: Nimm ${z} Teile. ${z} · ${k} = <b>${z*k}</b>`:`Ein Teil ist <b>${k}</b>`]}}},
{id:'sach4',g:4,name:'Sachaufgaben',sym:'?',
 rule:'Lies genau und unterstreiche im Kopf die Frage. Oft brauchst du zwei Rechenschritte. Schreibe dir das Zwischenergebnis auf.',
 ex:'<b>Ein Buch hat 200 Seiten. Ben liest 5 Tage je 20 Seiten. Wie viele fehlen noch?</b><br>Gelesen: 5 · 20 = 100<br>Übrig: 200 − 100 = <b>100 Seiten</b>',
 gen(L){return story(4,L)}}
];
const TOP=Object.fromEntries(T.map(t=>[t.id,t]));

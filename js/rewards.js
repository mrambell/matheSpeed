"use strict";
/* ---------- rewards ---------- */
const TITLES=[['🐣','Zahlen-Küken'],['🐰','Rechen-Hase'],['🦊','Plus-Fuchs'],['🦦','Mal-Otter'],['🦉','Knobel-Eule'],['🦅','Zahlen-Adler'],['🐲','Mathe-Drache'],['🧙','Rechen-Zauberer'],['🚀','Mathe-Astronaut'],['👑','Zahlen-Legende']];
const STK=[['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐸','🐵','🐔','🐧','🐢','🐝','🦋','🐞'],['🦁','🐯','🦒','🐘','🦓','🦘','🐬','🦉','🦔','🦜'],['🦄','🐲','🦖','🚀','🌈','👑']];
const TIER=['','Selten!','Super selten!'];
const PRAISE=['Richtig!','Super!','Klasse gerechnet!','Stark!','Genau!','Volltreffer!','Sauber!','Prima!'];
const CALM=['Fehler sind Helfer. So wächst dein Gehirn.','Kein Problem. Wir schauen es uns zusammen an.','Fast! Jeder Profi hat genau so angefangen.','Gut, dass du es probiert hast. Jetzt klären wir das.'];
const BADGES=[
 {id:'start',i:'🎒',n:'Erster Schultag',d:'Erste Runde beendet',t:s=>s.tot.sessions>=1},
 {id:'s3',i:'🔥',n:'Drei am Stück',d:'3 Tage in Folge gelernt',t:s=>s.best>=3},
 {id:'s7',i:'🌟',n:'Eine ganze Woche',d:'7 Tage in Folge gelernt',t:s=>s.best>=7},
 {id:'s30',i:'🏆',n:'Monats-Held',d:'30 Tage in Folge gelernt',t:s=>s.best>=30},
 {id:'c5',i:'⚡',n:'Im Flow',d:'5 richtige Antworten hintereinander',t:s=>s.tot.maxCombo>=5},
 {id:'c10',i:'💫',n:'Unaufhaltbar',d:'10 richtige Antworten hintereinander',t:s=>s.tot.maxCombo>=10},
 {id:'ok100',i:'💯',n:'Hunderter-Club',d:'100 Aufgaben richtig gelöst',t:s=>s.tot.ok>=100},
 {id:'ok500',i:'🎯',n:'Fünfhunderter-Club',d:'500 Aufgaben richtig gelöst',t:s=>s.tot.ok>=500},
 {id:'help',i:'🙋',n:'Mutige Frage',d:'5-mal um eine Erklärung gebeten',t:s=>s.tot.help>=5},
 {id:'fix',i:'🌱',n:'Dranbleiber',d:'10-mal nach einem Fehler richtig gelöst',t:s=>s.tot.fixed>=10},
 {id:'m1',i:'⭐',n:'Themen-Profi',d:'Ein Thema mit 3 Sternen',t:s=>Object.values(s.topics).some(x=>x.stars>=3)},
 {id:'m5',i:'🎓',n:'Fünffach-Profi',d:'Fünf Themen mit 3 Sternen',t:s=>Object.values(s.topics).filter(x=>x.stars>=3).length>=5},
 {id:'b20',i:'🏃',n:'Flitzer',d:'20 Punkte in einer Blitzrunde',t:s=>Object.values(s.blitz).some(x=>x.best>=20)},
 {id:'b30',i:'🚀',n:'Rakete',d:'30 Punkte in einer Blitzrunde',t:s=>Object.values(s.blitz).some(x=>x.best>=30)},
 {id:'all3',i:'🧭',n:'Entdecker Klasse 3',d:'Alle Themen der 3. Klasse probiert',t:s=>T.filter(t=>t.g===3).every(t=>s.topics[t.id]&&s.topics[t.id].n>0)},
 {id:'all4',i:'🗺️',n:'Entdecker Klasse 4',d:'Alle Themen der 4. Klasse probiert',t:s=>T.filter(t=>t.g===4).every(t=>s.topics[t.id]&&s.topics[t.id].n>0)}
];

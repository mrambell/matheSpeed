"use strict";
/* ---------- speed rounds ---------- */
const BL={
 mal:{name:'Einmaleins',sym:'·',gen(){const a=ri(2,10),b=ri(2,10);return{t:`${a} · ${b}`,a:a*b}}},
 div:{name:'Geteilt',sym:':',gen(){const a=ri(2,10),b=ri(2,10);return{t:`${a*b} : ${b}`,a:a}}},
 pm:{name:'Plus und Minus bis 100',sym:'±',gen(){if(ri(0,1)){const a=ri(11,89),b=ri(2,99-a);return{t:`${a} + ${b}`,a:a+b}}const a=ri(20,100),b=ri(2,a-1);return{t:`${a} − ${b}`,a:a-b}}},
 zehn:{name:'Zehner-Trick',sym:'·10',gen(){const a=ri(2,9),b=ri(2,9);return pick([{t:`${a} · ${b*10}`,a:a*b*10},{t:`${a*100} + ${b*100}`,a:(a+b)*100},{t:`${a*b*10} : ${a}`,a:b*10}])}},
 mix:{name:'Bunter Mix',sym:'∞',gen(){return BL[pick(['mal','div','pm','zehn'])].gen()}}
};
const BLITZ_SEC=60;

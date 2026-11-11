"use strict";
/* ---------- sound + confetti ---------- */
let AC;
function tone(fq,t0,dur,type){if(!state.sound)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();
  o.type=type||'sine';o.frequency.value=fq;g.gain.setValueAtTime(.12,AC.currentTime+t0);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+t0+dur);
  o.connect(g).connect(AC.destination);o.start(AC.currentTime+t0);o.stop(AC.currentTime+t0+dur)}catch(e){}}
const snd={ok(){tone(660,0,.12);tone(880,.09,.16)},no(){tone(220,0,.22,'triangle')},win(){[523,659,784,1047].forEach((x,i)=>tone(x,i*.11,.2))},tap(){tone(440,0,.04)}};
function confetti(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const c=$('#fx'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
  const col=['#ffc93c','#2446c4','#1e9e62','#e2503f','#8a5cf6','#ff8fb1'],P=Array.from({length:110},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,s:ri(5,10),c:pick(col),r:Math.random()*6}));
  let n=0;(function fr(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore()});
    if(++n<130)requestAnimationFrame(fr);else x.clearRect(0,0,c.width,c.height)})()}
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2400)}

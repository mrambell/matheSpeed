"use strict";
/* ---------- state (browser only; export/import as JSON) ---------- */
const KEY='mathespeed.v1',OLD_KEY='matheheft.v1';
const DEF=()=>({app:'mathespeed',v:1,name:'',grade:3,sound:true,xp:0,streak:0,best:0,lastDay:null,joker:1,
  today:{d:null,ok:0,mission:false},topics:{},blitz:{},stickers:{},badges:{},due:[],hist:{},
  tot:{ok:0,n:0,help:0,fixed:0,sessions:0,maxCombo:0}});
let state=DEF();
function load(){try{const s=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem(OLD_KEY));if(s&&s.v===1)state=merge(s)}catch(e){}}
function merge(s){const d=DEF();return Object.assign(d,s,{app:'mathespeed',today:Object.assign(d.today,s.today),tot:Object.assign(d.tot,s.tot)})}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
const st=id=>state.topics[id]||(state.topics[id]={lvl:1,stars:0,ok:0,n:0,row:0,miss:0,ms:0});
const tod=()=>{if(state.today.d!==day())state.today={d:day(),ok:0,mission:false};return state.today};
const hist=()=>state.hist[day()]||(state.hist[day()]={ok:0,n:0});
const level=()=>Math.floor((Math.sqrt(1+8*state.xp/100)-1)/2)+1;
const lvlAt=n=>100*n*(n-1)/2;
const title=()=>TITLES[Math.min(level(),TITLES.length)-1];
function shownStreak(){if(!state.lastDay)return 0;const d=dayDiff(state.lastDay,day());return d<=1||(d===2&&state.joker>0)?state.streak:0}
function markActive(){const d=day();if(state.lastDay===d)return;const diff=state.lastDay?dayDiff(state.lastDay,d):0;
  if(diff===1)state.streak++;else if(diff===2&&state.joker>0){state.joker--;state.streak++}else state.streak=1;
  state.lastDay=d;state.best=Math.max(state.best,state.streak);if(state.streak%7===0)state.joker=Math.min(2,state.joker+1);
  const keys=Object.keys(state.hist).sort();while(keys.length>90)delete state.hist[keys.shift()]}

import{_ as p}from"./Bk_K8LeY.js";import{_ as f}from"./B8qj3hqn.js";import{u as d}from"./B14ZrYVM.js";import{d as y,Q as h,M as x,b,c as w,e,g as s,w as i,t as r,E as _}from"./Dh2Cs-si.js";import{u as k}from"./DgYp217X.js";const B={class:"flex justify-between"},C={class:"flex justify-between"},L=y({__name:"profile",async setup(v){let t,a;const n=d(),u=h(),{data:m}=([t,a]=x(async()=>k("likes",async()=>{if(!n.value)return;const{data:o}=await u.from("Likes").select("*").eq("user_id",n.value.id);return o})),t=await t,a(),t);return(o,S)=>{const l=p,c=f;return b(),w("main",null,[e("section",null,[s(c,null,{default:i(()=>[e("div",B,[s(l,{type:"h1",element:"h1",class:"mb-8",text:"Profile"})]),e("pre",null,"            "+r(_(n))+`
          `,1)]),_:1})]),e("section",null,[s(c,null,{default:i(()=>[e("div",C,[s(l,{type:"h2",element:"h2",class:"mb-8",text:"Likes"})]),e("pre",null,r(_(m)),1)]),_:1})])])}}});export{L as default};

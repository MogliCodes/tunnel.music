import{d as s,bw as y,bR as _,v as g,ax as o}from"./entry.2a07e6a4.js";import{u as p}from"./head.e99c7c31.js";import v from"./ContentRenderer.a7aecbef.js";import w from"./ContentQuery.dc3d3371.js";import"./vue.f36acd1f.893b1b97.js";import"./ContentRendererMarkdown.2c605fd9.js";import"./index.443f1bd1.js";import"./asyncData.816904ff.js";const C=s({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(f){const e=y(),{tag:d,excerpt:i,path:m,query:r,head:u}=f,c={...r||{},path:m||(r==null?void 0:r.path)||_(g().path),find:"one"},l=(t,n)=>o("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:t,data:n},null,2));return o(w,c,{default:e!=null&&e.default?({data:t,refresh:n,isPartial:h})=>{var a;return u&&p(t),(a=e.default)==null?void 0:a.call(e,{doc:t,refresh:n,isPartial:h,excerpt:i,...this.$attrs})}:({data:t})=>(u&&p(t),o(v,{value:t,excerpt:i,tag:d,...this.$attrs},{empty:n=>e!=null&&e.empty?e.empty(n):l("default",t)})),empty:t=>{var n;return((n=e==null?void 0:e.empty)==null?void 0:n.call(e,t))||o("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":t=>{var n;return((n=e==null?void 0:e["not-found"])==null?void 0:n.call(e,t))||o("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}}),N=C;export{N as default};

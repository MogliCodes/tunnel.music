import{_ as i}from"./36Th3iVI.js";import l from"./S601zZqO.js";import{_}from"./DsI2fYIl.js";import{d as m,Q as p,b as g,c as d,e,g as t,w as u}from"./ChpDcWo0.js";import"./BQkc-AXV.js";import"./DlAUqK2U.js";const f={class:"bg-gray-100 bg-opacity-80 border-2 p-20 rounded-md"},h={class:"flex flex-col items-center justify-center gap-3"},x=e("span",null,"Log In with Google",-1),A=m({__name:"login",setup(b){const n=p(),s=async()=>{const{error:o}=await n.auth.signInWithOAuth({provider:"google",options:{redirectTo:"http://localhost:3000/confirm"}});o&&console.log(o)};return(o,y)=>{const a=i,c=l,r=_;return g(),d("main",null,[e("section",null,[t(r,{class:"flex flex-col items-center"},{default:u(()=>[e("div",f,[e("div",h,[t(a,{type:"h2",element:"h1",class:"mb-8",text:"Login"}),e("button",{onClick:s,class:"hover:bg-text hover:text-gray-90 transition bg-gray-90 text-gray-20 py-4 px-14 flex gap-3 items-center rounded-md"},[t(c,{name:"logos:google-icon"}),x])])])]),_:1})])])}}});export{A as default};
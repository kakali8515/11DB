import{C as d}from"./CastCrewCard.fbfc50eb.js";import{_ as m,r as i,o as e,c as o,a as t,F as p,s as C,l as u,p as k,q as w,t as f,a4 as g,a5 as h}from"./index.d6ed331f.js";const v={name:"CastCrewSection",components:{CastCrewCard:d},props:{people_list:Array}},$={key:0,class:"lists tab-scroll moble"},y={class:"image-otr cast-crew"},L=t("img",{src:g,alt:"more",class:"white-image"},null,-1),b=t("img",{src:h,alt:"more",class:"red-image"},null,-1),B={key:1,class:"no-data-wrapper"};function D(a,r,n,S,x,F){const c=i("CastCrewCard"),l=i("router-link");return n.people_list.length>0?(e(),o("div",$,[t("div",y,[(e(!0),o(p,null,C(n.people_list,(s,_)=>(e(),u(c,{key:_,castList:s,redirectLink:`/people/details/${s.id}`},null,8,["castList","redirectLink"]))),128))]),k(l,{to:"",class:"more-content",onClick:r[0]||(r[0]=s=>a.$emit("navigation"))},{default:w(()=>[L,b]),_:1})])):(e(),o("div",B,[t("p",null,f(a.$t("searchResults.noData")),1)]))}const q=m(v,[["render",D],["__file","D:/11-db-frontend/11_db/src/components/Details/CastCrewSection.vue"]]);export{q as C};

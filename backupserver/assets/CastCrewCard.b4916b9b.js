import{_ as l,o as e,c as a,a as t,t as d,B as m}from"./index.ace3f588.js";const p={name:"CastCrewCard",props:{castList:{type:Object},redirectLink:{type:String}}},u={class:"hgt"},C=["src"],f={key:1,src:m,alt:""},g={class:"cast-crew-info"},h={class:"sub-para"};function k(_,i,s,L,v,w){var c,n,r,o;return e(),a("a",{onClick:i[0]||(i[0]=y=>_.$router.push(s.redirectLink)),class:"image-innr",href:"javascript:void(0)"},[t("figure",u,[(c=s.castList)!=null&&c.image.includes("https")?(e(),a("img",{key:0,src:(n=s.castList)==null?void 0:n.image,alt:""},null,8,C)):(e(),a("img",f))]),t("div",g,[t("p",null,d((r=s.castList)==null?void 0:r.name),1),t("p",h,d((o=s.castList)==null?void 0:o.designation),1)])])}const B=l(p,[["render",k],["__file","D:/workspace/11-db-frontend/11_db/src/components/CastCrewCard.vue"]]);export{B as C};

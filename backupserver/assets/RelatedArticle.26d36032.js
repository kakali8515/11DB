import{_ as b,J as w,o as s,c as n,a as t,t as l,r as N,F as f,s as A,p as C}from"./index.d6ed331f.js";const v={name:"NewsCard",props:{article:Object},methods:{dateformat:w}},L={class:"article-innr"},y=["href"],H=["src","alt"],M={class:"cc-hdr"},R=["href","innerHTML"],T=["innerHTML"];function x(i,g,e,p,k,o){var r,a,c,_,d,h,u,m;return s(),n("div",L,[t("a",{href:(r=e.article)==null?void 0:r.slug,target:"_blank",class:"article-pic"},[t("img",{src:(a=e.article)==null?void 0:a.image,alt:(c=e.article)==null?void 0:c.creator_name},null,8,H)],8,y),t("h5",null,l((_=e.article)==null?void 0:_.category),1),t("h4",M,[t("a",{href:(d=e.article)==null?void 0:d.slug,target:"_blank",innerHTML:(h=e.article)==null?void 0:h.title},null,8,R)]),t("p",{class:"cc-para",innerHTML:(u=e.article)==null?void 0:u.short_descriptions},null,8,T),t("h6",null,l(o.dateformat((m=e.article)==null?void 0:m.publish_date)),1)])}const B=b(v,[["render",x],["__file","D:/11-db-frontend/11_db/src/components/NewsCard.vue"]]),D={name:"RelatedArticle",components:{NewsCard:B},props:{article:Array,related_articles_details_url:String},methods:{moreArticles(){window.open("https://zapzee.net/","_blank")}}},z=["href"];function F(i,g,e,p,k,o){const r=N("NewsCard");return s(),n(f,null,[(s(!0),n(f,null,A(e.article,(a,c)=>(s(),n("div",{class:"article-otr",key:c},[C(r,{article:a},null,8,["article"])]))),128)),t("a",{class:"more-article-btn",href:e.related_articles_details_url,target:"_blank"},l(i.$t("relatedArticles.morePlus")),9,z)],64)}const V=b(D,[["render",F],["__file","D:/11-db-frontend/11_db/src/components/RelatedArticle.vue"]]);export{V as R};

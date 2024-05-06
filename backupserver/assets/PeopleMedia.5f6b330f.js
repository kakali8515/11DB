import{_ as K,y as H,z as j,U as E,V as S,N as q,O as x,E as s,L as z,a6 as G,G as Y,a7 as J,K as Q,r as f,o as c,c as v,p as C,q as P,a as d,t as h,F as M,s as L,l as A,b as I}from"./index.d6ed331f.js";import{B as X}from"./BannerCardTwo.e1dc7c44.js";import{C as Z}from"./CastCrewCard.fbfc50eb.js";import{V as $,I as ee}from"./ImageCard.8a960c6d.js";import{P as U}from"./PeopleDetailsService.7dfd2a10.js";import"./left-arrow-gray.5b681dc2.js";import"./play-btn.b7dd2e78.js";const ae={name:"PeopleMedia",emits:["on-current-theme-change"],components:{Tabs:H,TabWrapper:j,BannerCardTwo:X,CastCrewCard:Z,VideoCard:$,ImageCard:ee},mixins:[E,S],setup(){const u=q(),w=x(),V=s(""),e=s(""),m=s([]),b=s(0),g=s([]),_=s(0),t=u.params.id,T=s(""),p=s([]),i=s([]),r=s("addNewPeople.mediadetails.videoTitle"),O=z("common"),N=s(!1),k=async(o,l)=>{let R={person_id:o,type:"video",page:l,limit:10};try{let a=await U.getMediaDetails(R);m.value=a.data.results.map(n=>({link:n.path,title:n.title,id:n.video_id})),Array.from(m.value).forEach((n,B)=>{m.value[B].videoid=S(n.link)||E(n.link),S(n.link)?m.value[B].type="vimeo":m.value[B].type="youtube"}),b.value=a.data.total_records,i.value.push(...m.value),e.value=a.data.person_name,V.value=a.data.poster_image,T.value=a.data.background_image}catch(a){console.warn(a)}},y=async(o,l)=>{let R={person_id:o,type:"image",page:l,limit:10};try{let a=await U.getMediaDetails(R);a.status==200&&(N.value=!0,g.value=a.data.results.map(n=>({link:n.path,title:n.title,id:n.image_id})),e.value=a.data.person_name,p.value.push(...g.value),_.value=a.data.total_records,setTimeout(()=>{N.value=!1},1e3))}catch(a){console.warn(a)}},W=()=>{w.push({name:"AddNewPeopleForm",params:{external_id:t,type:"internal"}}),localStorage.setItem("peopleBackPage","/people-media/"+t)},F=o=>{r.value=o,o=="mediaSection.images"&&y(t,1),o=="addNewPeople.mediadetails.videoTitle"&&k(t,1),i.value=[],p.value=[]},D=()=>{let o=document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight;if(r.value=="addNewPeople.mediadetails.videoTitle"&&o&&b.value>i.value.length){let l=++page.value;setTimeout(()=>{k(t,l)},100)}if(r.value=="mediaSection.images"&&o&&_.value>p.value.length){let l=++page.value;setTimeout(()=>{y(t,l)},100)}};return G(()=>{k(t,1),y(t,1)}),Y(()=>{window.addEventListener("scroll",D)}),J(()=>{window.removeEventListener("scroll",D)}),Q(()=>O.state.SelectedLang,function(o,l){(o=="KO"&&l=="EN"||o=="EN"&&l=="KO")&&(r.value=="mediaSection.images"&&y(t,1),r.value=="addNewPeople.mediadetails.videoTitle"&&k(t,1),i.value=[],p.value=[])}),{videos:m,images:g,videoCount:b,imageCount:_,posterImage:V,title:e,toAddMediaVideo:W,background_image:T,newVideoResult:i,newImageResult:p,selectedTab:F,onScroll:D,isData:N}}},te={class:"container"},oe={class:"movies-media"},ie={class:"mypage-rght"},ne={class:"media-heading"},se={class:"tab-outr"},le={key:0,class:"media-otr movies-media-outer"},de={key:1,class:"no-data-wrapper"},re={key:0,class:"image-otr"},ce={key:1,class:"no-data-wrapper"};function me(u,w,V,e,m,b){const g=f("BannerCardTwo"),_=f("VideoCard"),t=f("Tabs"),T=f("ImageCard"),p=f("TabWrapper");return c(),v("div",null,[C(g,{bannerInfo:{imgUrl:e.posterImage,link:"PeopleDetails",id:u.$route.params.id,background_image:e.background_image}},{default:P(()=>[d("h3",null,h(e.title),1)]),_:1},8,["bannerInfo"]),d("div",te,[d("div",oe,[d("div",ie,[d("div",ne,[d("h2",null,h(u.$t("addNewPeople.media")),1),d("button",{class:"edit-button",onClick:w[0]||(w[0]=(...i)=>e.toAddMediaVideo&&e.toAddMediaVideo(...i))},h(u.$t("addNewPeople.editButton")),1)]),d("div",se,[C(p,{onSelectedTab:e.selectedTab},{default:P(()=>[C(t,{title:"addNewPeople.mediadetails.videoTitle"},{default:P(()=>[e.newVideoResult.length>0?(c(),v("div",le,[(c(!0),v(M,null,L(e.newVideoResult,(i,r)=>(c(),A(_,{key:r,video:i},null,8,["video"]))),128))])):I("v-if",!0),e.isData&&e.newVideoResult.length==0?(c(),v("div",de,[d("p",null,h(u.$t("searchResults.noData")),1)])):I("v-if",!0)]),_:1}),C(t,{title:"mediaSection.images"},{default:P(()=>[e.newImageResult.length>0?(c(),v("div",re,[(c(!0),v(M,null,L(e.newImageResult,(i,r)=>(c(),A(T,{key:r,image:i},null,8,["image"]))),128))])):I("v-if",!0),e.isData&&e.newImageResult.length==0?(c(),v("div",ce,[d("p",null,h(u.$t("searchResults.noData")),1)])):I("v-if",!0)]),_:1})]),_:1},8,["onSelectedTab"])])])])])])}const we=K(ae,[["render",me],["__file","D:/11-db-frontend/11_db/src/views/People/PeopleMedia.vue"]]);export{we as default};

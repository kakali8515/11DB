import{_ as K,y as Y,z as x,U as j,V as A,N as J,O as Q,E as o,L as X,a6 as Z,G as $,a7 as ee,K as ae,r as _,o as n,c as r,p as M,q as P,a as d,t as f,F as U,s as W,l as H,b as w}from"./index.3434c1c6.js";import{B as te}from"./BannerCardTwo.6a313ac0.js";import{C as oe}from"./CastCrewCard.d3888d41.js";import{V as se,I as ie}from"./ImageCard.55740cc2.js";import{P as le}from"./PosterCard.d9647535.js";import{M as O}from"./MoviesDetailsService.b2bdc6d0.js";import"./left-arrow-gray.5b681dc2.js";import"./play-btn.b7dd2e78.js";const ne={name:"MoviesMedia",emits:["on-current-theme-change"],components:{Tabs:Y,TabWrapper:x,BannerCardTwo:te,CastCrewCard:oe,VideoCard:se,ImageCard:ie,PosterCard:le},mixins:[j,A],setup(){const c=J(),N=Q(),I=o(""),a=o(""),m=o([]),R=o(0),h=o([]),b=o(0),v=o([]),y=o(0),s=c.params.id,D=o(""),i=o([]),u=o(1),p=o("addNewPeople.mediadetails.videoTitle"),T=o([]),k=o([]),q=X("common"),g=o(!1),V=async(t,l)=>{let C={id:Number(t),type:"video",page:l,limit:20};try{let e=await O.getMediaDetails(C);e.status==200&&(g.value=!0,m.value=e.data.results,Array.from(e.data.results).forEach((F,L)=>{m.value[L].videoid=A(F.link)||j(F.link),A(F.link)?m.value[L].type="vimeo":m.value[L].type="youtube"}),R.value=e.data.total_records,i.value.push(...m.value),I.value=e.data.poster_image,a.value=e.data.title,D.value=e.data.background_image?e.data.background_image:e.data.poster_image?e.data.poster_image:"",setTimeout(()=>{g.value=!1},1e3))}catch(e){console.warn(e)}},B=async(t,l)=>{let C={id:Number(t),type:"image",page:l,limit:20};try{let e=await O.getMediaDetails(C);e.status==200&&(g.value=!0,h.value=e.data.results,b.value=e.data.total_records,a.value=e.data.title,T.value.push(...h.value),setTimeout(()=>{g.value=!1},1e3))}catch(e){console.warn(e)}},S=async(t,l)=>{let C={id:Number(t),type:"poster",page:l,limit:20};try{let e=await O.getMediaDetails(C);e.status==200&&(g.value=!0,v.value=e.data.results,y.value=e.data.total_records,a.value=e.data.title,k.value.push(...v.value),setTimeout(()=>{g.value=!1},1e3))}catch(e){console.warn(e)}},z=()=>{N.push({name:"AddNewMovieForm",params:{external_id:s,type:"internal"}}),localStorage.setItem("movieBackPage","/movies-media/"+s)},G=t=>{p.value=t,t=="mediaSection.images"&&B(s,1),t=="addNewPeople.mediadetails.videoTitle"&&V(s,1),t=="addNewMoviesForm.poster"&&S(s,1),i.value=[],T.value=[],k.value=[]},E=()=>{let t=document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight;if(p.value=="addNewPeople.mediadetails.videoTitle"&&t&&R.value>i.value.length){let l=++u.value;setTimeout(()=>{V(s,l)},100)}if(p.value=="mediaSection.images"&&t&&b.value>T.value.length){let l=++u.value;setTimeout(()=>{B(s,l)},100)}if(p.value=="addNewMoviesForm.poster"&&t&&y.value>k.value.length){let l=++u.value;setTimeout(()=>{S(s,l)},100)}};return Z(()=>{V(s,1)}),$(()=>{window.addEventListener("scroll",E)}),ee(()=>{window.removeEventListener("scroll",E)}),ae(()=>q.state.SelectedLang,function(t,l){t&&t!=l&&(p.value=="mediaSection.images"&&B(s,1),p.value=="addNewPeople.mediadetails.videoTitle"&&V(s,1),p.value=="addNewMoviesForm.poster"&&S(s,1),i.value=[],T.value=[],k.value=[])}),{videos:m,images:h,posters:v,videoCount:R,imageCount:b,posterCount:y,posterImage:I,title:a,toAddMediaVideo:z,background_image:D,selectedTab:G,newVideoResult:i,newImageResult:T,newPosterResult:k,onScroll:E,isData:g}}},de={class:"container"},re={class:"movies-media media__details"},ue={class:"mypage-rght"},ce={class:"media-heading"},me={class:"tab-outr"},ve={key:0,class:"media-otr movies-media-outer"},pe={key:1,class:"no-data-wrapper"},ge={key:0,class:"image-otr"},_e={key:1,class:"no-data-wrapper"},fe={key:0,class:"image-otr post-outer"},we={key:1,class:"no-data-wrapper"};function he(c,N,I,a,m,R){const h=_("BannerCardTwo"),b=_("VideoCard"),v=_("Tabs"),y=_("ImageCard"),s=_("PosterCard"),D=_("TabWrapper");return n(),r("div",null,[M(h,{bannerInfo:{imgUrl:a.posterImage,link:"MoviesDetails",id:c.$route.params.id,background_image:a.background_image}},{default:P(()=>[d("h3",null,f(a.title),1)]),_:1},8,["bannerInfo"]),d("div",de,[d("div",re,[d("div",ue,[d("div",ce,[d("h2",null,f(c.$t("addNewPeople.media")),1),d("button",{class:"edit-button",onClick:N[0]||(N[0]=(...i)=>a.toAddMediaVideo&&a.toAddMediaVideo(...i))},f(c.$t("general.editButton")),1)]),d("div",me,[M(D,{onSelectedTab:a.selectedTab},{default:P(()=>[M(v,{title:"addNewPeople.mediadetails.videoTitle"},{default:P(()=>[a.newVideoResult.length>0?(n(),r("div",ve,[(n(!0),r(U,null,W(a.newVideoResult,(i,u)=>(n(),H(b,{key:u,video:i},null,8,["video"]))),128))])):w("v-if",!0),a.isData&&a.newVideoResult.length==0?(n(),r("div",pe,[d("p",null,f(c.$t("searchResults.noData")),1)])):w("v-if",!0)]),_:1}),M(v,{title:"mediaSection.images"},{default:P(()=>[a.newImageResult.length>0?(n(),r("div",ge,[(n(!0),r(U,null,W(a.newImageResult,(i,u)=>(n(),H(y,{key:u,image:i},null,8,["image"]))),128))])):w("v-if",!0),a.isData&&a.newImageResult.length==0?(n(),r("div",_e,[d("p",null,f(c.$t("searchResults.noData")),1)])):w("v-if",!0)]),_:1}),M(v,{title:"addNewMoviesForm.poster"},{default:P(()=>[a.newPosterResult.length>0?(n(),r("div",fe,[(n(!0),r(U,null,W(a.newPosterResult,(i,u)=>(n(),H(s,{key:u,poster:i},null,8,["poster"]))),128))])):w("v-if",!0),a.isData&&a.newPosterResult.length==0?(n(),r("div",we,[d("p",null,f(c.$t("searchResults.noData")),1)])):w("v-if",!0)]),_:1})]),_:1},8,["onSelectedTab"])])])])])])}const Re=K(ne,[["render",he],["__file","D:/workspace/11-db-frontend/11_db/src/views/Movies/MoviesMedia.vue"]]);export{Re as default};

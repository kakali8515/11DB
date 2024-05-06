import{a as R,D as N}from"./DynamicTabs.5b302e02.js";import{B as G}from"./BannerCardTwo.2c302fff.js";import{_ as V,E as n,G as F,o as a,c as l,a as i,t as _,b as w,n as I,B as W,N as j,O as q,L as M,K as O,r as b,p as C,q as L,l as D,k as B,F as S,s as x}from"./index.ace3f588.js";import{T as z}from"./TVShowsDetailsService.2b588334.js";import"./left-arrow-gray.5b681dc2.js";const A={name:"EpisodeList",props:{episodeList:Object},setup(s){const d=n(!1),t=n(""),e=n("1150"),r=n("0"),m=()=>{d.value=!1,t.value=s.episodeList.episode_description,r.value=s.episodeList.episode_description.length},c=()=>{if(d.value=!d.value,d.value==!0){t.value=s.episodeList.episode_description,r.value=s.episodeList.episode_description.length;return}else{t.value=s.episodeList.episode_description,r.value=s.episodeList.episode_description.length;return}};return F(()=>{m()}),{formattedBody:m,showingFullText:d,discription:t,text_length:r,limit_by:e,getFormatText:c}}},K=["id"],P=["src","alt"],U={key:1,src:W},H={class:"tv-heading"};function J(s,d,t,e,r,m){var c,p,u,h,v;return a(),l("div",{class:I(s.$route.query.episode_id==((c=t.episodeList)==null?void 0:c.episode_id)?"tv-content sm active_episode":"tv-content sm"),id:`episode${(p=t.episodeList)==null?void 0:p.episode_id}`},[i("figure",null,[(u=t.episodeList)!=null&&u.episode_poster_image?(a(),l("img",{key:0,src:(h=t.episodeList)==null?void 0:h.episode_poster_image,alt:(v=t.episodeList)==null?void 0:v.episode_poster_image},null,8,P)):(a(),l("img",U))]),i("div",{class:I(["left-content",e.showingFullText?"episode-more-description":""])},[i("div",H,[i("h3",null,_(t.episodeList.episode_name),1),i("span",null,_(t.episodeList.episode_release_date),1)]),i("p",null,_(e.discription),1),e.text_length>e.limit_by?(a(),l("a",{key:0,onClick:d[0]||(d[0]=T=>e.getFormatText())},_(e.showingFullText?s.$t("episodeList.minusClose"):s.$t("episodeList.plusMore")),1)):w("v-if",!0)],2)],10,K)}const Q=V(A,[["render",J],["__scopeId","data-v-8c0c0cb2"],["__file","D:/workspace/11-db-frontend/11_db/src/components/Details/EpisodeList.vue"]]),X={name:"TvShowsDetailsEpisodes",emits:["on-current-theme-change"],components:{DynamicTabWrapper:R,DynamicTab:N,BannerCardTwo:G,EpisodeList:Q},setup(){const s=j(),d=q(),t=s.params.id,e=n(s.params.season_id),r=n(""),m=n(""),c=n(""),p=n([]),u=n([]),h=n("0"),v=n(""),T=M("common"),g=async f=>{try{let o=await z.getEpisodeDetails(t,f);p.value=o.data.episode_list,p.value.forEach((k,ne)=>{k.episode_description=k.episode_description}),u.value=o.data.season_list,r.value=o.data.title_poster_image,m.value=o.data.title_name,c.value=o.data.background_image?o.data.background_image:o.data.title_poster_image?o.data.title_poster_image:"",v.value=o.data.season_name}catch(o){console.warn(o)}},y=async f=>{let o=u.value.find(function(k){return k.season_id==f});e.value=o.season_id,g(e.value)};return F(()=>{g(e.value)}),O(()=>T.state.SelectedLang,function(f,o){f&&f!=o&&g(e.value)}),{episodeDetails:p,posterImage:r,title:m,season_list:u,onChangeTab:y,toEditTVEpisode:()=>{d.push({name:"AddNewTVDetails",params:{external_id:t,type:"internal"}}),localStorage.setItem("tvBackPage","/tvshows/details-media/"+t+"/"+e.value)},background_image:c,currentSeosonId:h,season_name:v,seasonId:e}}},Y={key:0},Z={class:"tvepisodes-btm"},$={class:"container"},ee={class:"tvepisodes-content"},se={class:"top-head"},te={class:"tab-outr small"},oe={key:0,class:"tv-lists"},ie={key:1,class:"no-data-wrapper"};function ae(s,d,t,e,r,m){var T;const c=b("BannerCardTwo"),p=b("router-link"),u=b("EpisodeList"),h=b("DynamicTab"),v=b("DynamicTabWrapper");return a(),l("div",null,[C(c,{bannerInfo:{imgUrl:e.posterImage,link:"TvShowsDetails",id:s.$route.params.id,background_image:e.background_image}},{default:L(()=>[i("h3",null,[B(_(e.title),1),e.season_name?(a(),l("span",Y,_(e.season_name),1)):w("v-if",!0)])]),_:1},8,["bannerInfo"]),i("section",Z,[i("div",$,[i("div",ee,[i("div",se,[i("h2",null,_(s.$t("searchResults.searchRight.tvShowsDetails.episodes")),1),C(p,{to:"",onClick:e.toEditTVEpisode},{default:L(()=>[B(_(s.$t("general.editButton")),1)]),_:1},8,["onClick"])]),i("div",te,[((T=e.season_list)==null?void 0:T.length)>0?(a(),D(v,{key:0,onGetResponseTitle:e.onChangeTab,seasonId:e.seasonId},{default:L(()=>[(a(!0),l(S,null,x(e.season_list,g=>(a(),D(h,{title:g.season_number,key:g.season_id,seasonId:g.season_id},{default:L(()=>[e.episodeDetails.length>0?(a(),l("div",oe,[(a(!0),l(S,null,x(e.episodeDetails,(y,E)=>(a(),D(u,{episodeList:y,key:E},null,8,["episodeList"]))),128))])):(a(),l("div",ie,[i("p",null,_(s.$t("searchResults.noData")),1)]))]),_:2},1032,["title","seasonId"]))),128))]),_:1},8,["onGetResponseTitle","seasonId"])):w("v-if",!0)])])])])])}const pe=V(X,[["render",ae],["__file","D:/workspace/11-db-frontend/11_db/src/views/TvShows/TvShowsDetailsEpisodes.vue"]]);export{pe as default};

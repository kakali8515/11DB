import{F as f,P as g}from"./PopularCard.2a9ca5ef.js";import{T as v}from"./TVShowsDetailsService.5c7261ee.js";import{_ as w,r as n,o,c as a,a as i,t as c,p as S,F as R,s as P,b as h,l as T}from"./index.3434c1c6.js";import"./AddNewMovieService.ec155d7b.js";import"./MoviesDetailsService.b2bdc6d0.js";import"./Calender.bbc70fdc.js";const L={name:"TvShowsPopular",components:{FilterCard:f,PopularCard:g},inject:["common"],data(){return{type:"tv",page:1,limit:20,popular_list:[],totalRecords:0,newResult:[],search_params:{},isData:!1}},watch:{"common.state.SelectedLang":function(t,e){t&&t!=e&&(this.newResult=[],this.page=1,this.getPopularTVList())}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.getPopularTVList(),window.addEventListener("scroll",this.onScroll)},beforeUnmount(){window.removeEventListener("scroll",this.onScroll)},methods:{getPopularTVList(){let t={page:this.page,limit:this.limit,search_params:this.search_params};v.getPopularTVList(t).then(e=>{e.status==200&&(this.isData=!0,this.popular_list=e.data.results,this.totalRecords=e.data.total_records,this.popular_list.forEach(r=>{this.newResult.some(s=>s.id===r.id)||this.newResult.push(r)}))}).catch(e=>{})},searchData(t){this.search_params=t,this.newResult=[],this.page=1,this.getPopularTVList()},onScroll(){document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight&&this.totalRecords>this.newResult.length&&(this.page=++this.page,setTimeout(()=>{this.getPopularTVList()},100))}}},D={class:"movies-sec"},k={class:"container"},V={class:"movies-main"},y={class:"moives-list"},C={key:0,class:"outerside"},E={key:1,class:"list-no-data"};function b(t,e,r,p,s,u){const m=n("FilterCard"),d=n("PopularCard");return o(),a("section",D,[i("div",k,[i("h2",null,c(t.$t("tvShows.tvShowsPopular")),1),i("div",V,[S(m,{onGetSearchData:u.searchData,certificationtype:s.type},null,8,["onGetSearchData","certificationtype"]),i("div",y,[s.newResult.length>0?(o(),a("div",C,[(o(!0),a(R,null,P(s.newResult,(l,_)=>(o(),T(d,{key:_,popular:l,RedirectLink:`/tvshows/details/${l.id}`},null,8,["popular","RedirectLink"]))),128))])):h("v-if",!0),s.isData&&s.newResult.length==0?(o(),a("p",E,c(t.$t("searchResults.noData")),1)):h("v-if",!0)])])])])}const H=w(L,[["render",b],["__file","D:/workspace/11-db-frontend/11_db/src/views/TvShows/TvShowsPopular.vue"]]);export{H as default};
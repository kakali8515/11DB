import{F as v,P as f}from"./PopularCard.06f0979d.js";import{M as g}from"./MoviesDetailsService.75e9ea61.js";import{_ as w,r as n,o,c as a,a as i,t as c,p as R,F as P,s as M,b as u,l as D}from"./index.d6ed331f.js";import"./AddNewMovieService.a6b28c14.js";import"./Calender.32f04616.js";const S={name:"MoviesPopular",components:{FilterCard:v,PopularCard:f},inject:["common"],data(){return{page:1,limit:20,popular_list:[],search_params:{},type:"movie",totalRecords:0,newResult:[],isData:!1}},watch:{"common.state.SelectedLang":function(e,t){e&&e!=t&&(this.newResult=[],this.page=1,this.getPopularMovie())}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.getPopularMovie(),window.addEventListener("scroll",this.onScroll)},beforeUnmount(){window.removeEventListener("scroll",this.onScroll)},methods:{getPopularMovie(){let e={page:this.page,limit:this.limit,search_params:this.search_params};g.getPopularMovie(e).then(t=>{t.status==200&&(this.isData=!0,this.popular_list=t.data.results,this.totalRecords=t.data.total_records,this.popular_list.forEach(r=>{this.newResult.some(s=>s.id===r.id)||this.newResult.push(r)}))}).catch(t=>{})},searchData(e){this.search_params=e,this.newResult=[],this.page=1,this.getPopularMovie()},onScroll(){document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight&&this.totalRecords>this.newResult.length&&(this.page=++this.page,setTimeout(()=>{this.getPopularMovie()},100))}}},k={class:"movies-sec"},y={class:"container"},C={class:"movies-main"},E={class:"moives-list"},b={key:0,class:"outerside"},F={key:1,class:"list-no-data"};function L(e,t,r,m,s,p){const d=n("FilterCard"),h=n("PopularCard");return o(),a("section",k,[i("div",y,[i("h2",null,c(e.$t("movies.moviesPopular")),1),i("div",C,[R(d,{onGetSearchData:p.searchData,certificationtype:s.type},null,8,["onGetSearchData","certificationtype"]),i("div",E,[s.newResult.length?(o(),a("div",b,[(o(!0),a(P,null,M(s.newResult,(l,_)=>(o(),D(h,{key:_,popular:l,RedirectLink:`/movies/details/${l.id}`},null,8,["popular","RedirectLink"]))),128))])):u("v-if",!0),s.isData&&s.newResult.length==0?(o(),a("p",F,c(e.$t("searchResults.noData")),1)):u("v-if",!0)])])])])}const H=w(S,[["render",L],["__file","D:/11-db-frontend/11_db/src/views/Movies/MoviesPopular.vue"]]);export{H as default};

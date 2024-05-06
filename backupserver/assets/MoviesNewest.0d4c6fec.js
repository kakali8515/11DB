import{F as v,P as f}from"./PopularCard.4e682e0e.js";import{M as g}from"./MoviesDetailsService.84cfada3.js";import{_ as w,r as l,o,c as i,a,t as c,p as R,F as N,s as M,b as m,l as D}from"./index.904f3d07.js";import"./AddNewMovieService.a8c132e6.js";import"./Calender.00cdca20.js";const S={name:"MoviesNewest",components:{FilterCard:v,PopularCard:f},inject:["common"],data(){return{page:1,limit:20,popular_list:[],search_params:{},type:"movie",totalRecords:0,newResult:[],isData:!1}},watch:{"common.state.SelectedLang":function(e,t){e&&e!=t&&(this.newResult=[],this.page=1,this.getNewestMovie())}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.getNewestMovie(),window.addEventListener("scroll",this.onScroll)},beforeUnmount(){window.removeEventListener("scroll",this.onScroll)},methods:{getNewestMovie(){let e={page:this.page,limit:this.limit,search_params:this.search_params};g.getNewestMovie(e).then(t=>{t.status==200&&(this.isData=!0,this.popular_list=t.data.results,this.totalRecords=t.data.total_records,this.popular_list.forEach(r=>{this.newResult.some(s=>s.id===r.id)||this.newResult.push(r)}))}).catch(t=>{})},searchData(e){this.search_params=e,this.newResult=[],this.page=1,this.getNewestMovie()},onScroll(){document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight&&this.totalRecords>this.newResult.length&&(this.page=++this.page,setTimeout(()=>{this.getNewestMovie()},100))}}},k={class:"movies-sec"},y={class:"container"},C={class:"movies-main"},E={class:"moives-list"},b={key:0,class:"outerside"},F={key:1,class:"list-no-data"};function L(e,t,r,d,s,h){const u=l("FilterCard"),p=l("PopularCard");return o(),i("section",k,[a("div",y,[a("h2",null,c(e.$t("movies.moviesNewest")),1),a("div",C,[R(u,{onGetSearchData:h.searchData,certificationtype:s.type},null,8,["onGetSearchData","certificationtype"]),a("div",E,[s.newResult.length>0?(o(),i("div",b,[(o(!0),i(N,null,M(s.newResult,(n,_)=>(o(),D(p,{key:_,popular:n,RedirectLink:`/movies/details/${n.id}`},null,8,["popular","RedirectLink"]))),128))])):m("v-if",!0),s.isData&&s.newResult.length==0?(o(),i("p",F,c(e.$t("searchResults.noData")),1)):m("v-if",!0)])])])])}const H=w(S,[["render",L],["__file","D:/11-db-frontend/11_db/src/views/Movies/MoviesNewest.vue"]]);export{H as default};

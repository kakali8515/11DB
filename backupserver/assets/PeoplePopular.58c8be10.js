import{D as L,a as w}from"./DynamicTabs.cf513525.js";import{C as k}from"./CastCrewCard.d07256f0.js";import{P}from"./PeopleDetailsService.be2f9f3f.js";import{A as D}from"./AddNewMovieService.a8c132e6.js";import{_ as R,r,o as i,c as l,a as o,t as m,l as n,q as g,b as c,F as b,s as _}from"./index.904f3d07.js";const I=new D,S={name:"PeoplePopular",components:{DynamicTab:L,DynamicTabWrapper:w,CastCrewCard:k},inject:["common"],data(){return{page:1,limit:16,popular_list:[],newResult:[],active:!1,jobTitleList:[],activeCategoryID:[],activeCategoryList:[this.$t("bulk.worklist.all")],selectedTab:[],tabname:"",isData:!1}},watch:{"common.state.SelectedLang":function(t,a){t&&t!=a&&(this.creditJobTitleList(),this.newResult=[],this.page=1,this.tabname!=this.$t("bulk.worklist.all")&&this.tabname!=""?(this.activeCategoryID=this.selectedTab.map(e=>e.department_id),this.activeCategoryList=this.selectedTab.map(e=>e.department_name),this.activeCategoryList.length||this.activeCategoryList.push(this.$t("bulk.worklist.all")),this.activeCategoryList.length==this.jobTitleList.length-1&&this.activeCategoryList.push(this.$t("bulk.worklist.all")),this.getPopularPeople(this.activeCategoryID)):(this.selectedTab=[],this.activeCategoryID=[],this.activeCategoryList=[this.$t("bulk.worklist.all")],this.getPopularPeople(this.activeCategoryID)))}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.getPopularPeople(),this.creditJobTitleList(),window.addEventListener("scroll",this.onScroll)},beforeUnmount(){window.removeEventListener("scroll",this.onScroll)},methods:{getPopularPeople(t){let a={page:this.page,limit:this.limit,department_type:t||[]};P.getPopularPeople(a).then(e=>{e.status==200&&(this.isData=!0,this.popular_list=e.data.results,this.totalRecords=e.data.total_records,this.activeCategoryID!=t?this.newResult.push(...this.popular_list):(this.newResult=[],this.newResult.push(...this.popular_list)))}).catch(e=>{})},creditJobTitleList(){I.creditJobTitleList(this.$i18n.locale).then(t=>{t.status==200&&(this.jobTitleList=t.data.results,this.jobTitleList.unshift({department_name:this.$t("bulk.worklist.all"),department_id:""}))}).catch(t=>{})},onChangeTab(t){this.page=1,this.tabname=t,t!=this.$t("bulk.worklist.all")?(this.selectedTab.map(e=>e.department_name).includes(t)?this.selectedTab=this.selectedTab.filter(function(e){return e.department_name!==t}):this.selectedTab.push(this.jobTitleList.find(function(e){return e.department_name==t})),this.activeCategoryID=this.selectedTab.map(e=>e.department_id),this.activeCategoryList=this.selectedTab.map(e=>e.department_name),this.activeCategoryList.length||this.activeCategoryList.push(this.$t("bulk.worklist.all")),this.activeCategoryList.length==this.jobTitleList.length-1&&this.activeCategoryList.push(this.$t("bulk.worklist.all")),this.getPopularPeople(this.activeCategoryID)):(this.selectedTab=[],this.activeCategoryID=[],this.activeCategoryList=[this.$t("bulk.worklist.all")],this.getPopularPeople(this.activeCategoryID))},onScroll(){document.documentElement.offsetHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight&&this.totalRecords>this.newResult.length&&(this.page=++this.page,setTimeout(()=>{this.getPopularPeople()},100))}}},$={class:"people-sec"},j={class:"container"},E={class:"tab-outr tab-style"},N={key:0,class:"image-otr people"},W={key:1,class:"no-data-wrapper"};function B(t,a,e,J,s,v){var h;const f=r("CastCrewCard"),C=r("DynamicTab"),T=r("DynamicTabWrapper");return i(),l("div",$,[o("div",j,[o("h2",null,m(t.$t("popularPeople.header")),1),o("div",E,[((h=s.jobTitleList)==null?void 0:h.length)>0?(i(),n(T,{key:0,onGetResponseTitle:v.onChangeTab,multiple:"true",selectedTitleList:s.activeCategoryList},{default:g(()=>[(i(!0),l(b,null,_(s.jobTitleList,p=>(i(),n(C,{title:p.department_name,key:p.department_id},{default:g(()=>{var u;return[((u=s.newResult)==null?void 0:u.length)>0?(i(),l("div",N,[(i(!0),l(b,null,_(s.newResult,(d,y)=>(i(),n(f,{key:y,castList:d,redirectLink:`/people/details/${d.id}`},null,8,["castList","redirectLink"]))),128))])):c("v-if",!0),s.isData&&s.newResult.length==0?(i(),l("div",W,[o("p",null,m(t.$t("searchResults.noData")),1)])):c("v-if",!0)]}),_:2},1032,["title"]))),128))]),_:1},8,["onGetResponseTitle","selectedTitleList"])):c("v-if",!0)])])])}const M=R(S,[["render",B],["__file","D:/11-db-frontend/11_db/src/views/People/PeoplePopular.vue"]]);export{M as default};

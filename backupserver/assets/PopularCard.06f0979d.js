import{A as M}from"./AddNewMovieService.a6b28c14.js";import{M as S}from"./MoviesDetailsService.75e9ea61.js";import{C as P}from"./Calender.32f04616.js";import{af as R,J as D,_ as T,r as w,ag as O,o as l,c as o,a as e,n as y,k as C,t as n,b as h,p as f,w as v,v as G,F as d,s as u,a3 as j,aa as U,a8 as B,u as k,B as Y,ad as E}from"./index.d6ed331f.js";const F="/assets/arrow-down2.a5048cc9.svg",N="/assets/arrow-down-black.0050a2ba.svg",A="/assets/arrow-down-red.d6dad35a.svg",V="/assets/gray-close.3964e3b4.svg",K={name:"FilterCard",inject:["common"],components:{Calender:P},data(){return{toggle:!1,isAddClassWeb:!1,isAddClassWebFilter:!1,category_list:[],type:"all",sub_category_list:[],category_id:null,sub_cat_id:null,search_text:"",tag_search_list:[],genre_list:[],genre:null,countryList:[],certificationList:[],certification:"",selectedTagName:[],tagBelowList:[],countryBelowList:[],country:[],ottList:[],watch:[],release_date_from:"",release_date_to:"",run_time_from:"0",run_time_to:"0",country_id:null,datePlaceholder:"MM.DD.YYYY",isSearchButtonView:!0,isFilterButtonView:!1}},directives:{clickOutside:R.directive},props:{certificationtype:String,filterType:String},created(){this.AddNewMovieService=new M},watch:{"common.state.SelectedLang":function(t,i){(t=="KO"&&i=="EN"||t=="EN"&&i=="KO")&&(this.tagCategories(),this.getGenreList(),this.getCountryList(),this.crtificationDropdown(),this.getStreamList())}},mounted(){this.tagCategories(),this.getGenreList(),this.getCountryList(),this.crtificationDropdown(),this.getStreamList()},methods:{tagCategories(){this.AddNewMovieService.tagCategories(this.$i18n.locale,this.type).then(t=>{t.status==200&&(this.category_list=t.data.results)}).catch(t=>{})},changeSubCategoryList(t){this.category_id=t,this.sub_cat_id=null,this.sub_category_list=[],this.tag_search_list=[],this.category_id&&this.getSubcategoryList()},getSubCategoryId(t){this.sub_cat_id=t},getGenreId(t){this.genre=t},getSubcategoryList(){this.AddNewMovieService.getSubcategoryList(this.category_id,this.$i18n.locale).then(t=>{t.status==200&&(this.sub_category_list=t.data.results)}).catch(t=>{})},getTagSearchList(){this.toggle=!0,S.getFilterTagSearchList(this.category_id,this.sub_cat_id,this.search_text,this.$i18n.locale).then(t=>{t.status==200&&(this.tag_search_list=t.data.results)}).catch(t=>{})},getGenreList(){S.getGenreList().then(t=>{t.status==200&&(this.genre_list=t.data.genre_list)}).catch(t=>{})},getSearchData(){this.toggle=!1;let t={category_id:this.category_id,sub_category_id:this.sub_cat_id,tag_id:this.selectedTagName,genre:this.genre,certification:this.certification,country:this.country,run_time_from:this.run_time_from,run_time_to:this.run_time_to,watch:this.watch,release_date_from:this.release_date_from,release_date_to:this.release_date_to};this.$emit("getSearchData",t)},getCountryList(){this.AddNewMovieService.getCountryList().then(t=>{t.status==200&&(this.countryList=t.data.results)}).catch(t=>{})},crtificationDropdown(){this.AddNewMovieService.getCertificationList(this.certificationtype).then(t=>{t.status==200&&(this.certificationList=t.data.certification_list)}).catch(t=>{})},getTagSearchName(t){this.tagBelowList.find(c=>c.id==t.id)||this.tagBelowList.push(t),this.selectedTagName.indexOf(t.id)===-1&&this.selectedTagName.push(t.id)},removeTagSearch(t){this.tagBelowList.find(c=>c.id==t.id)&&(this.tagBelowList.splice(this.tagBelowList.indexOf(t),1),this.selectedTagName.splice(this.selectedTagName.indexOf(t.id),1))},chooseCountry(t){this.country_id=t;let i=this.countryBelowList.find(b=>b.id==t),c=this.countryList.find(b=>b.id==t);!i&&c&&this.countryBelowList.push({id:t,country_name:c.country_name}),this.country.indexOf(t)===-1&&t!=null&&this.country.push(Number(t))},removeCountry(t){this.countryBelowList.find(c=>c.id==t.id)&&(this.countryBelowList.splice(this.countryBelowList.indexOf(t),1),this.country.splice(this.country.indexOf(t.id),1)),this.countryBelowList.length==0&&(this.country_id=null)},getStreamList(){this.AddNewMovieService.getServiceProviderList(this.$i18n.locale,this.certificationtype).then(t=>{t.status==200&&(this.ottList=t.data.results)}).catch(t=>{})},dateformat:D,getRealeaseDateFrom(t){this.release_date_from=this.dateformat(t)},getRealeaseDateTo(t){this.release_date_to=this.dateformat(t)},getCertification(t){this.certification=t.target.value},getRangeValue(t){this.run_time_from=t[0],this.run_time_to=t[1]},addClass:function(){this.isAddClassWebFilter=!1,this.isSearchButtonView=!0,this.isFilterButtonView=!1,this.isAddClassWeb=!this.isAddClassWeb},addClassFilter:function(){this.isAddClassWeb=!1,this.isSearchButtonView=!1,this.isFilterButtonView=!0,this.isAddClassWebFilter=!this.isAddClassWebFilter},addClassTag:function(){this.isAddClassWeb=this.isAddClassWeb},addClassShow:function(){this.isAddClassWebFilter=this.isAddClassWebFilter}}},z={class:"filters"},J={class:"lists-tag"},q=e("img",{src:F,alt:"down-arrow",class:"down-arrow"},null,-1),H=e("img",{src:N,alt:"down-arrow",class:"down-black-arrow"},null,-1),Q=e("img",{src:A,alt:"up-arrow",class:"up-arrow"},null,-1),X=e("img",{src:F,alt:"down-arrow",class:"down-arrow"},null,-1),Z=e("img",{src:N,alt:"down-arrow",class:"down-black-arrow"},null,-1),x=e("img",{src:A,alt:"up-arrow",class:"up-arrow"},null,-1),$=["disabled"],ee=["disabled"],te={class:"dropdown"},se={class:"dropdown"},ie={class:"dropdown tag-name"},ae=["placeholder"],re={key:0,class:"watch-list-area"},le={key:0},oe=["onClick"],ne={key:1},ce={class:"tags-show"},de=["onClick"],_e=e("img",{src:V,alt:""},null,-1),he=[_e],ue={class:"filter-dropdown-menu"},ge={class:"filter-drop-innr"},me={class:"filter-drop-left"},fe={class:"dropdown"},pe={class:"filter-drop-left"},ye={class:"dropdown"},Ce={class:"filter-radio-list"},be={class:"filter-radio"},we=["checked"],ve={class:"checkmark"},ke={class:"filter-radio"},Le=["value","checked"],Se={class:"checkmark"},De={class:"filter-drop-left"},Te={class:"select-fl-innr country-filter-innr"},Be={class:"dropdown labTxt"},Fe={class:"tags-show"},Ne=["onClick"],Ae=e("img",{src:V,alt:""},null,-1),Ve=[Ae],Ie={key:0,class:"filter-drop-left"},We={class:"filter-radio-list"},Me={class:"filter-radio"},Pe=e("input",{type:"radio",checked:"checked",name:"radio1"},null,-1),Re={class:"checkmark"},Oe={class:"filter-radio"},Ge=e("input",{type:"radio",name:"radio1"},null,-1),je={class:"checkmark"},Ue={class:"filter-radio"},Ye=e("input",{type:"radio",name:"radio1"},null,-1),Ee={class:"checkmark"},Ke={class:"filter-radio"},ze=e("input",{type:"radio",name:"radio1"},null,-1),Je={class:"checkmark"},qe={class:"filter-radio"},He=e("input",{type:"radio",name:"radio1"},null,-1),Qe={class:"checkmark"},Xe={class:"filter-radio"},Ze=e("input",{type:"radio",name:"radio1"},null,-1),xe={class:"checkmark"},$e=e("li",null,[e("label",{class:"filter-radio"},[e("input",{type:"radio",name:"radio1"}),e("span",{class:"checkmark"},"Sun")])],-1),et={class:"filter-drop-left filter-runtime"},tt={class:"dropdown"},st={class:"filter-drop-left"},it={class:"dropdown"},at={class:"ic-list"},rt={class:"fliter-check"},lt=["src"],ot=["value"],nt=e("span",{class:"checkmark"},null,-1),ct={class:"filter-drop-left"},dt={class:"dropdown"},_t={class:"date-input"},ht={class:"date-input-innr"},ut=e("span",{class:"md-ic"},"~",-1),gt={class:"date-input-innr"};function mt(t,i,c,b,s,r){const m=w("SearchDropdown"),_=w("RangeSlider"),L=w("Calender"),I=O("click-outside");return l(),o("div",z,[e("div",J,[e("span",null,[e("a",{href:"javascript:void(0);",onClick:i[0]||(i[0]=(...a)=>r.addClass&&r.addClass(...a)),class:y({"active-red":s.isAddClassWeb})},[C(n(t.$t("filterCard.tag"))+" ",1),q,H,Q],2),e("a",{href:"javascript:void(0);",onClick:i[1]||(i[1]=(...a)=>r.addClassFilter&&r.addClassFilter(...a)),class:y({"active-red":s.isAddClassWebFilter})},[C(n(t.$t("filterCard.filter")),1),X,Z,x],2)]),s.isSearchButtonView?(l(),o("button",{key:0,type:"button",class:y([!s.category_id&&s.selectedTagName==""?"unable isDisabled":"","btn solid orange-btn"]),disabled:!s.category_id&&s.selectedTagName=="",onClick:i[2]||(i[2]=(...a)=>r.getSearchData&&r.getSearchData(...a))},n(t.$t("button.search")),11,$)):h("v-if",!0),s.isFilterButtonView?(l(),o("button",{key:1,type:"button",class:y([s.run_time_to==0&&!s.genre&&s.certification==""&&s.country.length==0&&s.watch==""&&(s.release_date_to==""||s.release_date_from=="")?"unable isDisabled":"","btn solid orange-btn"]),disabled:s.run_time_to==0&&!s.genre&&s.certification==""&&s.country.length==0&&s.watch==""&&(s.release_date_to==""||s.release_date_from==""),onClick:i[3]||(i[3]=(...a)=>r.getSearchData&&r.getSearchData(...a))},n(t.$t("button.search")),11,ee)):h("v-if",!0)]),e("div",{class:y(["list-common tag-list",{active:s.isAddClassWeb}]),onClick:i[7]||(i[7]=(...a)=>r.addClassTag&&r.addClassTag(...a))},[e("div",te,[e("label",null,n(t.$t("filterCard.category")),1),f(m,{labelItem:t.$t("filterCard.selectCategory"),onDropdownValue:r.changeSubCategoryList,search_type:s.category_id,searchTitleListItem:s.category_list,searchtitle:"category_name",searchvalue:"id"},null,8,["labelItem","onDropdownValue","search_type","searchTitleListItem"])]),e("div",se,[e("label",null,n(t.$t("filterCard.subCategory")),1),f(m,{onDropdownValue:r.getSubCategoryId,search_type:s.sub_cat_id,searchTitleListItem:s.sub_category_list,searchtitle:"category_name",searchvalue:"id",labelItem:t.$t("filterCard.selectSubCategory")},null,8,["onDropdownValue","search_type","searchTitleListItem","labelItem"])]),e("div",ie,[e("label",null,n(t.$t("filterCard.tagName")),1),v(e("input",{onClick:i[4]||(i[4]=a=>s.search_text==""?s.toggle=!1:s.toggle=!s.toggle),type:"search",placeholder:t.$t("button.search"),class:"item-selector item-selector-search",onKeyup:i[5]||(i[5]=(...a)=>r.getTagSearchList&&r.getTagSearchList(...a)),"onUpdate:modelValue":i[6]||(i[6]=a=>s.search_text=a)},null,40,ae),[[G,s.search_text]]),s.toggle?v((l(),o("div",re,[s.tag_search_list.length>0?(l(),o("ul",le,[(l(!0),o(d,null,u(s.tag_search_list,(a,g)=>(l(),o("li",{key:g,onClick:p=>r.getTagSearchName(a)},n(a.title),9,oe))),128))])):(l(),o("ul",ne,[e("li",null,n(t.$t("filterCard.noDataFound")),1)]))])),[[I,()=>s.toggle=!1]]):h("v-if",!0),e("div",ce,[(l(!0),o(d,null,u(s.tagBelowList,(a,g)=>(l(),o("span",{key:g},[C(n(a.title),1),e("a",{onClick:p=>r.removeTagSearch(a)},he,8,de)]))),128))])])],2),e("div",{class:y(["list-common filter-list",{active:s.isAddClassWebFilter}]),onClick:i[11]||(i[11]=(...a)=>r.addClassShow&&r.addClassShow(...a))},[e("div",ue,[e("ul",ge,[e("li",me,[e("div",fe,[e("label",null,n(t.$t("filterCard.genres")),1),f(m,{onDropdownValue:r.getGenreId,search_type:s.genre,searchTitleListItem:s.genre_list,searchtitle:"genre_name",searchvalue:"tag_id",labelItem:t.$t("filterCard.selectgenres")},null,8,["onDropdownValue","search_type","searchTitleListItem","labelItem"])])]),e("li",pe,[e("div",ye,[e("label",null,n(t.$t("filterCard.certification")),1)]),e("ul",Ce,[e("li",null,[e("label",be,[e("input",{type:"radio",name:"radio1",checked:s.certification=="",value:"",onClick:i[8]||(i[8]=a=>r.getCertification(a))},null,8,we),e("span",ve,n(t.$t("filterCard.exempt")),1)])]),(l(!0),o(d,null,u(s.certificationList,(a,g,p)=>(l(),o("li",{key:p},[e("label",ke,[e("input",{type:"radio",name:"radio",value:a,onClick:i[9]||(i[9]=W=>r.getCertification(W)),checked:s.certification==a},null,8,Le),e("span",Se,n(a),1)])]))),128))])]),e("li",De,[e("div",Te,[e("div",Be,[e("label",null,[C(n(t.$t("filterCard.country"))+" ",1),e("span",null,n(t.$t("filterCard.countryUpto")),1)]),f(m,{onDropdownValue:r.chooseCountry,search_type:s.country_id,searchTitleListItem:s.countryList,searchtitle:"country_name",searchvalue:"id",disabled:s.countryBelowList.length>5,labelItem:t.$t("filterCard.selectCountry")},null,8,["onDropdownValue","search_type","searchTitleListItem","disabled","labelItem"])]),e("div",Fe,[(l(!0),o(d,null,u(s.countryBelowList,(a,g)=>(l(),o("span",{key:g},[C(n(a.country_name),1),e("a",{onClick:p=>r.removeCountry(a)},Ve,8,Ne)]))),128))])])]),c.filterType=="webtoon"?(l(),o("li",Ie,[e("p",null,n(t.$t("filterCard.webtoonUploadingDate")),1),e("ul",We,[e("li",null,[e("label",Me,[Pe,e("span",Re,n(t.$t("days.mon")),1)])]),e("li",null,[e("label",Oe,[Ge,e("span",je,n(t.$t("days.tue")),1)])]),e("li",null,[e("label",Ue,[Ye,e("span",Ee,n(t.$t("days.wed")),1)])]),e("li",null,[e("label",Ke,[ze,e("span",Je,n(t.$t("days.thu")),1)])]),e("li",null,[e("label",qe,[He,e("span",Qe,n(t.$t("days.fri")),1)])]),e("li",null,[e("label",Xe,[Ze,e("span",xe,n(t.$t("days.sat")),1)])]),$e])])):h("v-if",!0),e("li",et,[e("div",tt,[e("label",null,n(t.$t("filterCard.runtime")),1)]),f(_,{onRangeValue:r.getRangeValue},null,8,["onRangeValue"])]),e("li",st,[e("div",it,[e("label",null,n(t.$t("filterCard.watch")),1)]),e("ul",at,[(l(!0),o(d,null,u(s.ottList,(a,g)=>(l(),o("li",{key:g},[e("label",rt,[e("img",{src:a.ott_logo_path,alt:""},null,8,lt),v(e("input",{type:"checkbox",value:a.ott_service_provider_id,"onUpdate:modelValue":i[10]||(i[10]=p=>s.watch=p)},null,8,ot),[[j,s.watch]]),nt])]))),128))])]),e("li",ct,[e("div",dt,[e("label",null,n(t.$t("filterCard.releaseDate")),1)]),e("div",_t,[e("div",ht,[f(L,{onDate:r.getRealeaseDateFrom,input_date:r.dateformat(s.release_date_from,""),page:"filterCard",max_date:s.release_date_to?r.dateformat(s.release_date_to,""):"",datePlaceholder:s.datePlaceholder},null,8,["onDate","input_date","max_date","datePlaceholder"])]),ut,e("div",gt,[f(L,{onDate:r.getRealeaseDateTo,input_date:r.dateformat(s.release_date_to,""),page:"filterCard",min_date:s.release_date_from?r.dateformat(s.release_date_from,""):"",datePlaceholder:s.datePlaceholder},null,8,["onDate","input_date","min_date","datePlaceholder"])])])])])])],2)])}const It=T(K,[["render",mt],["__file","D:/11-db-frontend/11_db/src/components/FilterCard.vue"]]),ft={name:"PopularCard",props:{RedirectLink:String,popular:Object},methods:{convertFloat:U,dateformat:D}},pt={class:"list-img"},yt=["src","alt"],Ct={key:1,src:Y,alt:""},bt={class:"pop-count"},wt={class:"startxt"},vt={class:"md-star"},kt={key:0,src:B,alt:"star"},Lt={key:1,src:k,alt:"star"},St=e("img",{src:E,alt:"star"},null,-1),Dt={class:"news-date"},Tt={key:0};function Bt(t,i,c,b,s,r){var m;return l(),o("a",{onClick:i[0]||(i[0]=_=>t.$router.push(c.RedirectLink)),class:"list-content",href:"javascript:void(0)"},[e("div",pt,[(m=c.popular.image)!=null&&m.includes("https")?(l(),o("img",{key:0,src:c.popular.image,alt:c.popular.image},null,8,yt)):(l(),o("img",Ct))]),e("div",bt,[e("span",null,[e("h3",null,n(c.popular.title),1),e("div",wt,[e("div",vt,[c.popular.rating>0?(l(),o(d,{key:0},[h(" integer "),r.convertFloat(c.popular.rating/2)==!1?(l(),o(d,{key:0},u(5,_=>(l(),o(d,{key:_},[c.popular.rating>=_*2?(l(),o("img",kt)):(l(),o("img",Lt))],64))),64)):(l(),o(d,{key:1},[h(" integer "),h(" float "),(l(!0),o(d,null,u(parseInt(c.popular.rating/2),_=>(l(),o("img",{key:_,src:B,alt:"star"}))),128)),St,(l(!0),o(d,null,u(4-parseInt(c.popular.rating/2),_=>(l(),o("img",{src:k,alt:"star",key:_}))),128))],64)),h(" float ")],64)):(l(),o(d,{key:1},u(5,_=>e("img",{src:k,alt:"star",key:_})),64))]),e("span",null,n(c.popular.rating?c.popular.rating:"0.0"),1)])])]),e("div",Dt,[e("p",null,[C(n(r.dateformat(c.popular.release_date))+" ",1),c.popular.episodes?(l(),o("span",Tt,"67 episodes")):h("v-if",!0)])])])}const Wt=T(ft,[["render",Bt],["__file","D:/11-db-frontend/11_db/src/components/PopularCard.vue"]]);export{It as F,Wt as P};

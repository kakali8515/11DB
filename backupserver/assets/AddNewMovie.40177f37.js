import{A}from"./AddNewMovieService.191e4888.js";import{_ as R,r as S,o as a,c as n,a as e,t as l,b as c,p as v,w as V,v as F,n as _,F as h,s as u,W as b,l as L,B as P}from"./index.ace3f588.js";import{_ as O}from"./sml-no-img.8ebd6267.js";import{_ as k}from"./checkbox-unchecked.ede38fc3.js";import{_ as p}from"./checkbox-checked.c6ca7d68.js";const U={name:"AddNewMovie",components:{},emits:["on-current-theme-change"],inject:["common"],data(){return{searchTitleList:"",searchTitleListItem:[],search_type:"",title_type:"movie",search_text:"",sort_by:"newest",page:1,limit:20,chunkPage:{chunk:5},isSearch:!1,internal_data:[],tmdb_data:[],kobis_data:[],no_internal_movie:!1,isTmdbData:!1,no_tmdb_movie:!1,isKobisData:!1,no_Kobis_movie:!1,total_internal_data:0,total_tmdb_data:0,total_kobis_data:0,isInterRadioButton:!1,isTmdbRadioButton:!1,isKobisRadioButton:!1,movieId:""}},created(){this.AddNewMovieService=new A},watch:{"common.state.SelectedLang":function(t,o){t&&t!=o&&this.searchTitleDropdown()}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.searchTitleDropdown()},methods:{searchTitleDropdown(){this.searchTitleListItem=[],this.AddNewMovieService.getTitleSearchList(this.title_type).then(t=>{t.status==200&&(this.searchTitleList=t.data.search_by_list,Object.entries(this.searchTitleList).forEach(([o,g])=>{this.searchTitleListItem.push({serchvalue:`${o}`,searchtitle:`${g}`})}),this.search_type=Object.keys(this.searchTitleList)[0])}).catch(t=>{})},getDropdownValue(t){this.search_type=t},getMovie(t){this.sort_by=t,this.searchMovie()},getsearchMovie(){this.isSearch=!0,this.isTmdbData=!1,this.isKobisData=!1,this.page=1,this.searchMovie()},directSearch(t){(t.keyCode||t.which)==13&&(this.isSearch=!0,this.isTmdbData=!1,this.isKobisData=!1,this.page=1,this.searchMovie())},searchMovie(){this.search_text!=""&&this.AddNewMovieService.searchMovieTitle(this.title_type,this.search_type,this.search_text,this.sort_by,this.page,this.limit).then(t=>{t.status==200&&(this.internal_data=t.data.internal_data,this.tmdb_data=t.data.tmdb_data,this.kobis_data=t.data.kobis_data,this.total_internal_data=t.data.internal_data.total_records,this.total_tmdb_data=t.data.tmdb_data.total_records,this.total_kobis_data=t.data.kobis_data.total_records,this.internal_data.results.length==0&&(this.no_internal_movie=!0),(!this.tmdb_data.results||!this.tmdb_data||this.tmdb_data.results.length==0)&&(this.no_tmdb_movie=!0),(!this.kobis_data.results||!this.kobis_data||this.kobis_data.results.length==0)&&(this.no_Kobis_movie=!0))}).catch(t=>{})},internalCheckbox(t){t.target.checked?this.no_internal_movie=!0:this.no_internal_movie=!1;let o=document.querySelector("input[type=radio][name=each-radio-movie]:checked");o&&(o.checked=!1),this.isInterRadioButton=!1},internalDataNext(){this.isInterRadioButton?(this.$router.push("/AddNewMovieForm/"+this.movieId+"/internal"),localStorage.setItem("movieBackPage","/AddNewMovie")):(this.isTmdbData=!0,this.page=1,this.searchMovie())},clickInternalPage(t){this.page=t,this.searchMovie()},checkInternalRadioButton(t){this.isInterRadioButton=!0,this.no_internal_movie=!0,this.$refs.internalCheckbox.checked=!1,this.movieId=t},tmdbCheckbox(t){t.target.checked?this.no_tmdb_movie=!0:this.no_tmdb_movie=!1;let o=document.querySelector("input[type=radio][name=each-radio-movie]:checked");o&&(o.checked=!1),this.isTmdbRadioButton=!1},tmdbDataNext(){this.isTmdbRadioButton?(this.$router.push("/AddNewMovieForm/"+this.movieId+"/tmdb"),localStorage.setItem("movieBackPage","/AddNewMovie")):(this.isKobisData=!0,this.page=1,this.searchMovie())},clickTmdbPage(t){this.page=t,this.searchMovie()},checkTmdbRadioButton(t){this.isTmdbRadioButton=!0,this.no_tmdb_movie=!0,this.$refs.tmdbCheckbox.checked=!1,this.movieId=t},KobisCheckbox(t){t.target.checked?this.no_Kobis_movie=!0:this.no_Kobis_movie=!1;let o=document.querySelector("input[type=radio][name=each-radio-movie]:checked");o&&(o.checked=!1),this.isKobisRadioButton=!1},kobisDataNext(){this.isKobisRadioButton?(this.$router.push("/AddNewMovieForm/"+this.movieId+"/kobis"),localStorage.setItem("movieBackPage","/AddNewMovie")):(this.$router.push("/AddNewMovieForm/"+0+"/new"),localStorage.setItem("movieBackPage","/AddNewMovie"))},clickKobisPage(t){this.page=t,this.searchMovie()},checkKobisRadioButton(t){this.isKobisRadioButton=!0,this.no_Kobis_movie=!0,this.$refs.kobisCheckbox.checked=!1,this.movieId=t}}},j={class:"add-new-movie new-movie-add-sec"},q={class:"new-container"},E=["innerHTML"],z={class:"search-section"},H={class:"serch-title"},W={class:"search-form"},G={class:"select-option"},J={class:"search-field"},Q=["placeholder"],X=["disabled"],Y={class:"filter-section"},Z={class:"select-option"},$={class:"movie-list-section"},ee={class:"data-title"},te={key:0,class:"movie-list-wrapper"},se={class:"movie-radio-list"},ie=["for"],oe={class:"check-circle"},ae=["onClick","id"],le=e("div",{class:"radio-circle"},[e("div",{class:"inner-circle"})],-1),ne={class:"movie-content"},de={class:"movie-image"},ce=["src"],re={key:1,src:O,alt:""},he={class:"movie-details"},_e={class:"title-date"},me={class:"title"},ve={class:"date"},ue={class:"summary"},be={class:"no-data-text"},ke={key:0,class:"checkbox-section"},pe={for:"new-movie-check"},ge=e("div",{class:"checkbox"},[e("img",{src:k,alt:"",class:"unchecked-icon"}),e("img",{src:p,alt:"",class:"checked-icon"})],-1),fe={class:"check-text"},ye={class:"button-section"},we=["disabled"],Me={class:"movie-list-section"},Ne={class:"data-title"},De={key:0,class:"movie-list-wrapper"},Te={class:"movie-radio-list"},Ie=["for"],xe={class:"check-circle"},Be=["id","onClick"],Ce=e("div",{class:"radio-circle"},[e("div",{class:"inner-circle"})],-1),Ke={class:"movie-content"},Se={class:"movie-image"},Le=["src"],Pe={key:1,src:P,alt:""},Ae={class:"movie-details"},Re={class:"title-date"},Ve={class:"title"},Fe={class:"date"},Oe={class:"summary"},Ue={class:"no-data-text"},je={key:0,class:"checkbox-section"},qe={for:"new-movie-check"},Ee=e("div",{class:"checkbox"},[e("img",{src:k,alt:"",class:"unchecked-icon"}),e("img",{src:p,alt:"",class:"checked-icon"})],-1),ze={class:"check-text"},He={class:"button-section"},We=["disabled"],Ge={class:"movie-list-section"},Je={class:"data-title"},Qe={key:0,class:"movie-list-wrapper"},Xe={class:"movie-radio-list"},Ye=["for"],Ze={class:"check-circle"},$e=["id","onClick"],et=e("div",{class:"radio-circle"},[e("div",{class:"inner-circle"})],-1),tt={class:"movie-content"},st={class:"movie-image"},it=["src"],ot={key:1,src:P,alt:""},at={class:"movie-details"},lt={class:"title-date"},nt={class:"title"},dt={class:"date"},ct={class:"summary"},rt={class:"no-data-text"},ht={key:0,class:"checkbox-section"},_t={for:"new-movie-check"},mt=e("div",{class:"checkbox"},[e("img",{src:k,alt:"",class:"unchecked-icon"}),e("img",{src:p,alt:"",class:"checked-icon"})],-1),vt={class:"check-text"},ut={class:"button-section"},bt=["disabled"];function kt(t,o,g,pt,s,d){var y,w,M,N,D,T,I,x,B,C;const f=S("Dropdown"),m=S("pagination");return a(),n("div",j,[e("div",q,[e("h1",{class:"heading",innerHTML:t.$t("addNewMoviesForm.addNewMovie")},null,8,E),e("div",z,[e("h6",H,l(t.$t("button.search")),1),c(` <p class="search-subtitle">\r
          Make Sure That the Movie you want to register is already registered.\r
          In addition, data can be easily imported into searched exernal data.\r
        </p> `),e("div",W,[e("div",G,[c(` <select class="select-style" v-model="search_type">\r
              <option\r
                v-for="(value, name, index) in searchTitleList"\r
                :key="index"\r
                :value="name"\r
              >\r
                {{ value }}\r
              </option>\r
            </select> `),v(f,{onDropdownValue:d.getDropdownValue,search_type:s.search_type,searchTitleListItem:s.searchTitleListItem,searchtitle:"searchtitle",searchvalue:"serchvalue"},null,8,["onDropdownValue","search_type","searchTitleListItem"])]),e("div",J,[V(e("input",{type:"text",placeholder:t.$t("addNewMovies.shareWhatsNew"),class:"form-control","onUpdate:modelValue":o[0]||(o[0]=i=>s.search_text=i),onKeydown:o[1]||(o[1]=i=>d.directSearch(i))},null,40,Q),[[F,s.search_text]])]),e("button",{class:_(["search-btn",s.search_text==""?"isDisabled":""]),onClick:o[2]||(o[2]=(...i)=>d.getsearchMovie&&d.getsearchMovie(...i)),disabled:s.search_text==""},l(t.$t("button.search")),11,X)])]),e("div",Y,[e("div",Z,[c(` <select class="select-style" v-model="sort_by" @change="getMovie">\r
            <option value="newest">{{ $t("addNewMovies.latest") }}</option>\r
            <option value="oldest">{{ $t("addNewMovies.oldest") }}</option>\r
          </select> `),v(f,{onDropdownValue:d.getMovie,search_type:s.sort_by,searchTitleListItem:[{name:t.$t("addNewMovies.latest"),value:"newest"},{name:t.$t("addNewMovies.oldest"),value:"oldest"}],searchtitle:"name",searchvalue:"value"},null,8,["onDropdownValue","search_type","searchTitleListItem"])])]),c(" for internal data "),s.isSearch&&s.isTmdbData==!1?(a(),n(h,{key:0},[e("div",$,[e("h1",ee,l(t.$t("addNewMovies.internalDataExist")),1),s.internal_data.results?(a(),n("div",te,[e("ul",se,[(a(!0),n(h,null,u(s.internal_data.results,(i,r)=>(a(),n("li",{class:"movie-radio-item",key:r},[e("label",{for:"radio-movie-1"+r},[e("div",oe,[e("input",{onClick:K=>d.checkInternalRadioButton(i.id),type:"radio",name:"each-radio-movie",id:"radio-movie-1"+r,ref_for:!0,ref:"addInternalMovieOption"},null,8,ae),le]),e("div",ne,[e("div",de,[i.poster_image?(a(),n("img",{key:0,src:i.poster_image,alt:""},null,8,ce)):(a(),n("img",re))]),e("div",he,[e("div",_e,[e("h3",me,l(i.title),1),e("span",ve,l(i.year),1)]),e("p",ue,l(i.overview),1)])])],8,ie)]))),128))])])):c("v-if",!0),v(m,{modelValue:s.page,"onUpdate:modelValue":o[3]||(o[3]=i=>s.page=i),records:s.total_internal_data,"per-page":s.limit,options:s.chunkPage,onPaginate:d.clickInternalPage},null,8,["modelValue","records","per-page","options","onPaginate"]),e("div",{class:"no-data-block",style:b(((y=s.internal_data.results)==null?void 0:y.length)==0?"":"display: none")},[e("p",be,l(t.$t("addNewMovies.noData")),1)],4)]),((w=s.internal_data.results)==null?void 0:w.length)>0?(a(),n("div",ke,[e("label",pe,[e("input",{type:"checkbox",onClick:o[4]||(o[4]=i=>d.internalCheckbox(i)),id:"new-movie-check",ref:"internalCheckbox"},null,512),ge,e("p",fe,l(t.$t("addNewMovies.theMovieIsNotOnTheList")),1)])])):c("v-if",!0),e("div",ye,[e("button",{disabled:s.no_internal_movie==!1,class:_([s.no_internal_movie==!1?"isDisabled":"","orange-pill-button"]),onClick:o[5]||(o[5]=(...i)=>d.internalDataNext&&d.internalDataNext(...i))},l(t.$t("addNewMovies.next")),11,we)])],64)):c("v-if",!0),c(" for tmdb data "),s.isTmdbData&&s.isKobisData==!1?(a(),n(h,{key:1},[e("div",Me,[e("h1",Ne,l(t.$t("addNewMovies.externalDataTMDB")),1),((M=s.tmdb_data.results)==null?void 0:M.length)>0?(a(),n("div",De,[e("ul",Te,[(a(!0),n(h,null,u(s.tmdb_data.results,(i,r)=>(a(),n("li",{class:"movie-radio-item",key:r},[e("label",{for:"radio-movie-1"+r},[e("div",xe,[e("input",{type:"radio",name:"each-radio-movie",id:"radio-movie-1"+r,onClick:K=>d.checkTmdbRadioButton(i.tmdb_id)},null,8,Be),Ce]),e("div",Ke,[e("div",Se,[i.poster_image?(a(),n("img",{key:0,src:i.poster_image,alt:""},null,8,Le)):(a(),n("img",Pe))]),e("div",Ae,[e("div",Re,[e("h3",Ve,l(i.title),1),e("span",Fe,l(i.year),1)]),e("p",Oe,l(i.overview),1)])])],8,Ie)]))),128))])])):c("v-if",!0),((N=s.tmdb_data.results)==null?void 0:N.length)>0?(a(),L(m,{key:1,modelValue:s.page,"onUpdate:modelValue":o[6]||(o[6]=i=>s.page=i),records:s.total_tmdb_data,"per-page":s.limit,options:s.chunkPage,onPaginate:d.clickTmdbPage},null,8,["modelValue","records","per-page","options","onPaginate"])):c("v-if",!0),e("div",{class:"no-data-block",style:b(!s.tmdb_data.results||!s.tmdb_data||((D=s.tmdb_data.results)==null?void 0:D.length)==0?"":"display: none")},[e("p",Ue,l(t.$t("addNewMovies.noData")),1)],4)]),((T=s.tmdb_data.results)==null?void 0:T.length)>0?(a(),n("div",je,[e("label",qe,[e("input",{type:"checkbox",onClick:o[7]||(o[7]=i=>d.tmdbCheckbox(i)),id:"new-movie-check",ref:"tmdbCheckbox"},null,512),Ee,e("p",ze,l(t.$t("addNewMovies.theMovieIsNotOnTheList")),1)])])):c("v-if",!0),e("div",He,[e("button",{disabled:s.no_tmdb_movie==!1,class:_([s.no_tmdb_movie==!1?"isDisabled":"","orange-pill-button"]),onClick:o[8]||(o[8]=(...i)=>d.tmdbDataNext&&d.tmdbDataNext(...i))},l(t.$t("addNewMovies.next")),11,We)])],64)):c("v-if",!0),c(" for kobis data "),s.isKobisData?(a(),n(h,{key:2},[e("div",Ge,[e("h1",Je,l(t.$t("addNewMovies.externalDataKOBIS")),1),((I=s.kobis_data.results)==null?void 0:I.length)>0?(a(),n("div",Qe,[e("ul",Xe,[(a(!0),n(h,null,u(s.kobis_data.results,(i,r)=>(a(),n("li",{class:"movie-radio-item",key:r},[e("label",{for:"radio-movie-1"+r},[e("div",Ze,[e("input",{type:"radio",name:"each-radio-movie",id:"radio-movie-1"+r,onClick:K=>d.checkKobisRadioButton(i.kobis_id)},null,8,$e),et]),e("div",tt,[e("div",st,[i.poster_image?(a(),n("img",{key:0,src:i.poster_image,alt:""},null,8,it)):(a(),n("img",ot))]),e("div",at,[e("div",lt,[e("h3",nt,l(i.title),1),e("span",dt,l(i.year),1)]),e("p",ct,l(i.overview),1)])])],8,Ye)]))),128))])])):c("v-if",!0),((x=s.kobis_data.results)==null?void 0:x.length)>0?(a(),L(m,{key:1,modelValue:s.page,"onUpdate:modelValue":o[9]||(o[9]=i=>s.page=i),records:s.total_kobis_data,"per-page":s.limit,options:s.chunkPage,onPaginate:d.clickKobisPage},null,8,["modelValue","records","per-page","options","onPaginate"])):c("v-if",!0),e("div",{class:"no-data-block",style:b(!s.kobis_data.results||!s.kobis_data||((B=s.kobis_data.results)==null?void 0:B.length)==0?"":"display: none")},[e("p",rt,l(t.$t("addNewMovies.noData")),1)],4)]),((C=s.kobis_data.results)==null?void 0:C.length)>0?(a(),n("div",ht,[e("label",_t,[e("input",{type:"checkbox",onClick:o[10]||(o[10]=i=>d.KobisCheckbox(i)),id:"new-movie-check",ref:"kobisCheckbox"},null,512),mt,e("p",vt,l(t.$t("addNewMovies.theMovieIsNotOnTheList")),1)])])):c("v-if",!0),e("div",ut,[e("button",{disabled:s.no_Kobis_movie==!1,class:_([s.no_Kobis_movie==!1?"isDisabled":"","orange-pill-button"]),onClick:o[11]||(o[11]=(...i)=>d.kobisDataNext&&d.kobisDataNext(...i))},l(t.$t("addNewMovies.next")),11,bt)])],64)):c("v-if",!0)])])}const Nt=R(U,[["render",kt],["__file","D:/workspace/11-db-frontend/11_db/src/views/AddNewMovie/AddNewMovie.vue"]]);export{Nt as default};

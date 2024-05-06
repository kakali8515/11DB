import{A as B}from"./AddNewMovieService.ec155d7b.js";import{_ as C,r as T,o,c as l,a as e,t as n,p as _,w as L,v as R,n as v,b as c,F as h,s as D,W as x,l as V,B as N}from"./index.3434c1c6.js";import{_ as M}from"./checkbox-unchecked.ede38fc3.js";import{_ as I}from"./checkbox-checked.c6ca7d68.js";const P={name:"AddNewMovie",emits:["on-current-theme-change"],inject:["common"],components:{},data(){return{searchTitleList:"",search_type:"",title_type:"tv",search_text:"",sort_by:"newest",page:1,limit:20,chunkPage:{chunk:5},isSearch:!1,internal_data:[],tmdb_data:[],kobis_data:[],no_internal_movie:!1,isTmdbData:!1,no_tmdb_movie:!1,no_Kobis_movie:!1,total_internal_data:0,total_tmdb_data:0,total_kobis_data:0,isInterRadioButton:!1,isTmdbRadioButton:!1,isKobisRadioButton:!1,tvId:"",searchResultHeading:this.$t("addNewMovies.internalDataExist"),searchTitleListItem:[]}},created(){this.AddNewMovieService=new B},watch:{"common.state.SelectedLang":function(t,a){t&&t!=a&&this.searchTitleDropdown()}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.searchTitleDropdown()},methods:{searchTitleDropdown(){this.searchTitleListItem=[],this.AddNewMovieService.getTitleSearchList(this.title_type).then(t=>{t.status==200&&(this.searchTitleList=t.data.search_by_list,this.search_type=Object.keys(this.searchTitleList)[0],Object.entries(this.searchTitleList).forEach(([a,m])=>{this.searchTitleListItem.push({serchvalue:`${a}`,searchtitle:`${m}`})}))}).catch(t=>{})},getDropdownValue(t){this.search_type=t},getMovie(t){this.sort_by=t,this.searchMovie()},getsearchMovie(){this.isSearch=!0,this.isTmdbData=!1,this.page=1,this.searchMovie()},directSearch(t){(t.keyCode||t.which)==13&&(this.isSearch=!0,this.isTmdbData=!1,this.page=1,this.searchMovie())},searchMovie(){this.search_text!=""&&this.AddNewMovieService.searchMovieTitle(this.title_type,this.search_type,this.search_text,this.sort_by,this.page,this.limit).then(t=>{t.status==200&&(this.search_type=="tiving_id"?this.searchResultHeading=this.$t("addNewMovies.internalDataTiving"):this.searchResultHeading=this.$t("addNewMovies.internalDataExist"),this.internal_data=t.data.internal_data,this.tmdb_data=t.data.tmdb_data,this.total_internal_data=t.data.internal_data.total_records,this.total_tmdb_data=t.data.tmdb_data.total_records,this.internal_data.results.length==0&&(this.no_internal_movie=!0),(!this.tmdb_data.results||!this.tmdb_data||this.tmdb_data.results.length==0)&&(this.no_tmdb_movie=!0))}).catch(t=>{})},internalCheckbox(t){t.target.checked?this.no_internal_movie=!0:this.no_internal_movie=!1;let a=document.querySelector("input[type=radio][name=each-radio-movie]:checked");a&&(a.checked=!1),this.isInterRadioButton=!1},internalDataNext(){this.isInterRadioButton?(this.$router.push("/add-tv-details/"+this.tvId+"/internal"),localStorage.setItem("tvBackPage","/add-new-tv")):(this.isTmdbData=!0,this.page=1,this.searchMovie())},clickInternalPage(t){this.page=t,this.searchMovie()},checkInternalRadioButton(t){this.isInterRadioButton=!0,this.no_internal_movie=!0,this.$refs.internalCheckbox.checked=!1,this.tvId=t},tmdbCheckbox(t){t.target.checked?this.no_tmdb_movie=!0:this.no_tmdb_movie=!1;let a=document.querySelector("input[type=radio][name=each-radio-movie]:checked");a&&(a.checked=!1),this.isTmdbRadioButton=!1},tmdbDataNext(){this.isTmdbRadioButton?(this.$router.push("/add-tv-details/"+this.tvId+"/tmdb"),localStorage.setItem("tvBackPage","/add-new-tv")):(this.$router.push("/add-tv-details/"+0+"/new"),localStorage.setItem("tvBackPage","/add-new-tv"))},clickTmdbPage(t){this.page=t,this.searchMovie()},checkTmdbRadioButton(t){this.isTmdbRadioButton=!0,this.no_tmdb_movie=!0,this.$refs.tmdbCheckbox.checked=!1,this.tvId=t}}},K={class:"add-new-movie"},A={class:"new-container"},H=["innerHTML"],O={class:"search-section"},E={class:"serch-title"},j={class:"search-form"},U={class:"select-option"},q={class:"search-field"},z=["placeholder"],F=["disabled"],W={class:"filter-section"},G={class:"select-option"},J={class:"movie-list-section"},Q={class:"data-title"},X={key:0,class:"movie-list-wrapper"},Y={class:"movie-radio-list"},Z=["for"],$={class:"check-circle"},ee=["onClick","id"],te=e("div",{class:"radio-circle"},[e("div",{class:"inner-circle"})],-1),se={class:"movie-content"},ie={class:"movie-image"},ae=["src"],oe={key:1,src:N,alt:""},ne={class:"movie-details"},re={class:"title-date"},le={class:"title"},ce={class:"date"},de={class:"summary"},he={class:"no-data-text"},_e={key:0,class:"checkbox-section"},ve={for:"new-movie-check"},me=e("div",{class:"checkbox"},[e("img",{src:M,alt:"",class:"unchecked-icon"}),e("img",{src:I,alt:"",class:"checked-icon"})],-1),ue={class:"check-text"},be={class:"button-section"},pe=["disabled"],ke={class:"movie-list-section"},ge={class:"data-title"},fe={key:0,class:"movie-list-wrapper"},we={class:"movie-radio-list"},ye=["for"],Te={class:"check-circle"},De=["id","onClick"],xe=e("div",{class:"radio-circle"},[e("div",{class:"inner-circle"})],-1),Ne={class:"movie-content"},Me={class:"movie-image"},Ie=["src"],Se={key:1,src:N,alt:""},Be={class:"movie-details"},Ce={class:"title-date"},Le={class:"title"},Re={class:"date"},Ve={class:"summary"},Pe={class:"no-data-text"},Ke={key:0,class:"checkbox-section"},Ae={for:"new-movie-check"},He=e("div",{class:"checkbox"},[e("img",{src:M,alt:"",class:"unchecked-icon"}),e("img",{src:I,alt:"",class:"checked-icon"})],-1),Oe={class:"check-text"},Ee={class:"button-section"},je=["disabled"];function Ue(t,a,m,qe,s,r){var p,k,g,f,w,y;const u=T("Dropdown"),b=T("pagination");return o(),l("div",K,[e("div",A,[e("h1",{class:"heading",innerHTML:t.$t("header.addSection.addNewTvShows")},null,8,H),e("div",O,[e("h6",E,n(t.$t("button.search")),1),e("div",j,[e("div",U,[_(u,{onDropdownValue:r.getDropdownValue,search_type:s.search_type,searchTitleListItem:s.searchTitleListItem,searchtitle:"searchtitle",searchvalue:"serchvalue"},null,8,["onDropdownValue","search_type","searchTitleListItem"])]),e("div",q,[L(e("input",{type:"text",placeholder:t.$t("addNewMovies.shareWhatsNew"),class:"form-control","onUpdate:modelValue":a[0]||(a[0]=i=>s.search_text=i),onKeydown:a[1]||(a[1]=i=>r.directSearch(i))},null,40,z),[[R,s.search_text]])]),e("button",{class:v(["search-btn",s.search_text==""?"isDisabled":""]),onClick:a[2]||(a[2]=(...i)=>r.getsearchMovie&&r.getsearchMovie(...i)),disabled:s.search_text==""},n(t.$t("button.search")),11,F)])]),e("div",W,[e("div",G,[_(u,{onDropdownValue:r.getMovie,search_type:s.sort_by,searchTitleListItem:[{name:t.$t("addNewMovies.latest"),value:"newest"},{name:t.$t("addNewMovies.oldest"),value:"oldest"}],searchtitle:"name",searchvalue:"value"},null,8,["onDropdownValue","search_type","searchTitleListItem"])])]),c(" for internal data "),s.isSearch&&s.isTmdbData==!1?(o(),l(h,{key:0},[e("div",J,[e("h1",Q,n(s.searchResultHeading),1),s.internal_data.results?(o(),l("div",X,[e("ul",Y,[(o(!0),l(h,null,D(s.internal_data.results,(i,d)=>(o(),l("li",{class:"movie-radio-item",key:d},[e("label",{for:"radio-movie-1"+d},[e("div",$,[e("input",{onClick:S=>r.checkInternalRadioButton(i.id),type:"radio",name:"each-radio-movie",id:"radio-movie-1"+d,ref_for:!0,ref:"addInternalMovieOption"},null,8,ee),te]),e("div",se,[e("div",ie,[i.poster_image.includes("https")?(o(),l("img",{key:0,src:i.poster_image,alt:""},null,8,ae)):(o(),l("img",oe))]),e("div",ne,[e("div",re,[e("h3",le,n(i.title),1),e("span",ce,n(i.year),1)]),e("p",de,n(i.overview),1)])])],8,Z)]))),128))])])):c("v-if",!0),_(b,{modelValue:s.page,"onUpdate:modelValue":a[3]||(a[3]=i=>s.page=i),records:s.total_internal_data,"per-page":s.limit,options:s.chunkPage,onPaginate:r.clickInternalPage},null,8,["modelValue","records","per-page","options","onPaginate"]),e("div",{class:"no-data-block",style:x(((p=s.internal_data.results)==null?void 0:p.length)==0?"":"display: none")},[e("p",he,n(t.$t("dictionary.noData")),1)],4)]),((k=s.internal_data.results)==null?void 0:k.length)>0?(o(),l("div",_e,[e("label",ve,[e("input",{type:"checkbox",onClick:a[4]||(a[4]=i=>r.internalCheckbox(i)),id:"new-movie-check",ref:"internalCheckbox"},null,512),me,e("p",ue,n(t.$t("addNewTv.theTvShowIsNotOnTheList")),1)])])):c("v-if",!0),e("div",be,[e("button",{disabled:s.no_internal_movie==!1,class:v([s.no_internal_movie==!1?"isDisabled":"","orange-pill-button"]),onClick:a[5]||(a[5]=(...i)=>r.internalDataNext&&r.internalDataNext(...i))},n(t.$t("addNewMovies.next")),11,pe)])],64)):c("v-if",!0),c(" for tmdb data "),s.isTmdbData?(o(),l(h,{key:1},[e("div",ke,[e("h1",ge,n(t.$t("addNewMovies.externalDataTMDB")),1),((g=s.tmdb_data.results)==null?void 0:g.length)>0?(o(),l("div",fe,[e("ul",we,[(o(!0),l(h,null,D(s.tmdb_data.results,(i,d)=>(o(),l("li",{class:"movie-radio-item",key:d},[e("label",{for:"radio-movie-1"+d},[e("div",Te,[e("input",{type:"radio",name:"each-radio-movie",id:"radio-movie-1"+d,onClick:S=>r.checkTmdbRadioButton(i.tmdb_id)},null,8,De),xe]),e("div",Ne,[e("div",Me,[i.poster_image?(o(),l("img",{key:0,src:i.poster_image,alt:""},null,8,Ie)):(o(),l("img",Se))]),e("div",Be,[e("div",Ce,[e("h3",Le,n(i.title),1),e("span",Re,n(i.year),1)]),e("p",Ve,n(i.overview),1)])])],8,ye)]))),128))])])):c("v-if",!0),((f=s.tmdb_data.results)==null?void 0:f.length)>0?(o(),V(b,{key:1,modelValue:s.page,"onUpdate:modelValue":a[6]||(a[6]=i=>s.page=i),records:s.total_tmdb_data,"per-page":s.limit,options:s.chunkPage,onPaginate:r.clickTmdbPage},null,8,["modelValue","records","per-page","options","onPaginate"])):c("v-if",!0),e("div",{class:"no-data-block",style:x(!s.tmdb_data.results||!s.tmdb_data||((w=s.tmdb_data.results)==null?void 0:w.length)==0?"":"display: none")},[e("p",Pe,n(t.$t("addNewPeople.noData")),1)],4)]),((y=s.tmdb_data.results)==null?void 0:y.length)>0?(o(),l("div",Ke,[e("label",Ae,[e("input",{type:"checkbox",onClick:a[7]||(a[7]=i=>r.tmdbCheckbox(i)),id:"new-movie-check",ref:"tmdbCheckbox"},null,512),He,e("p",Oe,n(t.$t("addNewTv.theTvShowIsNotOnTheList")),1)])])):c("v-if",!0),e("div",Ee,[e("button",{disabled:s.no_tmdb_movie==!1,class:v([s.no_tmdb_movie==!1?"isDisabled":"","orange-pill-button"]),onClick:a[8]||(a[8]=(...i)=>r.tmdbDataNext&&r.tmdbDataNext(...i))},n(t.$t("addNewMovies.next")),11,je)])],64)):c("v-if",!0),c(" for kobis data "),c(` <template v-if="isKobisData">\r
        <div class="movie-list-section">\r
          <h1 class="data-title">External Data(KOBIS)</h1>\r
          <div class="movie-list-wrapper" v-if="kobis_data.results?.length > 0">\r
            <ul class="movie-radio-list">\r
              <li\r
                class="movie-radio-item"\r
                v-for="(item, index) in kobis_data.results"\r
                :key="index"\r
              >\r
                <label :for="'radio-movie-1' + index">\r
                  <div class="check-circle">\r
                    <input\r
                      type="radio"\r
                      name="each-radio-movie"\r
                      :id="'radio-movie-1' + index"\r
                      @click="checkKobisRadioButton(item.kobis_id)"\r
                    />\r
                    <div class="radio-circle">\r
                      <div class="inner-circle"></div>\r
                    </div>\r
                  </div>\r
                  <div class="movie-content">\r
                    <div class="movie-image">\r
                      <img\r
                        v-if="item.poster_image"\r
                        :src="item.poster_image"\r
                        alt=""\r
                      />\r
                      <img\r
                        v-else\r
                        src="@/assets/images/no-image-view.png"\r
                        alt=""\r
                      />\r
                    </div>\r
                    <div class="movie-details">\r
                      <div class="title-date">\r
                        <h3 class="title">{{ item.title }}</h3>\r
                        <span class="date">{{ item.year }}</span>\r
                      </div>\r
                      <p class="summary">\r
                        {{ item.overview }}\r
                      </p>\r
                    </div>\r
                  </div>\r
                </label>\r
              </li>\r
            </ul>\r
          </div>\r
          <template v-if="kobis_data.results?.length > 0">\r
          <pagination\r
            v-model="page"\r
            :records="total_kobis_data"\r
            :per-page="limit"\r
            :options="chunkPage"\r
            @paginate="clickKobisPage"\r
          />\r
        </template>\r
          <div\r
            class="no-data-block"\r
            :style="!kobis_data.results || !kobis_data || kobis_data.results?.length==0 ? '' : 'display: none'"\r
          >\r
            <p class="no-data-text">No Data</p>\r
          </div>\r
        </div>\r
        <div class="checkbox-section" v-if="kobis_data.results?.length > 0">\r
          <label for="new-movie-check">\r
            <input\r
              type="checkbox"\r
              @click="KobisCheckbox($event)"\r
              id="new-movie-check"\r
              ref="kobisCheckbox"\r
            />\r
            <div class="checkbox">\r
              <img\r
                src="@/assets/icons/checkbox-unchecked.svg"\r
                alt=""\r
                class="unchecked-icon"\r
              />\r
              <img\r
                src="@/assets/icons/checkbox-checked.svg"\r
                alt=""\r
                class="checked-icon"\r
              />\r
            </div>\r
            <p class="check-text">The Movie is not on the list.</p>\r
          </label>\r
        </div>\r
        <div class="button-section">\r
          <button\r
            :disabled="no_Kobis_movie == false"\r
            :class="no_Kobis_movie == false ? 'isDisabled' : ''"\r
            class="orange-pill-button"\r
            @click="kobisDataNext"\r
          >\r
            Next\r
          </button>\r
        </div>\r
      </template> `)])])}const Je=C(P,[["render",Ue],["__file","D:/workspace/11-db-frontend/11_db/src/views/AddNewTV/AddNewTV.vue"]]);export{Je as default};

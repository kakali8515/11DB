import{_ as b,i as T,E as n,N as C,L,O as B,K as N,G as $,J as j,o as l,c as o,a as e,t as c,F as R,s as y,S as E,n as F,b as w,B as I}from"./index.3434c1c6.js";const{t:m}=T.global,z={name:"TagDetail",setup(){const r=n(0),f=C(),_=n(f.params.id),s=n("all"),v=n(1),u=n(10),t=n([]),i=new E,h=L("common"),k=B();N(()=>h.state.SelectedLang,function(a,d){a&&a!=d&&g(_.value,s.value,v.value,u.value)}),$(()=>{g(_.value,s.value,v.value,u.value)});const g=(a,d,D,S)=>{i.getTagDetails(a,d,D,S).then(p=>{p.status==200&&(t.value=p.data.results)}).catch(p=>{})};return{filterTag:(a,d)=>{r.value=d,s.value=a,g(_.value,s.value,v.value,u.value)},tagDetailResult:t,dateformat:j,activeItem:r,tagRedirect:a=>{a.type==="tv"?k.push(`/tvshows/details/${a.id}`):a.type==="movie"&&k.push(`/movies/details/${a.id}`)}}},computed:{tagList(){return[{title:m("bulk.worklist.all"),value:"all"},{title:m("searchResults.searchRight.movies"),value:"movie"},{title:m("searchResults.searchRight.tvShows"),value:"tv"}]}}},G={class:"tag-details"},J={class:"container"},K={class:"tagdetail-content"},M={class:"tab-outr"},O={class:"tabs-header"},V=["onClick"],q={key:0,class:"tags-list"},A=["onClick"],H={href:"javaScript:void(0)"},P={class:"img-wrap"},Q=["src"],U={key:1,src:I,alt:"image"},W={class:"main-dta"},X={class:"complete-status-info"},Y={key:0,class:"complete-status"},Z={class:"complete-date-info"},x={key:0,class:"p-content"},tt={key:1,class:"no-data-wrapper"};function et(r,f,_,s,v,u){return l(),o("section",G,[e("div",J,[e("h2",null,c(r.$route.params.tagname),1),e("div",K,[e("div",M,[e("ul",O,[(l(!0),o(R,null,y(u.tagList,(t,i)=>(l(),o("li",{key:i,onClick:h=>s.filterTag(t.value,i),class:F(i==s.activeItem?"active":"")},c(t.title),11,V))),128))]),s.tagDetailResult.length>0?(l(),o("ul",q,[(l(!0),o(R,null,y(s.tagDetailResult,(t,i)=>(l(),o("li",{key:i,onClick:h=>s.tagRedirect(t)},[e("a",H,[e("div",P,[t.poster_image?(l(),o("img",{key:0,src:t.poster_image,alt:"image"},null,8,Q)):(l(),o("img",U))]),e("div",W,[e("span",null,[e("h4",null,c(t.title),1),e("p",null,c(s.dateformat(t.release_date)),1)]),e("div",X,[t.tag_status?(l(),o("div",Y,c(t.tag_status),1)):w("v-if",!0),e("div",Z,c(t.show_day),1)]),t.overview?(l(),o("div",x,[e("p",null,c(t.overview),1)])):w("v-if",!0)])])],8,A))),128))])):(l(),o("div",tt,[e("p",null,c(r.$t("searchResults.noData")),1)]))])])])])}const ot=b(z,[["render",et],["__file","D:/workspace/11-db-frontend/11_db/src/views/Search/TagDetail.vue"]]);export{ot as default};
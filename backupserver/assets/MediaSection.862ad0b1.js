import{R as V,_ as J,y as Q,z as X,H as F,T as G,r as w,o as l,c as o,p,q as h,a as e,w as q,v as B,n as g,k as m,t as n,a3 as $,F as y,s as f,b as _,l as H,a4 as j,a5 as P}from"./index.d6ed331f.js";import{_ as M}from"./share-icon.536c923b.js";import{_ as S}from"./user-icon-gray.c8f7d18d.js";import{V as ee,I as se}from"./ImageCard.8a960c6d.js";import{P as te}from"./PosterCard.def43187.js";class ie{async getCommunityList(i){return await V.post("/community/community-details",{...i}).then(d=>d).catch(d=>d)}async getFamousLineList(i,d){return await V.post("/community/community-famous-lines",{id:i,type:d}).then(u=>u).catch(u=>u)}async sendMessage(i){return await V.post("/community/community-message-send",i).then(d=>d).catch(d=>d)}async sendReply(i){return await V.post("/community/community-message-reply",i).then(d=>d).catch(d=>d)}async getCommunityLikes(i){return await V.post("/community/community-like",{community_id:i}).then(d=>d).catch(d=>d)}}const R="/assets/user-icon.3e45168d.svg",T="/assets/down-arrow-blue.cb6ee724.svg",I="/assets/up-arrow-blue.7a0d7398.svg",E="/assets/like-icon-red.bc27bfcc.svg",K="/assets/like-icon-blk2.0073964e.svg",N="/assets/like-white.e098aaf6.svg",z="/assets/list-icon3.30fe77f9.svg",W="/assets/chat-icon-blk.59b0700f.svg";const le={name:"CommunityCard",components:{Tabs:Q,TabWrapper:X},props:{type:String,famous_line_type:String,season_id:Number},created(){this.CommunityService=new ie},data(){return{active:!1,active2:!1,active3:!1,routeId:this.$route.params.id,famousLine:[],page:1,limit:10,community_type:"comment",community_list:[],message_text:"",is_message_spoiler:"",message_image:"",message_url:"",message_reply_url:"",reply_text:"",is_reply_spoiler:"",showReply:!1,currentCommunityId:0,number_of_like:0,current_famouse_id:null,currentCommunity:{},imgBaseUrl:"https://elvndb-frnt.dvconsulting.org",newCommunityResult:[],totalRecords:0}},watch:{season_id:function(t,i){t&&t!=i&&(this.community_type="comment",this.community_list=[],this.newCommunityResult=[],this.getCommunityList())}},mounted(){this.getFamousLineList(),this.getCommunityList(),this.getDateformat()},methods:{handleScroll(t){t.srcElement.offsetHeight+t.srcElement.scrollTop>=t.srcElement.scrollHeight&&this.totalRecords>this.newCommunityResult.length&&(this.page=++this.page,setTimeout(()=>{this.getCommunityList()},100))},getDateformat(t,i){if(i=="date")return F.utc(t).format("MMM DD YYYY");if(i=="time")return new Date(t).toLocaleTimeString([],{hour12:!1,hour:"2-digit",minute:"2-digit"})},selectedTab(t){t=="communityCard.trivia"&&(this.community_type="trivia",this.community_list=[],this.newCommunityResult=[],this.getCommunityList()),t=="communityCard.famousLines"&&(this.community_type="famous_line",this.community_list=[],this.newCommunityResult=[],this.getCommunityList()),t=="communityCard.goofs"&&(this.community_type="goofs",this.community_list=[],this.newCommunityResult=[],this.getCommunityList()),t=="communityCard.comments"&&(this.community_type="comment",this.community_list=[],this.newCommunityResult=[],this.getCommunityList()),this.message_image="",this.message_text="",this.is_message_spoiler=""},getCommunityList(){let t={commentable_id:this.routeId,page:this.page,limit:this.limit,community_type:this.community_type,commentable_type:this.type,season_id:this.season_id};this.CommunityService.getCommunityList(t).then(i=>{if(i.status==200){this.community_list=i.data.results,this.totalRecords=i.data.total_records;for(let d=0;d<=this.community_list.length-1;d++){this.community_list[d].is_RevealHideSpoiler=!1;for(let u=0;u<=this.community_list[d].reply.length-1;u++)this.community_list[d].reply[u].is_RevealHideSpoiler=!1,this.community_list[d].reply[u].is_Reply_text=!1;this.currentCommunity&&this.currentCommunity.id==this.community_list[d].id?(this.currentCommunity.is_ReplyShow==!0?this.community_list[d].is_ReplyShow=!0:this.community_list[d].is_ReplyShow=!1,this.community_list[d].is_RevealHideSpoiler=!0):this.community_list[d].is_RevealHideSpoiler=!1}this.community_list.forEach((d,u)=>{if(!this.newCommunityResult.some(r=>r.id===d.id))this.newCommunityResult.unshift(d);else{this.newCommunityResult[u].is_RevealHideSpoiler=!1;for(let r=0;r<=this.community_list[u].reply.length-1;r++)this.newCommunityResult[u].reply=this.community_list[u].reply,this.newCommunityResult[u].reply[r].is_RevealHideSpoiler=!1,this.newCommunityResult[u].reply[r].is_Reply_text=!1;this.currentCommunity&&this.currentCommunity.id==this.newCommunityResult[u].id?(this.currentCommunity.is_ReplyShow==!0?this.newCommunityResult[u].is_ReplyShow=!0:this.newCommunityResult[u].is_ReplyShow=!1,this.newCommunityResult[u].is_RevealHideSpoiler=!0):this.newCommunityResult[u].is_RevealHideSpoiler=!1}})}}).catch(i=>{})},getFamousLineList(){this.CommunityService.getFamousLineList(this.routeId,this.famous_line_type).then(t=>{t.status==200&&(this.famousLine=t.data.results)}).catch(t=>{})},getCurrentFamousId(t){this.current_famouse_id=t},sendMessage(){let t=new FormData;this.message_image&&t.append("image",this.message_image),this.community_type=="famous_line"&&t.append("famouse_id",this.current_famouse_id),t.append("commentable_id",this.routeId),t.append("season_id",this.season_id),t.append("commentable_type",this.type),t.append("tab_type",this.community_type),t.append("message_text",this.message_text),t.append("spoiler",this.is_message_spoiler==!0?"y":"n"),this.CommunityService.sendMessage(t).then(i=>{i.status==200&&(this.getCommunityList(),G.fire({title:this.$t("Error.success")}),this.message_text="",this.message_url="",this.is_message_spoiler="",this.message_image="")}).catch(i=>{})},sendReply(t){this.community_type=="comment"?(this.reply_text=document.querySelector("#reply-text"+t.id).value,this.is_reply_spoiler=document.querySelector("#is_reply_spoiler"+t.id)):this.community_type=="trivia"?(this.reply_text=document.querySelector("#trivia-reply-text"+t.id).value,this.is_reply_spoiler=document.querySelector("#trivia_is_reply_spoiler"+t.id)):this.community_type=="goofs"?(this.reply_text=document.querySelector("#goofs-reply-text"+t.id).value,this.is_reply_spoiler=document.querySelector("#goofs_is_reply_spoiler"+t.id)):(this.community_type="famous_line")&&(this.reply_text=document.querySelector("#famous-reply-text"+t.id).value);let i=new FormData;this.message_image&&i.append("image",this.message_image),i.append("commentable_id",this.routeId),i.append("community_id",t.id),i.append("commentable_type",this.type),i.append("tab_type",this.community_type),i.append("reply_text",this.reply_text),i.append("spoiler",this.is_reply_spoiler.checked==!0?"y":"n"),this.CommunityService.sendReply(i).then(d=>{d.status==200&&(this.message_image="",this.getCommunityList(),this.currentCommunity=t,G.fire({title:this.$t("Error.success")}),document.querySelector("#reply-text"+t.id).value="",document.querySelector("#trivia-reply-text"+t.id).value="",document.querySelector("#famous-reply-text"+t.id).value="",document.querySelector("#goofs-reply-text"+t.id).value="",document.querySelector("#is_reply_spoiler"+t.id).checked=!1,document.querySelector("#trivia_is_reply_spoiler"+t.id).checked=!1,document.querySelector("#goofs_is_reply_spoiler"+t.id).checked=!1,document.querySelector("#message_reply_image"+t.id).src=this.imgBaseUrl+"/assets/share-icon.16325dc7.svg",document.querySelector("#goofs_reply_image"+t.id).src=this.imgBaseUrl+"/assets/share-icon.16325dc7.svg",document.querySelector("#trivia_message_reply_image"+t.id).src=this.imgBaseUrl+"/assets/share-icon.16325dc7.svg",document.querySelector("#comments_send_button"+t.id).disabled=!0,document.querySelector("#comments_send_button"+t.id).classList.add("isDisabled"),document.querySelector("#trivia_send_button"+t.id).disabled=!0,document.querySelector("#trivia_send_button"+t.id).classList.add("isDisabled"),document.querySelector("#famous_send_button"+t.id).disabled=!0,document.querySelector("#famous_send_button"+t.id).classList.add("isDisabled"),document.querySelector("#goofs_send_button"+t.id).disabled=!0,document.querySelector("#goofs_send_button"+t.id).classList.add("isDisabled"))}).catch(d=>{console.log(d)})},revealHideSpoilerCommunity(t){t.is_RevealHideSpoiler=!t.is_RevealHideSpoiler},displayReplyDetails(t){t.is_RevealHideSpoiler=!t.is_RevealHideSpoiler},displayReplySection(t){t.is_ReplyShow=!t.is_ReplyShow},selectMessageImage(t){let i=t.target.files||t.dataTransfer.files;if(!i.length)return;this.message_image=i[0];let d=t.target.files[0].size,u=/(\.jpg|\.jpeg|\.png)$/i;if(u.exec(this.message_image.name)){if(d>1024*1024*25)return this.message_url="",!1;u.exec(this.message_image.name)&&(this.message_url=URL.createObjectURL(t.target.files[0]))}else return this.message_url="",!1},selectMessageReplyImage(t,i){let d=t.target.files||t.dataTransfer.files;if(!d.length)return;this.message_image=d[0];let u=t.target.files[0].size,c=/(\.jpg|\.jpeg|\.png)$/i;if(c.exec(this.message_image.name)){if(u>1024*1024*25)return this.community_type=="comment"?document.querySelector("#message_reply_image"+i.id).src="":this.community_type=="trivia"?document.querySelector("#trivia_message_reply_image"+i.id).src="":this.community_type=="goofs"&&(document.querySelector("#goofs_reply_image"+i.id).src=""),!1;c.exec(this.message_image.name)&&(this.community_type=="comment"?document.querySelector("#message_reply_image"+i.id).src=URL.createObjectURL(t.target.files[0]):this.community_type=="trivia"?document.querySelector("#trivia_message_reply_image"+i.id).src=URL.createObjectURL(t.target.files[0]):this.community_type=="goofs"&&(document.querySelector("#goofs_reply_image"+i.id).src=URL.createObjectURL(t.target.files[0])))}else return this.community_type=="comment"?document.querySelector("#message_reply_image"+i.id).src="":this.community_type=="trivia"?document.querySelector("#trivia_message_reply_image"+i.id).src="":this.community_type=="goofs"&&(document.querySelector("#goofs_reply_image"+i.id).src=""),!1},communityLike(t){this.CommunityService.getCommunityLikes(t.id).then(i=>{i.status==200&&(i.data.message==this.$t("communityCard.liked")?(t.number_of_like=t.number_of_like+1,t.is_liked="y"):i.data.message==this.$t("communityCard.unliked")&&(t.number_of_like=t.number_of_like-1,t.is_liked="n"),this.currentCommunity=t)}).catch(i=>{})},replyTyping(t,i){this.community_type=="comment"?t.target.value?(document.querySelector("#comments_send_button"+i.id).disabled=!1,document.querySelector("#comments_send_button"+i.id).classList.remove("isDisabled")):(document.querySelector("#comments_send_button"+i.id).disabled=!0,document.querySelector("#comments_send_button"+i.id).classList.add("isDisabled")):this.community_type=="trivia"?t.target.value?(document.querySelector("#trivia_send_button"+i.id).disabled=!1,document.querySelector("#trivia_send_button"+i.id).classList.remove("isDisabled")):(document.querySelector("#trivia_send_button"+i.id).disabled=!0,document.querySelector("#trivia_send_button"+i.id).classList.add("isDisabled")):this.community_type=="famous_line"?t.target.value?(document.querySelector("#famous_send_button"+i.id).disabled=!1,document.querySelector("#famous_send_button"+i.id).classList.remove("isDisabled")):(document.querySelector("#famous_send_button"+i.id).disabled=!0,document.querySelector("#famous_send_button"+i.id).classList.add("isDisabled")):this.community_type=="goofs"&&(t.target.value?(document.querySelector("#goofs_send_button"+i.id).disabled=!1,document.querySelector("#goofs_send_button"+i.id).classList.remove("isDisabled")):(document.querySelector("#goofs_send_button"+i.id).disabled=!0,document.querySelector("#goofs_send_button"+i.id).classList.add("isDisabled")))}}},ae={class:"tab-outr small four w-auto"},oe={class:"share-otr"},ne={class:"share-input-innr"},re=["placeholder"],de=["src","alt"],ce={key:1,src:M,alt:""},_e=["value","disabled"],ue={class:"checkbox-inn"},me={class:"checkbox-input"},he=e("span",{class:"checkmark"},null,-1),ge={key:0,class:"user-review-box"},pe={class:"user-comment-list"},ve=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),ye={class:"user-review-txt"},fe={class:"user-review-top"},ke={key:0},be=["onClick","aria-pressed"],Ce={class:"reveal"},we={class:"hide"},Se=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),Re=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),De=["src","alt"],Le={key:1,class:"comment-img-area"},xe=["src","alt"],qe={class:"review-list mt-16-in"},He=["onClick"],Me=e("img",{src:E,alt:""},null,-1),Te=["onClick"],Ie=e("img",{src:K,alt:"",class:"light-th"},null,-1),Ue=e("img",{src:N,alt:"",class:"dark-th"},null,-1),Ve=["onClick"],je=e("img",{src:z,class:"dark-th",alt:""},null,-1),Pe=e("img",{src:W,class:"light-th",alt:""},null,-1),Be={key:0,class:"right-align-list"},Ee={class:"review-innr-list"},Ke={class:"user-comment-list"},Ne=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),ze={class:"user-review-txt"},We={class:"user-review-top"},$e={key:0},Ae=["onClick"],Oe={class:"reveal"},Ye={class:"hide"},Ge=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),Je=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),Qe=["src","alt"],Xe={key:1},Ze=["src","alt"],Fe={class:"share-otr"},es={class:"share-input-innr"},ss=["placeholder","id","onKeyup"],ts=["onChange"],is=["id"],ls=["value","onClick","id"],as={class:"checkbox-inn"},os={class:"checkbox-input"},ns=["id"],rs=e("span",{class:"checkmark"},null,-1),ds={key:1,class:"no-data-wrapper mr-bottom-0"},cs={class:"share-otr"},_s={class:"share-input-innr"},us=["placeholder"],ms=["src","alt"],hs={key:1,src:M,alt:""},gs=["value","disabled"],ps={class:"checkbox-inn"},vs={class:"checkbox-input"},ys=e("span",{class:"checkmark"},null,-1),fs={key:0,class:"user-review-box"},ks={class:"user-comment-list"},bs=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),Cs={class:"user-review-txt"},ws={class:"user-review-top"},Ss={key:0},Rs=["onClick","aria-pressed"],Ds={class:"reveal"},Ls={class:"hide"},xs=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),qs=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),Hs=["src","alt"],Ms={key:1,class:"comment-img-area"},Ts=["src","alt"],Is={class:"review-list mt-16-in"},Us=["onClick"],Vs=e("img",{src:E,alt:""},null,-1),js=["onClick"],Ps=e("img",{src:K,alt:"",class:"light-th"},null,-1),Bs=e("img",{src:N,alt:"",class:"dark-th"},null,-1),Es=["onClick"],Ks=e("img",{src:z,class:"dark-th",alt:""},null,-1),Ns=e("img",{src:W,class:"light-th",alt:""},null,-1),zs={key:0,class:"right-align-list"},Ws={class:"review-innr-list"},$s={class:"user-comment-list"},As=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),Os={class:"user-review-txt"},Ys={class:"user-review-top"},Gs={key:0},Js=["onClick"],Qs={class:"reveal"},Xs={class:"hide"},Zs=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),Fs=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),et=["src","alt"],st={key:1},tt=["src","alt"],it={class:"share-otr"},lt={class:"share-input-innr"},at=["placeholder","id","onKeyup"],ot=["onChange"],nt=["id"],rt=["value","onClick","id"],dt={class:"checkbox-inn"},ct={class:"checkbox-input"},_t=["id"],ut=e("span",{class:"checkmark"},null,-1),mt={key:1,class:"no-data-wrapper mr-bottom-0"},ht={class:"share-otr"},gt={class:"share-input-innr famous-input-innr"},pt=["placeholder"],vt=["value","disabled"],yt={class:"cast-dropdown"},ft={key:0,class:"user-review-box fm-line"},kt={class:"user-comment-list"},bt={class:"user-review-icon line-img"},Ct=["src"],wt=["src"],St={class:"user-review-txt line-txt"},Rt={class:"user-review-top"},Dt={key:0},Lt={key:1},xt={class:"community-btm-otr"},qt={class:"community-btm-img"},Ht=["src","alt"],Mt=e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})],-1),Tt={class:"review-list"},It=["onClick"],Ut=e("img",{src:E,alt:""},null,-1),Vt=["onClick"],jt=e("img",{src:K,alt:"",class:"light-th"},null,-1),Pt=e("img",{src:N,alt:"",class:"dark-th"},null,-1),Bt=["onClick"],Et=e("img",{src:z,class:"dark-th",alt:""},null,-1),Kt=e("img",{src:W,class:"light-th",alt:""},null,-1),Nt={key:0,class:"right-align-list"},zt={class:"review-innr-list"},Wt={class:"user-comment-list"},$t=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),At={class:"user-review-txt"},Ot={class:"user-review-top"},Yt={class:"share-otr"},Gt={class:"share-input-innr famous-input-innr"},Jt=["placeholder","id","onKeyup"],Qt=["value","onClick","id"],Xt=e("div",{class:"checkbox-inn"},[_(` <label class="checkbox-input">\r
                    Spoiler\r
                    <input type="checkbox" id="is_reply_spoiler" />\r
                    <span class="checkmark"></span>\r
                  </label> `)],-1),Zt={key:1,class:"no-data-wrapper mr-bottom-0"},Ft={class:"share-otr"},ei={class:"share-input-innr"},si=["placeholder"],ti=["src","alt"],ii={key:1,src:M,alt:""},li=["value","disabled"],ai={class:"checkbox-inn"},oi={class:"checkbox-input"},ni=e("span",{class:"checkmark"},null,-1),ri={key:0,class:"user-review-box"},di={class:"user-comment-list"},ci=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),_i={class:"user-review-txt"},ui={class:"user-review-top"},mi=e("ul",null,[_(` <li>{{ getDateformat(community.message_date ,'date') }}</li>\r
                      <li>{{ getDateformat(community.message_date ,'time') }}</li> `)],-1),hi={key:0},gi=["onClick","aria-pressed"],pi={class:"reveal"},vi={class:"hide"},yi=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),fi=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),ki=["src","alt"],bi={key:1,class:"comment-img-area"},Ci=["src","alt"],wi={class:"review-list mt-16-in"},Si=["onClick"],Ri=e("img",{src:E,alt:""},null,-1),Di=["onClick"],Li=e("img",{src:K,alt:"",class:"light-th"},null,-1),xi=e("img",{src:N,alt:"",class:"dark-th"},null,-1),qi=["onClick"],Hi=e("img",{src:z,class:"dark-th",alt:""},null,-1),Mi=e("img",{src:W,class:"light-th",alt:""},null,-1),Ti={key:0,class:"right-align-list"},Ii={class:"review-innr-list"},Ui={class:"user-comment-list"},Vi=e("div",{class:"user-review-icon"},[e("figure",null,[e("img",{src:R,alt:"",class:"dark-th"}),e("img",{src:S,alt:"",class:"light-th"})])],-1),ji={class:"user-review-txt"},Pi={class:"user-review-top"},Bi={key:0},Ei=["onClick"],Ki={class:"reveal"},Ni={class:"hide"},zi=e("span",{class:"down-arrow"},[e("img",{src:T,alt:""})],-1),Wi=e("span",{class:"up-arrow"},[e("img",{src:I,alt:""})],-1),$i=["src","alt"],Ai={key:1},Oi=["src","alt"],Yi={class:"share-otr"},Gi={class:"share-input-innr"},Ji=["placeholder","id","onKeyup"],Qi=["onChange"],Xi=["id"],Zi=["value","onClick","id"],Fi={class:"checkbox-inn"},el={class:"checkbox-input"},sl=["id"],tl=e("span",{class:"checkmark"},null,-1),il={key:1,class:"no-data-wrapper mr-bottom-0"};function ll(t,i,d,u,c,r){const D=w("Tabs"),L=w("SearchDropdown"),x=w("TabWrapper");return l(),o("div",ae,[p(x,{onSelectedTab:r.selectedTab},{default:h(()=>[p(D,{title:"communityCard.comments"},{default:h(()=>[e("div",oe,[e("div",ne,[q(e("input",{type:"text",class:"form-control",placeholder:t.$t("communityCard.sharewhatsnew"),"onUpdate:modelValue":i[0]||(i[0]=s=>c.message_text=s)},null,8,re),[[B,c.message_text]]),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:i[1]||(i[1]=(...s)=>r.selectMessageImage&&r.selectMessageImage(...s))},null,32),c.message_url?(l(),o("img",{key:0,class:"upload-img",src:c.message_url,alt:c.message_url},null,8,de)):(l(),o("img",ce))])]),e("input",{type:"submit",class:g(["btn solid orange-btn",c.message_text==""?"isDisabled":""]),value:t.$t("button.send"),disabled:c.message_text=="",onClick:i[2]||(i[2]=(...s)=>r.sendMessage&&r.sendMessage(...s))},null,10,_e)]),e("div",ue,[e("label",me,[m(n(t.$t("movies.spoiler"))+" ",1),q(e("input",{type:"checkbox","onUpdate:modelValue":i[3]||(i[3]=s=>c.is_message_spoiler=s)},null,512),[[$,c.is_message_spoiler]]),he])]),c.newCommunityResult.length>0?(l(),o("div",ge,[e("ul",{class:"outr-list",onScroll:i[4]||(i[4]=(...s)=>r.handleScroll&&r.handleScroll(...s))},[(l(!0),o(y,null,f(c.newCommunityResult,(s,C)=>(l(),o("li",{key:C},[e("div",pe,[ve,e("div",ye,[e("div",fe,[e("h4",null,n(s.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(s.message_date,"date")),1),e("li",null,n(r.getDateformat(s.message_date,"time")),1)])]),s.is_spoiler=="y"?(l(),o("div",ke,[e("a",{class:g(["spoiler-btn",{show:s.is_RevealHideSpoiler}]),onClick:a=>r.revealHideSpoilerCommunity(s),"aria-pressed":s.is_RevealHideSpoiler?"true":"false"},[e("em",Ce,n(t.$t("movies.revealSpoiler")),1),e("em",we,n(t.$t("movies.hideSpoiler")),1),Se,Re],10,be),e("div",{class:g(["spoiler-box comment-img-area",{show:s.is_RevealHideSpoiler}])},[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,De)):_("v-if",!0)],2)])):_("v-if",!0),s.is_spoiler=="n"?(l(),o("div",Le,[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,xe)):_("v-if",!0)])):_("v-if",!0),e("ul",qe,[e("li",null,[s.is_liked=="y"?(l(),o("a",{key:0,onClick:a=>r.communityLike(s),class:"like"},[Me,m(" "+n(s.number_of_like),1)],8,He)):(l(),o("a",{key:1,onClick:a=>r.communityLike(s)},[Ie,Ue,m(" "+n(s.number_of_like),1)],8,Te))]),e("li",null,[e("a",{onClick:a=>r.displayReplySection(s)},[je,Pe,m(" "+n(t.$t("general.reply")),1)],8,Ve)])])])]),s.is_ReplyShow?(l(),o("div",Be,[e("ul",Ee,[(l(!0),o(y,null,f(s.reply,(a,k)=>(l(),o("li",{key:k},[e("div",Ke,[Ne,e("div",ze,[e("div",We,[e("h4",null,n(a.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(a.reply_date,"date")),1),e("li",null,n(r.getDateformat(a.reply_date,"time")),1)])]),a.is_spoiler=="y"?(l(),o("div",$e,[e("a",{class:g(["spoiler-btn",{show:a.is_RevealHideSpoiler}]),onClick:U=>r.displayReplyDetails(a)},[e("em",Oe,n(t.$t("movies.revealSpoiler")),1),e("em",Ye,n(t.$t("movies.hideSpoiler")),1),Ge,Je],10,Ae),e("div",{class:g(["spoiler-box comment-img-area",{show:a.is_RevealHideSpoiler}])},[e("p",null,n(a.reply_message),1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,Qe)):_("v-if",!0)],2)])):_("v-if",!0),a.is_spoiler=="n"?(l(),o("p",Xe,[m(n(a.reply_message)+" ",1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,Ze)):_("v-if",!0)])):_("v-if",!0)])])]))),128))]),e("div",Fe,[e("div",es,[e("input",{type:"text",class:"form-control reply-text",placeholder:t.$t("communityCard.sharewhatsnew"),id:"reply-text"+s.id,onKeyup:a=>r.replyTyping(a,s)},null,40,ss),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:a=>r.selectMessageReplyImage(a,s)},null,40,ts),e("img",{src:M,id:"message_reply_image"+s.id},null,8,is),_(' <img v-else src="@/assets/icons/share-icon.svg" alt=""/> ')])]),e("input",{type:"submit",class:"btn solid orange-btn isDisabled",value:t.$t("button.send"),onClick:a=>r.sendReply(s),id:"comments_send_button"+s.id,disabled:""},null,8,ls)]),e("div",as,[e("label",os,[m(n(t.$t("movies.spoiler"))+" ",1),e("input",{type:"checkbox",id:"is_reply_spoiler"+s.id},null,8,ns),rs])])])):_("v-if",!0)]))),128))],32)])):(l(),o("div",ds,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(D,{title:"communityCard.trivia"},{default:h(()=>[e("div",cs,[e("div",_s,[q(e("input",{type:"text",class:"form-control",placeholder:t.$t("communityCard.sharewhatsnew"),"onUpdate:modelValue":i[5]||(i[5]=s=>c.message_text=s)},null,8,us),[[B,c.message_text]]),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:i[6]||(i[6]=(...s)=>r.selectMessageImage&&r.selectMessageImage(...s))},null,32),c.message_url?(l(),o("img",{key:0,class:"upload-img",src:c.message_url,alt:c.message_url},null,8,ms)):(l(),o("img",hs))])]),e("input",{type:"submit",class:g(["btn solid orange-btn",c.message_text==""?"isDisabled":""]),value:t.$t("button.send"),disabled:c.message_text=="",onClick:i[7]||(i[7]=(...s)=>r.sendMessage&&r.sendMessage(...s))},null,10,gs)]),e("div",ps,[e("label",vs,[m(n(t.$t("movies.spoiler"))+" ",1),q(e("input",{type:"checkbox","onUpdate:modelValue":i[8]||(i[8]=s=>c.is_message_spoiler=s)},null,512),[[$,c.is_message_spoiler]]),ys])]),c.newCommunityResult.length>0?(l(),o("div",fs,[e("ul",{class:"outr-list",onScroll:i[9]||(i[9]=(...s)=>r.handleScroll&&r.handleScroll(...s))},[(l(!0),o(y,null,f(c.newCommunityResult,(s,C)=>(l(),o("li",{key:C},[e("div",ks,[bs,e("div",Cs,[e("div",ws,[e("h4",null,n(s.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(s.message_date,"date")),1),e("li",null,n(r.getDateformat(s.message_date,"time")),1)])]),s.is_spoiler=="y"?(l(),o("div",Ss,[e("a",{class:g(["spoiler-btn",{show:s.is_RevealHideSpoiler}]),onClick:a=>r.revealHideSpoilerCommunity(s),"aria-pressed":s.is_RevealHideSpoiler?"true":"false"},[e("em",Ds,n(t.$t("movies.revealSpoiler")),1),e("em",Ls,n(t.$t("movies.hideSpoiler")),1),xs,qs],10,Rs),e("div",{class:g(["spoiler-box comment-img-area",{show:s.is_RevealHideSpoiler}])},[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,Hs)):_("v-if",!0)],2)])):_("v-if",!0),s.is_spoiler=="n"?(l(),o("div",Ms,[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,Ts)):_("v-if",!0)])):_("v-if",!0),e("ul",Is,[e("li",null,[s.is_liked=="y"?(l(),o("a",{key:0,onClick:a=>r.communityLike(s),class:"like"},[Vs,m(" "+n(s.number_of_like),1)],8,Us)):(l(),o("a",{key:1,onClick:a=>r.communityLike(s)},[Ps,Bs,m(" "+n(s.number_of_like),1)],8,js))]),e("li",null,[e("a",{onClick:a=>r.displayReplySection(s)},[Ks,Ns,m(" "+n(t.$t("general.reply")),1)],8,Es)])])])]),s.is_ReplyShow?(l(),o("div",zs,[e("ul",Ws,[(l(!0),o(y,null,f(s.reply,(a,k)=>(l(),o("li",{key:k},[e("div",$s,[As,e("div",Os,[e("div",Ys,[e("h4",null,n(a.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(a.reply_date,"date")),1),e("li",null,n(r.getDateformat(a.reply_date,"time")),1)])]),a.is_spoiler=="y"?(l(),o("div",Gs,[e("a",{class:g(["spoiler-btn",{show:a.is_RevealHideSpoiler}]),onClick:U=>r.displayReplyDetails(a)},[e("em",Qs,n(t.$t("movies.revealSpoiler")),1),e("em",Xs,n(t.$t("movies.hideSpoiler")),1),Zs,Fs],10,Js),e("div",{class:g(["spoiler-box comment-img-area",{show:a.is_RevealHideSpoiler}])},[e("p",null,n(a.reply_message),1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,et)):_("v-if",!0)],2)])):_("v-if",!0),a.is_spoiler=="n"?(l(),o("p",st,[m(n(a.reply_message)+" ",1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,tt)):_("v-if",!0)])):_("v-if",!0)])])]))),128))]),e("div",it,[e("div",lt,[e("input",{type:"text",class:"form-control reply-text",placeholder:t.$t("communityCard.sharewhatsnew"),id:"trivia-reply-text"+s.id,onKeyup:a=>r.replyTyping(a,s)},null,40,at),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:a=>r.selectMessageReplyImage(a,s)},null,40,ot),e("img",{src:M,id:"trivia_message_reply_image"+s.id},null,8,nt),_(` <img v-else src="@/assets/icons/share-icon.svg" alt=""\r
            /> `)])]),e("input",{type:"submit",class:"btn solid orange-btn isDisabled",value:t.$t("button.send"),onClick:a=>r.sendReply(s),id:"trivia_send_button"+s.id,disabled:""},null,8,rt)]),e("div",dt,[e("label",ct,[m(n(t.$t("movies.spoiler"))+" ",1),e("input",{type:"checkbox",id:"trivia_is_reply_spoiler"+s.id},null,8,_t),ut])])])):_("v-if",!0)]))),128))],32)])):(l(),o("div",mt,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(D,{title:"communityCard.famousLines"},{default:h(()=>[e("div",ht,[e("div",gt,[q(e("input",{type:"text",class:"form-control",placeholder:t.$t("communityCard.sharewhatsnew"),"onUpdate:modelValue":i[10]||(i[10]=s=>c.message_text=s)},null,8,pt),[[B,c.message_text]]),_(' <span><img src="@/assets/icons/share-icon.svg" alt="" /></span> ')]),e("input",{type:"submit",class:g(["btn solid orange-btn",c.message_text==""||!c.current_famouse_id?"isDisabled":""]),value:t.$t("button.send"),disabled:c.message_text==""||!c.current_famouse_id,onClick:i[11]||(i[11]=(...s)=>r.sendMessage&&r.sendMessage(...s))},null,10,vt)]),e("div",yt,[p(L,{onDropdownValue:r.getCurrentFamousId,search_type:c.current_famouse_id,searchTitleListItem:c.famousLine,searchtitle:"name",searchvalue:"id",labelItem:`${t.$t("movies.cast")}${d.famous_line_type=="people"?t.$t("communityCard.Actor"):t.$t("communityCard.Filmography")}`},null,8,["onDropdownValue","search_type","searchTitleListItem","labelItem"])]),c.newCommunityResult.length>0?(l(),o("div",ft,[e("ul",{class:"outr-list",onScroll:i[12]||(i[12]=(...s)=>r.handleScroll&&r.handleScroll(...s))},[(l(!0),o(y,null,f(c.newCommunityResult,(s,C)=>(l(),o("li",{key:C},[e("div",kt,[e("div",bt,[e("span",null,[d.type=="people"?(l(),o("img",{key:0,src:s.title_image,alt:""},null,8,Ct)):(l(),o("img",{key:1,src:s.people_image,alt:""},null,8,wt))])]),e("div",St,[e("div",Rt,[d.type=="people"?(l(),o("h4",Dt,[m(n(s.title_name)+" ",1),e("span",null,n(s.character_name),1)])):(l(),o("h4",Lt,[m(n(s.people_name)+" ",1),e("span",null,n(s.people_character),1)])),e("ul",null,[e("li",null,n(r.getDateformat(s.message_date,"date")),1),e("li",null,n(r.getDateformat(s.message_date,"time")),1)])]),e("p",null,n(s.message),1),e("div",xt,[e("div",qt,[e("span",null,[s.user_image?(l(),o("img",{key:0,src:s.user_image,alt:s.user_image},null,8,Ht)):_("v-if",!0),_(' <div class="user-review-icon" v-else> '),Mt,_(" </div> ")]),e("h6",null,n(s.user_name),1)]),e("ul",Tt,[e("li",null,[s.is_liked=="y"?(l(),o("a",{key:0,onClick:a=>r.communityLike(s),class:"like"},[Ut,m(" "+n(s.number_of_like),1)],8,It)):(l(),o("a",{key:1,onClick:a=>r.communityLike(s)},[jt,Pt,m(" "+n(s.number_of_like),1)],8,Vt))]),e("li",null,[e("a",{onClick:a=>r.displayReplySection(s)},[Et,Kt,m(" "+n(t.$t("general.reply")),1)],8,Bt)])])])])]),s.is_ReplyShow?(l(),o("div",Nt,[e("ul",zt,[(l(!0),o(y,null,f(s.reply,(a,k)=>(l(),o("li",{key:k},[e("div",Wt,[$t,e("div",At,[e("div",Ot,[e("h4",null,n(a.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(a.reply_date,"date")),1),e("li",null,n(r.getDateformat(a.reply_date,"time")),1)])]),e("p",null,n(a.reply_message),1)])])]))),128))]),e("div",Yt,[e("div",Gt,[e("input",{type:"text",class:"form-control reply-text",placeholder:t.$t("communityCard.sharewhatsnew"),id:"famous-reply-text"+s.id,onKeyup:a=>r.replyTyping(a,s)},null,40,Jt),_(` <span>\r
                      <input\r
                        type="file"\r
                        class="form-control file-upload-button"\r
                        v-on:change="selectMessageImage" />\r
                      <img src="@/assets/icons/share-icon.svg" alt=""\r
                    /></span> `)]),e("input",{type:"submit",class:"btn solid orange-btn isDisabled",value:t.$t("button.send"),onClick:a=>r.sendReply(s),id:"famous_send_button"+s.id,disabled:""},null,8,Qt)]),Xt])):_("v-if",!0)]))),128))],32)])):(l(),o("div",Zt,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(D,{title:"communityCard.goofs"},{default:h(()=>[e("div",Ft,[e("div",ei,[q(e("input",{type:"text",class:"form-control",placeholder:t.$t("communityCard.sharewhatsnew"),"onUpdate:modelValue":i[13]||(i[13]=s=>c.message_text=s)},null,8,si),[[B,c.message_text]]),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:i[14]||(i[14]=(...s)=>r.selectMessageImage&&r.selectMessageImage(...s))},null,32),c.message_url?(l(),o("img",{key:0,class:"upload-img",src:c.message_url,alt:c.message_url},null,8,ti)):(l(),o("img",ii))])]),e("input",{type:"submit",class:g(["btn solid orange-btn",c.message_text==""?"isDisabled":""]),value:t.$t("button.send"),disabled:c.message_text=="",onClick:i[15]||(i[15]=(...s)=>r.sendMessage&&r.sendMessage(...s))},null,10,li)]),e("div",ai,[e("label",oi,[m(n(t.$t("movies.spoiler"))+" ",1),q(e("input",{type:"checkbox","onUpdate:modelValue":i[16]||(i[16]=s=>c.is_message_spoiler=s)},null,512),[[$,c.is_message_spoiler]]),ni])]),c.newCommunityResult.length>0?(l(),o("div",ri,[e("ul",{class:"outr-list",onScroll:i[17]||(i[17]=(...s)=>r.handleScroll&&r.handleScroll(...s))},[(l(!0),o(y,null,f(c.newCommunityResult,(s,C)=>(l(),o("li",{key:C},[e("div",di,[ci,e("div",_i,[e("div",ui,[e("h4",null,n(s.user_name),1),mi]),s.is_spoiler=="y"?(l(),o("div",hi,[e("a",{class:g(["spoiler-btn",{show:s.is_RevealHideSpoiler}]),onClick:a=>r.revealHideSpoilerCommunity(s),"aria-pressed":s.is_RevealHideSpoiler?"true":"false"},[e("em",pi,n(t.$t("movies.revealSpoiler")),1),e("em",vi,n(t.$t("movies.hideSpoiler")),1),yi,fi],10,gi),e("div",{class:g(["spoiler-box comment-img-area",{show:s.is_RevealHideSpoiler}])},[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,ki)):_("v-if",!0)],2)])):_("v-if",!0),s.is_spoiler=="n"?(l(),o("div",bi,[e("p",null,n(s.message),1),s.attachment_image?(l(),o("img",{key:0,src:s.attachment_image,alt:s.attachment_image},null,8,Ci)):_("v-if",!0)])):_("v-if",!0),e("ul",wi,[e("li",null,[s.is_liked=="y"?(l(),o("a",{key:0,onClick:a=>r.communityLike(s),class:"like"},[Ri,m(" "+n(s.number_of_like),1)],8,Si)):(l(),o("a",{key:1,onClick:a=>r.communityLike(s)},[Li,xi,m(" "+n(s.number_of_like),1)],8,Di))]),e("li",null,[e("a",{onClick:a=>r.displayReplySection(s)},[Hi,Mi,m(" "+n(t.$t("general.reply")),1)],8,qi)])])])]),s.is_ReplyShow?(l(),o("div",Ti,[e("ul",Ii,[(l(!0),o(y,null,f(s.reply,(a,k)=>(l(),o("li",{key:k},[e("div",Ui,[Vi,e("div",ji,[e("div",Pi,[e("h4",null,n(a.user_name),1),e("ul",null,[e("li",null,n(r.getDateformat(a.reply_date,"date")),1),e("li",null,n(r.getDateformat(a.reply_date,"time")),1)])]),a.is_spoiler=="y"?(l(),o("div",Bi,[e("a",{class:g(["spoiler-btn",{show:a.is_RevealHideSpoiler}]),onClick:U=>r.displayReplyDetails(a)},[e("em",Ki,n(t.$t("movies.revealSpoiler"))+".. ",1),e("em",Ni,n(t.$t("movies.hideSpoiler")),1),zi,Wi],10,Ei),e("div",{class:g(["spoiler-box comment-img-area",{show:a.is_RevealHideSpoiler}])},[e("p",null,n(a.reply_message),1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,$i)):_("v-if",!0)],2)])):_("v-if",!0),a.is_spoiler=="n"?(l(),o("p",Ai,[m(n(a.reply_message)+" ",1),a.attachment_image?(l(),o("img",{key:0,src:a.attachment_image,alt:a.attachment_image},null,8,Oi)):_("v-if",!0)])):_("v-if",!0)])])]))),128))]),e("div",Yi,[e("div",Gi,[e("input",{type:"text",class:"form-control",placeholder:t.$t("communityCard.sharewhatsnew"),id:"goofs-reply-text"+s.id,onKeyup:a=>r.replyTyping(a,s)},null,40,Ji),e("span",null,[e("input",{type:"file",class:"form-control file-upload-button",onChange:a=>r.selectMessageReplyImage(a,s)},null,40,Qi),e("img",{src:M,id:"goofs_reply_image"+s.id},null,8,Xi)])]),e("input",{type:"submit",class:"btn solid orange-btn isDisabled",value:t.$t("button.send"),onClick:a=>r.sendReply(s),id:"goofs_send_button"+s.id,disabled:""},null,8,Zi)]),e("div",Fi,[e("label",el,[m(n(t.$t("movies.spoiler"))+" ",1),e("input",{type:"checkbox",id:"goofs_is_reply_spoiler"+s.id},null,8,sl),tl])])])):_("v-if",!0)]))),128))],32)])):(l(),o("div",il,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1})]),_:1},8,["onSelectedTab"])])}const Nl=J(le,[["render",ll],["__file","D:/11-db-frontend/11_db/src/components/CommunityCard.vue"]]),al={name:"MediaSection",components:{Tabs:Q,TabWrapper:X,VideoCard:ee,ImageCard:se,PosterCard:te},props:{videos:Array,images:Array,posters:Array,isPeoplePoster:Boolean}},ol={key:0,class:"tab-outr small"},nl={key:0,class:"lists tab-scroll moble video-panel-outer"},rl={class:"media-otr md-3"},dl=e("img",{src:j,alt:"more",class:"white-image"},null,-1),cl=e("img",{src:P,alt:"more",class:"red-image"},null,-1),_l={key:1,class:"no-data-wrapper"},ul={key:0,class:"lists tab-scroll moble media-imgs"},ml={class:"image-otr"},hl=e("img",{src:j,alt:"more",class:"white-image"},null,-1),gl=e("img",{src:P,alt:"more",class:"red-image"},null,-1),pl={key:1,class:"no-data-wrapper"},vl={key:0,class:"lists tab-scroll moble media-poster"},yl={class:"image-otr"},fl=e("img",{src:j,alt:"more",class:"white-image"},null,-1),kl=e("img",{src:P,alt:"more",class:"red-image"},null,-1),bl={key:1,class:"no-data-wrapper"},Cl={key:1,class:"no-data-wrapper"},wl={key:1,class:"tab-outr small"},Sl={key:0,class:"lists tab-scroll moble video-panel-outer"},Rl={class:"media-otr md-3"},Dl=e("img",{src:j,alt:"more",class:"white-image"},null,-1),Ll=e("img",{src:P,alt:"more",class:"red-image"},null,-1),xl={key:1,class:"no-data-wrapper"},ql={key:0,class:"lists tab-scroll moble media-imgs"},Hl={class:"image-otr"},Ml=e("img",{src:j,alt:"more",class:"white-image"},null,-1),Tl=e("img",{src:P,alt:"more",class:"red-image"},null,-1),Il={key:1,class:"no-data-wrapper"},Ul={key:1,class:"no-data-wrapper"};function Vl(t,i,d,u,c,r){var k,U,A,O,Y;const D=w("VideoCard"),L=w("router-link"),x=w("Tabs"),s=w("ImageCard"),C=w("PosterCard"),a=w("TabWrapper");return d.isPeoplePoster?(l(),o("div",wl,[((O=d.videos)==null?void 0:O.length)>0||((Y=d.images)==null?void 0:Y.length)>0?(l(),H(a,{key:0},{default:h(()=>[p(x,{title:"addNewPeople.mediadetails.videoTitle"},{default:h(()=>[d.videos.length>0?(l(),o("div",Sl,[e("div",Rl,[(l(!0),o(y,null,f(d.videos,(v,b)=>(l(),H(D,{key:b,video:v},null,8,["video"]))),128))]),p(L,{to:"",onClick:i[3]||(i[3]=v=>t.$emit("navigation")),class:"more-content"},{default:h(()=>[Dl,Ll]),_:1})])):(l(),o("div",xl,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(x,{title:"mediaSection.images"},{default:h(()=>[d.images.length>0?(l(),o("div",ql,[e("div",Hl,[(l(!0),o(y,null,f(d.images,(v,b)=>(l(),H(s,{key:b,image:v},null,8,["image"]))),128))]),p(L,{to:"",onClick:i[4]||(i[4]=v=>t.$emit("navigation")),class:"more-content"},{default:h(()=>[Ml,Tl]),_:1})])):(l(),o("div",Il,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1})]),_:1})):(l(),o("div",Ul,[e("p",null,n(t.$t("searchResults.noData")),1)]))])):(l(),o("div",ol,[((k=d.videos)==null?void 0:k.length)>0||((U=d.images)==null?void 0:U.length)>0||((A=d.posters)==null?void 0:A.length)>0?(l(),H(a,{key:0},{default:h(()=>[p(x,{title:"addNewPeople.mediadetails.videoTitle"},{default:h(()=>[d.videos.length>0?(l(),o("div",nl,[e("div",rl,[(l(!0),o(y,null,f(d.videos,(v,b)=>(l(),H(D,{key:b,video:v},null,8,["video"]))),128))]),p(L,{to:"",onClick:i[0]||(i[0]=v=>t.$emit("navigation")),class:"more-content"},{default:h(()=>[dl,cl]),_:1})])):(l(),o("div",_l,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(x,{title:"mediaSection.images"},{default:h(()=>[d.images.length>0?(l(),o("div",ul,[e("div",ml,[(l(!0),o(y,null,f(d.images,(v,b)=>(l(),H(s,{key:b,image:v},null,8,["image"]))),128))]),p(L,{to:"",onClick:i[1]||(i[1]=v=>t.$emit("navigation")),class:"more-content"},{default:h(()=>[hl,gl]),_:1})])):(l(),o("div",pl,[e("p",null,n(t.$t("searchResults.noData")),1)]))]),_:1}),p(x,{title:"addNewMoviesForm.poster"},{default:h(()=>{var v;return[((v=d.posters)==null?void 0:v.length)>0?(l(),o("div",vl,[e("div",yl,[(l(!0),o(y,null,f(d.posters,(b,Z)=>(l(),H(C,{key:Z,poster:b},null,8,["poster"]))),128))]),p(L,{to:"",onClick:i[2]||(i[2]=b=>t.$emit("navigation")),class:"more-content"},{default:h(()=>[fl,kl]),_:1})])):(l(),o("div",bl,[e("p",null,n(t.$t("searchResults.noData")),1)]))]}),_:1})]),_:1})):(l(),o("div",Cl,[e("p",null,n(t.$t("searchResults.noData")),1)]))]))}const zl=J(al,[["render",Vl],["__file","D:/11-db-frontend/11_db/src/components/Details/MediaSection.vue"]]);export{Nl as C,zl as M};

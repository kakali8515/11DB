import{_ as E,aJ as U,T as V,ay as A,aB as C,aD as w,aL as x,aM as S,U as N,aC as T,r as y,o as l,c as m,p as b,a as r,k as f,t as a,w as g,v as _,n as c,b as h,F as L,s as I,ab as K,ac as R}from"./index.ace3f588.js";import{D as M,_ as Y}from"./agency-icon.21580dd0.js";import{S as B}from"./SearchVideo.e2027f4b.js";import{_ as q}from"./close-blc.0dd4d1a8.js";import"./close.0afef835.js";const j={name:"AgentEdit",inject:["common"],components:{Sidebar:U,SearchVideo:B},created(){this.DictionaryAgencyService=new M},mounted(){this.getDictionaryAgencyDetails(),this.getArtistList()},data(){return{artist:[],artistList:[],searchArtist:"",agentId:this.$route.params.id?this.$route.params.id:15,agentDetails:{},error:{},specialChars:/[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/}},watch:{"common.state.SelectedLang":function(n,e){n&&n!=e&&Object.keys(this.error).length!=0&&this.validateData()}},methods:{getDictionaryAgencyDetails(){this.DictionaryAgencyService.getDictionaryAgencyDetails(this.agentId).then(n=>{n.status==200&&(this.agentDetails={...n.data},this.agentDetails.maneger_list=this.agentDetails.maneger_list.map(e=>({...e,artists:e.artists.map(u=>({title_poster:u.profile_image,title_name:u.artist_name,title_id:u.artist_id}))})))}).catch(n=>{})},getArtistList(){let n={artist_name:this.searchArtist?this.searchArtist:"",page:1,limit:20};this.DictionaryAgencyService.getArtistList(n).then(e=>{e.status==200&&(this.artistList=e.data.results.map(u=>({title_poster:u.profile_picture,title_name:u.artist_name,title_id:u.artist_id})))}).catch(e=>{})},validateData(){this.error={},this.agentDetails.name_ko==""||this.agentDetails.name_ko==null?this.error.agency_name_ko=this.$t("Error.requiredInput"):/[0-9]+/.test(this.agentDetails.name_ko)?this.error.agency_name_ko=this.$t("Error.numberNotAll"):this.specialChars.test(this.agentDetails.name_ko)&&(this.error.agency_name_ko=this.$t("Error.specialCharacter")),this.agentDetails.name_en==""||this.agentDetails.name_en==null?this.error.agency_name_en=this.$t("Error.requiredInput"):/[0-9]+/.test(this.agentDetails.name_en)?this.error.agency_name_en=this.$t("Error.numberNotAll"):this.specialChars.test(this.agentDetails.name_en)&&(this.error.agency_name_en=this.$t("Error.specialCharacter")),/[a-zA-Z]+/.test(this.agentDetails.phone_number)?this.error.phone_number=this.$t("Error.notAllowedCharacter"):this.specialChars.test(this.agentDetails.phone_number)&&(this.error.phone_number=this.$t("Error.specialCharacter")),/[a-zA-Z]+/.test(this.agentDetails.fax)?this.error.fax=this.$t("Error.notAllowedCharacter"):this.specialChars.test(this.agentDetails.fax)&&(this.error.fax=this.$t("Error.specialCharacter")),this.agentDetails.maneger_list.map((n,e)=>{n.manager_name_ko==""||n.manager_name_ko==null?(this.error.manager_name_ko||(this.error.manager_name_ko=[]),this.error.manager_name_ko[e]=this.$t("Error.requiredInput")):/[0-9]+/.test(n.manager_name_ko)&&(this.error.manager_name_ko=[],this.error.manager_name_ko[e]=this.$t("Error.numberNotAll")),n.manager_name_en==""||n.manager_name_en==null?(this.error.manager_name_en||(this.error.manager_name_en=[]),this.error.manager_name_en[e]=this.$t("Error.requiredInput")):/[0-9]+/.test(n.manager_name_en)&&(this.error.manager_name_en=[],this.error.manager_name_en[e]=this.$t("Error.numberNotAll")),/[a-zA-Z]+/.test(n.manager_phone)?(this.error.manager_phone_number=[],this.error.manager_phone_number[e]=this.$t("Error.notAllowedCharacter")):this.specialChars.test(n.manager_phone)&&(this.error.manager_phone_number=[],this.error.manager_phone_number[e]=this.$t("Error.specialCharacter")),n.artists.length<1&&(this.error.artist||(this.error.artist=[]),this.error.artist[e]=this.$t("Error.minimumRequired"))}),this.checkYoutube(),this.checkEmail(),this.checkManagerEmail(),this.checkURL(this.agentDetails.site_link,"site_link"),this.checkURL(this.agentDetails.facebook_link,"facebook_link"),this.checkURL(this.agentDetails.instagram_link,"instagram_link"),this.checkURL(this.agentDetails.twitter_link,"twitter_link")},deleteManagerDetails(n){this.agentDetails.maneger_list.length>1&&this.agentDetails.maneger_list.splice(n,1)},editDictionaryAgencyDetails(){if(this.validateData(),Object.keys(this.error).length!=0)return window.scroll({top:0,left:0,behavior:"smooth"}),!1;this.agentDetails.maneger_list=this.agentDetails.maneger_list.map(e=>({name_en:e.manager_name_en,name_ko:e.manager_name_ko,id:e.manager_id,phone:e.manager_phone,email:e.manager_email,artists:e.artists.map(u=>u.title_id)}));let n={id:this.agentId,name_en:this.agentDetails.name_en,aka_en:this.agentDetails.aka_en,address_en:this.agentDetails.address_en,name_ko:this.agentDetails.name_ko,aka_ko:this.agentDetails.aka_ko,address_ko:this.agentDetails.address_ko,agency_code:this.agentDetails.agency_code,email:this.agentDetails.email,phone_number:this.agentDetails.phone_number,fax:this.agentDetails.fax,site_link:this.agentDetails.site_link,instagram_link:this.agentDetails.instagram_link,facebook_link:this.agentDetails.facebook_link,twitter_link:this.agentDetails.twitter_link,youtube_link:this.agentDetails.youtube_link,manager_details:[...this.agentDetails.maneger_list]};this.DictionaryAgencyService.editDictionaryAgencyDetails(n).then(e=>{e.status==200&&(V.fire({title:this.$t("Error.success")}),this.$router.push(`/admin/agent-details/${this.agentId}`))}).catch(e=>{})},checkURL(n,e){if(n=="")return delete this.error[e],!0;if(this.isValidUrl(n))delete this.error[e];else return this.error[e]=this.$t("Error.validUrl"),!1},checkEmail(){if(this.agentDetails.email=="")return delete this.error.email,!0;if(this.isValidEmail(this.agentDetails.email))delete this.error.email;else return this.error.email=this.$t("Error.pleaseValidEmail"),!1},checkManagerEmail(){this.error.manager_email||(this.error.manager_email=[]),this.agentDetails.maneger_list.map((n,e)=>{if(n.manager_email=="")return delete this.error.manager_email[e],!0;if(this.isValidEmail(n.manager_email))delete this.error.manager_email[e];else return this.error.manager_email[e]=this.$t("Error.pleaseValidEmail"),!1}),this.error.manager_email.length==0&&delete this.error.manager_email},checkYoutube(){if(this.agentDetails.youtube_link=="")return delete this.error.youtube_link,!0;if(this.matchYoutubeUrl(this.agentDetails.youtube_link))delete this.error.youtube_link;else return this.error.youtube_link=this.$t("Error.pleaseValidYoutube"),!1},isChar:A,isValidUrl:C,isIntegerNumber:w,isPhoneNumber:x,isValidEmail:S,matchYoutubeUrl:N,isCharWithSpeailChar:T}},p=n=>(K("data-v-720fcfa4"),n=n(),R(),n),z={class:"admin-otr"},O={class:"admin-right"},P={class:"heading"},W=p(()=>r("span",null,[r("img",{src:Y,alt:""})],-1)),Z={class:"cm-bck"},F={class:"frm-innr frm-wd-in sml"},J={class:"form-group"},G={class:"enter-dtl-innr"},H={class:"frm-innr frm-wd-in"},Q={class:"frm-heading"},X=p(()=>r("span",null,"*",-1)),$={class:"double"},ee={class:"form-group"},te=["placeholder"],re={key:0,class:"error-txt"},ne={class:"form-group"},ie=["placeholder"],ae={class:"form-group"},se=["placeholder"],oe={class:"frm-heading"},le=p(()=>r("span",null,"*",-1)),me={class:"double"},ge={class:"form-group"},_e=["placeholder"],de={key:0,class:"error-txt"},he={class:"form-group"},ce=["placeholder"],ue={class:"form-group"},pe=["placeholder"],fe={class:"enter-dtl-innr"},ke={class:"frm-innr frm-wd-in"},ye={class:"double"},be={class:"form-group"},De=["placeholder"],ve={key:0,class:"error-txt"},Ee={class:"form-group"},Ue=["placeholder"],Ve={key:0,class:"error-txt"},Ae={class:"double"},Ce={class:"form-group"},we=["placeholder"],xe={key:0,class:"error-txt"},Se={class:"form-group"},Ne=["placeholder"],Te={key:0,class:"error-txt"},Le={class:"double"},Ie={class:"form-group"},Ke=["placeholder"],Re={key:0,class:"error-txt"},Me={class:"form-group"},Ye=["placeholder"],Be={key:0,class:"error-txt"},qe={class:"double"},je={class:"form-group"},ze=["placeholder"],Oe={key:0,class:"error-txt"},Pe={class:"form-group"},We=["placeholder"],Ze={key:0,class:"error-txt"},Fe={class:"material-filter-list"},Je={class:"btn-group"},Ge=["onClick"],He=p(()=>r("img",{src:q},null,-1)),Qe=[He],Xe={class:"frm-innr"},$e={class:"form-group"},et=["placeholder","onUpdate:modelValue"],tt={key:0,class:"error-txt"},rt={class:"form-group"},nt=["placeholder","onUpdate:modelValue"],it={key:0,class:"error-txt"},at={class:"frm-innr frm-wd-in"},st={class:"double"},ot={class:"form-group"},lt=["placeholder","onUpdate:modelValue"],mt={key:0,class:"error-txt"},gt={class:"form-group"},_t=["placeholder","onUpdate:modelValue"],dt={key:0,class:"error-txt"},ht={class:"frm-innr w-100"},ct={class:"form-group mb-0"},ut={key:0,class:"error-txt"},pt={class:"btn-group justify-btwn"},ft=["value"];function kt(n,e,u,yt,t,o){var k;const D=y("Sidebar"),v=y("SearchVideo");return l(),m("div",z,[b(D),r("div",O,[r("h2",P,[W,f(a(n.$t("dictionary.agentList.agency")),1)]),r("div",Z,[r("h3",null,a(n.$t("dictionary.agent.editAgency")),1),r("div",F,[r("div",J,[r("label",null,a(n.$t("dictionary.agent.id")),1),g(r("input",{type:"text",placeholder:"A0524",class:"form-control disabled","onUpdate:modelValue":e[0]||(e[0]=i=>t.agentDetails.agency_code=i)},null,512),[[_,t.agentDetails.agency_code]])])]),r("div",G,[r("div",H,[r("p",Q,[f(a(n.$t("dictionary.agent.detailsKorean")),1),X]),r("div",$,[r("div",ee,[r("label",null,a(n.$t("dictionary.agent.agencyName"))+" ("+a(n.$t("dictionary.agent.ko"))+")",1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.agencyNameText"),class:c(["form-control",t.error.agency_name_ko?"error-border":""]),"onUpdate:modelValue":e[1]||(e[1]=i=>t.agentDetails.name_ko=i),onKeypress:e[2]||(e[2]=i=>o.isChar(i)),maxlength:"150"},null,42,te),[[_,t.agentDetails.name_ko]]),t.error.agency_name_ko?(l(),m("span",re,a(t.error.agency_name_ko),1)):h("v-if",!0)]),r("div",ne,[r("label",null,a(n.$t("dictionary.agent.aka"))+" ("+a(n.$t("dictionary.agent.ko"))+")",1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.akaText"),class:"form-control","onUpdate:modelValue":e[3]||(e[3]=i=>t.agentDetails.aka_ko=i),onKeypress:e[4]||(e[4]=i=>o.isChar(i)),maxlength:"150"},null,40,ie),[[_,t.agentDetails.aka_ko]])])]),r("div",ae,[r("label",null,a(n.$t("dictionary.agent.address"))+" ("+a(n.$t("dictionary.agent.ko"))+")",1),g(r("textarea",{placeholder:n.$t("dictionary.agent.addressText"),class:"form-control address-textarea","onUpdate:modelValue":e[5]||(e[5]=i=>t.agentDetails.address_ko=i),maxlength:"230"},null,8,se),[[_,t.agentDetails.address_ko]])]),r("p",oe,[f(a(n.$t("dictionary.agent.detailsEnglish")),1),le]),r("div",me,[r("div",ge,[r("label",null,a(n.$t("dictionary.agent.agencyName"))+" ("+a(n.$t("dictionary.agent.en"))+")",1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.agencyNameText"),class:c(["form-control",t.error.agency_name_en?"error-border":""]),"onUpdate:modelValue":e[6]||(e[6]=i=>t.agentDetails.name_en=i),onKeypress:e[7]||(e[7]=i=>o.isChar(i)),maxlength:"150"},null,42,_e),[[_,t.agentDetails.name_en]]),t.error.agency_name_en?(l(),m("span",de,a(t.error.agency_name_en),1)):h("v-if",!0)]),r("div",he,[r("label",null,a(n.$t("dictionary.agent.aka"))+" ("+a(n.$t("dictionary.agent.en"))+")",1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.akaText"),class:"form-control","onUpdate:modelValue":e[8]||(e[8]=i=>t.agentDetails.aka_en=i),onKeypress:e[9]||(e[9]=i=>o.isChar(i)),maxlength:"150"},null,40,ce),[[_,t.agentDetails.aka_en]])])]),r("div",ue,[r("label",null,a(n.$t("dictionary.agent.address"))+" ("+a(n.$t("dictionary.agent.en"))+")",1),g(r("textarea",{placeholder:n.$t("dictionary.agent.addressText"),class:"form-control address-textarea","onUpdate:modelValue":e[10]||(e[10]=i=>t.agentDetails.address_en=i),maxlength:"230"},null,8,pe),[[_,t.agentDetails.address_en]])])])]),r("div",fe,[r("div",ke,[r("div",ye,[r("div",be,[r("label",null,a(n.$t("dictionary.agent.tel")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.telText"),class:c(["form-control",t.error.phone_number?"error-border":""]),"onUpdate:modelValue":e[11]||(e[11]=i=>t.agentDetails.phone_number=i),maxlength:"20",onKeypress:e[12]||(e[12]=i=>o.isPhoneNumber(i))},null,42,De),[[_,t.agentDetails.phone_number]]),t.error.phone_number?(l(),m("span",ve,a(t.error.phone_number),1)):h("v-if",!0)]),r("div",Ee,[r("label",null,a(n.$t("dictionary.agent.fax")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.faxText"),class:c(["form-control",t.error.fax?"error-border":""]),maxlength:"20","onUpdate:modelValue":e[13]||(e[13]=i=>t.agentDetails.fax=i),onKeypress:e[14]||(e[14]=i=>o.isIntegerNumber(i))},null,42,Ue),[[_,t.agentDetails.fax]]),t.error.fax?(l(),m("span",Ve,a(t.error.fax),1)):h("v-if",!0)])]),r("div",Ae,[r("div",Ce,[r("label",null,a(n.$t("dictionary.agent.email")),1),g(r("input",{type:"email",placeholder:n.$t("dictionary.agent.emailText"),class:c(["form-control",t.error.email?"error-border":""]),"onUpdate:modelValue":e[15]||(e[15]=i=>t.agentDetails.email=i),onKeyup:e[16]||(e[16]=(...i)=>o.checkEmail&&o.checkEmail(...i))},null,42,we),[[_,t.agentDetails.email]]),t.error.email?(l(),m("span",xe,a(t.error.email),1)):h("v-if",!0)]),r("div",Se,[r("label",null,a(n.$t("dictionary.agent.officialURL")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.urlText"),class:c(["form-control",t.error.site_link?"error-border":""]),"onUpdate:modelValue":e[17]||(e[17]=i=>t.agentDetails.site_link=i),onKeyup:e[18]||(e[18]=i=>o.checkURL(t.agentDetails.site_link,"site_link"))},null,42,Ne),[[_,t.agentDetails.site_link]]),t.error.site_link?(l(),m("span",Te,a(t.error.site_link),1)):h("v-if",!0)])]),r("div",Le,[r("div",Ie,[r("label",null,a(n.$t("dictionary.agent.youtube")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.youtubeText"),class:c(["form-control",t.error.youtube_link?"error-border":""]),"onUpdate:modelValue":e[19]||(e[19]=i=>t.agentDetails.youtube_link=i),onKeyup:e[20]||(e[20]=(...i)=>o.checkYoutube&&o.checkYoutube(...i))},null,42,Ke),[[_,t.agentDetails.youtube_link]]),t.error.youtube_link?(l(),m("span",Re,a(t.error.youtube_link),1)):h("v-if",!0)]),r("div",Me,[r("label",null,a(n.$t("dictionary.agent.facebook")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.facebookText"),class:c(["form-control",t.error.facebook_link?"error-border":""]),"onUpdate:modelValue":e[21]||(e[21]=i=>t.agentDetails.facebook_link=i),onKeyup:e[22]||(e[22]=i=>o.checkURL(t.agentDetails.facebook_link,"facebook_link"))},null,42,Ye),[[_,t.agentDetails.facebook_link]]),t.error.facebook_link?(l(),m("span",Be,a(t.error.facebook_link),1)):h("v-if",!0)])]),r("div",qe,[r("div",je,[r("label",null,a(n.$t("dictionary.agent.instagram")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.instagramText"),class:c(["form-control",t.error.instagram_link?"error-border":""]),"onUpdate:modelValue":e[23]||(e[23]=i=>t.agentDetails.instagram_link=i),onKeyup:e[24]||(e[24]=i=>o.checkURL(t.agentDetails.instagram_link,"instagram_link"))},null,42,ze),[[_,t.agentDetails.instagram_link]]),t.error.instagram_link?(l(),m("span",Oe,a(t.error.instagram_link),1)):h("v-if",!0)]),r("div",Pe,[r("label",null,a(n.$t("dictionary.agent.twitter")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.twitterText"),class:c(["form-control",t.error.twitter_link?"error-border":""]),"onUpdate:modelValue":e[25]||(e[25]=i=>t.agentDetails.twitter_link=i),onKeyup:e[26]||(e[26]=i=>o.checkURL(t.agentDetails.twitter_link,"twitter_link"))},null,42,We),[[_,t.agentDetails.twitter_link]]),t.error.twitter_link?(l(),m("span",Ze,a(t.error.twitter_link),1)):h("v-if",!0)])])])]),r("div",Fe,[r("h3",null,a(n.$t("dictionary.agent.managerList")),1),r("div",Je,[r("button",{type:"button",class:"btn outline blk-btn",onClick:e[27]||(e[27]=i=>{t.agentDetails.maneger_list.length+1,t.agentDetails.maneger_list.push({manager_name_ko:"",manager_name_en:"",manager_email:"",manager_phone:"",artists:[]})})},a(n.$t("dictionary.agent.addMore")),1)])]),(l(!0),m(L,null,I((k=t.agentDetails.maneger_list)==null?void 0:k.length,(i,s)=>(l(),m("div",{class:"gray-bck",key:s},[t.agentDetails.maneger_list.length>1?(l(),m("span",{key:0,class:"clsaddlist",onClick:d=>o.deleteManagerDetails(s)},Qe,8,Ge)):h("v-if",!0),r("div",Xe,[r("div",$e,[r("label",null,a(n.$t("dictionary.agent.managerName(KO)")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.koreanNameText"),class:c(["form-control",t.error.manager_name_ko&&t.error.manager_name_ko[s]?"error-border":""]),"onUpdate:modelValue":d=>t.agentDetails.maneger_list[s].manager_name_ko=d,maxlength:"150",onKeypress:e[28]||(e[28]=d=>o.isCharWithSpeailChar(d))},null,42,et),[[_,t.agentDetails.maneger_list[s].manager_name_ko]]),t.error.manager_name_ko&&t.error.manager_name_ko[s]?(l(),m("span",tt,a(t.error.manager_name_ko[s]),1)):h("v-if",!0)]),r("div",rt,[r("label",null,a(n.$t("dictionary.agent.managerName(EN)")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.englishNameText"),class:c(["form-control",t.error.manager_name_en&&t.error.manager_name_en[s]?"error-border":""]),"onUpdate:modelValue":d=>t.agentDetails.maneger_list[s].manager_name_en=d,onKeypress:e[29]||(e[29]=d=>o.isCharWithSpeailChar(d)),maxlength:"150"},null,42,nt),[[_,t.agentDetails.maneger_list[s].manager_name_en]]),t.error.manager_name_en&&t.error.manager_name_en[s]?(l(),m("span",it,a(t.error.manager_name_en[s]),1)):h("v-if",!0)])]),r("div",at,[r("div",st,[r("div",ot,[r("label",null,a(n.$t("dictionary.agent.email")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.emailText"),class:c(["form-control",t.error.manager_email&&t.error.manager_email[s]?"error-border":""]),"onUpdate:modelValue":d=>t.agentDetails.maneger_list[s].manager_email=d,onKeyup:e[30]||(e[30]=(...d)=>o.checkManagerEmail&&o.checkManagerEmail(...d))},null,42,lt),[[_,t.agentDetails.maneger_list[s].manager_email]]),t.error.manager_email&&t.error.manager_email[s]?(l(),m("span",mt,a(t.error.manager_email[s]),1)):h("v-if",!0)]),r("div",gt,[r("label",null,a(n.$t("dictionary.agent.tel")),1),g(r("input",{type:"text",placeholder:n.$t("dictionary.agent.telText"),class:c(["form-control",t.error.manager_phone_number&&t.error.manager_phone_number[s]?"error-border":""]),"onUpdate:modelValue":d=>t.agentDetails.maneger_list[s].manager_phone=d,maxlength:"20",onKeypress:e[31]||(e[31]=d=>o.isPhoneNumber(d))},null,42,_t),[[_,t.agentDetails.maneger_list[s].manager_phone]]),t.error.manager_phone_number&&t.error.manager_phone_number[s]?(l(),m("span",dt,a(t.error.manager_phone_number[s]),1)):h("v-if",!0)])])]),r("div",ht,[r("div",ct,[r("label",null,a(n.$t("dictionary.agent.artist")),1),b(v,{onSearchInput:n.getArtistSearch,list:t.artistList,connectionValue:t.artist,connectionBelowList:t.agentDetails.maneger_list[s].artists,onConnectionInput:n.getArtistInput,type:"artist",class:"artist-cursor"},null,8,["onSearchInput","list","connectionValue","connectionBelowList","onConnectionInput"]),t.error.artist&&t.error.artist[s]?(l(),m("span",ut,a(t.error.artist[s]),1)):h("v-if",!0)])])]))),128)),r("div",pt,[r("input",{type:"submit",class:"btn org-btn",value:n.$t("button.save"),onClick:e[32]||(e[32]=(...i)=>o.editDictionaryAgencyDetails&&o.editDictionaryAgencyDetails(...i))},null,8,ft),r("button",{type:"button",class:"btn outline blk-btn",onClick:e[33]||(e[33]=i=>n.$router.push("/admin/agent-list"))},a(n.$t("button.back")),1)])])])])}const Vt=E(j,[["render",kt],["__scopeId","data-v-720fcfa4"],["__file","D:/workspace/11-db-frontend/11_db/src/admin/views/Dictionary/AgentEdit.vue"]]);export{Vt as default};

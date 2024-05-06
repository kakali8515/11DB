import{_ as A,aJ as L,T as K,ay as C,aB as U,aL as V,aM as w,U as D,aD as O,aC as x,r as b,o as l,c,b as m,a as t,p as k,k as y,t as s,w as d,v as h,n as p,F as v,s as S,ab as T,ac as I}from"./index.904f3d07.js";import{D as M,_ as B}from"./agency-icon.8308e064.js";import{S as R}from"./SearchVideo.12d5cc2e.js";import{_ as Y}from"./close-blc.0dd4d1a8.js";import"./close.0afef835.js";const q={name:"AgentAdd",inject:["common"],components:{Sidebar:L,SearchVideo:R},watch:{"common.state.SelectedLang":function(r,n){r&&r!=n&&Object.keys(this.error).length!=0&&this.validateData()}},created(){this.DictionaryAgencyService=new M},mounted(){this.getArtistList(),this.generateAgencyCode()},data(){return{managerDetails:[{nameKO:"",nameEN:"",email:"",phoneNumber:"",artistBelowList:[]}],totalManager:1,agencyCode:"",agencyNameEN:"",agencyNameKO:"",agencyAddressEN:"",agencyAddressKO:"",agencyAkaEN:"",agencyAkaKO:"",agencyEmail:"",phoneNumber:"",fax:"",siteLink:"",instagramLink:"",facebookLink:"",twitterLink:"",youtubeLink:"",artist:[],artistList:[],searchArtist:"",error:{},specialChars:/[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/}},methods:{validateData(){this.error={},this.agencyNameKO==""?this.error.agency_name_ko=this.$t("Error.requiredInput"):/[0-9]+/.test(this.agencyNameKO)?this.error.agency_name_ko=this.$t("Error.numberNotAll"):this.specialChars.test(this.agencyNameKO)&&(this.error.agency_name_ko=this.$t("Error.specialCharacter")),this.agencyNameEN==""?this.error.agency_name_en=this.$t("Error.requiredInput"):/[0-9]+/.test(this.agencyNameEN)?this.error.agency_name_en=this.$t("Error.numberNotAll"):this.specialChars.test(this.agencyNameEN)&&(this.error.agency_name_en=this.$t("Error.specialCharacter")),/[a-zA-Z]+/.test(this.phoneNumber)?this.error.phone_number=this.$t("Error.notAllowedCharacter"):this.specialChars.test(this.phoneNumber)&&(this.error.phone_number=this.$t("Error.specialCharacter")),/[a-zA-Z]+/.test(this.fax)?this.error.fax=this.$t("Error.notAllowedCharacter"):this.specialChars.test(this.fax)&&(this.error.fax=this.$t("Error.specialCharacter")),this.managerDetails.map((r,n)=>{r.nameKO==""?(this.error.nameKO||(this.error.nameKO=[]),this.error.nameKO[n]=this.$t("Error.requiredInput")):/[0-9]+/.test(r.nameKO)&&(this.error.nameKO=[],this.error.nameKO[n]=this.$t("Error.numberNotAll")),r.nameEN==""?(this.error.nameEN||(this.error.nameEN=[]),this.error.nameEN[n]=this.$t("Error.requiredInput")):/[0-9]+/.test(r.nameEN)&&(this.error.nameEN=[],this.error.nameEN[n]=this.$t("Error.numberNotAll")),/[a-zA-Z]+/.test(r==null?void 0:r.phoneNumber)?(this.error.manager_phone_number=[],this.error.manager_phone_number[n]=this.$t("Error.notAllowedCharacter")):this.specialChars.test(r==null?void 0:r.phoneNumber)&&(this.error.manager_phone_number=[],this.error.manager_phone_number[n]=this.$t("Error.specialCharacter")),r.artistBelowList.length<1&&(this.error.artist||(this.error.artist=[]),this.error.artist[n]=this.$t("Error.minimumRequired")),this.checkYoutube(),this.checkEmail(),this.checkManagerEmail(),this.checkURL(this.siteLink,"site_link"),this.checkURL(this.facebookLink,"facebook_link"),this.checkURL(this.instagramLink,"instagram_link"),this.checkURL(this.twitterLink,"twitter_link")})},addDictionaryAgency(){if(this.validateData(),Object.keys(this.error).length!=0)return window.scroll({top:0,left:0,behavior:"smooth"}),!1;let r=this.managerDetails.map(g=>({name_ko:g.nameKO,name_en:g.nameEN,email:g.email,phone:g.phoneNumber?g.phoneNumber:"",artists:g.artistBelowList.map(f=>f.title_id)})),n={name_en:this.agencyNameEN,name_ko:this.agencyNameKO,address_en:this.agencyAddressEN,address_ko:this.agencyAddressKO,aka_en:this.agencyAkaEN,aka_ko:this.agencyAkaKO,agency_code:this.agencyCode,email:this.agencyEmail,phone_number:this.phoneNumber,fax:this.fax,site_link:this.siteLink,instagram_link:this.facebookLink,facebook_link:this.facebookLink,twitter_link:this.twitterLink,youtube_link:this.youtubeLink,manager_details:[...r]};this.DictionaryAgencyService.addDictionaryAgency(n).then(g=>{g.status==200&&(K.fire({title:"Success"}),this.$router.push("/admin/agent-list"))}).catch(g=>{})},deleteManagerDetails(r){this.totalManager>1&&(this.totalManager=this.totalManager-1,this.managerDetails.splice(r,1))},getArtistList(){let r={artist_name:this.searchArtist?this.searchArtist:"",page:1,limit:20};this.DictionaryAgencyService.getArtistList(r).then(n=>{n.status==200&&(this.artistList=n.data.results.map(g=>({title_poster:g.profile_picture,title_name:g.artist_name,title_id:g.artist_id})))}).catch(n=>{})},generateAgencyCode(){this.DictionaryAgencyService.generateAgencyCode().then(r=>{r.status==200&&(this.agencyCode=r.data.generated_agency_code)}).catch(r=>{})},getArtistSearch(r){this.searchArtist=r,this.searchArtist==""?this.artistList=[]:this.getArtistList()},getArtistInput(r){this.artist=r},checkURL(r,n){if(r=="")return delete this.error[n],!0;if(this.isValidUrl(r))delete this.error[n];else return this.error[n]=this.$t("Error.validUrl"),!1},checkEmail(){if(this.agencyEmail=="")return delete this.error.email,!0;if(this.isValidEmail(this.agencyEmail))delete this.error.email;else return this.error.email=this.$t("Error.pleaseValidEmail"),!1},checkManagerEmail(){this.error.manager_email||(this.error.manager_email=[]),this.managerDetails.map((r,n)=>{if(r.email=="")return delete this.error.manager_email[n],!0;if(this.isValidEmail(r.email))delete this.error.manager_email[n];else return this.error.manager_email[n]=this.$t("Error.pleaseValidEmail"),!1}),this.error.manager_email.length==0&&delete this.error.manager_email},checkYoutube(){if(this.youtubeLink=="")return delete this.error.youtube_link,!0;if(this.matchYoutubeUrl(this.youtubeLink))delete this.error.youtube_link;else return this.error.youtube_link=this.$t("Error.pleaseValidYoutube"),!1},isChar:C,isValidUrl:U,isPhoneNumber:V,isValidEmail:w,matchYoutubeUrl:D,isIntegerNumber:O,isCharWithSpeailChar:x}},_=r=>(T("data-v-871c1a7a"),r=r(),I(),r),j={class:"admin-otr"},z={class:"admin-right"},P={class:"heading"},W=_(()=>t("span",null,[t("img",{src:B,alt:""})],-1)),Z={class:"cm-bck"},F={class:"frm-innr frm-wd-in"},J={class:"double"},G={class:"form-group"},H={class:"enter-dtl-innr"},Q={class:"frm-innr frm-wd-in"},X={class:"frm-heading"},$=_(()=>t("span",null,"*",-1)),ee={class:"double"},re={class:"form-group"},te=["placeholder"],ne={key:0,class:"error-txt"},ie={class:"form-group"},se=["placeholder"],oe={class:"form-group"},ae=["placeholder"],le={class:"frm-heading"},ce=_(()=>t("span",null,"*",-1)),de={class:"double"},he={class:"form-group"},me=["placeholder"],ue={key:0,class:"error-txt"},ge={class:"form-group"},pe=["placeholder"],_e={class:"form-group"},ye=["placeholder"],fe={class:"enter-dtl-innr"},be={class:"frm-innr frm-wd-in"},ke={class:"double"},ve={class:"form-group"},Ne=["placeholder"],Ee={key:0,class:"error-txt"},Ae={class:"form-group"},Le=["placeholder"],Ke={key:0,class:"error-txt"},Ce={class:"double"},Ue={class:"form-group"},Ve=["placeholder"],we={key:0,class:"error-txt"},De={class:"form-group"},Oe=["placeholder"],xe={key:0,class:"error-txt"},Se={class:"double"},Te={class:"form-group"},Ie=["placeholder"],Me={key:0,class:"error-txt"},Be={class:"form-group"},Re=["placeholder"],Ye={key:0,class:"error-txt"},qe={class:"double"},je={class:"form-group"},ze=["placeholder"],Pe={key:0,class:"error-txt"},We={class:"form-group"},Ze=["placeholder"],Fe={key:0,class:"error-txt"},Je={class:"material-filter-list"},Ge={class:"btn-group"},He=["onClick"],Qe=_(()=>t("img",{src:Y},null,-1)),Xe=[Qe],$e={class:"frm-innr"},er={class:"form-group"},rr=["placeholder","onUpdate:modelValue"],tr={key:0,class:"error-txt"},nr={class:"form-group"},ir=["placeholder","onUpdate:modelValue"],sr={key:0,class:"error-txt"},or={class:"frm-innr frm-wd-in"},ar={class:"double"},lr={class:"form-group"},cr=["placeholder","onUpdate:modelValue"],dr={key:0,class:"error-txt"},hr={class:"form-group"},mr=["placeholder","onUpdate:modelValue"],ur={key:0,class:"error-txt"},gr={class:"frm-innr w-100"},pr={class:"form-group"},_r={key:0,class:"error-txt"},yr={class:"btn-group justify-btwn"},fr=["value"];function br(r,n,g,f,e,a){const N=b("Sidebar"),E=b("SearchVideo");return l(),c(v,null,[m(" op "),t("div",j,[k(N),t("div",z,[t("h2",P,[W,y(s(r.$t("dictionary.agentList.agency")),1)]),t("div",Z,[t("h3",null,s(r.$t("dictionary.agent.addAgency")),1),t("div",F,[t("div",J,[t("div",G,[t("label",null,s(r.$t("dictionary.agent.id")),1),d(t("input",{type:"text",placeholder:"A0524",class:"form-control disabled","onUpdate:modelValue":n[0]||(n[0]=i=>e.agencyCode=i)},null,512),[[h,e.agencyCode]])])])]),t("div",H,[t("div",Q,[t("p",X,[y(s(r.$t("dictionary.agent.detailsKorean")),1),$]),t("div",ee,[t("div",re,[t("label",null,s(r.$t("dictionary.agent.agencyName"))+" ("+s(r.$t("dictionary.agent.ko"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.agencyNameText"),class:p(["form-control",e.error.agency_name_ko?"error-border":""]),"onUpdate:modelValue":n[1]||(n[1]=i=>e.agencyNameKO=i),onKeypress:n[2]||(n[2]=i=>a.isChar(i)),maxlength:"150"},null,42,te),[[h,e.agencyNameKO]]),e.error.agency_name_ko?(l(),c("span",ne,s(e.error.agency_name_ko),1)):m("v-if",!0)]),t("div",ie,[t("label",null,s(r.$t("dictionary.agent.aka"))+" ("+s(r.$t("dictionary.agent.ko"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.akaText"),class:"form-control","onUpdate:modelValue":n[3]||(n[3]=i=>e.agencyAkaKO=i),onKeypress:n[4]||(n[4]=i=>a.isChar(i)),maxlength:"150"},null,40,se),[[h,e.agencyAkaKO]])])]),t("div",oe,[t("label",null,s(r.$t("dictionary.agent.address"))+" ("+s(r.$t("dictionary.agent.ko"))+")",1),d(t("textarea",{placeholder:r.$t("dictionary.agent.addressText"),class:"form-control address-textarea","onUpdate:modelValue":n[5]||(n[5]=i=>e.agencyAddressKO=i),maxlength:"230"},null,8,ae),[[h,e.agencyAddressKO]])]),t("p",le,[y(s(r.$t("dictionary.agent.detailsEnglish")),1),ce]),t("div",de,[t("div",he,[t("label",null,s(r.$t("dictionary.agent.agencyName"))+" ("+s(r.$t("dictionary.agent.en"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.agencyNameText"),class:p(["form-control",e.error.agency_name_en?"error-border":""]),"onUpdate:modelValue":n[6]||(n[6]=i=>e.agencyNameEN=i),onKeypress:n[7]||(n[7]=i=>a.isChar(i)),maxlength:"150"},null,42,me),[[h,e.agencyNameEN]]),e.error.agency_name_en?(l(),c("span",ue,s(e.error.agency_name_en),1)):m("v-if",!0)]),t("div",ge,[t("label",null,s(r.$t("dictionary.agent.aka"))+" ("+s(r.$t("dictionary.agent.en"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.akaText"),class:"form-control","onUpdate:modelValue":n[8]||(n[8]=i=>e.agencyAkaEN=i),onKeypress:n[9]||(n[9]=i=>a.isChar(i)),maxlength:"150"},null,40,pe),[[h,e.agencyAkaEN]])])]),t("div",_e,[t("label",null,s(r.$t("dictionary.agent.address"))+" ("+s(r.$t("dictionary.agent.en"))+")",1),d(t("textarea",{placeholder:r.$t("dictionary.agent.addressText"),class:"form-control address-textarea","onUpdate:modelValue":n[10]||(n[10]=i=>e.agencyAddressEN=i),maxlength:"230"},null,8,ye),[[h,e.agencyAddressEN]])])])]),t("div",fe,[t("div",be,[t("div",ke,[t("div",ve,[t("label",null,s(r.$t("dictionary.agent.tel")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.telText"),class:p(["form-control",e.error.phone_number?"error-border":""]),"onUpdate:modelValue":n[11]||(n[11]=i=>e.phoneNumber=i),maxlength:"20",onKeypress:n[12]||(n[12]=i=>a.isPhoneNumber(i))},null,42,Ne),[[h,e.phoneNumber]]),e.error.phone_number?(l(),c("span",Ee,s(e.error.phone_number),1)):m("v-if",!0)]),t("div",Ae,[t("label",null,s(r.$t("dictionary.agent.fax")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.faxText"),class:p(["form-control",e.error.fax?"error-border":""]),"onUpdate:modelValue":n[13]||(n[13]=i=>e.fax=i),maxlength:"20",onKeypress:n[14]||(n[14]=i=>a.isIntegerNumber(i))},null,42,Le),[[h,e.fax]]),e.error.fax?(l(),c("span",Ke,s(e.error.fax),1)):m("v-if",!0)])]),t("div",Ce,[t("div",Ue,[t("label",null,s(r.$t("dictionary.agent.email")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.emailText"),class:p(["form-control",e.error.email?"error-border":""]),"onUpdate:modelValue":n[15]||(n[15]=i=>e.agencyEmail=i),onKeyup:n[16]||(n[16]=(...i)=>a.checkEmail&&a.checkEmail(...i))},null,42,Ve),[[h,e.agencyEmail]]),e.error.email?(l(),c("span",we,s(e.error.email),1)):m("v-if",!0)]),t("div",De,[t("label",null,s(r.$t("dictionary.agent.officialURL")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.urlText"),class:p(["form-control",e.error.site_link?"error-border":""]),"onUpdate:modelValue":n[17]||(n[17]=i=>e.siteLink=i),onKeyup:n[18]||(n[18]=i=>a.checkURL(e.siteLink,"site_link"))},null,42,Oe),[[h,e.siteLink]]),e.error.site_link?(l(),c("span",xe,s(e.error.site_link),1)):m("v-if",!0)])]),t("div",Se,[t("div",Te,[t("label",null,s(r.$t("dictionary.agent.youtube")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.youtubeText"),class:p(["form-control",e.error.youtube_link?"error-border":""]),"onUpdate:modelValue":n[19]||(n[19]=i=>e.youtubeLink=i),onKeyup:n[20]||(n[20]=(...i)=>a.checkYoutube&&a.checkYoutube(...i))},null,42,Ie),[[h,e.youtubeLink]]),e.error.youtube_link?(l(),c("span",Me,s(e.error.youtube_link),1)):m("v-if",!0)]),t("div",Be,[t("label",null,s(r.$t("dictionary.agent.facebook")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.facebookText"),class:p(["form-control",e.error.facebook_link?"error-border":""]),"onUpdate:modelValue":n[21]||(n[21]=i=>e.facebookLink=i),onKeyup:n[22]||(n[22]=i=>a.checkURL(e.facebookLink,"facebook_link"))},null,42,Re),[[h,e.facebookLink]]),e.error.facebook_link?(l(),c("span",Ye,s(e.error.facebook_link),1)):m("v-if",!0)])]),t("div",qe,[t("div",je,[t("label",null,s(r.$t("dictionary.agent.instagram")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.instagramText"),class:p(["form-control",e.error.instagram_link?"error-border":""]),"onUpdate:modelValue":n[23]||(n[23]=i=>e.instagramLink=i),onKeyup:n[24]||(n[24]=i=>a.checkURL(e.instagramLink,"instagram_link"))},null,42,ze),[[h,e.instagramLink]]),e.error.instagram_link?(l(),c("span",Pe,s(e.error.instagram_link),1)):m("v-if",!0)]),t("div",We,[t("label",null,s(r.$t("dictionary.agent.twitter")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.twitterText"),class:p(["form-control",e.error.twitter_link?"error-border":""]),"onUpdate:modelValue":n[25]||(n[25]=i=>e.twitterLink=i),onKeyup:n[26]||(n[26]=i=>a.checkURL(e.twitterLink,"twitter_link"))},null,42,Ze),[[h,e.twitterLink]]),e.error.twitter_link?(l(),c("span",Fe,s(e.error.twitter_link),1)):m("v-if",!0)])])])]),t("div",Je,[t("h3",null,s(r.$t("dictionary.agent.managerList")),1),t("div",Ge,[t("button",{type:"button",class:"btn outline blk-btn",onClick:n[27]||(n[27]=i=>{e.totalManager++,e.managerDetails.push({nameKO:"",nameEN:"",email:"",phoneNumber:"",artistBelowList:[]})})},s(r.$t("dictionary.agent.addMore")),1)])]),(l(!0),c(v,null,S(e.totalManager,(i,o)=>(l(),c("div",{class:"gray-bck",key:o},[e.totalManager>1?(l(),c("span",{key:0,class:"clsaddlist",onClick:u=>a.deleteManagerDetails(o)},Xe,8,He)):m("v-if",!0),t("div",$e,[t("div",er,[t("label",null,s(r.$t("dictionary.agent.managerName"))+" "+s(i)+" ("+s(r.$t("dictionary.agent.ko"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.koreanNameText"),class:p(["form-control",e.error.nameKO&&e.error.nameKO[o]?"error-border":""]),"onUpdate:modelValue":u=>e.managerDetails[o].nameKO=u,onKeypress:n[28]||(n[28]=u=>a.isCharWithSpeailChar(u)),maxlength:"150"},null,42,rr),[[h,e.managerDetails[o].nameKO]]),e.error.nameKO&&e.error.nameKO[o]?(l(),c("span",tr,s(e.error.nameKO[o]),1)):m("v-if",!0)]),t("div",nr,[t("label",null,s(r.$t("dictionary.agent.managerName"))+" "+s(i)+" ("+s(r.$t("dictionary.agent.en"))+")",1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.englishNameText"),class:p(["form-control",e.error.nameEN&&e.error.nameEN[o]?"error-border":""]),"onUpdate:modelValue":u=>e.managerDetails[o].nameEN=u,onKeypress:n[29]||(n[29]=u=>a.isCharWithSpeailChar(u)),maxlength:"150"},null,42,ir),[[h,e.managerDetails[o].nameEN]]),e.error.nameEN&&e.error.nameEN[o]?(l(),c("span",sr,s(e.error.nameEN[o]),1)):m("v-if",!0)])]),t("div",or,[t("div",ar,[t("div",lr,[t("label",null,s(r.$t("dictionary.agent.email")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.emailText"),class:p(["form-control",e.error.manager_email&&e.error.manager_email[o]?"error-border":""]),"onUpdate:modelValue":u=>e.managerDetails[o].email=u,onChange:n[30]||(n[30]=(...u)=>a.checkManagerEmail&&a.checkManagerEmail(...u))},null,42,cr),[[h,e.managerDetails[o].email]]),e.error.manager_email&&e.error.manager_email[o]?(l(),c("span",dr,s(e.error.manager_email[o]),1)):m("v-if",!0)]),t("div",hr,[t("label",null,s(r.$t("dictionary.agent.tel")),1),d(t("input",{type:"text",placeholder:r.$t("dictionary.agent.telText"),class:p(["form-control",e.error.manager_phone_number&&e.error.manager_phone_number[o]?"error-border":""]),"onUpdate:modelValue":u=>e.managerDetails[o].phoneNumber=u,maxlength:"20",onKeypress:n[31]||(n[31]=u=>a.isPhoneNumber(u))},null,42,mr),[[h,e.managerDetails[o].phoneNumber]]),e.error.manager_phone_number&&e.error.manager_phone_number[o]?(l(),c("span",ur,s(e.error.manager_phone_number[o]),1)):m("v-if",!0)])])]),t("div",gr,[t("div",pr,[t("label",null,s(r.$t("dictionary.agent.artist")),1),k(E,{onSearchInput:a.getArtistSearch,list:e.artistList,connectionValue:e.artist,connectionBelowList:e.managerDetails[o].artistBelowList,onConnectionInput:a.getArtistInput,type:"artist",class:"artist-cursor"},null,8,["onSearchInput","list","connectionValue","connectionBelowList","onConnectionInput"]),e.error.artist&&e.error.artist[o]?(l(),c("span",_r,s(e.error.artist[o]),1)):m("v-if",!0)])])]))),128)),t("div",yr,[t("input",{type:"submit",class:"btn org-btn",value:r.$t("button.save"),onClick:n[32]||(n[32]=(...i)=>a.addDictionaryAgency&&a.addDictionaryAgency(...i))},null,8,fr),t("button",{type:"button",class:"btn outline blk-btn",onClick:n[33]||(n[33]=i=>r.$router.push("/admin/agent-list"))},s(r.$t("button.back")),1)])])])])],2112)}const Lr=A(q,[["render",br],["__scopeId","data-v-871c1a7a"],["__file","D:/11-db-frontend/11_db/src/admin/views/Dictionary/AgentAdd.vue"]]);export{Lr as default};

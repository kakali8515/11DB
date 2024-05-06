import{_ as f,aJ as k,d as s,T as v,ay as S,r as d,o as _,c,p as y,a as t,k as I,t as i,b as u,w as g,v as m,n as h}from"./index.ace3f588.js";import{D as b,_ as D}from"./tag-data.2a22c0b0.js";const T={name:"AddSubCategory",components:{Sidebar:k},inject:["common"],data(){return{adminCategoryList:[],sub_category_name_en:"",sub_category_name_ko:"",currentCategoryId:null,error:{sub_category_name_en:"",sub_category_name_ko:"",currentCategoryId:""},specialChars:/[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/}},watch:{"common.state.SelectedLang":function(r,e){r&&r!=e&&this.getAdminDictionaryCategoryList(),Object.values(this.error).filter(l=>l.length>0).length!=0&&this.addSubCategory()}},mounted(){this.getAdminDictionaryCategoryList()},methods:{empty(r){this.error[r]=s(()=>"")},getAdminDictionaryCategoryList(){b.getAdminDictionaryCategoryList().then(r=>{r.status==200&&(this.adminCategoryList=r.data.results)}).catch(r=>{})},getCurrentcategoryId(r){this.currentCategoryId=r,this.error.currentCategoryId=s(()=>"")},addSubCategory(){if(this.error.sub_category_name_en=s(()=>""),this.error.sub_category_name_ko=s(()=>""),this.currentCategoryId||(this.error.currentCategoryId=s(()=>this.$t("Error.fieldRequired"))),this.sub_category_name_en==""?this.error.sub_category_name_en=s(()=>this.$t("Error.fieldRequired")):/[0-9]+/.test(this.sub_category_name_en)?this.error.sub_category_name_en=s(()=>this.$t("Error.numberNotAll")):this.specialChars.test(this.sub_category_name_en)&&(this.error.sub_category_name_en=s(()=>this.$t("Error.specialCharacter"))),this.sub_category_name_ko==""?this.error.sub_category_name_ko=s(()=>this.$t("Error.fieldRequired")):/[0-9]+/.test(this.sub_category_name_ko)?this.error.sub_category_name_ko=s(()=>this.$t("Error.numberNotAll")):this.specialChars.test(this.sub_category_name_ko)&&(this.error.sub_category_name_ko=s(()=>this.$t("Error.specialCharacter"))),Object.values(this.error).filter(e=>e.length>0).length!=0)return window.scroll({top:0,left:0,behavior:"smooth"}),!1;let r={parent_id:this.currentCategoryId,sub_category_name_en:this.sub_category_name_en,sub_category_name_ko:this.sub_category_name_ko};b.addSubCategory(r).then(e=>{e.status==200?(this.$router.push({name:"TagData"}),v.fire({title:this.$t("Error.success")})):e.response.status==400?(this.error.sub_category_name_en=s(()=>e.response.data.error),this.error.sub_category_name_ko=s(()=>e.response.data.error)):(this.error.sub_category_name_en=s(()=>""),this.error.sub_category_name_ko=s(()=>""))}).catch(e=>{})},backToPreviousScreen(){this.$router.push({name:"TagData"})},isChar:S}},w={class:"admin-otr"},E={class:"admin-right"},L={class:"heading"},A=t("span",null,[t("img",{src:D,alt:""})],-1),V={class:"cm-bck"},N={class:"frm-innr"},j={class:"form-group"},K={key:0,class:"error-txt"},q={class:"form-group"},B=["placeholder"],P={key:0,class:"error-txt"},R={class:"form-group"},$=["placeholder"],x={key:0,class:"error-txt"},O={class:"btn-group justify-btwn"},U=["value"];function z(r,e,l,J,o,n){const p=d("Sidebar"),C=d("SearchDropdown");return _(),c("div",w,[y(p),t("div",E,[t("h2",L,[A,I(i(r.$t("dictionary.tagTitle")),1)]),t("div",V,[t("h3",null,i(r.$t("dictionary.addSubCategory.title")),1),t("div",N,[t("div",j,[t("label",null,i(r.$t("dictionary.addTag.mainCategory")),1),y(C,{onDropdownValue:n.getCurrentcategoryId,search_type:o.currentCategoryId,searchTitleListItem:o.adminCategoryList,searchtitle:"category_name",searchvalue:"category_id",labelItem:r.$t("dictionary.select"),isError:!!o.error.currentCategoryId},null,8,["onDropdownValue","search_type","searchTitleListItem","labelItem","isError"]),o.error.currentCategoryId?(_(),c("span",K,i(o.error.currentCategoryId),1)):u("v-if",!0)]),t("div",q,[t("label",null,i(r.$t("dictionary.addSubCategory.englishSubCategory")),1),g(t("input",{type:"text",placeholder:r.$t("placeholder.conflict"),class:h(["form-control",o.error.sub_category_name_en?"error-border":""]),"onUpdate:modelValue":e[0]||(e[0]=a=>o.sub_category_name_en=a),onKeypress:e[1]||(e[1]=a=>n.isChar(a)),maxlength:"150",onKeyup:e[2]||(e[2]=a=>n.empty("sub_category_name_en"))},null,42,B),[[m,o.sub_category_name_en]]),o.error.sub_category_name_en?(_(),c("span",P,i(o.error.sub_category_name_en),1)):u("v-if",!0)]),t("div",R,[t("label",null,i(r.$t("dictionary.addSubCategory.koreanSubCategory")),1),g(t("input",{type:"text",placeholder:r.$t("placeholder.conflict"),class:h(["form-control",o.error.sub_category_name_ko?"error-border":""]),"onUpdate:modelValue":e[3]||(e[3]=a=>o.sub_category_name_ko=a),onKeypress:e[4]||(e[4]=a=>n.isChar(a)),maxlength:"150",onKeyup:e[5]||(e[5]=a=>n.empty("sub_category_name_ko"))},null,42,$),[[m,o.sub_category_name_ko]]),o.error.sub_category_name_ko?(_(),c("span",x,i(o.error.sub_category_name_ko),1)):u("v-if",!0)])]),t("div",O,[t("input",{type:"submit",class:"btn org-btn",value:r.$t("button.save"),onClick:e[6]||(e[6]=(...a)=>n.addSubCategory&&n.addSubCategory(...a))},null,8,U),t("button",{type:"button",class:"btn outline blk-btn",onClick:e[7]||(e[7]=(...a)=>n.backToPreviousScreen&&n.backToPreviousScreen(...a))},i(r.$t("button.back")),1)])])])])}const G=f(T,[["render",z],["__file","D:/workspace/11-db-frontend/11_db/src/admin/views/Dictionary/AddSubCategory.vue"]]);export{G as default};

import{_ as i,r,o,l as m,q as u,b as n,a,c as l,t as c,F as b,s as f,u as v}from"./index.ace3f588.js";const x={name:"Modal",props:["heading","bodyText","bodyText2","btnText1","showModal","btnText2","starRating"],methods:{confirm(){this.$emit("confirm")},close(){this.$emit("close")}}},y=["innerHTML"],k={class:"modal__content"},T={key:0},h={key:1},g={key:2,class:"movies-details-sec"},M={class:"startxt"},w={class:"md-star"},C={class:"modal__action"};function V(B,s,e,L,D,d){const _=r("vue-final-modal");return o(),m(_,{modelValue:e.showModal,"onUpdate:modelValue":s[2]||(s[2]=t=>e.showModal=t),classes:"modal-container","content-class":"modal-content","click-to-close":!1},{default:u(()=>[n(` <button class="modal__close" @click="close">\r
      <mdi-close></mdi-close>\r
      X\r
    </button> `),a("span",{class:"modal__title",innerHTML:e.heading},null,8,y),a("div",k,[e.bodyText?(o(),l("p",T,c(e.bodyText),1)):n("v-if",!0),e.bodyText2?(o(),l("p",h,c(e.bodyText2),1)):n("v-if",!0),e.starRating?(o(),l("div",g,[a("div",M,[a("div",w,[(o(),l(b,null,f(5,t=>a("img",{key:t,src:v,alt:"star"})),64))])])])):n("v-if",!0)]),a("div",C,[e.btnText2?(o(),l("button",{key:0,class:"btn orange-btn",onClick:s[0]||(s[0]=(...t)=>d.close&&d.close(...t))},c(e.btnText2),1)):n("v-if",!0),e.btnText1?(o(),l("button",{key:1,class:"btn orange-btn",onClick:s[1]||(s[1]=(...t)=>d.confirm&&d.confirm(...t))},c(e.btnText1),1)):n("v-if",!0)])]),_:1},8,["modelValue"])}const H=i(x,[["render",V],["__scopeId","data-v-94fcd891"],["__file","D:/workspace/11-db-frontend/11_db/src/components/Modal.vue"]]);export{H as M};

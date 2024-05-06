import{$ as T,Y as j,_ as V,o as z,c as P,a as F,t as R,B as Y,Z as W,a0 as X,a1 as A,a2 as H,r as O,l as q,q as G,s as U,p as Z,F as J,b as K}from"./index.ace3f588.js";function I(u){return u===void 0&&(u=""),`.${u.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function N(u){let{swiper:e,extendParams:f,on:r,emit:h}=u;const d="swiper-pagination";f({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:s=>s,formatFractionTotal:s=>s,bulletClass:`${d}-bullet`,bulletActiveClass:`${d}-bullet-active`,modifierClass:`${d}-`,currentClass:`${d}-current`,totalClass:`${d}-total`,hiddenClass:`${d}-hidden`,progressbarFillClass:`${d}-progressbar-fill`,progressbarOppositeClass:`${d}-progressbar-opposite`,clickableClass:`${d}-clickable`,lockClass:`${d}-lock`,horizontalClass:`${d}-horizontal`,verticalClass:`${d}-vertical`,paginationDisabledClass:`${d}-disabled`}}),e.pagination={el:null,$el:null,bullets:[]};let $,b=0;function B(){return!e.params.pagination.el||!e.pagination.el||!e.pagination.$el||e.pagination.$el.length===0}function o(s,a){const{bulletActiveClass:t}=e.params.pagination;s[a]().addClass(`${t}-${a}`)[a]().addClass(`${t}-${a}-${a}`)}function n(){const s=e.rtl,a=e.params.pagination;if(B())return;const t=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,l=e.pagination.$el;let i;const C=e.params.loop?Math.ceil((t-e.loopedSlides*2)/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(i=Math.ceil((e.activeIndex-e.loopedSlides)/e.params.slidesPerGroup),i>t-1-e.loopedSlides*2&&(i-=t-e.loopedSlides*2),i>C-1&&(i-=C),i<0&&e.params.paginationType!=="bullets"&&(i=C+i)):typeof e.snapIndex<"u"?i=e.snapIndex:i=e.activeIndex||0,a.type==="bullets"&&e.pagination.bullets&&e.pagination.bullets.length>0){const p=e.pagination.bullets;let y,w,D;if(a.dynamicBullets&&($=p.eq(0)[e.isHorizontal()?"outerWidth":"outerHeight"](!0),l.css(e.isHorizontal()?"width":"height",`${$*(a.dynamicMainBullets+4)}px`),a.dynamicMainBullets>1&&e.previousIndex!==void 0&&(b+=i-(e.previousIndex-e.loopedSlides||0),b>a.dynamicMainBullets-1?b=a.dynamicMainBullets-1:b<0&&(b=0)),y=Math.max(i-b,0),w=y+(Math.min(p.length,a.dynamicMainBullets)-1),D=(w+y)/2),p.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map(_=>`${a.bulletActiveClass}${_}`).join(" ")),l.length>1)p.each(_=>{const x=T(_),S=x.index();S===i&&x.addClass(a.bulletActiveClass),a.dynamicBullets&&(S>=y&&S<=w&&x.addClass(`${a.bulletActiveClass}-main`),S===y&&o(x,"prev"),S===w&&o(x,"next"))});else{const _=p.eq(i),x=_.index();if(_.addClass(a.bulletActiveClass),a.dynamicBullets){const S=p.eq(y),E=p.eq(w);for(let M=y;M<=w;M+=1)p.eq(M).addClass(`${a.bulletActiveClass}-main`);if(e.params.loop)if(x>=p.length){for(let M=a.dynamicMainBullets;M>=0;M-=1)p.eq(p.length-M).addClass(`${a.bulletActiveClass}-main`);p.eq(p.length-a.dynamicMainBullets-1).addClass(`${a.bulletActiveClass}-prev`)}else o(S,"prev"),o(E,"next");else o(S,"prev"),o(E,"next")}}if(a.dynamicBullets){const _=Math.min(p.length,a.dynamicMainBullets+4),x=($*_-$)/2-D*$,S=s?"right":"left";p.css(e.isHorizontal()?S:"top",`${x}px`)}}if(a.type==="fraction"&&(l.find(I(a.currentClass)).text(a.formatFractionCurrent(i+1)),l.find(I(a.totalClass)).text(a.formatFractionTotal(C))),a.type==="progressbar"){let p;a.progressbarOpposite?p=e.isHorizontal()?"vertical":"horizontal":p=e.isHorizontal()?"horizontal":"vertical";const y=(i+1)/C;let w=1,D=1;p==="horizontal"?w=y:D=y,l.find(I(a.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${w}) scaleY(${D})`).transition(e.params.speed)}a.type==="custom"&&a.renderCustom?(l.html(a.renderCustom(e,i+1,C)),h("paginationRender",l[0])):h("paginationUpdate",l[0]),e.params.watchOverflow&&e.enabled&&l[e.isLocked?"addClass":"removeClass"](a.lockClass)}function c(){const s=e.params.pagination;if(B())return;const a=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,t=e.pagination.$el;let l="";if(s.type==="bullets"){let i=e.params.loop?Math.ceil((a-e.loopedSlides*2)/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&!e.params.loop&&i>a&&(i=a);for(let C=0;C<i;C+=1)s.renderBullet?l+=s.renderBullet.call(e,C,s.bulletClass):l+=`<${s.bulletElement} class="${s.bulletClass}"></${s.bulletElement}>`;t.html(l),e.pagination.bullets=t.find(I(s.bulletClass))}s.type==="fraction"&&(s.renderFraction?l=s.renderFraction.call(e,s.currentClass,s.totalClass):l=`<span class="${s.currentClass}"></span> / <span class="${s.totalClass}"></span>`,t.html(l)),s.type==="progressbar"&&(s.renderProgressbar?l=s.renderProgressbar.call(e,s.progressbarFillClass):l=`<span class="${s.progressbarFillClass}"></span>`,t.html(l)),s.type!=="custom"&&h("paginationRender",e.pagination.$el[0])}function v(){e.params.pagination=j(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const s=e.params.pagination;if(!s.el)return;let a=T(s.el);a.length!==0&&(e.params.uniqueNavElements&&typeof s.el=="string"&&a.length>1&&(a=e.$el.find(s.el),a.length>1&&(a=a.filter(t=>T(t).parents(".swiper")[0]===e.el))),s.type==="bullets"&&s.clickable&&a.addClass(s.clickableClass),a.addClass(s.modifierClass+s.type),a.addClass(e.isHorizontal()?s.horizontalClass:s.verticalClass),s.type==="bullets"&&s.dynamicBullets&&(a.addClass(`${s.modifierClass}${s.type}-dynamic`),b=0,s.dynamicMainBullets<1&&(s.dynamicMainBullets=1)),s.type==="progressbar"&&s.progressbarOpposite&&a.addClass(s.progressbarOppositeClass),s.clickable&&a.on("click",I(s.bulletClass),function(l){l.preventDefault();let i=T(this).index()*e.params.slidesPerGroup;e.params.loop&&(i+=e.loopedSlides),e.slideTo(i)}),Object.assign(e.pagination,{$el:a,el:a[0]}),e.enabled||a.addClass(s.lockClass))}function g(){const s=e.params.pagination;if(B())return;const a=e.pagination.$el;a.removeClass(s.hiddenClass),a.removeClass(s.modifierClass+s.type),a.removeClass(e.isHorizontal()?s.horizontalClass:s.verticalClass),e.pagination.bullets&&e.pagination.bullets.removeClass&&e.pagination.bullets.removeClass(s.bulletActiveClass),s.clickable&&a.off("click",I(s.bulletClass))}r("init",()=>{e.params.pagination.enabled===!1?m():(v(),c(),n())}),r("activeIndexChange",()=>{(e.params.loop||typeof e.snapIndex>"u")&&n()}),r("snapIndexChange",()=>{e.params.loop||n()}),r("slidesLengthChange",()=>{e.params.loop&&(c(),n())}),r("snapGridLengthChange",()=>{e.params.loop||(c(),n())}),r("destroy",()=>{g()}),r("enable disable",()=>{const{$el:s}=e.pagination;s&&s[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)}),r("lock unlock",()=>{n()}),r("click",(s,a)=>{const t=a.target,{$el:l}=e.pagination;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&l&&l.length>0&&!T(t).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&t===e.navigation.nextEl||e.navigation.prevEl&&t===e.navigation.prevEl))return;const i=l.hasClass(e.params.pagination.hiddenClass);h(i===!0?"paginationShow":"paginationHide"),l.toggleClass(e.params.pagination.hiddenClass)}});const k=()=>{e.$el.removeClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass),v(),c(),n()},m=()=>{e.$el.addClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass),g()};Object.assign(e.pagination,{enable:k,disable:m,render:c,update:n,init:v,destroy:g})}function L(u){let{swiper:e,extendParams:f}=u;f({grid:{rows:1,fill:"column"}});let r,h,d;const $=o=>{const{slidesPerView:n}=e.params,{rows:c,fill:v}=e.params.grid;h=r/c,d=Math.floor(o/c),Math.floor(o/c)===o/c?r=o:r=Math.ceil(o/c)*c,n!=="auto"&&v==="row"&&(r=Math.max(r,n*c))},b=(o,n,c,v)=>{const{slidesPerGroup:g,spaceBetween:k}=e.params,{rows:m,fill:s}=e.params.grid;let a,t,l;if(s==="row"&&g>1){const i=Math.floor(o/(g*m)),C=o-m*g*i,p=i===0?g:Math.min(Math.ceil((c-i*m*g)/m),g);l=Math.floor(C/p),t=C-l*p+i*g,a=t+l*r/m,n.css({"-webkit-order":a,order:a})}else s==="column"?(t=Math.floor(o/m),l=o-t*m,(t>d||t===d&&l===m-1)&&(l+=1,l>=m&&(l=0,t+=1))):(l=Math.floor(o/h),t=o-l*h);n.css(v("margin-top"),l!==0?k&&`${k}px`:"")},B=(o,n,c)=>{const{spaceBetween:v,centeredSlides:g,roundLengths:k}=e.params,{rows:m}=e.params.grid;if(e.virtualSize=(o+v)*r,e.virtualSize=Math.ceil(e.virtualSize/m)-v,e.$wrapperEl.css({[c("width")]:`${e.virtualSize+v}px`}),g){n.splice(0,n.length);const s=[];for(let a=0;a<n.length;a+=1){let t=n[a];k&&(t=Math.floor(t)),n[a]<e.virtualSize+n[0]&&s.push(t)}n.push(...s)}};e.grid={initSlides:$,updateSlide:b,updateWrapperSize:B}}const Q={name:"SliderContent",props:{connection:Object,componentType:String},methods:{navigateToDetails(u){this.componentType=="tv"?this.$router.push({name:"TvShowsDetails",params:{id:u.id}}):this.componentType=="movie"?this.$router.push({name:"MoviesDetails",params:{id:u.id}}):this.componentType=="people"&&(this.connection.title_type=="tv"?this.$router.push({name:"TvShowsDetails",params:{id:u.id}}):this.$router.push({name:"MoviesDetails",params:{id:u.id}}))}}},ee={class:"slider-innr"},ae=["src"],se={key:1,src:Y,alt:""};function le(u,e,f,r,h,d){return z(),P("div",ee,[F("a",{class:"slider-pic",onClick:e[0]||(e[0]=$=>d.navigateToDetails(f.connection))},[F("figure",null,[f.connection.image.includes("https")?(z(),P("img",{key:0,src:f.connection.image,alt:""},null,8,ae)):(z(),P("img",se))]),F("p",null,R(f.connection.title),1)])])}const te=V(Q,[["render",le],["__file","D:/workspace/11-db-frontend/11_db/src/components/SliderContent.vue"]]),ie={name:"Slider",components:{Swiper:W,SwiperSlide:X,Grid:L,Pagination:N,Navigation:A,Autoplay:H,SliderContent:te},props:{connection_list:Array,componentType:String},setup(){return{onSwiper:f=>{},onSlideChange:()=>{},modules:[L,A,N,H]}}};function ne(u,e,f,r,h,d){var o;const $=O("SliderContent"),b=O("swiper-slide"),B=O("swiper");return z(),q(B,{modules:r.modules,slidesPerView:2,grid:{rows:((o=f.connection_list)==null?void 0:o.length)>2?2:1},spaceBetween:17,autoplay:!0,speed:2e3,navigation:"",pagination:{clickable:!0},breakpoints:{0:{},992:{}},onSwiper:r.onSwiper,onSlideChange:r.onSlideChange,class:"image-swiper"},{default:G(()=>[(z(!0),P(J,null,U(f.connection_list,(n,c)=>(z(),q(b,{key:c},{default:G(()=>[Z($,{connection:n,componentType:f.componentType},null,8,["connection","componentType"])]),_:2},1024))),128)),K(` <swiper-slide>\r
        <SliderContent /> \r
      </swiper-slide> `)]),_:1},8,["modules","grid","onSwiper","onSlideChange"])}const re=V(ie,[["render",ne],["__file","D:/workspace/11-db-frontend/11_db/src/components/Slider.vue"]]),pe="/assets/share-icon.16325dc7.svg";export{re as S,pe as _,te as a};

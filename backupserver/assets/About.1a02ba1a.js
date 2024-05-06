import{_ as i,C as o,o as r,c as u,a as t,t as s,b as l}from"./index.d6ed331f.js";const c={name:"About",emits:["on-current-theme-change"],inject:["common"],data(){return{title:"",aboutContent:""}},created(){this.CommonService=new o},watch:{"common.state.SelectedLang":function(e,a){e&&e!=a&&this.aboutUs()}},mounted(){localStorage.removeItem("site_language"),localStorage.removeItem("draft_ids"),this.aboutUs()},methods:{aboutUs(){this.CommonService.aboutUs().then(e=>{e.status==200&&(this.title=e.data.title,this.aboutContent=e.data.content)}).catch(e=>{})}}},m={class:"about-us"},p={class:"container"},d={class:"about-content"},h=["innerHTML"];function q(e,a,v,b,n,f){return r(),u("section",m,[t("div",p,[t("div",d,[t("h2",null,s(n.title),1),t("div",{innerHTML:n.aboutContent},null,8,h),l(` <ul>\r
          <li>\r
            <p>\r
              The standard Lorem Ipsum passage, used since the 1500s "Lorem\r
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\r
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\r
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut\r
              aliquip ex ea commodo consequat. Duis aute irure dolor in\r
              reprehenderit in voluptate velit esse cillum dolore eu fugiat\r
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,\r
              sunt in culpa qui officia deserunt mollit anim id est laborum."\r
            </p>\r
          </li>\r
\r
          <li>\r
            <p>\r
              Section 1.10.32 of "de Finibus Bonorum et Malorum", written by\r
              Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error\r
              sit voluptatem accusantium doloremque laudantium, totam rem\r
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi\r
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam\r
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed\r
              quia consequuntur magni dolores eos qui ratione voluptatem sequi\r
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor\r
              sit amet, consectetur, adipisci velit, sed quia non numquam eius\r
              modi tempora incidunt ut labore et dolore magnam aliquam quaerat\r
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem\r
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi\r
              consequatur? Quis autem vel eum iure reprehenderit qui in ea\r
              voluptate velit esse quam nihil molestiae consequatur, vel illum\r
              qui dolorem eum fugiat quo voluptas nulla pariatur?"\r
            </p>\r
          </li>\r
          <li>\r
            <p>\r
              1914 translation by H. Rackham "But I must explain to you how all\r
              this mistaken idea of denouncing pleasure and praising pain was\r
              born and I will give you a complete account of the system, and\r
              expound the actual teachings of the great explorer of the truth,\r
              the master-builder of human happiness. No one rejects, dislikes,\r
              or avoids pleasure itself, because it is pleasure, but because\r
              those who do not know how to pursue pleasure rationally encounter\r
              consequences that are extremely painful. Nor again is there anyone\r
              who loves or pursues or desires to obtain pain of itself, because\r
              it is pain, but because occasionally circumstances occur in which\r
              toil and pain can procure him some great pleasure. To take a\r
              trivial example, which of us ever undertakes laborious physical\r
              exercise, except to obtain some advantage from it? But who has any\r
              right to find fault with a man who chooses to enjoy a pleasure\r
              that has no annoying consequences, or one who avoids a pain that\r
              produces no resultant pleasure?"\r
            </p>\r
          </li>\r
          <li>\r
            <p>\r
              The standard Lorem Ipsum passage, used since the 1500s "Lorem\r
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\r
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\r
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut\r
              aliquip ex ea commodo consequat. Duis aute irure dolor in\r
              reprehenderit in voluptate velit esse cillum dolore eu fugiat\r
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,\r
              sunt in culpa qui officia deserunt mollit anim id est laborum."\r
            </p>\r
          </li>\r
\r
          <li>\r
            <p>\r
              Section 1.10.32 of "de Finibus Bonorum et Malorum", written by\r
              Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error\r
              sit voluptatem accusantium doloremque laudantium, totam rem\r
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi\r
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam\r
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed\r
              quia consequuntur magni dolores eos qui ratione voluptatem sequi\r
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor\r
              sit amet, consectetur, adipisci velit, sed quia non numquam eius\r
              modi tempora incidunt ut labore et dolore magnam aliquam quaerat\r
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem\r
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi\r
              consequatur? Quis autem vel eum iure reprehenderit qui in ea\r
              voluptate velit esse quam nihil molestiae consequatur, vel illum\r
              qui dolorem eum fugiat quo voluptas nulla pariatur?"\r
            </p>\r
          </li>\r
          <li>\r
            <p>\r
              1914 translation by H. Rackham "But I must explain to you how all\r
              this mistaken idea of denouncing pleasure and praising pain was\r
              born and I will give you a complete account of the system, and\r
              expound the actual teachings of the great explorer of the truth,\r
              the master-builder of human happiness. No one rejects, dislikes,\r
              or avoids pleasure itself, because it is pleasure, but because\r
              those who do not know how to pursue pleasure rationally encounter\r
              consequences that are extremely painful. Nor again is there anyone\r
              who loves or pursues or desires to obtain pain of itself, because\r
              it is pain, but because occasionally circumstances occur in which\r
              toil and pain can procure him some great pleasure. To take a\r
              trivial example, which of us ever undertakes laborious physical\r
              exercise, except to obtain some advantage from it? But who has any\r
              right to find fault with a man who chooses to enjoy a pleasure\r
              that has no annoying consequences, or one who avoids a pain that\r
              produces no resultant pleasure?"\r
            </p>\r
          </li>\r
        </ul> `)])])])}const w=i(c,[["render",q],["__file","D:/11-db-frontend/11_db/src/views/About.vue"]]);export{w as default};

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const pageURL = {};
const editorkey = ["List", "AwardList", "AwardEditBasicInfo", "AwardSectorAdd", "AwardAddRound", "AwardEdit", "AddNominee", "NewsManager"];
const adminkey = ["List", "AwardList", "AwardEditBasicInfo", "AwardSectorAdd", "AwardAddRound", "AwardEdit",
  "AddNominee", "NewsManager", "TagData", "AddMainCategory", "AddSubCategory", "AddTag",
  "EditTag", "AgentList", "AgentAdd", "AgentDetails", "AgentEdit", "DbContent", "UserFeedbackReport", "UserCommunityReport"]

function guest(to, from, next) {
  if (localStorage.token) {
    next({ path: from.fullPath });
    Toast.fire({ title: "You already logged in" });
  } else next();
}

function guard(to, from, next) {
  if (localStorage.token) {
    if (localStorage.is_admin == 'n') {
      if (to.path.includes('admin')) {
        next({ name: 'PageNotfound' });
      } else {
        next();
      }
    } else {
      if (to.path.includes('admin')) {
        if (localStorage.userType == 'editor' && editorkey.includes(to.name)) {
          next();
        } else if (localStorage.userType == 'admin' && adminkey.includes(to.name)) {
          next();
        } else if (localStorage.userType == 'super_admin') {
          next();
        } else {
          next({ name: 'PageNotfound' });
        }
      } else {
        next();
      }
    }
  } else {
    const parentRoute = from.matched.slice(-1)[0]?.name; // get the name of the parent route
    const modalPath = from.params.modal; // get the path of the modal (if any)
    const redirectPath = modalPath ? `/${parentRoute}/${modalPath}` : from.fullPath; // construct the redirect path including the modal (if any)
    localStorage.setItem('redirectPath', redirectPath); // save the path of the page and the modal (if any) the user is coming from
    next({ name: 'Login' }); // redirect to the login page
    Toast.fire({ title: t("router.loginAccess") });
  }
}

function webtoonGuard(to, from, next) {
  // if (localStorage.is_admin == 'y') {
  //   next();
  // } else next({ name: 'PageNotfound' });

  next();
}

function videoGuard(to, from, next) {
  if (localStorage.is_admin == 'y') {
    next();
  } else next({ name: 'PageNotfound' });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "pageTitle.Home",
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
      meta: {
        title: "footer.about",
      }
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('@/views/PrivacyPolicy.vue'),
      meta: {
        title: "footer.privacy",
      }
    },
    {
      path: '/terms-service',
      name: 'TermsService',
      component: () => import('@/views/TermsService.vue'),
      meta: {
        title: "footer.term",
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotfound',
      component: () => import('@/components/PageNotfound.vue'),
      meta: {
        title: "pagenotFound.paragraph",
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginPages/Login.vue"),
      beforeEnter: guest,
      meta: {
        title: "button.Login",
      }
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/LoginPages/Register.vue"),
      beforeEnter: guest,
      meta: {
        title: "register.title",
      }
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("@/views/LoginPages/ForgotPassword.vue"),
      beforeEnter: guest,
      meta: {
        title: "forgotPassword.title",
      }
    },
    {
      path: "/forgot-password-resend",
      name: "ForgotPasswordResend",
      component: () => import("@/views/LoginPages/ForgotPasswordResend.vue"),
      beforeEnter: guest,
      meta: {
        title: "forgotPassword.title",
      }
    },
    {
      path: "/setting-password/:id/:code?",
      name: "SettingPassword",
      component: () => import("@/views/LoginPages/SettingPassword.vue"),
      meta: {
        title: "forgotPassword.settingPassTitle",
      }
    },
    {
      path: "/my-page/activity",
      name: "MyPageActivity",
      component: () => import("@/views/MyPage/MyPageActivity.vue"),
    },
    {
      path: "/my-page/message",
      name: "MyPageMessage",
      component: () => import("@/views/MyPage/MyPageMessage.vue"),
    },
    {
      path: "/my-page/message-details",
      name: "MyPageMessageDetails",
      component: () => import("@/views/MyPage/MyPageMessageDetails.vue"),
    },
    {
      path: "/my-page/communication",
      name: "MyPageCommunication",
      component: () => import("@/views/MyPage/MyPageCommunication.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.mypageCommunication",
      }
    },
    {
      path: "/my-page/communication-no-data",
      name: "MyPageCommunicationNoData",
      component: () => import("@/views/MyPage/MyPageCommunicationNoData.vue"),
    },
    {
      path: "/my-page/lists",
      name: "MyPageLists",
      component: () => import("@/views/MyPage/MyPageLists.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.mypageList",
      }
    },
    {
      path: "/my-page/media",
      name: "MyPageMedia",
      component: () => import("@/views/MyPage/MyPageMedia.vue"),
    },
    {
      path: "/my-page/settings",
      name: "MyPageSettings",
      component: () => import("@/views/MyPage/MyPageSettings.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.mypageSettings",
      }
    },
    {
      path: "/my-page/withdrawal",
      name: "MyPageWithdrawal",
      component: () => import("@/views/MyPage/MyPageWithdrawal.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.deleteAccount",
      }
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/views/Contact.vue"),
      meta: {
        title: "footer.contact",
      }
    },
    {
      path: "/search-result",
      name: "SearchResult",
      component: () => import("@/views/Search/SearchResult.vue"),
      meta: {
        title: "searchResults.title",
      }
    },
    {
      path: "/search/tag-detail/:id?/:tagname?",
      name: "TagDetail",
      component: () => import("@/views/Search/TagDetail.vue"),
      meta: {
        title: "searchResults.searchRight.tags.title",
        type: "tag"
      }
    },
    {
      path: "/people/popular",
      name: "PeoplePopular",
      component: () => import("@/views/People/PeoplePopular.vue"),
      meta: {
        title: "popularPeople.header",
        type: "people"
      }
    },
    {
      path: "/people/detail-award/:id",
      name: "PeopleDetailAward",
      component: () => import("@/views/People/PeopleDetailAward.vue"),
      meta: {
        type: "people"
      }
    },
    {
      path: "/people/details/:id?",
      name: "PeopleDetails",
      component: () => import("@/views/People/PeopleDetails.vue"),
      meta: {
        type: "people"
      }
    },
    {
      path: "/people-media/:id",
      name: "PeopleMedia",
      component: () => import("@/views/People/PeopleMedia.vue"),
      meta: {
        type: "people"
      }
    },
    {
      path: "/awards/detail/:id",
      name: "AwardsDetail",
      component: () => import("@/views/Awards/AwardsDetail.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "award"
      }
    },
    {
      path: "/awards/popular",
      name: "AwardsPopular",
      component: () => import("@/views/Awards/AwardsPopular.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        title: "header.subMenu.AllEvents",
        type: "award"
      }
    },
    {
      path: "/movies/details/:id?",
      name: "MoviesDetails",
      component: () => import("@/views/Movies/MoviesDetails.vue"),
      meta: {
        type: "movie"
      }
    },
    {
      path: "/movies/popular",
      name: "MoviesPopular",
      component: () => import("@/views/Movies/MoviesPopular.vue"),
      meta: {
        title: "movies.moviesPopular",
        type: "movie"
      }
    },
    {
      path: "/movies/newest",
      name: "MoviesNewest",
      component: () => import("@/views/Movies/MoviesNewest.vue"),
      meta: {
        title: "movies.moviesNewest",
        type: "movie"
      }
    },
    {
      path: "/movies/upcoming",
      name: "MoviesUpcoming",
      component: () => import("@/views/Movies/MoviesUpcoming.vue"),
      meta: {
        title: "movies.moviesUpcoming",
        type: "movie"
      }
    },
    {
      path: "/movies/toprated",
      name: "MoviesTopRated",
      component: () => import("@/views/Movies/MoviesTopRated.vue"),
      meta: {
        title: "movies.moviesTopRated",
        type: "movie"
      }
    },
    {
      path: "/movies-media/:id",
      name: "MoviesMedia",
      component: () => import("@/views/Movies/MoviesMedia.vue"),
      meta: {
        type: "movie"
      }
    },
    {
      path: "/movies/movies-details-cast&crew/:id",
      name: "MoviesDetailsCast&Crew",
      component: () => import("@/views/Movies/MoviesDetailsCast&Crew.vue"),
      meta: {
        type: "movie"
      }
    },
    {
      path: "/movies/awards/:id",
      name: "MoviesDetailsAwards",
      component: () => import("@/views/Movies/MoviesDetailsAwards.vue"),
      meta: {
        type: "movie"
      }
    },
    {
      path: "/webtoons/detail/:id",
      name: "WebtoonsDetail",
      component: () => import("@/views/Webtoons/WebtoonsDetail.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/popular",
      name: "WebtoonsPopular",
      component: () => import("@/views/Webtoons/WebtoonsPopular.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        title: "webtoons.popular",
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/newest",
      name: "WebtoonNewest",
      component: () => import("@/views/Webtoons/WebtoonNewest.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        title: "webtoons.Newest",
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/going",
      name: "WebtoonGoing",
      component: () => import("@/views/Webtoons/WebtoonGoing.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        title: "webtoons.ongoing",
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/complete",
      name: "CompletedWebtoon",
      component: () => import("@/views/Webtoons/CompletedWebtoon.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        title: "webtoons.complete",
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/webtoon-media/:id/:season_id",
      name: "WebtoonMedia",
      component: () => import("@/views/Webtoons/WebtoonMedia.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/details-episodes/:id/:season_id",
      name: "WebtoonDetailsEpisode",
      component: () => import("@/views/Webtoons/WebtoonDetailsEpisode.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/character&crew/:id/:season_id",
      name: "WebtoonDetailsChar&Crew",
      component: () => import("@/views/Webtoons/WebtoonDetailsChar&Crew.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "webtoons"
      }
    },
    {
      path: "/webtoons/awards/:id",
      name: "WebtoonDetailsAwards",
      component: () => import("@/views/Webtoons/WebtoonDetailsAwards.vue"),
      beforeEnter: webtoonGuard,
      meta: {
        type: "webtoons"
      }
    },
    {
      path: "/tvshows/popular",
      name: "TvShowsPopular",
      component: () => import("@/views/TvShows/TvShowsPopular.vue"),
      meta: {
        title: "tvShows.tvShowsPopular",
        type: "tv"
      }
    },
    {
      path: "/tvshows/details/:id?",
      name: "TvShowsDetails",
      component: () => import("@/views/TvShows/TvShowsDetails.vue"),
      meta: {
        type: "tv"
      }
    },
    {
      path: "/tvshows/details-episodes/:id/:season_id",
      name: "TvShowsDetailsEpisodes",
      component: () => import("@/views/TvShows/TvShowsDetailsEpisodes.vue"),
      meta: {
        type: "tv"
      }
    },
    {
      path: "/tvshows/details-media/:id/:season_id",
      name: "TvShowMedia",
      component: () => import("@/views/TvShows/TvShowMedia.vue"),
      meta: {
        type: "tv"
      }
    },
    {
      path: "/tvshows/cast&crew/:id/:season_id",
      name: "TvShowsDetailsCast&Crew",
      component: () => import("@/views/TvShows/TvShowsDetailsCast&Crew.vue"),
      meta: {
        type: "tv"
      }
    },
    {
      path: "/tvshows/newest",
      name: "TvShowsNewest",
      component: () => import("@/views/TvShows/TvShowsNewest.vue"),
      meta: {
        title: "tvShows.tvShowsNewest",
        type: "tv"
      }
    },
    {
      path: "/tvshows/upcoming",
      name: "TvShowsUpcoming",
      component: () => import("@/views/TvShows/TvShowsUpcoming.vue"),
      meta: {
        title: "tvShows.tvShowsUpcoming",
        type: "tv"
      }
    },
    {
      path: "/tvshows/toprated",
      name: "TvShowsTopRated",
      component: () => import("@/views/TvShows/TvShowsTopRated.vue"),
      meta: {
        title: "tvShows.tvShowsTopRated",
        type: "tv"
      }
    },
    {
      path: "/tvshows/awards/:id",
      name: "TvShowsDetailsAwards",
      component: () => import("@/views/TvShows/TvShowsDetailsAwards.vue"),
      type: "tv"
    },
    {
      path: "/video/popular",
      name: "VideoPopular",
      component: () => import("@/views/Video/VideoPopular.vue"),
      beforeEnter: videoGuard,
      meta: {
        title: "videos.popularVideo",
        type: "video"
      }
    },
    {
      path: "/video/newest",
      name: "VideoNewest",
      component: () => import("@/views/Video/VideoNewest.vue"),
      beforeEnter: videoGuard,
      meta: {
        title: "videos.newestVideo",
        type: "video"
      }
    },
    {
      path: "/video/trailer",
      name: "VideoTrailer",
      component: () => import("@/views/Video/VideoTrailer.vue"),
      beforeEnter: videoGuard,
      meta: {
        title: "videos.trailerVideo",
        type: "video"
      }
    },
    {
      path: "/register/complete",
      name: "RegisterComplete",
      component: () => import("@/views/LoginPages/RegisterComplete.vue"),
      meta: {
        title: "register.congratulation",
      }
    },
    //add new movie
    {
      path: "/AddNewMovie",
      name: "AddNewMovie",
      component: () => import("@/views/AddNewMovie/AddNewMovie.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.movie",
        type: "movie"
      }
    },
    {
      path: "/AddNewMovieForm/:external_id?/:type/:id?",
      name: "AddNewMovieForm",
      component: () => import("@/views/AddNewMovie/AddNewMovieForm.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.movie",
        type: "movie"
      }
    },
    //add new tv
    {
      path: "/add-new-tv",
      name: "AddNewTV",
      component: () => import("@/views/AddNewTV/AddNewTV.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.tvShows",
        type: "tv"
      }
    },
    {
      path: "/add-tv-details/:external_id?/:type/:id?",
      name: "AddNewTVDetails",
      component: () => import("@/views/AddNewTV/AddNewTVDetails.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.tvShows",
        type: "tv"
      }
    },
    {
      path: "/AddNewPeople",
      name: "AddNewPeople",
      component: () => import("@/views/AddPeople/AddNewPeople.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.People",
        type: "people"
      }
    },
    {
      path: "/AddNewPeopleForm/:external_id?/:type/:id?",
      name: "AddNewPeopleForm",
      component: () => import("@/views/AddPeople/AddNewPeopleForm.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.People",
        type: "people"
      }
    },
    {
      path: "/AddNewWebtoon",
      name: "AddNewWebtoon",
      component: () => import("@/views/AddNewWebtoon/AddNewWebtoon.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.webtoon",
        type: "webtoons"
      }
    },
    {
      path: "/add-webtoon-details/:external_id?/:type/:id?",
      name: "AddNewWebtoonDetails",
      component: () => import("@/views/AddNewWebtoon/AddNewWebtoonDetails.vue"),
      beforeEnter: guard,
      meta: {
        title: "header.addSection.webtoon",
        type: "webtoons"
      }
    },

    //admin
    {
      path: "/admin/news-manager",
      name: "NewsManager",
      component: () => import("@/admin/views/News/NewsManager.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.news",
      }
    },
    {
      path: "/admin/edit-list",
      name: "List",
      component: () => import("@/admin/views/Edit/List.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.list",
      }
    },
    {
      path: "/admin/tag-data",
      name: "TagData",
      component: () => import("@/admin/views/Dictionary/TagData.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.tag",
      }
    },
    {
      path: "/admin/add-main-category",
      name: "AddMainCategory",
      component: () => import("@/admin/views/Dictionary/AddMainCategory.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addMainCategory",
      }
    },
    {
      path: "/admin/add-tag",
      name: "AddTag",
      component: () => import("@/admin/views/Dictionary/AddTag.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addTag",
      }
    },
    {
      path: "/admin/add-sub-category",
      name: "AddSubCategory",
      component: () => import("@/admin/views/Dictionary/AddSubCategory.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addSubCategory",
      }
    },
    {
      path: "/admin/edit-tag/:id?",
      name: "EditTag",
      component: () => import("@/admin/views/Dictionary/EditTag.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.editTag",
      }
    },
    {
      path: "/admin/agent-list",
      name: "AgentList",
      component: () => import("@/admin/views/Dictionary/AgentList.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.agent",
      }
    },
    {
      path: "/admin/agent-add",
      name: "AgentAdd",
      component: () => import("@/admin/views/Dictionary/AgentAdd.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.agentAdd",
      }
    },
    {
      path: "/admin/agent-edit/:id",
      name: "AgentEdit",
      component: () => import("@/admin/views/Dictionary/AgentEdit.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.agentEdit",
      }
    },
    {
      path: "/admin/agent-details/:id?",
      name: "AgentDetails",
      component: () => import("@/admin/views/Dictionary/AgentDetails.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.agentDetails",
      }
    },
    {
      path: "/admin/priority",
      name: "Priority",
      component: () => import("@/admin/views/DataManagement/Priority.vue"),
      meta: {
        title: "pageTitle.admin.priority",
      }
    },
    {
      path: "/admin/worklist",
      name: "Worklist",
      component: () => import("@/admin/views/BulkWorking/Worklist.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.bulkwork",
      }
    },
    {
      path: "/admin/import-list",
      name: "ImportList",
      component: () => import("@/admin/views/BulkWorking/ImportList.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.import",
      }
    },
    {
      path: "/admin/export-list",
      name: "ExportList",
      component: () => import("@/admin/views/BulkWorking/ExportList.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.export",
      }
    },
    {
      path: "/admin/import-upload",
      name: "ImportUpload",
      component: () => import("@/admin/views/BulkWorking/ImportUpload.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.importUpload",
      }
    },
    {
      path: "/admin/import-status/:id?",
      name: "ImportStatus",
      component: () => import("@/admin/views/BulkWorking/ImportStatus.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.importStatus",
      }
    },
    // new admin page added
    {
      path: "/admin/FrontLists",
      name: "FrontLists",
      component: () => import("@/admin/views/Settings/FrontLists.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.frontList",
      }
    },
    {
      path: "/admin/addPolicy/:type/:id?",
      name: "FrontListsAddPolicy",
      component: () => import("@/admin/views/Settings/AddPolicy.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addPolicy",
      }
    },
    {
      path: "/admin/policyDetails/:type/:id",
      name: "FrontListsPolicyDetails",
      component: () => import("@/admin/views/Settings/PolicyDetails.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.policyDetails",
      }
    },
    {
      path: "/admin/NewsEdit",
      name: "NewsEdit",
      component: () => import("@/admin/views/Settings/NewsEdit.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.topNews",
      }
    },
    {
      path: "/admin/UserManagementList",
      name: "UserManagementList",
      component: () => import("@/admin/views/Settings/UserManagementList.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.userList",
      }
    },
    {
      path: "/admin/addUser/:id?",
      name: "UserManagementAddUser",
      component: () => import("@/admin/views/Settings/AddUser.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addUser",
      }
    },
    {
      path: "/admin/userDetails/:id",
      name: "UserManagementDetails",
      component: () => import("@/admin/views/Settings/UserDetails.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.userDetails",
      }
    },
    {
      path: "/admin/AwardList",
      name: "AwardList",
      component: () => import("@/admin/views/Edit/AwardList.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.award",
      }
    },
    {
      path: "/admin/AwardEdit/:id?",
      name: "AwardEdit",
      component: () => import("@/admin/views/Edit/AwardEdit.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addAward",
      }
    },
    {
      path: "/admin/AwardEditBasicInfo/:id",
      name: "AwardEditBasicInfo",
      component: () => import("@/admin/views/Edit/AwardEditBasicInfo.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.AwardsDetails",
      }
    },
    {
      path: "/admin/AwardSectorAdd/:award_id/:id?",
      name: "AwardSectorAdd",
      component: () => import("@/admin/views/Edit/SectorAdd.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addSector",
      }
    },
    {
      path: "/admin/addRound/:award_id/:round_id?",
      name: "AwardAddRound",
      component: () => import("@/admin/views/Edit/AddRound.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addRound",
      }
    },
    {
      path: "/admin/addNominee/:award_id/:round_id/:nominee_id?",
      name: "AddNominee",
      component: () => import("@/admin/views/Edit/AddNominee.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.addNominee",
      }
    },
    {
      path: "/admin/dbContent",
      name: "DbContent",
      component: () => import("@/admin/views/AdminAnalytics/DbContent.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.dbContent",
      }
    },
    {
      path: "/admin/user-feedback-report",
      name: "UserFeedbackReport",
      component: () => import("@/admin/views/AdminAnalytics/UserFeedbackReport.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.feedback",
      }
    },
    {
      path: "/admin/community-report",
      name: "UserCommunityReport",
      component: () => import("@/admin/views/AdminAnalytics/UserCommunityReport.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.community",
      }
    },
    {
      path: "/admin/user-statistic",
      name: "UserStatistics",
      component: () => import("@/admin/views/UserStatistics/UserStatisticsReport.vue"),
      beforeEnter: guard,
      meta: {
        title: "pageTitle.admin.statistic",
      }
    },

  ]
})

router.afterEach((to, from, next) => {
  const titleFromParams = to.params?.pageTitle
  if (titleFromParams) {
    document.title = `${titleFromParams} - 11DB`
  } else if (to.meta?.title) {
    document.title = `${t(to.meta?.title)} - 11DB` ?? '11DB'
  }
})

export default router

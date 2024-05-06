import { reactive } from "vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const state = reactive({
  userId: localStorage.getItem("uid") ? localStorage.getItem("uid") : "",
  name: "",
  myIP: cookies.get("myIP"),
  SelectedLang: localStorage.getItem("selectedLang") ? localStorage.getItem("selectedLang") : '',
  searchText: localStorage.getItem("searchText") ? localStorage.getItem("searchText") : '',
  searchType: localStorage.getItem("searchType") ? localStorage.getItem("searchType") : '',
  userType: localStorage.getItem("userType") ? localStorage.getItem("userType") : "",
  is_admin: localStorage.getItem("is_admin") ? localStorage.getItem("is_admin") : "",
  is_webtoon_display: localStorage.getItem("is_admin") == 'y' ? true : true,
  is_video_display: localStorage.getItem("is_admin") == 'y' ? true : false,
  visit_id: "",
  statistic_id: ""
});

const methods = {
  updateSearchText(newSearchtext) {
    state.searchText = newSearchtext
  },
  updateSearchType(newSearchType) {
    state.searchType = newSearchType
  },
  updateLang(lang) {
    state.SelectedLang = lang;
  }
};

export default {
  state,
  methods,
};

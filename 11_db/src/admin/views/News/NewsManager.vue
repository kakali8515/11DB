<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/nws-icon.svg" alt="" /></span>{{ $t("dictionary.news.title") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.news.keyword") }}</label>
            <input type="text" :placeholder="$t('dictionary.news.keywordText')" class="form-control"
              v-model="search_text" />
          </div>
          <div class="btn-group">
            <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="searchNewsList" />
            <button type="button" class="btn outline blk-btn" @click="resetList()">
              {{ $t("button.reset") }}
            </button>
          </div>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <h3>{{ $t("dictionary.news.newsList") }}</h3>
        <div class="table-inner-scroll news-data">
          <table class="table-otr table-innr">
            <thead>
              <tr>
                <th>{{ $t("dictionary.news.keyword") }}</th>
                <th>{{ $t("dictionary.news.date") }}</th>
                <th>{{ $t("dictionary.news.activeInactive") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="newsList.length > 0">
                <tr v-for="news in newsList" :key="news.news_id">
                  <td>
                    {{ news.news_keyword }}
                  </td>
                  <td>{{ news.news_publish_date }}</td>
                  <td>
                    <div class="switch-innr">
                      <label class="switch">
                        <input type="checkbox" @click="newsUpdateStatus($event, news)"
                          :checked="news.news_status == 'active' ? true : false" />
                        <small></small>
                      </label>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="3" class="center">
                    <p>{{ $t("dictionary.noData") }}</p>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <template v-if="newsList?.length > 0">
          <pagination v-model="page" :records="total_news_records" :per-page="limit" :options="chunkPage"
            @paginate="clickInternalPage" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import NewManagerService from "@/admin/services/NewsManagerService";
import Toast from "@/alert/alert.js";

export default {
  name: "NewsManager",
  components: { Sidebar },
  inject: ["common"],

  data() {
    return {
      newsList: [],
      search_text: "",
      page: 1,
      total_news_records: 0,
      limit: 10,
      chunkPage: { chunk: 5 },
      status: "",
    };
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.getNewsList();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getNewsList();
    },
  },
  methods: {
    //pagination
    clickInternalPage(click) {
      this.page = click;
      this.getNewsList();
    },
    searchNewsList() {
      this.page = 1;
      this.getNewsList();
    },
    //change news status
    newsUpdateStatus(event, news) {
      if (event.target.checked == true) {
        this.status = "active";
      } else {
        this.status = "inactive";
      }

      let data = {
        news_id: news.news_id,
        status: this.status,
      };
      NewManagerService.newsManagerUpdateStatus(data)
        .then((response) => {
          if (response.status == 200) {
            Toast.fire({ title: response.data.message });
          }
        })
        .catch((err) => {
          return;
        });
    },
    //get news list
    getNewsList() {
      let data = {
        search_text: this.search_text,
        page: this.page,
        limit: this.limit,
      };
      NewManagerService.getNewsManagerList(data)
        .then((response) => {
          if (response.status == 200) {
            this.newsList = response.data.news_list;
            this.total_news_records = response.data.total_records;
          }
        })
        .catch((err) => {
          return;
        });
    },
    //reset list
    resetList() {
      this.search_text = "";
      this.page = 1;
      this.getNewsList();
    },
  },
};
</script>
<style scoped>
.center {
  text-align: center;
}
</style>

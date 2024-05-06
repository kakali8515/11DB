<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/front-list.svg" alt="" /></span
        >{{ $t("sideBar.subMenu.Front lists") }}
      </h2>

      <div class="cm-bck mt-30">
        <h3>{{ $t("frontlist.editTopNews") }}</h3>
        <div class="tab-outr admin-tab">
          <TabWrapper
            v-if="titleList?.length > 0"
            @selectedTab="onChangeTab"
            priorityLoopTab="true"
          >
            <Tabs
              v-for="title in titleList"
              :title="title.title"
              :key="title.value"
            >
              <div class="url-search-bx">
                <div class="form-group">
                  <label>{{ $t("frontlist.feedURL") }}</label>
                  <div class="searchDv">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="
                        (list_type == 'movie'
                          ? 'https://zapzee.net/tag/movie/feed/'
                          : list_type == 'webtoon'
                          ? 'https://zapzee.net/tag/webtoon/feed/'
                          : 'https://zapzee.net/tag/drama/feed/')
                      "
                      v-model="refreshText"
                      :class="errorRefreshText ? 'error-border' : ''"
                    />

                    <button class="redoutlineBtn" @click="refreshTopNews">
                      {{ $t("frontlist.refresh") }}
                    </button>
                  </div>
                  <span v-if="errorRefreshText" class="error-txt"
                    >{{ errorRefreshText }}
                  </span>
                </div>
              </div>

              <div class="table-inner-scroll frontlisting">
                <table class="table-otr table-innr">
                  <thead>
                    <tr>
                      <th>{{ $t("bulk.worklist.title") }}</th>
                      <th>{{ $t("dictionary.news.date") }}</th>
                      <th>{{ $t("dictionary.news.activeInactive") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="topNewsList.length > 0">
                      <tr v-for="news in topNewsList" :key="news.news_id">
                        <td v-html="news.title"></td>
                        <td>{{ news.news_publish_date }}</td>
                        <td>
                          <div class="switch-innr">
                            <label class="switch">
                              <input
                                type="checkbox"
                                @click="newsUpdateStatus($event, news)"
                                :checked="
                                  news.status == 'active' ? true : false
                                "
                              />
                              <small></small>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="2" class="center">
                          <p>{{ $t("dictionary.noData") }}</p>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </Tabs>
          </TabWrapper>
          <template v-if="topNewsList?.length > 0">
            <pagination
              v-model="page"
              :records="total_news_records"
              :per-page="limit"
              :options="chunkPage"
              @paginate="clickInternalPage"
            />
          </template>
        </div>

        <div class="btn-group justify-btwn">
          <div class="twoBtn"></div>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="$router.push('/admin/FrontLists')"
          >
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import FrontListServices from "@/admin/services/FrontListServices";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { ref, watch, onMounted, computed } from "@vue/runtime-core";
import { inject } from "vue";
import i18n from "@/config/i18n";
import Toast from "@/alert/alert.js";
const { t } = i18n.global;

const topNewsList = ref([]);
const common = inject("common");
const page = ref(1);
const limit = ref(10);
const total_news_records = ref(0);
const list_type = ref("movie");
const refreshText = ref("");
const errorRefreshText = ref("");
const chunkPage = ref({ chunk: 5 });
const titleList = computed(() => [
  { title: "header.mainMenu.Movies", value: "movie" },
  { title: "header.mainMenu.TVShows", value: "tv_show" },
  { title: "header.mainMenu.Webtoons", value: "webtoon" },
]);

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getTopNewsList();
    }
  }
);

onMounted(() => {
  getTopNewsList();
});

// news List
const getTopNewsList = () => {
  const newsPayload = {
    page: page.value,
    limit: limit.value,
    list_type: list_type.value,
  };
  FrontListServices.getTopNewsList(newsPayload)
    .then((res) => {
      if (res.status == 200) {
        topNewsList.value = res.data.news_list;
        total_news_records.value = res.data.total_records;
      }
    })
    .catch((err) => {
      return;
    });
};

//change news status
const newsUpdateStatus = (event, news) => {
  let status;
  if (event.target.checked == true) {
    status = "active";
  } else {
    status = "inactive";
  }
  let data = {
    news_id: news.news_id,
    id: news.id,
    status: status,
    list_type: list_type.value,
  };
  FrontListServices.topNewsUpdateStatus(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        getTopNewsList();
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

//refresh top news
const refreshTopNews = () => {
  if (refreshText.value == "") {
    errorRefreshText.value = t("Error.requiredInput");
    return;
  } else errorRefreshText.value = "";
  let data = {
    list_type: list_type.value,
    feed_url: refreshText.value,
  };
  FrontListServices.refreshTopNews(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        getTopNewsList();
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

// pagination
const clickInternalPage = (click) => {
  page.value = click;
  getTopNewsList();
};

const onChangeTab = (tab) => {
  let selectedTab = titleList.value.find((tabs) => {
    return tab == tabs.title;
  });
  list_type.value = selectedTab.value;
  getTopNewsList();
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

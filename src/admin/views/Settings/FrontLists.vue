<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/front-list.svg" alt="" /></span
        >{{ $t("sideBar.subMenu.Front lists") }}
      </h2>

      <div class="cm-bck mt-30">
        <h3 v-if="selectTab == 'frontlist.main'">
          {{ $t("priority.listing") }}
        </h3>
        <h3 v-else>{{ $t("sideBar.subMenu.Front lists") }}</h3>

        <div class="tab-outr admin-tab">
          <TabWrapper @selectedTab="onChangeTab" :activeTab="selectTab">
            <Tabs title="frontlist.main">
              <div class="table-inner-scroll frontlisting">
                <table class="table-otr table-innr">
                  <thead>
                    <tr>
                      <th>{{ $t("frontlist.Area") }}</th>
                      <th>{{ $t("dictionary.news.activeInactive") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="mainList.length > 0">
                      <tr v-for="main in mainList" :key="main.area_key">
                        <td
                          :class="
                            main.area_key == 'top_news' ? 'cursor-pointer' : ''
                          "
                          @click="
                            main.area_key == 'top_news'
                              ? $router.push('/admin/NewsEdit')
                              : ''
                          "
                        >
                          {{ main.area_name }}
                        </td>
                        <td>
                          <div class="switch-innr">
                            <label class="switch">
                              <input
                                type="checkbox"
                                @click="newsUpdateStatus($event, main)"
                                :checked="
                                  main.status == 'active' ? true : false
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
                        <td colspan="3" class="center">
                          <p>{{ $t("dictionary.noData") }}</p>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </Tabs>
            <Tabs title="frontlist.footer">
              <div class="rounded-tab">
                <TabWrapper
                  @selectedTab="onChangeSubTab"
                  :activeTab="selectSubTab"
                >
                  <Tabs title="frontlist.privacyPolicy">
                    <div class="round-tab-content">
                      <div class="rounded-tab-head">
                        <h2>{{ $t("frontlist.privacyPolicy") }}</h2>
                        <div class="frm-innr">
                          <button
                            @click="addPolicyRedirection"
                            type="button"
                            class="btn or-btn"
                          >
                            {{ $t("addNewPeople.mediadetails.+add") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                  <Tabs title="frontlist.termsOfUse">
                    <div class="round-tab-content">
                      <div class="rounded-tab-head">
                        <h2>{{ $t("frontlist.termsOfUse") }}</h2>
                        <div class="frm-innr">
                          <button
                            @click="addPolicyRedirection"
                            type="button"
                            class="btn or-btn"
                          >
                            {{ $t("addNewPeople.mediadetails.add+") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                  <Tabs title="frontlist.aboutUs">
                    <div class="round-tab-content">
                      <div class="rounded-tab-head">
                        <h2>{{ $t("frontlist.aboutUs") }}</h2>
                        <div class="frm-innr">
                          <button
                            @click="addPolicyRedirection"
                            type="button"
                            class="btn or-btn"
                          >
                            {{ $t("addNewPeople.mediadetails.add+") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </TabWrapper>
              </div>

              <div class="table-inner-scroll frontlisting">
                <table class="table-otr table-innr smtable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{{ $t("bulk.worklist.title") }}</th>
                      <th>{{ $t("dictionary.news.date") }}</th>
                      <th>{{ $t("dictionary.news.activeInactive") }}</th>
                      <th>{{ $t("dictionary.tagSearch.action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="footerList.length > 0">
                      <tr
                        v-for="(footer, index) in footerList"
                        :key="footer.id"
                      >
                        <td>{{ (page - 1) * limit + (index + 1) }}</td>
                        <td>
                          {{ footer.title }}
                        </td>
                        <td>{{ dateformat(footer.published_at) }}</td>
                        <td>
                          <div class="switch-innr">
                            <label class="switch">
                              <input
                                type="checkbox"
                                @click="
                                  footer.status != 'active'
                                    ? ((isStatus = true),
                                      (event = $event),
                                      (footerData = footer))
                                    : editPolicyStatus($event, footer)
                                "
                                :checked="
                                  footer.status == 'active' ? true : false
                                "
                              />
                              <small></small>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div class="action">
                            <a
                              @click="
                                $router.push({
                                  name: 'FrontListsPolicyDetails',
                                  params: {
                                    page: page,
                                    type: pageType,
                                    id: footer.id,
                                  },
                                })
                              "
                              ><img src="@/assets/icons/eye.svg"
                            /></a>
                            <a @click="editPolicyRedirection(footer)"
                              ><img src="@/assets/icons/edit-icon.svg" alt=""
                            /></a>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="5" class="center">
                          <p>{{ $t("dictionary.noData") }}</p>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <pagination
                v-model="page"
                :records="total_records"
                :per-page="limit"
                :options="chunkPage"
                @paginate="clickInternalPage"
              />
              <div class="btn-group justify-btwn">
                <div class="twoBtn"></div>
                <button
                  type="button"
                  class="btn outline blk-btn"
                  @click="FooterBack"
                >
                  {{ $t("button.back") }}
                </button>
              </div>
            </Tabs>
          </TabWrapper>
        </div>
      </div>
    </div>
    <div class="new-cast-modal center-popup-modal" v-show="isStatus">
      <PopUpModal :isModal="isStatus">
        <template v-slot:header>
          <h1 v-if="pageType == 'privacy-policy'" class="text-center">
            {{ $t("userManagement.policyActivate") }}
          </h1>
          <h1 v-else-if="pageType == 'terms-of-service'" class="text-center">
            {{ $t("userManagement.termsActivate") }}
          </h1>
          <h1 v-else class="text-center">
            {{ $t("userManagement.aboutusActivate") }}
          </h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button
              class="red-fill-btn"
              @click="editPolicyStatus(event, footerData)"
            >
              {{ $t("button.ok") }}
            </button>
            <button
              class="black-outline-btn"
              @click="
                isStatus = false;
                event.target.checked = false;
              "
            >
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import FrontListServices from "@/admin/services/FrontListServices";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { ref, watch, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
import { inject } from "vue";
import moment from "moment";

const mainList = ref([]);
const footerList = ref([]);
const common = inject("common");
const route = useRoute();
const router = useRouter();
const total_records = ref(0);
const page = route.params.page ? ref(parseInt(route.params.page)) : ref(1);
const limit = ref(10);
const chunkPage = ref({ chunk: 5 });
const selectTab = ref("frontlist.main");
const selectSubTab = ref("frontlist.privacyPolicy");
const pageType = ref("privacy-policy");
const isStatus = ref(false);
const footerData = ref({});
const event = ref({});

const activeTab = ref(route.params.itemActive);
const activeSabTab = ref(route.params.subItemActive);
// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getFrontMainList();
      if (selectTab.value == "frontlist.footer") {
        getFrontFooterList();
      }
    }
  }
);

onMounted(() => {
  getFrontMainList();
  if (activeTab.value == "footer") {
    selectTab.value = "frontlist.footer";
    if (activeSabTab.value == "terms-of-service") {
      pageType.value = activeSabTab.value;
      selectSubTab.value = "frontlist.termsOfUse";
    }
    if (activeSabTab.value == "about-us") {
      pageType.value = activeSabTab.value;
      selectSubTab.value = "frontlist.aboutUs";
    }
    getFrontFooterList();
  }
});

// main List
const getFrontMainList = () => {
  FrontListServices.getFrontMainList()
    .then((res) => {
      if (res.status == 200) {
        mainList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

// footer List
const getFrontFooterList = () => {
  let data = {
    page_type: pageType.value,
    page: page.value,
    limit: limit.value,
  };
  FrontListServices.getFrontFooterList(data)
    .then((res) => {
      if (res.status == 200) {
        footerList.value = res.data.result;
        total_records.value = res.data.total_records;
      }
    })
    .catch((err) => {
      return;
    });
};
const clickInternalPage = (click) => {
  page.value = click;
  getFrontFooterList();
};
const addPolicyRedirection = () => {
  router.push({
    name: "FrontListsAddPolicy",
    params: {
      type: pageType.value,
    },
  });
};

const editPolicyRedirection = (footer) => {
  router.push({
    name: "FrontListsAddPolicy",
    params: {
      type: pageType.value,
      id: footer.id,
      page: page.value,
    },
  });
};
//change main status
const newsUpdateStatus = (event, main) => {
  let status;
  if (event.target.checked == true) {
    status = "active";
  } else {
    status = "inactive";
  }
  let data = {
    area_key: main.area_key,
    status: status,
  };
  FrontListServices.mainUpdateStatus(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

const editPolicyStatus = (event, footer) => {
  let status;

  if (event.target.checked == true) {
    status = "active";
  } else {
    status = "inactive";
  }
  let data = {
    page_type: pageType.value,
    page_id: footer.id,
    status: status,
  };
  FrontListServices.editPolicyStatus(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        getFrontFooterList();
        isStatus.value = false;
      }
    })
    .catch((err) => {
      isStatus.value = false;
      return;
    });
};

const onChangeTab = (tab) => {
  selectTab.value = tab;
  page.value = 1;
  if (selectTab.value == "frontlist.footer") {
    getFrontFooterList();
  }
};
const onChangeSubTab = (tab) => {
  selectSubTab.value = tab;
  page.value = 1;
  if (tab == "frontlist.termsOfUse") {
    pageType.value = "terms-of-service";
    getFrontFooterList();
  }
  if (tab == "frontlist.aboutUs") {
    pageType.value = "about-us";
    getFrontFooterList();
  }
  if (tab == "frontlist.privacyPolicy") {
    pageType.value = "privacy-policy";
    getFrontFooterList();
  }
};

const dateformat = (value) => {
  if (value) {
    return moment.utc(value).local().format("YYYY/MM/DD");
  }
};
const FooterBack = () => {
  selectTab.value = "frontlist.main";
  getFrontMainList();
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span>{{ $t("sideBar.subMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ common.state.award_name }}</h3>

        <div class="tab-outr admin-tab">
          <TabWrapper @selectedTab="onChangeTab" :activeTab="selectTab">
            <Tabs title="adminAward.basicInfo">
              <div class="frm-innr w-100">
                <div class="basic-info-area">
                  <ul>
                    <li>
                      <span>{{ $t("input_label.type") }}:</span>
                      <p>
                        {{
                          award_details.type == "movie"
                          ? $t("header.mainMenu.Movies")
                          : award_details.type == "tv"
                            ? $t("header.mainMenu.TVShows")
                            : award_details.type == "people"
                              ? $t("header.mainMenu.People")
                              : award_details.type == "webtoons"
                                ? $t("header.mainMenu.Webtoons")
                                : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.awardNameKo") }}:</span>
                      <p>
                        {{
                          award_details.award_name_ko
                          ? award_details.award_name_ko
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.awardNameEn") }}:</span>
                      <p>
                        {{
                          award_details.award_name_en
                          ? award_details.award_name_en
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("filterCard.country") }}:</span>
                      <p>
                        {{
                          award_details.country_name
                          ? award_details.country_name
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.city") }}:</span>
                      <p>
                        {{
                          award_details.city_name
                          ? award_details.city_name
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.place") }}:</span>
                      <p>
                        {{ award_details.place ? award_details.place : "-" }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.monthOfEvent") }}:</span>
                      <p>
                        {{
                          award_details.event_month
                          ? award_details.event_month
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.webUrl") }}:</span>
                      <p>
                        {{
                          award_details.website_url
                          ? award_details.website_url
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("season.newsSearchKeyword") }}:</span>
                      <p>
                        {{
                          award_details.news_search_keyword
                          ? award_details.news_search_keyword
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.awardImg") }}:</span>
                      <div v-if="award_details.award_poster" class="imgBx" @click="isImageModal = true">
                        <img :src="award_details.award_poster" alt="" />
                      </div>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.expKo") }}:</span>
                      <p>
                        {{
                          award_details.explanation_ko
                          ? award_details.explanation_ko
                          : "-"
                        }}
                      </p>
                    </li>
                    <li>
                      <span>{{ $t("adminAward.expEn") }}:</span>
                      <p>
                        {{
                          award_details.explanation_en
                          ? award_details.explanation_en
                          : "-"
                        }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="btn-group justify-btwn">
                <div class="twoBtn">
                  <input @click="$router.push(`/admin/AwardEdit/${award_id}`)" type="submit" class="btn org-btn"
                    :value="$t('button.edit')" />
                  <input type="submit" @click="openDeletePopup('award')" class="btn outline blk-btn"
                    :value="$t('button.delete')" />
                </div>
                <button type="button" class="btn outline blk-btn" @click="backListPage">
                  {{ $t("button.back") }}
                </button>
              </div>
            </Tabs>
            <Tabs title="adminAward.sector">
              <!-- sector tab content -->

              <div class="sector-content-area">
                <div class="material-sort">
                  <div class="sort-innr">
                    <p>
                      {{ $t("bulk.worklist.total") }} {{ total_sector_records }}
                    </p>
                    <!-- <div class="frm-innr">
                      <div class="form-group">
                        <select
                          class="form-control"
                          @change="getSectorListByValue($event)"
                        >
                          <option>10</option>
                          <option>20</option>
                          <option>30</option>
                        </select>
                      </div>
                    </div> -->
                  </div>
                  <div class="frm-innr">
                    <div class="twoBtn">
                      <button @click="saveSectorOrder" type="button" class="btn orange-btn">{{ $t("button.save") }}
                      </button>
                      <button @click="$router.push(`/admin/AwardSectorAdd/${award_id}`)" type="button" class="btn or-btn">
                        <span> + </span>{{ $t("adminAward.addDivision") }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table-inner-scroll">
                  <table class="table-otr table-innr bulk-working-tbl last-col">
                    <thead>
                      <tr>
                        <th>{{ $t("dictionary.agentList.no") }}</th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.divisonKo") }}
                            <!-- <span @click="sectorSorting('division_name_ko')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.divisonEn") }}
                            <!-- <span @click="sectorSorting('division_name_en')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.active") }}
                            <!-- <span @click="sectorSorting('status')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>{{ $t("dictionary.tagSearch.action") }}</th>
                      </tr>
                    </thead>

                    <template v-if="sectorList.length > 0">
                      <draggable v-model="sectorList" item-key="id" tag="tbody" :animation="300" :forceFallback="true"
                        :scroll-sensitivity="200">
                        <template #item="{ element, index }">
                          <tr>
                            <td>{{ index + 1 }}</td>
                            <td><span class="drag-iocn"><img src="@/assets/icons/drag-token.svg"></span>
                              {{
                                element.division_name_ko
                                ? element.division_name_ko
                                : "-"
                              }}
                            </td>
                            <td>
                              {{
                                element.division_name_en
                                ? element.division_name_en
                                : "-"
                              }}
                            </td>
                            <td>
                              <span :class="[
                                    'status-btn',
                                    element.status == 'active' ? 'green' : 'gray',
                                  ]">{{
                                  element.status == "active"
                                  ? $t("adminAward.active")
                                  : $t("adminAward.inactive")
                                }}
                              </span>
                            </td>
                            <td>
                              <div class="action">
                                <a @click="
                                $router.push(
                                  `/admin/AwardSectorAdd/${award_id}/${element.id}`
                                )
                                  "><img src="/src/assets/icons/edit-icon.svg" alt="" /></a>
                                <a @click="
                                  openDeleteSectorPopup('sector', element.id)
                                  "><img src="/src/assets/icons/delete-icon.svg" alt="" /></a>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </draggable>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="10" class="center">
                          <p>{{ $t("dictionary.noData") }}</p>
                        </td>
                      </tr>
                    </template>
                  </table>
                </div>
                <!-- <template v-if="sectorList?.length > 0">
                  <pagination
                    v-model="page"
                    :records="total_sector_records"
                    :per-page="limit"
                    :options="chunkPage"
                    @paginate="clickSectorPage"
                  />
                </template> -->
              </div>
            </Tabs>
            <Tabs title="adminAward.pastAward">
              <!-- Past Awards tab content -->

              <div class="post-content-area">
                <div class="row-3">
                  <div class="form-group">
                    <label>{{ $t("adminAward.year/round") }}</label>

                    <Dropdown @dropdownValue="selectRound" :search_type="selectedRound" :searchTitleListItem="[
                      {
                        key: '',
                        value: $t('dictionary.select'),
                        disabled: true,
                      },
                      ...searchRoundList.map((item) => {
                        return {
                          key: item.round_id,
                          value: item.round_name,
                        };
                      }),
                    ]" searchtitle="value" searchvalue="key" />
                  </div>
                </div>
                <div class="material-sort">
                  <div class="sort-innr">
                    <p>
                      {{ $t("bulk.worklist.total") }} {{ total_past_records }}
                    </p>
                    <div class="frm-innr">
                      <div class="form-group">
                        <select class="form-control" @change="getPastAwardListByValue($event)">
                          <option>10</option>
                          <option>20</option>
                          <option>30</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="frm-innr">
                    <button type="button" class="btn or-btn" @click="
                      $router.push(
                        `/admin/addNominee/${award_id}/${round_id}`
                      )
                      " :disabled="!selectedRound">
                      <span> + </span>{{ $t("adminAward.addNominee") }}
                    </button>
                    <button type="button" class="btn or-btn" @click="
                      $router.push(`/admin/addRound/${award_id}/${round_id}`)
                      " :disabled="!selectedRound">
                      {{ $t("adminAward.editRound") }}
                    </button>
                    <button @click="$router.push(`/admin/addRound/${award_id}`)" type="button" class="btn orange-btn">
                      <span> + </span>{{ $t("adminAward.addRound") }}
                    </button>
                  </div>
                </div>
                <div class="table-inner-scroll">
                  <table class="table-otr table-innr bulk-working-tbl last-col colsixth">
                    <thead>
                      <tr>
                        <th>{{ $t("dictionary.agentList.no") }}</th>
                        <th>{{ $t("adminAward.round") }}</th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.sector") }}
                            <!-- <span @click="pastAwardSorting('sector')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.work") }}
                            <!-- <span @click="pastAwardSorting('work')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.people") }}
                            <!-- <span @click="pastAwardSorting('character')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.comment") }}
                            <!-- <span @click="pastAwardSorting('comment')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>
                          <div class="data-hdr">
                            {{ $t("adminAward.Winner") }}
                            <!-- <span @click="pastAwardSorting('status')"
                              ><img
                                src="@/assets/icons/ud-arrow-icon.svg"
                                alt=""
                            /></span> -->
                          </div>
                        </th>
                        <th>{{ $t("dictionary.tagSearch.action") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="pastAwardList.length > 0">
                        <tr v-for="(list, index) in pastAwardList" :key="index">
                          <td>{{ list.no }}</td>
                          <td>
                            <div class="linelimts">{{ list.round_name }}</div>
                          </td>
                          <td>{{ list.division_name }}</td>
                          <td>{{ list.work }}</td>
                          <td>{{ list.character }}</td>
                          <td>
                            <div class="linelimts">{{ list.comment }}</div>
                          </td>
                          <td>
                            <span v-if="list.status == 'winner'" class="status-btn green">{{ $t("adminAward.Winner")
                            }}</span><span v-else class="status-btn blue">{{
  $t("adminAward.candidate")
}}</span>
                          </td>
                          <td>
                            <div class="action">
                              <a><img src="/src/assets/icons/edit-icon.svg" alt="" @click="editNominee(list)" /></a>
                              <a><img src="/src/assets/icons/delete-icon.svg" alt=""
                                  @click="openDeletePopup('nominee', list)" /></a>
                            </div>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr class="nodata-row">
                          <td colspan="10" class="center">
                            <p>{{ $t("adminAward.noDataYear/Round") }}</p>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <pagination v-model="page" :records="total_past_records" :per-page="limit" :options="chunkPage"
                  @paginate="clickPastAwardPage" />
              </div>
              <div class="btn-group justify-btwn">
                <div class="twoBtn"></div>
                <button type="button" class="btn outline blk-btn" @click="PastAwardBack">
                  {{ $t("button.back") }}
                </button>
              </div>
            </Tabs>
          </TabWrapper>
        </div>
      </div>
    </div>

    <!-- delete award -->
    <div class="new-cast-modal center-popup-modal" v-show="isDelete">
      <PopUpModal :isModal="isDelete">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("dictionary.tagSearch.delete") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="
              isDelete == 'nominee'
                ? deleteNominee()
                : isDelete == 'award'
                  ? deleteAward()
                  : deleteSector()
              ">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>

    <!-- show image -->
    <div class="new-cast-modal add-img-modal new-media-modal" v-show="isImageModal">
      <PopUpModal :isModal="isImageModal">
        <template v-slot:header>
          <h1>{{ $t("myPage.imageCard.imagePreview") }}</h1>
          <button @click="isImageModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="modal-img-area">
            <img :src="award_details.award_poster" :alt="award_details.award_poster" />
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import { ref, watch, onMounted, computed } from "@vue/runtime-core";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import AdminAwardService from "@/admin/services/AdminAwardService";
import { useRoute, useRouter } from "vue-router";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import Toast from "@/alert/alert.js";
import { inject } from "vue";
import draggable from "vuedraggable";
const page = ref(1);
const limit = ref(10);
const total_sector_records = ref(0);
const chunkPage = ref({ chunk: 5 });
const route = useRoute();
const router = useRouter();
const award_id = ref(route.params.id);
const award_details = ref("");
const isDelete = ref("");
const isImageModal = ref(false);
const selectTab = ref("adminAward.basicInfo");
const sectorList = ref([]);
const isSectorDelete = ref(false);
const sector_id = ref("");
const activeTab = ref(route.params.itemActive);
const total_past_records = ref(0);
const round_id = ref("");
const pastAwardList = ref([]);
const sort_order = ref("desc");
const sort_by = ref("");
const selectedRound = ref("");
const searchRoundList = ref([]);
const deleteData = ref({});
const common = inject("common");

onMounted(() => {
  if (activeTab.value == "sector") {
    selectTab.value = "adminAward.sector";
    getSectorList();
  } else if (activeTab.value == "past_award") {
    selectTab.value = "adminAward.pastAward";
    roundList();
  }
  getadminAwardInfo();
});

// award info
const getadminAwardInfo = () => {
  AdminAwardService.adminAwardInfo(award_id.value)
    .then((res) => {
      if (res.status == 200) {
        award_details.value = res.data;
        common.state.award_name = res.data.award_name_en;
        document.title = `${res.data.award_name_en}-${t("pageTitle.admin.AwardsDetails")} - 11DB`;
      }
    })
    .catch((err) => {
      return;
    });
};
const selectRound = (value) => {
  selectedRound.value = Number(value);
  round_id.value = selectedRound.value;
  getPastAwardList();
};
// delete award
const deleteAward = () => {
  AdminAwardService.adminAwardDelete(award_id.value)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        router.push("/admin/AwardList");
        isDelete.value = "";
      }
    })
    .catch((err) => {
      return;
    });
};

const openDeletePopup = (type, data) => {
  isDelete.value = type;
  if (data) {
    deleteData.value = data;
  }
};

const onChangeTab = (tab) => {
  selectTab.value = tab;
  page.value = 1;
  if (tab == "adminAward.sector") {
    getSectorList();
  }
  if (tab == "adminAward.basicInfo") {
    getadminAwardInfo();
  }
  if (tab == "adminAward.pastAward") {
    roundList();
  }
};

const sectorSorting = (sortBy) => {
  sort_by.value = sortBy;
  sort_order.value = sort_order.value == "desc" ? "asc" : "desc";
  getSectorList();
};

// const pastAwardSorting = (sortBy) => {
//   sort_by.value = sortBy;
//   sort_order.value = sort_order.value == "desc" ? "asc" : "desc";
//   getPastAwardList();
// };

// sector list
const getSectorList = () => {
  const sectorPayload = {
    award_id: award_id.value,
  };
  AdminAwardService.sectorList(sectorPayload)
    .then((res) => {
      if (res.status == 200) {
        sectorList.value = res.data.results;
        total_sector_records.value = res.data.total_records;
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

const openDeleteSectorPopup = (type, id) => {
  sector_id.value = id;
  isDelete.value = type;
};

// delete sector
const deleteSector = () => {
  const del = {
    id: sector_id.value,
    award_id: award_id.value,
  };
  AdminAwardService.adminAwardSectorDelete(del)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        isDelete.value = false;
        getSectorList();
      }
    })
    .catch((err) => {
      return;
    });
};

const saveSectorOrder = () => {
  let sortId = [];
  sectorList.value.map((sector) => {
    sortId.push(sector.id);
  });
  const data = {
    award_id: award_id.value,
    sector_id_order: sortId
  };
  AdminAwardService.adminAwardSectorOrderUpdate(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        getSectorList();
      }
    })
    .catch((err) => {
      return;
    });
}

//sector pagination
const clickSectorPage = (click) => {
  page.value = click;
  getSectorList();
};

const clickPastAwardPage = (click) => {
  page.value = click;
  getPastAwardList();
};

const backListPage = () => {
  router.push({
    name: "AwardList",
    params: {
      page: route.params?.page,
    },
  });
};

const getSectorListByValue = (event) => {
  page.value = 1;
  limit.value = event.target.value;
  getSectorList();
};

const roundList = () => {
  let data = {
    award_id: award_id.value,
    search_text: "", //optional
  };
  AdminAwardService.roundList(data)
    .then((res) => {
      if (res.status == 200) {
        searchRoundList.value = res.data.results;
        selectRound(route.params.round_id ? route.params.round_id : searchRoundList.value[0].round_id);
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
// past award list
const getPastAwardList = () => {
  const pastPayload = {
    page: page.value,
    limit: limit.value,
    award_id: award_id.value,
    round_id: round_id.value,
    sort_by: sort_by.value,
    sort_order: sort_order.value,
  };
  AdminAwardService.pastAwardList(pastPayload)
    .then((res) => {
      if (res.status == 200) {
        pastAwardList.value = res.data.result;
        for (let i = 0; i < pastAwardList.value.length; i++) {
          pastAwardList.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
        }
        total_past_records.value = res.data.total_records;
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

const getPastAwardListByValue = (event) => {
  page.value = 1;
  limit.value = event.target.value;
  getPastAwardList();
};

const deleteNominee = () => {
  let data = {
    award_id: deleteData.value.award_id,
    round_id: deleteData.value.round_id,
    nominee_id: deleteData.value.nominee_id,
  };
  AdminAwardService.deleteNominee(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        getPastAwardList();
        isDelete.value = "";
      }
    })
    .catch((err) => {
      return;
    });
};

const editNominee = (item) => {
  router.push(
    `/admin/addNominee/${item.award_id}/${item.round_id}/${item.nominee_id}`
  );
};

const PastAwardBack = () => {
  selectTab.value = "adminAward.sector";
  getSectorList();
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

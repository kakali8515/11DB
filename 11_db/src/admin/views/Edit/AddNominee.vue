<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span
        >{{ $t("header.mainMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3 v-if="nominee_id">{{ $t("adminAward.editNominee") }}</h3>
        <h3 v-else>{{ $t("adminAward.addNewNominee") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("adminAward.sector") }}</label>
              <Dropdown
                @dropdownValue="getSectorData"
                :search_type="sectorType"
                :searchTitleListItem="[
                  {
                    key: '',
                    value: $t('dictionary.select'),
                    disabled: true,
                  },
                  ...sectorList.map((item) => {
                    return {
                      key: item.sector_id,
                      value: item.sector_name,
                    };
                  }),
                ]"
                searchtitle="value"
                searchvalue="key"
                :isError="error.sectorType ? true : false"
              />
              <span v-if="error.sectorType" class="error-txt"
                >{{ error.sectorType }}
              </span>
            </div>

            <div class="form-group custmdrops">
              <label>{{ $t("adminAward.work") }}</label>
              <DropdownWithPagination
                @searchInput="searchWorkList"
                :placeholder="$t('dictionary.select')"
                :list="workList"
                label_property="work_name"
                label_id="work_id"
                @scrolling="getWorkList"
                :page="page"
                @itemSelected="selectWorkList"
                :selectedItem="selectedWork"
                :totalRecords="totalWorkRecords"
                :isError="error.work ? true : false"
              />
              <span v-if="error.work" class="error-txt">{{ error.work }} </span>
              <div class="check-innr check-row">
                <label class="check-inn">
                  <input
                    type="checkbox"
                    v-model="isThumbnail"
                    :disabled="!selectedWork"
                  />
                  <span class="checkmark"></span>
                </label>
                <p>{{ $t("adminAward.setThumbnail") }}</p>
              </div>
            </div>

            <div class="form-group custmdrops">
              <label>{{ $t("adminAward.people") }}</label>
              <DropdownWithPagination
                @searchInput="searchCharacterList"
                :placeholder="$t('dictionary.select')"
                :list="characterList"
                label_property="character_name"
                label_id="character_id"
                @scrolling="getCharacterList"
                :page="pageCharacter"
                @itemSelected="selectCharacterList"
                :selectedItem="selectedCharacter"
                :totalRecords="totalCharacterRecords"
                :isError="error.work ? true : false"
              />
              <span v-if="error.work" class="error-txt">{{ error.work }} </span>
            </div>
          </div>
          <div class="row">
            <div class="form-group mxwidt">
              <label>{{ $t("adminAward.Winner") }}?</label>
              <div class="switch-innr">
                <label class="switch">
                  <input
                    type="checkbox"
                    @click="winnerStatus($event)"
                    :checked="winner == 'winner' ? true : false"
                  />
                  <small></small>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label>{{ $t("adminAward.comment") }}</label>
              <textarea
                :placeholder="$t('adminAward.enterDescription')"
                class="form-control customtxt"
                rows="5"
                v-model="comment"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <input
            type="submit"
            class="btn org-btn"
            :value="$t('button.save')"
            @click="addNewNominee"
          />
          <button
            type="button"
            class="btn outline blk-btn"
            @click="backPastAwrd"
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
import AdminAwardService from "@/admin/services/AdminAwardService";
import DropdownWithPagination from "@/admin/components/DropdownWithPagination.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch, inject } from "vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";

const sectorType = ref("");
const sectorList = ref([]);

const workList = ref([]);
const characterList = ref([]);

const work_id = ref("");
const character_id = ref("");
const title_id = ref("");
const type = ref("");
const character_title_id = ref("");
const comment = ref("");
const winner = ref("candidate");

const page = ref(1);
const limit = ref(10);
const pageCharacter = ref(1);
const search_text = ref("");
const character_search_text = ref("");
const selectedWork = ref(null);
const isThumbnail = ref(false);
const selectedCharacter = ref(null);
const totalWorkRecords = ref(0);
const totalCharacterRecords = ref(0);

const route = useRoute();
const router = useRouter();
const award_id = ref(route.params.award_id);
const round_id = ref(route.params.round_id);
const nominee_id = ref(route.params.nominee_id);
const { t } = i18n.global;
const common = inject("common");
const error = ref({});

onMounted(() => {
  getSectorList();
  if (!nominee_id.value) {
    getWorkList();
    getCharacterList();
  } else {
    document.title=t("pageTitle.admin.editNominee")+ ' - 11DB';
    getNominee();
  }
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getSectorList();
      getWorkList();
      getCharacterList();
      if (nominee_id.value) {
        document.title=t("pageTitle.admin.editNominee")+ ' - 11DB';
        getNominee();
      }
    }
  }
);

const getSectorList = () => {
  let data = {
    award_id: award_id.value,
    search_text: "",
  };
  AdminAwardService.sectorListData(data)
    .then((res) => {
      if (res.status == 200) {
        sectorList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};
const getSectorData = (value) => {
  sectorType.value = value;
};

const getNominee = () => {
  let data = {
    award_id: award_id.value,
    round_id: round_id.value,
    nominee_id: nominee_id.value,
  };
  AdminAwardService.getNominee(data)
    .then(async (res) => {
      if (res.status == 200) {
        let nomineeWork = {
          work_id: res.data.work_id,
          work_name: res.data.work,
        };
        let nomineeCharacter = {
          character_id: res.data.character_id,
          character_name: res.data.character,
        };
        work_id.value = nomineeWork.work_id;
        search_text.value = nomineeWork.work_name;
        getWorkList();
        selectWorkList(nomineeWork);

        character_search_text.value = res.data.character;
        character_id.value = res.data.character_id;
        getCharacterList();
        selectCharacterList(nomineeCharacter);

        sectorType.value = res.data.sector_id;
        isThumbnail.value = res.data.is_work_thumbnail == "y" ? true : false;
        winner.value = res.data.status;
        comment.value = res.data.comment;
      }
    })
    .catch((err) => {
      return;
    });
};
const selectWorkList = (workListItem) => {
  selectedWork.value = workListItem;
  if (workListItem != null) {
    work_id.value = workListItem.work_id;
    title_id.value = workListItem.work_id;
    type.value = workListItem.work_type;
    //for populating data on edit
    search_text.value = workListItem.work_name;
  } else {
    work_id.value = null;
    title_id.value = null;
    type.value = null;
  }
};
const selectCharacterList = (characterListItem) => {
  selectedCharacter.value = characterListItem;
  if (characterListItem != null) {
    character_id.value = characterListItem.character_id;
    character_title_id.value = characterListItem.character_id;
  }
};
const searchWorkList = (searchInput) => {
  search_text.value = searchInput;
  page.value = 1;
  workList.value = [];
  getWorkList();
};
const searchCharacterList = (searchInput) => {
  character_search_text.value = searchInput;
  pageCharacter.value = 1;
  characterList.value = [];
  getCharacterList();
};

const getWorkList = (newPage = 0) => {
  if (newPage) page.value = newPage;
  let data = {
    search_text: search_text.value,
    page: page.value,
    limit: limit.value,
  };
  AdminAwardService.workList(data)
    .then((res) => {
      if (res.status == 200) {
        totalWorkRecords.value = res.data.total_records;
        if (page.value == 1) workList.value = res.data.results;
        else workList.value = [...workList.value, ...res.data.results];
      }
    })
    .catch((err) => {
      return;
    });
};

const getCharacterList = (newPage = 0) => {
  if (newPage) pageCharacter.value = newPage;
  let data = {
    search_text: character_search_text.value,
    // title_id: title_id.value,
    // type: type.value,
    page: pageCharacter.value,
    limit: limit.value,
  };
  AdminAwardService.characterList(data)
    .then((res) => {
      if (res.status == 200) {
        totalCharacterRecords.value = res.data.total_records;
        if (pageCharacter.value == 1) characterList.value = res.data.results;
        else
          characterList.value = [...characterList.value, ...res.data.results];
      }
    })
    .catch((err) => {
      return;
    });
};

const winnerStatus = (event) => {
  if (event.target.checked == true) {
    winner.value = "winner";
  } else {
    winner.value = "candidate";
  }
};

const addNewNominee = () => {
  if (sectorType.value == "") {
    error.value.sectorType = t("Error.requiredField");
    return;
  }
  if (selectedWork.value == null && selectedCharacter.value == null) {
    error.value.work = t("Error.work/peopleRequired");
    return;
  } else {
    error.value.work = "";
  }
  let data = {
    award_id: award_id.value,
    round_id: round_id.value,
    sector_id: sectorType.value,
    work_id: work_id.value,
    character_id: character_id.value,
    status: winner.value,
    comment: comment.value,
    is_work_thumbnail: isThumbnail.value == false ? "n" : "y",
  };
  if (nominee_id.value) {
    data.nominee_id = nominee_id.value;
    AdminAwardService.editNominee(data)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          backPastAwrd();
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  } else {
    AdminAwardService.addNominee(data)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          backPastAwrd();
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  }
};

const backPastAwrd = () => {
  router.push({
    name: "AwardEditBasicInfo",
    params: {
      id: award_id.value,
      itemActive: "past_award",
      round_id : round_id.value
    },
  });
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

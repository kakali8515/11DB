<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span>{{ $t("sideBar.subMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3 v-if="round_id">{{ $t("adminAward.editRound") }}</h3>
        <h3 v-else>{{ $t("adminAward.addRound") }}</h3>

        <div class="frm-innr w-100 awrd-sector">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("adminAward.year") }}</label>
              <div class="plusbtn-bx">
                <span class="minusbtn"><img src="@/assets/icons/minus-sm.svg" @click="subYear" /></span>
                <input type="text" v-model="year" class="form-control" :placeholder="$t('adminAward.enterYear')"
                  :class="error.year ? 'error-border' : ''" maxlength="4" @keypress="isIntegerNumber($event)" />
                <span class="plusbtn"><img src="@/assets/icons/plus-sm.svg" @click="addYear" /></span>
              </div>
              <span v-if="error.year" class="error-txt">{{ error.year }}</span>
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.round") }}</label>
              <div class="plusbtn-bx" :class="isSkipRound ? 'inactive' : ''">
                <span class="minusbtn"><img src="@/assets/icons/minus-sm.svg" @click="subRoundNo" /></span>
                <input type="text" v-model="roundNo" class="form-control" @keypress="isIntegerNumber($event)"
                  :placeholder="$t('adminAward.enterRound')" :class="error.roundNo ? 'error-border' : ''"
                  :disabled="isSkipRound" maxlength="5" />
                <span class="plusbtn"><img src="@/assets/icons/plus-sm.svg" @click="addRoundNo" /></span>
              </div>
              <span v-if="error.roundNo" class="error-txt">{{
                error.roundNo
              }}</span>
              <div class="check-innr">
                <label class="check-inn">
                  <input type="checkbox" v-model="isSkipRound" @click="error.roundNo = ''" />
                  <span class="checkmark"></span>
                </label>
                <p>{{ $t("adminAward.skipRound") }}</p>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("adminAward.roundName") }}</label>
              <input type="text" v-model="roundName" class="form-control" :placeholder="$t('adminAward.enterName')"
                maxlength="150" @keypress="requiredField" :class="error.roundName ? 'error-border' : ''" />
              <span v-if="error.roundName" class="error-txt">{{
                error.roundName
              }}</span>
            </div>
          </div>
          <div class="row-3">
            <div class="form-group">
              <div class="dubble-date-btn">
                <div class="form-group">
                  <label>{{ $t("edit.list.startDate") }}</label>
                  <div class="input-date">
                    <Calender @date="getSearchStartDate" :input_date="searchStartDate" :datePlaceholder="datePlaceholder"
                      :max_date="searchEndDate ? new Date(searchEndDate) : ''" />
                  </div>
                </div>

                <div class="form-group">
                  <label>{{ $t("edit.list.endDate") }}</label>
                  <div class="input-date">
                    <Calender @date="getSearchEndDate" :input_date="searchEndDate" :datePlaceholder="datePlaceholder"
                      :min_date="searchStartDate
                        ? new Date(
                          new Date(searchStartDate).getTime() + 86400000
                        )
                        : ''
                        " :disabled="!searchStartDate" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <div class="twoBtn">
            <input @click="addRound()" type="submit" class="btn org-btn" :value="$t('button.save')" />
            <button v-if="route.params.round_id" type="button" class="btn outline blk-btn" @click="deleteRound">
              {{ $t("button.delete") }}
            </button>
          </div>
          <button type="button" class="btn outline blk-btn" @click="backPastAwrd">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
    <!-- delete round -->
    <div class="new-cast-modal center-popup-modal" v-show="isDelete">
      <PopUpModal :isModal="isDelete">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("dictionary.tagSearch.delete") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="deleteAwardRound">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>

    <!-- delete round -->
    <div class="new-cast-modal center-popup-modal" v-show="isErrorMsg">
      <PopUpModal :isModal="isErrorMsg">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("adminAward.deleteRoundMsg") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="isErrorMsg = false">
              {{ $t("button.ok") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>

  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import Calender from "@/components/Calender.vue";
import { ref, onMounted } from "@vue/runtime-core";
import AdminAwardService from "@/admin/services/AdminAwardService";
import { requiredField, isIntegerNumber } from "@/mixins/CommonValidation.js";
import { useRoute, useRouter } from "vue-router";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const route = useRoute();
const router = useRouter();
const award_id = ref(route.params.award_id);
const round_id = ref(route.params.round_id);

const error = ref({});
const year = ref();
const roundNo = ref();
const roundName = ref("");
const isSkipRound = ref(false);
const searchStartDate = ref("");
const searchEndDate = ref("");
const datePlaceholder = ref("YYYY-MM-DD");
const isDelete = ref(false);
const isErrorMsg = ref(false);

onMounted(() => {
  if (round_id.value) {
    roundDetail();
    document.title = t("pageTitle.admin.editRound") + ' - 11DB';
  }
});
const roundDetail = () => {
  let data = {
    award_id: award_id.value,
    round_id: round_id.value,
  };
  AdminAwardService.roundDetail(data)
    .then((res) => {
      if (res.status == 200) {
        year.value = res.data.year;
        roundNo.value = res.data.round;
        roundName.value = res.data.round_name;
        searchStartDate.value = res.data.round_date;
        searchEndDate.value = res.data.round_end_date;
      }
    })
    .catch((err) => {
      return;
    });
};
const getSearchStartDate = (date) => {
  searchStartDate.value = date;
};
const getSearchEndDate = (date) => {
  searchEndDate.value = date;
};
const subYear = () => {
  if (year.value > 1960) year.value = Number(year.value) - 1;
};
const addYear = () => {
  if (!year.value) year.value = 1959;
  if (year.value < 2100) year.value = Number(year.value) + 1;
};

const subRoundNo = () => {
  if (roundNo.value >= 1 && !isSkipRound.value)
    roundNo.value = Number(roundNo.value) - 1;
};
const addRoundNo = () => {
  if (!roundNo.value) roundNo.value = 0;
  if (roundNo.value < 10000 && !isSkipRound.value)
    roundNo.value = Number(roundNo.value) + 1;
};

const backPastAwrd = () => {
  router.push({
    name: "AwardEditBasicInfo",
    params: {
      id: award_id.value,
      itemActive: "past_award"
    },
  });
};

const addRound = () => {
  if (year.value > 2100 || year.value < 1960) {
    error.value.year = t("Error.year");
    return;
  } else if (year.value == "" || year.value == undefined) {
    error.value.year = t("Error.requiredField");
    return;
  } else {
    error.value.year = "";
  }
  if (!isSkipRound.value && (roundNo.value > 10000 || roundNo.value < 1)) {
    error.value.roundNo = t("Error.roundNo");
    return;
  } else {
    error.value.roundNo = "";
  }
  if (!roundName.value) {
    error.value.roundName = t("Error.requiredField");
    return;
  } else {
    error.value.roundName = "";
  }
  let data = {
    award_id: award_id.value,
    round_name: roundName.value,
    year: year.value,
  };
  if (!isSkipRound.value) data.round = roundNo.value;
  else data.round = null;

  if (!searchStartDate.value == "") data.round_date = searchStartDate.value;
  if (!searchEndDate.value == "") data.round_end_date = searchEndDate.value;

  if (round_id.value) {
    data.round_id = round_id.value;
    AdminAwardService.editRound(data)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          router.push({
            name: "AwardEditBasicInfo",
            params: {
              id: award_id.value,
              itemActive: "past_award",
              round_id: round_id.value
            },
          });
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  } else {
    AdminAwardService.addRound(data)
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

const deleteRound = () => {
  isDelete.value = true;
}

// delete sector
const deleteAwardRound = () => {
  const del = {
    round_id: round_id.value,
    award_id: award_id.value,
  };
  AdminAwardService.adminAwardRoundDelete(del)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        backPastAwrd();
        isDelete.value = false;
      } else if (res.response.status == 400) {
        isErrorMsg.value = true;
        isDelete.value = false;
      }
    })
    .catch((err) => {
      return;
    });
};

</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

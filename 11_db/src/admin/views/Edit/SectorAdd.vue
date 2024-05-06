<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span
        >{{ $t("sideBar.subMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3>
          {{
            sector_id ? $t("adminAward.editSector") : $t("adminAward.addSector")
          }}
        </h3>

        <div class="frm-innr w-100 awrd-sector">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("adminAward.divisonKo") }}</label>
              <input
                type="text"
                v-model="division_name_ko"
                class="form-control"
                :placeholder="$t('adminAward.divPlaceKo')"
                maxlength="150"
                @keypress="requiredField"
                :class="error.division_name_ko ? 'error-border' : ''"
              />
              <span v-if="error.division_name_ko" class="error-txt">{{
                error.division_name_ko
              }}</span>
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.divisonEn") }}</label>
              <input
                type="text"
                v-model="division_name_en"
                class="form-control"
                :placeholder="$t('adminAward.divPlaceEn')"
                maxlength="150"
                @keypress="requiredField"
              />
            </div>
            <div class="form-group" v-if="sector_id">
              <label>{{ $t("adminAward.active") }}</label>
              <div class="switch-innr">
                <label class="switch">
                  <input
                    type="checkbox"
                    @change="getStatus"
                    v-model="status"
                    :checked="status == 'active' ? true : false"
                  />
                  <small></small>
                </label>
                <span>{{ $t("adminAward.currPresent") }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <input
            @click="AddSector"
            type="submit"
            class="btn org-btn"
            :value="$t('button.save')"
          />
          <button type="button" class="btn outline blk-btn" @click="backSector">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import { ref, onMounted } from "@vue/runtime-core";
import { computed } from "@vue/reactivity";
import AdminAwardService from "@/admin/services/AdminAwardService";
import { requiredField } from "@/mixins/CommonValidation.js";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const route = useRoute();
const router = useRouter();
const award_id = ref(route.params.award_id);
const sector_id = ref(route.params.id);
const division_name_ko = ref("");
const division_name_en = ref("");
const status = ref("");
const error = ref({});

onMounted(() => {
  if (sector_id.value) {
    document.title=t("pageTitle.admin.editSector")+ ' - 11DB';
    getadminAwardSectorDetails();
  }
});

// award sector info
const getadminAwardSectorDetails = () => {
  const data = {
    id: sector_id.value,
    award_id: award_id.value,
  };
  AdminAwardService.adminAwardSectorInfo(data)
    .then((res) => {
      if (res.status == 200) {
        division_name_ko.value = res.data.division_name_ko;
        division_name_en.value = res.data.division_name_en;
        status.value = res.data.status;
      }
    })
    .catch((err) => {
      return;
    });
};

// add sector
const AddSector = () => {
  //validation
  if (division_name_ko.value == "" && division_name_en.value == "") {
    error.value.division_name_ko = computed(() => t("Error.oneRequire"));
  } else {
    error.value.division_name_ko = ref("");
  }

  if (
    Object.values(error.value).filter((x) => {
      return x.length > 0;
    }).length != 0
  ) {
    return false;
  }

  const addData = {
    division_name_ko: division_name_ko.value,
    division_name_en: division_name_en.value,
    award_id: award_id.value,
  };

  let saveSectorDetails;

  if (sector_id.value) {
    addData["id"] = sector_id.value;
    addData["status"] = status.value;
    saveSectorDetails = AdminAwardService.adminAwardSectorEdit(addData);
  } else {
    saveSectorDetails = AdminAwardService.adminAwardSectorAdd(addData);
  }

  saveSectorDetails
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        router.push({
          name: "AwardEditBasicInfo",
          params: {
            id: award_id.value,
            itemActive: "sector",
          },
        });
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const getStatus = () => {
  if (status.value) {
    status.value = "active";
  } else {
    status.value = "inactive";
  }
};

const backSector = () => {
  router.push({
    name: "AwardEditBasicInfo",
    params: {
      id: award_id.value,
      itemActive: "sector",
    },
  });
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

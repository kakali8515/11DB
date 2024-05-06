<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/front-list.svg" alt="" /></span>{{ $t("sideBar.subMenu.Front lists") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("searchResults.searchRight.tvShowsDetails.details") }}</h3>

        <div class="frm-innr w-100">
          <div class="basic-info-area">
            <ul>
              <li>
                <span>{{ $t("bulk.worklist.title") }}:</span>
                <p>
                  {{ policyData?.page_title }}
                </p>
              </li>
              <li>
                <span>{{ $t("dictionary.news.date") }}:</span>
                <p>
                  {{ dateformat(policyData.date) }}
                </p>
              </li>

              <li>
                <span>{{ $t("frontlist.content") }}:</span>
                <p v-html="policyData?.page_content"></p>
              </li>
            </ul>
          </div>
        </div>

        <div class="btn-group justify-btwn">
          <div class="twoBtn">
            <input @click="
              $router.push(
                `/admin/addPolicy/${policyData.page_type}/${policyData.page_id}`
              )
              " type="submit" class="btn org-btn" :value="$t('button.edit')" />
            <input type="submit" @click="isDelete = true" class="btn outline blk-btn" :value="$t('button.delete')" />
          </div>
          <button type="button" class="btn outline blk-btn" @click="backToFooter">
            {{ $t("button.back") }}
          </button>
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
            <button class="red-fill-btn" @click="deletePolicy">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
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
import { ref, watch, onMounted } from "@vue/runtime-core";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import FrontListServices from "@/admin/services/FrontListServices";
import { useRoute, useRouter } from "vue-router";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import Toast from "@/alert/alert.js";
import moment from "moment";

const policyData = ref({});
const route = useRoute();
const router = useRouter();
const pageType = ref(route.params.type);
const id = ref(route.params.id);
const isDelete = ref(false);

onMounted(() => {
  getPolicyInfo();
});

// award info
const getPolicyInfo = () => {
  let data = {
    page_type: pageType.value,
    page_id: id.value,
  };
  FrontListServices.getPolicyDetails(data)
    .then((res) => {
      if (res.status == 200) {
        policyData.value = res.data;
        if (pageType.value == 'privacy-policy')
          document.title = `${res.data.page_title}-${t("pageTitle.admin.policyDetails")} - 11DB`;
        else if (pageType.value == 'terms-of-service')
        document.title = `${res.data.page_title}-${t("pageTitle.admin.termDetails")} - 11DB`;
        else document.title = `${res.data.page_title}-${t("pageTitle.admin.aboutDetails")} - 11DB`;

      }
    })
    .catch((err) => {
      return;
    });
};

const dateformat = (value) => {
  if (value) {
    return moment.utc(value).local().format("YYYY/MM/DD");
  }
};

// delete award
const deletePolicy = () => {
  let data = {
    page_type: pageType.value,
    page_id: id.value,
  };
  FrontListServices.deletePolicy(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        backToFooter();
        isDelete.value = "";
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

const backToFooter = () => {
  router.push({
    name: "FrontLists",
    params: {
      itemActive: "footer",
      subItemActive: pageType.value,
      page: route.params.page ? route.params.page : "",
    },
  });
};
</script>

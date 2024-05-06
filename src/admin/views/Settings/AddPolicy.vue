<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/front-list.svg" alt="" /></span>{{ $t("sideBar.subMenu.Front lists") }}
      </h2>
      <div class="cm-bck">
        <h3 v-if="type == 'privacy-policy' && id">
          {{ $t("frontlist.editPolicy") }}
        </h3>
        <h3 v-else-if="type == 'privacy-policy'">
          {{ $t("frontlist.addPolicy") }}
        </h3>
        <h3 v-else-if="type == 'about-us' && id">
          {{ $t("frontlist.editAboutUs") }}
        </h3>
        <h3 v-else-if="type == 'about-us'">{{ $t("frontlist.addAboutUs") }}</h3>
        <h3 v-else-if="type == 'terms-of-service' && id">
          {{ $t("frontlist.editTermsOfUse") }}
        </h3>
        <h3 v-else>{{ $t("frontlist.addTermsOfUse") }}</h3>

        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.worklist.title") }}</label>
              <input type="text" class="form-control" v-model="title" :class="error.title ? 'error-border' : ''"
                :placeholder="$t('bulk.worklist.titleText')" />
              <span v-if="error.title" class="error-txt">{{ error.title }}
              </span>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.news.date") }}</label>
              <Calender @date="getDate" :input_date="date" :datePlaceholder="datePlaceholder"
                :isError="error.date ? 'error-border' : ''" />
              <span v-if="error.date" class="error-txt">{{ error.date }} </span>
            </div>
          </div>
          <div class="row">
            <div class="form-group countrys">
              <label>{{ $t("frontlist.contents") }}</label>
              <TextEditor :editorData="content" @dataChanged="(data) => {
                content = data;
              }
                " :isError="error.content ? true : false" />
              <span v-if="error.content" class="error-txt">{{ error.content }}
              </span>
            </div>

            <div class="form-group">&nbsp;</div>
          </div>
        </div>
        <div class="btn-group">
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="id ? editPolicy() : addPolicy()" />
          <button type="button" class="btn outline blk-btn" @click="backToFooter">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextEditor from "@/admin/components/TextEditor.vue";
import Sidebar from "@/admin/components/Sidebar.vue";
import Calender from "@/components/Calender.vue";
import { useRoute, useRouter } from "vue-router";
import FrontListServices from "@/admin/services/FrontListServices";
import { onMounted, ref, watch, inject } from "vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";

const datePlaceholder = ref("YYYY.MM.DD");
const date = ref("");
const title = ref("");
const content = ref("");
const route = useRoute();
const router = useRouter();
const type = ref(route.params.type);
const id = ref(route.params.id);
const error = ref({});

const { t } = i18n.global;
const common = inject("common");

onMounted(() => {
  if (type.value == 'privacy-policy')
    document.title = t("pageTitle.admin.addPolicy") + ' - 11DB';
  else if (type.value == 'terms-of-service')
    document.title = t("pageTitle.admin.addTerm") + ' - 11DB';
  else document.title = t("pageTitle.admin.addAboutUs") + ' - 11DB';

  if (id.value) {
    if (type.value == 'privacy-policy')
      document.title = t("pageTitle.admin.editPolicy") + ' - 11DB';
    else if (type.value == 'terms-of-service')
      document.title = t("pageTitle.admin.editTerm") + ' - 11DB';
    else document.title = t("pageTitle.admin.editAboutUs") + ' - 11DB';
    getPolicyDetails();
  }
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
    }
  }
);

// get date
const getDate = (newDate) => {
  date.value = newDate;
};

//get policy details
const getPolicyDetails = () => {
  let data = {
    page_type: type.value,
    page_id: id.value,
  };
  FrontListServices.getPolicyDetails(data)
    .then((res) => {
      if (res.status == 200) {
        date.value = res.data.date;
        title.value = res.data.page_title;
        content.value = res.data.page_content;
      }
    })
    .catch((err) => {
      return;
    });
};

const addPolicy = () => {
  if (title.value == "") {
    error.value.title = t("Error.requiredInput");
    return;
  } else {
    error.value.title = "";
  }
  if (date.value == "") {
    error.value.date = t("Error.requiredInput");
    return;
  } else {
    error.value.date = "";
  }
  if (content.value == "") {
    error.value.content = t("Error.requiredInput");
    return;
  } else {
    error.value.content = "";
  }
  let data = {
    page_type: type.value,
    title: title.value,
    date: date.value,
    content: content.value,
    language: common.state.SelectedLang.toLowerCase(), // en/ko
  };
  FrontListServices.addPolicy(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({
          title: res.data.message,
        });
        backToFooter();
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};
const editPolicy = () => {
  if (title.value == "") {
    error.value.title = t("Error.requiredInput");
    return;
  } else {
    error.value.title = "";
  }
  if (!date.value) {
    error.value.date = t("Error.requiredInput");
    return;
  } else {
    error.value.date = "";
  }
  if (content.value == "") {
    error.value.content = t("Error.requiredInput");
    return;
  } else {
    error.value.content = "";
  }

  let data = {
    page_type: type.value,
    title: title.value,
    date: date.value,
    content: content.value,
    page_id: id.value,
    language: common.state.SelectedLang.toLowerCase(),
  };

  FrontListServices.editPolicy(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({
          title: res.data.message,
        });
        backToFooter();
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};
const backToFooter = () => {
  if (id.value) {
    let previousRoute = router.options.history.state.back;
    if (previousRoute == "/admin/FrontLists") {
      router.push({
        name: "FrontLists",
        params: {
          itemActive: "footer",
          subItemActive: type.value,
          page: route.params.page ? route.params.page : "",
        },
      });
    } else {
      router.go(-1);
    }
  } else {
    router.push({
      name: "FrontLists",
      params: {
        itemActive: "footer",
        subItemActive: type.value,
      },
    });
  }
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

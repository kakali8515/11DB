<template>
  <section class="mypage-sec">
    <div class="container">
      <div class="mypage-wrapper">
        <LeftSidePanel :key="leftKey" />
        <div class="mypage-rght">
          <h2>{{ $t("activity.leftSidePannel.Settings") }}</h2>
          <div class="login-wrap p-o">
            <div class="form-box box">
              <form>
                <div class="form-group mb-24">
                  <label>{{ $t("myPage.settings.profileImage") }}</label>
                  <div class="file">
                    <div class="file-txt" @click="isEditImage = true">
                      <div class="file-edit-button">
                        <img src="@/assets/icons/edit.svg" alt="" />
                        <span>{{ $t("button.edit") }}</span>
                      </div>
                      <img v-if="profile_url" :src="profile_url" />
                      <!-- <img
                        v-else
                        src="@/assets/images/no-image-view.png"
                        alt=""
                      /> -->
                      <!-- <span>{{
                        profile_image || profile_url ? "" : $t("button.edit")
                      }}</span> -->
                    </div>
                  </div>
                  <p class="b-txt">*{{ $t("myPage.settings.imageText") }}</p>
                </div>
                <div class="form-group mb-24">
                  <label>{{ $t("myPage.settings.name") }}</label>
                  <input
                    v-model="user_name"
                    type="text"
                    :placeholder="$t('myPage.settings.username')"
                    class="form-control"
                    @keypress="requiredField"
                    :class="error.user_name ? 'error-border' : ''"
                    @keyup="error.user_name = ref('')"
                  />
                  <span v-if="error.user_name" class="error-txt">{{
                    error.user_name
                  }}</span>
                </div>
                <div class="form-group mb-24">
                  <label>{{ $t("myPage.settings.email") }}</label>
                  <input
                    v-model="user_email"
                    type="email"
                    :placeholder="$t('myPage.settings.emailText')"
                    class="form-control"
                    @keypress="requiredField"
                    :class="error.user_email ? 'error-border' : ''"
                    @keyup="error.user_email = ref('')"
                    readonly
                  />
                  <span v-if="error.user_email" class="error-txt">{{
                    error.user_email
                  }}</span>
                </div>
                <div class="form-group mb-24">
                  <label>{{ $t("myPage.settings.password") }}</label>
                  <a
                    @click="$router.push(`/setting-password/${u_id}`)"
                    class="btn outline red"
                    >{{ $t("myPage.settings.changePassword") }}</a
                  >
                </div>
                <div class="form-group">
                  <label>{{ $t("addNewMoviesForm.language") }}</label>
                  <div class="radio-otr">
                    <label class="radio-input"
                      >English
                      <input
                        type="radio"
                        checked
                        name="radio"
                        value="en"
                        v-model="language"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <label class="radio-input"
                      >한국어
                      <input
                        type="radio"
                        name="radio"
                        value="ko"
                        v-model="language"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="btn-innr setting-btn">
                  <a
                    href="#"
                    class="btn solid orange-btn"
                    @click="saveSettings"
                    >{{ $t("myPage.settings.saveChanges") }}</a
                  >
                </div>
                <p class="b-txt mb-0">
                  {{ $t("myPage.settings.cancelMembership") }}
                  <a
                    @click="$router.push('/my-page/withdrawal')"
                    class="frgt-txt"
                    >{{ $t("myPage.withdrawl.withdrawl") }}</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Image Edit Modal-->
    <div
      class="new-cast-modal center-popup-modal edit-modal"
      v-show="isEditImage"
    >
      <PopUpModal :isModal="isEditImage">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("myPage.settings.editImage") }}</h1>
          <button @click="isEditImage = false" class="cross-btn">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <p>{{ $t("myPage.settings.chooseImage") }}</p>
            <input
              type="file"
              placeholder="Choose an image"
              class="file-input__input"
              @change="selectImage"
            />
          </div>
          <div class="cast-details">
            <p class="cursor-pointer" @click="deleteImage">
              {{ $t("myPage.settings.deleteImage") }}
            </p>
          </div>
        </template>
      </PopUpModal>
    </div>
  </section>
</template>
<script setup>
import { inject, nextTick } from "vue";
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import MyPageService from "@/services/MyPageService.js";
import { onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { requiredField, isValidEmail } from "@/mixins/CommonValidation.js";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
import { computed } from "@vue/reactivity";

const isEditImage = ref(false);
const language = ref("en");
const user_email = ref("");
const user_name = ref("");
const profile_image = ref("");
const profile_url = ref("");
const u_id = localStorage.getItem("uid");
const is_delete_image = ref("n");
const error = ref({});
const leftKey = ref(0);
const common = inject("common");
const { t } = i18n.global;

onMounted(() => {
  getUserSettings();
});

watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getUserSettings();
    }
  }
);
const getUserSettings = () => {
  MyPageService.getUserSettings()
    .then((res) => {
      if (res.status == 200) {
        user_name.value = res.data.result.user_name;
        user_email.value = res.data.result.user_email;
        language.value = res.data.result.user_default_language;
        profile_url.value = res.data.result.user_profile_image;
        // profile_image.value = res.data.result.user_profile_image;
        localStorage.setItem("profileImage", profile_url.value);
      }
    })
    .catch((err) => {
      return;
    });
};

// select profile image
const selectImage = (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  profile_image.value = files[0];
  let fileSize = e.target.files[0].size;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(profile_image.value.name)) {
    Toast.fire({ title: t("Error.onlyJpg") });
    document.querySelector("#poster-pick").value = "";
    profile_url.value = "";
    profile_image.value = "";
    return false;
  } else if (fileSize > 1024 * 1024 * 5) {
    Toast.fire({ title: t("Error.profileFileSize") });
    document.querySelector("#poster-pick").value = "";
    profile_url.value = "";
    profile_image.value = "";
    return false;
  } else if (allowedExtensions.exec(profile_image.value.name)) {
    is_delete_image.value = "n";
    profile_url.value = URL.createObjectURL(e.target.files[0]);
  }
  isEditImage.value = false;
};
const deleteImage = () => {
  isEditImage.value = false;
  profile_image.value = "";
  profile_url.value = "";
  is_delete_image.value = "y";
};

const saveSettings = () => {
  if (user_name.value == "") {
    error.value.user_name = computed(() => t("Error.requiredInput"));
    return;
  }
  if (user_email.value == "") {
    error.value.user_email = computed(() => t("Error.requiredInput"));
    return;
  }
  if (!isValidEmail(user_email.value)) {
    error.value.user_email = computed(() => t("Error.pleaseValidEmail"));
    return false;
  } else {
    delete error.value.user_email;
  }
  let formData = new FormData();
  formData.append("user_id", u_id);
  formData.append("user_name", user_name.value);
  formData.append("user_email", user_email.value);
  formData.append("user_default_language", language.value);
  if (is_delete_image.value == "n" && profile_image.value != "") {
    formData.append("profile_image", profile_image.value);
    formData.append("is_delete_image", "n");
  } else if (is_delete_image.value == "n" && profile_image.value == "") {
    formData.append("is_delete_image", "n");
  } else {
    formData.append("is_delete_image", "y");
  }
  MyPageService.saveSettings(formData)
    .then(async (res) => {
      if (res.status == 200) {
        leftKey.value++;
        common.state.userId = parseInt(common.state.userId);
        await nextTick();
        common.state.userId = common.state.userId.toString();
        localStorage.setItem("profileImage", profile_url.value);
        // localStorage.setItem("uname", user_name.value);
        Toast.fire({ title: res.data.message });
      } else {
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};
</script>

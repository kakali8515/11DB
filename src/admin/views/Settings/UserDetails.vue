<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/user-management.svg" alt="" /></span
        >{{ $t("sideBar.subMenu.User Management") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("userManagement.userDetails") }}</h3>
        <div class="frm-innr w-100">
          <div class="basic-info-area">
            <ul>
              <li>
                <span>{{ $t("userManagement.userName") }}:</span>
                <p>
                  {{ userName }}
                </p>
              </li>
              <li>
                <span>{{ $t("placeholder.Enterpassword") }}:</span>
                <p>
                  {{ userPassword }}
                </p>
              </li>
              <li>
                <span>{{ $t("input_label.email") }}:</span>
                <p>
                  {{ userEmail }}
                </p>
              </li>
              <li>
                <span>{{ $t("userManagement.role") }}:</span>
                <p>
                  {{ userRole }}
                </p>
              </li>
              <li>
                <span>{{ $t("addNewPeople.mediadetails.imagesTitle") }}:</span>
                <div
                  v-if="userImage"
                  class="imgBx"
                  @click="isImageModal = true"
                >
                  <img :src="userImage" alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="btn-group justify-btwn">
          <div class="twoBtn">
            <input
              @click="$router.push(`/admin/addUser/${id}`)"
              type="submit"
              class="btn org-btn"
              :value="$t('button.edit')"
            />
            <input
              type="submit"
              @click="isDelete = true"
              class="btn outline blk-btn"
              :value="$t('button.delete')"
            />
          </div>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="
              $router.push({
                name: 'UserManagementList',
                params: {
                  page: route.params?.page ? route.params.page : '',
                },
              })
            "
          >
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
            <button class="red-fill-btn" @click="deleteUser">
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
    <div
      class="new-cast-modal add-img-modal new-media-modal"
      v-show="isImageModal"
    >
      <PopUpModal :isModal="isImageModal">
        <template v-slot:header>
          <h1>{{ $t("myPage.imageCard.imagePreview") }}</h1>
          <button @click="isImageModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="modal-img-area">
            <img :src="userImage" :alt="userImage" />
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
import UserService from "@/admin/services/UserServices.js";
import { useRoute, useRouter } from "vue-router";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import Toast from "@/alert/alert.js";

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const userName = ref("");
const userEmail = ref("");
const userPassword = ref("");
const userRole = ref("");
const userImage = ref("");

const isDelete = ref(false);
const isImageModal = ref(false);

onMounted(() => {
  getUserDetail();
});

// delete user
const deleteUser = () => {
  let data = {
    id: id.value,
  };
  UserService.deleteUser(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        router.push("/admin/UserManagementList");
        isDelete.value = false;
      }
    })
    .catch((err) => {
      return;
    });
};

const getUserDetail = () => {
  UserService.getUserDetail(id.value)
    .then((res) => {
      if (res.status == 200) {
        userEmail.value = res.data.email;
        userRole.value = res.data.role;
        userPassword.value = res.data.password;
        userName.value = res.data.name;
        userImage.value = res.data.user_image;
        document.title = `${res.data.name}-${t("pageTitle.admin.userDetails")} - 11DB`;
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
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

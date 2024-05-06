<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/user-management.svg" alt="" /></span>{{ $t("sideBar.subMenu.User Management") }}
      </h2>
      <div class="cm-bck">
        <h3 v-if="!route.params.id">{{ $t("userManagement.addUser") }}</h3>
        <h3 v-else>{{ $t("userManagement.editUser") }}</h3>

        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("input_label.email") }}</label>
              <input type="text" class="form-control" v-model="email" maxlength="150"
                :placeholder="$t('userManagement.enterEmail')" :class="emailError ? 'error-border' : ''"
                @keyup="checkEmail" :disabled="id != ''" />
              <span v-if="emailError" class="error-txt">{{ emailError }} </span>
            </div>
            <div class="form-group">
              <label>{{ $t("userManagement.role") }}</label>
              <Dropdown @dropdownValue="getRoleData" :search_type="userRole" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...searchRoleList.map((item) => {
                  return {
                    key: item.id,
                    value: item.display_name,
                  };
                }),
              ]" searchtitle="value" searchvalue="key" :isError="errorData.userRole ? true : false" />
              <span v-if="errorData.userRole" class="error-txt">{{ errorData.userRole }}
              </span>
            </div>

            <div class="form-group" v-if="!id">
              <label>{{ $t("userManagement.userName") }}</label>
              <input type="text" class="form-control" v-model="userName" :class="errorData.userName ? 'error-border' : ''"
                maxlength="150" :placeholder="$t('userManagement.enterName')" />
              <span v-if="errorData.userName" class="error-txt">{{ errorData.userName }}
              </span>
            </div>
          </div>

          <div class="row-3">
            <div class="form-group max-widt" v-if="id">
              <label>{{ $t("userManagement.userName") }}</label>
              <input type="text" class="form-control" v-model="userName" :class="errorData.userName ? 'error-border' : ''"
                maxlength="15" :placeholder="$t('userManagement.enterName')" />
              <span v-if="errorData.userName" class="error-txt">{{ errorData.userName }}
              </span>
            </div>
            <div class="form-group max-widt" v-if="!id">
              <label>{{ $t("myPage.settings.password") }}</label>
              <input type="text" class="form-control" v-model="userPassword"
                :class="errorData.userPassword ? 'error-border' : ''" maxlength="150"
                :placeholder="$t('userManagement.enterPassword')" />
              <span v-if="errorData.userPassword" class="error-txt">{{ errorData.userPassword }}
              </span>
            </div>
            <div class="form-group max-widt" v-if="id">
              <label>{{ $t("userManagement.newPassword") }}</label>
              <input type="password" class="form-control" v-model="userNewPassword"
                :class="errorData.userNewPassword ? 'error-border' : ''" maxlength="15"
                :placeholder="$t('userManagement.enterPassword')" />
              <span v-if="errorData.userNewPassword" class="error-txt">{{ errorData.userNewPassword }}
              </span>
            </div>
            <div class="form-group max-widt" v-if="!id">
              <label>{{ $t("userManagement.uploadProfilePicture") }}</label>
              <div class="input-upload-otr">
                <div class="input-upload">
                  <input type="text" class="form-control" :value="fileName" :class="fileError ? 'error-border' : ''"
                    readonly :placeholder="$t('adminAward.imageFileExtension')" />
                  <span v-if="fileError" class="error-txt">{{ fileError }}
                  </span>
                </div>
                <div class="upload-btn">
                  <input id="file" @change="chooseFile" type="file" ref="uploadFile" />
                  <label for="file" class="btn org-btn">{{
                    $t("bulk.import.chooseFile")
                  }}</label>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="!id"></div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <div class="twoBtn">
            <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="addUser" />
          </div>
          <button type="button" class="btn outline blk-btn" @click="
            $router.push({
              name: 'UserManagementList',
              params: { page: route.params?.page },
            })
            ">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import UserService from "@/admin/services/UserServices.js";
import { isValidEmail } from "@/mixins/CommonValidation.js";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { inject } from "vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
import validator from "validator";

const searchRoleList = ref([]);
const userRole = ref("");
const email = ref("");
const emailError = ref("");
const userName = ref("");
const userPassword = ref("");
const userNewPassword = ref("");

const file = ref("");
const fileURL = ref("");
const fileName = ref("");
const fileType = ref("");
const fileError = ref("");
const errorData = ref({});

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const uploadFile = ref(null);
const { t } = i18n.global;
const common = inject("common");

onMounted(() => {
  getSearchRoleList();
  if (id.value) getUserDetail();
  document.title = t("pageTitle.admin.editUser") + ' - 11DB';
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getSearchRoleList();
      if (id.value) getUserDetail();
    }
  }
);

const startsWithCapital = (word) => {
  return /[A-Z]/.test(word.charAt(0));
};

const getSearchRoleList = () => {
  UserService.getRoleList()
    .then((res) => {
      if (res.status == 200) {
        searchRoleList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

const getRoleData = (value) => {
  userRole.value = value;
};

const checkEmail = () => {
  if (email.value == "") {
    emailError.value = "";
    return true;
  }
  if (!validator.isEmail(email.value)) {
    emailError.value = t("Error.pleaseValidEmail");
    return false;
  } else {
    emailError.value = "";
  }
};

// choose file
const chooseFile = (e) => {
  fileError.value = "";
  let fileSize = e.target.files[0].size;
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  file.value = files[0];
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(file.value.name)) {
    fileError.value = t("Error.onlyJpg");
    file.value = "";
    fileURL.value = "";
    fileName.value = "";
    return false;
  } else if (fileSize > 1024 * 1024 * 25) {
    fileError.value = t("Error.uploadFileSize");
    file.value = "";
    fileURL.value = "";
    fileName.value = "";
    return false;
  } else if (allowedExtensions.exec(file.value.name)) {
    fileURL.value = URL.createObjectURL(e.target.files[0]);
    fileType.value = file.value.type;
    fileName.value = file.value.name;
    uploadFile.value = "";
  }
};

const getUserDetail = () => {
  UserService.getUserDetail(id.value)
    .then((res) => {
      if (res.status == 200) {
        email.value = res.data.email;
        userRole.value = res.data.role_id;
        userPassword.value = res.data.password;
        userName.value = res.data.name;
        fileName.value = res.data.user_image;
        if (id.value) {
          userPassword.value = "";
        }
      }
    })
    .catch((err) => {
      return;
    });
};

const addUser = () => {
  if (email.value == "") {
    emailError.value = t("Error.requiredInput");
    return;
  } else if (emailError.value) {
    return;
  } else {
    emailError.value = "";
  }
  if (userRole.value == "") {
    errorData.value.userRole = t("Error.requiredInput");
  } else {
    errorData.value.userRole = "";
  }
  if (userName.value == "") {
    errorData.value.userName = t("Error.requiredInput");
  } else {
    errorData.value.userName = "";
  }
  if (!id.value) {
    if (userPassword.value == "") {
      errorData.value.userPassword = t("Error.requiredInput");
    } else if (
      !userPassword.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      )
    ) {
      errorData.value.userPassword = t("Error.PasswordFormat");
    } else if (!startsWithCapital(userPassword.value)) {
      errorData.value.userPassword = t("Error.isCorrectPassword");
    } else {
      errorData.value.userPassword = "";
    }
  } else {
    if (userNewPassword.value != "") {
      if (
        !userNewPassword.value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        )
      ) {
        errorData.value.userNewPassword = t("Error.PasswordFormat");
      } else if (!startsWithCapital(userNewPassword.value)) {
        errorData.value.userNewPassword = t("Error.isCorrectPassword");
      } else {
        errorData.value.userNewPassword = "";
      }
    } else {
      errorData.value.userNewPassword = "";
    }
  }

  if (
    Object.values(errorData.value).filter((x) => {
      return x.length > 0;
    }).length != 0
  ) {
    return false;
  }

  let formData = new FormData();
  if (id.value) {
    let data = {
      id: id.value,
      role_id: userRole.value,
      name: userName.value,
    };
    if (userNewPassword.value != "") data.password = userNewPassword.value;
    UserService.editUser(data)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          router.push("/admin/UserManagementList");
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  } else {
    formData.append("email", email.value);
    formData.append("name", userName.value);
    formData.append("role_id", userRole.value);
    formData.append("password", userPassword.value);
    formData.append("profile_image", file.value);

    UserService.addUser(formData)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          router.push("/admin/UserManagementList");
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  }
};
</script>
<style scoped>
.center {
  text-align: center !important;
}

.error-txt {
  color: #db5857;
  padding-left: 0;
  font-weight: 600;
  font-size: 14px;
  display: block;
  text-align: left;
}
</style>

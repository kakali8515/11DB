<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/user-management.svg" alt="" /></span>{{ $t("sideBar.subMenu.User Management") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("userManagement.userType") }}</label>
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
              ]" searchtitle="value" searchvalue="key" />
            </div>
            <div class="form-group">
              <label>{{ $t("userManagement.username") }}</label>
              <input type="text" :placeholder="$t('userManagement.enterName')" class="form-control" v-model="userName" />
            </div>
            
          </div>
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("userManagement.Datetype") }}</label>
              <Dropdown @dropdownValue="getDateType" :search_type="search_date_type" :searchTitleListItem="[
                { name: $t('dictionary.select'), value: '' },
                { name: $t('userManagement.createdAt'), value: 'created_date' },
                { name: $t('userManagement.lastLogIn'), value: 'last_login_date' },
              ]" searchtitle="name" searchvalue="value" />
            </div>
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
                        ? new Date(new Date(searchStartDate).getTime() + 1000)
                        : ''
                        " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="
            page = 1;
          getUserList();
          " />
          <button type="button" class="btn outline blk-btn" @click="resetList">
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <h3>{{ $t("userManagement.userList") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ total_records }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select class="form-control" @change="getListByValue($event)">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
            </div>
          </div>
          <div class="frm-innr">
            <div class="form-group mb-0">
              <button @click="$router.push(`/admin/addUser`)" type="button" class="btn or-btn">
                {{ $t("userManagement.+addUser") }}
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
                    {{ $t("userManagement.profile") }}
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("input_label.email") }}
                    <span @click="sorting('email')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("userManagement.role") }}
                    <span @click="sorting('type')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("userManagement.createdAt") }}
                    <!-- <span @click="sorting('created_at')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span> -->
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("userManagement.lastLogIn") }}
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.action") }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="userList.length > 0">
                <tr v-for="(list, index) in userList" :key="index">
                  <td style="text-align: center">
                    {{ (page - 1) * limit + (index + 1) }}
                  </td>
                  <td>
                    <div v-if="list.user_image?.includes('https')" class="posterImg">
                      <img :src="list.user_image" />
                    </div>
                    <div v-else class="posterImg">
                      <img src="@/assets/images/no-image-view.png" />
                    </div>
                  </td>
                  <td>{{ list.email }}</td>
                  <td>
                    {{ list.role }}
                  </td>
                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(list.created_at) }}</li>
                    </ul>
                  </td>
                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(list.last_login, 'time') }}</li>
                    </ul>
                  </td>
                  <td>
                    <div class="action">
                      <a @click="
                        $router.push({
                          name: 'UserManagementDetails',
                          params: { id: list.id, page: page },
                        })
                        "><img src="@/assets/icons/eye.svg" /></a>
                      <a><img @click="
                        $router.push({
                          name: 'UserManagementAddUser',
                          params: { id: list.id, page: page },
                        })
                        " src="/src/assets/icons/edit-icon.svg" alt="" /></a>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="12" class="center">
                    <p>{{ $t("dictionary.noData") }}</p>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <template v-if="userList?.length > 0">
          <pagination v-model="page" :records="total_records" :per-page="limit" :options="chunkPage"
            @paginate="clickInternalPage" />
        </template>
      </div>
    </div>

    <!-- show popup when choose date -->
    <div class="new-cast-modal center-popup-modal" v-show="isDateSelected">
      <PopUpModal :isModal="isDateSelected">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("userManagement.chooseDateType") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="isDateSelected = false">
              {{ $t("button.ok") }}
            </button>
            <!-- <button class="black-outline-btn" @click="isDateSelected = false">
              {{ $t("button.cancel") }}
            </button> -->
          </div>
        </template>
      </PopUpModal>
    </div>

  </div>
</template>
<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import UserService from "@/admin/services/UserServices.js";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import moment from "moment";
import Calender from "@/components/Calender.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";

const datePlaceholder = ref("YYYY-MM-DD");
const route = useRoute();
const userList = ref([]);
const searchRoleList = ref([]);
const userRole = ref("");
const userName = ref("");
const search_date_type = ref("");
const searchStartDate = ref("");
const searchEndDate = ref("");
const isDateSelected = ref(false);

const page = route.params?.page ? ref(parseInt(route.params.page)) : ref(1);
const limit = ref(10);
const total_records = ref(0);
const chunkPage = ref({ chunk: 5 });

const common = inject("common");
const sort_order = ref("");
const sort_by = ref("");

onMounted(() => {
  getSearchRoleList();
  getUserList();
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getSearchRoleList();
      getUserList();
    }
  }
);

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

const getDateType = (value) => {
  search_date_type.value = value;
};

const getSearchStartDate = (date) => {
  searchStartDate.value = date;
};
const getSearchEndDate = (date) => {
  searchEndDate.value = date;
};

const clickInternalPage = (click) => {
  page.value = click;
  getUserList();
};

const getListByValue = (event) => {
  page.value = 1;
  limit.value = event.target.value;
  getUserList();
};

const resetList = () => {
  userName.value = "";
  userRole.value = "";
  searchStartDate.value = "";
  searchEndDate.value = "";
  search_date_type.value = "";
  isDateSelected.value = false;
  getUserList();
};

const sorting = (sortBy) => {
  sort_by.value = sortBy;
  sort_order.value = sort_order.value == "desc" ? "asc" : "desc";
  getUserList();
};

const dateformat = (value, type) => {
  if (value) {
    if (type == "time") {
      return moment.utc(value).local().format("YYYY.MM.DD HH:mm:ss");
    } else {
      return moment.utc(value).local().format("YYYY.MM.DD");
    }
  }
};
const getUserList = () => {
  if (searchStartDate.value || searchEndDate.value) {
    if (search_date_type.value == "") {
      isDateSelected.value = true;
      return;
    }
  }

  let data = {
    type: userRole.value,
    name: userName.value,
    page: page.value,
    limit: limit.value,
    sort_by: sort_by.value,
    sort_order: sort_order.value,
    search_date_type: search_date_type.value,
    start_date: searchStartDate.value,
    end_date: searchEndDate.value,
  };

  UserService.getUserList(data)
    .then((res) => {
      if (res.status == 200) {
        userList.value = res.data.results;
        total_records.value = res.data.total_records;
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

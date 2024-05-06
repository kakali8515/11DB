<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/menu-alt-list.svg" alt="" /></span>{{ $t("edit.list.title") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.worklist.type") }}</label>
              <Dropdown @dropdownValue="getTypeData" :search_type="searchType" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...Object.keys(searchTypeList).map((key) => {
                  return { key: key, value: searchTypeList[key] };
                }),
              ]" searchtitle="value" searchvalue="key" @change="changeTitle" />
            </div>
            <div class="form-group">
              <label>{{ $t("bulk.worklist.title") }}</label>
              <input type="text" :placeholder="$t('bulk.worklist.titleText')" class="form-control"
                v-model="searchTitle" />
            </div>
            <div class="form-group">
              <label>{{ $t("edit.list.content_id") }}</label>
              <input type="text" @keypress="isIntegerNumber($event)" :placeholder="$t('edit.list.enter_content_id')"
                class="form-control" v-model="content_id" />
            </div>
          </div>
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("edit.list.userID") }}</label>
              <div class="id-otr">
                <input type="text" :placeholder="$t('bulk.worklist.idText')" class="form-control" v-model="searchEmail"
                  @keyup="checkEmail" :class="emailError ? 'error-border' : ''" />
              </div>
              <span v-if="emailError" class="error-txt">{{ emailError }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("edit.list.status") }}</label>
              <Dropdown @dropdownValue="getStatusData" :search_type="searchTitleStatus" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...Object.keys(statusTypeList).map((key) => {
                  return { key: key, value: statusTypeList[key] };
                }),
              ]" searchtitle="value" searchvalue="key" />
            </div>
            <div class="form-group">
              <label>{{ $t("edit.list.editorName") }}</label>
              <Dropdown @dropdownValue="selectSearchEditor" :search_type="searchEditor" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...searchEditorList.map((item) => {
                  return {
                    key: item.name,
                    value: item.name,
                  };
                }),
              ]" searchtitle="value" searchvalue="key" />
            </div>

          </div>
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("edit.list.operation") }}</label>
              <Dropdown @dropdownValue="getOperationData" :search_type="searchOperation" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...Object.keys(operationTypeList).map((key) => {
                  return { key: key, value: operationTypeList[key] };
                }),
              ]" searchtitle="value" searchvalue="key" />
            </div>

            <div class="form-group">
              <label>{{ $t("userManagement.Datetype") }}</label>
              <Dropdown @dropdownValue="getDateType" :search_type="search_date_type" :searchTitleListItem="[
                { name: $t('dictionary.select'), value: '' },
                { name: $t('bulk.worklist.modifiedDate'), value: 'modified_date' },
                { name: $t('edit.list.registrationDate'), value: 'registration_date' },
              ]" searchtitle="name" searchvalue="value" />
            </div>
            <div class="form-group">
              <div class="dubble-date-btn">
                <div class="form-group">
                  <label>{{ $t("edit.list.startDate") }}</label>
                  <div class="input-date">
                    <Calender @date="getSearchStartDate" :input_date="searchStartDate" :isTime="true"
                      :datePlaceholder="datePlaceholder" :max_date="searchEndDate ? new Date(searchEndDate) : ''" />
                  </div>
                </div>

                <div class="form-group">
                  <label>{{ $t("edit.list.endDate") }}</label>
                  <div class="input-date">
                    <Calender @date="getSearchEndDate" :input_date="searchEndDate" :datePlaceholder="datePlaceholder"
                      :isTime="true" :min_date="searchStartDate
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
          getEditList();
          " />
          <button type="button" class="btn outline blk-btn" @click="resetList">
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <h3>{{ $t("edit.list.header") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ total_records }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select class="form-control" @change="getListByValue($event)">
                  <option>{{ $t("bulk.worklist.pageLimit25") }}</option>
                  <option>{{ $t("bulk.worklist.pageLimit50") }}</option>
                  <option>{{ $t("bulk.worklist.pageLimit75") }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="frm-innr">
            <div class="form-group mb-0">
              <select class="form-control width-200" @change="getExportWorkList($event)" v-model="currentSelectedOption">
                <option value="0" selected>
                  {{ $t("dictionary.select") }}
                </option>
                <option v-for="(option, i) in selectOption" :key="i" :value="option.id"
                  :disabled="checkedItems.length == 0">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="table-inner-scroll">
          <table class="table-otr table-innr bulk-working-tbl last-col">
            <thead>
              <tr>
                <th>
                  <div class="check-innr">
                    <label class="check-inn">
                      <input type="checkbox" v-model="isAllChecked" @click="getAllChecked($event)"
                        :checked="isAllChecked == true ? true : false" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </th>
                <th>{{ $t("dictionary.agentList.no") }}</th>
                <th>
                  <div class="data-hdr">
                    {{ $t("bulk.worklist.type") }}
                    <span @click="sorting('type')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.title(ID)") }}
                    <span @click="sorting('title_name')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.editor") }}
                    <span @click="sorting('editor_name')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.operation") }}
                    <span @click="sorting('operation')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.userID") }}
                    <span @click="sorting('email_id')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("bulk.worklist.modifiedDate") }}
                    <span @click="sorting('modified_date')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.status") }}
                    <span @click="sorting('status')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.registration") }}
                    <span @click="sorting('registration_date')"><img src="@/assets/icons/ud-arrow-icon.svg"
                        alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("edit.list.active/inactive") }}
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
              <template v-if="editList.length > 0">
                <tr v-for="(list, index) in editList" :key="index">
                  <td>
                    <div class="check-innr">
                      <label class="check-inn">
                        <input type="checkbox" v-model="checkedItems" :value="list.edit_id" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </td>
                  <td style="text-align: center">
                    {{ (page - 1) * limit + (index + 1) }}
                  </td>
                  <td>
                    {{
                      list.type == "movie"
                      ? $t("header.mainMenu.Movies")
                      : list.type == "tv"
                        ? $t("header.mainMenu.TVShows")
                        : list.type == "webtoons"
                          ? $t("header.mainMenu.Webtoons")
                          : list.type == "people"
                            ? $t("header.mainMenu.People")
                            : "-"
                    }}
                  </td>
                  <td @click="
                    list.active_inactive == 'active' ? redirect(list) : ''
                    " :class="list.active_inactive == 'active' ? 'cursor-pointer' : ''
            ">
                    {{ list.title_name }}
                  </td>
                  <td>{{ list.editor_name }}</td>
                  <td>
                    <div class="table-dropdown">
                      <Dropdown @dropdownValue="
                        addOperation($event, list.edit_id, list.editable_id)
                        " :search_type="list.operation == null ? '' : list.operation
    " :searchTitleListItem="[
    {
      key: '',
      value: $t('dictionary.select'),
      disabled: true,
    },
    ...Object.keys(operationTypeList).map((key) => {
      return { key: key, value: operationTypeList[key] };
    }),
  ]" searchtitle="value" searchvalue="key" />
                    </div>
                  </td>
                  <td>{{ list.email_id }}</td>
                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(list.modified_date) }}</li>
                    </ul>
                  </td>
                  <td v-if="list.status">
                    <span class="status-btn" :class="list.class">{{
                      $t(list.status)
                    }}</span>
                  </td>
                  <td v-else class="center">-</td>

                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(list.registration_date) }}</li>
                    </ul>
                  </td>
                  <td>
                    <div class="switch-innr">
                      <label class="switch">
                        <input type="checkbox" @click="
                          updateStatus(list.edit_id, list.type, list, $event)
                          " :checked="list.active_inactive == 'active' ||
    list.active_inactive == ''
    ? true
    : false
    " />
                        <small></small>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="action">
                      <!-- <a
                        ><img
                          @click="redirectToEditPage(list)"
                          src="/src/assets/icons/edit-icon.svg"
                          alt=""
                      /></a> -->
                      <a @click="openDeletePopup(list.edit_id)"><img src="@/assets/icons/delete-icon.svg" alt="" /></a>
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
        <template v-if="editList?.length > 0">
          <pagination v-model="page" :records="total_records" :per-page="limit" :options="chunkPage"
            @paginate="clickInternalPage" />
        </template>
      </div>
    </div>
    <!-- delete tag -->
    <div class="new-cast-modal center-popup-modal" v-show="isDelete">
      <PopUpModal :isModal="isDelete">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("dictionary.tagSearch.delete") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="deleteList">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
    <!-- allocate <model-->
    <div class="new-cast-modal center-popup-modal allocate-modal" v-show="isAllocate">
      <PopUpModal :isModal="isAllocate">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("edit.list.allocateHeader") }}</h1>
        </template>
        <template v-slot:body>
          <div class="form-group">
            <label>{{ $t("edit.list.editorName") }}</label>
            <Dropdown @dropdownValue="selectEditor" :search_type="editors" :searchTitleListItem="[
              {
                key: '',
                value: $t('dictionary.select'),
                disabled: true,
              },
              ...searchEditorList.map((item) => {
                return {
                  key: item.id,
                  value: item.name,
                };
              }),
            ]" searchtitle="value" searchvalue="key" :isError="editorError == '' ? false : true" />
            <span v-if="editorError" class="error-txt">{{ editorError }}</span>
          </div>
        </template>

        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="allocateEditor">
              {{ $t("button.save") }}
            </button>
            <button class="black-outline-btn" @click="isAllocate = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
    <!-- deallocate modal -->
    <div class="new-cast-modal center-popup-modal" v-show="isDeallocate">
      <PopUpModal :isModal="isDeallocate">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("edit.list.deallocateHeader") }}</h1>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <p v-if="editorList.length > 0">
              {{ $t("edit.list.editorName") }}:

              <span v-for="(item, index) in editorList" :key="index">{{ item }}
                <p class="inline" v-if="index != editorList.length - 1">,</p>
              </span>
            </p>
          </div>
          <div class="form-group">
            <label>{{ $t("edit.list.newEditorName") }}</label>
            <Dropdown @dropdownValue="selectEditor" :search_type="editors" :searchTitleListItem="[
              {
                key: '',
                value: $t('dictionary.select'),
                disabled: true,
              },
              ...searchEditorList.map((item) => {
                return {
                  key: item.id,
                  value: item.name,
                };
              }),
            ]" searchtitle="value" searchvalue="key" />
          </div>
        </template>

        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="deallocateEditor">
              {{ $t("button.save") }}
            </button>
            <button class="black-outline-btn" @click="isDeallocate = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
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

    <Loading :active="isLoading" :can-cancel="true" :opacity="0"></Loading>
  </div>
</template>
<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import Calender from "@/components/Calender.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import EditListService from "@/admin/services/EditListService";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
import { ref } from "@vue/reactivity";
import { isValidEmail, isIntegerNumber } from "@/mixins/CommonValidation.js";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import moment from "moment";
import Loading from "vue3-loading-overlay";

const emit = defineEmits(['stopLoading']);

const editList = ref([]);

const searchTypeList = ref([]);
const searchType = ref("");

const searchOperation = ref("");
const operationTypeList = ref([]);

const statusTypeList = ref([]);
const searchTitleStatus = ref("");

const datePlaceholder = ref("YYYY-MM-DD");

const page = ref(1);
const limit = ref(25);
const total_records = ref(0);
const chunkPage = ref({ chunk: 5 });

const searchTitle = ref("");
const searchEmail = ref("");

const searchEditorList = ref([]);
const editorList = ref([]);
const editors = ref("");
const searchEditor = ref("");
const selectedEditor = ref("");
const content_id = ref("");

const searchStartDate = ref("");
const searchEndDate = ref("");
const search_date_type = ref("");
const isDateSelected = ref(false);

const editId = ref("");

const currentSelectedOption = ref(0);

const isAllocate = ref(false);
const isDeallocate = ref(false);

const isAllChecked = ref(false);
const checkedItems = ref([]);
const isDelete = ref(false);

const { t } = i18n.global;
const common = inject("common");
const editorError = ref("");
const emailError = ref("");
const selectOption = ref([]);

const sort_order = ref("");
const sort_by = ref("");
const router = useRouter();
const isLoading = ref(false);

onMounted(() => {
  getEditList();
  getSearchTypeList();
  getOperationTypeList();
  getStatusTypeList();
  getEditorList();
  selectOption.value = [
    { id: 1, name: t("edit.list.allocate") },
    { id: 2, name: t("edit.list.deallocate") },
  ];
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getEditList();
      getSearchTypeList();
      getOperationTypeList();
      getStatusTypeList();
      selectOption.value = [
        { id: 1, name: t("edit.list.allocate") },
        { id: 2, name: t("edit.list.deallocate") },
      ];
    }
  }
);
const selectEditor = (value) => {
  selectedEditor.value = value;
};
const selectSearchEditor = (value) => {
  searchEditor.value = value;
};
const getSearchTypeList = () => {
  EditListService.getListType()
    .then((res) => {
      if (res.status == 200) {
        searchTypeList.value = res.data.type_list;
      }
    })
    .catch((err) => {
      return;
    });
};

const getTypeData = (value) => {
  searchType.value = value;
  if (searchType.value != "people") {
    searchTitleStatus.value = "";
    getStatusTypeList(value);
  } else statusTypeList.value = [];
};

// title status dropdown
const getStatusTypeList = (searchType) => {
  EditListService.getStatusType({ type: searchType })
    .then((res) => {
      if (res.status == 200) {
        statusTypeList.value = res.data.status_list;
      }
    })
    .catch((err) => {
      return;
    });
};

const getStatusData = (value) => {
  searchTitleStatus.value = value;
};

const changeTitle = () => {
  searchTitleStatus.value = "";
};

const getOperationTypeList = () => {
  EditListService.getOperationTypeList()
    .then((res) => {
      if (res.status == 200) {
        operationTypeList.value = res.data.type_list;
      }
    })
    .catch((err) => {
      return;
    });
};

const getOperationData = (value) => {
  searchOperation.value = value;
};

const getEditorList = () => {
  EditListService.getEditorList()
    .then((res) => {
      if (res.status == 200) {
        searchEditorList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

const checkTitleEditor = () => {
  EditListService.checkTitleEditor(checkedItems.value)
    .then((res) => {
      if (res.status == 200) {
        editorList.value = res.data.editor;
      }
    })
    .catch((err) => {
      return;
    });
};

const addOperation = (event, edit_id, title_id) => {
  let data = {
    edit_id: edit_id,
    title_id: title_id,
    operation: event,
  };
  EditListService.addOperation(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
      }
    })
    .catch((err) => {
      return;
    });
};
const updateStatus = (edit_id, type, list, e) => {
  let data = {
    edit_id: edit_id,
    type: type,
  };
  EditListService.updateStatus(data)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        if (e.target.checked) {
          list.active_inactive = "active";
        } else {
          list.active_inactive = "inactive";
        }
      }
    })
    .catch((err) => {
      return;
    });
};
function dateformat(value) {
  if (value) {
    return moment.utc(value).local().format("YYYY-MM-DD HH:mm:ss");
  }
}
const getSearchStartDate = (date) => {
  searchStartDate.value = date;
};
const getSearchEndDate = (date) => {
  searchEndDate.value = date;
};
const getDateType = (value) => {
  search_date_type.value = value;
};

const clickInternalPage = (click) => {
  page.value = click;
  getEditList();
};

const getListByValue = (event) => {
  page.value = 1;
  limit.value = event.target.value;
  getEditList();
};
const getExportWorkList = (event) => {
  currentSelectedOption.value = event.target.value;
  checkTitleEditor();
  selectedEditor.value = "";
  if (event.target.value == 1) {
    editorError.value = "";
    isAllocate.value = true;
    currentSelectedOption.value = 0;
  } else if (event.target.value == 2) {
    isDeallocate.value = true;
    currentSelectedOption.value = 0;
  }
};

const deleteList = () => {
  isDelete.value = false;
  EditListService.deleteEditList(editId.value)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: res.data.message });
        getEditList();
      }
    })
    .catch((err) => {
      return;
    });
};

const openDeletePopup = (id) => {
  editId.value = id;
  isDelete.value = true;
};

const resetList = () => {
  searchType.value = "";
  searchTitle.value = "";
  searchEmail.value = "";
  searchTitleStatus.value = "";
  searchEditor.value = "";
  searchStartDate.value = "";
  searchEndDate.value = "";
  searchOperation.value = "";
  search_date_type.value = "";
  content_id.value = "";
  isDateSelected.value = false;
  getEditList();
};

const getAllChecked = () => {
  if (checkedItems.value.length == editList.value.length) {
    checkedItems.value = [];
  } else {
    checkedItems.value = editList.value.map((item) => {
      return item.edit_id;
    });
  }
};
// check agency email
const checkEmail = () => {
  if (searchEmail.value == "") {
    emailError.value = "";
    return true;
  }
  if (!isValidEmail(searchEmail.value)) {
    emailError.value = t("Error.pleaseValidEmail");
    return false;
  } else {
    emailError.value = "";
  }
};

const sorting = (sortBy) => {
  sort_by.value = sortBy;
  sort_order.value = sort_order.value == "desc" ? "asc" : "desc";
  getEditList();
};

const allocateEditor = () => {
  if (selectedEditor.value == "") {
    editorError.value = t("Error.requiredField");
    return;
  }
  let data = {
    edit_id: checkedItems.value,
    user_id: selectedEditor.value,
  };
  EditListService.allocateEditor(data)
    .then((res) => {
      if (res.status == 200) {
        isAllocate.value = false;
        Toast.fire({ title: res.data.message });
        getEditList();
      } else {
        isAllocate.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

const deallocateEditor = (id) => {
  let data = {
    edit_id: checkedItems.value,
    user_id: selectedEditor.value,
  };
  EditListService.deallocateEditor(data)
    .then((res) => {
      if (res.status == 200) {
        isDeallocate.value = false;
        Toast.fire({ title: res.data.message });
        getEditList();
      }
    })
    .catch((err) => {
      return;
    });
};
const redirect = (list) => {
  let url;
  if (list.type == "people") {
    url = `/people/details/${list.editable_id}`;
    window.open(url, "_blank");
  } else if (list.type == "movie") {
    url = `/movies/details/${list.editable_id}`;
    window.open(url, "_blank");
  } else if (list.type == "webtoons") {
    url = `/webtoons/detail/${list.editable_id}`;
    window.open(url, "_blank");
  } else if (list.type == "tv") {
    url = `/tvshows/details/${list.editable_id}`;
    window.open(url, "_blank");
  }
};

const redirectToEditPage = (list) => {
  let url;
  if (list.type == "people") {
    url = `/AddNewPeopleForm/${list.editable_id}/internal`;
    window.open(url, "_blank");
  } else if (list.type == "movie") {
    url = `/AddNewMovieForm/${list.editable_id}/internal`;
    window.open(url, "_blank");
  } else if (list.type == "webtoons") {
    url = `/add-webtoon-details/${list.editable_id}/internal`;
    window.open(url, "_blank");
  } else if (list.type == "tv") {
    url = `/add-tv-details/${list.editable_id}/internal`;
    window.open(url, "_blank");
  }
};

const getEditList = () => {
  if (emailError.value) {
    return;
  }

  if (searchStartDate.value || searchEndDate.value) {
    if (search_date_type.value == "") {
      isDateSelected.value = true;
      return;
    }
  }

  isLoading.value = true;
  emit('stopLoading');

  let data = {
    search_type: searchType.value,
    search_title: searchTitle.value,
    search_email: searchEmail.value,
    search_title_status: searchTitleStatus.value,
    search_editor_name: searchEditor.value,
    search_start_date: searchStartDate.value,
    search_end_date: searchEndDate.value,
    search_date_type: search_date_type.value,
    search_operation: searchOperation.value,
    sort_order: sort_order.value,
    sort_by: sort_by.value,
    content_id : content_id.value,
    page: page.value,
    limit: limit.value,
  };

  EditListService.getEditList(data)
    .then((res) => {
      if (res.status == 200) {
        isLoading.value = false;
        editList.value = res.data.result;
        editList.value = editList.value.map((listItem) => {
          switch (listItem.status) {
            case "rumored":
              listItem.class = "red";
              break;
            case "planned":
              listItem.class = "yellow";
              break;
            case "pilot":
              listItem.class = "light-blue";
              break;
            case "in_production":
              listItem.class = "orange";
              break;
            case "ongoing":
              listItem.class = "skyblue";
              break;
            case "canceled":
              listItem.class = "gray";
              break;
            case "hiatus":
              listItem.class = "purple";
              break;
            case "released":
              listItem.class = "green";
              break;
            case "returning_series":
              listItem.class = "light-red";
              break;
            case "ended":
              listItem.class = "red";
              break;
            default:
              listItem.class = "";
          }
          return listItem;
        });
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

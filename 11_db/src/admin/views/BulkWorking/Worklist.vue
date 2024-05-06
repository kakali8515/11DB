<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/worklist-icon.svg" alt="" /></span>{{ $t("bulk.worklist.header") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.worklist.type") }}</label>
              <!-- <select class="form-control" v-model="search_type">
                <option value="" selected>{{ $t("dictionary.select") }}</option>
                <option v-for="(type, i) in searchTypeList" :key="i" :value="i">
                  {{ type }}
                </option>
              </select> -->

              <Dropdown @dropdownValue="getWorkData" :search_type="search_type" :searchTitleListItem="[
                {
                  key: '',
                  value: $t('dictionary.select'),
                  disabled: true,
                },
                ...Object.keys(searchTypeList).map((key) => {
                  return { key: key, value: searchTypeList[key] };
                }),
              ]" searchtitle="value" searchvalue="key" />
            </div>
            <div class="form-group">
              <label>{{ $t("bulk.worklist.title") }}</label>
              <input type="text" :placeholder="$t('bulk.worklist.titleText')" class="form-control"
                v-model="search_title_name" />
            </div>
            <div class="form-group">
              <label>{{ $t("bulk.worklist.id") }}</label>
              <div class="id-otr">
                <div class="form-group">
                  <!-- <select class="form-control" v-model="search_id_type">
                  <option value="" selected>
                    {{ $t("dictionary.select") }}
                  </option>
                  <option
                    v-for="(id, i) in searchIdTypeList"
                    :key="i"
                    :value="i"
                  >
                    {{ id }}
                  </option>
                </select>  -->

                  <Dropdown @dropdownValue="
                    (value) => {
                      search_id_type = value;
                    }
                  " :search_type="search_id_type" :searchTitleListItem="[
  {
    key: '',
    value: $t('dictionary.select'),
    disabled: true,
  },
  ...Object.keys(searchIdTypeList).map((key) => {
    return { key: key, value: searchIdTypeList[key] };
  }),
]" searchtitle="value" searchvalue="key" />
                </div>
                <input type="text" :placeholder="$t('bulk.worklist.idText')" class="form-control" v-model="search_id" />
              </div>
            </div>
          </div>
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.worklist.modifiedDate") }}</label>
              <div class="input-date">
                <Calender @date="getSearchDate" :input_date="search_date" :datePlaceholder="datePlaceholder" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("bulk.worklist.tivingId") }}</label>
              <div class="radio-innr">
                <ul>
                  <li>
                    <label class="rdo">{{ $t("bulk.worklist.all") }}
                      <input type="radio" name="radio" value="all" v-model="tiving_id" />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="rdo">{{ $t("bulk.worklist.exist") }}
                      <input type="radio" name="radio" value="exist" v-model="tiving_id" />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="rdo">{{ $t("bulk.worklist.notExist") }}
                      <input type="radio" name="radio" value="not_exist" v-model="tiving_id" />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="searchList" />
          <button type="button" class="btn outline blk-btn" @click="resetList">
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <h3>{{ $t("bulk.worklist.header") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ total_records }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select class="form-control" @change="getWorkListByValue($event)">
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
                <option v-for="(option, i) in selectExportOption" :key="i" :value="option.id"
                  :disabled="selectedIdArray.length == 0">
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
                    {{ $t("bulk.worklist.title") }}
                    <span @click="sorting('title')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("bulk.worklist.id") }}
                    <span @click="sorting('unique_id')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
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
                    {{ $t("bulk.worklist.TIVINGID") }}
                    <span @click="sorting('tiving_id')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("bulk.worklist.worker") }}
                    <span @click="sorting('worker')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="workingList.length > 0">
                <tr v-for="(workList, index) in workingList" :key="index">
                  <td>
                    <div class="check-innr">
                      <label class="check-inn">
                        <input type="checkbox" v-model="workList.isChecked" @click="getSelectedId($event, workList)"
                          :disabled="
                            workList.unique_id == '' ||
                            workList.unique_id == null
                          " />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </td>
                  <td>{{ workList.no }}</td>
                  <td>
                    {{
                      workList.type == "movie"
                      ? "Movies"
                      : workList.type == "tv"
                        ? "TV"
                        : workList.type == "people"
                          ? "People"
                          : workList.type == "webtoons"
                            ? "Webtoons"
                            : ""
                    }}
                  </td>
                  <td>{{ workList.title }}</td>
                  <td>{{ workList.unique_id }}</td>
                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(workList.modified_date) }}</li>
                    </ul>
                  </td>
                  <td>{{ workList.tiving_id }}</td>
                  <td>{{ workList.worker }}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="8" class="center">
                    <p>{{ $t("dictionary.noData") }}</p>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <template v-if="workingList?.length > 0">
          <pagination v-model="page" :records="total_records" :per-page="limit" :options="chunkPage"
            @paginate="clickInternalPage" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import Calender from "@/components/Calender.vue";
import BulkWorkingExportService from "@/admin/services/BulkExportAndWorkListService";
import moment from "moment";
export default {
  name: "Worklist",
  components: { Sidebar, Calender },
  inject: ["common"],

  data() {
    return {
      search_type: "",
      search_title_name: "",
      search_id_type: "",
      search_id: "",
      search_date: "",
      tiving_id: "",
      page: 1,
      limit: 25,
      total_records: 0,
      chunkPage: { chunk: 5 },
      workingList: [],
      searchTypeList: [],
      searchIdTypeList: [],
      export_type: "",
      selectedIdArray: [],
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      // tempSelectedArray:[],
      selectExportOption: [
        { id: 1, name: "JSON" },
        { id: 2, name: "Excel" },
      ],
      currentSelectedOption: 0,
      isAllChecked: false,
      datePlaceholder: "MM.DD.YYYY",
      sort_by: "",
      sort_order: "",
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getSearchTypeList();
      this.getSearchIdTypeList(); this.getWorkList();
    },
  },
  mounted() {
    this.getSearchTypeList();
    this.getSearchIdTypeList();
    this.getWorkList();
  },
  methods: {
    getWorkListByValue(event) {
      this.page = 1;
      this.limit = event.target.value;
      this.getWorkList();
    },
    getWorkData(value) {
      this.search_type = value;
    },
    clickInternalPage(click) {
      this.page = click;
      this.isAllChecked = false;
      this.getWorkList();
    },
    getSearchDate(date) {
      this.search_date = date;
    },
    getSearchTypeList() {
      BulkWorkingExportService.getSearchTypeList()
        .then((response) => {
          if (response.status == 200) {
            this.searchTypeList = response.data.result;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getSearchIdTypeList() {
      BulkWorkingExportService.getSearchIdTypeList()
        .then((response) => {
          if (response.status == 200) {
            this.searchIdTypeList = response.data.result;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getWorkList() {
      let data = {
        search_type: this.search_type,
        search_title_name: this.search_title_name,
        search_id_type: this.search_id_type,
        search_id: this.search_id,
        search_date: this.search_date,
        tiving_id: this.tiving_id,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };

      BulkWorkingExportService.getworkList(data)
        .then((response) => {
          if (response.status == 200) {
            this.workingList = response.data.data;
            for (let i = 0; i < this.workingList.length; i++) {
              this.workingList[i]["no"] = (this.page - 1) * this.limit + i + 1;
              this.workingList[i].isChecked = false;
            }
            this.total_records = response.data.total_records;
            //for selection of checkbox
            if (this.selectedIdArray.length > 0) {
              for (let i = 0; i < this.workingList.length; i++) {
                for (let j = 0; j < this.selectedIdArray.length; j++) {
                  if (this.selectedIdArray[j].no == this.workingList[i].no) {
                    this.workingList[i].isChecked = true;
                  }
                }
              }
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    searchList() {
      this.page = 1;
      this.isAllChecked = false;
      this.selectedIdArray = [];
      this.workingList.forEach((item) => {
        item.isAllChecked = false;
      });
      this.getWorkList();
    },
    resetList() {
      this.selectedIdArray = [];
      this.workingList.forEach((item) => {
        item.isAllChecked = false;
      });
      this.page = 1;
      this.isAllChecked = false;
      this.search_type = "";
      this.search_title_name = "";
      this.search_id_type = "";
      this.search_id = "";
      this.search_date = "";
      this.tiving_id = "";
      this.getWorkList();
    },
    ExportworkList() {
      let tempSelectedArray = [];
      //for single selection
      if (this.selectedIdArray.length > 0) {
        for (let j = 0; j < this.selectedIdArray.length; j++) {
          tempSelectedArray.push(this.selectedIdArray[j].unique_id);
        }
      }
      let data = {
        export_type: this.export_type,
        search_type: this.search_type,
        search_title_name: this.search_title_name,
        search_id_type: this.search_id_type,
        search_id: this.search_id,
        search_date: this.search_date,
        tiving_id: this.tiving_id,
        selected_id: tempSelectedArray,
      };

      BulkWorkingExportService.ExportBulkWorkList(data)
        .then((response) => {
          if (response.status == 200) {
            const url = `${this.baseUrl}/download/file?url=${response.data.path}&ul=false`;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "DataBackup");
            document.body.appendChild(link);
            link.click();
            this.selectedIdArray = [];
            this.isAllChecked = false;
            this.currentSelectedOption = 0;
            for (let j = 0; j < this.workingList.length; j++) {
              this.workingList[j].isChecked = false;
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    getSelectedId(event, workList) {
      workList.isChecked = !workList.isChecked;
      if (workList.isChecked == true) {
        this.selectedIdArray.push(workList);
      } else if (workList.isChecked == false) {
        this.selectedIdArray.splice(this.selectedIdArray.indexOf(workList), 1);
      }

      if (this.selectedIdArray.length == this.workingList.length) {
        this.isAllChecked = true;
      } else {
        this.isAllChecked = false;
      }
    },
    getAllChecked(event) {
      this.selectedIdArray = [];
      if (event.target.checked == true) {
        this.isAllChecked = true;
        for (let i = 0; i < this.workingList.length; i++) {
          if (
            this.workingList[i].unique_id == "" ||
            this.workingList[i].unique_id == null
          ) {
            this.workingList[i].isChecked = false;
          } else {
            this.workingList[i].isChecked = true;
            this.selectedIdArray.push(this.workingList[i]);
          }
        }
      } else {
        this.isAllChecked = false;
        this.selectedIdArray = [];
        for (let i = 0; i < this.workingList.length; i++) {
          this.workingList[i].isChecked = false;
        }
      }
    },
    getExportWorkList(event) {
      this.currentSelectedOption = event.target.value;
      if (event.target.value == 1) {
        this.export_type = "json";
      } else if (event.target.value == 2) {
        this.export_type = "xls";
      }
      this.ExportworkList();
    },
    sorting(sort_by) {
      if (this.sort_by != sort_by) {
        this.sort_by = sort_by;
        this.sort_order = "asc";
      } else {
        if (this.sort_order == "asc") this.sort_order = "desc";
        else this.sort_order = "asc";
      }
      this.getWorkList();
    },
    // date format
    dateformat(value) {
      if (value) {
        return moment.utc(value).local().format("YYYY-MM-DD HH:mm:ss");
      }
    },
  },
};
</script>
<style scoped>
.center {
  text-align: center !important;
}
</style>

<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/export-icon.svg" alt="" /></span
        >{{ $t("bulk.export.header") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.worklist.title") }}</label>
              <input
                type="text"
                :placeholder="$t('bulk.export.titleText')"
                class="form-control"
                v-model="search_file_name"
              />
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.news.date") }}</label>
              <div class="input-date">
                <Calender
                  @date="getRealeaseDate"
                  :input_date="search_date"
                  :datePlaceholder="datePlaceholder"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <input
            type="submit"
            class="btn org-btn"
            :value="$t('button.search')"
            @click="searchExportList()"
          />
          <button type="button" class="btn outline blk-btn" @click="resetAll()">
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <h3>{{ $t("bulk.export.exportList") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ total_records }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="limit"
                  @change="getExportListByValue"
                >
                  <option>{{ $t("bulk.export.pageLimit10") }}</option>
                  <option>{{ $t("bulk.export.pageLimit20") }}</option>
                  <option>{{ $t("bulk.export.pageLimit50") }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="table-inner-scroll">
          <table class="table-otr table-innr bulk-working-tbl">
          <thead>
            <tr>
              <th>{{ $t("bulk.worklist.no") }}</th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.export.fileName") }}
                  <span @click="sorting('file_name')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.export.creationDate") }}
                  <span @click="sorting('creation_date')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.export.message") }}
                  <span @click="sorting('message')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.export.status") }}
                  <span @click="sorting('status')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>{{ $t("bulk.export.download") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="exportList.length > 0">
              <tr v-for="(item, i) in exportList" :key="i" :value="item.id">
                <td>{{ item.no }}</td>
                <td>{{ item.file_name }}</td>
                <td>
                  <ul class="date-time">
                    <li>{{ item.creation_date.replace(/-/gi, ".") }}</li>
                  </ul>
                </td>
                <td>{{ item.message }}</td>
                <td>
                  <span class="status-btn green">{{ 
                    item.status== "success"
                     ? $t('Error.success') : item.status == $t('Error.success')
                      }}</span>
                </td>
                <td>
                  <a
                    @click="downloadExportData(item.id)"
                    class="download-btn btn org-btn"
                    ><span
                      ><img src="@/assets/icons/download-icon-wh.svg" alt=""
                    /></span>
                    {{ $t("bulk.export.download") }}</a
                  >
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="6" class="center">
                  <p>{{ $t("dictionary.noData") }}</p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        </div>
        
        <template v-if="exportList?.length > 0">
          <pagination
            v-model="page"
            :records="total_records"
            :per-page="limit"
            :options="chunkPage"
            @paginate="clickInternalPage"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import BulkWorkingExportService from "@/admin/services/BulkExportAndWorkListService";
import Calender from "@/components/Calender.vue";

export default {
  name: "ExportList",
  components: { Sidebar, Calender },
  inject: ["common"],

  data() {
    return {
      page: 1,
      limit: 10,
      exportList: [],
      search_file_name: "",
      search_date: "",
      total_records: 0,
      chunkPage: { chunk: 5 },
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      datePlaceholder: this.$t("bulk.export.searchbydate"),
      sort_by: "",
      sort_order: "",
    };
  },
  mounted() {
    this.getExportList();
    this.dateformat();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getExportList();
    },
  },
  methods: {
    getRealeaseDate(date) {
      this.search_date = date;
    },
    clickInternalPage(click) {
      this.page = click;
      this.getExportList();
    },
    dateformat(value) {
      if (value) {
        return moment.utc(value).format("YYYY-MM-DD");
      }
    },
    searchExportList() {
      this.page = 1;
      this.getExportList();
    },
    resetAll() {
      this.search_file_name = "";
      this.search_date = "";
      this.page = 1;
      this.getExportList();
    },
    getExportListByValue() {
      this.page = 1;
      this.getExportList();
    },
    getExportList() {
      let data = {
        search_file_name: this.search_file_name,
        search_date: this.search_date,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };

      BulkWorkingExportService.getExportList(data)
        .then((response) => {
          if (response.status == 200) {
            this.exportList = response.data.results;
            for (let i = 0; i < this.exportList.length; i++) {
              this.exportList[i]["no"] = (this.page - 1) * this.limit + i + 1;
            }
            this.total_records = response.data.total_records;
          }
        })
        .catch((err) => {
          return;
        });
    },
    downloadExportData(id) {
      BulkWorkingExportService.downloadExportData(id)
        .then((response) => {
          if (response.status == 200) {
            const url = `${this.baseUrl}/download/file?url=${response.data.path}&ul=false`;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "DataBackup");
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((err) => {
          return;
        });
    },
    sorting(sort_by) {
      if (this.sort_by != sort_by) {
        this.sort_by = sort_by;
        this.sort_order = "asc";
      } else {
        if (this.sort_order == "asc") this.sort_order = "desc";
        else this.sort_order = "asc";
      }
      this.getExportList();
    },
  },
};
</script>

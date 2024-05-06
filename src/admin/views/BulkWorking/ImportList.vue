<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/import.svg" alt="" /></span
        >{{ $t("bulk.import.header") }}
      </h2>

      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.export.fileName") }}</label>
              <input
                type="text"
                :placeholder="$t('bulk.import.fileText')"
                class="form-control"
                v-model="fileName"
              />
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.news.date") }}</label>
              <div class="input-date">
                <Calender
                  @date="getUploadDate"
                  :input_date="uploadDate"
                  :datePlaceholder="datePlaceholder"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button
            type="submit"
            class="btn org-btn"
            @click="getBulkWorkingImportList"
          >
            {{ $t("button.search") }}
          </button>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="resetSearch"
          >
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>

      <div class="cm-bck mt-30">
        <h3>{{ $t("bulk.import.importList") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ totalRecords }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="limit"
                  @change="
                    page = 1;
                    getBulkWorkingImportList();
                  "
                >
                  <option value="10">
                    {{ $t("bulk.export.pageLimit10") }}
                  </option>
                  <option value="20">
                    {{ $t("bulk.export.pageLimit20") }}
                  </option>
                  <option value="50">
                    {{ $t("bulk.export.pageLimit50") }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="$router.push('/admin/import-upload')"
          >
            <span><img src="@/assets/icons/upload-list.svg" alt="" /> </span
            >{{ $t("bulk.import.uploadList") }}
          </button>
        </div>
        <div class="table-inner-scroll">
          <table class="table-otr table-innr bulk-working-tbl">
            <thead>
              <tr>
                <th>{{ $t("dictionary.agentList.no") }}</th>
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
                    {{ $t("bulk.import.uploadDate") }}
                    <span @click="sorting('upload_date')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>{{ $t("bulk.export.status") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="bulkWorkingImportList.length">
                <tr v-for="(item, index) in bulkWorkingImportList" :key="index">
                  <td>{{ (page - 1) * limit + index + 1 }}</td>

                  <td
                    @click="
                      $router.push(`/admin/import-status/${item.import_file_id}`)
                    "
                  >
                    {{ item.file_name }}
                  </td>
                  <td>
                    <ul class="date-time">
                      <li>{{ dateformat(item.upload_date) }}</li>
                    </ul>
                  </td>
                  <td>
                    <span
                      class="status-btn"
                      :class="item.upload_status == 'failed' ? 'red' : 'blue'"
                      >{{
                        item.upload_status == "failed"
                          ? $t("bulk.import.faild")
                          : item.upload_status == "duplicate"
                          ? $t("bulk.import.duplicate")
                          : $t("bulk.import.complete")
                      }}</span
                    >
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="4" class="no-data">
                    <span>{{ $t("dictionary.noData") }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
      </div>
        <pagination
          v-model="page"
          :records="totalRecords"
          :per-page="limit"
          :options="{ chunk: 5 }"
          @paginate="getBulkWorkingImportList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BulkWorkingService from "@/admin/services/BulkWorkingService";
import Sidebar from "@/admin/components/Sidebar.vue";
import Calender from "@/components/Calender.vue";
import moment from "moment";
export default {
  name: "ImportList",
  components: { Sidebar, Calender },
  inject: ["common"],

  created() {
    this.BulkWorkingService = new BulkWorkingService();
  },
  mounted() {
    this.getBulkWorkingImportList();
  },
  data() {
    return {
      bulkWorkingImportList: [],
      totalRecords: 0,
      totalPages: 0,
      limit: 10,
      page: 1,
      fileName: "",
      uploadDate: "",
      datePlaceholder: "YYYY.MM.DD",
      sort_order: "",
      sort_by: "",
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getBulkWorkingImportList();
    },
  },
  methods: {
    getUploadDate(date) {
      this.uploadDate = date;
    },
    getBulkWorkingImportList() {
      let data = {
        search_file_name: this.fileName, // write your related file name that you want to search
        upload_date: this.uploadDate,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };
      this.BulkWorkingService.getBulkWorkingImportList(data)
        .then((res) => {
          this.bulkWorkingImportList = res.data.list;
          this.totalRecords = res.data.total_records;
          this.totalPages = res.data.total_pages;
        })
        .catch((err) => {
          return;
        });
    },
    resetSearch() {
      this.fileName = "";
      this.uploadDate = "";
      this.getBulkWorkingImportList();
    },
    dateformat(value) {
      if (value) {
        return moment.utc(value).local().format("YYYY.MM.DD  hh:mm:ss");
      }
    },
    sorting(sort_by) {
      if (this.sort_by != sort_by) {
        this.sort_by = sort_by;
        this.sort_order = "asc";
      } else {
        if (this.sort_order == "asc") this.sort_order = "desc";
        else this.sort_order = "asc";
      }
      this.getBulkWorkingImportList();
    },
  },
};
</script>
<style>
.no-data {
  padding: 20px 15px !important;
}
</style>

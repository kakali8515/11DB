<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/import.svg" alt="" /></span
        >{{ $t("bulk.import.header") }}
      </h2>

      <div class="cm-bck mt-30">
        <h3>{{ $t("bulk.import.importStatus") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ totalRecords }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select
                  v-model="limit"
                  @change="
                    page = 1;
                    getImportStatusList();
                  "
                  class="form-control"
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
        </div>
        <div class="table-inner-scroll">
        <table class="table-otr table-innr lastmsg">
          <thead>
            <tr>
              <th>
                {{ $t("bulk.worklist.no") }}
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.worklist.title") }}
                  <span @click="sorting('title_name')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.import.programCode")
                  }}<span @click="sorting('program_code')"
                    ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                  /></span>
                </div>
              </th>
              <th>
                <div class="data-hdr">
                  {{ $t("bulk.import.tmdbId")
                  }}<span @click="sorting('tmdb_id')"
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
              <th>{{ $t("bulk.import.importMessage") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="statusList.length">
              <tr v-for="(item, index) in statusList" :key="index">
                <td>{{ (page - 1) * limit + index + 1 }}</td>
                <td @click="redirect(item.type, item.item_id, item.status)">
                  {{ item.title_name }}
                </td>
                <td>{{ item.program_code }}</td>
                <td>{{ item.tmdb_id }}</td>
                <td>
                  <span
                    class="status-btn"
                    :class="
                      item.status == 'complete'
                        ? 'green'
                        : item.status == 'failure'
                        ? 'red'
                        : 'blue'
                    "
                    >{{
                      item.status == "failure"
                        ? $t("bulk.import.faild")
                        : item.status == "duplicate"
                        ? $t("bulk.import.duplicate")
                        : $t("bulk.import.complete")
                    }}</span
                  >
                </td>
                <td>{{ item.import_message }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="6">
                  <span class="no-data-import-status">{{
                    $t("dictionary.noData")
                  }}</span>
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
          @paginate="getImportStatusList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BulkWorkingService from "@/admin/services/BulkWorkingService";
import Sidebar from "@/admin/components/Sidebar.vue";

export default {
  name: "ImportStatus",
  components: { Sidebar },
  inject: ["common"],
  created() {
    this.BulkWorkingService = new BulkWorkingService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getImportStatusList();
    },
  },
  mounted() {
    this.getImportStatusList();
  },
  data() {
    return {
      statusList: [],
      totalRecords: 0,
      totalPages: 0,
      limit: 10,
      page: 1,
      statusId: this.$route.params.id,
      sort_by: "",
      sort_order: "",
    };
  },
  methods: {
    getImportStatusList() {
      let data = {
        id: this.statusId,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };
      this.BulkWorkingService.getImportStatusList(data)
        .then((res) => {
          this.statusList = res.data.list;
          this.totalRecords = res.data.total_records;
          this.totalPages = res.data.total_pages;
        })
        .catch((err) => {
          return;
        });
    },
    redirect(type, item_id, status) {
      if (status != "failure" && status != "duplicate" && item_id != null) {
        if (type == "people") {
          const url = `/${type}/details/${item_id}`;
          window.open(url, '_blank');
        } else if (type == "movie") {
          const url = `/movies/details/${item_id}`
          window.open(url, '_blank');
        } else if (type == "tv") {
          const url = `/tvshows/details/${item_id}`
          window.open(url, '_blank');
        } else {
          return;
        }
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
      this.getImportStatusList();
    },
  },
};
</script>
<style>
.no-data-import-status {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: unset !important;
}
</style>

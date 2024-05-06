<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/agency-icon.svg" alt="" /></span
        >{{ $t("dictionary.agentList.agency") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>
        <div class="frm-innr frm-wd-in">
          <div class="double">
            <div class="form-group">
              <label>{{ $t("dictionary.agent.id") }}</label>
              <input
                type="text"
                :placeholder="$t('dictionary.agent.enterId')"
                class="form-control"
                v-model="agencyId"
                @keypress="isNumChar($event)"
              />
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agentList.agencyName") }}</label>
              <input
                type="text"
                :placeholder="$t('dictionary.agent.agencyNameText')"
                class="form-control"
                v-model="agencyName"
              />
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button
            type="submit"
            class="btn org-btn"
            @click="
              this.page = 1;
              getDictionaryAgencyList();
            "
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
        <h3>{{ $t("dictionary.agentList.title") }}</h3>
        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("dictionary.agentList.total") }} {{ totalRecords }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="limit"
                  @change="
                    page = 1;
                    getDictionaryAgencyList();
                  "
                >
                  <option value="10">{{ $t("dictionary.pageLimit10") }}</option>
                  <option value="20">{{ $t("dictionary.pageLimit20") }}</option>
                  <option value="50">{{ $t("dictionary.pageLimit50") }}</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn or-btn"
            @click="$router.push('/admin/agent-add')"
          >
            <span> + </span>{{ $t("dictionary.agentList.addNew") }}
          </button>
        </div>
        <div class="agency-table-otr">
          <table class="table-otr agency-table">
            <thead>
              <tr>
                <th>{{ $t("dictionary.agentList.no") }}</th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.agent.id") }}
                    <span @click="sorting('id')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.agentList.agencyName") }}
                    <span @click="sorting('agency_name')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>{{ $t("dictionary.agentList.address") }}</th>
                <th>{{ $t("dictionary.agentList.tel") }}</th>
                <th>{{ $t("dictionary.agentList.siteURL") }}</th>
                <th colspan="2">
                  {{ $t("dictionary.agentList.sns") }}
                  <table>
                    <tr>
                      <th>
                        <span class="scl-txt">{{
                          $t("dictionary.agent.youtube")
                        }}</span>
                      </th>
                      <th>
                        <span class="scl-txt"
                          >{{ $t("dictionary.agent.facebook") }}</span
                        >
                      </th>
                      <th>
                        <span class="scl-txt">{{
                          $t("dictionary.agent.instagram")
                        }}</span>
                      </th>
                      <th>
                        <span class="scl-txt">{{
                          $t("dictionary.agent.twitter")
                        }}</span>
                      </th>
                    </tr>
                  </table>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="dictionaryAgencyList.length">
                <tr
                  v-for="(item, index) in dictionaryAgencyList"
                  :key="item.id"
                  @click="$router.push(`/admin/agent-details/${item.id}`)"
                >
                  <td>{{ (page - 1) * limit + index + 1 }}</td>
                  <td>{{ item.agency_id }}</td>
                  <td>
                    <span class="ag-name">{{ item.agency_name }}</span>
                  </td>
                  <td>
                    <span class="add-name">{{
                      item.agency_address ? item.agency_address : "-"
                    }}</span>
                  </td>
                  <td>{{ item.agency_tel ? item.agency_tel : "-" }}</td>
                  <td>{{ item.site_url ? item.site_url : "-" }}</td>
                  <td>
                    <table class="tbody-wrp">
                      <tr>
                        <td>
                          <span class="scl-txt">{{
                            item.youtube_link ? item.youtube_link : "-"
                          }}</span>
                        </td>
                        <td>
                          <span class="scl-txt">{{
                            item.instagram_link ? item.instagram_link : "-"
                          }}</span>
                        </td>
                        <td>
                          <span class="scl-txt">{{
                            item.facebook_link ? item.facebook_link : "-"
                          }}</span>
                        </td>
                        <td>
                          <span class="scl-txt">{{
                            item.twitter_link ? item.twitter_link : "-"
                          }}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7" class="no-data">
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
          @paginate="getDictionaryAgencyList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import DictionaryAgencyService from "@/admin/services/DictionaryAgencyService";
import { isNumChar } from "@/mixins/CommonValidation.js";

export default {
  name: "AgentList",
  components: { Sidebar },
  inject: ["common"],

  mounted() {
    this.getDictionaryAgencyList();
  },
  created() {
    this.DictionaryAgencyService = new DictionaryAgencyService();
  },
  data() {
    return {
      dictionaryAgencyList: [],
      totalRecords: 0,
      totalPages: 0,
      limit: 10,
      page: 1,
      agencyId: "",
      agencyName: "",
      sort_by: "",
      sort_order: "",
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getDictionaryAgencyList();
    },
  },
  methods: {
    getDictionaryAgencyList() {
      let data = {
        agency_id: this.agencyId,
        agency_name: this.agencyName,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };
      this.DictionaryAgencyService.getDictionaryAgencyList(data)
        .then((res) => {
          if (res.status == 200) {
            this.dictionaryAgencyList = res.data.results;
            this.totalRecords = res.data.total_records;
            this.totalPages = res.data.total_pages;
          }
        })
        .catch((err) => {
          return;
        });
    },
    resetSearch() {
      this.agencyId = "";
      this.agencyName = "";
      this.page = 1;
      this.getDictionaryAgencyList();
    },
    sorting(sort_by) {
      if (this.sort_by != sort_by) {
        this.sort_by = sort_by;
        this.sort_order = "asc";
      } else {
        if (this.sort_order == "asc") this.sort_order = "desc";
        else this.sort_order = "asc";
      }
      this.getDictionaryAgencyList();
    },
    isNumChar,
  },
};
</script>

<style>
.no-data {
  padding: 20px 15px !important;
}
</style>

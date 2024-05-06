<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/priority-icon.svg" alt="" /></span
        >{{ $t("priority.header") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("priority.listing") }}</h3>
        <div class="tab-outr admin-tab">
          <TabWrapper
            v-if="titleList?.length > 0"
            @selectedTab="onChangeTab"
            priorityLoopTab="true"
            webtoonDisable="searchResults.searchRight.webtoons.title"
          >
            <Tabs
              v-for="title in titleList"
              :title="title.title"
              :key="title.value"
            >
              <table class="table-otr schema-table">
                <thead>
                  <tr>
                    <th>{{ $t("priority.data") }}</th>
                    <th>{{ $t("priority.11db") }}</th>
                    <th>{{ $t("priority.tmdb") }}</th>
                    <th v-if="listType != 'tv'">
                      {{ $t("priority.kobis") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="priorityList.length">
                    <tr v-for="(i, index) in priorityList" :key="index">
                      <td>
                        {{
                          i.field_name
                            ? i.field_name.charAt(0).toUpperCase() +
                              i.field_name.slice(1)
                            : ""
                        }}
                      </td>
                      <td>
                        <select
                          class="form-control"
                          v-model="i.eleven_db_priority"
                          disabled
                        >
                          <option
                            :key="key"
                            :value="key"
                            v-for="(item, key) in prioritySetList"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <select
                          class="form-control"
                          v-model="i.tmdb_priority"
                          @change="priorityChangedTmdb(index, $event)"
                        >
                          <option
                            :key="key"
                            :value="key"
                            v-for="(item, key) in prioritySetList"
                            :disabled="key == '1'"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </td>
                      <td v-if="listType != 'tv'">
                        <select
                          class="form-control"
                          v-model="i.kobis_priority"
                          @change="priorityChangedKobis(index, $event)"
                        >
                          <option
                            :key="key"
                            :value="key"
                            v-for="(item, key) in prioritySetList"
                            :disabled="item == '1'"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="4">
                        <span class="no-data-priority">{{
                          $t("dictionary.noData")
                        }}</span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="btn-group mtt-30">
                <button type="submit" class="btn org-btn" @click="savePriority">
                  {{ $t("button.save") }}
                </button>
              </div>
            </Tabs>
          </TabWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataManagementService from "../../services/DataManagementService";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "Schema",
  components: {
    Sidebar,
    TabWrapper,
    Tabs,
  },
  inject: ["common"],

  data() {
    return {
      listType: "movie",
      priorityList: [],
      prioritySetList: {},
      titleList: [
        {
          title: "searchResults.searchRight.movieDetails.movie",
          value: "movie",
        },
        { title: "searchResults.searchRight.tvShows", value: "tv" },
        { title: "searchResults.stars", value: "people" },
        {
          title: "searchResults.searchRight.webtoons.title",
          value: "webtoons",
        },
      ],
    };
  },
  created() {
    this.DataManagementService = new DataManagementService();
  },
  mounted() {
    this.getPriorityList();
    this.getPrioritySetList();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getPriorityList();
      this.getPrioritySetList();
    },
  },
  methods: {
    getPriorityList() {
      this.DataManagementService.getPriorityList(this.listType)
        .then((res) => {
          if (res.status == 200) {
            this.priorityList = res.data.results;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    priorityChangedTmdb(i, event) {
      if (event.target.value == 2) {
        this.priorityList[i].tmdb_priority = event.target.value;
        this.priorityList[i].kobis_priority = "3";
      } else {
        this.priorityList[i].tmdb_priority = event.target.value;
        this.priorityList[i].kobis_priority = "2";
      }
    },
    priorityChangedKobis(i, event) {
      if (event.target.value == 2) {
        this.priorityList[i].kobis_priority = event.target.value;
        this.priorityList[i].tmdb_priority = "3";
      } else {
        this.priorityList[i].kobis_priority = event.target.value;
        this.priorityList[i].tmdb_priority = "2";
      }
    },
    getPrioritySetList() {
      this.DataManagementService.getPrioritySetList()
        .then((res) => {
          if (res.status == 200) {
            this.prioritySetList = res.data.results;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChangeTab(tab) {
      if (tab != "searchResults.searchRight.webtoons.title") {
        let selectedTab = this.titleList.find((tabs) => {
          return tab == tabs.title;
        });
        this.listType = selectedTab.value;
        this.getPriorityList();
      }
    },
    savePriority() {
      let data = {
        list_type: this.listType,
        priority: this.priorityList.map((field) => ({
          id: field.id,
          eleven_db_priority: field.eleven_db_priority,
          tmdb_priority: field.tmdb_priority,
          kobis_priority: field.kobis_priority,
        })),
      };
      this.DataManagementService.savePriority(data)
        .then((res) => {
          if (res.status == 200) {
            Toast.fire({ title: this.$t("Error.success") });
            this.getPriorityList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.no-data-priority {
  display: flex;
  justify-content: center;
  align-items: center;
  width: unset !important;
}
</style>

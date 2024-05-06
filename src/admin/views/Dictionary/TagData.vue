<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/tag-data.svg" alt="" /></span>{{ $t("dictionary.tagTitle") }}
      </h2>
      <div class="cm-bck tag-data">
        <h3>{{ $t("dictionary.tagSearch.title") }}</h3>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.mainCategory") }}</label>
            <SearchDropdown @dropdownValue="getCurrentcategoryId" :search_type="currentCategoryId"
              :searchTitleListItem="adminCategoryList" searchtitle="category_name" searchvalue="category_id"
              :labelItem="$t('dictionary.select')" />
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.subCategory") }}</label>
            <SearchDropdown @dropdownValue="getSubCat" :search_type="currentSubcategoryId"
              :searchTitleListItem="subCategoryList" searchtitle="category_name" searchvalue="sub_category_id"
              :labelItem="$t('dictionary.select')" />
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.tagSearch.tagName") }}</label>
            <input type="text" :placeholder="$t('Error.enterTag')" class="form-control" v-model="tag_name"
              @keypress="isChar($event)" />
          </div>
          <div class="btn-group">
            <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="searchTagList" />
            <button type="button" class="btn outline blk-btn" @click="resetAll">
              {{ $t("button.reset") }}
            </button>
          </div>
        </div>
      </div>
      <div class="cm-bck mt-30">
        <div class="material-filter-list">
          <h3>{{ $t("dictionary.tagSearch.materialList") }}</h3>
          <div class="btn-group">
            <button type="button" class="btn org-btn" @click="navigate('AddMainCategory')">
              {{ $t("dictionary.tagSearch.addMainCategoryButton") }}
            </button>
            <button type="button" class="btn outline blk-btn" @click="navigate('AddSubCategory')">
              {{ $t("dictionary.tagSearch.addSubCategoryButton") }}
            </button>
            <button type="button" class="btn outline blk-btn" @click="navigate('AddTag')">
              {{ $t("dictionary.tagSearch.addTagButton") }}
            </button>
          </div>
        </div>
        <div class="material-sort">
          <div class="sort-innr">
            <p>
              {{ $t("dictionary.agentList.total") }} {{ total_news_records }}
            </p>
            <div class="frm-innr">
              <div class="form-group">
                <select class="form-control" v-model="limit" @change="displayListing($event)">
                  <option>10</option>
                  <option>20</option>
                  <option>25</option>
                </select>
              </div>
            </div>
          </div>
          <button type="button" class="btn outline blk-btn" @click="downloadTagData()">
            <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span>{{ $t("dictionary.tagSearch.downlaod") }}
          </button>
        </div>
        <div class="table-inner-scroll">
          <table class="table-otr table-innr">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.tagSearch.mainCategory") }}
                    <span @click="sorting('category_name')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.tagSearch.subCategory") }}
                    <span @click="sorting('sub_category_name')"><img src="@/assets/icons/ud-arrow-icon.svg"
                        alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.tagSearch.englishTagName") }}
                    <span @click="sorting('tag_name_en')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("dictionary.tagSearch.koreanTagName") }}
                    <span @click="sorting('tag_name_ko')"><img src="@/assets/icons/ud-arrow-icon.svg" alt="" /></span>
                  </div>
                </th>
                <th>{{ $t("dictionary.tagSearch.action") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tagList.length > 0">
                <tr v-for="(tag, index) in tagList" :key="index">
                  <td>{{ tag.no }}</td>
                  <td>{{ tag.category_name }}</td>
                  <td>{{ tag.sub_category_name }}</td>
                  <td>{{ tag.tag_name_en }}</td>
                  <td>{{ tag.tag_name_ko }}</td>
                  <td>
                    <div class="action">
                      <a @click="editTag(tag)"><img src="@/assets/icons/edit-icon.svg" alt="" /></a>
                      <a @click="openDeletePopup(tag)"><img src="@/assets/icons/delete-icon.svg" alt="" /></a>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6">
                    <p>{{ $t("dictionary.noData") }}</p>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <template v-if="tagList?.length > 0">
          <pagination v-model="page" :records="total_news_records" :per-page="limit" :options="chunkPage"
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
            <button class="red-fill-btn" @click="deleteTag">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import DictionaryTagService from "@/admin/services/DictionaryTagService";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import { isChar } from "@/mixins/CommonValidation.js";

export default {
  name: "TagData",
  emits: ["on-current-theme-change"],
  components: {
    Sidebar,
    PopUpModal,
  },
  inject: ["common"],
  data() {
    return {
      adminCategoryList: [],
      subCategoryList: [],
      currentCategoryId: null,
      currentSubcategoryId: null,
      page: 1,
      limit: 10,
      total_news_records: 0,
      tagList: [],
      chunkPage: { chunk: 5 },
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      isDelete: false,
      currentTagId: 0,
      tag_name: "",
      sort_by: "",
      sort_order: "",
    };
  },
  mounted() {
    this.getAdminDictionaryCategoryList();
    this.getTagList();
  },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getTagList();
      this.getAdminDictionaryCategoryList();
    },
  },
  methods: {
    navigate(component_name) {
      this.$router.push({
        name: component_name,
      });
    },
    getSubCat(value) {
      this.currentSubcategoryId = value;
    },
    //pagination
    clickInternalPage(click) {
      this.page = click;
      this.getTagList();
    },
    displayListing() {
      this.page = 1;
      // this.limit = event.target.value;
      this.getTagList();
    },
    getCurrentcategoryId(event) {
      this.currentCategoryId = event;
      this.currentSubcategoryId = null;
      this.subCategoryList = [];
      if (this.currentCategoryId) {
        this.getSubCategoryList();
      }
    },
    searchTagList() {
      this.page = 1;
      this.getTagList();
    },
    //get Material List
    getTagList() {
      let data = {
        category_id: this.currentCategoryId,
        sub_category_id: this.currentSubcategoryId,
        tag_name: this.tag_name,
        page: this.page,
        limit: this.limit,
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      };
      DictionaryTagService.getTagList(data)
        .then((response) => {
          if (response.status == 200) {
            this.tagList = response.data.result;
            for (let i = 0; i < this.tagList.length; i++) {
              this.tagList[i]["no"] = (this.page - 1) * this.limit + i + 1;
            }
            this.total_news_records = response.data.total_records;
          }
        })
        .catch((err) => {
          return;
        });
    },
    resetAll() {
      this.tag_name = "";
      this.currentCategoryId = null;
      this.currentSubcategoryId = null;
      this.page = 1;
      this.getAdminDictionaryCategoryList();
      this.getTagList();
    },
    downloadTagData() {
      DictionaryTagService.downloadTagData(
        this.currentCategoryId ? this.currentCategoryId : 0,
        this.currentSubcategoryId ? this.currentSubcategoryId : 0,
        this.tag_name
      )
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
    getAdminDictionaryCategoryList() {
      DictionaryTagService.getAdminDictionaryCategoryList()
        .then((response) => {
          if (response.status == 200) {
            this.adminCategoryList = response.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    getSubCategoryList() {
      DictionaryTagService.getSubCategoryList(this.currentCategoryId)
        .then((response) => {
          if (response.status == 200) {
            const modifiedCategories = response.data.results.map((category) => {
              if (category.category_name.length > 50) {
                category.category_name =
                  category.category_name.slice(0, 50) + "...";
              }
              return category;
            });
            this.subCategoryList = modifiedCategories;

          }
        })
        .catch((err) => {
          return;
        });
    },

    editTag(tag) {
      this.$router.push({ name: "EditTag", params: { id: tag.tag_id } });
    },
    openDeletePopup(tag) {
      this.currentTagId = tag.tag_id;
      this.isDelete = true;
    },
    deleteTag() {
      this.isDelete = false;
      let data = {
        tag_id: this.currentTagId,
      };
      DictionaryTagService.deleteTag(data)
        .then((response) => {
          if (response.status == 200) {
            this.getTagList();
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
      this.getTagList();
    },
    isChar,
  },
};
</script>


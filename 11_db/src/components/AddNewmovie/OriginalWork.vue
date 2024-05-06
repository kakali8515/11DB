<template>
  <div>
    <h3>{{ $t("addNewMoviesForm.originalWork") }}</h3>
    <div
      class="div4colmns"
      v-for="(n, key) in originalWorkList.length"
      :key="key"
    >
      <div class="form-group">
        <SearchDropdown
          @dropdownValue="
            originalWorkList[key].type = $event;
            getOriginalWorkInput($event, 'type', key);
          "
          :search_type="originalWorkList[key].type"
          :searchTitleListItem="
            Object.keys(originalWorkTypeList).map((key) => {
              return { key: key, value: originalWorkTypeList[key] };
            })
          "
          searchtitle="value"
          searchvalue="key"
          :disabled="isEdit"
          :clearable="false"
          :labelItem="$t('addNewMoviesForm.choose')"
          :isError="
            error.originalWorkType && error.originalWorkType[key] ? true : false
          "
        />
        <span
          v-if="error.originalWorkType && error.originalWorkType[key]"
          class="error-txt originaltitle"
          >{{ error.originalWorkType[key] }}</span
        >
      </div>
      <div class="form-group">
        <input
          v-model="originalWorkList[key].title"
          type="text"
          class="form-control"
          :placeholder="$t('addNewMoviesForm.title')"
          @change="getOriginalWorkInput($event, 'title', key)"
          maxlength="150"
          :disabled="isEdit"
          :class="
            (error.originalWorkType && error.originalWorkType[key])
              ? 'error-border'
              : ''
          "
        />
      </div>
      <div class="form-group">
        <input
          v-model="originalWorkList[key].original_artist"
          @change="getOriginalWorkInput($event, 'original_artist', key)"
          type="text"
          class="form-control"
          :placeholder="$t('addNewMoviesForm.originalArtist')"
          maxlength="150"
          :disabled="isEdit"
          :class="
            (error.originalWorkType && error.originalWorkType[key])
              ? 'error-border'
              : ''
          "
        />
      </div>
      <button
        v-if="key == 0"
        @click="addOriginalWork()"
        class="addBtn"
        :disabled="originalWorkList.length > 9 || isEdit"
        :class="originalWorkList.length > 9 || isEdit ? 'isDisabled' : ''"
      >
        +
      </button>
      <button
        v-if="key != 0"
        @click="removeOriginalWork(key)"
        class="addBtn minusBtn"
        :disabled="isEdit"
        :class="isEdit ? 'isDisabled' : ''"
      >
        -
      </button>
    </div>
  </div>
</template>
<script>
import AddNewMovieService from "@/services/AddNewMovieService";
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "OriginalWork",
  props: {
    isEdit: {
      type: Boolean,
    },
    site_language: {
      type: String,
    },
    originalWorkListData: {
      type: Array,
    },
    error: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const originalWorkList = ref([]);
    const originalWorkTypeList = ref([]);
    const route = useRoute();
    const addNewMovieService = new AddNewMovieService();

    // on language change
    watch(
      () => props.originalWorkListData,
      function (n, o) {
        if (n.length) originalWorkList.value = n;
      },
      { deep: true }
    );
    watch(
      () => props.site_language,
      function (n, o) {
        if (n && n != o) {
          setTimeout(() => {
            getOriginalWorkList();
          }, 500);
        }
      }
    );

    onMounted(() => {
      getOriginalWorkList();
      originalWorkList.value.push({
        type: null,
        title: "",
        original_artist: "",
      });
    });

    // original work dropdown
    const getOriginalWorkList = () => {
      addNewMovieService
        .getOriginalWorkList()
        .then((res) => {
          if (res.status == 200) {
            originalWorkTypeList.value = res.data.original_work_type_list;
          }
        })
        .catch((err) => {
          return;
        });
    };

    // multiple add original data
    const addOriginalWork = () => {
      if (route.params.type == "internal") {
        originalWorkList.value.push({
          type: null,
          title: "",
          original_artist: "",
          id: "",
        });
      } else {
        originalWorkList.value.push({
          type: null,
          title: "",
          original_artist: "",
        });
      }
    };

    const getOriginalWorkInput = (event, key, k) => {
      if (typeof event != "string") event = event?.target.value;
      originalWorkList.value[k][key] = event;
      emit("newData", originalWorkList.value);
    };

    // remove original data
    const removeOriginalWork = (index) => {
      originalWorkList.value.splice(index, 1);
    };

    // return all data
    return {
      addOriginalWork,
      removeOriginalWork,
      getOriginalWorkInput,
      route,
      originalWorkList,
      originalWorkTypeList,
    };
  },
};
</script>

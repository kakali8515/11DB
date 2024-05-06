<template>
  <div class="date-picker">
    <Datepicker
      v-model="input_date"
      :enableTimePicker="isTime ? true : false"
      :enable-seconds="isTime ? true : false"
      @update:modelValue="handleDate"
      :format="getFormatedDate"
      :placeholder="datePlaceholder"
      :minDate="min_date"
      :maxDate="max_date"
      :disabled="disabled"
      :locale="locale"
      :cancelText="cancelBtn"
      :selectText="selectBtn"
      @keydown="handleInput($event)"
      :key="reset"
      :class="isError ? 'error-border' : ''"
    >
      <template #input-icon>
        <img class="input-slot-image" src="@/assets/icons/calendar.svg" />
      </template>
    </Datepicker>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import moment from "moment";
import { inject } from "vue";
import { watch, onMounted } from "@vue/runtime-core";

export default {
  name: "Calender",
  components: {
    Datepicker,
  },
  props: [
    "input_date",
    "page",
    "min_date",
    "max_date",
    "disabled",
    "datePlaceholder",
    "isError",
    "isTime",
  ],
  emits: ["date"],
  setup(props, { emit }) {
    const common = inject("common");
    const date = ref();
    const locale = ref("en");
    const reset = ref(0);

    onMounted(() => {
      locale.value = common.state.SelectedLang;
    });

    watch(
      () => common.state.SelectedLang,
      function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          reset.value++;
          locale.value = newVal;
        }
      }
    );

    const getFormatedDate = (dt) => {
      const date = new Date(dt);
      if (props.page === "filterCard") {
        if (date) {
          return moment(date).format("ll");
        }
      } else {
        if (props.isTime) {
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
        } else
          return (
            date.getFullYear() +
            "-" +
            (date.getMonth() > 8
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1)) +
            "-" +
            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
          );
      }
    };
    const handleDate = (modelData) => {
      // props.input_date = modelData;
      if (props.page === "filterCard") {
        emit("date", modelData);
      } else {
        emit("date", getFormatedDate(modelData));
      }
    };

    const handleInput = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        return e.preventDefault(); // Don't do anything to the input
      }
    };

    return {
      date,
      handleDate,
      getFormatedDate,
      locale,
      handleInput,
      reset,
    };
  },
  computed: {
    cancelBtn() {
      return this.$t("button.cancel");
    },
    selectBtn() {
      return this.$t("dictionary.select");
    },
  },
};
</script>

<style>
.dp__action_buttons {
  width: 100%;
  text-align: right;
}

.error-border .dp__input {
  border: 1px solid #db5857 !important;
}
</style>

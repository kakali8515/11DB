<template>
  <section class="about-us privacy">
    <div class="container">
      <div class="about-content">
        <h2>{{ title }}</h2>
        <div v-html="privacyContent"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CommonService from "@/services/CommonService";
export default {
  name: "PrivacyPolicy",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      title: "",
      privacyContent: "",
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.privacyPolicy();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.privacyPolicy();
  },
  methods: {
    privacyPolicy() {
      this.CommonService.privacyPolicy()
        .then((res) => {
          if (res.status == 200) {
            this.title = res.data.title;
            this.privacyContent = res.data.content;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

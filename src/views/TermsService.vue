<template>
  <section class="about-us terms-service">
    <div class="container">
      <div class="about-content">
        <h2>{{ title }}</h2>
        <div v-html="termContent"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CommonService from "@/services/CommonService";
export default {
  name: "TermsService",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      title: "",
      termContent: "",
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.termsOfService();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.termsOfService();
  },
  methods: {
    termsOfService() {
      this.CommonService.termsOfService()
        .then((res) => {
          if (res.status == 200) {
            this.title = res.data.title;
            this.termContent = res.data.content;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

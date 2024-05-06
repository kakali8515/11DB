<template>
  <section class="about-us">
    <div class="container">
      <div class="about-content">
        <h2>{{title}}</h2>
        <div v-html="aboutContent"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CommonService from "@/services/CommonService";
export default {
  name: "About",
  emits: ['on-current-theme-change'],
  inject: ["common"],
  data() {
    return {
      title: "",
      aboutContent: "",
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.aboutUs();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.aboutUs();
  },
  methods: {
    aboutUs() {
      this.CommonService.aboutUs()
        .then((res) => {
          if (res.status == 200) {
            this.title=res.data.title;
            this.aboutContent=res.data.content;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

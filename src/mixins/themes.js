import CommonService from "@/services/CommonService";
import Toast from "@/alert/alert.js";
export default {
  data() {
    return {
      currentTheme: ""
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  watch: {
    $route(to, from) {
      if (to.path.includes('admin')) {
        const body = document.body;
        localStorage.setItem("theme-colour", "theme-light");
        this.currentTheme = "theme-light";
        body.classList.add("body-light");
        this.$vuetify.theme.global.name = 'light';
      }
    }
  },
  mounted() {
    const storedTheme = localStorage.getItem("theme-colour");
    const body = document.body;
    if (!storedTheme) {
      this.currentTheme = "theme-dark";
      localStorage.setItem("theme-colour", "theme-dark");
      this.$vuetify.theme.global.name = 'dark';
    } else {
      this.currentTheme = localStorage.getItem("theme-colour");
      if (storedTheme === "theme-dark") {
        body.classList.remove("body-light");
        this.$vuetify.theme.global.name = 'dark';
      }
      else {
        body.classList.add("body-light");
        this.$vuetify.theme.global.name = 'light';
      }
    }
  },
  methods: {
    toggleClass() {
      const body = document.body;
      if (localStorage.getItem("token")) {
        const storedTheme = localStorage.getItem("theme-colour");
        if (!storedTheme) {
          localStorage.setItem("theme-colour", "theme-light");
          this.currentTheme = "theme-light";
          body.classList.add("body-light");
          this.$vuetify.theme.global.name = 'light';
        }
        if (storedTheme === "theme-dark") {
          localStorage.setItem("theme-colour", "theme-light");
          this.currentTheme = "theme-light";
          body.classList.add("body-light");
          this.$vuetify.theme.global.name = 'light';
        } else {
          localStorage.setItem("theme-colour", "theme-dark");
          this.currentTheme = "theme-dark";
          body.classList.remove("body-light");
          this.$vuetify.theme.global.name = 'dark';
        }

        let theme = '';

        if (this.currentTheme == 'theme-light') {
          theme = 'light';
        }
        else {
          theme = 'dark';
        }

        // this.CommonService.saveTheme(theme)
        //   .then((res) => {
        //     if (res.status == 200) {
        //       // Toast.fire({ title: res.data.message });
        //     }
        //   })
        //   .catch((err) => {
        //     return;
        //   });

      }
      else {
        const storedTheme = localStorage.getItem("theme-colour");
        const body = document.body;
        if (!storedTheme) {
          localStorage.setItem("theme-colour", "theme-light");
          this.currentTheme = "theme-light";
          body.classList.add("body-light");
          this.$vuetify.theme.global.name = 'light';
        }
        if (storedTheme === "theme-dark") {
          localStorage.setItem("theme-colour", "theme-light");
          this.currentTheme = "theme-light";
          body.classList.add("body-light");
          this.$vuetify.theme.global.name = 'light';
        } else {
          localStorage.setItem("theme-colour", "theme-dark");
          this.currentTheme = "theme-dark";
          body.classList.remove("body-light");
          this.$vuetify.theme.global.name = 'dark';
        }
      }
    }
  }
};

<template>
  <footer class="footer" :class="$route.path.includes('admin') ? 'admin-view-foter' : ''">
    <div class="container">
      <div class="footer-otr">
        <div class="footer-left">
          <a><img src="@/assets/images/red-logo.svg" alt="logo-red" @click="$router.push('/')"></a>
          <div class="footer-menu">
            <ul>
              <li><a :class="$route.name == 'Contact' ? 'active-footer' : ''" @click="navigate('/contact')"><span>{{
                $t('footer.contact') }}</span></a></li>
              <li><a :class="$route.name == 'About' ? 'active-footer' : ''" @click="$router.push('/about')"><span>{{
                $t('footer.about') }}</span></a></li>
              <li><a :class="$route.name == 'PrivacyPolicy' ? 'active-footer' : ''"
                  @click="$router.push('/privacy-policy')">{{ $t('footer.privacy') }}</a></li>
              <li><a :class="$route.name == 'TermsService' ? 'active-footer' : ''"
                  @click="$router.push('/terms-service')">{{ $t('footer.term') }}</a></li>
            </ul>
            <p>COPYRIGHT©{{ new Date().getFullYear() }} 11DB.IO</p>
          </div>
        </div>
        <div class="theme-btn" v-if="!$route.path.includes('admin')">
          <a href="javascript:void(0);" id="switch" class="switch" @click="toggleClass">
            <input type="checkbox">
            <span class="slider-in round"></span>
            <span class="switch-txt dark1">{{ $t('footer.darkmode') }}</span>
            <span class="switch-txt light1">{{ $t('footer.lightmode') }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>


<script>
import themes from "@/mixins/themes";
export default {
  name: "Footer",
  mixins: [themes],
  props: {
    theme: {
      type: String,
      default: "theme-dark",
    },
  },
  watch: {
    currentTheme(val) {
      this.$emit('on-current-theme-change', this.currentTheme)
    }
  },
  methods: {
    navigate(route) {
      let key = ["TvShowsDetails", "MoviesDetails", "PeopleDetails"]
      if (key.includes(this.$route.name)) {
        window.open(route, '_blank');
      } else {
        this.$router.push(route)
      }

    }
  }
}
</script>
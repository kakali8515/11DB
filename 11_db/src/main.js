import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import '@/assets/styles/style.scss';
import i18n from './config/i18n';
import './config/axios-interceptor';
import { vfmPlugin } from 'vue-final-modal'
import Pagination from 'v-pagination-3';
import RangeSlider from './components/RangeSlider.vue';
import Dropdown from './components/Dropdown.vue';
import SearchDropdown from './components/SearchDropdown.vue';
import vClickOutside from "click-outside-vue3"
import CKEditor from '@ckeditor/ckeditor5-vue';

// cookie
import VueCookies from 'vue3-cookies';
// loader
// import Loading from 'vue3-loading-overlay';
// loader stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import Vidle from 'v-idle-3'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { en, ko } from 'vuetify/locale'

import platform from 'platform';


const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en, ko }
  },
  theme: {
    defaultTheme: 'dark'
  }
});

const PlatformPlugin = {
  install(app) {
    app.config.globalProperties.$platform = platform;
  },
};

app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(vfmPlugin);
app.use(VueCookies);
app.use(vClickOutside);
app.use(PlatformPlugin);
app.use(Vidle);
app.mount('#app');
app.component('pagination', Pagination);
app.component('RangeSlider', RangeSlider);
// app.component('Loading', Loading);
app.component('Dropdown', Dropdown);
app.component('SearchDropdown', SearchDropdown);
app.use( CKEditor );

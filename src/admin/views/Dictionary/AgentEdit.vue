<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/agency-icon.svg" alt="" /></span>{{ $t("dictionary.agentList.agency") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("dictionary.agent.editAgency") }}</h3>
        <div class="frm-innr frm-wd-in sml">
          <div class="form-group">
            <label>{{ $t("dictionary.agent.id") }}</label>
            <input type="text" placeholder="A0524" class="form-control disabled" v-model="agentDetails.agency_code" />
          </div>
        </div>
        <div class="enter-dtl-innr">
          <div class="frm-innr frm-wd-in">
            <p class="frm-heading">
              {{ $t("dictionary.agent.detailsKorean") }}<span>*</span>
            </p>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.agencyName") }} ({{
                  $t("dictionary.agent.ko")
                }})</label>
                <input type="text" :placeholder="$t('dictionary.agent.agencyNameText')" class="form-control"
                  v-model="agentDetails.name_ko" @keypress="isChar($event)" maxlength="150"
                  :class="error.agency_name_ko ? 'error-border' : ''" />
                <span v-if="error.agency_name_ko" class="error-txt">{{
                  error.agency_name_ko
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.aka") }} ({{
                  $t("dictionary.agent.ko")
                }})</label>
                <input type="text" :placeholder="$t('dictionary.agent.akaText')" class="form-control"
                  v-model="agentDetails.aka_ko" @keypress="isChar($event)" maxlength="150" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.address") }} ({{
                $t("dictionary.agent.ko")
              }})</label>
              <textarea :placeholder="$t('dictionary.agent.addressText')" class="form-control address-textarea"
                v-model="agentDetails.address_ko" maxlength="230"></textarea>
            </div>
            <p class="frm-heading">
              {{ $t("dictionary.agent.detailsEnglish") }}<span>*</span>
            </p>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.agencyName") }} ({{
                  $t("dictionary.agent.en")
                }})</label>
                <input type="text" :placeholder="$t('dictionary.agent.agencyNameText')" class="form-control"
                  v-model="agentDetails.name_en" @keypress="isChar($event)" maxlength="150"
                  :class="error.agency_name_en ? 'error-border' : ''" />
                <span v-if="error.agency_name_en" class="error-txt">{{
                  error.agency_name_en
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.aka") }} ({{
                  $t("dictionary.agent.en")
                }})</label>
                <input type="text" :placeholder="$t('dictionary.agent.akaText')" class="form-control"
                  v-model="agentDetails.aka_en" @keypress="isChar($event)" maxlength="150" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.address") }} ({{
                $t("dictionary.agent.en")
              }})</label>
              <textarea :placeholder="$t('dictionary.agent.addressText')" class="form-control address-textarea"
                v-model="agentDetails.address_en" maxlength="230"></textarea>
            </div>
          </div>
        </div>
        <div class="enter-dtl-innr">
          <div class="frm-innr frm-wd-in">
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.tel") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.telText')" class="form-control"
                  v-model="agentDetails.phone_number" maxlength="20" @keypress="isPhoneNumber($event)"
                  :class="error.phone_number ? 'error-border' : ''" />
                <span v-if="error.phone_number" class="error-txt">{{
                  error.phone_number
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.fax") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.faxText')" class="form-control" maxlength="20"
                  v-model="agentDetails.fax" @keypress="isIntegerNumber($event)"
                  :class="error.fax ? 'error-border' : ''" />
                <span v-if="error.fax" class="error-txt">{{ error.fax }}</span>
              </div>
            </div>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.email") }}</label>
                <input type="email" :placeholder="$t('dictionary.agent.emailText')" class="form-control"
                  v-model="agentDetails.email" @keyup="checkEmail" :class="error.email ? 'error-border' : ''" />
                <span v-if="error.email" class="error-txt">{{
                  error.email
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.officialURL") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.urlText')" class="form-control"
                  v-model="agentDetails.site_link" @keyup="checkURL(agentDetails.site_link, 'site_link')"
                  :class="error.site_link ? 'error-border' : ''" />
                <span v-if="error.site_link" class="error-txt">{{
                  error.site_link
                }}</span>
              </div>
            </div>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.youtube") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.youtubeText')" class="form-control"
                  v-model="agentDetails.youtube_link" @keyup="checkYoutube"
                  :class="error.youtube_link ? 'error-border' : ''" />
                <span v-if="error.youtube_link" class="error-txt">{{
                  error.youtube_link
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.facebook") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.facebookText')" class="form-control"
                  v-model="agentDetails.facebook_link" @keyup="checkURL(agentDetails.facebook_link, 'facebook_link')"
                  :class="error.facebook_link ? 'error-border' : ''" />
                <span v-if="error.facebook_link" class="error-txt">{{
                  error.facebook_link
                }}</span>
              </div>
            </div>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.instagram") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.instagramText')" class="form-control"
                  v-model="agentDetails.instagram_link" @keyup="
                    checkURL(agentDetails.instagram_link, 'instagram_link')
                    " :class="error.instagram_link ? 'error-border' : ''" />
                <span v-if="error.instagram_link" class="error-txt">{{
                  error.instagram_link
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.twitter") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.twitterText')" class="form-control"
                  v-model="agentDetails.twitter_link" @keyup="checkURL(agentDetails.twitter_link, 'twitter_link')"
                  :class="error.twitter_link ? 'error-border' : ''" />
                <span v-if="error.twitter_link" class="error-txt">{{
                  error.twitter_link
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="material-filter-list">
          <h3>{{ $t("dictionary.agent.managerList") }}</h3>
          <div class="btn-group">
            <button type="button" class="btn outline blk-btn" @click="
              agentDetails.maneger_list.length + 1;
            agentDetails.maneger_list.push({
              manager_name_ko: '',
              manager_name_en: '',
              manager_email: '',
              manager_phone: '',
              artists: [],
            });
            ">
              {{ $t("dictionary.agent.addMore") }}
            </button>
          </div>
        </div>
        <div class="gray-bck" v-for="(n, key) in agentDetails.maneger_list?.length" :key="key">
          <span v-if="agentDetails.maneger_list.length > 1" class="clsaddlist" @click="deleteManagerDetails(key)"><img
              src="@/assets/icons/close-blc.svg" /></span>
          <div class="frm-innr">
            <div class="form-group">
              <label>{{ $t("dictionary.agent.managerName(KO)") }}</label>
              <input type="text" :placeholder="$t('dictionary.agent.koreanNameText')" class="form-control"
                v-model="agentDetails.maneger_list[key].manager_name_ko" maxlength="150"
                @keypress="isCharWithSpeailChar($event)" :class="error.manager_name_ko && error.manager_name_ko[key]
                    ? 'error-border'
                    : ''
                  " />
              <span v-if="error.manager_name_ko && error.manager_name_ko[key]" class="error-txt">{{
                error.manager_name_ko[key] }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.managerName(EN)") }}</label>
              <input type="text" :placeholder="$t('dictionary.agent.englishNameText')" class="form-control"
                v-model="agentDetails.maneger_list[key].manager_name_en" @keypress="isCharWithSpeailChar($event)"
                maxlength="150" :class="error.manager_name_en && error.manager_name_en[key]
                    ? 'error-border'
                    : ''
                  " />
              <span v-if="error.manager_name_en && error.manager_name_en[key]" class="error-txt">{{
                error.manager_name_en[key] }}</span>
            </div>
          </div>
          <div class="frm-innr frm-wd-in">
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.email") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.emailText')" class="form-control"
                  v-model="agentDetails.maneger_list[key].manager_email" @keyup="checkManagerEmail" :class="error.manager_email && error.manager_email[key]
                      ? 'error-border'
                      : ''
                    " />
                <span v-if="error.manager_email && error.manager_email[key]" class="error-txt">{{ error.manager_email[key]
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.tel") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.telText')" class="form-control"
                  v-model="agentDetails.maneger_list[key].manager_phone" maxlength="20" @keypress="isPhoneNumber($event)"
                  :class="error.manager_phone_number &&
                      error.manager_phone_number[key]
                      ? 'error-border'
                      : ''
                    " />
                <span v-if="error.manager_phone_number &&
                  error.manager_phone_number[key]
                  " class="error-txt">{{ error.manager_phone_number[key] }}</span>
              </div>
            </div>
          </div>
          <div class="frm-innr w-100">
            <div class="form-group mb-0">
              <label>{{ $t("dictionary.agent.artist") }}</label>
              <div class="artist-cursor">
                <SearchVideo @searchInput="getArtistSearch" :list="artistList" :isConnectionData="isArtistData"
                  :connectionValue="artist" :connectionBelowList="agentDetails.maneger_list[key].artists"
                  @connectionInput="getArtistInput" type="artist"
                  :isError="error.artist && error.artist[key] ? true : false" @scrolling="onArtistScroll" :page="page"
                  @inputEvent="debouncedHandler" />
              </div>
              <span v-if="error.artist && error.artist[key]" class="error-txt">{{ error.artist[key] }}</span>
            </div>
          </div>
        </div>

        <div class="btn-group justify-btwn">
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="editDictionaryAgencyDetails" />
          <button type="button" class="btn outline blk-btn" @click="$router.push('/admin/agent-list')">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import DictionaryAgencyService from "@/admin/services/DictionaryAgencyService";
import SearchVideo from "@/components/SearchVideo.vue";
import Toast from "@/alert/alert.js";
import debounce from "lodash.debounce";
import {
  isChar,
  isValidUrl,
  isIntegerNumber,
  isPhoneNumber,
  isValidEmail,
  matchYoutubeUrl,
  isCharWithSpeailChar,
} from "@/mixins/CommonValidation.js";

export default {
  name: "AgentEdit",
  inject: ["common"],
  components: { Sidebar, SearchVideo },
  created() {
    this.DictionaryAgencyService = new DictionaryAgencyService();
  },
  mounted() {
    this.getDictionaryAgencyDetails();
    // this.getArtistList();
  },
  data() {
    return {
      artist: [],
      artistList: [],
      searchArtist: "",
      agentId: this.$route.params.id ? this.$route.params.id : 15,
      agentDetails: {},
      error: {},
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
      page: 1,
      limit: 20,
      totalRecords: "",
      isArtistData: false
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        if (Object.keys(this.error).length != 0) {
          this.validateData();
        }
      }
    },
  },
  methods: {
    getDictionaryAgencyDetails() {
      this.DictionaryAgencyService.getDictionaryAgencyDetails(this.agentId)
        .then((res) => {
          if (res.status == 200) {
            this.agentDetails = { ...res.data };

            this.agentDetails.maneger_list = this.agentDetails.maneger_list.map(
              (manager) => {
                return {
                  ...manager,
                  artists: manager.artists.map((item) => {
                    return {
                      title_poster: item.profile_image,
                      title_name: item.artist_name,
                      title_id: item.artist_id,
                    };
                  }),
                };
              }
            );
          }
        })
        .catch((err) => {
          return;
        });
    },
    getArtistList() {
      let data = {
        artist_name: this.searchArtist ? this.searchArtist : "",
        page: this.page,
        limit: this.limit,
      };
      this.DictionaryAgencyService.getArtistList(data)
        .then((res) => {
          if (res.status == 200) {
            this.isArtistData = true;
            this.totalRecords = res.data.total_records;
            this.artistList = [
              ...this.artistList,
              ...res.data.results.map((item) => {
                return {
                  title_poster: item.profile_picture,
                  title_name: item.artist_name,
                  title_id: item.artist_id,
                };
              }),
            ];
          }
        })
        .catch((err) => {
          return;
        });
    },
    onArtistScroll(newPage) {
      this.page = newPage;
      if (this.totalRecords > this.artistList.length) this.getArtistList();
    },
    debouncedHandler: debounce(function () {
      this.artistList = [];
      this.page = 1;
      if (this.searchArtist) {
        this.getArtistList();
      }
    }, 500),
    validateData() {
      this.error = {};
      if (
        this.agentDetails.name_ko == "" ||
        this.agentDetails.name_ko == undefined
      ) {
        this.error.agency_name_ko = this.$t("Error.requiredInput");
      } else {
        if (/[0-9]+/.test(this.agentDetails.name_ko)) {
          this.error.agency_name_ko = this.$t("Error.numberNotAll");
        } else if (this.specialChars.test(this.agentDetails.name_ko)) {
          this.error.agency_name_ko = this.$t("Error.specialCharacter");
        }
      }
      if (
        this.agentDetails.name_en == "" ||
        this.agentDetails.name_en == undefined
      ) {
        this.error.agency_name_en = this.$t("Error.requiredInput");
      } else {
        if (/[0-9]+/.test(this.agentDetails.name_en)) {
          this.error.agency_name_en = this.$t("Error.numberNotAll");
        } else if (this.specialChars.test(this.agentDetails.name_en)) {
          this.error.agency_name_en = this.$t("Error.specialCharacter");
        }
      }

      if (/[a-zA-Z]+/.test(this.agentDetails.phone_number)) {
        this.error.phone_number = this.$t("Error.notAllowedCharacter");
      } else if (this.specialChars.test(this.agentDetails.phone_number)) {
        this.error.phone_number = this.$t("Error.specialCharacter");
      }

      if (/[a-zA-Z]+/.test(this.agentDetails.fax)) {
        this.error.fax = this.$t("Error.notAllowedCharacter");
      } else if (this.specialChars.test(this.agentDetails.fax)) {
        this.error.fax = this.$t("Error.specialCharacter");
      }

      this.agentDetails.maneger_list.map((item, key) => {
        if (item.manager_name_ko == "" || item.manager_name_ko == undefined) {
          if (!this.error.manager_name_ko) {
            this.error.manager_name_ko = [];
          }
          this.error.manager_name_ko[key] = this.$t("Error.requiredInput");
        } else {
          if (/[0-9]+/.test(item.manager_name_ko)) {
            this.error.manager_name_ko = [];
            this.error.manager_name_ko[key] = this.$t("Error.numberNotAll");
          }
        }

        if (item.manager_name_en == "" || item.manager_name_en == undefined) {
          if (!this.error.manager_name_en) {
            this.error.manager_name_en = [];
          }
          this.error.manager_name_en[key] = this.$t("Error.requiredInput");
        } else {
          if (/[0-9]+/.test(item.manager_name_en)) {
            this.error.manager_name_en = [];
            this.error.manager_name_en[key] = this.$t("Error.numberNotAll");
          }
        }

        if (/[a-zA-Z]+/.test(item.manager_phone)) {
          this.error.manager_phone_number = [];
          this.error.manager_phone_number[key] = this.$t(
            "Error.notAllowedCharacter"
          );
        } else if (this.specialChars.test(item.manager_phone)) {
          this.error.manager_phone_number = [];
          this.error.manager_phone_number[key] = this.$t(
            "Error.specialCharacter"
          );
        }

        if (item.artists.length < 1) {
          if (!this.error.artist) {
            this.error.artist = [];
          }
          this.error.artist[key] = this.$t("Error.minimumRequired");
        }
      });
      this.checkYoutube();
      this.checkEmail();
      this.checkManagerEmail();

      this.checkURL(this.agentDetails.site_link, "site_link");
      this.checkURL(this.agentDetails.facebook_link, "facebook_link");
      this.checkURL(this.agentDetails.instagram_link, "instagram_link");
      this.checkURL(this.agentDetails.twitter_link, "twitter_link");
    },
    deleteManagerDetails(key) {
      if (this.agentDetails.maneger_list.length > 1) {
        // this.agentDetails.maneger_list.length = this.agentDetails.maneger_list.length - 1;
        this.agentDetails.maneger_list.splice(key, 1);
      }
    },
    editDictionaryAgencyDetails() {
      this.validateData();
      // stop api execution if error found
      if (Object.keys(this.error).length != 0) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        return false;
      }
      this.agentDetails.maneger_list = this.agentDetails.maneger_list.map(
        (manager) => {
          return {
            name_en: manager.manager_name_en,
            name_ko: manager.manager_name_ko,
            id: manager.manager_id,
            phone: manager.manager_phone,
            email: manager.manager_email,
            artists: manager.artists.map((item) => {
              return item.title_id;
            }),
          };
        }
      );
      let data = {
        id: this.agentId,
        name_en: this.agentDetails.name_en,
        aka_en: this.agentDetails.aka_en,
        address_en: this.agentDetails.address_en,

        name_ko: this.agentDetails.name_ko,
        aka_ko: this.agentDetails.aka_ko,
        address_ko: this.agentDetails.address_ko,

        agency_code: this.agentDetails.agency_code,
        email: this.agentDetails.email,
        phone_number: this.agentDetails.phone_number,
        fax: this.agentDetails.fax,
        site_link: this.agentDetails.site_link,
        instagram_link: this.agentDetails.instagram_link,
        facebook_link: this.agentDetails.facebook_link,
        twitter_link: this.agentDetails.twitter_link,
        youtube_link: this.agentDetails.youtube_link,
        manager_details: [...this.agentDetails.maneger_list],
      };
      this.DictionaryAgencyService.editDictionaryAgencyDetails(data)
        .then((res) => {
          if (res.status == 200) {
            Toast.fire({ title: this.$t("Error.success") });
            this.$router.push(`/admin/agent-details/${this.agentId}`);
          }
        })
        .catch((err) => {
          return;
        });
    },

    // check agency official site
    checkURL(url, errorLocation) {
      if (url == "") {
        delete this.error[errorLocation];
        return true;
      }
      if (!this.isValidUrl(url)) {
        this.error[errorLocation] = this.$t("Error.validUrl");
        return false;
      } else {
        delete this.error[errorLocation];
      }
    },

    // check agency email
    checkEmail() {
      if (this.agentDetails.email == "") {
        delete this.error.email;
        return true;
      }
      if (!this.isValidEmail(this.agentDetails.email)) {
        this.error.email = this.$t("Error.pleaseValidEmail");
        return false;
      } else {
        delete this.error.email;
      }
    },

    // check manager emails
    checkManagerEmail() {
      if (!this.error.manager_email) {
        this.error.manager_email = [];
      }
      this.agentDetails.maneger_list.map((item, key) => {
        if (item.manager_email == "") {
          delete this.error.manager_email[key];
          return true;
        }
        if (!this.isValidEmail(item.manager_email)) {
          this.error.manager_email[key] = this.$t("Error.pleaseValidEmail");
          return false;
        } else {
          delete this.error.manager_email[key];
        }
      });
      if (this.error.manager_email.length == 0) {
        delete this.error.manager_email;
      }
    },

    checkYoutube() {
      if (this.agentDetails.youtube_link == "") {
        delete this.error.youtube_link;
        return true;
      }
      if (!this.matchYoutubeUrl(this.agentDetails.youtube_link)) {
        this.error.youtube_link = this.$t("Error.pleaseValidYoutube");
        return false;
      } else {
        delete this.error.youtube_link;
      }
    },
    getArtistSearch(input) {
      this.searchArtist = input;
      this.isArtistData = false;
      if (this.searchArtist == "") {
        this.artistList = [];
        return;
      }
    },
    getArtistInput(id) {
      this.artist = id;
    },
    isChar,
    isValidUrl,
    isIntegerNumber,
    isPhoneNumber,
    isValidEmail,
    matchYoutubeUrl,
    isCharWithSpeailChar,
  },
};
</script>
<style scoped>
.search-tags-area .single-tags p {
  color: #a4a4a4;
}

.artist-cursor {
  cursor: pointer;
}

.error-txt {
  color: #db5857;
  padding-left: 0;
  font-weight: 600;
  font-size: 14px;
  display: block;
  text-align: left;
}

.address-textarea {
  line-height: normal;
}
</style>

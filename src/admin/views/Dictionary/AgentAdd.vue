<template>
  <!-- op -->
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/agency-icon.svg" alt="" /></span>{{ $t("dictionary.agentList.agency") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("dictionary.agent.addAgency") }}</h3>
        <div class="frm-innr frm-wd-in">
          <div class="double">
            <div class="form-group">
              <label>{{ $t("dictionary.agent.id") }}</label>
              <input type="text" placeholder="A0524" class="form-control disabled" v-model="agencyCode" />
            </div>
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
                  v-model="agencyNameKO" @keypress="isChar($event)" maxlength="150"
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
                  v-model="agencyAkaKO" @keypress="isChar($event)" maxlength="150" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.address") }} ({{
                $t("dictionary.agent.ko")
              }})</label>
              <textarea :placeholder="$t('dictionary.agent.addressText')" class="form-control address-textarea"
                v-model="agencyAddressKO" maxlength="230"></textarea>
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
                  v-model="agencyNameEN" @keypress="isChar($event)" maxlength="150"
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
                  v-model="agencyAkaEN" @keypress="isChar($event)" maxlength="150" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.address") }} ({{
                $t("dictionary.agent.en")
              }})</label>
              <textarea :placeholder="$t('dictionary.agent.addressText')" class="form-control address-textarea"
                v-model="agencyAddressEN" maxlength="230"></textarea>
            </div>
          </div>
        </div>
        <div class="enter-dtl-innr">
          <div class="frm-innr frm-wd-in">
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.tel") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.telText')" class="form-control"
                  v-model="phoneNumber" maxlength="20" @keypress="isPhoneNumber($event)"
                  :class="error.phone_number ? 'error-border' : ''" />
                <span v-if="error.phone_number" class="error-txt">{{
                  error.phone_number
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.fax") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.faxText')" class="form-control" v-model="fax"
                  maxlength="20" @keypress="isIntegerNumber($event)" :class="error.fax ? 'error-border' : ''" />
                <span v-if="error.fax" class="error-txt">{{ error.fax }}</span>
              </div>
            </div>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.email") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.emailText')" class="form-control"
                  v-model="agencyEmail" @keyup="checkEmail" :class="error.email ? 'error-border' : ''" />
                <span v-if="error.email" class="error-txt">{{
                  error.email
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.officialURL") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.urlText')" class="form-control" v-model="siteLink"
                  @keyup="checkURL(siteLink, 'site_link')" :class="error.site_link ? 'error-border' : ''" />
                <span v-if="error.site_link" class="error-txt">{{
                  error.site_link
                }}</span>
              </div>
            </div>
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.youtube") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.youtubeText')" class="form-control"
                  v-model="youtubeLink" @keyup="checkYoutube" :class="error.youtube_link ? 'error-border' : ''" />
                <span v-if="error.youtube_link" class="error-txt">{{
                  error.youtube_link
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.facebook") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.facebookText')" class="form-control"
                  v-model="facebookLink" @keyup="checkURL(facebookLink, 'facebook_link')"
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
                  v-model="instagramLink" @keyup="checkURL(instagramLink, 'instagram_link')"
                  :class="error.instagram_link ? 'error-border' : ''" />
                <span v-if="error.instagram_link" class="error-txt">{{
                  error.instagram_link
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.twitter") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.twitterText')" class="form-control"
                  v-model="twitterLink" @keyup="checkURL(twitterLink, 'twitter_link')"
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
              totalManager++;
            managerDetails.push({
              nameKO: '',
              nameEN: '',
              email: '',
              phoneNumber: '',
              artistBelowList: [],
            });
            ">
              {{ $t("dictionary.agent.addMore") }}
            </button>
          </div>
        </div>
        <div class="gray-bck" v-for="(n, key) in totalManager" :key="key">
          <span v-if="totalManager > 1" class="clsaddlist" @click="deleteManagerDetails(key)"><img
              src="@/assets/icons/close-blc.svg" /></span>
          <div class="frm-innr">
            <div class="form-group">
              <label>{{ $t("dictionary.agent.managerName") }} {{ n }} ({{
                $t("dictionary.agent.ko")
              }})</label>
              <input type="text" :placeholder="$t('dictionary.agent.koreanNameText')" class="form-control"
                v-model="managerDetails[key].nameKO" @keypress="isCharWithSpeailChar($event)" maxlength="150"
                :class="error.nameKO && error.nameKO[key] ? 'error-border' : ''" />
              <span v-if="error.nameKO && error.nameKO[key]" class="error-txt">{{ error.nameKO[key] }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("dictionary.agent.managerName") }} {{ n }} ({{
                $t("dictionary.agent.en")
              }})</label>
              <input type="text" :placeholder="$t('dictionary.agent.englishNameText')" class="form-control"
                v-model="managerDetails[key].nameEN" @keypress="isCharWithSpeailChar($event)" maxlength="150"
                :class="error.nameEN && error.nameEN[key] ? 'error-border' : ''" />
              <span v-if="error.nameEN && error.nameEN[key]" class="error-txt">{{ error.nameEN[key] }}</span>
            </div>
          </div>
          <div class="frm-innr frm-wd-in">
            <div class="double">
              <div class="form-group">
                <label>{{ $t("dictionary.agent.email") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.emailText')" class="form-control"
                  v-model="managerDetails[key].email" @change="checkManagerEmail" :class="error.manager_email && error.manager_email[key]
                    ? 'error-border'
                    : ''
                    " />
                <span v-if="error.manager_email && error.manager_email[key]" class="error-txt">{{ error.manager_email[key]
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("dictionary.agent.tel") }}</label>
                <input type="text" :placeholder="$t('dictionary.agent.telText')" class="form-control"
                  v-model="managerDetails[key].phoneNumber" maxlength="20" @keypress="isPhoneNumber($event)" :class="error.manager_phone_number &&
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
            <div class="form-group">
              <label>{{ $t("dictionary.agent.artist") }}</label>
              <div class="artist-cursor">
                <SearchVideo @searchInput="getArtistSearch" :list="artistList" :isConnectionData="isArtistData"
                  :connectionValue="artist" :connectionBelowList="managerDetails[key].artistBelowList"
                  @connectionInput="getArtistInput" type="artist"
                  :isError="error.artist && error.artist[key] ? true : false" @scrolling="onArtistScroll" :page="page"
                  @inputEvent="debouncedHandler" />
              </div>
              <span v-if="error.artist && error.artist[key]" class="error-txt">{{ error.artist[key] }}</span>
            </div>
          </div>
        </div>

        <div class="btn-group justify-btwn">
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="addDictionaryAgency" />
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
  isPhoneNumber,
  isIntegerNumber,
  isValidEmail,
  matchYoutubeUrl,
  isCharWithSpeailChar,
} from "@/mixins/CommonValidation.js";
export default {
  name: "AgentAdd",
  inject: ["common"],
  components: { Sidebar, SearchVideo },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        if (Object.keys(this.error).length != 0) {
          this.validateData();
        }
      }
    },
  },
  created() {
    this.DictionaryAgencyService = new DictionaryAgencyService();
  },
  mounted() {
    // this.getArtistList();
    this.generateAgencyCode();
  },
  data() {
    return {
      managerDetails: [
        {
          nameKO: "",
          nameEN: "",
          email: "",
          phoneNumber: "",
          artistBelowList: [],
        },
      ],
      totalManager: 1,
      agencyCode: "",
      agencyNameEN: "",
      agencyNameKO: "",
      agencyAddressEN: "",
      agencyAddressKO: "",
      agencyAkaEN: "",
      agencyAkaKO: "",
      agencyEmail: "",
      phoneNumber: "",
      fax: "",
      siteLink: "",
      instagramLink: "",
      facebookLink: "",
      twitterLink: "",
      youtubeLink: "",
      artist: [],
      artistList: [],
      searchArtist: "",
      error: {},
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
      page: 1,
      limit: 20,
      totalRecords: "",
      isArtistData: false
    };
  },
  methods: {
    validateData() {
      this.error = {};
      //validation for Agency name in Korean
      if (this.agencyNameKO == "") {
        this.error.agency_name_ko = this.$t("Error.requiredInput");
      } else {
        if (/[0-9]+/.test(this.agencyNameKO)) {
          this.error.agency_name_ko = this.$t("Error.numberNotAll");
        } else if (this.specialChars.test(this.agencyNameKO)) {
          this.error.agency_name_ko = this.$t("Error.specialCharacter");
        }
      }

      //validation for Agency name in English
      if (this.agencyNameEN == "") {
        this.error.agency_name_en = this.$t("Error.requiredInput");
      } else {
        if (/[0-9]+/.test(this.agencyNameEN)) {
          this.error.agency_name_en = this.$t("Error.numberNotAll");
        } else if (this.specialChars.test(this.agencyNameEN)) {
          this.error.agency_name_en = this.$t("Error.specialCharacter");
        }
      }

      if (/[a-zA-Z]+/.test(this.phoneNumber)) {
        this.error.phone_number = this.$t("Error.notAllowedCharacter");
      } else if (this.specialChars.test(this.phoneNumber)) {
        this.error.phone_number = this.$t("Error.specialCharacter");
      }

      if (/[a-zA-Z]+/.test(this.fax)) {
        this.error.fax = this.$t("Error.notAllowedCharacter");
      } else if (this.specialChars.test(this.fax)) {
        this.error.fax = this.$t("Error.specialCharacter");
      }

      //validation for manager details
      this.managerDetails.map((item, key) => {
        //validation for manager Korean Name
        if (item.nameKO == "") {
          if (!this.error.nameKO) {
            this.error.nameKO = [];
          }
          this.error.nameKO[key] = this.$t("Error.requiredInput");
        } else {
          if (/[0-9]+/.test(item.nameKO)) {
            this.error.nameKO = [];
            this.error.nameKO[key] = this.$t("Error.numberNotAll");
          }
        }

        //validation for manager English Name
        if (item.nameEN == "") {
          if (!this.error.nameEN) {
            this.error.nameEN = [];
          }
          this.error.nameEN[key] = this.$t("Error.requiredInput");
        } else {
          if (/[0-9]+/.test(item.nameEN)) {
            this.error.nameEN = [];
            this.error.nameEN[key] = this.$t("Error.numberNotAll");
          }
        }

        if (/[a-zA-Z]+/.test(item?.phoneNumber)) {
          this.error.manager_phone_number = [];
          this.error.manager_phone_number[key] = this.$t(
            "Error.notAllowedCharacter"
          );
        } else if (this.specialChars.test(item?.phoneNumber)) {
          this.error.manager_phone_number = [];
          this.error.manager_phone_number[key] = this.$t(
            "Error.specialCharacter"
          );
        }

        if (item.artistBelowList.length < 1) {
          if (!this.error.artist) {
            this.error.artist = [];
          }
          this.error.artist[key] = this.$t("Error.minimumRequired");
        }
        this.checkYoutube();
        this.checkEmail();
        this.checkManagerEmail();

        this.checkURL(this.siteLink, "site_link");
        this.checkURL(this.facebookLink, "facebook_link");
        this.checkURL(this.instagramLink, "instagram_link");
        this.checkURL(this.twitterLink, "twitter_link");
      });
    },
    addDictionaryAgency() {
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

      let managerDetails = this.managerDetails.map((item) => {
        return {
          name_ko: item.nameKO,
          name_en: item.nameEN,
          email: item.email,
          phone: item.phoneNumber ? item.phoneNumber : "",
          artists: item.artistBelowList.map((artist) => {
            return artist.title_id;
          }),
        };
      });
      let data = {
        name_en: this.agencyNameEN,
        name_ko: this.agencyNameKO,
        address_en: this.agencyAddressEN,
        address_ko: this.agencyAddressKO,
        aka_en: this.agencyAkaEN,
        aka_ko: this.agencyAkaKO,
        agency_code: this.agencyCode,
        email: this.agencyEmail,
        phone_number: this.phoneNumber,
        fax: this.fax,
        site_link: this.siteLink,
        instagram_link: this.facebookLink,
        facebook_link: this.facebookLink,
        twitter_link: this.twitterLink,
        youtube_link: this.youtubeLink,
        manager_details: [...managerDetails],
      };
      this.DictionaryAgencyService.addDictionaryAgency(data)
        .then((res) => {
          if (res.status == 200) {
            Toast.fire({ title: this.$t("Error.success") });
            this.$router.push("/admin/agent-list");
          }
        })
        .catch((err) => {
          return;
        });
    },
    deleteManagerDetails(key) {
      if (this.totalManager > 1) {
        this.totalManager = this.totalManager - 1;
        this.managerDetails.splice(key, 1);
      }
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
    generateAgencyCode() {
      this.DictionaryAgencyService.generateAgencyCode()
        .then((res) => {
          if (res.status == 200) {
            this.agencyCode = res.data.generated_agency_code;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getArtistSearch(input) {
      this.isArtistData = false;
      this.searchArtist = input;
      if (this.searchArtist == "") {
        this.artistList = [];
        return;
      }
    },
    getArtistInput(id) {
      this.artist = id;
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
      if (this.agencyEmail == "") {
        delete this.error.email;
        return true;
      }
      if (!this.isValidEmail(this.agencyEmail)) {
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
      this.managerDetails.map((item, key) => {
        if (item.email == "") {
          delete this.error.manager_email[key];
          return true;
        }
        if (!this.isValidEmail(item.email)) {
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
      if (this.youtubeLink == "") {
        delete this.error.youtube_link;
        return true;
      }
      if (!this.matchYoutubeUrl(this.youtubeLink)) {
        this.error.youtube_link = this.$t("Error.pleaseValidYoutube");
        return false;
      } else {
        delete this.error.youtube_link;
      }
    },
    isChar,
    isValidUrl,
    isPhoneNumber,
    isValidEmail,
    matchYoutubeUrl,
    isIntegerNumber,
    isCharWithSpeailChar,
  },
};
</script>
<style scoped>
.search-wrap-area {
  background: #fff;
}

.search-tags-area .single-tags {
  border: 1px solid #ccccce !important;
  padding: 8px !important;
}

.search-tags-area .single-tags p {
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  color: #6f7177 !important;
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

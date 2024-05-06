<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/agency-icon.svg" alt="" /></span>{{ $t("dictionary.agentList.agency") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("dictionary.agentList.userDetails") }}</h3>
        <ul class="usr-detls-list mb-50">
          <li>
            <span>{{ $t("dictionary.agent.id") }}:</span>
            <p>{{ agentDetails?.agency_code }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.aka") }} ({{$t("dictionary.agent.ko")}}):</span>
            <p>{{ agentDetails?.aka_ko ? agentDetails?.aka_ko : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.aka") }} ({{$t("dictionary.agent.en")}}):</span>
            <p>{{ agentDetails?.aka_en ? agentDetails?.aka_en : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.address") }} ({{$t("dictionary.agent.ko")}}):</span>
            <p>{{ agentDetails?.address_ko ? agentDetails?.address_ko  : '-'}}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.address") }} ({{$t("dictionary.agent.en")}}):</span>
            <p>{{ agentDetails?.address_en ? agentDetails?.address_en : '-' }}</p>
          </li>

          <li>
            <span>{{ $t("dictionary.agent.tel") }}:</span>
            <p>{{ agentDetails?.phone_number ? agentDetails?.phone_number : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.fax") }}:</span>
            <p>{{ agentDetails?.fax ? agentDetails?.fax  : '-'}}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.email") }}:</span>
            <p>{{ agentDetails?.email ? agentDetails?.email : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.officialURL") }}:</span>
            <p>{{ agentDetails?.site_link ? agentDetails?.site_link : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.youtube") }}:</span>
            <p>{{ agentDetails?.youtube_link ? agentDetails?.youtube_link : "-" }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.facebook") }}:</span>
            <p>{{ agentDetails?.facebook_link ? agentDetails?.facebook_link : '-' }}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.instagram") }}:</span>
            <p>{{ agentDetails?.instagram_link ? agentDetails?.instagram_link : '-'}}</p>
          </li>
          <li>
            <span>{{ $t("dictionary.agent.twitter") }}:</span>
            <p>{{ agentDetails?.twitter_link ? agentDetails?.twitter_link : '-' }}</p>
          </li>
        </ul>
        <h3 v-if="agentDetails?.maneger_list?.length > 0">{{ $t("dictionary.agent.managerList") }}</h3>
        <div
          class="gray-bck"
          v-for="(item, i) in agentDetails.maneger_list"
          :key="i"
        >
          <ul class="usr-detls-list">
            <li>
              <span>{{ $t("dictionary.agent.managerName(KO)") }}:</span>
              <p>{{ item?.manager_name_ko ? item?.manager_name_ko : '-' }}</p>
            </li>
            <li>
              <span>{{ $t("dictionary.agent.managerName(EN)") }}:</span>
              <p>{{ item?.manager_name_en ? item?.manager_name_en : '-' }}</p>
            </li>
            <li>
              <span>{{ $t("dictionary.agent.email") }}:</span>
              <p>{{ item?.manager_email ? item?.manager_email : '-' }}</p>
            </li>
            <li>
              <span>{{ $t("dictionary.agent.phone") }}:</span>
              <p>{{ item?.manager_phone ? item?.manager_phone : '-' }}</p>
            </li>
            <li>
              <span>{{ $t("dictionary.agent.artist") }}:</span>
              <ul v-if="item?.artists.length > 0">
                <li v-for="(artist, i) in item?.artists" :key="i">
                  {{ artist.artist_name }}
                </li>
              </ul>
              <p v-else>-</p>
            </li>
          </ul>
        </div>
        <div class="btn-group justify-btwn">
          <div class="btn-group-innr">
            <button
              type="submit"
              class="btn org-btn"
              @click="$router.push(`/admin/agent-edit/${agentId}`)"
            >
            {{ $t("button.edit") }}
            </button>
            <button
              type="button"
              class="btn outline blk-btn"
              @click="deleteDictionaryAgency"
            >
            {{ $t("button.delete") }}
            </button>
          </div>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="$router.push('/admin/agent-list')"
          >
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
import Toast from "@/alert/alert.js";
export default {
  name: "AgentDetails",
  components: { Sidebar },
  mounted() {
    this.getDictionaryAgencyDetails();
  },
  created() {
    this.DictionaryAgencyService = new DictionaryAgencyService();
  },
  data() {
    return {
      agentId: this.$route.params.id ? this.$route.params.id : "a1",
      agentDetails: {},
    };
  },
  methods: {
    getDictionaryAgencyDetails() {
      this.DictionaryAgencyService.getDictionaryAgencyDetails(this.agentId)
        .then((res) => {
          if (res.status == 200) {
            this.agentDetails = { ...res.data };
          }
        })
        .catch((err) => {
          return;
        });
    },
    deleteDictionaryAgency() {
      this.DictionaryAgencyService.deleteDictionaryAgency({ id: this.agentId })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/admin/agent-list");
            Toast.fire({ title: this.$t("Error.success") });
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

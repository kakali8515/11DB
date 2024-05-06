<template>
  <div class="lists tab-scroll moble" v-if="people_list.length > 0">
    <div class="image-otr cast-crew">
      <CastCrewCard
        v-for="(people, i) in people_list"
        :key="i"
        :castList="people"
        :redirectLink="people.id ? `PeopleDetails` : ``"
      />
    </div>
    <router-link to class="more-content" @click="$emit('navigation')">
      <img
        src="@/assets/icons/right-arrow-solid.svg"
        alt="more"
        class="white-image"
      />
      <img
        src="@/assets/icons/solid-right-arrow.svg"
        alt="more"
        class="red-image"
      />
    </router-link>
  </div>
  <div class="no-data-wrapper" v-else>
    <p>{{ $t("searchResults.noData") }}</p>
  </div>
</template>


<script>
import CastCrewCard from "@/components/CastCrewCard.vue";
export default {
  name: "CastCrewSection",
  components: {
    CastCrewCard,
  },
  props: {
    people_list: Array,
  },
};
</script>
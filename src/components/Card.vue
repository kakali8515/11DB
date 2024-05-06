<template>
  <span
    @click="$router.push({ name: 'PeopleDetails', params: { id: people?.people_id, pageTitle: people?.people_name } })"><img
      v-if="people.people_image?.includes('https')" :src="people.people_image" :alt="people.people_image" />
    <img v-else src="@/assets/images/no-image-view.png" alt="" /></span>
  <p>{{ people.people_name }}</p>
</template>


<script>
export default {
  name: "Card",
  props: {
    people: Object,
  },
};
</script>
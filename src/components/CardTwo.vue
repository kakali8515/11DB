<template>
  <a  @click="$router.push({ name: RedirectLink, params: { id: trending.title_id, pageTitle: trending.title_name }})" class="list-content" href="javascript:void(0)">
    <div class="list-img">
      <img v-if="trending.poster_image?.includes('https')" :src="trending.poster_image" alt="image" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
    </div>
    <p :title="trending.title_name">{{trending.title_name}}</p>
  </a>
</template>


<script>
export default {
  name: "CardTwo",
  props: {
    trending: Object,
    RedirectLink: String
  },
};
</script>
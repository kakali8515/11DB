<template>
  <div class="mb-tag-otr">
    <h2 class="mb-20 small-hdr">{{ $t("filterCard.tags") }}</h2>
    <Dropdown @dropdownValue="getTag" :search_type="selectTag" :searchTitleListItem="tag_list" searchtitle="title"
      searchvalue="id" :clearable="false" />
    <ul class="mb-tag-list">
      <li v-for="(item, i) in selected_tag_list" :key="i" @click="
        $router.push({
          name: 'TagDetail',
          params: { id: item.id, tagname: item.title, pageTitle: item.title },
        })
        ">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "TagCard",
  data() {
    return {
      selectTag: "",
    };
  },
  props: {
    tag_list: Array,
    selected_tag_list: Array,
  },
  emits: ["getTag"],
  mounted() {
    this.selectTag = this.tag_list[0];
  },
  methods: {
    getTag(event) {
      this.$emit("getTag", event);
    },
  },
};
</script>
import axios from "axios";

export default {
  async getAdminDictionaryCategoryList() {
    return axios.get(`/admin/dictionary/tag/category-list`);
  },

  async getSubCategoryList(id) {
    return axios.get(
      `/admin/dictionary/tag/sub-category-list?category_id=${id}`
    );
  },

  async getTagList(data) {
    return await axios
      .post(`/admin/dictionary/tag/list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  async addMainCategory(data) {
    return await axios
      .post(`/admin/dictionary/tag/add-main-category`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async addSubCategory(data) {
    return await axios
      .post(`/admin/dictionary/tag/add-sub-category`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async addTag(data) {
    return await axios
      .post(`/admin/dictionary/tag/add-tag`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async downloadTagData(category_id, sub_category_id, tag_name) {
    return await axios
      .get(`/admin/dictionary/tag/data-download?category_id=${category_id}&sub_category_id=${sub_category_id}&tag_name=${tag_name}`)
      .then((res) => res)
      .catch((err) => err);
  },

  async deleteTag(data) {
    return await axios
      .post(`/admin/dictionary/tag/delete-tag`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  async getTagDetails(id) {
    return axios.get(`/admin/dictionary/tag/details?tag_id=${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  async updateTagDetails(data) {
    return axios.post(`/admin/dictionary/tag/edit-tag`, data)
      .then((res) => res)
      .catch((err) => err);
  },
};

import axios from "axios";

export default {
  // get front main list
  async getFrontMainList() {
    return await axios
      .get(`/admin/settings/front-line/main/list`)
      .then((res) => res)
      .catch((err) => err);
  },

  // get front footer list
  async getFrontFooterList(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async mainUpdateStatus(data) {
    return await axios
      .post(`/admin/settings/front-line/main/status-change`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async refreshTopNews(data) {
    return await axios
      .post(`/admin/settings/front-line/main/top-news/refresh`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  async getTopNewsList(data) {
    return await axios.post(`admin/settings/front-line/main/top-news/list`, {
      ...data,
    });
  },

  async topNewsUpdateStatus(data) {
    return axios.post(`admin/settings/front-line/main/top-news/edit`, {
      ...data,
    });
  },

  // change policy status
  async editPolicyStatus(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy/status-change`, {
        ...data,
      })
      .then((res) => res)
      .catch((err) => err);
  },

  // get policy details
  async getPolicyDetails(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy/details`, {
        ...data,
      })
      .then((res) => res)
      .catch((err) => err);
  },

  // add new  policy
  async addPolicy(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy/add`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // edit policy
  async editPolicy(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy/edit`, {
        ...data,
      })
      .then((res) => res)
      .catch((err) => err);
  },

  // delete policy
  async deletePolicy(data) {
    return await axios
      .post(`/admin/settings/front-line/footer/privacy-policy/delete`, {
        ...data,
      })
      .then((res) => res)
      .catch((err) => err);
  },
};

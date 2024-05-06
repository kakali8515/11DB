import axios from "axios";

export default {
  // get role list
  async getRoleList() {
    return await axios
      .get(`/admin/user/type`)
      .then((res) => res)
      .catch((err) => err);
  },

  // get user list
  async getUserList(data) {
    return await axios
      .get(`/admin/user/list`, { params: data })
      .then((res) => res)
      .catch((err) => err);
  },

  // add user
  async addUser(data) {
    return await axios
      .post(`/admin/user/add`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  // edit user
  async editUser(data) {
    return await axios
      .post(`/admin/user/edit`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // get user detail
  async getUserDetail(id) {
    return await axios
      .get(`/admin/user/details/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  // delete user
  async deleteUser(data) {
    return await axios
      .post(`/admin/user/delete`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  async getUserMenu() {
    return await axios
      .get(`/admin/user/menu`)
      .then((res) => res)
      .catch((err) => err);
  },

};

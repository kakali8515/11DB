import axios from "axios";
export default {
  // get user settings
  async getUserSettings() {
    return await axios
      .get(`/mypage/get-user-settings`)
      .then((res) => res)
      .catch((err) => err);
  },
  // get favorite list
  async getFavouriteList(data) {
    return await axios
      .post(`/mypage/favourite-list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // get communication list
  async getCommunicationList(data) {
    return await axios
      .post(`/mypage/communication-list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // delete communication comment
  async deleteCommunication(data) {
    return await axios
      .post(`/mypage/communication-delete`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // to delete my account
  async accountWithdrawal(data) {
    return await axios
      .post(`/mypage/user-withdrawal`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // to save my account settings
  async saveSettings(data) {
    return await axios
      .post(`/mypage/save-user-details`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  // to get user information
  async getUserInfo() {
    return await axios
      .get(`/mypage/menu-user-information`)
      .then((res) => res)
      .catch((err) => err);
  },

  // to change password
  async changePassword(data) {
    return await axios
      .post(`/mypage/user-change-password`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
};

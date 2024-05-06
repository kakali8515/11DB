//import
import axios from "axios";

export default class DictionaryAgencyService {
  // get dictionary agency list
  async getDictionaryAgencyList(data) {
    return await axios
      .post(`/admin/dictionary/agency/list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  //add new agency
  async addDictionaryAgency(data) {
    return await axios
      .post(`/admin/dictionary/agency/add`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  //get artist list
  async getArtistList(data) {
    return await axios
      .post(`/admin/dictionary/agency/artist-list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // show agency details
  async getDictionaryAgencyDetails(id) {
    return await axios
      .get(`/admin/dictionary/agency/details?id=${id}`)
      .then((res) => res)
      .catch((err) => err);
  }

  // edit agency details
  async editDictionaryAgencyDetails(data) {
    return await axios
      .post(`/admin/dictionary/agency/edit`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // delete agency
  async deleteDictionaryAgency(id) {
    return await axios
      .post(`/admin/dictionary/agency/delete`, id)
      .then((res) => res)
      .catch((err) => err);
  }

  // generate agency code
  async generateAgencyCode() {
    return await axios
      .get(`admin/dictionary/agency/auto-generate-code`)
      .then((res) => res)
      .catch((err) => err);
  }
}

import axios from "axios";

export default {
    // get export list
  async getExportList(data) {
    return await axios
      .post(`/admin/bulk-work/export/list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  async downloadExportData(id) {
    return await axios
      .get(`/admin/bulk-work/export/list/download?id=${id}`)
      .then((res) => res)
      .catch((err) => err);
  },
  async getworkList(data) {
    return await axios
      .post(`/admin/bulk-work/work-list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  async getSearchTypeList() {
    return await axios
      .get(`/admin/bulk-work/work-list/search-type-list`)
      .then((res) => res)
      .catch((err) => err);
  },
  async getSearchIdTypeList() {
    return await axios
      .get(`/admin/bulk-work/work-list/search-id-type-list`)
      .then((res) => res)
      .catch((err) => err);
  },
  async ExportBulkWorkList(data) {
    return await axios
      .post(`/admin/bulk-work/work-list/export`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
}
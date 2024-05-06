//import
import axios from "axios";

export default class BulkWorkingService {
  // get bulk working import list
  async getBulkWorkingImportList(data) {
    return await axios
      .post(`/admin/bulk-work/import/file-list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // get bulk working import status list
  async getImportStatusList(data) {
    return await axios
      .post(`/admin/bulk-work/import/file-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload json file
  async bulkWorkingUploadFileJson(data) {
    return await axios
      // .post(`/admin/bulk-work/import/data/json`, data, {
      .post(`/admin/bulk-work/import/data/tmdbid/json`, data, {

        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload xls file
  async bulkWorkingUploadFileXls(data) {
    return await axios
      // .post(`/admin/bulk-work/import/data/xls`, data, {
      .post(`/admin/bulk-work/import/data/tmdbid/xls`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
}

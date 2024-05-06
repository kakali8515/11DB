import axios from "axios";

export default class DataManagementService {
  // get priority list
  async getPriorityList(listType) {
    return await axios
      .get(`/admin/priority`, { params: { list_type: listType } })
      .then((res) => res)
      .catch((err) => err);
  }

  // get sets list of priority
  async getPrioritySetList() {
    return await axios
      .get(`/admin/priority/set-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // save priority
  async savePriority(data) {
    return await axios
      .post(`/admin/priority/save`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }
}

import axios from "axios";

export default {
  // get Edit list
  async getEditList(data) {
    return await axios
      .post(`/admin/edit/list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  //get list type
  async getListType() {
    return await axios
      .get("/admin/edit/title-type")
      .then((res) => res)
      .catch((err) => err);
  },

  //get status list type
  async getStatusType(data) {
    return await axios
      .get("/admin/edit/title/status-list", { params: data })
      .then((res) => res)
      .catch((err) => err);
  },

  //get operation type list
  async getOperationTypeList() {
    return await axios
      .get("/admin/edit/operation/type-list")
      .then((res) => res)
      .catch((err) => err);
  },

  //get editor list
  async getEditorList() {
    return await axios
      .get("/admin/edit/editor-list")
      .then((res) => res)
      .catch((err) => err);
  },

  //delete list
  async deleteEditList(edit_id) {
    return await axios
      .post("/admin/edit/delete", { edit_id: edit_id })
      .then((res) => res)
      .catch((err) => err);
  },

  //save allocateEditor
  async allocateEditor(data) {
    return await axios
      .post("/admin/edit/allocate-editor", { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  //deallocateEditor
  async deallocateEditor(data) {
    return await axios
      .post("/admin/edit/de-allocate-editor", { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  //check title editor
  async checkTitleEditor(edit_id) {
    return await axios
      .post("/admin/edit/check-title-editor ", { edit_id: edit_id })
      .then((res) => res)
      .catch((err) => err);
  },

  //add operation
  async addOperation(data) {
    return await axios
      .post("/admin/edit/add-operation", { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  async updateStatus(data) {
    return await axios
      .post("/admin/edit/status-change", { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
};

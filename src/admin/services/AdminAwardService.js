import axios from "axios";

export default {
  /** Admin award list */
  async adminAwardList(data) {
    return await axios
      .post(`/admin/edit/award/list`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award information */
  async adminAwardInfo(award_id) {
    return await axios
      .get(`/admin/edit/award/info/${award_id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award delete */
  async adminAwardDelete(award_id) {
    return await axios
      .post(`/admin/edit/awards/delete-award`, { award_id: award_id })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector list */
  async sectorList(data) {
    return await axios
      .get(`/admin/edit/awards/sectors`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector add */
  async adminAwardSectorAdd(data) {
    return await axios
      .post(`/admin/edit/awards/add-sector`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector delete */
  async adminAwardSectorDelete(data) {
    return await axios
      .post(`/admin/edit/awards/delete-sector`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector update */
  async adminAwardSectorOrderUpdate(data) {
    return await axios
      .post(`/admin/edit/awards/sector/save-order`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector info */
  async adminAwardSectorInfo(data) {
    return await axios
      .get(`/admin/edit/awards/sector-details`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector edit */
  async adminAwardSectorEdit(data) {
    return await axios
      .post(`/admin/edit/awards/edit-sector`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
  /** Admin award information */
  async adminAwardDelete(award_id) {
    return await axios
      .post(`/admin/edit/awards/delete-award`, { award_id: award_id })
      .then((res) => res)
      .catch((err) => err);
  },

  /** To Add new Admin award */
  async adminAwardAdd(data) {
    return await axios
      .post(`/admin/edit/award/add`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  /** To edit Admin award */
  async adminAwardEdit(data) {
    return await axios
      .post(`/admin/edit/award/edit`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector list */
  async pastAwardList(data) {
    return await axios
      .get(`/admin/edit/award/past-details`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin add round */
  async addRound(data) {
    return await axios
      .post(`/admin/edit/awards/add-round`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin edit round */
  async editRound(data) {
    return await axios
      .post(`/admin/edit/awards/edit-round`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award round delete */
  async adminAwardRoundDelete(data) {
    return await axios
      .post(`/admin/edit/awards/delete-round`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin add past award */
  async addPastAward(data) {
    return await axios
      .post(`/admin/edit/award/add-nominee`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award sector list */
  async sectorListData(data) {
    return await axios
      .get(`/admin/edit/awards/sector-list`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award work list */
  async workList(data) {
    return await axios
      .get(`/admin/edit/awards/work-list`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award character list */
  async characterList(data) {
    return await axios
      .get(`/admin/edit/awards/character-list`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award round list */
  async roundList(data) {
    return await axios
      .get(`/admin/edit/awards/round-list`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award round detail */
  async roundDetail(data) {
    return await axios
      .get(`/admin/edit/awards/round-details`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award nominee details */
  async getNominee(data) {
    return await axios
      .get(`/admin/edit/awards/nominee-details`, { params: { ...data } })
      .then((res) => res)
      .catch((err) => err);
  },
  /** Admin award add nominee */
  async addNominee(data) {
    return await axios
      .post(`/admin/edit/award/add-nominee`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award edit nominee */
  async editNominee(data) {
    return await axios
      .post(`/admin/edit/awards/edit-nominee`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  /** Admin award delete nominee */
  async deleteNominee(data) {
    return await axios
      .post(`/admin/edit/awards/delete-nominees`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },
};

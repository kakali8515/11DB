//import
import axios from "axios";

export default class EditPeopleService {
  // edit primary people details
  async editPrimaryDetails(data, id) {
    return await axios
      .post(`/people/edit/edit-people-primary-details`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // get internal people primary details
  async getPrimaryDetails(draft_request_id, language, people_id) {
    return await axios
      .get(`/people/edit/show-people-primary-details`, {
        params: {
          site_language: language,
          relation_id: draft_request_id,
          people_id: people_id,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // get tmdb people primary details
  async getEditTmdbPeoplePrimaryDetails(people_id, language, tmdb_id) {
    return await axios
      .get(`/people/tmdb-refresh/show-people-primary-details`, {
        params: {
          site_language: language,
          tmdb_id: tmdb_id,
          people_id: people_id,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // internal media details
  async mediaRequestList(
    people_id,
    draft_request_id,
    site_language,
    media_type
  ) {
    return await axios
      .post(`/people/edit/people-media-request-list`, {
        people_id: people_id,
        draft_request_id: draft_request_id,
        site_language: site_language,
        media_type: media_type,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // tmdb media list
  async tmdbMediaRequestList(
    people_id,
    tmdb_id,
    site_language,
    media_type
  ) {
    return await axios
      .post(`/people/tmdb-refresh/media-list`, {
        people_id: people_id,
        tmdb_id: tmdb_id,
        site_language: site_language,
        media_type: media_type,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // esit media details
  async addMediaDetails(data) {
    return await axios
      .post(`/people/edit/edit-people-media-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // submit all data
  async submitData(draft_relation_id, people_id) {
    return await axios
      .post(`/people/edit/submit-all-save-people`, {
        draft_relation_id: draft_relation_id,
        people_id: people_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async uploadMediaImages(data, id) {
    return await axios
      .post(`/people/edit/upload-people-media-image`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload background images
  async uploadBackgroundImages(data, id) {
    return await axios
      .post(`/people/edit/upload-people-background-image`, data, {
        headers: {
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
}

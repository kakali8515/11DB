//import
import axios from "axios";

export default class AddNewPeopleService {
  
  // add primary people details
  async addPrimaryDetails(data) {
    return await axios
      .post(`/people/add-people-primary-details`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //gender list
  async getGenderList() {
    return await axios
      .get(`people/gender-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // search people
  async searchPeople(
    search_type,
    search_text,
    sort_by,
    page,
    limit
  ) {
    return await axios
      .post(`/search/search-people-to-add`, {
        search_type: search_type,
        search_text: search_text,
        sort_by: sort_by,
        page: page,
        limit: limit,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // get primary details
  async getPrimaryDetails(draft_request_id, language, tmdb_id, kobis_id) {
    return await axios.get(`/people/show-people-primary-details`,
      {
        params: {
          site_language: language,
          relation_id: draft_request_id,
          tmdb_id: tmdb_id,
          kobis_id: kobis_id
        }
      }).then((res) => res).catch((err) => err);
  }

   // media details
  async mediaRequestList(
    draft_request_id,
    site_language,
    media_type,
  ) {
    return await axios
      .post(`/people/people-media-request-list`, {
        draft_request_id: draft_request_id,
        site_language: site_language,
        media_type: media_type,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload media images
  async uploadMediaImages(data) {
    return await axios
      .post(`/people/upload-people-media-image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload background images
  async uploadBackgroundImages(data) {
    return await axios
      .post(`/people/upload-people-background-image`, data)
      .then((res) => res)
      .catch((err) => err);
  }

   // add media details
   async addMediaDetails(data) {
    return await axios.post(`/people/add-people-media-details`, { ...data }).then((res) => res).catch((err) => err);
  }

  // submit all data
  async submitData(draft_relation_id) {
    return await axios.post(`/people/submit-all-save-people`, { draft_relation_id: draft_relation_id }).then((res) => res).catch((err) => err);
  }

}

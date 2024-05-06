//import
import axios from "axios";

export default class AddNewMovieService {
  // title search list
  async getTitleSearchList(type) {
    return await axios
      .get(`/title/title-search-by-list`, { params: { type: type } })
      .then((res) => res)
      .catch((err) => err);
  }

  // search movie title
  async searchMovieTitle(
    title_type,
    search_type,
    search_text,
    sort_by,
    page,
    limit
  ) {
    return await axios
      .post(`/search/search-title-to-add`, {
        title_type: title_type,
        search_type: search_type,
        search_text: search_text,
        sort_by: sort_by,
        page: page,
        limit: limit,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // status list
  async getStatusList(type) {
    return await axios
      .get(`/title/title-status-list`, { params: { type: type } })
      .then((res) => res)
      .catch((err) => err);
  }

  // certification list
  async getCertificationList(type) {
    return await axios
      .get(`/title/certification-list`, { params: { type: type } })
      .then((res) => res)
      .catch((err) => err);
  }

  // title search connection list
  async getConnectionList(search_text, type, page, limit) {
    return await axios
      .get(`/title/title-search-for-connections`, {
        params: { search_text: search_text, search_type: type, page: page, limit: limit },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // ott service provider list
  async getServiceProviderList(site_language, type) {
    return await axios
      .get(`/title/ott-service-provider-list`, {
        params: { site_language: site_language, type: type },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // original work list
  async getOriginalWorkList() {
    return await axios
      .get(`/title/original-work-type-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // country list
  async getCountryList(config) {
    return await axios
      .get(`/country/list`, config)
      .then((res) => res)
      .catch((err) => err);
  }

  // add primary details
  async addPrimaryDetails(data) {
    return await axios
      .post(`/title/add-movie-primary-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // credit search list
  async creditPeopleSearchList(site_language, search_text, page, limit) {
    return await axios
      .post(`/title/credit-people-search-list`, {
        site_language: site_language,
        search_text: search_text,
        page: page,
        limit: limit
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // credit job title list
  async creditJobTitleList(site_language) {
    return await axios
      .get(`/title/job-title-list`, {
        params: { site_language: site_language },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // add credit details
  async addCreditDetails(data) {
    return await axios
      .post(`/title/add-credit-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  //  credit request list
  async creditRequestList(
    draft_request_id,
    site_language,
    title_type,
    credit_type,
    season_id
  ) {
    return await axios
      .post(`/title/cast-crew-request-list`, {
        draft_request_id: draft_request_id,
        site_language: site_language,
        title_type: title_type,
        credit_type: credit_type,
        season_id: season_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // add media details
  // async addMediaDetails(data) {
  //   return await axios
  //     .post(`/title/add-media-details`, { ...data })
  //     .then((res) => res)
  //     .catch((err) => err);
  // }

  // create new credit
  async createNewCredit(data) {
    return await axios.post(`/title/create-new-credit`, data).then((res) => res).catch((err) => err);
  }

  // add media details
  async addMediaDetails(data) {
    return await axios.post(`/title/add-media-details`, { ...data }).then((res) => res).catch((err) => err);
  }
  // upload media images
  async uploadMediaImages(data) {
    return await axios
      .post(`/title/upload-image`, data, {
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
      .post(`/title/upload-background-image`, data)
      .then((res) => res)
      .catch((err) => err);
  }

  // media details
  async mediaRequestList(
    draft_request_id,
    site_language,
    title_type,
    media_type,
    season_id
  ) {
    return await axios
      .post(`/title/media-request-list`, {
        draft_request_id: draft_request_id,
        site_language: site_language,
        title_type: title_type,
        media_type: media_type,
        season_id: season_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload poster images
  async uploadPosterImages(data) {
    return await axios
      .post(`/title/upload-poster-image`, data)
      .then((res) => res)
      .catch((err) => err);
  }

  // upload poster images
  async uploadPosterImages(data) {
    return await axios.post(`/title/upload-poster-image`, data).then((res) => res).catch((err) => err);
  }

  // get primary details
  async getPrimaryDetails(draft_request_id, language, tmdb_id, kobis_id) {
    return await axios.get(`/title/get-movie-primary-details`,
      {
        params: {
          site_language: language,
          request_id: draft_request_id,
          tmdb_id: tmdb_id,
          kobis_id: kobis_id
        }
      }).then((res) => res).catch((err) => err);
  }
  // tag category list
  async tagCategories(language, type) {
    return await axios
      .get(`/tag/title/main-category-list`, { params: { language: language, type: type } })
      .then((res) => res)
      .catch((err) => err);
  }

  // tag details
  async getTagDetails(draft_request_id, site_language) {
    return await axios.post(`/title/tag-request-list`, { draft_request_id: draft_request_id, site_language: site_language }).then((res) => res).catch((err) => err);
  }

  // get sub category list
  async getSubcategoryList(cat_id, language) {
    return await axios.get(`/tag/title/sub-category-list/${cat_id}`, { params: { language: language } }).then((res) => res).catch((err) => err);
  }

  // get tag search list
  async getTagSearchList(main_catid, sub_catid, language, search_text) {
    return await axios.get(`/tag/title/tag-search/${main_catid}/${sub_catid}`, { params: { language: language, search_text: search_text } }).then((res) => res).catch((err) => err);
  }

  // save tag details
  async saveTag(data) {
    return await axios.post(`/title/save-tag-details`, { ...data }).then((res) => res).catch((err) => err);
  }

  // submit all data
  async submitData(draft_relation_id) {
    return await axios.post(`/title/submit-all-save-title`, { draft_relation_id: draft_relation_id }).then((res) => res).catch((err) => err);
  }
}

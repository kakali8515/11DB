//import
import axios from "axios";

export default class EditMovieService {
  //get edit movie primary details
  async getEditMoviePrimaryDetails(
    title_id,
    request_id,
    site_language,
    tmdb_id,
    kobis_id
  ) {
    return await axios
      .get(`/title/edit/get-movie-primary-details`, {
        params: {
          title_id: title_id,
          request_id: request_id,
          site_language: site_language,
          tmdb_id: tmdb_id,
          kobis_id: kobis_id,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //get tmdb edit movie primary details
  async getEditTmdbMoviePrimaryDetails(
    title_id,
    site_language,
    tmdb_id,
    title_type
  ) {
    return await axios
      .get(`/title/tmdb-refresh/get-primary-details`, {
        params: {
          title_id: title_id,
          site_language: site_language,
          tmdb_id: tmdb_id,
          title_type: title_type,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit movie primary details
  async editMoviePrimaryDetails(data) {
    return await axios
      .post(`/title/edit/movie-primary-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }
  // tag details
  async getTagDetails(draft_request_id, site_language, title_id) {
    return await axios
      .post(`/title/edit/tag-request-list`, {
        title_id: title_id,
        draft_request_id: draft_request_id,
        site_language: site_language,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // save tag details
  async saveTag(data) {
    return await axios
      .post(`/title/edit/save-tag-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  async uploadMediaImages(data, id) {
    return await axios
      .post(`/title/edit/upload-image`, data, {
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
      .post(`/title/edit/upload-background-image`, data, {
        headers: {
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // upload poster images
  async uploadPosterImages(data, id) {
    return await axios
      .post(`/title/edit/upload-poster-image`, data, {
        headers: {
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //  credit request list
  async creditRequestList(
    title_id,
    draft_request_id,
    title_type,
    site_language,
    credit_type,
    season_id,
    draft_season_id
  ) {
    return await axios
      .post(`/title/edit/cast-crew-request-list`, {
        title_id: title_id,
        draft_request_id: draft_request_id,
        title_type: title_type,
        site_language: site_language,
        credit_type: credit_type,
        season_id: season_id,
        draft_season_id: draft_season_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //tmdb  credit request list
  async creditTmdbRequestList(
    title_id,
    title_type,
    site_language,
    credit_type,
    season_id,
    season_no,
    tmdb_id
  ) {
    return await axios
      .post(`/title/tmdb-refresh/get-credit-details`, {
        title_id: title_id,
        title_type: title_type,
        site_language: site_language,
        credit_type: credit_type,
        season_id: season_id,
        season_no: season_no,
        tmdb_id: tmdb_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit credit details
  async editCreditDetails(data) {
    return await axios
      .post(`/title/edit/credit-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // create new credit
  async createNewCredit(data, id) {
    return await axios
      .post(`/title/edit/create-new-credit`, data, {
        headers: {
          "x-formdata-id": id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit media request list
  async editMediaRequestList(
    title_id,
    draft_request_id,
    site_language,
    title_type,
    media_type,
    season_id,
    draft_season_id
  ) {
    return await axios
      .post(`/title/edit/media-request-list`, {
        title_id: title_id,
        draft_request_id: draft_request_id,
        site_language: site_language,
        title_type: title_type,
        media_type: media_type,
        season_id: season_id,
        draft_season_id: draft_season_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit tmdb media request list
  async editTmdbMediaRequestList(
    title_id,
    site_language,
    title_type,
    media_type,
    season_id,
    season_no,
    tmdb_id
  ) {
    return await axios
      .post(`/title/tmdb-refresh/get-media-details`, {
        title_id: title_id,
        site_language: site_language,
        title_type: title_type,
        media_type: media_type,
        season_id: season_id,
        season_no: season_no,
        tmdb_id: tmdb_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit media details
  async editMediaDetails(data) {
    return await axios
      .post(`/title/edit/media-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // submit all data
  async submitData(draft_relation_id, title_id, title_type) {
    return await axios
      .post(`/title/edit/submit-all-save-title`, {
        draft_relation_id: draft_relation_id,
        title_id: title_id,
        title_type: title_type,
      })
      .then((res) => res)
      .catch((err) => err);
  }
}

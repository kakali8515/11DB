//import
import axios from "axios";

export default class EditTVService {

  // season list
  async getSeasonList(title_id, language, draft_request_id) {
    return await axios
      .post(`/title/edit/season-request-list`, {
        title_id: title_id,
        draft_request_id: draft_request_id,
        site_language: language
      }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  // tmdb season list
  async getTmdbSeasonList(title_id, tmdb_id, language) {
    return await axios
      .post(`/title/tmdb-refresh/season-list`, {
        title_id: title_id,
        tmdb_id: tmdb_id,
        site_language: language
      }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  //get edit tv primary details
  async getEditTVPrimaryDetails(
    title_id,
    request_id,
    site_language,
    tmdb_id
  ) {
    return await axios
      .get(`/title/edit/get-tv-primary-details`, {
        params: {
          title_id: title_id,
          request_id: request_id,
          site_language: site_language,
          tmdb_id: tmdb_id
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // edit tv primary details
  async editTVPrimaryDetails(data) {
    return await axios
      .post(`/title/edit/tv-primary-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  //get edit tv season details
  async getEditTVSeasonDetails(
    title_id,
    season_id,
    draft_request_id,
    draft_season_id,
    language
  ) {
    return await axios
      .get(`/title/edit/get-tv-request-season-details`, {
        params: {
          title_id: title_id,
          season_id: season_id,
          draft_request_id: draft_request_id,
          draft_season_id: draft_season_id,
          language: language
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //get tmdb edit tv season details
  async getEditTmdbTVSeasonDetails(
    title_id,
    season_id,
    season_no,
    tmdb_id,
    language,
  ) {
    return await axios
      .get(`/title/tmdb-refresh/get-season-details`, {
        params: {
          title_id: title_id,
          season_id: season_id,
          season_no: season_no,
          tmdb_id: tmdb_id,
          language: language
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // submit season details
  async editSeasonDeatils(data, id) {
    return await axios.post(`/title/edit/season-details`, data, {
      headers: {
        "x-formdata-id": id
      },
    }).then((res) => res).catch((err) => err);
  }

  //episode season list
  async getEditSeasonList(title_id, draft_request_id, site_language) {
    return await axios
      .post(`/title/edit/season-list`, {
        title_id: title_id,
        draft_request_id: draft_request_id,
        site_language: site_language,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // search edit episodes
  async searchEditEpisodes(data) {
    return await axios.post(`/title/edit/episode-request-list`, { ...data }).then((res) => res).catch((err) => err);
  }

  // tmdb episode list
  async tmdbEpisodeList(data) {
    return await axios.post(`/title/tmdb-refresh/episode-list`, { ...data }).then((res) => res).catch((err) => err);
  }

  // edit save episode details
  async editEpisodeDetails(data, id) {
    return await axios.post(`/title/edit/edit-episode-details`, data, {
      headers: {
        "x-formdata-id": id
      },
    }).then((res) => res).catch((err) => err);
  }

  // save edit  episode list  details
  async saveEditEpisode(data) {
    return await axios.post(`/title/edit/save-episode-details`, { ...data }).then((res) => res).catch((err) => err);
  }

  // get edit episode details
  async getEditEpisodeDetails(language, request_id, episode_id, episode_no, title_id, season_id, draft_season_id, draft_episode_id) {
    return await axios.get(`/title/edit/get-tv-request-episode-details/`, {
      params: {
        language: language,
        request_id: request_id,
        episode_id: episode_id,
        episode_number: episode_no,
        title_id: title_id,
        season_id: season_id,
        draft_season_id: draft_season_id,
        draft_episode_id: draft_episode_id
      }
    }
    ).then((res) => res).catch((err) => err);
  }

  // get tmdb episode details
  async getTmdbEpisodeDetails(episode_id, episode_number, title_id, season_id, season_no, tmdb_id, language) {
    return await axios.get(`/title/tmdb-refresh/get-episode-details/`, {
      params: {
        language: language,
        tmdb_id: tmdb_id,
        episode_id: episode_id,
        episode_number: episode_number,
        title_id: title_id,
        season_id: season_id,
        season_no: season_no
      }
    }
    ).then((res) => res).catch((err) => err);
  }

}

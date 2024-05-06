import axios from "axios";

export default class AddNewTVService {
  // title search list
  async getSeasonDetails(id, language) {
    return await axios
      .post(`/title/season-request-list`, {
        draft_request_id: id,
        site_language: language,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // add primary details
  async addPrimaryDetails(data) {
    return await axios
      .post(`/title/add-tv-primary-details`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  }

  // get primary details
  async getPrimaryDetails(draft_request_id, language, tmdb_id) {
    return await axios
      .get(`/title/get-tv-primary-details`, {
        params: { site_language: language, request_id: draft_request_id, tmdb_id: tmdb_id },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // get season no list on media tab
  async getSeasonList(id, language, type) {
    return await axios
      .post(`/title/episode/season-list`, { draft_request_id: id, site_language: language, type: type })
      .then((res) => res)
      .catch((err) => err);
  }

  //get season deatails

  async seasonDetails(language, req_id, season_id, tmdb_id, season_no) {
    return await axios
      .get(`/title/get-tv-request-season-details/${req_id}?language=${language}&season_id=${season_id}&tmdb_id=${tmdb_id}&season_no=${season_no}`)
      .then((res) => res)
      .catch((err) => err);
  }

  // get season ott list
  async getSeasonOTTList(lang, type) {
    return await axios
      .get(`/title/ott-service-provider-list?site_language=${lang}&type=${type}`)
      .then((res) => res)
      .catch((err) => err);
  }

  // get channel list
  async getChannelList() {
    return await axios
      .get(`/title/tv-network-list`)
      .then((res) => res)
      .catch((err) => err);
  }


  // submit season details
  async addSeasonDeatils(data) {
    return await axios.post(`/title/add-season-details`, data).then((res) => res).catch((err) => err);
  }

  // search connections
  async searchConnections(data) {
    return await axios.get(`/title/title-search-for-connections`, { params: { ...data } }).then((res) => res).catch((err) => err);
  }


  // search episodes
  async searchEpisodes(data) {
    return await axios.post(`/title/episode-request-list`, { ...data }).then((res) => res).catch((err) => err);
  }


  // save episode list  details
  async saveEpisode(data) {
    return await axios.post(`/title/save-episode-details`, { ...data }).then((res) => res).catch((err) => err);
  }

  // get episode details
  async getEpisodeDetails(language, req_id, episode_id, episode_no, tmdb_id, season_no) {
    return await axios.get(`/title/get-tv-request-episode-details/${req_id}?language=${language}&episode_id=${episode_id}&episode_number=${episode_no}&tmdb_id=${tmdb_id}&season_no=${season_no}`).then((res) => res).catch((err) => err);
  }


  // add episode details
  async addEpisodeDetails(data) {
    return await axios.post(`/title/add-episode-details`, data).then((res) => res).catch((err) => err);
  }

}

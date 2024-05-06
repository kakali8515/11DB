import axios from 'axios';

export default {
   async getTVShowsDetails(tvid){
      return await axios.get(`/title/tv/details/${tvid}`)
      .then((res) => res)
      .catch((err) => err);
   },
   async getSeasonDetails(tvid,seasonid){
      return await axios.get(`/title/tv/season/details/${tvid}/${seasonid}`)
      .then((res) => res)
      .catch((err) => err);

   },
   async getCategoryList(tvid) {
      return await axios.get(`/title/details/tag-category-list/${tvid}`)
      .then((res) => res)
      .catch((err) => err);
   },
   async getTVConnectionList(id) {
      return await axios.get(`/title/details/connection-list/${id}`)
      .then((res) => res)
      .catch((err) => err);
   },
   async getTVRecommendationList(id) {
      return await axios.get(`/title/details/recommendation-list/${id}`)
      .then((res) => res)
      .catch((err) => err);
   },
   async getPopularTVList(data) {
      return await axios.post(`/list/popular-tv-shows`, { ...data }).
      then((res) => res)
      .catch((err) => err);
   },
   async getTVTagList(id) {
      return await axios.get(`/title/details/tag-category-list/${id}`)
      .then((res) => res).
      catch((err) => err);
   },
   async getTVTagListByCategory(id, main_catid) {
      return await axios.get(`/title/details/tag-list/${id}/${main_catid}`)
      .then((res) => res)
      .catch((err) => err);
   },

   async getEpisodeDetails(id, season_id) {
      return await axios
      .get(`/season/tv/season-episode-details/${id}?season_id=${season_id}`,)
      .then((res) => res)
      .catch((err) => err);
   }, 
   async getCastDetails(data) {
      return await axios
      .post(`/title/tv/cast-crew-details`, {...data})
      .then((res) => res)
      .catch((err) => err);
   },
 
   async getMediaDetails(data) {
      return await axios
      .post(`/media/season/tv/media-details`, {...data})
      .then((res) => res)
      .catch((err) => err);
   },
   async getNewestTVShowsList(data) {
      return await axios
      .post(`/list/newest-tv-shows`, {...data})
      .then((res) => res)
      .catch((err) => err);
   },
   async getUpcomingTVshows(data) {
      return await axios
      .post(`/list/upcoming-tv-shows`, {...data})
      .then((res) => res)
      .catch((err) => err);
   },
   async getTopRatedTVshows(data) {
      return await axios
      .post(`/list/top-rated-tv-shows`, {...data})
      .then((res) => res)
      .catch((err) => err);
   },
}
import axios from 'axios';

export default {

   // get popular webtoon
   async getPopularWebtoon(data) {
      return await axios.post(`/list/popular-webtoons`, { ...data }).
         then((res) => res)
         .catch((err) => err);
   },
   // get newest webtoon
   async getNewestWebtoon(data) {
      return await axios
         .post(`/list/newest-webtoons`, { ...data })
         .then((res) => res)
         .catch((err) => err);
   },
   // get ongoing webtoon
   async getOngoingWebtoon(data) {
      return await axios
         .post(`/list/ongoing-webtoons`, { ...data })
         .then((res) => res)
         .catch((err) => err);
   },
   // get completed webtoon
   async getCompletedWebtton(data) {
      return await axios
         .post(`/list/completed-webtoons`, { ...data })
         .then((res) => res)
         .catch((err) => err);
   },

   // get webtoon details
   async getWebtoonDetails(id) {
      return await axios.get(`/title/webtoons/details/${id}`)
         .then((res) => res)
         .catch((err) => err);
   },
   // get webtoon season details
   async getSeasonDetails(id, seasonid) {
      return await axios.get(`/title/webtoons/season/details/${id}/${seasonid}`)
         .then((res) => res)
         .catch((err) => err);

   },

   // get webtoon episode details list
   async getEpisodeDetails(id, season_id) {
      return await axios
         .get(`/season/webtoons/season-episode-details-list/${id}?season_id=${season_id}`,)
         .then((res) => res)
         .catch((err) => err);
   },

   async getCastDetails(data) {
      return await axios
         .post(`/title/webtoons/character-crew-details`, { ...data })
         .then((res) => res)
         .catch((err) => err);
   },

   async getMediaDetails(data) {
      return await axios
         .post(`/media/season/webtoons/media-details`, { ...data })
         .then((res) => res)
         .catch((err) => err);
   },

}
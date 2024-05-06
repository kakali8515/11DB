import axios from 'axios';

export default {
   async getMediaDetails(data) {
      return axios.post(`media/details`, { ...data });
   },

   async getCastDetails(data) {
      return await axios.post(`title/cast-crew-details`, { ...data });
   },

   // get movie details
   async getMovieDetails(id) {
      return await axios.get(`/title/movie/details/${id}`).then((res) => res).catch((err) => err);
   },

   // get movie connection list
   async getMovieConnectionList(id) {
      return await axios.get(`/title/details/connection-list/${id}`).then((res) => res).catch((err) => err);
   },

   // get movie series list
   async getMovieSeriesList(id) {
      return await axios.get(`/title/details/series-list/${id}`).then((res) => res).catch((err) => err);
   },

   // get movie recommendation list
   async getMovieRecommendationList(id) {
      return await axios.get(`/title/details/recommendation-list/${id}`).then((res) => res).catch((err) => err);
   },

   // get movie tag category list
   async getMovieTagList(id) {
      return await axios.get(`/title/details/tag-category-list/${id}`).then((res) => res).catch((err) => err);
   },

   // get movie tag  list
   async getMovieTagListByCategory(id, main_catid) {
      return await axios.get(`/title/details/tag-list/${id}/${main_catid}`).then((res) => res).catch((err) => err);
   },

   // get popular movie  list
   async getPopularMovie(data) {
      return await axios.post(`/list/popular-movies`, { ...data }).then((res) => res).catch((err) => err);
   },

   // get movie genre list
   async getGenreList() {
      return await axios.get(`/list/genre-list`).then((res) => res).catch((err) => err);
   },

   // add favorite
   async addToFavorite(id, type) {
      return await axios.post(`/user/add-favourite`, { id: id, type: type }).then((res) => res).catch((err) => err);
   },

   //add shared
   async addToShare(id, type, shared_channel) {
      return await axios.post(`/user/shared`, { shared_id: id, type: type, shared_channel: shared_channel }).then((res) => res).catch((err) => err);
   },

   // add rating
   async addRating(id, type, rating) {
      return await axios.post(`/user/add-rating`, { id: id, type: type, rating: rating }).then((res) => res).catch((err) => err);
   },

   // get newest movie  list
   async getNewestMovie(data) {
      return await axios.post(`/list/newest-movies`, { ...data }).then((res) => res).catch((err) => err);
   },

   // get newest movie  list
   async getNewestMovie(data) {
      return await axios.post(`/list/newest-movies`, { ...data }).then((res) => res).catch((err) => err);
   },

   // get upcoming movie  list
   async getUpcomingMovie(data) {
      return await axios.post(`/list/upcoming-movies`, { ...data }).then((res) => res).catch((err) => err);
   },

   // get top rated movie  list
   async getTopRatedMovie(data) {
      return await axios.post(`/list/top-rated-movies`, { ...data }).then((res) => res).catch((err) => err);
   },

   // user activity
   async userLog(id, type, user_session_id) {
      return await axios.post(`/user-activity`, { id: id, type: type, user_session_id: user_session_id }).then((res) => res).catch((err) => err);
   },

   //tag search list
   async getFilterTagSearchList(category_id, subcategory_id, search_text) {
      return await axios
         .get(`/tag/title/filter/tag-search`, { params: { category_id: category_id, subcategory_id: subcategory_id, search_text: search_text } })
         .then((res) => res)
         .catch((err) => err);
   }
}
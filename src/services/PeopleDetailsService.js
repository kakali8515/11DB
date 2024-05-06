import axios from "axios";

export default {
  // get popular people  list
  async getPopularPeople(data) {
    return await axios
      .post(`/people/popular-people`, { ...data })
      .then((res) => res)
      .catch((err) => err);
  },

  // get people details
  async getPeopleDetails(id) {
    return await axios
      .get(`/people/details/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  // get people related articles
  async getRelatedArticles(id, page, limit) {
    return await axios
      .get(`people/related-articles`, {
        params: { person_id: id, page: page, limit: limit },
      })
      .then((res) => res)
      .catch((err) => err);
  },

  // get people mdeia details
  async getMediaDetails(data) {
    return axios.post(`people/media`, { ...data });
  },

  // get people known for list
  async getKnownForList(id) {
    return await axios
      .get(`people/known-for/list?person_id=${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  // get people worklist
  async getWorkList(data) {
    return await axios.post(`people/work-list`,{ ...data })
    .then((res)=>res)
    .catch((err)=>err);
  }
};

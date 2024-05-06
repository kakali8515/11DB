import axios from 'axios';

export default {
   async getNewsManagerList(data) {
      return axios.post(`admin/news/news-list`, { ...data });
   },
   async newsManagerUpdateStatus(data) {
      return axios.post(`admin/news/news-status`, { ...data });
   },
}
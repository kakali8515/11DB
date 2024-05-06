import axios from "axios";

export default {

    //update page view statistics
    async statisticDataUpdate(data) {
        return await axios.post(`/analytics/embed/statistics`, data).then((res) => res).catch((err) => err);
    },

    //search log update
    async searchLogUpdate(data) {
        return await axios.post(`/analytics/embed/search-statistics`, data).then((res) => res).catch((err) => err);
    },

    //page view
    async pageView(data) {
        return await axios.post(`/admin/analytics/statistics/page/view`, data).then((res) => res).catch((err) => err);
    },

    //search view
    async searchView(data) {
        return await axios.post(`/admin/analytics/statistics/page/search`, data).then((res) => res).catch((err) => err);
    },

    //time spen on each page view
    async timeSpentByPage(data) {
        return await axios.post(`/admin/analytics/statistics/page/view/by-session`, data).then((res) => res).catch((err) => err);
    },

    //page view download
    async downloadPageViewReport(data) {
        return await axios.post(`/admin/analytics/statistics/page/view/download`, data).then((res) => res).catch((err) => err);
    },

    //time spent page view download
    async downloadTimeSpentReport(data) {
        return await axios.post(`/admin/analytics/statistics/page/view/by-session/download`, data).then((res) => res).catch((err) => err);
    },

    //search data download
    async downloadSearchDataReport(data) {
        return await axios.post(`/admin/analytics/statistics/page/search/download`, data).then((res) => res).catch((err) => err);
    },
}

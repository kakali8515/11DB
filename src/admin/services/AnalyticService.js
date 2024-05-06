import axios from "axios";

export default {

    /** category list */
    async categoryList(section) {
        return await axios
            .get(`/admin/analytics/category-list/`, {
                params: {
                    section: section
                }
            })
            .then((res) => res)
            .catch((err) => err);
    },

    /** db content list */
    async dbContentList(data) {
        return await axios
            .get(`/admin/analytics/db-content`, {
                params: {
                    ...data
                }
            })
            .then((res) => res)
            .catch((err) => err);
    },

    /** download db content list */
    async downloadDBContent(data) {
        return await axios
            .get(`/admin/analytics/export/db-content/download`, {
                params: {
                    ...data
                }
            })
            .then((res) => res)
            .catch((err) => err);
    },

    /** community list */
    async communityList(data) {
        return await axios
            .post(`/admin/analytics/community/report/list`, data)
            .then((res) => res)
            .catch((err) => err);
    },

    /** download community list */
    async downloadCommunityReport(data) {
        return await axios
            .post(`/admin/analytics/export/community/report/download`, data)
            .then((res) => res)
            .catch((err) => err);
    },

    /** user feedback list */
    async userFeedbackList(data) {
        return await axios
            .post(`/admin/analytics/user/feedback/report/list`, data)
            .then((res) => res)
            .catch((err) => err);
    },

    /** download user feedback */
    async downloadUserFeedbackReport(data) {
        return await axios
            .post(`/admin/analytics/export/user/feedback/report/download`, data)
            .then((res) => res)
            .catch((err) => err);
    },

}
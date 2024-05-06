import axios from "axios";

export default {

    // get all award list
    async getAllAwardList(data) {
        return await axios
            .get(`/list/awards`, { params: { ...data } })
            .then((res) => res)
            .catch((err) => err);
    },

    // get award details
    async getAwardDetails(id) {
        return await axios.get(`/awards/details/${id}`).then((res) => res).catch((err) => err);
    },

    // get all award nominee list
    async getNomineeList(data) {
        return await axios
            .get(`/awards/nominee-details`, { params: { ...data } })
            .then((res) => res)
            .catch((err) => err);
    },

    // get award details
    async getDetailPageAwardList(id, type) {
        return await axios.get(`/awards/${type}/details/${id}`).then((res) => res).catch((err) => err);
    },
}

import axios from "axios";

export default {

    // get all video list
    async getPopularList(data) {
        return await axios
            .get(`/list/videos`, { params: { ...data } })
            .then((res) => res)
            .catch((err) => err);
    },

    //update view
    async updateVideoView(data, ip) {
        return await axios.post(`/user/update-view`, { ...data }, { headers: { 'client-ip': ip } }).then((res) => res).catch((err) => err);
    },

    // get ip address
    async getIpaddr() {
        return await axios.get(`https://freeipapi.com/api/json`)
            .then((res) => res)
            .catch((err) => err)
    }
}

//import
import axios from "axios";

export default class CommunityService {
    // community list
    async getCommunityList(data) {
        return await axios
            .post(`/community/community-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    // famous line list
    async getFamousLineList(id,type) {
        return await axios
            .post(`/community/community-famous-lines`, { id: id, type: type })
            .then((res) => res)
            .catch((err) => err);
    }

     // send message
     async sendMessage(data) {
        return await axios
            .post(`/community/community-message-send`, data)
            .then((res) => res)
            .catch((err) => err);
    }

     // reply message
     async sendReply(data) {
        return await axios
            .post(`/community/community-message-reply`, data)
            .then((res) => res)
            .catch((err) => err);
    }

       // reply message
       async getCommunityLikes(id) {
        return await axios
            .post(`/community/community-like`, {community_id : id})
            .then((res) => res)
            .catch((err) => err);
    }

}
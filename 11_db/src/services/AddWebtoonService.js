import axios from "axios";

export default class AddWebtoonService {

    // add webtoon primary details
    async addWebtoonPrimaryDetails(data) {
        return await axios
            .post(`/title/add-webtoons-primary-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    // get weekdays
    async getWebtoonWeekdays() {
        return await axios
            .get(`/title/weekdays-list`)
            .then((res) => res)
            .catch((err) => err);
    }

    // get primary details
    async getPrimaryDetails(request_id, language) {
        return await axios.get(`/title/get-webtoons-primary-details`,
            {
                params: {
                    site_language: language,
                    request_id: request_id,
                }
            }).then((res) => res).catch((err) => err);
    }

    // season request list
    async getSeasonDetails(draft_request_id, language) {
        return await axios
            .get(`/title/webtoons-season-request-list`, {
                params: {
                    site_language: language,
                    draft_request_id: draft_request_id,
                }
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // add season details
    async addSeasonDeatils(data) {
        return await axios.post(`/title/webtoons-add-season-details`, data).then((res) => res).catch((err) => err);
    }


    //get season deatails
    async seasonDetails(language, req_id, season_id) {
        return await axios
            .get(`/title/get-webtoons-request-season-details/${req_id}?language=${language}&season_id=${season_id}`)
            .then((res) => res)
            .catch((err) => err);
    }

    // media list
    async mediaRequestList(draft_request_id, site_language, media_type, season_id) {
        return await axios
            .post(`/title/webtoons-media-request-list`, {
                draft_request_id: draft_request_id,
                site_language: site_language,
                media_type: media_type,
                season_id: season_id,
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // add media details
    async addMediaDetails(data) {
        return await axios.post(`/title/webtoons-add-media-details`, { ...data }).then((res) => res).catch((err) => err);
    }

    // search and get episodes
    async getEpisodesList(data) {
        return await axios.post(`/title/webtoons-episode-request-list`, { ...data }).then((res) => res).catch((err) => err);
    }

    // save episode list  details
    async saveEpisode(data) {
        return await axios.post(`/title/webtoons-save-episode-details`, { ...data }).then((res) => res).catch((err) => err);
    }

    // get episode details
    async getEpisodeDetails(language, req_id, episode_id, episode_no) {
        return await axios.get(`/title/get-webtoons-request-episode-details/${req_id}?language=${language}&episode_id=${episode_id}&episode_number=${episode_no}`).then((res) => res).catch((err) => err);
    }

    //  credit request list
    async creditRequestList(
        draft_request_id,
        site_language,
        credit_type,
        season_id
    ) {
        return await axios
            .post(`/title/webtoons-cast-crew-request-list`, {
                draft_request_id: draft_request_id,
                site_language: site_language,
                credit_type: credit_type,
                season_id: season_id,
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // add credit details
    async addCreditDetails(data) {
        return await axios
            .post(`/title/webtoons-add-credit-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    // create new character
    async createNewCredit(data) {
        return await axios.post(`/title/webtoons-create-new-character`, data).then((res) => res).catch((err) => err);
    }

    //get edit webtoon primary details
    async getEditWebtoonPrimaryDetails(
        title_id,
        request_id,
        site_language
    ) {
        return await axios
            .get(`/title/edit/get-webtoons-primary-details`, {
                params: {
                    title_id: title_id,
                    request_id: request_id,
                    site_language: site_language
                },
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // save edit webtoon primary details
    async editWebtoonPrimaryDetails(data) {
        return await axios
            .post(`/title/edit/webtoons-primary-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    // season list
    async getSeasonList(title_id, language, draft_request_id) {
        return await axios
            .post(`/title/edit/season-request-list`, {
                title_id: title_id,
                draft_request_id: draft_request_id,
                site_language: language
            }
            )
            .then((res) => res)
            .catch((err) => err);
    }

    //get edit webtoon season details
    async getEditWebttonSeasonDetails(
        title_id,
        season_id,
        draft_request_id,
        draft_season_id,
        language
    ) {
        return await axios
            .get(`/title/edit/get-webtoons-request-season-details`, {
                params: {
                    title_id: title_id,
                    season_id: season_id,
                    draft_request_id: draft_request_id,
                    draft_season_id: draft_season_id,
                    language: language
                },
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // submit season details
    async editSeasonDeatils(data, id) {
        return await axios.post(`/title/edit/webtoons-season-details`, data, {
            headers: {
                "x-formdata-id": id
            },
        }).then((res) => res).catch((err) => err);
    }

    // webtoon edit episode list
    async editWebtoonReqList(data) {
        return await axios.post(`/title/edit/webtoons-episode-request-list`, { ...data }).then((res) => res).catch((err) => err);
    }

    // save edit  episode list  details
    async saveEditEpisode(data) {
        return await axios.post(`/title/edit/webtoons-save-episode-details`, { ...data }).then((res) => res).catch((err) => err);
    }


    // get edit episode details
    async getEditEpisodeDetails(language, request_id, episode_id, episode_no, title_id, season_id, draft_season_id, draft_episode_id) {
        return await axios.get(`/title/edit/get-webtoons-request-episode-details/`, {
            params: {
                language: language,
                request_id: request_id,
                episode_id: episode_id,
                episode_number: episode_no,
                title_id: title_id,
                season_id: season_id,
                draft_season_id: draft_season_id,
                draft_episode_id: draft_episode_id
            }
        }
        ).then((res) => res).catch((err) => err);
    }

    // edit media request list
    async editMediaRequestList(
        title_id,
        draft_request_id,
        site_language,
        media_type,
        season_id,
        draft_season_id,
        season_no
    ) {
        return await axios
            .post(`/title/edit/webtoons-media-request-list`, {
                title_id: title_id,
                draft_request_id: draft_request_id,
                site_language: site_language,
                media_type: media_type,
                season_id: season_id,
                draft_season_id: draft_season_id,
                season_no: season_no
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // edit media details
    async editMediaDetails(data) {
        return await axios
            .post(`/title/edit/webtoons-media-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    //  credit request list
    async editCreditRequestList(
        title_id,
        draft_request_id,
        site_language,
        credit_type,
        season_id,
        draft_season_id
    ) {
        return await axios
            .post(`/title/edit/webtoons-cast-crew-request-list`, {
                title_id: title_id,
                draft_request_id: draft_request_id,
                site_language: site_language,
                credit_type: credit_type,
                season_id: season_id,
                draft_season_id: draft_season_id,
            })
            .then((res) => res)
            .catch((err) => err);
    }

    // edit credit details
    async editCreditDetails(data) {
        return await axios
            .post(`/title/edit/webtoons-credit-details`, { ...data })
            .then((res) => res)
            .catch((err) => err);
    }

    // create new character in edit
    async editCreateNewCredit(data, id) {
        return await axios.post(`/title/edit/webtoons-create-new-character`, data, {
            headers: {
                "x-formdata-id": id
            },
        }).then((res) => res).catch((err) => err);
    }


}

//import
import axios from "axios";

export default class HomePageService {

    // home page list
    // async homePageList(date) {
    //     return await axios
    //         .get(`/home/list`, { params: { date: date } })
    //         .then((res) => res)
    //         .catch((err) => err);
    // }


    //top news
    async homePageTopNews(date) {
        return await axios
            .get(`/home/top-news`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //trendings-hottest-videos-upcomings
    // async homePageTrending(date) {
    //     return await axios
    //         .get(`/home/trendings-hottest-videos-upcomings`, { params: { date: date } })
    //         .then((res) => res)
    //         .catch((err) => err);
    // }

    //latest-trailer-real-time-feeds-popular-new-release
    // async homePageLatestTrailer(date) {
    //     return await axios
    //         .get(`/home/latest-trailer-real-time-feeds-popular-new-release`, { params: { date: date } })
    //         .then((res) => res)
    //         .catch((err) => err);
    // }

    // trendings
    async homePageTrending(date) {
        return await axios
            .get(`/home/trendings`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    // hot-videos
    async homePageHotVideos(date) {
        return await axios
            .get(`/home/hot-videos`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    // comingSoon
    async homePageComingSoon(date) {
        return await axios
            .get(`/home/upcomings`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //latest-trailer
    async homePageLatestTrailer(date) {
        return await axios
            .get(`/home/latest-trailers`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //real-time-feeds
    async homePageRealTimeFeeds(date) {
        return await axios
            .get(`/home/real-time-feeds`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //popular-shows
    async homePagePopularshows(date) {
        return await axios
            .get(`/home/popular-shows`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //new-releases
    async homePageNewRelease(date) {
        return await axios
            .get(`/home/new-releases`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

    //born-today
    async homePageBornToday(date) {
        return await axios
            .get(`/home/born-today`, { params: { date: date } })
            .then((res) => res)
            .catch((err) => err);
    }

}
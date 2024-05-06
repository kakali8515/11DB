import{R as a}from"./index.d6ed331f.js";const n={async getTVShowsDetails(e){return await a.get(`/title/tv/details/${e}`).then(t=>t).catch(t=>t)},async getSeasonDetails(e,t){return await a.get(`/title/tv/season/details/${e}/${t}`).then(s=>s).catch(s=>s)},async getCategoryList(e){return await a.get(`/title/details/tag-category-list/${e}`).then(t=>t).catch(t=>t)},async getTVConnectionList(e){return await a.get(`/title/details/connection-list/${e}`).then(t=>t).catch(t=>t)},async getTVRecommendationList(e){return await a.get(`/title/details/recommendation-list/${e}`).then(t=>t).catch(t=>t)},async getPopularTVList(e){return await a.post("/list/popular-tv-shows",{...e}).then(t=>t).catch(t=>t)},async getTVTagList(e){return await a.get(`/title/details/tag-category-list/${e}`).then(t=>t).catch(t=>t)},async getTVTagListByCategory(e,t){return await a.get(`/title/details/tag-list/${e}/${t}`).then(s=>s).catch(s=>s)},async getEpisodeDetails(e,t){return await a.get(`/season/tv/season-episode-details/${e}?season_id=${t}`).then(s=>s).catch(s=>s)},async getCastDetails(e){return await a.post("/title/tv/cast-crew-details",{...e}).then(t=>t).catch(t=>t)},async getMediaDetails(e){return await a.post("/media/season/tv/media-details",{...e}).then(t=>t).catch(t=>t)},async getNewestTVShowsList(e){return await a.post("/list/newest-tv-shows",{...e}).then(t=>t).catch(t=>t)},async getUpcomingTVshows(e){return await a.post("/list/upcoming-tv-shows",{...e}).then(t=>t).catch(t=>t)},async getTopRatedTVshows(e){return await a.post("/list/top-rated-tv-shows",{...e}).then(t=>t).catch(t=>t)}};export{n as T};

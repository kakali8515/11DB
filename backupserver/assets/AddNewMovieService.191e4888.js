import{R as i}from"./index.ace3f588.js";class h{async getTitleSearchList(e){return await i.get("/title/title-search-by-list",{params:{type:e}}).then(t=>t).catch(t=>t)}async searchMovieTitle(e,t,a,r,s,c){return await i.post("/search/search-title-to-add",{title_type:e,search_type:t,search_text:a,sort_by:r,page:s,limit:c}).then(n=>n).catch(n=>n)}async getStatusList(e){return await i.get("/title/title-status-list",{params:{type:e}}).then(t=>t).catch(t=>t)}async getCertificationList(e){return await i.get("/title/certification-list",{params:{type:e}}).then(t=>t).catch(t=>t)}async getConnectionList(e,t){return await i.get("/title/title-search-for-connections",{params:{search_text:e,search_type:t}}).then(a=>a).catch(a=>a)}async getServiceProviderList(e,t){return await i.get("/title/ott-service-provider-list",{params:{site_language:e,type:t}}).then(a=>a).catch(a=>a)}async getOriginalWorkList(){return await i.get("/title/original-work-type-list").then(e=>e).catch(e=>e)}async getCountryList(e){return await i.get("/country/list",e).then(t=>t).catch(t=>t)}async addPrimaryDetails(e){return await i.post("/title/add-movie-primary-details",{...e}).then(t=>t).catch(t=>t)}async creditPeopleSearchList(e,t){return await i.post("/title/credit-people-search-list",{site_language:e,search_text:t}).then(a=>a).catch(a=>a)}async creditJobTitleList(e){return await i.get("/title/job-title-list",{params:{site_language:e}}).then(t=>t).catch(t=>t)}async addCreditDetails(e){return await i.post("/title/add-credit-details",{...e}).then(t=>t).catch(t=>t)}async creditRequestList(e,t,a,r,s){return await i.post("/title/cast-crew-request-list",{draft_request_id:e,site_language:t,title_type:a,credit_type:r,season_id:s}).then(c=>c).catch(c=>c)}async createNewCredit(e){return await i.post("/title/create-new-credit",e).then(t=>t).catch(t=>t)}async addMediaDetails(e){return await i.post("/title/add-media-details",{...e}).then(t=>t).catch(t=>t)}async uploadMediaImages(e){return await i.post("/title/upload-image",e,{headers:{"Content-Type":"multipart/form-data"}}).then(t=>t).catch(t=>t)}async uploadBackgroundImages(e){return await i.post("/title/upload-background-image",e).then(t=>t).catch(t=>t)}async mediaRequestList(e,t,a,r,s){return await i.post("/title/media-request-list",{draft_request_id:e,site_language:t,title_type:a,media_type:r,season_id:s}).then(c=>c).catch(c=>c)}async uploadPosterImages(e){return await i.post("/title/upload-poster-image",e).then(t=>t).catch(t=>t)}async uploadPosterImages(e){return await i.post("/title/upload-poster-image",e).then(t=>t).catch(t=>t)}async getPrimaryDetails(e,t,a,r){return await i.get("/title/get-movie-primary-details",{params:{site_language:t,request_id:e,tmdb_id:a,kobis_id:r}}).then(s=>s).catch(s=>s)}async tagCategories(e,t){return await i.get("/tag/title/main-category-list",{params:{language:e,type:t}}).then(a=>a).catch(a=>a)}async getTagDetails(e,t){return await i.post("/title/tag-request-list",{draft_request_id:e,site_language:t}).then(a=>a).catch(a=>a)}async getSubcategoryList(e,t){return await i.get(`/tag/title/sub-category-list/${e}`,{params:{language:t}}).then(a=>a).catch(a=>a)}async getTagSearchList(e,t,a,r){return await i.get(`/tag/title/tag-search/${e}/${t}`,{params:{language:a,search_text:r}}).then(s=>s).catch(s=>s)}async saveTag(e){return await i.post("/title/save-tag-details",{...e}).then(t=>t).catch(t=>t)}async submitData(e){return await i.post("/title/submit-all-save-title",{draft_relation_id:e}).then(t=>t).catch(t=>t)}}export{h as A};

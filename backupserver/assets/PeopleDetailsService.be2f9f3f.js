import{R as a}from"./index.904f3d07.js";const s={async getPopularPeople(t){return await a.post("/people/popular-people",{...t}).then(e=>e).catch(e=>e)},async getPeopleDetails(t){return await a.get(`/people/details/${t}`).then(e=>e).catch(e=>e)},async getRelatedArticles(t,e,o){return await a.get("people/related-articles",{params:{person_id:t,page:e,limit:o}}).then(p=>p).catch(p=>p)},async getMediaDetails(t){return a.post("people/media",{...t})},async getKnownForList(t){return await a.get(`people/known-for/list?person_id=${t}`).then(e=>e).catch(e=>e)},async getWorkList(t){return await a.post("people/work-list",{...t}).then(e=>e).catch(e=>e)}};export{s as P};

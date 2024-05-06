//import 
import axios from 'axios';

export default class SearchResultService {

    // search
    async getSearchSuggetions(searchText, page, limit) {
        return await axios.get(`/search/search-suggestion`, { params: { search_text: searchText, page: page, limit: limit } })
            .then((res) => res)
            .catch((err) => err)
    }
    // search result
    async getSearchResult(search_text, sort_by, sort_order, search_type, page, limit, is_first) {
        return await axios.post(`/search/search-results`,
            {
                search_text: search_text,
                sort_by: sort_by,
                sort_order: sort_order,
                search_type: search_type,
                page: page,
                limit: limit,
                is_first: is_first
            }).then((res) => res).catch((err) => err);
    }
    // tag details
    async getTagDetails(tag_id, type, page, limit) {
        return await axios.post(`/search/tag-details`, { tag_id, type, page, limit })
            .then((res) => res)
            .catch((err) => err)
    }
    // company details
    async getCompanyDetails(company_id, type, page, limit) {
        return await axios.post(`/search/company-details`, { company_id, type, page, limit })
            .then((res) => res)
            .catch((err) => err)
    }
}
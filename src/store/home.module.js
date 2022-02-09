import axios from "axios";
import {
    TMDB_API,
    TMDB_API_KEY
} from "@/common/config";
import {
    POPULAR_MOVIES,
    LOAD_MORE_MOVIES,
    SEARCH_QUERY,
    MOVIE_DETAIL,
    SORT_BY_MOVIES
} from "./actions.type";
import {
    SET_POPULAR_MOVIES,
    SET_LOAD_MORE_MOVIES,
    SET_SEARCH_QUERY,
    SET_MOVIE_DETAIL,
    SET_CAST,
    SET_CATEGORY
} from "./mutations.type";

const state = {
    popularMovies: [],
    loadMoreMovies: [],
    cast: [],
    movieDetail: [],
    category: "",
    query: ''
};

const getters = {
    getPopularMovies: state => state.popularMovies,
    getLoadMoreMovies: state => state.loadMoreMovies,
    getCast: state => state.cast,
    getMovieDetail: state => state.movieDetail,
    getCategory: state => state.category,
    getQuery: state => state.query
};
const actions = {
    [POPULAR_MOVIES](context) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=1`
                ).then(resp => {
                    context.commit(SET_POPULAR_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    [LOAD_MORE_MOVIES](context, credentials) {
        const categories = credentials?.category ? 'movie' : credentials?.category
        const genres = credentials?.category === 'movie' ? 'movie' : 'popular'
        const query = credentials?.category === 'search' ? `&query=${credentials.query}` : ''
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}${categories}/${genres}?api_key=${TMDB_API_KEY}&language=tr-Tr&page=${credentials.page}${query}`
                ).then(resp => {
                    context.commit(SET_LOAD_MORE_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    [SEARCH_QUERY](context, credentials) {
        return new Promise((resolve, reject) => {
            axios.get(`${TMDB_API}search/movie?api_key=${TMDB_API_KEY}&language=tr-TR&query=${credentials}&page=1&include_adult=false`)
                .then(resp => {
                    context.commit(SET_POPULAR_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    [SORT_BY_MOVIES](context, credentials) {
        return new Promise((resolve, reject) => {
            axios.get(`${TMDB_API}discover/movie?api_key=${TMDB_API_KEY}&language=tr-TR&sort_by=${credentials}&page=1&include_adult=false`)
                .then(resp => {
                    context.commit(SET_POPULAR_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    [MOVIE_DETAIL](context, credentials) {
        axios.get(`${TMDB_API}movie/${credentials.id}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1&append_to_response=similar,changes, credits, images, keywords, lists, releases, reviews, translations, videos`).then(resp => {
            if (resp.status === 200) {
                context.commit(SET_MOVIE_DETAIL, resp?.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
        axios.get(`${TMDB_API}movie/${credentials.id}/credits?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(resp => {
            if (resp.status === 200) {
                context.commit(SET_CAST, resp.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
};

const mutations = {
    [SET_POPULAR_MOVIES](state, item) {
        state.popularMovies = item
    },
    [SET_LOAD_MORE_MOVIES](state, item) {
        state.loadMoreMovies = item
    },
    [SET_SEARCH_QUERY](state, item) {
        state.popularMovies = item
    },
    [SET_MOVIE_DETAIL](state, item) {
        state.movieDetail = item
    },
    [SET_CATEGORY](state, item) {
        console.log('item', item)
        state.category = item.category
        state.query = item.query
    },
    [SET_CAST](state, item) {
        item.cast.map(y => {
            if (y.known_for_department === "Acting") {
                state.cast.push(y.name)
            }
        });
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
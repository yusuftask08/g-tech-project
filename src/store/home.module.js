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
    SET_SORT_BY_MOVIES
} from "./mutations.type";
import axios from "axios";

const state = {
    popularMovies: [],
    loadMoreMovies: [],
    cast: [],
    movieDetail: [],
};

const getters = {
    getPopularMovies: state => state.popularMovies,
    getLoadMoreMovies: state => state.loadMoreMovies,
    getCast: state => state.cast,
    getMovieDetail: state => state.movieDetail,
};

const actions = {
    [POPULAR_MOVIES](context) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=1}`
                ).then(resp => {
                    context.commit(SET_POPULAR_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
                })
        })
    },
    [LOAD_MORE_MOVIES](context, credentials) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=${credentials.page}`
                ).then(resp => {
                    context.commit(SET_LOAD_MORE_MOVIES, resp?.data?.results)
                    resolve(resp)
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
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
                .catch(error => {
                    reject(error)
                    console.log(error)
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
                .catch(error => {
                    reject(error)
                    console.log(error)
                })
        })
    },
    [MOVIE_DETAIL](context, credentials) {
        axios.get(`${TMDB_API}movie/${credentials.id}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1&append_to_response=similar,changes, credits, images, keywords, lists, releases, reviews, translations, videos`).then(_ => {
            if (_.status === 200) {
                console.log('_', _);
                context.commit(SET_MOVIE_DETAIL, _?.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
        axios.get(`${TMDB_API}movie/${credentials.id}/credits?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                console.log('_ cast', _);
                context.commit(SET_CAST, _.data)
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
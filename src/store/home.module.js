import {
    TMDB_API,
    TMDB_API_KEY
} from "@/common/config";
import {
    POPULAR_MOVIES,
    LOAD_MORE_MOVIES,
    SEARCH_QUERY
} from "./actions.type";
import {
    SET_POPULAR_MOVIES,
    SET_LOAD_MORE_MOVIES,
    SET_SEARCH_QUERY
} from "./mutations.type";
import axios from "axios";

const state = {
    popularMovies: [],
    loadMoreMovies: [],
};

const getters = {
    getPopularMovies: state => state.popularMovies,
    getLoadMoreMovies: state => state.loadMoreMovies,
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
};

export default {
    state,
    actions,
    mutations,
    getters
};
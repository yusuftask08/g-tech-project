import {
    TMDB_API,
    TMDB_API_KEY
} from "@/common/config";
import {
    POPULAR_MOVIES,
    POPULAR_MOVIES_PAGINATION
} from "./actions.type";
import {
    SET_POPULAR_MOVIES,
    SET_POPULAR_MOVIES_PAGINATION
} from "./mutations.type";
import axios from "axios";

const state = {
    popularMovies: [],
    popularMoviesPagination: [],
};

const getters = {
    getPopularMovies: state => state.popularMovies,
    getPopularMoviesPagination: state => state.popularMoviesPagination,
};

const actions = {
    [POPULAR_MOVIES](context) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=1}`
                ).then(resp => {
                    resolve(resp)
                    context.commit(SET_POPULAR_MOVIES, resp?.data?.results)
                    context.commit(SET_POPULAR_MOVIES_PAGINATION, resp?.data?.results)
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
                })
        })
    },
    [POPULAR_MOVIES_PAGINATION](context, credentials) {
        const page = credentials?.page ? credentials?.page : 1
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=${page}}`
                ).then(resp => {
                    resolve(resp)
                    context.commit(SET_POPULAR_MOVIES_PAGINATION, resp?.data)
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
    [SET_POPULAR_MOVIES_PAGINATION](state, item) {
        state.popularMoviesPagination = item
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
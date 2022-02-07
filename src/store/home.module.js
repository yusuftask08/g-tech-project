import {
    TMDB_API,
    TMDB_API_KEY
} from "@/common/config";
import {
    POPULAR_MOVIES,
} from "./actions.type";
import {
    SET_POPULAR_MOVIES,
} from "./mutations.type";
import axios from "axios";

const state = {
    popMovies: [],
};

const getters = {
    getPopularMovies(state) {
        return state.popMovies
    },
};

const actions = {
    [POPULAR_MOVIES](context) {
        axios.get(`${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=1`).then(_ => {
            if (_.status === 200) {
                console.log('_.data.results', _.data.results);
                context.commit(SET_POPULAR_MOVIES, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        })
    },
};

const mutations = {
    [SET_POPULAR_MOVIES](state, item) {
        state.popMovies = item;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
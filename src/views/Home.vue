<template>
  <div class="mx-10">
    <search />
    <card :data="popularMovieList" />
  </div>
</template>

<script>
import Search from "../components/Search/index.vue";
import Card from "../components/Card/index.vue";
import { POPULAR_MOVIES } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Search,
    Card,
  },
  methods: {
    init() {
      this.$store.dispatch(POPULAR_MOVIES);
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      popularMovieList: "getPopularMovies",
    }),
  },
};
</script>

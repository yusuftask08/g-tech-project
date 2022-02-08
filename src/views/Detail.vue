<template>
  <div>
    <detail-content :movieInfo="movieDetail" :cast="cast" />
  </div>
</template>

<script>
import DetailContent from "../components/DetailContent/index";
import { MOVIE_DETAIL } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  components: {
    DetailContent,
  },
  methods: {
    getDetail() {
      const id = this.$route.params.id;
      this.$store.dispatch(MOVIE_DETAIL, {
        id: id,
      });
    },
  },
  created() {
    this.getDetail();
  },
  computed: {
    ...mapGetters({
      cast: "getCast",
      movieDetail: "getMovieDetail",
    }),
  },
};
</script>

<style>
</style>
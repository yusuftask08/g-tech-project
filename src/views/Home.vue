<template>
  <div class="mx-10">
    <search />
    <card :data="moreItems" />
    <Observer @intersect="intersected" />
  </div>
</template>

<script>
import Search from "../components/Search/index.vue";
import Card from "../components/Card/index.vue";
import Observer from "../components/Observer/index.vue";
import {
  POPULAR_MOVIES,
  POPULAR_MOVIES_PAGINATION,
} from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Search,
    Card,
    Observer,
  },
  data() {
    return {
      page: 1,
      isLoadingMore: null,
      moreItems: [],
    };
  },
  methods: {
    async intersected() {
      this.page++;
      await this.$store
        .dispatch(POPULAR_MOVIES_PAGINATION, {
          page: this.page,
        })
        .then(
          () => {
            setTimeout(() => {
              if (this.$store.getters.getPopularMoviesPagination.results) {
                this.moreItems.push(
                  ...this.$store.getters.getPopularMoviesPagination.results
                );
              }
              this.isLoadingMore = false;
            }, 400);
          },
          (error) => {
            console.log(error);
            this.isLoadingMore = false;
          }
        );
    },
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
      popularMoviePaginationList: "getPopularMoviesPagination",
    }),
  },
};
</script>
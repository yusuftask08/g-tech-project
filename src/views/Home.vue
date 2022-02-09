<template>
  <div class="mx-10 wrapper">
    <search />
    <card :data="popularMovieList" />
    <div class="d-flex justify-center align-center mb-15">
      <v-progress-circular
        v-if="isLoadingMore"
        :size="80"
        color="primary"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
import Search from "../components/Search/index.vue";
import Card from "../components/Card/index.vue";
import { LOAD_MORE_MOVIES, POPULAR_MOVIES } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Search,
    Card,
  },
  data() {
    return {
      page: 1,
      moreItems: [],
      bottom: false,
      isLoadingMore: false,
    };
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    init() {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
      this.$store.dispatch(POPULAR_MOVIES);
    },
    async loadMore() {
      this.page++;
      this.isLoadingMore = true;
      await this.$store
        .dispatch(LOAD_MORE_MOVIES, {
          page: this.page,
        })
        .then(() => {
          setTimeout(() => {
            if (this.$store.getters.getLoadMoreMovies) {
              this.popularMovieList.push(
                ...this.$store.getters.getLoadMoreMovies
              );
            }
            this.isLoadingMore = false;
          }, 1000);
        });
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.loadMore();
      }
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      popularMovieList: "getPopularMovies",
      loadMoreMovies: "getLoadMoreMovies",
    }),
  },
};
</script>




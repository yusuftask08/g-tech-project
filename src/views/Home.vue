<template>
  <div class="mx-10 wrapper">
    <search />
    <card :data="popularMovieList" />
    <div v-if="goToUp" class="d-flex mr-auto ml-auto align-center mb-15">
      <router-link to="" @click.native="scrollToTop">
        <v-btn fab dark fixed bottom right color="primary">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </router-link>
    </div>
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
      goToUp: false,
      bottom: false,
      isLoadingMore: false,
      scrollY: 0,
      visible: 0,
    };
  },
  methods: {
    bottomVisible() {
      this.scrollY = window.scrollY;
      this.goToUp = this.scrollY > 0 ? true : false;
      this.visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = this.visible + this.scrollY >= pageHeight;
      return bottomOfPage || pageHeight < this.visible;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    init() {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
      this.$store.dispatch(POPULAR_MOVIES);
    },
    historyScrollPosition() {
      const x = localStorage.getItem("x");
      const y = localStorage.getItem("y");
      window.scrollTo(x, y);
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
  mounted() {
    this.historyScrollPosition();
  },
  computed: {
    ...mapGetters({
      popularMovieList: "getPopularMovies",
      loadMoreMovies: "getLoadMoreMovies",
    }),
  },
  beforeDestroy() {
    localStorage.setItem("y", this.scrollY);
    localStorage.setItem("x", this.visible);
  },
};
</script>






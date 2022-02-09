<template>
  <div>
    <v-row class="mx-2">
      <v-card
        class="mx-auto my-8 d-flex flex-column"
        max-width="270"
        v-for="(item, index) in data"
        :key="index.id"
      >
        <v-img
          min-height="250"
          :src="'http://image.tmdb.org/t/p/original/' + item.backdrop_path"
        />

        <v-card-title>
          <span class="movie-title">
            {{ item.title ? item.title : item.name }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex align-items-center">
            <v-icon> mdi-star-outline</v-icon>
            <span class="ml-3 my-1 font-weight-bold">
              {{ item.vote_count ? item.vote_count : "veri yok" }}
            </span>
          </div>
          <div class="d-flex align-items-center">
            <v-icon> mdi-calendar</v-icon>
            <span class="ml-3 my-1 font-weight-bold">
              {{ item.release_date ? item.release_date : "veri yok" }}
            </span>
          </div>
          <div class="d-flex align-items-center">
            <v-icon> mdi-thumb-up-outline</v-icon>
            <span class="ml-3 my-1 font-weight-bold">
              {{ item.popularity ? item.popularity : "veri yok" }}</span
            >
          </div>
        </v-card-text>
        <v-spacer />
        <div class="ml-auto my-2">
          <v-btn class="mx-2" color="primary" @click="movieDetailPage(item)">
            {{ $t("Detail") }}
          </v-btn>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    };
  },
  methods: {
    movieDetailPage(e) {
      this.$router.push(`/detail/${e?.id}`);
    },
  },
};
</script>
<style lang="sass" >
.movie-title
  font-size: 1.2rem !important
</style>
<template>
  <div class="d-flex mt-5">
    <v-col cols="10" class="mt-15 ml-15 d-flex">
      <v-img
        max-height="110%"
        max-width="50%"
        :src="'http://image.tmdb.org/t/p/original/' + movieInfo.backdrop_path"
      />
      <div class="d-flex flex-column ml-10">
        <span class="title text-h4 d-flex mb-4">
          {{ movieInfo.title ? movieInfo.title : movieInfo.name }}
        </span>
        <div class="release-date">
          <span class="text-h6 mt-1"> Yayınlanma Tarihi </span>
          <p>
            {{ movieInfo.release_date ? movieInfo.release_date : "Veri yok" }}
          </p>
        </div>
        <div class="genres">
          <span class="text-h6">Tür</span>
          <div class="d-flex">
            <p class="" v-for="item in movieInfo.genres" :key="item.id">
              {{ item.name ? item.name : "veri yok" }}
            </p>
          </div>
        </div>
        <div class="overview">
          <span class="text-h6">Genel Bakış</span>
          <p class="mt-2">
            {{ movieInfo.overview ? movieInfo.overview : "veri yok " }}
          </p>
        </div>
        <div class="cast-list">
          <span class="text-h6">Oyuncu listesi</span>
          <p class="mt-2">
            {{
              cast.toString().length > 50
                ? cast.toString().substr(0, 400) + "..."
                : "veri yok"
            }}
          </p>
        </div>
      </div>
    </v-col>
    <v-col cols="1" class="mt-15">
      <v-icon
        class="back-icon"
        large
        color="green darken-2"
        @click="backToHomePage"
      >
        mdi-arrow-left
      </v-icon>
      Geri dön
    </v-col>
  </div>
</template>

<script>
export default {
  props: ["cast", "movieInfo"],
  methods: {
    backToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="sass">
.icon-back
  cursor: pointer
.route-link a
  text-decoration: none!important
</style>
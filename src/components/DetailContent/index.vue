<template>
  <div class="detail-container">
    <v-row justify="end">
      <div class="back-button my-10" @click="backToHomePage">
        <v-icon class="back-icon" large color="green darken-2">
          mdi-arrow-left
        </v-icon>
        {{ $t("Homepage") }}
      </div>
    </v-row>
    <div class="ml-10 d-flex movie-detail">
      <v-img
        max-height="100%"
        max-width="50%"
        :src="'http://image.tmdb.org/t/p/original/' + movieInfo.backdrop_path"
      />
      <div class="d-flex flex-column ml-10 content">
        <span class="title d-flex mb-4">
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
            <p class="ml-1" v-for="item in movieInfo.genres" :key="item.id">
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["cast", "movieInfo"],
  methods: {
    backToHomePage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="sass">
.back-button
  margin-right: 50px
  cursor: pointer

@media only screen and (max-width: 670px)
  .detail-container
    display: flex
    flex-direction: column !important
    justify-content: center
    align-items: center

  .back-button
    margin-bottom: 40px
    display: flex
    align-items: center
    font-size: 18px
    margin-left: 250px

  .content
    margin-right: 40px !important
    display: flex
    flex-direction: column !important

    img
      width: 200px !important

  .movie-detail
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
    width: 100%
    margin-right: 40px !important

    .title
      justify-content: center
      display: flex
      font-size: 18px !important
</style>

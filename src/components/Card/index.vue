<template>
  <div>
    <v-row>
      <v-card
        class="mx-auto my-8 d-flex flex-column"
        max-width="250"
        v-for="item in data"
        :key="item.id"
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
          <div class="text-h6">{{ item.release_date }}</div>
        </v-card-text>
        <v-spacer />
        <div class="ml-auto my-2">
          <v-btn class="mx-2" color="primary" @click="movieDetailPage(item)">
            Detay
          </v-btn>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    movieDetailPage(e) {
      this.$router.push(`detail/${e?.id}`);
    },
  },
};
</script>
<style lang="sass" >
.movie-title
  font-size: 1.1rem !important
</style>
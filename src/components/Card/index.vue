<template>
  <div>
    <v-row>
      <v-card
        class="mx-auto my-8 row"
        max-width="300"
        v-for="n in 10"
        :key="n.id"
      >
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        <v-card-title>Spiderman</v-card-title>
        <v-card-text>
          <div class="text-h6">28.02.2020</div>
        </v-card-text>
        <v-spacer />
        <div class="ml-auto my-2">
          <v-btn class="mx-2" color="primary" @click="movieDetailPage">
            Detay
          </v-btn>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    movieDetailPage() {
      this.$router.push("/detail");
    },
  },
};
</script>
<template>
  <div class="d-flex mt-5">
    <v-col cols="9">
      <v-text-field
        v-model="query"
        outlined
        @keydown.enter="sendQuery"
        label="Film Ara"
        prepend-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col cols="3">
      <v-select :items="items" width="100" filled label="Sırala" dense />
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
      items: [
        "Azalan Popülerlik",
        "Artan Popülerlik",
        "Artan Oylar",
        "Azalan Yayınlanma Tarihi",
      ],
    };
  },
  methods: {
    sendQuery() {
      // this.store.dispatch('')
      this.query = "";
    },
  },
};
</script>

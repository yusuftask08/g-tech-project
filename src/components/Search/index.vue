<template>
  <v-col cols="12" class="mt-5">
    <v-text-field
      v-model="query"
      outlined
      @keydown.enter="sendQuery"
      label="Film Ara"
      prepend-inner-icon="mdi-magnify"
    />
  </v-col>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
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

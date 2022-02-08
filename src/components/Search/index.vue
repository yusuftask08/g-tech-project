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
      <v-select
        v-model="selectSortBy"
        :items="items"
        width="100"
        item-text="name"
        item-value="value"
        label="Sırala"
        outlined
        @change="sendSortBy"
      />
    </v-col>
  </div>
</template>

<script>
import { SEARCH_QUERY, SORT_BY_MOVIES } from "@/store/actions.type";
export default {
  name: "Search",
  data() {
    return {
      selectSortBy: "",
      query: "",
      items: [
        { name: "Azalan Popülerlik", value: "popularity.desc" },
        { name: "Artan Popülerlik", value: "popularity.asc" },
        { name: "Artan Oylar", value: "vote_count.asc" },
        { name: "Azalan Oylar", value: "vote_count.desc" },
      ],
    };
  },
  methods: {
    sendQuery() {
      this.$store.dispatch(SEARCH_QUERY, this.query);
    },
    sendSortBy() {
      this.$store.dispatch(SORT_BY_MOVIES, this.selectSortBy);
    },
  },
};
</script>

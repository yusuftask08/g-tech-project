<template>
  <div class="d-flex mt-5 search-container">
    <v-col cols="7">
      <v-text-field
        v-model="query"
        outlined
        @keydown.enter="sendQuery"
        :label="$t('Search movies')"
        prepend-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        v-model="selectSortBy"
        :items="[
          {
            name: $t(`Popularity Descending`),
            value: `popularity.desc`,
          },
          {
            name: $t(`Popularity Ascending`),
            value: `popularity.asc`,
          },
          { name: $t(`Rating Descending`), value: `vote_count.desc` },
          { name: $t(`Rating Ascending`), value: `vote_count.asc` },
        ]"
        width="100"
        item-text="name"
        item-value="value"
        :label="$t('Sort by')"
        outlined
        @change="sendSortBy"
      />
    </v-col>
    <v-col cols="2">
      <v-select
        :items="langItem"
        width="100"
        item-value="value"
        item-text="name"
        v-model="lang"
        :label="$t('Language')"
        @change="setLang"
        outlined
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
      lang: localStorage.getItem("lang"),
      query: "",
      langItem: [
        { name: "TR", value: "tr" },
        { name: "EN", value: "en" },
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
    setLang() {
      localStorage.setItem("lang", this.lang);
      this.$i18n.locale = this.lang;
    },
  },
};
</script>
<style lang="sass">
@media only screen and (max-width: 670px)
  .search-container
    display: flex
    flex-direction: column !important
    justify-content: center
    align-items: center

  .col-7
    margin-top: 40px
    max-width: 100%!important

  .col-3
    max-width: 100%!important

  .col-2
    max-width: 100%!important

  .v-input__control
    margin-top: -40px
</style>


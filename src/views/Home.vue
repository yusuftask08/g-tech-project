<template>
  <div class="mx-10">
    <search />
    <card />
  </div>
</template>

<script>
import Search from "../components/Search/index.vue";
import Card from "../components/Card/index.vue";

export default {
  name: "Home",
  components: {
    Search,
    Card,
  },
};
</script>

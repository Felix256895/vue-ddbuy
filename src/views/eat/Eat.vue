<template>
  <div class="eatContainer">
    <v-search></v-search>
    <today-menu></today-menu>
  </div>
</template>
<script>
import VSearch from "./search";
import TodayMenu from "./todayMenu";
export default {
  name: "Eat",
  components: {
    VSearch,
    TodayMenu
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.eatContainer
  background-color: #f5f5f5
</style>

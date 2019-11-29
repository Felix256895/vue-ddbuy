<template>
  <div>
    dashboard
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped></style>

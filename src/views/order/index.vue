<template>
  <div class="order">
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.router-slider-enter-active,
.router-slider-leave-active
  transition: all 0.3s

.router-slider-enter,
.router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
</style>

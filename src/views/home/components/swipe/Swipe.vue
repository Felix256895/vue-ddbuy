<template>
  <van-swipe :autoplay="3000" indicator-color="#3bba63">
    <van-swipe-item
      v-for="item in swipeList"
      :key="item.public_id"
      :loop="true"
    >
      <img v-lazy="item.icon_url" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "Swipe",
  props: {
    swipeList: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.van-swipe
  width: 100%
  height: 10rem
  padding-top: 3rem

  img
    width: 100%
    height: 100%
</style>

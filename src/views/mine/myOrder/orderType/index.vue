<template>
  <div class="orderType">
    <div v-if="orderTypeDataArray.lenght > 0"></div>
    <div v-else class="order__noData">
      <img src="../../../../assets/images/mine/noData.jpeg" alt="" />
      <span class="desc">暂时还没有相关订单</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderType",
  props: {
    orderTypeDataArray: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.orderType
  margin-top: 5rem
.order__noData
  display: flex
  width: 100%
  height: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  img
    width: 60%
    height: 60%
  .desc
    font-size: 0.6rem
    color: #999
</style>

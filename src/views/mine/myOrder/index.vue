<template>
  <div class="myOrder">
    <van-nav-bar
      style="heght: 2.5rem"
      title="我的订单"
      left-arrow
      :border="false"
      :fixed="true"
      @click-left="onClickLeft"
    />
    <van-tabs
      v-model="active"
      title-active-color="#28BE57"
      color="#28BE57"
      :border="false"
      :offset-top="50"
      type="line"
      sticky
      swipeable
      animated
    >
      <van-tab v-for="(item, index) in itemsTitle" :key="index">
        <div slot="title">
          <span>{{ item }}</span>
        </div>
        <order-type :orderTypeDataArray="orderTypeDataArray"></order-type>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderType from "./orderType";
export default {
  name: "myOrder",
  components: {
    OrderType
  },
  data() {
    return {
      active: this.$route.params.active,
      itemsTitle: ["全部", "待支付", "待收货", "待评价"],
      orderTypeDataArray: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
<style lang="stylus" scoped>
.myOrder
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #f5f5f5
  z-index: 100
.van-icon
  color: #3bba63
</style>

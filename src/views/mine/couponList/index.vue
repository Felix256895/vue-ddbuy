<template>
  <div class="couponList">
    <van-nav-bar
      title="我的优惠券"
      left-arrow
      :border="false"
      :fixed="true"
      @click-left="onClickLeft"
    />
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
      style="margin-top: 3rem"
    />
  </div>
</template>
<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券",
  startAt: 1549104000,
  endAt: 1614592000,
  valueDesc: "3",
  unitDesc: "元"
};
export default {
  name: "couponList",
  data() {
    return {
      chosenCoupon: -1,
      coupons: [
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "1.5",
          unitDesc: "元"
        },
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "2",
          unitDesc: "元"
        }
      ],
      disabledCoupons: [
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "1.5",
          unitDesc: "元"
        },
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "2",
          unitDesc: "元"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push(coupon);
    }
  }
};
</script>
<style lang="stylus" scoped>
.couponList
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  background-color: #f5f5f5
  z-index: 100
.van-icon
  color: #3bba63
</style>

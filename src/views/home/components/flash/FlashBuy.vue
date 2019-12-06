<template>
  <div class="flash">
    <div class="flash__buy">
      <div class="flash__buy__content">
        <div class="flash__buy__title">限时抢购</div>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.hours }}</span>
            :
            <span class="item">{{ timeData.minutes }}</span>
            :
            <span class="item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <div class="flash__buy__more" @click="handleCLickMore">更多</div>
    </div>
    <flash-food :flashSaleList="flashSaleList"></flash-food>
  </div>
</template>
<script>
import FlashFood from "./FlashFood";
import { Toast } from "vant";
export default {
  name: "FlashBuy",
  components: {
    FlashFood
  },
  props: {
    flashSaleList: {
      type: Array
    }
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000
    };
  },
  methods: {
    handleCLickMore() {
      Toast({
        message: "更多",
        duration: 800
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.flash
  margin-top: 0.625rem
  padding: 1.25rem 0 0.9375rem 0
  background-color: #fff

.flash__buy
  display: flex
  height: 1.5625rem
  margin: 0 0.625rem 0.625rem
  justify-content: space-between
  align-items: center

.flash__buy__content
  display: flex
  height: 1.5625rem
  align-items: center

.flash__buy__title
  padding-left: 0.3125rem
  padding-right: 0.7rem
  border-left: 4px solid #3bba63
  font-size: 1.1875rem

.flash__buy__more
  font-size: 0.8rem
  color: #3bba63

.item
  display: inline-block
  width: 22px
  color: #fff
  font-size: 12px
  text-align: center
  background-color: #000
  border-radius: 2px
</style>

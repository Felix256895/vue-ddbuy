<template>
  <div class="myAddress">
    <van-nav-bar
      title="我的地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
      style="height: 2.5rem"
    ></van-nav-bar>
    <div class="myAddress__noData" v-show="list.length < 1">
      <img src="../../../assets/images/order/noAddress.png" alt="" />
      <span>还没有添加过地址呢,添加一个吧😄</span>
    </div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      style="margin-top: 3rem"
      add-button-text="+ 增加新地址"
    />
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
// import { Toast } from "vant";
// import PubSub from "pubsub-js";
// import { CHOOSE_USER_ADDRESS } from "../../../config/pubsub_type";
export default {
  name: "myAddress",
  data() {
    return {
      chosenAddressId: 0,
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  computed: {
    ...mapState(["shoppingAddress"])
  },
  methods: {
    ...mapMutations(["INIT_USER_SHOPPING_ADDRESS"]),
    onClickLeft() {
      this.$router.back();
    },
    onAdd() {
      this.$router.push({ path: "/order/myAddress/addAddress" });
    },
    onEdit() {},
    onSelect(item) {
      console.log(item);
      console.log(this.shoppingAddress);
      // PubSub.publish(CHOOSE_USER_ADDRESS, item);
      // // 返回到上一个界面
      // this.$router.back();
    }
  },
  mounted() {
    this.INIT_USER_SHOPPING_ADDRESS();
  }
};
</script>
<style lang="stylus" scoped>
.myAddress
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #fff
  z-index: 100
.myAddress__noData
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  img
    width: 40%
    height: 20%
  span
    color: #999
    font-size: 0.6rem
.van-address-list__add
    bottom: 1rem

.van-button--large
  left: 15%
  width: 70%
  border-radius: 2rem
  background-color: #45c763
  border: none
.router-slider-enter-active,
.router-slider-leave-active
  transition: all 0.3s

.router-slider-enter,
.router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
.van-icon
  color: #3bba63
</style>

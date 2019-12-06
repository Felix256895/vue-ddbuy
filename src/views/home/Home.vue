<template>
  <div class="home">
    <div v-if="!isShowLoading">
      <div class="header">
        <v-header></v-header>
        <v-swipe :swipeList="swipeList"></v-swipe>
        <v-tip :home_ad="home_ad"></v-tip>
      </div>
      <v-nav :navList="navList"></v-nav>
      <v-vip></v-vip>
      <flash-buy :flashSaleList="flashSaleList"></flash-buy>
      <special-zone :specialZone="specialZone"></special-zone>
      <tabbar-goods
        :flashSaleList="flashSaleList"
        :tabbarlist="tabbarlist"
      ></tabbar-goods>
      <van-divider>我是有底线的</van-divider>
    </div>
    <v-loading v-if="isShowLoading" />
    <v-top />
    <router-view />
  </div>
</template>
<script>
import VHeader from "./components/header/Header";
import VSwipe from "./components/swipe/Swipe";
import VTip from "./components/tip/Tip";
import VNav from "./components/nav/Nav";
import VVip from "./components/vip/Vip";
import FlashBuy from "./components/flash/FlashBuy";
import SpecialZone from "./components/specialZone/SpecialZone";
import TabbarGoods from "./components/tabbar/TabbarGoodsItem";
import { getHomeData } from "api";
export default {
  name: "Home",
  components: {
    VHeader,
    VSwipe,
    VTip,
    VNav,
    VVip,
    FlashBuy,
    SpecialZone,
    TabbarGoods
  },
  data() {
    return {
      isShowLoading: true,
      swipeList: [],
      navList: [],
      flashSaleList: [],
      tabbarlist: [],
      specialZone: {},
      home_ad: ""
    };
  },
  methods: {
    initData() {
      getHomeData()
        .then(response => {
          console.log(response);
          if (response.success) {
            const data = response.data;
            this.swipeList = data.list[0].icon_list;
            this.navList = data.list[2].icon_list;
            this.flashSaleList = data.list[3].product_list;
            this.tabbarlist = data.list[12].product_list;
            this.isShowLoading = false;
            this.specialZone = data.special_zone;
            this.home_ad = data.home_ad.image_url;
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="stylus" scoped>
.home
  background-color: #f5f5f5
  padding-bottom: 3rem

  .header
    width: 100%
    // margin-top: -3rem
    background-image: url('http://518taole.7-orange.cn/backImage.png')

.van-divider
  background-color: #f5f5f5
  margin: 0
</style>

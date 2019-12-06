<!-- 
*项目根入口 Dashboard.vue
-->
<template>
  <div class="dashboard">
    <van-tabbar
      v-model="active"
      :safe-area-inset-bottom="true"
      active-color="#3bba63"
    >
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        :id="index === 3 ? 'buycar' : ''"
        :info="item.name === 'cart' ? goodsNum : ''"
        @click="tab(index, item.name)"
      >
        <span>{{ item.title }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      active: 0,
      currIndex: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal: require("images/tabbar/home_default.png"),
          active: require("images/tabbar/home_selected.png")
        },
        {
          name: "category",
          title: "分类",
          normal: require("images/tabbar/category_default.png"),
          active: require("images/tabbar/category_selected.png")
        },
        {
          name: "eat",
          title: "吃什么",
          normal: require("images/tabbar/eat_default.png"),
          active: require("images/tabbar/eat_selected.png")
        },
        {
          name: "cart",
          title: "购物车",
          normal: require("images/tabbar/shoppingcart_default.png"),
          active: require("images/tabbar/shoppingcart_selected.png"),
          num: 5
        },
        {
          name: "mine",
          title: "我的",
          normal: require("images/tabbar/mine_default.png"),
          active: require("images/tabbar/mine_selected.png")
        }
      ],
      routerName: {
        hemo: 0,
        category: 1,
        eat: 2,
        cart: 3,
        mine: 4
      }
    };
  },
  computed: {
    ...mapState(["shopCart", "userInfo"]),
    goodsNum() {
      let num = 0;
      Object.values(this.shopCart).forEach(goods => {
        num += goods.num;
      });
      if (num > 0) {
        return num;
      }
      return null;
    }
  },
  created() {
    this.tabbarSelected(this.$route.name);
  },
  watch: {
    $route: {
      handler(val) {
        this.tabbarSelected(val.name);
      }
    }
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART", "INIT_USER_INFO"]),
    tab(index, val) {
      this.currIndex = index;
      this.$router.push(val);
    },
    tabbarSelected(item) {
      this.active = this.routerName[item];
    },
    _initData() {
      this.INIT_SHOP_CART();
      this.INIT_USER_INFO();
    }
  },
  mounted() {
    this._initData();
  }
};
</script>
<style lang="stylus" scoped>
.router-slider-enter-active, .router-slider-leave-active
  transition: all 0.3s
.router-slider-enter, .router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
@keyframes mymove
  0%
    transform: scale(1)
  25%
    transform: scale(0.8)
  50%
    transform: scale(1.1)
  75%
    transform: scale(0.9)
  100%
    transform: scale(1)
.moveToCart
  animation: mymove 0.5s ease-in-out
</style>

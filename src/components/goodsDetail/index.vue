<template>
  <div class="goodsDetail">
    <van-nav-bar
      title="商品详情"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
      style="height: 2.5rem"
    ></van-nav-bar>
    <div class="content">
      <div class="content__goodsImage">
        <img v-lazy="goodsInfo.small_image" alt="" />
      </div>
      <div class="content__flash" v-show="goodsInfo.isFlash">
        <div class="content__flash__left">
          <span class="content__flash__title">限时抢购</span>
          <span class="content__flash__subTitle">抢购中</span>
        </div>
        <div class="content__flash__right">
          <span>距结束</span>
          <van-count-down :time="time" class="countStyle" format="HH mm ss">
            <template v-slot="timeData">
              <span class="content__flash__right__item">{{
                timeData.hours
              }}</span>
              <b class="content__flash__right__colon">:</b>
              <span class="content__flash__right__item">{{
                timeData.minutes
              }}</span>
              <b class="content__flash__right__colon">:</b>
              <span class="content__flash__right__item">{{
                timeData.seconds
              }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="productInfo">
        <div class="productInfo__title">{{ goodsInfo.name }}</div>
        <div class="productInfo__subTitle">{{ goodsInfo.spec }}</div>
        <span class="productInfo__originPrice">{{
          goodsInfo.origin_price | moneyFormat
        }}</span>
        <span class="productInfo__price">{{ goodsInfo.price }}</span>
        <span class="productInfo__totalSales"
          >已售:{{ goodsInfo.total_sales }}</span
        >
        <van-divider />
        <div class="productInfo__shippingInfo">
          <van-icon
            name="cluster-o"
          />此商品按500g/份计价,如实收少于500g将退还差价
        </div>
        <van-divider />
        <div class="productInfo__shippingInfo">
          <van-icon name="clock-o" />最快29分钟内送达
        </div>
      </div>
      <div class="specifications">
        <div class="specificationsTitle">规格</div>
        <van-divider dashed />
        <div class="conditions">
          <span>保存条件</span>
          <span class="conditionsOne">冷藏</span>
        </div>
        <van-divider dashed />
        <div class="conditions">
          <span>保质期</span>
          <span class="conditionsTwo">15天</span>
        </div>
        <van-divider dashed />
      </div>
      <div class="showGoods">
        <img v-lazy="goodsInfo.small_image" alt="" />
        <img v-lazy="goodsImage" alt="" />
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="goodsNum"
          @click="goToCart"
        />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button
          color="#6eeb99"
          type="warning"
          text="加入购物车"
          @click="onClickAddToCar"
        />
        <van-goods-action-button
          color="#3bba63"
          type="danger"
          text="立即购买"
          @click="buyNow"
        />
      </van-goods-action>
    </div>
    <v-top />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "goodsDetail",
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100,
      // 是否是限时抢购
      isFlash: false,
      goodsInfo: this.$route.params,
      goodsImage:
        "https://img.ddimg.mobi/3f280ff77ab3d1571213379189.jpg?width=750&height=1869"
    };
  },
  computed: {
    ...mapState(["shopCart"]),
    goodsNum() {
      let num = 0;
      Object.values(this.shopCart).forEach(goods => {
        num += goods.num;
      });
      if (num > 0) {
        return num;
      }
      return "";
    }
  },
  methods: {
    ...mapMutations(["ADD_TO_CART"]),
    onClickLeft() {
      this.$router.back();
    },
    onClickAddToCar() {
      this.ADD_TO_CART(this.goodsInfo);
    },
    goToCart() {
      this.$router.push("/dashboard/cart");
    },
    buyNow() {
      this.ADD_TO_CART(this.goodsInfo);
      this.$router.push("/dashboard/cart");
    }
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>
<style lang="stylus" scoped>
.goodsDetail
  background-color: #f5f5f5
.content
  margin-top: 2.75rem
  overflow: hidden
  .content__goodsImage
    width: 100%
    img
      width: 100%
      height: 80%
.content__flash
  display: flex
  height: 2rem
  justify-content: space-between
  align-items: center
.content__flash__left
  width: 55%
  height: 100%
  display: flex
  align-items: center
  background-color: #e25450
  color: #fff
  .content__flash__title
    padding-left: 1rem
    font-size: 0.8rem
  .content__flash__subTitle
    padding-left: 0.6rem
    font-size: 0.5rem
.content__flash__right
  flex: 1
  display: flex
  height: 100%
  align-items: center
  background-color: #fcefe9
  color: #e25450
  font-size: 0.5rem
  padding-left: 0.5rem
  .countStyle
    padding-left: 0.5rem
  .content__flash__right__item
    display: inline-block
    width: 22px
    color: #fff
    font-size: 12px
    text-align: center
    background-color: #e25450
    border-radius: 2px
  .content__flash__right__colon
    color: #e25450
    padding: 0 0.2rem
.productInfo
  background-color: #fff
  padding: 0.5rem
  .productInfo__title
    font-size: 0.8rem
    color: #000
    line-height: 1.5rem
  .productInfo__subTitle
    font-size: 0.6rem
    color: grey
    line-height: 1.5rem
  .productInfo__originPrice
    font-size: 0.8rem
    color: #e25450
    padding-right: 0.5rem
  .productInfo__price
    color: grey
    font-size: 0.5rem
    text-decoration: line-through
  .productInfo__totalSales
    float: right
    color: #e25450
    font-size: 0.8rem
.productInfo__shippingInfo
  font-size: 0.8rem
  color: grey
.specifications
  width: 100%
  background-color: #fff
  margin-top: 1rem
  padding-left: 0.5rem
  .specificationsTitle
    font-size: 1rem
    color: #000
    padding-top: 1rem
  .conditions
    font-size: 0.6rem
    color: grey;
    .conditionsOne
      padding-left: 2rem
    .conditionsTwo
      padding-left: 2.5rem
.showGoods
  width: 100%
  img
    width: 100%
.van-icon
  color: #3bba63
</style>

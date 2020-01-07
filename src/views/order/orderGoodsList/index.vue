<template>
  <div class="orderGoodsList">
    <van-nav-bar
      title="商品清单"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
      style="height: 2.5rem"
    ></van-nav-bar>
    <div class="content">
      <div class="content__title">
        <span>商品</span>
        <span>共{{ selectedCount }}件</span>
      </div>
      <ul class="content__list">
        <li
          class="content__list__item"
          v-for="(item, index) in goods"
          :key="index"
        >
          <div class="product__image">
            <img :src="item.smallImage" alt="" />
          </div>
          <div class="product__info">
            <p class="product__info__name">
              {{ item.name }}
            </p>
            <span class="product__info__num"
              >单价:{{ item.price | moneyFormat }}</span
            >
            <span class="product__info__num">数量:{{ item.num }}</span>
          </div>
          <div class="total__price">
            {{ (item.price * item.num) | moneyFormat }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "orderGoodsList",
  data() {
    return {};
  },
  computed: {
    // 从store中取选中的商品信息
    ...mapGetters({
      selectedCount: "SELECTED_GOODS_COUNT",
      goods: "SELECTED_GOODS"
    })
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
<style lang="stylus" scoped>
.orderGoodsList
  position: fixed
  top: 0
  left: 0
  right:0
  bottom: 0
  z-index: 999
  background-color: #f5f5f5
.content
  width: 100%
  margin-top: 3rem
  background-color: #fff
.content__title
  display: flex
  height: 2rem
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #e8e8e8
  padding: 0 1rem
.content__list
  width: 100%
.content__list__item
  display: flex
  width: 100%
  height: 3rem
  flex-direction: row
  align-items: center
  border-bottom: 1px solid #e8e8e8
  .product__image img
    height: 2.5rem
    padding: 0 0.5rem
  .product__info
    flex: 1
    .product__info__name
      font-size: 0.8rem
      line-height: 1.5rem
      padding-right: 0.5rem
      word-break: break-all
      display: -webkit-box
      overflow: hidden
      text-overflow: ellipsis
      -webkit-line-clamp: 1
      -webkit-box-orient: vertical
    .product__info__num
      color: #999
      font-size: 0.6rem
      padding-right: 1rem
  .total__price
    font-size: 0.8rem
    padding-right: 1rem
</style>

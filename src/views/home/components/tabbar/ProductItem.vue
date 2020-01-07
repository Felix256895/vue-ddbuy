<template>
  <div class="product">
    <div
      class="product__item"
      v-for="item in product_list"
      :key="item.id"
      @click.stop="goToGoodsDetail(item)"
    >
      <img v-lazy="item.small_image" alt="" />
      <p class="product__item__title">{{ item.name }}</p>
      <p class="product__item__subtitle">{{ item.spec }}</p>
      <div class="product__item__price">
        <div>
          <span class="price">{{ item.price | moneyFormat }}</span>
          <span class="origin__price">{{
            item.origin_price | moneyFormat
          }}</span>
        </div>
        <div class="buycar" @click="addCart(item)">
          <svg-icon iconClass="car" style="width:1.5rem;height:1.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "productItem",
  props: {
    product_list: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      addCart: "ADD_TO_CART"
    }),
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      this.$router.push({
        name: "goodsDetail",
        params: {
          id: goods.id,
          name: goods.name,
          small_image: goods.small_image,
          price: goods.price,
          spec: goods.spec,
          total_sales: goods.total_sales,
          origin_price: goods.origin_price
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.product
  height: auto
  margin-top: .5rem
  display: flex
  flex-wrap: wrap
  padding-left: 2%
.product__item
  width: 48%
  margin-right: 2%
  margin-bottom: .5rem
  padding-bottom: .6rem
  border-radius: .4rem
  background-color: #fff
  img
    max-width: 100%
    border-radius: .4rem
.product__item__title
  padding-left: .5rem;
  padding-right: .5rem;
  line-height: 1rem;
  font-size: .625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
.product__item__subtitle
  padding-left: .5rem;
  padding-right: .5rem;
  color: #999
  font-size: .45rem
  padding-top: .2rem
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1rem;
.product__item__price
  display: flex
  justify-content: space-between
  align-items: center
  padding-left: .5rem
  padding-right: 1rem
.price
  color: #f37078
  font-size: .9rem
.origin__price
  color: #999
  font-size: .6rem
  text-decoration: line-through
  padding-left: .3rem
</style>

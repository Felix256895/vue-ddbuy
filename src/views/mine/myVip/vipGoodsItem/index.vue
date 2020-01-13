<template>
  <div class="vipGoods">
    <ul class="vipGoods__list">
      <li
        class="vipGoods__list__item"
        v-for="item in vipCateDetail"
        :key="item.id"
        ref="vipGoods__list__item"
      >
        <p class="imgbox">
          <img class="img" v-lazy="item.small_image" alt />
        </p>
        <div class="content">
          <p class="name">{{ item.product_name }}</p>
          <p class="des">{{ item.spec }}</p>
          <p class="originPrice">{{ item.origin_price | moneyFormat }}</p>
          <p class="price">
            {{ item.price | moneyFormat }}
            <van-tag plain mark color="#5fa85f">绿卡价格</van-tag>
          </p>
          <div class="iconCartWrapper">
            <svg-icon
              ref="iconCartWrapper"
              iconClass="car_disable"
              style="width: 1.3rem; height: 1.3rem"
            />
          </div>
        </div>
      </li>
    </ul>
    <div class="bottomTip">更多特权敬请期待...</div>
  </div>
</template>
<script>
export default {
  name: "vipGoodsItem",
  props: {
    vipCateDetail: {
      type: Array
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.vipGoods
  overflow: hidden
  -webkit-transform: translateZ(0)
  transform: translateZ(0)
  padding-bottom: 3rem

.vipGoods__list__item
  display: flex
  padding-bottom: 0.8rem
  padding-top: 0.5rem
  position: relative
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)

  .imgbox
    display: flex
    align-items: center

  .img
    width: 4.0625rem
    height: 4.0625rem
    border-radius: 0.04rem

.content
  margin-left: 0.5rem

  .name
    font-size: 0.8375rem
    color: rgb(7, 17, 27)
    margin-bottom: 0.16rem

  .des
    padding: 0.2rem
    line-height: 0.8rem
    font-size: 0.65rem
    color: rgb(147, 153, 159)
    margin-bottom: 0.16rem
    word-break: break-all
    display: -webkit-box
    overflow: hidden
    text-overflow: ellipsis
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical

  .originPrice
    margin-top: 0.5rem
    font-size: 0.6875rem
    color: #8f8f8f

  .price
    font-size: 0.8rem
    padding-top: 0.3rem
    color: #5fa85f

.iconCartWrapper
  position: absolute
  width: 1.875rem
  top: 3.4rem
  right: 1rem

.icon
  fill: #999
  width: 1rem
  height: 1rem

.iconCart
  display: block
  width: 1.5rem
  height: 1.5rem

.bottomTip
  padding-top: 0.8rem
  color: grey
  font-size: 0.8rem
  text-align: center
</style>

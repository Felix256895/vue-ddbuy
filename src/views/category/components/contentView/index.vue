<template>
  <div class="contentView">
    <div class="contentView__top" ref="contentView__top">
      <ul ref="contentView__topbox" class="contentView__topbox">
        <li
          class="contentView__top__item"
          v-for="(item, index) in categoryDetail"
          :key="item.id"
          :class="{ selected: currentIndex === index }"
          ref="title__item"
          @click="subTitleClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="contentView__menu" v-if="isShowDropMenu" @click="menuClick">
      <svg-icon
        v-if="menuDown"
        iconClass="down"
        style="width:1.5rem;height:1.5rem"
      />
      <svg-icon v-else iconClass="up" style="width:1.5rem;height:1.5rem" />
    </div>
    <drop-menu
      :menuDown="!menuDown"
      :categoryDetail="categoryDetail"
      :currentIndex="currentIndex"
      @itemClick="itemClick"
      @touchClick="menuClick"
    ></drop-menu>
    <section class="contentView__right" ref="contentView__right">
      <div class="contentView__right__box" ref="contentView__right__box">
        <div
          class="contentView__right__container"
          ref="good"
          v-for="(item, index) in categoryDetail"
          :key="index"
        >
          <p class="right__subTitle">{{ item.name }}</p>
          <ul>
            <li
              class="list__item"
              v-for="(val, key) in item.products"
              :key="key"
            >
              <p class="list__item__img">
                <img v-lazy="val.small_image" alt />
              </p>
              <div class="list__item__content">
                <p class="list__item__name">{{ val.product_name }}</p>
                <p class="list__item__spec">{{ val.spec }}</p>
                <div class="list__item__priceBox">
                  <div class="list__item__price">
                    <span class="list__item__currentPrice">
                      {{ val.price | moneyFormat }}
                    </span>
                    <span class="list__item__originPrice">
                      {{ val.origin_price | moneyFormat }}
                    </span>
                  </div>
                  <div class="list__item__cart" @click="addCart(val)">
                    <svg-icon
                      iconClass="car"
                      style="width:1.5rem;height:1.5rem"
                    ></svg-icon>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <van-divider>我是有底线的</van-divider>
      </div>
    </section>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import DropMenu from "../dropMenu";
import { mapMutations, mapState } from "vuex";
export default {
  name: "contentView",
  props: {
    categoryDetail: {
      type: Array
    }
  },
  components: {
    DropMenu
  },
  data() {
    return {
      currentIndex: 0,
      menuDown: true,
      isShowDropMenu: false
    };
  },
  computed: {
    ...mapState([`userInfo`])
  },
  watch: {
    categoryDetail() {
      this.currentIndex = 0;
      this.menuDown = true;
      this.$nextTick(() => {
        this.titleScroll();
        this.productScroll();
        this.showDropMenu();
      });
    }
  },
  methods: {
    ...mapMutations([`ADD_GOODS`, `ADD_TO_CART`]),
    initTitleScroll() {
      let contentViewTitleWidth = 130;
      let el = this.$refs.title__item;
      for (let i = 0; i < el.length; i++) {
        contentViewTitleWidth += el[i].clientWidth;
      }
      this.$refs.contentView__topbox.style.width = contentViewTitleWidth + "px";
      if (!this.titleScroll) {
        this.titleScroll = new BScroll(".contentView__top", {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        });
      } else {
        this.titleScroll.refresh();
      }
    },
    initProductScroll() {
      if (!this.productScroll) {
        this.productScroll = new BScroll(".contentView__right", {
          click: true,
          probeType: 3
        });
      } else {
        this.productScroll.refresh();
        // 2.1 进入默认商品列表滚到顶部
        this.productScroll.scrollToElement(this.$refs.good[0], 10, 0, 0);
      }
    },
    showDropMenu() {
      const contentViewTopWidth = this.$refs.contentView__top.clientWidth;
      const contentViewTitleWidth = this.$refs.contentView__topbox.clientWidth;
      this.isShowDropMenu =
        contentViewTitleWidth > contentViewTopWidth ? true : false;
    },
    subTitleClick(index) {
      this.currentIndex = index;
      this.menuDown = true;
      let el = this.$refs.title__item[index];
      this.titleScroll.scrollToElement(el, 500);
      this.productScroll.scrollToElement(this.$refs.good[index], 10, 0, 0);
    },
    ...mapMutations({
      addCart: `ADD_TO_CART`
    }),
    menuClick() {
      this.menuDown = !this.menuDown;
    },
    itemClick(index) {
      this.currentIndex = index;
      this.subTitleClick(index);
      this.menuDown = false;
    }
    // goToGoodsDetail(goods) {
    //   this.$router.push({
    //     name: "goodsDetail",
    //     // 给商品详情页面传递数据
    //     query: {
    //       id: goods.id,
    //       name: goods.name,
    //       small_image: goods.small_image,
    //       price: goods.price,
    //       spec: goods.spec,
    //       total_sales: goods.total_sales,
    //       origin_price: goods.origin_price
    //     }
    //   });
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.initTitleScroll();
      this.showDropMenu();
      this.initProductScroll();
    });
  }
};
</script>
<style lang="stylus" scoped>
.contentView
  width: 100%
  flex-grow: 1

.contentView__top
  position: fixed
  top: 2.8rem
  width: 100%
  height: 2.5rem
  white-space: nowrap
  border-bottom: 1px solid #e8e9e8
  overflow: hidden
  background-color: #fff
  z-index: 999

.contentView__topbox
  display: flex

  .contentView__top__item
    line-height: 2.5rem
    font-size: 0.73rem
    padding: 0 1rem

    &.selected
      color: #3cb963

.contentView__menu
  position: fixed
  right: 0
  top: 2.8rem
  width: 10%
  height: 2.5rem
  z-index: 1999
  background-color: #fff
  text-align: center

.contentView__right
  position: absolute
  top: 2.6rem
  left: 5.3125rem
  right: 0
  bottom: 0
  -webkit-transform: translateZ(0)
  transform: translateZ(0)

.right__subTitle
  width: 100%
  height: 2rem
  line-height: 2rem
  font-size: 0.75rem
  border-left: 3px solid #d9dde1
  color: rgb(147, 153, 159)
  background-color: #f3f5f7
  padding-left: 1rem

.list__item
  display: flex
  align-items: center
  padding: 0.36rem 0.36rem 1rem
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  background-color: #fff

.list__item__img > img
  width: 4.0625rem
  height: 4.0625rem
  border-radius: 0.04rem

.list__item__content
  width: 100%
  position: relative
  margin-left: 0.2rem

.list__item__name
  font-size: 0.8375rem
  line-height: 1rem
  color: rgb(7, 17, 27)
  margin-bottom: 0.16rem

.list__item__spec
  line-height: 1rem
  font-size: 0.65rem
  color: rgb(147, 153, 159)
  padding: 0.2rem
  word-break: break-all
  display: -webkit-box
  overflow: hidden
  text-overflow: ellipsis
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical

.list__item__priceBox
  display: flex
  justify-content: space-between

.list__item__currentPrice
  font-size: 0.75rem
  color: red

.list__item__originPrice
  padding-left: 0.5rem
  text-decoration: line-through
  font-size: 0.6875rem
  color: #b2b2b2

.list__item__cart
  position: absolute
  bottom: -0.8rem
  right: 1rem

.bottomTip
  padding-top: 0.8rem
  color: grey
  font-size: 0.6rem
  text-align: center
</style>

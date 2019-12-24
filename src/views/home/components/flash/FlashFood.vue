<template>
  <div class="flashFood">
    <div class="flashFood__box">
      <ul class="flashFood__list" ref="producetBox">
        <li
          class="flashFood__list__item"
          v-for="(item, index) in flashSaleList"
          :key="item.id"
          ref="productItem"
        >
          <img class="item__img" v-lazy="item.small_image" alt />
          <p class="item__name">{{ item.name }}</p>
          <div class="item__price">
            <p class="item__price__current">{{ item.price | moneyFormat }}</p>
            <p class="item__price__old">
              {{ item.origin_price | moneyFormat }}
            </p>
            <div class="item__cart" @click="addToCart(item, index)">
              <svg-icon iconClass="car" style="width:1.5rem;height:1.5rem" />
            </div>
          </div>
        </li>
      </ul>
      <transition
        appear
        @after-appear="afterEnter"
        @before-appear="beforeEnter"
        v-for="(item, index) in showMoveDot"
        :key="index.id"
      >
        <div v-if="item" class="move__dot" ref="ball">
          <img :src="dropImage" alt />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { mapMutations, mapState } from "vuex";
export default {
  name: "FlashFood",
  props: {
    flashSaleList: {
      type: Array
    }
  },
  data() {
    return {
      dropImage: "",
      showMoveDot: [],
      elLeft: 0,
      elTop: 0
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.$nextTick(() => {
      let flashContentWidth = 0;
      let el = this.$refs.productItem;
      for (let i = 0; i < el.length; i++) {
        flashContentWidth += el[i].clientWidth;
      }
      this.$refs.producetBox.style.width = `${flashContentWidth}px`;
      if (!this.scroll) {
        this.scroll = new BScroll(".flashFood__box", {
          probeType: 2,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  methods: {
    ...mapMutations(["ADD_TO_CART"]),
    addToCart(item) {
      this.ADD_TO_CART(item);
      if (this.userInfo.token) {
        this.dropImage = item.small_image;
        this.showMoveDot = [...this.showMoveDot, true];
        this.elLeft = event.target.getBoundingClientRect().left;
        this.elTop = event.target.getBoundingClientRect().top;
      }
    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop -
        100}px , 0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left +
        30}px,${badgePosition.top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      this.showMoveDot = this.showMoveDot.map(() => false);
      // 设置透明度
      el.style.opacity = 1;
      // 监听小球动画结束方法
      el.addEventListener("transitionend", () => {
        el.style.display = "none";
        this.listenInCart();
      });
      el.addEventListener("webkitAnimationEnd", () => {
        el.style.display = "none";
        this.listenInCart();
      });
    },
    listenInCart() {
      let buycar = document.getElementById("buycar");
      buycar.classList.add("moveTocart");
      this.timer = setTimeout(() => {
        buycar.classList.remove("moveTocart");
      });
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="stylus" scoped>
.flashFood__list
  display: flex
  justify-content: flex-start

.flashFood__list__item
  flex: 0 0 5.8rem
  align-items: center
  padding-left: 0.5rem

  .item__img
    width: 100%
    background-size: contain
    background-image: url('../../../../assets/images/placeholderImg/product-img-load.png')

  .item__name
    padding: 0.2rem
    display: inline-block
    font-size: 0.6258rem
    height: 1.8rem
    line-height: 1rem
    font-size: 0.625rem
    word-break: break-all
    display: -webkit-box
    overflow: hidden
    text-overflow: ellipsis
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical

  .item__price
    position: relative
    padding-left: 0.5rem
    margin-top: 0.3rem

    .item__price__current
      color: #f37078
      font-size: 0.8rem
      margin-bottom: 0.2rem

    .item__price__old
      font-size: 0.6rem
      color: #999
      text-decoration: line-through

    .item__cart
      position: absolute
      top: -0.2rem
      right: 0.6rem
      width: 1.5rem
      height: 1.5rem

.flashFood
  .flashFood__box
    width: 100%
    position: relative
    overflow: hidden

    .move__dot
      position: fixed
      top: 2rem
      z-index: 100
      height: 2rem
      width: 2rem
      border-radius: 50%

      img
        width: 3rem
        height: 3rem
        border-radius: 50%
        animation: 0.88s mymove ease-in-out

@keyframes mymove
  0%
    transform: scale(1)

  25%
    transform: scale(0.8)

  50%
    transform: scale(0.6)

  75%
    transform: scale(0.4)

  100%
    transform: scale(0.2)
</style>

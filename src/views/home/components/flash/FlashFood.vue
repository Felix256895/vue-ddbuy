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
              <svg viewBox="0 0 52 52" class="icon icon-60">
                <defs>
                  <radialGradient
                    cx="27.0288363%"
                    cy="10.3693483%"
                    fx="27.0288363%"
                    fy="10.3693483%"
                    r="93.8427229%"
                    id="radialGradient-1"
                  >
                    <stop stop-color="#4ECA75" offset="0%" />
                    <stop stop-color="#39B460" offset="100%" />
                  </radialGradient>
                </defs>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-678.000000, -2742.000000)">
                    <g transform="translate(678.000000, 2742.000000)">
                      <rect
                        fill="url(#radialGradient-1)"
                        x="0"
                        y="0"
                        width="51.8699976"
                        height="51.8699976"
                        rx="25.9349988"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"
                      />
                      <path
                        stroke="#FFFFFF"
                        stroke-width="2.6"
                        stroke-linecap="round"
                        d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909"
                      />
                    </g>
                  </g>
                </g>
              </svg>
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

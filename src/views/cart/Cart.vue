<template>
  <div class="cart">
    <header class="cart__header">
      <h2 class="cart__header__title">
        <strong>购物车</strong>
      </h2>
      <div
        class="cart__header__delete"
        :style="selectedGoodsCount == 0 ? 'color:grey' : 'color:#45c763'"
        v-show="isShowEmptyCart"
        @click="clearCart"
      >
        删除
      </div>
    </header>
    <div class="cart__content">
      <div class="emptyCart" v-show="!isShowEmptyCart">
        <img
          class="emptyCart__img"
          src="../../assets//images/cart/empty.png"
          alt="emptyCart"
        />
        <p class="emptyCart__prompt">购物车空空滴～</p>
        <router-link to="/dashboard/home" class="goAway">去逛逛</router-link>
      </div>
      <div class="cartContainer" v-show="isShowEmptyCart">
        <div class="cartList__item" v-for="goods in shopCart" :key="goods.id">
          <div class="cartList__left">
            <a
              class="cartCheck"
              :checked="goods.checked"
              @click.stop="single(goods.id)"
            ></a>
          </div>
          <div class="cart__center">
            <img v-lazy="goods.smallImage" />
          </div>
          <div class="cart__right">
            <div class="cart__right__title">{{ goods.name }}</div>
            <div class="cart__right__count">
              <p class="cart__price">{{ goods.price | moneyFormat }}</p>
              <div class="cart__count">
                <span class="subtract" @click="reduceGoods(goods.id, goods.num)"
                  >-</span
                >
                <input
                  class="cart__input"
                  v-model="goods.num"
                  type="number"
                  disabled
                />
                <span
                  class="add"
                  @click="
                    addGoods(
                      goods.id,
                      goods.name,
                      goods.small_image,
                      goods.price
                    )
                  "
                  >+</span
                >
              </div>
            </div>
          </div>
        </div>
        <van-submit-bar
          :price="totalPrice"
          :button-text="submitBarText"
          @submit="onSubmit"
          :disabled="!(selectedGoodNum > 0)"
          v-show="isShowEmptyCart"
        >
          <van-checkbox v-model="isCheckedAll" checked-color="#45c763"
            >全选</van-checkbox
          >
        </van-submit-bar>
      </div>
      <van-divider
        :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
        >猜你喜欢</van-divider
      >
      <ProductItem
        :product_list="youLikeProductList"
        :style="
          isShowEmptyCart ? 'padding-bottom:5.5rem' : 'padding-bottom:3rem'
        "
      />
    </div>
    <v-loading v-if="isShowLoading" />
    <v-top />
  </div>
</template>
<script>
import ProductItem from "../home/components/tabbar/ProductItem";
import { getCartLike } from "api";
import { mapState, mapMutations, mapGetters } from "vuex";
import { Dialog, Toast } from "vant";

export default {
  name: "Cart",
  components: {
    ProductItem
  },
  data() {
    return {
      checked: false,
      youLikeProductList: [],
      isShowLoading: true
    };
  },
  computed: {
    ...mapState(["shopCart", "userInfo"]),
    ...mapGetters({
      selectedGoodNum: "SELECTED_GOODS_COUNT",
      totalPrice: "SELECTED_GOODS_PRICE"
    }),
    /**
     * 结算数量
     */
    submitBarText() {
      const count = this.selectedGoodNum;
      let num = count ? `(${count})` : "";
      return `结算${num}`;
    },
    /**
     * 计算购物车数量
     */
    totalCount() {
      return Object.keys(this.shopCart).length;
    },
    /**
     * 判断是否显示购物车
     */
    isShowEmptyCart() {
      let isShow = false;
      if (this.totalCount > 0) {
        isShow = true;
      }
      return isShow;
    },
    /**
     * 计算购物车商品数量
     */
    selectedGoodsCount() {
      let selectedGoodsCount = 0;
      Object.values(this.shopCart).forEach(goods => {
        if (goods.checked) {
          selectedGoodsCount++;
        }
      });
      return selectedGoodsCount;
    },
    /**
     * 是否全选
     */
    isCheckedAll: {
      get() {
        let tag = this.totalCount > 0;
        let shopCart = this.shopCart;
        Object.values(shopCart).forEach(goods => {
          if (!goods.checked) {
            tag = false;
          }
        });
        return tag;
      },
      set(value) {
        let isCheckedAll = !value;
        this.ALL_SELECT_GOODS({ isCheckedAll });
      }
    }
  },
  methods: {
    ...mapMutations([
      "ADD_GOODS",
      "REDUCE_GOODS",
      "SINGLE_SELECT_GOODS",
      "ALL_SELECT_GOODS",
      "DELETE_SELECT_GOODS",
      "ADD_TO_CART"
    ]),
    /**
     * 获取猜你喜欢数据
     */
    async initData() {
      const response = await getCartLike();
      if (response.success) {
        this.youLikeProductList = response.data.product_list;
        this.isShowLoading = false;
      }
    },
    /**
     * 清空购物车
     */
    clearCart() {
      if (this.selectedGoodsCount > 0) {
        Dialog.confirm({
          title: "温馨提示",
          message: "确定删除选中商品吗?"
        })
          .then(() => {
            // on confirm 确认删除
            this.DELETE_SELECT_GOODS();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    /**
     * 减少商品
     */
    reduceGoods(goodsId, goodsNum) {
      if (goodsNum > 1) {
        this.REDUCE_GOODS({
          goodsId
        });
      } else if (goodsNum === 1) {
        Dialog.confirm({
          title: "温馨提示",
          message: "确定删除该商品吗?"
        })
          .then(() => {
            // on confirm 确认删除
            this.REDUCE_GOODS({ goodsId });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    /**
     * 增加商品
     */
    addGoods(goodsId, goodsName, goodsSmallImage, goodsPrice) {
      this.ADD_GOODS({
        goodsId,
        goodsSmallImage,
        goodsPrice,
        goodsName
      });
    },
    /**
     * 单个商品是否选中
     */
    single(goodsId) {
      this.SINGLE_SELECT_GOODS({ goodsId });
    },
    onSubmit() {
      if (this.selectedGoodsCount > 0) {
        this.$router.push("/order");
      } else {
        Toast({
          message: "请选择需要结算的商品",
          duration: 1000
        });
      }
    }
  },

  mounted() {
    this.initData();
  }
};
</script>
<style lang="stylus" scoped>
.cart
  width: 100%
  height: 100%
  background-color: #f5f5f5

.cart__header
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 2.6rem
  display: flex
  justify-content: center
  align-items: center
  background-color: #fff

.cart__header__title
  flex-grow: 1
  text-align: center

.cart__header__delete
  position: absolute
  right: 0.5rem
  font-size: 0.8rem
  color: #45c763

.cart__content
  width: 100%
  // height: 100rem
  margin-top: 2.6rem

  @media screen and (min-width: 300px) and (max-width: 374px)
    .van-submit-bar
      bottom: 3.3rem

  @media screen and (min-width: 375px) and (max-width: 420px)
    .van-submit-bar
      bottom: 2.7rem

  @media screen and (min-width: 420px) and (max-width: 1024px)
    .van-submit-bar
      bottom: 1.4rem

.emptyCart
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .emptyCart__img
    padding-top: 2rem
    width: 50%
    height: 8rem
    margin: 0 auto

  .emptyCart__prompt
    padding: 0.5rem

  .goAway
    display: flex
    width: 5rem
    height: 2rem
    justify-content: center
    align-items: center
    background-color: #45c763
    color: #fff
    border-radius: 1rem

.cartContainer
  padding-top: 0.5rem

  .van-checkbox
    margin-left: 0.5rem

.cartList__item
  width: 100%
  height: 6rem
  display: flex
  justify-content: center
  align-items: center
  background-color: #fff
  padding: 0.5rem 0
  margin-bottom: 0.7rem
  border-bottom: 1px solid #e0e0e0

.cartList__left
  flex: 1
  display: flex
  justify-content: center

  .cartCheck
    display: flex
    width: 1rem
    height: 1rem
    background: url('../../assets/images/cart/shop-icon.png') no-repeat
    background-size: 2.5rem 5rem

  .cartCheck[checked]
    background-position: -1.2rem 0

.cart__center
  flex: 3

  img
    max-width: 100%
    max-height: 100%

.cart__right
  flex: 6
  display: flex
  flex-direction: column
  margin: 0 0.5rem

.cart__right__title
  height: 2.2rem
  word-break: break-all
  display: -webkit-box
  overflow: hidden
  text-overflow: ellipsis
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  line-height: 1.2rem
  font-size: 0.8rem
  margin-bottom: 0.3rem
  color: #000

.cart__right__count
  display: flex
  justify-content: space-between
  align-items: center

  .cart__price
    font-size: 0.8rem

  .cart__count
    display: flex
    align-self: center
    align-items: center

    span
      width: 1rem
      height: 1.2rem
      line-height: 1.2rem
      text-align: center

    .cart__input
      width: 2rem
      height: 1.2rem
      background-color: #f5f5f5
      border: 0
      line-height: 1.2rem
      text-align: center
      font-size: 0.8rem
      margin: 0 0.2rem
</style>

<template>
  <div class="myVip" ref="myVip">
    <div v-if="!isShowLoading">
      <van-nav-bar
        style="heght: 2.5rem"
        title="绿卡"
        left-arrow
        :border="false"
        :fixed="true"
        @click-left="onClickLeft"
      />
      <div class="myVip__banner">
        <img
          class="myVip__banner__img"
          src="../../../assets/images/mine/vip.png"
          alt="myVip__banner"
        />
      </div>
      <div class="myVip__privilege">
        <p class="myVip__privilege__title">绿卡特权</p>
        <van-grid :border="false">
          <van-grid-item icon="vip-card-o" text="专享券" />
          <van-grid-item icon="discount" text="专享特价" />
          <van-grid-item icon="gem-o" text="2倍积分" />
          <van-grid-item icon="more-o" text="更多特权" />
        </van-grid>
        <div class="myVip__privilege__btn" @click="goVipPay">五折开通绿卡</div>
      </div>
      <div class="coupon">
        <div class="coupon__title">
          <span class="num">1</span>
          <span class="desc">绿卡专享券 天天领取优惠</span>
        </div>
        <p class="coupon__subtitle">
          今日专享券
          <span>每天0点更新</span>
        </p>
        <ul class="coupon__content">
          <li
            class="coupon__content__item"
            v-for="item in todayTicket"
            :key="item.id"
            @click="getCoupons"
          >
            <div class="item__left">
              <div class="money">
                <span class="symbol">¥</span>
                {{ item.money }}
              </div>
              <p class="description">满{{ item.pay_min }}元使用</p>
              <p class="description__type">{{ item.description }}</p>
            </div>
            <div class="item__btn">立即领取</div>
          </li>
        </ul>
        <p class="coupon__subtitle">
          今日专享券
          <span>每天0点更新</span>
        </p>
        <ul class="coupon__content">
          <li
            class="coupon__content__item"
            v-for="item in weekTicket"
            :key="item.id"
            @click="getCoupons"
          >
            <div class="item__left">
              <div class="money">
                <span class="symbol">¥</span>
                {{ item.money }}
              </div>
              <p class="description">满{{ item.pay_min }}元使用</p>
              <p class="description__type">{{ item.description }}</p>
            </div>
            <div class="item__btn">立即领取</div>
          </li>
        </ul>
      </div>
      <div class="coupon">
        <div class="coupon__title">
          <span class="num">2</span>
          <span class="desc">绿卡专享券 天天领取优惠</span>
        </div>
        <div class="integralBox">
          <div class="leftBox">
            <div class="leftBoxTitle">您当前购物</div>
            <div class="leftBoxSubTitle">
              返积分为
              <i>1倍</i>
            </div>
          </div>
          <div class="rightBox">
            <div class="rightBoxTitle">开通绿卡购物</div>
            <div class="rightBoxSubTitle">
              返积分为
              <i>2倍</i>
            </div>
            <div class="line"></div>
            <img src="./../../../assets/images/mine/rockets.png" alt />
          </div>
        </div>
        <div class="integralToFast" @click="goVipPay">立即开启积分加速</div>
      </div>
      <div class="coupon">
        <div class="coupon__title">
          <span class="num">3</span>
          <span class="desc">绿卡专享特价</span>
        </div>
        <van-sticky :offset-top="40">
          <vip-menu :menuTitlesArray="cate" @menuTitleClick="menuTitleClick"></vip-menu>
        </van-sticky>
        <vip-goods :vipCateDetail="cateDetail"></vip-goods>
      </div>
    </div>
    <transition name="fade">
      <div class="bottomJoinVip" v-show="isShowBtn" transiton="fade">
        <div class="bottomDesc">
          <span class="yearCart">年卡</span>
          <i>88元</i>
          <span class="originPrice">180元</span>
        </div>
        <div class="joinVip" @click="goVipPay">开通绿卡</div>
      </div>
    </transition>
    <v-loading v-if="isShowLoading" />
  </div>
</template>
<script>
import { getMyVip } from "api";
import { Dialog } from "vant";
import VipMenu from "./vipMenuScroll";
import VipGoods from "./vipGoodsItem";
export default {
  name: "myVip",
  components: {
    VipMenu,
    VipGoods
  },
  data() {
    return {
      isShowLoading: true,
      todayTicket: [], //今日更新
      weekTicket: [], // 本周更新
      cate: [], // 分类标题
      cateDetail: [],
      isShowBtn: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async initData() {
      let response = await getMyVip();
      if (response.success) {
        this.todayTicket = response.data.today_ticket.tickets;
        this.weekTicket = response.data.week_ticket.tickets;
        this.cate = response.data.cate;
        this.cateDetail = response.data.cate_detail;
        this.isShowLoading = false;
      }
    },
    goVipPay() {
      this.$router.push("/vipPay");
    },
    getCoupons() {
      Dialog.confirm({
        message: "开通绿卡,立享此券",
        confirmButtonText: "开卡领券",
        confirmButtonColor: "#60b86a"
      })
        .then(() => {
          this.goVipPay();
        })
        .catch(() => {});
    },
    handleScroll() {
      let myVipScrollTop = this.$refs.myVip.scrollTop;
      if (myVipScrollTop > 500) {
        this.isShowBtn = true;
      } else {
        this.isShowBtn = false;
      }
    },
    menuTitleClick() {}
  },
  mounted() {
    this.initData();
    const myVip = this.$refs.myVip;
    myVip.addEventListener(
      "scroll",
      () => {
        this.handleScroll();
      },
      false
    );
  }
};
</script>
<style lang="stylus" scoped>
.myVip
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  background-color: #f5f5f5
  overflow-x: hidden
  overflow-y: auto

  .van-nav-bar
    background-color: #303747
    font-size: 0.6rem

    .van-icon
      color: #fff

    .van-nav-bar__title
      color: #fff

.myVip__banner
  width: 100%
  height: 10rem
  margin-top: 2.5rem

  .myVip__banner__img
    width: 100%
    height: 100%

.myVip__privilege
  padding-top: 1rem
  padding-bottom: 0.6rem
  background-color: #fff

  .myVip__privilege__title
    line-height: 1rem
    font-size: 1rem
    padding-left: 1rem
    font-weight: bolder

  .myVip__privilege__btn
    display: flex
    width: 60%
    height: 2.5rem
    align-items: center
    justify-content: center
    background-color: #303747
    margin: 0.5rem auto
    border-radius: 2rem
    color: #5fa85f
    font-size: 0.9rem
    font-weight: bold

.coupon
  width: 100%
  margin-top: 1rem
  padding: 1rem 0 1rem 1rem
  background-color: #fff

  .coupon__title
    display: flex
    align-items: center
    height: 1.5rem

    .num
      width: 1rem
      height: 1rem
      line-height: 1rem
      background-color: #60b86a
      color: #fff
      text-align: center
      padding: 0.2rem
      border-radius: 2px

    .desc
      font-size: 1rem
      padding-left: 0.5rem
      color: black
      font-weight: bolder

.coupon__subtitle
  padding-top: 1rem
  font-size: 0.7rem

  span
    color: grey
    padding-left: 0.4rem

.coupon__content
  display: flex
  justify-content: flex-start
  flex-wrap: wrap
  min-height: 4rem

.coupon__content__item
  display: flex
  height: 4rem
  width: 40%
  margin-right: 5%
  margin-top: 0.6rem
  border-left: 2px dashed #60b86a
  border-top: 1px solid #60b86a
  border-bottom: 1px solid #60b86a
  border-radius: 0 2px 2px 0
  padding-left: 0.6rem

  .item__btn
    width: 1.4rem
    height: 4rem
    font-size: 0.7rem
    text-align: center
    line-height: 1.5rem
    color: #fff
    border-radius: 0 2px 2px 0
    background-color: #60b86a
    writing-mode: vertical-rl

.item__left
  flex-grow: 1
  display: flex
  flex-direction: column

  .money
    font-size: 2rem
    color: #60b86a

    span
      font-size: 1rem

  .description
    font-size: 0.7rem
    color: #565656

  .description__type
    padding-top: 0.4rem
    font-size: 0.7rem
    width: 90%
    color: #60b86a
    word-break: break-all
    display: -webkit-box
    overflow: hidden
    text-overflow: ellipsis
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical

.integralBox
  display: flex
  margin: 0.6rem
  padding-right: 2rem

  .leftBox
    width: 38%
    height: 0
    border-right: 4rem solid transparent
    border-top: 3.5rem solid #dbdbdb
    border-radius: 0.5rem 0 0 0

  .leftBoxTitle
    margin-top: -3rem
    margin-left: 1rem
    font-size: 0.5rem
    color: #000

  .leftBoxSubTitle
    margin-left: 1rem
    margin-top: 0.3rem
    font-size: 0.7rem

    i
      color: #000
      font-size: 0.9rem

.rightBox
  position: relative
  width: 38%
  height: 0
  border-left: 4rem solid transparent
  border-top: 3.5rem solid #6bbe66
  transform: rotateX(180deg)
  margin-left: -3.2rem
  border-top-right-radius: 0.5rem

  .rightBoxTitle
    margin-top: -1.3rem
    font-size: 0.5rem
    color: black
    transform: rotateX(-180deg)

  .rightBoxSubTitle
    margin-top: -1.75rem
    transform: rotateX(-180deg)
    font-size: 0.7rem

    i
      color: black
      font-size: 0.9rem

  .line
    margin-top: -1.6rem
    margin-left: -130%
    width: 190%
    height: 0.5rem
    background-image: linear-gradient(to left, #fbec53, #7affaf)
    border-radius: 0.3rem

  img
    top: -2.3rem
    right: -1.2rem
    position: absolute
    transform: rotateX(-180deg)
    width: 3rem
    height: 3rem

.bottomJoinVip
  position: fixed
  display: flex
  bottom: 0.6rem
  height: 2.5rem
  width: 90%
  left: 5%
  right: 5%
  z-index: 999
  border-radius: 1.5rem

  .bottomDesc
    background-color: #303747
    width: 70%
    border-radius: 1.5rem 0 0 1.5rem
    height: 2.5rem
    line-height: 2.5rem
    justify-content: flex-start
    padding-left: 1rem
    color: white
    font-size: 0.8rem

    i
      padding-left: 0.2rem
      padding-right: 0.2rem
      color: #f2525a

    .originPrice
      font-size: 0.6rem
      text-decoration: line-through

  .joinVip
    text-align: center
    width: 30%
    height: 2.5rem
    line-height: 2.5rem
    background-color: #3cb963
    border-radius: 0 1.5rem 1.5rem 0
    color: white
    font-size: 0.8rem

  .fade-enter
    opacity: 0

  .fade-enter-active
    transition: opacity 3s

  .fade-leave-to
    opacity: 0

  .fade-leave-active
    transition: opacity 3s
</style>

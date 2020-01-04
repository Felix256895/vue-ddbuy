<template>
  <div class="mine">
    <van-nav-bar
      title="我的"
      :fixed="true"
      :border="false"
      style="height: 2.5rem"
    />
    <van-cell-group style="margin-top: 2.4rem">
      <van-cell
        style="background-color: #3bba63;color: #fff"
        label-class="labelClass"
        center
      >
        <template slot="title">
          <div class="mine__info" v-if="!userInfo.token">
            <img class="mine__info__img" :src="user_image.noLogin_icon" alt />
            <div class="mine__info__text">
              <div @click="login">立即登录</div>
            </div>
          </div>
          <div class="mine__info" v-if="userInfo.token" @click="goPersonInfo">
            <img class="mine__info__img" :src="user_image.login_icon" alt />
            <div class="mine__info__sex" v-if="userInfo.sex">
              <img
                :src="
                  userInfo.sex === '1' ? user_image.female : user_image.male
                "
                alt
              />
            </div>
            <div class="mine__info__text">
              <span>{{ userInfo.user_name }}</span>
              <span>手机号：{{ phoneNumber }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        title="我的订单"
        icon="label"
        value="查看全部订单"
        @click="goMyOrder(-1)"
        is-link
      />
      <van-grid :border="false">
        <van-grid-item
          v-for="(order, index) in orderData"
          :key="index"
          :icon="order.icon"
          :text="order.title"
          @click="goMyOrder(index)"
        />
      </van-grid>
    </van-cell-group>
    <van-cell-group style="margin-top: 0.5rem">
      <van-cell
        title="我的优惠券"
        icon="gold-coin"
        :value="userInfo.token ? '2张' : ''"
        is-link
        @click="goCouponList"
      />
      <van-cell
        title="我的收货地址"
        icon="todo-list"
        is-link
        @click="goMyAddress"
      />
    </van-cell-group>
    <van-cell-group style="margin-top: 0.5rem">
      <van-cell icon="vip-card" is-link>
        <template>
          <span>我的绿卡</span>
          <van-tag :round="true" type="danger">NEW</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 0.5rem">
      <van-cell
        title="联系客户"
        icon="phone"
        value="客户时间 07:00~22:00"
        is-link
      />
      <van-cell title="意见反馈" icon="comment-circle" is-link />
    </van-cell-group>
    <div class="version">当前版本{{ version }}</div>
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { VERSION, phone } from "@/config/global";
export default {
  name: "Mine",
  data() {
    return {
      user_image: {
        login_icon: require("../../assets/images/mine/defaultImg.jpeg"),
        noLogin_icon: require("../../assets/images/login/grey.jpg"),
        female: require("../../assets/images/mine/female.png"),
        male: require("../../assets/images/mine/male.png")
      },
      // 订单状态
      orderData: [
        { icon: "cart-circle-o", title: "待支付" },
        { icon: "gift-o", title: "待收货" },
        { icon: "smile-comment-o", title: "待评价" },
        { icon: "cash-back-record", title: "售后/退款" }
      ],
      version: VERSION
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    phoneNumber() {
      return phone(this.userInfo.phone);
    },
    userInfoSex() {
      if (this.userInfo.sex == "1") {
        return this.user_image.female;
      } else if (this.userInfoSex.sex == "2") {
        return this.user_image.male;
      } else {
        return "";
      }
    }
  },
  methods: {
    /**
     * 未登录
     */
    login() {
      this.$router.push("/login");
    },
    /**
     * 个人资料
     */
    goPersonInfo() {
      this.$router.push({ name: "personInfo" });
    },
    goMyOrder(index) {
      if (!this.userInfo.token) {
        return this.login();
      }
      if (index === 3) {
        console.log(index);
      } else {
        this.$router.push({ name: "myOrder", params: { active: index + 1 } });
      }
    },
    goCouponList() {
      if (!this.userInfo.token) {
        return this.login();
      }
      this.$router.push({ name: "couponList" });
    },
    goMyAddress() {
      if (!this.userInfo.token) {
        return this.login();
      }
      this.$router.push("/order/myAddress");
    }
  }
};
</script>
<style lang="stylus" scoped>
.mine
  width: 100%
  background-color: #f5f5f5
  margin-bottom: 3rem

  .van-nav-bar
    background-color: #3bba63
    font-size: 0.6rem

  .van-nav-bar__title
    color: #fff

.mine__info
  display: flex
  align-items: center

  .mine__info__img
    width: 4rem
    height: 4rem
    border-radius: 50%

  .mine__info__text
    display: flex
    flex-direction: column
    margin-left: 1rem

  .mine__info__sex
    position: absolute
    top: 3.5rem
    left: 3.8rem
    width: 0.1rem
    height: 0.1rem

    img
      width: 1rem
      height: 1rem

.van-cell__left-icon
  color: #3bba63
  font-size: 1.2rem

.version
  line-height: 2rem
  background-color: #fff
  color: #999
  text-align: center
  font-size: 0.6rem

.router-slider-enter-active, .router-slider-leave-active
  transition: all 0.3s

.router-slider-enter, .router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
</style>

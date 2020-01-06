<template>
  <div class="order">
    <van-nav-bar
      title="填写订单"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
      style="height: 2.5rem"
    ></van-nav-bar>
    <van-contact-card
      :type="address_type"
      add-text="选择收货地址"
      :name="address_name"
      :tel="address_phone"
      @click="chooseAddress"
      style="margin-top:3rem"
    />
    <van-cell-group>
      <van-cell
        title="送达时间"
        is-link
        :value="deliveryTime"
        @click="showTimePickView"
      >
        <template slot="label">
          <span>超过十分钟可获得积分补偿</span>
          <van-icon name="question-o" />
        </template>
      </van-cell>
      <TimeList
        :showDateTimePopView="showDateTimePopView"
        @changeData="changeData(arguments)"
      />
      <div class="wrapper">
        <div class="wrapperBox" ref="wrapperBox">
          <ul class="wrapperList" ref="wrapperList">
            <li
              class="wrapperItem"
              ref="wrapperItem"
              v-for="(item, index) in goods"
              :key="index"
            >
              <img :src="item.smallImage" alt="" />
            </li>
          </ul>
        </div>
        <div class="productCount" ref="productCount">
          <span>共{{ selectedCount }}件</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </van-cell-group>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell clickable @click="radio = '1'">
          <template slot="title">
            <img
              src="../../assets/images/order/wx.png"
              alt=""
              width="25px"
              height="25px"
              style=" vertical-align: middle;padding-right:5px"
            />
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon" checked-color="#07c160" name="1" />
        </van-cell>
        <van-cell clickable @click="radio = '2'">
          <template slot="title">
            <img
              src="../../assets/images/order/zfb.png"
              alt=""
              width="25px"
              height="25px"
              style=" vertical-align: middle;padding-right:5px"
            />
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon" checked-color="#07c160" name="2" />
        </van-cell>
        <van-cell clickable @click="radio = '3'">
          <template slot="title">
            <img
              src="../../assets/images/order/hb.png"
              alt=""
              width="25px"
              height="25px"
              style=" vertical-align: middle;padding-right:5px"
            />
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon" checked-color="#07c160" name="3" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-cell-group style="margin-top: 0.5rem">
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-cell>
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
        <span slot="title"
          >使用{{ integral }}积分兑换<b>{{
            integralToprice | moneyFormat
          }}</b></span
        >
        <van-switch
          v-model="checked"
          slot="right-icon"
          @input="onInput"
          active-color="#07c160"
        />
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 0.6rem">
      <van-field
        label="备注"
        type="textarea"
        placeholder="选填,可以告诉我们您的特殊需求"
        rows="1"
        autosize
        is-link
      />
    </van-cell-group>
    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额">
        <div class="money">{{ (selectedTotalPrice / 100) | moneyFormat }}</div>
      </van-cell>
      <van-cell title="配送费">
        <div class="money">0.00</div>
      </van-cell>
      <van-cell title="积分" v-show="isShowPreferential">
        <div class="integralToMoney">-{{ integralToprice | moneyFormat }}</div>
      </van-cell>
    </van-cell-group>
    <van-submit-bar
      :price="actualPrice"
      button-text="提交订单"
      label="实付"
      @submit="onSubmit"
    />
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import TimeList from "./timeList";
import BScroll from "better-scroll";
import { mapGetters, mapMutations } from "vuex";
import { Dialog, Toast } from "vant";
import { CHOOSE_USER_ADDRESS } from "../../config/pubsub_type";
import PubSub from "pubsub-js";

export default {
  name: "order",
  components: {
    TimeList
  },
  data() {
    return {
      address_type: "add",
      address_name: null,
      address_phone: null,
      deliveryTime: "请选择送达时间",
      showDateTimePopView: false,
      showList: false,
      checked: false,
      integral: 800,
      isShowPreferential: false,
      radio: "1",
      coupons: [
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠1.5元",
          reason: "",
          value: 150,
          name: "优惠券 ",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "1.5",
          unitDesc: "元"
        },
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠2元",
          reason: "",
          value: 200,
          name: "优惠券 ",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "2",
          unitDesc: "元"
        }
      ],
      chosenCoupon: -1
    };
  },
  computed: {
    ...mapGetters({
      selectedCount: "SELECTED_GOODS_COUNT",
      goods: "SELECTED_GOODS",
      selectedTotalPrice: "SELECTED_GOODS_PRICE"
    }),
    actualPrice() {
      // 如果用户使用积分兑换或使用优惠券
      let finalPrice;
      if (this.checked) {
        let discountsPrice = this.integralToprice
          .toFixed(2)
          .toString()
          .replace(".", "");
        finalPrice = this.selectedTotalPrice - discountsPrice;
      } else {
        finalPrice = this.selectedTotalPrice;
      }
      // 是否选择优惠券
      if (this.chosenCoupon > -1) {
        return finalPrice - this.coupons[this.chosenCoupon].value;
      } else {
        return finalPrice;
      }
    },
    // 计算积分兑换人民币
    integralToprice() {
      if (this.integral > 0) {
        return this.integral / 100;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART"]),
    initScroll() {
      let count = this.$refs.productCount.clientWidth;
      let productImages = this.$refs.wrapperItem;
      let contentWidth = count + 10;
      for (let i = 0; i < productImages.length; i++) {
        contentWidth += productImages[i].clientWidth;
      }
      this.$refs.wrapperList.style.width = contentWidth + `px`;
      if (!this.productImageScroll) {
        this.productImageScroll = new BScroll(".wrapperBox", {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        });
      } else {
        this.productImageScroll.refresh();
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    chooseAddress() {
      this.$router.push("/order/myAddress");
    },
    showTimePickView() {
      this.showDateTimePopView = true;
    },
    changeData() {
      this.showDateTimePopView = arguments[0][0];
      this.deliveryTime = arguments[0][1];
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      const coupon = {
        available: 1,
        condition: "无使用门槛\n最多优惠12元",
        reason: "",
        value: 150,
        name: "优惠券名称",
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: "1.5",
        unitDesc: "元"
      };
      this.coupons.push(coupon);
    },
    onInput() {
      let discountsPrice = this.integralToprice * 100;
      // 4.1 判断积分使用条件是否满足
      if (discountsPrice > this.selectedTotalPrice) {
        // 4.2不能使用积分
        Dialog.alert({
          message: "您的实际价格小于积分兑换价格,建议您在多买几件"
        }).then(() => {
          this.checked = false;
        });
      } else {
        this.isShowPreferential = !this.isShowPreferential;
      }
    },
    onSubmit() {
      if (!this.address_name) {
        Toast({
          message: "请选择收货地址",
          duration: 800
        });
      } else if (this.deliveryTime == "请选择送达时间") {
        Toast({
          message: this.deliveryTime,
          duration: 800
        });
      } else {
        Toast({
          message: "提交订单",
          duration: 800
        });
      }
    }
  },
  mounted() {
    this.INIT_SHOP_CART();
    this.$nextTick(() => {
      if (this.goods.length > 0) {
        this.initScroll();
      }
    });
    PubSub.subscribe(CHOOSE_USER_ADDRESS, (msg, data) => {
      if (msg == CHOOSE_USER_ADDRESS) {
        // 修改卡片类型
        this.address_type = "edit";
        this.address_name = data.name;
        this.address_phone = data.tel;
        this.address_id = data.id;
      }
    });
  },
  beforeDestroy() {
    // 销毁订阅
    PubSub.unsubscribe(CHOOSE_USER_ADDRESS);
  }
};
</script>
<style lang="stylus" scoped>
.order
  width: 100%
  height: 100%
  background-color: #f5f5f5
  margin-bottom: 5rem
.wrapper
  width: 100%
  height: 4rem
  position: relative
.wrapperBox
  width: 100%
.wrapperList
  display: flex
  height: 4rem
  align-items: center
  overflow: hidden
  white-space: nowrap
  img
    width: 3rem
    height: 3rem
.productCount
  position: absolute
  right: 0
  top: 0
  display: flex
  height: 4rem
  white-space nowrap
  align-items: center
  justify-content: center
  color: #999
  padding:0 0.5rem
  background-color: #fff
  font-size: 0.8rem
.router-slider-enter-active, .router-slider-leave-active
  transition: all 0.3s

.router-slider-enter, .router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
</style>

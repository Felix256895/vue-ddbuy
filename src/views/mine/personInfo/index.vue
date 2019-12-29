<template>
  <div class="personInfo">
    <van-nav-bar
      title="个人资料"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
      style="height: 2.5rem"
    />
    <div class="personInfo__list">
      <van-cell-group>
        <van-cell style="display: flex;align-items:center" title="头像">
          <template>
            <img
              class="personInfo__img"
              src="../../../assets/images/mine/defaultImg.jpeg"
              alt
            />
          </template>
        </van-cell>
        <van-cell
          title="昵称"
          is-link
          :value="userInfo.user_name"
          @click="goEditNickName"
        />
        <van-cell title="性别" is-link :value="userSex" @click="onChangeSex" />
        <van-cell
          title="生日"
          is-link
          @click="selectBrithday"
          :value="userInfo.brithday ? userInfo.brithday : '未填写'"
        />
        <van-cell title="手机号" :value="phoneNumber" />
      </van-cell-group>
      <van-button size="large" style="margin-top:1rem" @click="logout"
        >退出登录</van-button
      >
      <!-- 性别选择 -->
      <van-popup
        v-model="showChooseSex"
        round
        position="bottom"
        :style="{ height: '25%' }"
      >
        <van-radio-group v-model="userInfo.sex">
          <van-cell-group style="margin-top:2rem" @click="clickCell(radio)">
            <van-cell title="美女" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" checked-color="#07c160" />
            </van-cell>
            <van-cell title="帅哥" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" checked-color="#07c160" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
      <van-popup v-model="showDateTimePopView" round position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="confirm"
          @cancel="cancel"
          :formatter="formatter"
          :max-date="maxDate"
          :min-date="minDate"
        />
      </van-popup>
    </div>
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { Toast, Dialog } from "vant";
import moment from "moment";
import { phone } from "@/config/global";
export default {
  name: "pserInfo",
  data() {
    return {
      showChooseSex: false,
      showDateTimePopView: false,
      currentDate: new Date("1989/01/01"),
      minDate: new Date("1949/01/01"),
      maxDate: new Date("2019/12/31")
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters({
      userSex: "USER_SEX"
    }),
    phoneNumber() {
      return phone(this.userInfo.phone);
    }
  },
  methods: {
    ...mapMutations(["USER_INFO_BRITHDAY", "LOGIN_OUT", "USER_INFO_SEX"]),
    onClickLeft() {
      this.$router.back();
    },
    onChangeSex() {
      this.showChooseSex = true;
    },
    clickCell(sex) {
      this.USER_INFO_SEX({ sex });
      this.timer = setTimeout(() => {
        this.showChooseSex = false;
        Toast({
          message: "个人资料修改成功",
          duration: 800
        });
      }, 300);
    },
    selectBrithday() {
      this.showDateTimePopView = true;
    },
    formatter(type, value) {
      switch (type) {
        case "year":
          return `${value}年`;
        case "month":
          return `${value}月`;
        case "day":
          return `${value}日`;
        default:
          return value;
      }
    },
    confirm(value) {
      const brithday = moment(value).format("YYYY年MM月DD日");
      this.brithdayText = brithday;
      this.USER_INFO_BRITHDAY({ brithday });
      this.showDateTimePopView = false;
      Toast({
        message: "个人资料修改成功!",
        duration: 800
      });
    },
    cancel() {
      this.showDateTimePopView = false;
    },
    logout() {
      Dialog.confirm({
        message: "确定退出登录吗?"
      })
        .then(() => {
          // on confirm
          this.LOGIN_OUT();
          Toast({
            message: "退出成功",
            duration: 800
          });
          this.$router.back();
        })
        .catch(() => {
          // on cancel
        });
    },
    goEditNickName() {
      this.$router.push({
        name: "editNickName",
        params: {
          nickName: this.userInfo.user_name
        }
      });
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="stylus" scoped>
.personInfo
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #f5f5f5
  z-index: 999

.personInfo__list
  margin-top: 3rem

.personInfo__img
  width: 2rem
  height: 2rem
  vertical-align: middle

.van-icon-arrow-left
  color: #45c763

.router-slider-enter-active, .router-slider-leave-active
  transition: all 0.3s

.router-slider-enter, .router-slider-leave-active
  transform: translate3d(2rem, 0, 0)
  opacity: 0
</style>

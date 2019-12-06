<template>
  <div class="login">
    <div class="login__box" @click="changeImage(3)">
      <div class="login__form">
        <div class="login__panfish">
          <img :src="imgUrl" alt />
        </div>
        <van-icon name="close" class="login__close" @click="handleClose" />
        <van-tabs v-model="active" animated>
          <van-tab title="登录">
            <van-cell-group v-show="!isShowLogin">
              <van-field
                v-model="username"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
                maxlength="11"
                @click.stop="changeImage(0)"
              />
              <van-field
                v-model="password"
                type="password"
                required
                clearable
                label="密码"
                placeholder="请输入密码"
                @click.stop="changeImage(1)"
              />
              <van-field
                v-model="imgCaptcha"
                required
                clearable
                maxlength="4"
                placeholder="请输入验证码"
              >
                <img
                  class="verificationImage"
                  src="http://demo.itlike.com/web/xlmc/api/captcha"
                  alt="captcha"
                  ref="imgCaptcha"
                  slot="button"
                  @click.prevent="getCaptcha"
                />
              </van-field>
            </van-cell-group>
            <van-cell-group v-show="isShowLogin">
              <van-field
                v-model="phone"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
                maxlength="11"
                :error-message="phoneNumber ? '' : '手机格式不正确'"
              />
              <van-field
                v-model="smsCaptcha"
                required
                clearable
                label="短信验证码"
                placeholder="验证码"
                maxlength="6"
              >
                <van-button
                  v-if="!countDown"
                  slot="button"
                  type="primary"
                  size="small"
                  :disabled="captchaDisable"
                  @click="getVerifyCode"
                  >发送验证码</van-button
                >
                <van-button v-else slot="button" type="primary" size="small"
                  >已发送{{ countDown }}</van-button
                >
              </van-field>
            </van-cell-group>
            <van-button
              type="info"
              size="large"
              style="margin-top:1rem"
              @click="handleClickLogin"
              >登录</van-button
            >
            <div class="switchLogin" @click="handleSwitch">
              {{ isShowLogin ? "账号密码登录" : "短信验证码" }}
            </div>
          </van-tab>
          <van-tab title="注册">
            <van-cell-group>
              <van-field
                v-model="registerUserName"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
                maxlength="11"
              />
              <van-field
                v-model="registerPassword"
                type="password"
                required
                clearable
                label="密码"
                placeholder="请输入密码(不少于6位)"
              />
              <van-button
                type="info"
                size="large"
                style="margin-top:1rem"
                @click="handleClickRegister"
                >注册</van-button
              >
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#1989fa',
            padding: '0 5px'
          }"
          >其他方式登录</van-divider
        >
        <van-grid :column-num="2" :border="false">
          <van-grid-item @click="otherLogin(0)">
            <svg
              t="1571242875453"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7519"
              width="40"
              height="40"
            >
              <path
                d="M347.729118 353.0242c-16.487119 0-29.776737 13.389539-29.776737 29.776737S331.241998 412.677596 347.729118 412.677596s29.776737-13.389539 29.776737-29.776737-13.289617-29.876659-29.776737-29.876659zM577.749415 511.800156c-13.689305 0-24.880562 11.091335-24.880563 24.880562 0 13.689305 11.091335 24.880562 24.880563 24.880562 13.689305 0 24.880562-11.191257 24.880562-24.880562s-11.191257-24.880562-24.880562-24.880562zM500.909446 412.677596c16.487119 0 29.776737-13.389539 29.776737-29.776737s-13.389539-29.776737-29.776737-29.776737c-16.487119 0-29.776737 13.389539-29.776737 29.776737s13.289617 29.776737 29.776737 29.776737zM698.455113 511.600312c-13.689305 0-24.880562 11.091335-24.880562 24.880562 0 13.689305 11.091335 24.880562 24.880562 24.880562 13.689305 0 24.880562-11.091335 24.880562-24.880562-0.099922-13.689305-11.191257-24.880562-24.880562-24.880562z"
                fill="#00C800"
                p-id="7520"
              />
              <path
                d="M511.601093 0.799375C229.12178 0.799375 0.000781 229.820453 0.000781 512.399688s229.021077 511.600312 511.600312 511.600312 511.600312-229.021077 511.600312-511.600312S794.180328 0.799375 511.601093 0.799375z m-90.229508 634.504294c-27.37861 0-49.361436-5.595628-76.839969-10.991413l-76.640125 38.469945 21.882904-65.948477c-54.957065-38.370023-87.73146-87.831382-87.73146-148.084309 0-104.318501 98.722873-186.554254 219.32865-186.554255 107.815769 0 202.34192 65.648712 221.327088 153.979703-6.994536-0.799375-13.989071-1.298985-21.083529-1.298985-104.118657 0-186.454333 77.739266-186.454332 173.564403 0 15.98751 2.498048 31.275566 6.794692 45.964091-6.794692 0.599532-13.689305 0.899297-20.583919 0.899297z m323.547228 76.839969l16.48712 54.757221-60.153006-32.874317c-21.882904 5.495706-43.965652 10.991413-65.848555 10.991413-104.318501 0-186.554254-71.344262-186.554255-159.175644 0-87.631538 82.135831-159.175644 186.554255-159.175644 98.523029 0 186.254489 71.444184 186.254488 159.175644 0.099922 49.461358-32.774395 93.227166-76.740047 126.301327z"
                fill="#00C800"
                p-id="7521"
              />
            </svg>
            <div class="title">微信登录</div>
          </van-grid-item>
          <van-grid-item @click="otherLogin(1)">
            <svg
              t="1571243237084"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7750"
              width="40"
              height="40"
            >
              <path
                d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z"
                fill="#FAAD08"
                p-id="7751"
              />
              <path
                d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z"
                fill="#FAAD08"
                p-id="7752"
              />
              <path
                d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z"
                fill="#000000"
                p-id="7753"
              />
              <path
                d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017"
                fill="#000000"
                p-id="7754"
              />
              <path
                d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453"
                fill="#FFFFFF"
                p-id="7755"
              />
              <path
                d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498"
                fill="#FAAD08"
                p-id="7756"
              />
              <path
                d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135"
                fill="#000000"
                p-id="7757"
              />
              <path
                d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927"
                fill="#FFFFFF"
                p-id="7758"
              />
              <path
                d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574"
                fill="#EB1C26"
                p-id="7759"
              />
              <path
                d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z"
                fill="#EB1C26"
                p-id="7760"
              />
            </svg>
            <div class="title">QQ登录</div>
          </van-grid-item>
        </van-grid>
        <p class="footer">
          温馨提示：
          <br />未注册的手机号，登录时将自动注册，且代表同意
          <a @click.stop="agreement(0)" class="footer__text">用户协议</a>、
          <a @click.stop="agreement(1)" class="footer__text">隐私策略</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { mapActions } from "vuex";
import { getPhoneCaptcha, phoneCaptchaLogin, pwdLogin } from "api";
export default {
  name: "Login",
  data() {
    return {
      active: 0,
      countDown: 0,
      isShowLogin: true,
      username: "",
      password: "",
      smsCaptcha: "",
      phone: "",
      imgCaptcha: "",
      registerUserName: "",
      registerPassword: "",
      smsCaptchaResult: null,
      imgUrl: require("images/login/normal.png")
    };
  },
  computed: {
    /**
     * 手机号验证提示信息
     */
    phoneNumber() {
      let value = this.isShowLogin ? this.phone : this.username;
      if (value.length > 10) {
        return this.verificationFun(value);
      } else {
        return true;
      }
    },
    /**
     * 获取验证码按钮是否可以点击
     */
    captchaDisable() {
      if (this.phone.length > 10 && this.phoneNumber) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //同步用户信息
    ...mapActions(["asyncUserInfo"]),
    //切换图片
    changeImage(index) {
      if (index === 0) {
        this.imgUrl = require("images/login/greeting.png");
      } else if (index === 1) {
        this.imgUrl = require("images/login/blindfold.png");
      } else {
        this.imgUrl = require("images/login/normal.png");
      }
    },
    /**
     * 手机号验证
     */
    verificationFun(value) {
      const regPhone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
      return regPhone.test(value);
    },
    /**
     * 图片验证码
     */
    getCaptcha() {
      let captchaEl = this.$refs.imgCaptcha;
      this.$set(
        captchaEl,
        `src`,
        `http://demo.itlike.com/web/xlmc/api/captcha?time=${new Date()}`
      );
    },
    /**
     * 获取验证码
     */
    async getVerifyCode() {
      this.countDown = 60;
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      let result = await getPhoneCaptcha(this.phone);
      if (result.success_code === 200) {
        this.smsCaptchaResult = result.data.code;
        Dialog.alert({
          title: `温馨提示`,
          message: `验证码获取成功，请在输入框输入：${result.data.code}`
        }).then(() => {});
      }
    },
    /**
     * 账号密码登录/验证码登录
     */
    handleSwitch() {
      this.isShowLogin = !this.isShowLogin;
    },
    /**
     * 登录
     */
    async handleClickLogin() {
      if (this.isShowLogin) {
        if (!this.phoneNumber || this.phone.length < 10) {
          Toast({
            message: `请输入正确的手机号`,
            duration: 800
          });
          return false;
        } else if (
          this.smsCaptcha.length < 1 ||
          Number(this.smsCaptcha) !== Number(this.smsCaptchaResult)
        ) {
          Toast({
            message: `请输入正确的验证码`,
            duration: 800
          });
          return false;
        }
        let result = await phoneCaptchaLogin(this.phone, this.smsCaptcha);
        this.asyncUserInfo(result.data);
        this.$router.back();
      } else {
        if (this.username.length < 1) {
          Toast({
            message: `请输入手机号`,
            duration: 800
          });
          return false;
        } else if (!this.verificationFun(this.username)) {
          Toast({
            message: `手机号格式不正确`,
            duration: 800
          });
          return false;
        } else if (this.password.length < 1) {
          Toast({
            message: `请输入密码`,
            duration: 800
          });
          return false;
        } else if (this.imgCaptcha.length < 1) {
          Toast({
            message: `请输入验证码`,
            duration: 800
          });
          return false;
        }
        let result = await pwdLogin(
          this.username,
          this.password,
          this.imgCaptcha
        );
        this.asyncUserInfo(result.data);
        this.$router.back();
      }
    },
    /**
     * 注册
     */
    async handleClickRegister() {
      if (this.registerUserName.length < 1) {
        Toast({
          message: `请输入手机号`,
          duration: 800
        });
        return false;
      } else if (!this.verificationFun(this.registerUserName)) {
        Toast({
          message: `手机号格式不正确`,
          duration: 800
        });
        return false;
      } else if (this.registerPassword.length < 1) {
        Toast({
          message: `请输入密码`,
          duration: 800
        });
        return false;
      } else if (this.registerPassword.length < 6) {
        Toast({
          message: `密码至少为6位哦`,
          duration: 800
        });
        return false;
      }
      let result = await phoneCaptchaLogin(
        this.registerUserName,
        this.registerUserName
      );
      this.asyncUserInfo(result.data);
      this.$router.back();
    },
    /**
     * 用户协议 隐私
     */
    agreement(value) {
      if (value === 0) {
        Toast({
          message: "用户协议",
          duration: 800
        });
      } else {
        Toast({
          message: "隐私政策",
          duration: 800
        });
      }
    },
    /**
     * 第三方登录
     */
    otherLogin(value) {
      if (value === 0) {
        Toast({
          message: "微信登录-暂未完成",
          duration: 800
        });
      } else {
        Toast({
          message: "QQ登录-暂未完成",
          duration: 800
        });
      }
    },
    /**
     *关闭
     */
    handleClose() {
      this.$router.back();
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: url('../../assets/images/login/back.jpg') no-repeat
  background-size: 100% 100%
  background-attachment: fixed

.login__box
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  opacity: 0.95
  z-index: 500
  font-size: 1.167rem

  .login__form
    position: relative
    padding: 2rem
    width: 26.5rem
    max-width: 90%
    font-size: 1.167rem
    background-color: #fff
    box-sizing: border-box
    border-radius: 8px

  img
    position: absolute
    top: 1rem
    left: 50%
    width: 4rem
    transform: translate(-50%, -70%)
    z-index: 1

    @media screen and (max-width: 320px)
      top: 0.5rem
      width: 5rem
      transform: translate(-50%, -40%)

  .login__close
    position: absolute
    right: 1rem
    top: 0.4rem

  .verificationImage
    position: absolute
    right: 0
    width: 8rem
    height: 3rem
    margin-left: 3rem

  .switchLogin
    margin-top: 1rem
    font-size: 0.78rem
    color: #1989fa

.title
  padding: 0.5rem
  font-size: 0.5rem
  color: #999

.footer
  font-size: 0.8rem
  line-height: 1rem
  color: #666

  .footer__text
    color: #1989fa
</style>

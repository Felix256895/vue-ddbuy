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
            <svg-icon iconClass="wechat" />
            <div class="title">微信登录</div>
          </van-grid-item>
          <van-grid-item @click="otherLogin(1)">
            <svg-icon iconClass="QQ" />
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

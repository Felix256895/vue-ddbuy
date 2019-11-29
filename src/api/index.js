import request from "./request";

const BASE_URL = `https://mock.cangdu.org/mock/5d940466d360e8289c6a8eb7/api/`;

/**
 *获取手机验证码
 */
function getPhoneCaptcha(phone) {
  return request(`${BASE_URL}send_code`, { phone });
}

/**
 *用户登录 手机验证码登录
 */
function phoneCaptchaLogin(phone, captcha) {
  return request(`${BASE_URL}login_code`, { phone, captcha }, `POST`);
}

/**
 * 密码登录
 */
function pwdLogin(userName, pwd, captcha) {
  return request(`${BASE_URL}login_pwd`, { userName, pwd, captcha }, `POST`);
}

export { getPhoneCaptcha, phoneCaptchaLogin, pwdLogin };

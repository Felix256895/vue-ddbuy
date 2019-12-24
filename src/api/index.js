import request from "./request";

const BASE_URL = `http://ddbuy.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/`;
// const BASE_URL = `http://localhost:8080/api/`;

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

/**
 * Home 模块
 */
function getHomeData() {
  return request(`${BASE_URL}homeApi`);
}

/**
 * Home 模块
 * 特色专区
 */
function getHomeSpecialZone() {
  return request(`${BASE_URL}homeApi/specialZone`);
}

/**
 * category 分类模块
 * 列表
 */
function getCategoryData() {
  return request(`${BASE_URL}homeApi/categories`);
}

/**
 * category 分类模块
 */
function getCategoryDetail(params) {
  return request(`${BASE_URL}homeApi/categoriesdetail${params}`);
}

/**
 * 吃什么 模块
 * 所有菜单分类
 */
function getMeunCategoryList() {
  return request(`${BASE_URL}recipe/allScene`);
}
/**
 * 菜品菜单
 * @param {*} params
 */
function getTodayMenuDetail(params) {
  return request(`${BASE_URL}recipe/menulist${params}`);
}
/**
 * 吃什么 模块
 * 菜品菜单
 */
function getMeunDetail(params) {
  return request(`${BASE_URL}recipe/menulist${params}`);
}

/**
 * 购物车
 * 猜你喜欢
 */
function getCartLike() {
  return request(`${BASE_URL}cart/youlike`);
}

/**
 * 个人中心
 * 绿卡VIP
 */
function getMyVip() {
  return request(`${BASE_URL}vip`);
}

export {
  getPhoneCaptcha,
  phoneCaptchaLogin,
  pwdLogin,
  getHomeData,
  getHomeSpecialZone,
  getCategoryData,
  getCategoryDetail,
  getMeunCategoryList,
  getMeunDetail,
  getCartLike,
  getMyVip,
  getTodayMenuDetail
};

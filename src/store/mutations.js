import {
  INIT_USER_INFO,
  USER_INFO,
  INIT_SHOP_CART,
  ADD_TO_CART,
  ADD_GOODS,
  CHANGE_USER_NICK_NAME,
  USER_INFO_BRITHDAY,
  USER_INFO_SEX,
  LOGIN_OUT,
  INIT_USER_SHOPPING_ADDRESS,
  ADD_USER_SHOPPING_ADDRESS,
  DELETE_USER_SHOPPING_ADDRESS,
  CHANGE_USER_SHOPPING_ADDRESS,
  REDUCE_GOODS,
  SINGLE_SELECT_GOODS,
  ALL_SELECT_GOODS,
  DELETE_SELECT_GOODS
} from "./mutation-type";
import Vue from "vue";
import { setStore, getStore, remove } from "../config/global";
import router from "@/router";
import { Toast } from "vant";
export default {
  /**
   * 用户信息
   * @param {*} state
   * @param {*} param1
   */
  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
    setStore("userInfo", state.userInfo);
  },

  /**
   * 初始化用户信息
   * @param {*} state
   */
  [INIT_USER_INFO](state) {
    let initUserInfo = getStore("userInfo");
    if (initUserInfo) {
      state.userInfo = JSON.parse(initUserInfo);
    }
  },

  /**
   * 修改昵称
   * @param {*} state
   * @param {*} param1
   */
  [CHANGE_USER_NICK_NAME](state, { nickName }) {
    let userInfo = state.userInfo;
    Object.keys(userInfo).forEach(info => {
      if (info === "user_name") {
        userInfo["user_name"] = nickName;
      }
    });
    state.userInfo = {
      ...userInfo
    };
    setStore("userInfo", state.userInfo);
  },

  /**
   * 用户生日
   * @param {*} state
   * @param {*} param1
   */
  [USER_INFO_BRITHDAY](state, { brithday }) {
    let userInfo = state.userInfo;
    Object.values(userInfo).forEach(info => {
      if (info.brithday) {
        info.brithday = brithday;
      } else {
        Vue.set(userInfo, "brithday", brithday);
      }
    });
    state.userInfo = {
      ...userInfo
    };
    setStore("userInfo", state.userInfo);
  },

  /**
   * 用户性别
   * @param {*} state
   * @param {*} param1
   */
  [USER_INFO_SEX](state, { sex }) {
    let userInfo = state.userInfo;
    Object.values(userInfo).forEach(info => {
      if (info.sex) {
        info.sex = sex;
      } else {
        Vue.set(userInfo, "sex", sex);
      }
    });
    state.userInfo = {
      ...userInfo
    };
    setStore("userInfo", state.userInfo);
  },

  /**
   * 退出登录
   * @param {*} state
   */
  [LOGIN_OUT](state) {
    state.userInfo = {};
    state.shopCart = {};
    remove("userInfo");
    remove("shopCart");
    remove("shoppingAddress");
  },

  /**
   * 初始化获取用户收货地址
   * @param {*} state
   */
  [INIT_USER_SHOPPING_ADDRESS](state) {
    let initUserShoppingAddress = getStore("shoppingAddress");
    if (initUserShoppingAddress) {
      state.shoppingAddress = JSON.parse(initUserShoppingAddress);
    } else {
      state.shoppingAddress = [];
    }
  },

  /**
   * 新增收货地址
   * @param {*} state
   * @param {*} param1
   */
  [ADD_USER_SHOPPING_ADDRESS](state, { content }) {
    let shoppingAddress = state.shoppingAddress;
    shoppingAddress.push(content);
    state.shoppingAddress = [...shoppingAddress];
    setStore("shoppingAddress", state.shoppingAddress);
  },

  /**
   * 修改收货地址
   * @param {*} state
   * @param {*} param1
   */
  [CHANGE_USER_SHOPPING_ADDRESS](state, { content }) {
    let shoppingAddress = state.shoppingAddress;
    for (let i = 0; i < shoppingAddress.length; i++) {
      shoppingAddress[i] = content;
      break;
    }
    state.shoppingAddress = [...shoppingAddress];
    setStore("shoppingAddress", state.shoppingAddress);
  },

  /**
   * 删除收货地址
   * @param {*} state
   * @param {*} param1
   */
  [DELETE_USER_SHOPPING_ADDRESS](state, { id }) {
    let shoppingAddress = state.shoppingAddress;
    for (let i = 0; i < shoppingAddress.length; i++) {
      if (shoppingAddress[i].id === id) {
        shoppingAddress.splice(i, 1);
        break;
      }
    }
    state.shoppingAddress = [...shoppingAddress];
    setStore("shoppingAddress", state.shoppingAddress);
  },

  /**
   * 购物车本地数据
   * @param {*} state
   */
  [INIT_SHOP_CART](state) {
    let initShopCart = getStore("shopCart");
    if (initShopCart) {
      state.shopCart = JSON.parse(initShopCart);
    }
  },

  /**
   * 添加商品
   * @param {*} state
   * @param {*} param1
   */
  [ADD_GOODS](state, { goodsId, goodsName, goodsSmallImage, goodsPrice }) {
    let shopCart = state.shopCart;
    if (shopCart[goodsId]) {
      shopCart[goodsId]["num"]++;
    } else {
      shopCart[goodsId] = {
        num: 1,
        id: goodsId,
        name: goodsName,
        smallImage: goodsSmallImage,
        price: goodsPrice,
        checked: true
      };
      state.shopCart = {
        ...shopCart
      };
    }
    setStore("shopCart", state.shopCart);
  },

  /**
   * 添加商品到购物车
   * @param {*} state
   * @param {*} goods
   */
  [ADD_TO_CART](state, goods) {
    if (state.userInfo.token) {
      setTimeout(() => {
        this.commit("ADD_GOODS", {
          goodsId: goods.id,
          goodsName: goods.name,
          goodsSmallImage: goods.small_image,
          goodsPrice: goods.price
        });
        Toast({
          message: "成功加入购物车",
          duration: 800
        });
      }, 900);
    } else {
      router.push("/login");
    }
  },

  /**
   * 减商品
   * @param {*} state
   * @param {*} param1
   */
  [REDUCE_GOODS](state, { goodsId }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsId];
    if (goods) {
      if (goods["num"] > 0) {
        goods["num"]--;
      }
      if (goods["num"] === 0) {
        delete shopCart[goodsId];
      }
      state.shopCart = {
        ...shopCart
      };
      setStore("shopCart", state.shopCart);
    }
  },

  /**
   * 单个商品选中
   * @param {*} state
   * @param {*} param1
   */
  [SINGLE_SELECT_GOODS](state, { goodsId }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsId];
    if (goods) {
      if (goods.checked) {
        goods.checked = !goods.checked;
      } else {
        Vue.set(goods, "checked", true);
      }
    }
    state.shopCart = {
      ...shopCart
    };
    setStore("shopCart", state.shopCart);
  },

  /**
   * 全选商品
   * @param {*} state
   * @param {*} param1
   */
  [ALL_SELECT_GOODS](state, { isCheckedAll }) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach(goods => {
      if (goods.checked) {
        goods.checked = !isCheckedAll;
      } else {
        Vue.set(goods, "checked", !isCheckedAll);
      }
    });
    state.shopCart = {
      ...shopCart
    };
    setStore("shopCart", state.shopCart);
  },

  /**
   * 删除选中商品
   * @param {*} state
   */
  [DELETE_SELECT_GOODS](state) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach(goods => {
      if (goods.checked) {
        delete shopCart[goods.id];
      }
    });
    state.shopCart = {
      ...shopCart
    };
    setStore("shopCart", state.shopCart);
  }
};

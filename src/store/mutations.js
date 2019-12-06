import {
  INIT_USER_INFO,
  USER_INFO,
  INIT_SHOP_CART,
  ADD_TO_CART,
  ADD_GOODS
} from "./mutation-type";
import { setStore, getStore } from "../config/global";
import router from "@/router";
import { Toast } from "vant";
export default {
  //用户信息
  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
    setStore("userInfo", state.userInfo);
  },
  //初始化用户信息
  [INIT_USER_INFO](state) {
    let initUserInfo = getStore("userInfo");
    if (initUserInfo) {
      state.userInfo = JSON.parse(initUserInfo);
    }
  },
  //购物车本地数据
  [INIT_SHOP_CART](state) {
    let initShopCart = getStore("shopCart");
    if (initShopCart) {
      state.shopCart = JSON.parse(initShopCart);
    }
  },
  [ADD_GOODS](state, { goodsId, goodsName, smallImage, goodsPrice }) {
    let shopCart = state.shopCart;
    if (shopCart[goodsId]) {
      shopCart[goodsId]["num"]++;
    } else {
      shopCart[goodsId] = {
        num: 1,
        id: goodsId,
        name: goodsName,
        smallImage: smallImage,
        price: goodsPrice,
        checked: true
      };
      state.shopCart = {
        ...shopCart
      };
    }
    setStore("shopCart", state.shopCart);
  },
  //添加商品到购物车
  [ADD_TO_CART](state, goods) {
    if (state.userInfo.token) {
      setTimeout(() => {
        this.commit("ADD_GOODS", {
          goodsId: goods.id,
          goodsName: goods.name,
          smallImage: goods.small_image,
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
  }
};

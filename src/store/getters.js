import {
  SELECTED_GOODS,
  SELECTED_GOODS_COUNT,
  SELECTED_GOODS_PRICE,
  USER_SEX
} from "./mutation-type";

export default {
  /**
   * 选中商品数量
   * @param {*} state
   */
  [SELECTED_GOODS_COUNT](state) {
    let count = 0;
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach(goods => {
      if (goods.checked) {
        count++;
      }
    });
    return count;
  },

  /**
   * 选中商品
   * @param {*} state
   */
  [SELECTED_GOODS](state) {
    const goodsArray = [];
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach(goods => {
      if (goods.checked) {
        goodsArray.push(shopCart[goods.id]);
      }
    });
    return goodsArray;
  },

  /**
   * 选中商品的价格
   * @param {*} state
   */
  [SELECTED_GOODS_PRICE](state) {
    let totalPrice = 0;
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach(goods => {
      if (goods.checked) {
        totalPrice += goods.price * goods.num * 100;
      }
    });
    return totalPrice;
  },

  /**
   * 性别
   * @param {*} state
   */
  [USER_SEX](state) {
    let sex = state.userInfo.sex;
    switch (sex) {
      case "1":
        return "美女";
      case "2":
        return "帅哥";
      default:
        return "未填写";
    }
  }
};

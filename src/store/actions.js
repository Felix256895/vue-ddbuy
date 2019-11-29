import { USER_INFO } from "./mutation-type";
import { getStore } from "../config/global";

export default {
  //同步用户信息
  asyncUserInfo({ commit }, userInfo) {
    commit(USER_INFO, {
      userInfo
    });
  },
  //本地存在token 自动登录
  autoLogin({ commit }) {
    let userInfo = getStore("userInfo");
    if (userInfo) {
      commit(USER_INFO, {
        userInfo
      });
    }
  }
};

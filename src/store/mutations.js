import { INIT_USER_INFO, USER_INFO } from "./mutation-type";
import { setStore, getStore } from "../config/global";
export default {
  //用户信息
  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
    setStore("userInfo", state.userInfo);
  },
  //初始化用户信息
  [INIT_USER_INFO](state) {
    let initUserInfo = getStore("userInfo");
    if (initUserInfo) state.userInfo = JSON.parse(initUserInfo);
  }
};

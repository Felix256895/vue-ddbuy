<template>
  <div class="addAddress">
    <van-nav-bar
      title="添加地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
      style="height: 2.5rem"
    ></van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      show-delete
      style="margin-top:3rem"
    />
  </div>
</template>
<script>
// import { Toast } from "vant";
import areaList from "../../../../config/area";
import { mapMutations } from "vuex";
export default {
  name: "addAddress",
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  methods: {
    ...mapMutations(["ADD_USER_SHOPPING_ADDRESS"]),
    onClickLeft() {
      this.$router.back();
    },
    onSave(content) {
      let addressID = this.addressID().toString();
      content["id"] = addressID;
      content["address"] =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      this.ADD_USER_SHOPPING_ADDRESS({
        addressID,
        content
      });
      this.$router.back();
    },
    // 生成不重复的id
    addressID() {
      var lastUuid = 0;
      return new Date().getTime() * 1000 + (lastUuid++ % 1000);
    }
  }
};
</script>
<style lang="stylus" scoped>
.addAddress
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #f5f5f5
  z-index: 1000
</style>

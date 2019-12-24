<template>
  <div class="searchHeader">
    <div class="searchHeader__searchBox" @click="goSearch">
      <svg-icon
        iconClass="search"
        style="width:0.9rem;height:0.9rem"
      ></svg-icon>
      <span class="search__prompt">输入商品名称</span>
    </div>
    <div class="collect" @click="goCollect">
      <svg-icon iconClass="collect" style="width:1.2rem;height:1.2rem" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "search",
  data() {
    return {};
  },
  methods: {
    goSearch() {
      Toast({
        message: "搜索功能暂时为实现～",
        duration: 800
      });
    },
    goCollect() {
      Toast({
        message: "收藏功能暂时为实现～",
        duration: 800
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.searchHeader
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 999
  background-color: #fff
  padding: 0.5rem 0.625rem
  display: flex
  align-items: center

.searchHeader__searchBox
  flex-grow: 1
  height: 1.75rem
  display: flex
  align-items: center
  background-color: #f2f2f2
  border-radius: 1.75rem
  font-size: 0.8rem
  padding-left: 0.5rem

.search__prompt
  color: #b5b5b5
  margin-left: 0.5rem

.collect
  margin-left: 0.625rem
</style>

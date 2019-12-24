<template>
  <div class="searchHeader">
    <div class="searchHeader__searchBox" @click="goSearch">
      <svg-icon
        iconClass="search"
        style="width:0.9rem;height:0.9rem"
      ></svg-icon>
      <span class="search__prompt">输入商品名称</span>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "SearchHeader",
  data() {
    return {};
  },
  methods: {
    goSearch() {
      Toast({
        message: "搜索功能暂时为实现～",
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
  border-bottom: 1px solid #e6e6e6
  background-color: #fff
  padding: .5rem .625rem
.searchHeader__searchBox
  height: 1.75rem
  display: flex
  align-items: center
  background-color: #f2f2f2
  border-radius: 1.75rem
  font-size: .8rem
  padding-left: .5rem
.search__prompt
  color: #b5b5b5
  margin-left: .5rem
</style>

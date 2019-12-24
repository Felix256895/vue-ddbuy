<template>
  <div class="menuContainer">
    <div class="menuLists" ref="menuLists" v-show="isShowMenuList">
      <div class="menuWrapper">
        <p class="menuTitle" v-if="recentlyChooseLists.length > 0">最近找过</p>
        <ul class="list">
          <li class="item" v-for="item in recentlyChooseLists" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
        <p class="menuTitle">菜单分类</p>
        <ul class="list">
          <li
            class="item"
            v-for="(item, index) in todyMenuList"
            :key="item.id"
            @click="menuTitle(index)"
            :class="{ selected: currentIndex === index }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <MenuWaterFall v-show="!isShowMenuList" />
  </div>
</template>
<script>
import Pubsub from "pubsub-js";
import { EAT_MENUTITLE_CLICK } from "@/config/pubsub_type";
import MenuWaterFall from "../menuWaterFall";
export default {
  name: "mrnuLists",
  props: {
    todyMenuList: {
      type: Array
    },
    currentIndex: {
      type: Number
    },
    isShowMenuList: {
      type: Boolean
    }
  },
  components: {
    MenuWaterFall
  },
  data() {
    return {
      recentlyChooseLists: []
    };
  },
  methods: {
    menuTitle(index) {
      Pubsub.publish(EAT_MENUTITLE_CLICK, index);
      // 2.通知父组件来隐藏当前菜单栏
      this.$emit("hiddenMenu");
      if (this.recentlyChooseLists.length <= 7) {
        this.recentlyChooseLists.unshift(this.todyMenuList[index]);
      } else {
        this.recentlyChooseLists.pop();
        this.recentlyChooseLists.unshift(this.todyMenuList[index]);
      }
      this.recentlyChooseLists = Array.from(new Set(this.recentlyChooseLists));
    }
  }
};
</script>
<style lang="stylus" scoped>
.menuContainer
  padding-top: 4rem

.menuLists
  padding: 0.5rem
  background-color: #fff
  overflow: auto

.menuWrapper
  padding-top: 0.5rem

  .menuTitle
    font-size: 0.6rem
    color: #666

  .list
    padding: 0.5rem 0 0.5rem 0.7rem
    display: flex
    flex-flow: row wrap
    justify-content: flex-start

  .item
    text-align: center
    margin-right: 1.45rem
    margin-top: 0.4rem
    width: 3.3rem
    line-height: 1.5rem
    height: 1.5rem
    font-size: 0.6rem
    border-radius: 1rem
    color: rgba(0, 0, 0, 0.7)
    border: 1px solid #dedede

    &.selected
      color: #3cb963
      border: 1px solid #3cb963
</style>

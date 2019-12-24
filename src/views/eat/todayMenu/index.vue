<template>
  <div class="todayMenu">
    <div v-if="!isShowLoading">
      <div class="subTodayMenu">
        <h2 class="title">今日菜单</h2>
        <div class="subTitle__container" ref="subTitle">
          <ul class="subTitle__list" ref="subTitle__list">
            <li
              class="subTitle__item"
              v-for="(item, index) in todyMenuList"
              :key="item.id"
              :class="{ selected: currentIndex === index }"
              ref="subTitle__item"
              @click="clickItem(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="menuDrop" @click="clickAll">
          {{ msg }}
          <svg-icon
            v-if="menuDown"
            iconClass="down"
            style="width:1.5rem;height:1.5rem"
          />
          <svg-icon v-else iconClass="up" style="width:1.5rem;height:1.5rem" />
        </div>
      </div>
      <menu-list
        :todyMenuList="todyMenuList"
        :currentIndex="currentIndex"
        :isShowMenuList="isShowMenuList"
        v-on:hiddenMenu="clickAll"
      />
    </div>
    <v-loading v-if="isShowLoading" />
  </div>
</template>
<script>
import { getMeunCategoryList } from "api";
import BScroll from "better-scroll";
import MenuList from "../menuLists";
import PubSub from "pubsub-js";
import { EAT_MENUTITLE_CLICK } from "@/config/pubsub_type";
export default {
  name: "todayMenu",
  components: {
    MenuList
  },
  data() {
    return {
      isShowLoading: true,
      menuDown: true,
      isShowMenuList: false,
      currentIndex: 0,
      todyMenuList: [],
      msg: `全部`
    };
  },
  watch: {
    menuDown() {
      this.msg = this.menuDown ? `全部` : `收起`;
    }
  },
  methods: {
    async initData() {
      const response = await getMeunCategoryList();
      console.log(response);
      if (response.success) {
        this.todyMenuList = response.data.list;
        this.$nextTick(() => {
          this.initMenuScroll();
        });
      }
      this.isShowLoading = false;
    },
    initMenuScroll() {
      this.$nextTick(() => {
        if (!this.menuScroll) {
          let menuListWidth = 180;
          let items = this.$refs.subTitle__item;
          for (let i = 0; i < items.length; i++) {
            menuListWidth += items[i].clientWidth * 1.18;
          }
          this.$refs.subTitle__list.style.width = menuListWidth + `px`;
          this.menuScroll = new BScroll(".subTitle__container", {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true
          });
        } else {
          this.menuScroll.refresh();
        }
      });
    },
    clickItem(index) {
      this.currentIndex = index;
      let el = this.$refs.subTitle__item[index];
      this.menuScroll.scrollToElement(el, 500);
      if (!this.menuDown) {
        this.clickAll();
      }
    },
    clickAll() {
      this.menuDown = !this.menuDown;
      this.isShowMenuList = !this.isShowMenuList;
    }
  },
  mounted() {
    this.initData();
    PubSub.subscribe(EAT_MENUTITLE_CLICK, (msg, index) => {
      // 点击顶部滑动菜单
      this.clickItem(index);
    });
  },
  beforeDestroy() {
    PubSub.unsubscribe(EAT_MENUTITLE_CLICK);
  }
};
</script>
<style lang="stylus" scoped>
.todayMenu
  width: 100%
  margin-top: 2.75rem
  margin-bottom: 3rem
  overflow: hidden

.subTodayMenu
  position: fixed
  width: 100%
  background-color: #fff
  z-index: 999

  .title
    margin-top: 0.9rem
    margin-left: 0.4rem
    padding-left: 0.5rem
    height: 1.5rem
    line-height: 1.5rem
    border-left: 4px solid #75a342
    font-size: 1rem
    font-weight: 2000

  .subTitle__container
    width: 100%
    height: 1.5rem
    overflow: hidden
    white-space: nowrap
    margin-top: 0.5rem

  .subTitle__list
    display: flex

    .subTitle__item
      height: 1.4rem
      padding: 0 0.3rem
      line-height: 1.4rem
      box-sizing: border-box
      border: 1px solid #dedede
      margin-right: 0.5rem
      border-radius: 8px
      font-size: 0.7rem

      &.selected
        color: #3cb963
        border: 1px solid #3cb963

  .menuDrop
    position: fixed
    top: 4.6rem
    right: 0
    background-color: #fff
    font-size: 0.7rem
    padding: 0.5rem
    color: #666
</style>

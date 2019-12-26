<template>
  <div class="category">
    <search-header></search-header>
    <div class="category__content" v-if="!isShowLoading">
      <div class="category__content__left">
        <ul class="left__list">
          <li
            class="left__list__item"
            v-for="(item, index) in categories"
            :key="item.id"
            ref="menuList"
            :class="{ selected: currentIndex === index }"
            @click="handleLeft(index)"
          >
            <span class="left__text">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <content-view
        v-if="!isShowLoadingGif"
        :categoryDetail="categoryDetail"
      ></content-view>
    </div>
    <v-loading v-if="isShowLoading" />
    <v-loading v-if="isShowLoadingGif" />
  </div>
</template>
<script>
import SearchHeader from "./components/searchHeader";
import { getCategoryData, getCategoryDetail } from "api";
import BScroll from "better-scroll";
import ContentView from "./components/contentView";
export default {
  name: "Category",
  components: {
    SearchHeader,
    ContentView
  },
  data() {
    return {
      currentIndex: 0,
      isShowLoading: true,
      isShowLoadingGif: true,
      categories: [],
      categoryDetail: []
    };
  },
  activated() {
    this.$nextTick(() => {
      const currentIndex = this.$route.params.currentIndex;
      if (currentIndex >= 0) {
        this.handleLeft(currentIndex + 1);
      }
    });
  },
  methods: {
    async initData() {
      const leftData = await getCategoryData();
      if (leftData.success) {
        this.categories = leftData.data.cate;
      }
      const rightData = await getCategoryDetail("/lk001");
      if (rightData.success) {
        this.categoryDetail = rightData.data.cate;
      }
      this.isShowLoading = false;
      this.isShowLoadingGif = false;
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.leftScroll = new BScroll(".category__content__left", {
            tap: true,
            click: true,
            probeType: 3,
            scrollY: true,
            mouseWheel: true
          });
        } else {
          this.leftScroll.refresh();
        }
      });
    },
    async handleLeft(index) {
      this.isShowLoadingGif = true;
      this.currentIndex = index;
      this._timer = setTimeout(() => {
        const menuLists = this.$refs.menuList;
        const el = menuLists[index];
        this.leftScroll.scrollToElement(el, 300);
      }, 800);
      let params = index >= 9 ? `/lk0${index + 1}` : `/lk00${index + 1}`;
      const rightData = await getCategoryDetail(params);
      if (rightData.success) {
        this.categoryDetail = rightData.data.cate;
      }
      this.isShowLoadingGif = false;
    }
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    clearTimeout(this._timer);
  }
};
</script>
<style lang="stylus" scoped>
.category
  width: 100%
  height: 100%
  background-color: #f5f5f5
  overflow: hidden

.category__content
  display: flex
  position: absolute
  top: 2.75rem
  bottom: 3rem
  width: 100%
  overflow: hidden

.category__content__left
  width: 5.3125rem
  flex: 0 0 5.3125rem
  background-color: #f4f4f4

.left__text
  line-height: 1.25rem
  border-left: solid 0.1875rem transparent
  padding: 0.3125rem 0.6875rem
  font-size: 0.75rem
  color: #666
  display: flex
  justify-content: center

.left__list__item
  padding: 0.75rem 0
  border-bottom: 1px solid #e8e9e8

  &.selected
    background-color: #fff

    .left__text
      border-left-color: #3cb963
      font-weight: bold
      font-size: 0.8rem
      color: #000
</style>

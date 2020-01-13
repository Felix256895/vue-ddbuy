<template>
  <div class="vipMenu" ref="vipMenu">
    <ul class="vipMenu__box" ref="vipMenuBox">
      <li
        class="vipMenu__box__item"
        v-for="(item, index) in menuTitlesArray"
        :key="item.id"
        @click="menuClick(index)"
        :class="{ selected: selected === index }"
        ref="vipItem"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "vipMenuScroll",
  props: {
    menuTitlesArray: {
      type: Array
    }
  },
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    menuClick(index) {
      this.selected = index;
      let el = this.$refs.vipItem[index];
      this.menuScroll.scrollToElement(el, 500);
      this.$emit("menuTitleClick", index);
    },
    initMenuScroll() {
      let contentWidth = 5;
      let items = this.$refs.vipItem;
      for (let i = 0; i < items.length; i++) {
        contentWidth += items[i].clientWidth;
      }
      this.$refs.vipMenuBox.style.width = contentWidth + `px`;
      if (!this.menuScroll) {
        this.menuScroll = new BScroll(".vipMenu", {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        });
      } else {
        this.menuScroll.refresh();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMenuScroll();
    });
  }
};
</script>
<style lang="stylus" scoped>
.vipMenu
  width: 100%
  height: 2.5rem
  background-color: #fff
  border-bottom: 1px solid #e8e9e8
  overflow: hidden
  box-sizing: border-box
  position: relative

  .vipMenu__box
    display: flex
    white-space: nowrap
    height: 2.5rem
    align-items: center

    .vipMenu__box__item
      font-size: 0.73rem
      padding: 0 1rem

      &.selected
        color: #3cb963
</style>

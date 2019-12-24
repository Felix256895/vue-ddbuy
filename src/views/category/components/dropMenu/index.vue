<template>
  <div class="dropMenu" v-if="menuDown" @touchmove.prevent @click="touchClick">
    <div class="dropMenu__box">
      <ul class="dropmenu__list">
        <li
          class="dropmenu__list__item"
          v-for="(item, index) in categoryDetail"
          :key="item.id"
          @click="itemClick(index)"
          :class="{ selected: currentIndex === index }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "DropMenu",
  props: {
    menuDown: {
      type: Boolean
    },
    categoryDetail: {
      type: Array
    },
    currentIndex: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    touchClick() {
      this.$emit("touchClick");
    },
    itemClick(index) {
      this.$emit("itemClick", index);
    }
  }
};
</script>
<style lang="stylus" scoped>
.dropMenu
  position: fixed
  top: 5.38rem
  bottom: 3rem
  z-index: 100
  background-color: rgba(0, 0, 0, 0.1)

.dropMenu__box
  background-color: #fff
  padding-bottom: 0.5rem

.dropmenu__list
  display: flex
  flex-wrap: wrap

  .dropmenu__list__item
    width: 4.67rem
    height: 1.5rem
    font-size: 0.7rem
    margin-left: 0.5rem
    text-align: center
    line-height: 1.5rem
    margin-top: 0.5rem
    background-color: #f4f4f4
    border-radius: 3px
    color: #666

    &.selected
      color: #3cb963
      background-color: rgba(85, 192, 199, 0.15)

@keyframes animate
  from
    height: 0
    top: 0

  to
    height: 90%
    top: 0px
</style>

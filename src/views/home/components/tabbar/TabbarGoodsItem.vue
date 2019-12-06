<template>
  <div class="tabbarGoodsItem">
    <van-tabs
      v-model="active"
      animated
      swipeable
      sticky
      :border="false"
      :offset-top="47"
      ref="tabs"
      type="line"
      color="#28BE57"
      title-active-color="#28BE57"
      animated:yes
    >
      <van-tab v-for="item in itemsTitle" :key="item.title">
        <div slot="title">{{ item.title }}</div>
        {{ item.title }}
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "TabbarGoodsItem",
  props: {
    tabbarlist: {
      type: Array
    },
    flashSaleList: {
      type: Array
    }
  },
  data() {
    return {
      active: 0,
      itemsTitle: [
        {
          title: "全部",
          data: this.tabbarlist
        },
        {
          title: "晚餐",
          data: this.flashSaleList
        },
        {
          title: "人气",
          data: this.tabbarlist
        },
        {
          title: "心选",
          data: this.flashSaleList
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.tabbarGoodsItem
  width: 100%
</style>

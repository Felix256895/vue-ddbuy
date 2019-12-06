<template>
  <div>
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="(item, index) in navList"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
        @click="handleClick(index)"
      />
    </van-grid>
  </div>
</template>
<script>
export default {
  name: "Nav",
  props: {
    navList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(index) {
      this.$router.push({ name: "category", params: { currentIndex: index } });
    }
  }
};
</script>
<style lang="stylus" scoped></style>

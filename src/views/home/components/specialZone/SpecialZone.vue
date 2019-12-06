<template>
  <div class="specialZone">
    <div class="specialZone__title">特色专区</div>
    <div class="specialZone__new__hot">
      <div
        class="newItem special"
        v-for="item in specialZone.newItemList"
        :key="item.id"
      >
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <img class="itemImg" v-lazy="item.imageOne" alt />
        <img class="itemImg" v-lazy="item.imageTwo" src alt />
      </div>
      <div
        class="hotItem special"
        v-for="item in specialZone.hotItemList"
        :key="item.id"
      >
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <img class="itemImg" v-lazy="item.imageOne" alt />
        <img class="itemImg" v-lazy="item.imageTwo" src alt />
      </div>
    </div>
    <div class="specialZone__list">
      <div
        class="vipItem"
        v-for="item in specialZone.vipItemList"
        :key="item.id"
      >
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <img class="itemImg" v-lazy="item.imageOne" alt />
        <img class="itemImg" v-lazy="item.imageTwo" src alt />
      </div>
      <div
        class="otherItem"
        v-for="item in specialZone.otherItemList"
        :key="item.id"
      >
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <img
          class="itemImg"
          src="../../../../assets/images/special/peanut.jpeg"
          alt
        />
      </div>
      <div
        class="parityItem"
        v-for="item in specialZone.lowPriceItemList"
        :key="item.id"
      >
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <img class="itemImg" v-lazy="item.image" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpecialZone",
  props: {
    specialZone: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.specialZone
  margin-top: 0.625rem
  padding: 1.25rem 0 0.9375rem 0
  background-color: #fff

.specialZone__title
  margin: 0 0.625rem 0.625rem
  padding-left: 0.3125rem
  border-left: 4px solid #3bba63
  font-size: 1.1875rem

.specialZone__new__hot
  display: flex
  width: 95%
  margin: auto
  border: 1px solid #dddbc0
  height: 5rem
  // border-bottom: none

.specialZone__list
  display: flex
  width: 95%
  margin: auto
  border: 1px solid #dddbc0
  height: 5rem
  border-top: none

.itemImg
  width: 3.2rem
  height: 2.5rem
  padding: 0.3rem 0.5rem 0rem 0.7rem

.special
  flex-grow: 1

.vipItem
  flex-grow: 2

.parityItem, .otherItem
  flex-grow: 1

.title
  font-size: 0.625rem
  padding-left: 0.5rem
  padding-top: 0.5rem

.subtitle
  font-size: 0.45rem
  color: #999
  padding-left: 0.5rem
  padding-top: 0.3rem

.newItem, .vipItem
  border-right: 1px solid #dddbc0

.newItem, .hotItem
  .title
    color: red

.vipItem
  .title
    color: #3bba63

.itemImg__box
  display: flex
  justify-content: space-around
  align-items: center
</style>

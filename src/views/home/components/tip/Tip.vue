<template>
  <div class="tip">
    <div class="tip__box">
      <div class="tip__box__item">
        <img
          class="tip__item__img"
          src="../../../../assets/images/icon/transport.png"
          alt
        />
        <span class="tip__item__text">最快20分钟送达</span>
      </div>
      <div class="tip__box__item">
        <img
          class="tip__item__img"
          src="../../../../assets/images/icon/money.png"
          alt
        />
        <span class="tip__item__text">0元起送 0配送费</span>
      </div>
      <div class="tip__box__item">
        <img
          class="tip__item__img"
          src="../../../../assets/images/icon/seal.png"
          alt
        />
        <span class="tip__item__text">安心退</span>
      </div>
    </div>
    <div class="tip__img">
      <img :src="home_ad" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "Tip",
  props: {
    home_ad: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.tip
  margin-top: 0.3rem

.tip__box
  display: flex
  justify-content: center

.tip__box__item
  flex-grow: 1

.tip__item__img
  width: 1rem
  height: 1rem
  vertical-align: middle

.tip__item__text
  font-size: 0.6rem
  color: #45c763

.tip__img
  width: 100%
  height: 6rem
  margin-top: 0.8rem

  img
    width: 100%
    height: 100%
</style>

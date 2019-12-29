<template>
  <div class="editNickName">
    <van-nav-bar
      title="修改昵称"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      style="height: 2.5rem"
    />
    <van-cell-group title="请输入新昵称">
      <van-field
        v-model="nickName"
        clearable
        ref="field"
        :placeholder="nickName"
      />
    </van-cell-group>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "editNickName",
  data() {
    return {
      nickName: this.$route.params.nickName
    };
  },
  methods: {
    ...mapMutations(["CHANGE_USER_NICK_NAME"]),
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      const nickName = this.nickName;
      if (nickName.length > 0) {
        this.CHANGE_USER_NICK_NAME({ nickName });
        this.$router.back();
        Toast({
          message: "个人资料修改成功",
          duration: 800
        });
      } else {
        Toast({
          message: "请输入昵称",
          duration: 800
        });
      }
    }
  },
  mounted() {
    this.$refs.field.focus();
  }
};
</script>
<style lang="stylus" scoped>
.editNickName
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #f5f5f5
  z-index: 999

.van-nav-bar__text
  color: #45c763

.van-icon-arrow-left
  color: #45c763
</style>

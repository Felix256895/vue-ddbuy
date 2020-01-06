<template>
  <div class="timeList">
    <van-popup
      v-model="showDateTimePopView"
      round
      lock-scroll
      closeable
      @closed="closePopView"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="time__title">
        <span class="time__title__text">选择送达时间</span>
      </div>
      <div class="content">
        <ul class="content__left">
          <li
            class="content__left__item"
            v-for="(item, index) in leftDateData"
            :class="{ selected: currentIndex === index }"
            :key="item.time"
            @click="clickLeft(index)"
          >
            {{ item.time }}
          </li>
        </ul>
        <ul class="content__right">
          <li
            class="content__right__item"
            v-for="(item, index) in timeList.today"
            :class="{ checked: todayIndex === index }"
            :key="index.id"
            v-show="!currentIndex"
            @click="clickTodayTimeList(index, item)"
          >
            {{ item }}
            <van-icon
              name="success"
              style="margin-left:40%"
              v-show="todayIndex === index"
            />
          </li>
          <li
            class="content__right__item"
            v-for="(item, index) in timeList.tomory"
            :class="{ checked: tomoryIndex === index }"
            :key="index.id"
            @click="clickTomoryTimeList(index, item)"
            v-show="currentIndex"
          >
            {{ item }}
            <van-icon
              name="success"
              style="margin-left:40%"
              v-show="tomoryIndex === index"
            />
          </li>
        </ul>
      </div>
      <div class="sureButton" @click="sureCheckTime">
        确定
      </div>
    </van-popup>
  </div>
</template>
<script>
import moment from "moment";
import "moment/locale/zh-cn";
import "twix";

export default {
  name: "timeList",
  props: {
    showDateTimePopView: Boolean
  },
  data() {
    return {
      currentIndex: 0,
      todayIndex: 0,
      tomoryIndex: 0,
      chooseDeliveryTime: ""
    };
  },
  computed: {
    leftDateData() {
      let today = "今天" + moment().format("MMMDo");
      let tomory =
        "明天" +
        moment()
          .add(1, "days")
          .format("MMMDo");
      const dateArray = [
        {
          time: today
        },
        {
          time: tomory
        }
      ];
      return dateArray;
    },
    timeList() {
      let hour = moment().hour();
      let minute = moment().minute();
      if (minute < 30) {
        minute = 30;
      } else {
        hour += 1;
        minute = `00`;
      }
      let currentTime = hour + `:` + minute;
      let todays = this.timeInterValList(currentTime, `23:00`);
      let tomorys = this.timeInterValList(`07:00`, `23:00`);
      return { today: todays, tomory: tomorys };
    }
  },
  methods: {
    clickLeft(index) {
      this.currentIndex = index;
    },
    timeInterValList(start, end) {
      let newData = moment().format(`YYYY-MM-DD`);
      let t = moment(`${newData}T${start}`).twix(`${newData}T${end}`);
      return t.split(30, "minutes").map(st => st.format({ hideDate: true }));
    },
    clickTodayTimeList(index, item) {
      this.todayIndex = index;
      this.chooseDeliveryTime = item;
    },
    clickTomoryTimeList(index, item) {
      this.tomoryIndex = index;
      this.chooseDeliveryTime = item;
    },
    sureCheckTime() {
      let date = this.currentIndex === 0 ? `今天` : `明天`;
      if (this.chooseDeliveryTime.length < 1) {
        let fristTodayData = this.timeList.today[0];
        let secondDayData = this.timeList.tomory[0];
        this.chooseDeliveryTime =
          this.currentIndex === 0 ? fristTodayData : secondDayData;
      }
      this.$emit("changeData", false, date + this.chooseDeliveryTime);
    },
    closePopView() {
      let date = this.currentIndex === 0 ? `今天` : `明天`;
      this.$emit("changeData", false, date + this.chooseDeliveryTime);
    }
  }
};
</script>
<style lang="stylus" scoped>
.time__title
  display: flex
  height: 2.5rem
  justify-content: center
  align-items: center
  border-bottom: 1px solid #e8e8e8
  .time__title__text
    font-size: 0.8rem
.content
  display: flex
  width: 100%
  position: absolute
  top: 2.75rem
  bottom: 3rem
  overflow: hidden
  .content__left
    width: 5.3125rem
    flex: 0 0 5.3125rem
    background-color: #f4f4f4
    .content__left__item
      display: flex
      height: 2.6rem
      justify-content: center
      align-items: center
      font-size: 0.7rem
      border-bottom: 1px solid #e8e8e8
      position: relative
    .selected
      color: #333
      font-size: 0.875rem
      font-weight: bold
      background-color: #fff
.content__right
  left: 5.2rem
  right: 0
  top: 0
  width: 100%
  overflow-x: hidden
  overflow-y: auto
  .content__right__item
    display: flex
    height: 2.5rem
    justify-content: flex-start
    align-items: center
    padding-left: 0.7rem
    border-bottom: 1px solid #e8e8e8
  .checked
    color: #3bba63
.sureButton
  display: flex
  position: absolute
  bottom: 0
  right: 0
  left: 0
  width: 90%
  height: 2.5rem
  justify-content: center
  align-items: center
  background-color: #3bba63;
  color: #fff;
  border-radius: 2.5rem
  margin:0 auto 0.25rem
</style>

<template>
  <div class="center flex-vertical-center">
    <div class="total">
      <div class="loading-tips">加载中{{ dashed }}</div>
      <span class="loaded">{{ percentComplete.toFixed() }}%</span>
      <div :style="{width: percentComplete + '%'}" class="completed"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    percentComplete: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dashed: '',
      timer: '',
    };
  },
  created() {
    this.timer = setInterval(() => {
      if (this.dashed.length < 3) {
        this.dashed += '.';
      } else {
        this.dashed = '';
      }
    }, 1000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.center {
  position: absolute;
  text-align: center;
  z-index: 9999;
  width: 1059px;
  height: 720px;
  background: #000;
}
.loading-tips {
  color: rgb(227, 241, 234);
  margin-top: -100px;
  font-size: 40px;
}
.completed {
  background: rgb(58, 157, 199);
  height: 50px;
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  /* box-shadow: 0px 0px 10px 1px rgb(108, 228, 212), 0 0 1px rgb(108, 228, 212),
    0 0 1px rgb(108, 228, 212), 0 0 1px rgb(108, 228, 212),
    0 0 1px rgb(108, 228, 212), 0 0 1px rgb(108, 228, 212),
    0 0 1px rgb(108, 228, 212); */
  border-radius: 10px;
}
.loaded {
  position: absolute;
  color: rgb(255, 252, 97);
  z-index: 999999;
  left: 0;
  right: 0;
  line-height: 50px;
  font-size: 24px;
  font-weight: bold;
  bottom: 0;
  margin: auto;
}
.total {
  border-radius: 10px;
  text-align: center;
  width: 80%;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>

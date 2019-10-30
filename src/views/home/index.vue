<template>
  <div>
    <dashboard>
      <template v-slot:message>
        <div class="home-container flex-vertical-center">
          <div class="intro">
            {{ intro }}
          </div>
        </div>
      </template>
    </dashboard>
  </div>
</template>

<script>
import Dashboard from '@/views/dashboard';

export default {
  name: 'HomeView',
  components: {
    Dashboard,
  },
  data() {
    return {
      intro: '前端工程师，有板绘经验，可担任美工工作，会制作Live2D，参与多次前端开发,原型的制作以及插图、海报的绘制工作。大三开始在创业公司实习、工作，目前已有一年以上工作经验。',
    };
  },
  methods: {
    handleTabClick() {
      // pass
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding: 30px;
  min-height: 540px;
}
.intro {
  font-size: 20px;

}
</style>

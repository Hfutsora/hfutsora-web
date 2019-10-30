<template>
  <div>
    <dashboard>
      <template v-slot:message>
        <div class="tab">
          <intro-tabs @tab-click="handleTabClick" :tabs-array="tabsArray"></intro-tabs>
        </div>
      </template>
    </dashboard>
  </div>
</template>

<script>
import Dashboard from '@/views/dashboard';
import introTabs from './components/intro-tabs';

export default {
  name: 'ProjectViews',
  components: {
    Dashboard,
    introTabs,
  },
  data() {
    return {
      tabsArray: [{
        label: '登录',
        value: 'login',
      }, {
        label: '信息管理系统',
        value: 'management',
      }, {
        label: 'ThreeJs',
        value: 'three-js',
      }, {
        label: '在线问卷',
        value: 'et',
      }, {
        label: '商城',
        value: 'shop',
      }],
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

</style>

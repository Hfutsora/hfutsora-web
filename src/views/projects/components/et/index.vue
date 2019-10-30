<template>
  <dashboard>
    <template v-slot:message>
      <project>
        <template v-slot:project-title>Et</template>
          <template v-slot:project-content>

          <hs-tabs border v-model="currentTab" @click="handleClick">
            <hs-tabs-pane name="questionnaire">问卷</hs-tabs-pane>
            <hs-tabs-pane name="render">自定义渲染</hs-tabs-pane>
            <hs-tabs-pane name="score">评分结果</hs-tabs-pane>
            <hs-tabs-pane name="steps">自定义步骤条</hs-tabs-pane>
          </hs-tabs>

          <transition name="fade-transform">
            <router-view></router-view>
          </transition>
        </template>
      </project>
    </template>
  </dashboard>
</template>

<script>
import Dashboard from '@/views/dashboard';
import Project from '../project';
import HsTabs from '@/components/hs-tabs/hs-tabs';
import HsTabsPane from '@/components/hs-tabs/hs-tab-pane';

export default {
  name: 'EtView',
  components: {
    Dashboard,
    HsTabs,
    HsTabsPane,
    Project,
  },
  data() {
    return {
      currentTab: 'questionnaire',
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
      this.currentTab = tab;
      if (tab === 'questionnaire') {
        this.$router.push('/project/et');
      } else {
        this.$router.push(`/project/et/${tab}`);
      }
    },
  },
};
</script>

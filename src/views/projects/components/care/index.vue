<template>
  <dashboard>
    <template v-slot:message>
      <project>
        <template v-slot:project-title>护助汇-老人照护管理平台</template>
          <template v-slot:project-content>

          <hs-tabs border v-model="currentTab" @click="handleClick">
            <hs-tabs-pane name="list">表格</hs-tabs-pane>
          </hs-tabs>

          <transition name="fade-transform">
            <component :is="currentComponent"></component>
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

import List from './list';

export default {
  name: 'CareLayoutView',
  components: {
    Dashboard,
    HsTabs,
    HsTabsPane,
    List,
    Project,
  },
  computed: {
    currentTab() {
      return 'list';
    },
  },
  data() {
    return {
      currentComponent: 'list',
    };
  },
  methods: {
    handleClick(tab) {
      this.currentComponent = tab;
    },
  },
};
</script>

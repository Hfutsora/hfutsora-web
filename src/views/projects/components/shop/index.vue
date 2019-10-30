<template>
  <dashboard>
    <template v-slot:message>
      <project>
        <template v-slot:project-title>商城</template>
          <template v-slot:project-content>

          <hs-tabs border v-model="currentTab" @click="handleClick">
            <hs-tabs-pane name="commodity-manage">商品编辑</hs-tabs-pane>
            <hs-tabs-pane name="multiple-select">多选器</hs-tabs-pane>
            <hs-tabs-pane name="chat">客服聊天</hs-tabs-pane>
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
  name: 'ShopView',
  components: {
    Dashboard,
    HsTabs,
    HsTabsPane,
    Project,
  },
  data() {
    return {
      currentTab: 'commodity-manage',
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
      this.currentTab = tab;
      this.$router.push(`/project/shop/${tab}`);
    },
  },
};
</script>

<template>
  <div class="tabs-component">
    <el-row type="flex" justify="center" class="tabs">
      <el-col v-for="(tab, index) in tabsArray" :key="index">
        <el-row type="flex" justify="space-between" class="tab" @click.native="switchTab(tab)">
          <el-col :class="{'active-label' : currentTabComponent === tab.value }">{{tab.label}}</el-col>
          <el-col class="dividing-line" v-if="index < tabsArray.length - 1"></el-col>
        </el-row>
      </el-col>
    </el-row>

    <component :is="currentTabComponent" class="tab-body"></component>
  </div>
</template>

<script>
const requireRoutes = require.context('./components', true, /.vue/);
let componentRegister = {};
requireRoutes.keys().forEach((fileName) => {
  const reqCom = requireRoutes(fileName);
  const reqComName = fileName.split('/')[1].split('.')[0];
  componentRegister = Object.assign(componentRegister, { [`${reqComName}`]: (reqCom.default || reqCom) });
});

export default {
  name: 'MyTabs',
  props: {
    tabsArray: {
      type: Array,
      default: () => [],
    },
  },
  components: componentRegister,
  data() {
    return {
      currentTabComponent: 'login',
    };
  },
  methods: {
    switchTab({ value }) {
      this.currentTabComponent = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-component {
  transition: all .2s;
  // margin-left: calc((100vw - 1200px) / 2);
  box-shadow: 0px 10px 20px 5px rgba(189, 189, 189, 0.2);
  &:hover {
    box-shadow: 0px 10px 20px 5px rgba(200, 206, 204, 0.3);
  }
}
.dividing-line {
  width: 1px;
  position: absolute;
  height: 2em;
  right: 0;
  background: rgba(189, 189, 189, 0.4);
}
.tabs {
  z-index: 9;
  box-shadow: 0 15px 10px -15px rgb(235, 235, 235);
}
.tab {
  background-color: rgb(255, 255, 255);
  padding: 43px 24px;
  height: 107px;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 15px 10px -15px #ccc;
  }
}
.tab-body {
  padding: 50px;
  font-size: 14px;
  color: rgb(85, 85, 85);
  background: white;
}
.active-label {
  color: rgb(76, 163, 97);
  font-size: 101%;
}
</style>

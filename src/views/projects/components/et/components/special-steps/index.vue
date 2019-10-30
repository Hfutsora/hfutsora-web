<template>
  <div class="container">
    <et-steps :active="active" class="et-steps" :stepStatusArray="stepStatusArray">
      <et-step @click="clickHandle">步骤一</et-step>
      <et-step @click="clickHandle">步骤二</et-step>
      <et-step @click="clickHandle">步骤三</et-step>
    </et-steps>

    <div class="content">
      <transition name="fade-transform">
        <div style="color: gray;" class="flex-center flex-vertical-center">
          {{active}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import EtStep from './components/step';
import EtSteps from './components/steps';


export default {
  name: 'EtSpecialStepsView',
  components: {
    EtSteps,
    EtStep,
  },
  data() {
    return {
      active: 1,
      stepStatusArray: ['completed', 'completed', 'processing'],
    };
  },
  methods: {
    clickHandle(active) {
      console.log(active);
      this.active = active + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 24px 80px;
  background: #f5f5f5;
}
.content {
  background: white;
  height: 300px;
  margin-top: 38px;
  line-height: 300px;
}
</style>

<template>
  <div class="steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EtStepsReportComponent',
  props: {
    active: {
      type: Number,
      required: true,
    },
    stepStatusArray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      steps: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  display: center;
}
</style>

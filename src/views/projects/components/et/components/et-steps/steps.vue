<template>
  <div class="steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EtStepsQuesitionnaireComponent',
  props: {
    active: {
      type: String,
      required: true,
    },
    answered: {
      type: Array,
      required: true,
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

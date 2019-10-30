<template>
  <div class="tabs-container">
    <div class="tabs">
      <slot></slot>
    </div>
    <div v-if="border" class="float-block"></div>
  </div>
</template>

<script>
export default {
  name: 'WTabs',
  props: {
    value: {
      required: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    active() {
      return this.value;
    },
  },
  data() {
    return {
      panes: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs-container {
  display: flex;
  max-width: 100%;
}
.tabs {
  display: inline-flex;
  border-bottom: none;
}
.float-block {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid rgb(221, 222, 224);
}
</style>

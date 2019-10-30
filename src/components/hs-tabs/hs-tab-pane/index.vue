<template>
  <div
    @click="emitClick"
    class="tab-pane tab-pane-select"
    :class="[{
      'border-right' : isLast,
      'active' : isActive,
      'border-left-top-radius': radius && isFirst,
      'border-right-top-radius': radius && isLast
    },
      border ? isActive ? 'hidden-bottom' : 'show-bottom' : ''
    ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab-pane',
  props: {
    name: {
      required: true,
    },
  },
  computed: {
    border() {
      return this.$parent.border;
    },
    radius() {
      return this.$parent.radius;
    },
    isActive() {
      return this.$parent.active === this.name;
    },
    isFirst() {
      return this.$parent.panes.indexOf(this) === 0;
    },
    isLast() {
      return this.$parent.panes.indexOf(this) === this.$parent.panes.length - 1;
    },
  },
  beforeCreate() {
    this.$parent.panes.push(this);
  },
  methods: {
    emitClick() {
      this.$parent.$emit('click', this.name);
    },
  },
};
</script>


<style lang="scss" scoped>
.tab-pane {
  border-top: 1px solid rgb(221, 222, 224);
  border-left: 1px solid rgb(221, 222, 224);
  background: white;
  min-width: 100px;
  padding: 0 12px;
  white-space: nowrap;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #a3a3a3;
}
.active {
  color: rgb(64, 158, 255);
  font-weight: 500;
}
.border-right {
  border-right: 1px solid rgb(221, 222, 224);
}
.border-left-top-radius {
  border-top-left-radius: 20px;
}
.border-right-top-radius {
  border-top-right-radius: 20px;
}
.show-bottom {
  border-bottom: 1px solid rgb(221, 222, 224);
}
.hidden-bottom {
  border-bottom: 1px solid transparent;
}
.hidden {
  display: none;
}
</style>

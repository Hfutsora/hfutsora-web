<template>
  <div class="step" :class="[isLast() ? 'flex-basis-last': 'flex-basis']">
    <div class="content">
      <div class="circle" :class="[ isActive() ?'active-line': 'wait-line', clickable(activeTo()) ? 'click-enable' : 'click-disable']" @click="emitClick">
        <div class="label">
          <slot></slot>
        </div>
      </div>
      <div class="line" :class="[ lineActive() ?'active-line': 'wait-line']" v-if="!isLast()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtStepQuesitionnaireComponent',
  computed: {
    parent() {
      return this.$parent;
    },
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },
  methods: {
    activeTo() {
      return this.parent.steps.indexOf(this);
    },
    clickable(to) {
      return to + 1 <= this.parent.answered.length + 1;
    },
    isActive() {
      return this.parent.steps.indexOf(this) <= this.parent.active - 1;
    },
    lineActive() {
      return this.parent.steps.indexOf(this) < this.parent.active - 1;
    },
    isLast() {
      return this.parent.steps[this.parent.steps.length - 1] === this;
    },
    emitClick() {
      const to = this.parent.steps.indexOf(this);
      this.$emit('click', to);
    },
  },
};
</script>

<style lang="scss" scoped>
.active-line {
  color: rgb(58, 175, 159);
  background: rgb(58, 175, 159);
}
.wait-line {
  color: rgb(153, 153, 153);
  background: rgb(238, 238, 238);
}
.flex-basis {
  flex-basis: 50%;
}
.flex-basis-last {
  flex-basis: 10px;
}
.step {
  padding: 10px 0;
  font-size: 12px;
  margin-top: 10px;

  .content {
    display: flex;
    align-items: center;
    .circle {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      .label {
        position: relative;
        top: -20px;
        width: 100px;
        left: -45px;
        text-align: center;
      }
    }
    .line {
      width: 100%;
      height: 2px;
    }
  }
}
.click-enable {
  cursor: pointer;
}
.click-disable {
  cursor: not-allowed;
}
</style>

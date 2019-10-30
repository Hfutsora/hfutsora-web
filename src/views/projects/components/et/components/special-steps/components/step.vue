<template>
  <div class="step" :class="[isLast() ? 'flex-basis-last': 'flex-basis']">
    <div class="content">
      <div class="circle" @click="emitClick" :class="[ isActive() ? 'active-color' : 'wait-color', clickable(activeTo()) ? 'click-enable' : 'click-disable' ]">
        <div class="label">
          <slot></slot>
        </div>
        <div class="inner-circle" :class="[ status === 'completed' ? isActiveHere() ? 'active-circle-here' : 'active-circle' : 'wait-circle']"></div>
        <div v-if="isActiveHere()">
          <div class="iter">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
      <div style="width: 100%">
        <div class="line" :class="[ lineActive() ?'active-line': 'wait-line']" v-if="!isLast()"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtStepReportComponent',
  computed: {
    parent() {
      return this.$parent;
    },
    status() {
      return this.parent.stepStatusArray[this.parent.steps.indexOf(this)] || 'unstart';
    },
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },
  methods: {
    activeTo() {
      return this.parent.steps.indexOf(this);
    },
    clickable(active) {
      return Number(active) === 0 || (this.parent.stepStatusArray[Number(active) - 1] !== 'unstart' && this.parent.stepStatusArray[Number(active) - 1] !== 'processing');
    },
    isActive() {
      return this.parent.steps.indexOf(this) <= this.parent.active - 1;
    },
    isActiveHere() {
      return this.parent.steps.indexOf(this) === this.parent.active - 1;
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
.default-circle {
  width: 28px;
  height: 28px;
}
.active-circle {
  @extend .default-circle;
  background: url('~@/assets/package/icon-success.png') no-repeat;
}
.active-circle-here {
  @extend .default-circle;
  background: url('~@/assets/package/icon-handle-here.png') no-repeat;
  box-shadow: 0 5px 15px #c1ddda;
}
.wait-circle {
  @extend .default-circle;
  background: url('~@/assets/package/icon-waiting-arrow.png') no-repeat;
}
.inner-circle {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100% 100%;
  top: -15px;
  left: 4px;
}
.active-color {
  color: rgb(58, 175, 159);
}
.wait-color {
  color: rgb(153, 153, 153);
}
.active-line {
  background: rgba(58, 175, 159, 0.5);
}
.wait-line {
  color: rgb(153, 153, 153);
  background: white;
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
  margin-top: 12px;

  .content {
    display: flex;
    align-items: center;
    .circle {
      border-radius: 50%;
      background: white;
      width: 48px;
      height: 48px;
      .label {
        position: relative;
        top: -32px;
        width: 100px;
        left: -26px;
        text-align: center;
        font-size: 14px;
      }
      .iter {
        width: 48px;
        height: 48px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        background: white;
        display: flex;
        justify-content: center;
        position: relative;
        .arrow {
          width:0;
          height:0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent rgb(58, 175, 159) transparent;
        }
      }
    }
    .line {
      border: 2px solid white;
      width: 100%;
      height: 5px;
      margin-left: -2px;
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

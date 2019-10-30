<template>
  <div class="et-star-rate">
    <span
      v-for="(item, key) in level"
      :key="key"
    >
      <div
        v-if="status[key] === 'active'"
        class="star star--selected"
      ></div>
      <div
        v-if="status[key] === 'dynamic'"
        class="star star--unselected"
      >
        <div
          class="star--dynamic"
          :style="decimalStyle"
        ></div>
      </div>
      <div
        v-if="status[key] === 'void'"
        class="star star--unselected"
      ></div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'EtStarRate',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 5,
    },
    max: {
      type: Number,
      default: 5,
    },
  },

  computed: {
    currentValue() {
      return Math.ceil(this.value / this.max * 10) * 0.5;
    },
    status() {
      const result = new Array(this.level).fill('void');
      let activeIndex = Math.floor(this.currentValue);
      while (activeIndex) {
        result[activeIndex - 1] = 'active';
        activeIndex -= 1;
      }
      if (this.value < this.max) {
        const dynamicIndex = Math.floor(this.currentValue);
        result[dynamicIndex] = 'dynamic';
      }
      return result;
    },
    valueDecimal() {
      return this.currentValue * 100 - Math.floor(this.currentValue) * 100;
    },
    decimalStyle() {
      const width = `${this.valueDecimal}%`;
      return {
        width,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.et-star-rate {
  display: flex;
  grid-template-columns: repeat(5, 24px);
  grid-column-gap: 7px;
  .star {
    width: 24px;
    height: 24px;
    &--selected {
      background: url('./svg/star-dynamic.svg') no-repeat center top;
      filter: drop-shadow(0px 10px 5px rgba(246, 207, 90, 0.5));
    }
    &--unselected {
      background: url('./svg/star-void.svg') no-repeat center top;
    }
    &--dynamic {
      height: 24px;
      background: url('./svg/star-dynamic.svg') no-repeat center top;
    }
  }
}
</style>

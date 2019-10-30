<template>
  <el-checkbox-group :value="selected" @input="emitCheckbox">
    <div v-for="option in options" :key="option.label" :class="{'inline': inline}">
      <el-checkbox :label="option.value" :class="{'multiple-rows': !inline}">
        <el-tooltip :disabled="!option.tips" effect="light" :content="option.tips" placement="right" :open-delay="1000">
          <span>{{option.label}}</span>
        </el-tooltip>
      </el-checkbox>
    </div>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'EtRadio',
  props: {
    question: {
      type: Object,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [
        {
          value: '',
        },
      ],
    },
  },
  computed: {
    selected() {
      if (this.value.length > 0) {
        return this.value.map(item => item.value);
      }
      return [];
    },
    options() {
      return this.question.content;
    },
  },
  methods: {
    emitCheckbox(selectValue) {
      const selectedArray = [];
      selectValue.forEach((value) => {
        if (value) {
          selectedArray.push({ value });
        }
      });
      this.$emit('select-change', selectedArray);
    },
  },
};
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
  margin-right: 30px;
  white-space: nowrap;
}
.multiple-rows {
  margin-bottom: 14px;
}
</style>

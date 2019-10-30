<template>
  <el-radio-group :value="selected" @input="emitRadio">
    <el-radio :label="option.value" v-for="option in options" :key="option.label" :class="{'multiple-rows': !inline}">
      <el-tooltip :disabled="!option.tips" effect="light" :content="option.tips" placement="right" :open-delay="1000">
        <span>{{option.label}}</span>
      </el-tooltip>
    </el-radio>
  </el-radio-group>
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
      return this.value[0].value;
    },
    options() {
      return this.question.content;
    },
  },
  methods: {
    emitRadio(selectValue) {
      this.$emit('select-change', [{ value: selectValue }]);
    },
  },
};
</script>

<style lang="scss" scoped>
.multiple-rows {
  display: block;
  margin-bottom: 16px;
}
</style>

<template>
  <el-radio-group :value="answer.content" @input="selectChange">
    <el-radio :label="item.label" v-for="item in data.options" :key="item.value">{{item.label}}</el-radio>
  </el-radio-group>
</template>

<script>
import _isPlainObject from 'lodash/isPlainObject';

export default {
  name: 'EtFormInput',
  props: {
    data: {
      type: Object,
      default() {
        return {
          options: [{
            label: '',
            value: '',
          }],
        };
      },
    },
    transAnswer: {
      default() {
        return {
          value: '',
          content: '',
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.content)) {
      this.selectChange('');
    }
  },
  computed: {
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          content: {},
        };
    },
    options() {
      return this.answer;
    },
  },
  methods: {
    selectChange(value) {
      this.$emit('value-change', { value: '', content: value }, 'radio');
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form-radio {
  display: block;
}
</style>

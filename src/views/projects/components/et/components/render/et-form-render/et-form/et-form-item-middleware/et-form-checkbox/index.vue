<template>
  <el-checkbox-group :value="answer.content" @input="emitCheckbox">
    <div v-for="item in data.options" :key="item.value">
      <el-checkbox :label="item.label">{{item.label}}</el-checkbox>
    </div>
  </el-checkbox-group>
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
          options: [
            {
              label: '',
              value: '',
            },
          ],
        };
      },
    },
    transAnswer: {
      default() {
        return {
          value: '',
          content: [],
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.content)) {
      this.emitCheckbox([]);
    }
  },
  computed: {
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          content: [],
        };
    },
    options() {
      return this.answer;
    },
  },
  methods: {
    emitCheckbox(value) {
      this.$emit('value-change', { content: value.length ? value : [] });
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form-radio {
  display: block;
}
</style>

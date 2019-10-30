<template>
  <el-input
    :value="value"
    :type="type"
    :autosize="{ minRows: 4 }"
    class="et-form-input"
    :minlength="data.schema ? data.schema.minLength : 0"
    :maxlength="data.schema ? data.schema.maxLength : 255"
    :min="data.schema ? data.schema.min : 0"
    :max="data.schema ? data.schema.max : 1000000000000000000"
    :step="0.01"
    @input="emitInput"
  ></el-input>
</template>

<script>
import _isPlainObject from 'lodash/isPlainObject';

export default {
  name: 'EtFormInput',
  props: {
    transAnswer: {
      default() {
        return {
          value: '',
          content: '',
        };
      },
    },
    data: {
      default() {
        return {
          schema: {
            min: 0,
            max: 100,
            minLength: 0,
            maxLength: 250,
          },
        };
      },
    },
  },
  created() {
    if (!this.value) {
      this.emitInput('');
    }
  },
  computed: {
    type() {
      if (this.data.type === 'textarea') {
        return 'textarea';
      }
      return this.data.schema.type;
    },
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          content: '',
        };
    },
    value() {
      return this.answer.content;
    },
  },
  methods: {
    emitInput(value) {
      this.$emit('value-change', { value: '', content: value });
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form-input {
  display: block;
  width: 100%;
}
</style>

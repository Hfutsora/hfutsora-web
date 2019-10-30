<template>
  <div>
    <el-date-picker
      @input="emitChange"
      style="width: 100%;"
      :value="answer.content"
      :type="type"
      placeholder="选择日期"
    ></el-date-picker>
  </div>
</template>

<script>
import _isPlainObject from 'lodash/isPlainObject';

export default {
  name: 'EtFormItemDatePicker',
  props: {
    data: {
      default() {
        return {
          schema: {
            type: 'date',
          },
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
      this.emitChange('');
    }
  },
  computed: {
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          content: '',
        };
    },
    type() {
      if (this.data && this.data.schema) {
        return this.data.schema.type === 'date' ? 'date' : 'daterange';
      }

      return 'date';
    },
  },
  methods: {
    emitChange(value) {
      this.$emit('value-change', { value: '', content: value });
    },
  },
};
</script>

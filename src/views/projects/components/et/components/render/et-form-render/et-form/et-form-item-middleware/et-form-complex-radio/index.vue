<template>
  <div>
    <el-radio-group :value="answer.radio ? answer.radio.content : ''" @input="selectChange">
    <div v-for="(item, index) in data.options" :key="item.value" class="complex-radio">
      <el-radio :label="item.label">{{item.label}}</el-radio>
      <transition name="input-fade"  v-if="item.input && currentSelected === index">
        <component :transAnswer="answer.input.content" :is="currentComponent(item.input.type)" @value-change="valueChange"></component>
      </transition>
    </div>
  </el-radio-group>
  </div>
</template>

<script>
import _isPlainObject from 'lodash/isPlainObject';
import _findIndex from 'lodash/findIndex';

import EtFormDatePicker from '../et-form-date-picker';
import EtFormInput from '../et-form-input';

export default {
  name: 'EtFormComplexRadio',
  components: {
    EtFormInput,
    EtFormDatePicker,
  },
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
          radio: { content: '' },
          input: { content: '' },
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.radio)) {
      this.emitChange({
        radio: { content: '' },
        input: { content: '' },
      });
    }
  },
  data() {
    return {
      inputComponentMap: {
        date: 'et-form-date-picker',
        text: 'et-form-input',
      },
    };
  },
  computed: {
    currentSelected() {
      return _findIndex(this.data.options, e => (this.answer.radio ? e.label === this.answer.radio.content : false));
    },
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          radio: { content: '' },
          input: { content: '' },
        };
    },
  },
  methods: {
    currentComponent(type) {
      return this.inputComponentMap[type] || '';
    },
    selectChange(value) {
      this.emitChange({
        radio: { content: value },
        input: { content: '' },
      });
    },
    valueChange(value) {
      this.emitChange({
        radio: { content: this.answer.radio.content },
        input: { content: value },
      });
    },
    emitChange(value) {
      this.$emit('value-change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form-radio {
  display: block;
}
.complex-radio {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}
.input-fade-enter-active  {
  transition: all .4s;
}

.input-fade-enter  {
  width: 0;
  opacity: 0;
}
</style>

<template>
  <div>
    <div class="radio-area">
      <span class="radio-label">{{radioData.label}}</span>
      <et-form-radio :transAnswer="answer.content.radio" :data="radioData" @value-change="valueChange"></et-form-radio>
    </div>
    <et-form-input :data="textData" :transAnswer="answer.content.text" @value-change="valueChange" :autosize="{ minRows: 4, maxRows: 4}"></et-form-input>
  </div>
</template>

<script>
import _find from 'lodash/find';

import _isPlainObject from 'lodash/isPlainObject';
import EtFormInput from '../et-form-input';
import EtFormRadio from '../et-form-radio';


export default {
  name: 'EtFormWithRadio',
  components: {
    EtFormInput,
    EtFormRadio,
  },
  props: {
    data: {
      type: Object,
    },
    transAnswer: {
      default() {
        return {
          value: '',
          content: {
            text: '',
            radio: '',
          },
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.content)) {
      this.emitChange();
    }
  },
  computed: {
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          content: {
            text: '',
            radio: '',
          },
        };
    },
    radioData() {
      return _find(this.data.contents, data => data.type === 'radio');
    },
    textData() {
      return _find(this.data.contents, data => data.type === 'textarea');
    },
  },
  data() {
    return {
      radio: '',
      text: '',
    };
  },
  methods: {
    valueChange(value, type) {
      if (type === 'radio') {
        this.radio = value;
      } else {
        this.text = value;
      }
      this.emitChange();
    },
    emitChange() {
      const formWithRadio = {};
      formWithRadio.text = this.text;
      formWithRadio.radio = this.radio;
      this.$emit('value-change', JSON.parse(JSON.stringify({ content: formWithRadio })));
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #999999;
  position: relative;
  height: 20px;
  top: -40px;
  .radio-label {
    margin-right: 24px;
  }
}
</style>

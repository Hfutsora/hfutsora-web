<template>
  <div>
    <component :is="currentComponent" :transAnswer="answer" :type="type" :data="item" @value-change="valueChange"></component>
  </div>
</template>

<script>
import EtFormInput from './et-form-input';
import EtFormTable from './et-form-table';
import EtFormRadio from './et-form-radio';
import EtFormDatePicker from './et-form-date-picker';
import EtFormWithRadio from './et-form-with-radio';
import EtFormReadOnly from './et-form-read-only';
import EtFormImageUpload from './et-form-image-upload';
import EtFormCheckbox from './et-form-checkbox';
import EtFormComplexRadio from './et-form-complex-radio';
import EtFormDropdownSelect from './et-form-dropdown-select';

export default {
  name: 'EtFormItemMiddleware',
  components: {
    EtFormInput,
    EtFormTable,
    EtFormRadio,
    EtFormDatePicker,
    EtFormWithRadio,
    EtFormReadOnly,
    EtFormImageUpload,
    EtFormCheckbox,
    EtFormComplexRadio,
    EtFormDropdownSelect,
  },
  props: {
    type: {
      type: String,
    },
    item: {
      type: Object,
    },
    formItemIndex: {
      type: Number,
    },
    formOuterIndex: {
      type: Number,
    },
    appendIndex: {
      type: Number,
      default: 1,
    },
    outer: {
      type: Boolean,
      default: false,
    },
    transAnswer: {
      default() {
        return {
          value: '',
          content: '',
        };
      },
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    answer() {
      return this.transAnswer ? this.transAnswer : { value: '', content: '' };
    },
    currentComponent() {
      return this.componentMap[this.type];
    },
  },
  data() {
    return {
      componentMap: {
        input: 'et-form-input',
        textarea: 'et-form-input',
        table: 'et-form-table',
        radio: 'et-form-radio',
        date: 'et-form-date-picker',
        'form-with-radio': 'et-form-with-radio',
        'read-only': 'et-form-read-only',
        'image-upload': 'et-form-image-upload',
        'complex-radio': 'et-form-complex-radio',
        'dropdown-select': 'et-form-dropdown-select',
        checkbox: 'et-form-checkbox',
      },
    };
  },
  methods: {
    valueChange(value) {
      this.$emit('value-change', value, this.type, this.formItemIndex, this.formOuterIndex, this.appendIndex);
    },
  },
};
</script>

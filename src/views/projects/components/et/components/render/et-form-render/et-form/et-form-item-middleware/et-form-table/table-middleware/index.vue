<template>
  <component :data="data" :is="currentComponent" :value="value" @value-change="valueChange"></component>
</template>

<script>
import EtFormTableInput from './et-form-table-input';
import EtFormTableDatePicker from './et-form-table-date-picker';

export default {
  name: 'EtFormTableMiddleware',
  components: {
    EtFormTableInput,
    EtFormTableDatePicker,
  },
  props: {
    type: {
      type: String,
      default: 'input',
    },
    rowIndex: {
      type: Number,
    },
    colIndex: {
      type: Number,
    },
    value: {
      default: '',
    },
    data: {
      default() {
        return {
          value: '',
          content: '',
          schema: {
            minLength: 0,
            maxLength: 250,
          },
        };
      },
    },
  },
  computed: {
    currentComponent() {
      return this.componentsMap[this.type];
    },
  },
  data() {
    return {
      componentsMap: {
        input: 'et-form-table-input',
        date: 'et-form-table-date-picker',
      },
    };
  },
  methods: {
    valueChange(value) {
      this.$emit('value-change', value, this.rowIndex, this.colIndex);
    },
  },
};
</script>

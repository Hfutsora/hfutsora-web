<template>
  <input
    :type="type"
    :value="value"
    class="table-input"
    @input="emitChange"
    :minlength="data.schema.minLength"
    :maxlength="data.schema.maxLength"
    :max="data.schema.max"
    :min="data.schema.min"
    :step="0.0001"
  >
</template>

<script>
export default {
  name: 'EtFormTableInput',
  props: {
    value: {
      type: String,
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
            max: 100,
            min: 0,
          },
        };
      },
    },
  },
  computed: {
    type() {
      return this.data.schema.type;
    },
  },
  methods: {
    emitChange($event) {
      this.$emit('value-change', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-input {
  border: none;
  width: 100%;
  height: 25px;
  font-size: 14px;
  background: transparent;
  text-align: center;
  padding: 0;
  margin: 0;
  color: #606266;
  cursor: text;
  &:focus {
    height: 24px;
    border-bottom: 1px solid rgb(211, 211, 211);
  }
}

input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

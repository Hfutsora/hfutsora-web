<template>
  <el-date-picker
    @input="emitChange"
    style="width: 100%;"
    :value="value"
    :type="type"
    placeholder="选择日期"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'EtFormTableItemDatePicker',
  props: {
    value: {
      default: '',
    },
    data: {
      default() {
        return {
          schema: {
            type: 'date',
          },
        };
      },
    },
  },
  computed: {
    type() {
      if (this.data && this.data.schema) {
        return this.data.schema.type === 'date' ? 'date' : 'daterange';
      }

      return 'date';
    },
  },
  methods: {
    emitChange(value) {
      this.$emit('value-change', value);
    },
  },

};
</script>

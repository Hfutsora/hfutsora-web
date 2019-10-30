<template>
  <el-form>
    <el-form-item
      v-for="(form, formIndex) in data"
      :key="form.id"
      :class="[{'et-form-border' : formIndex + 1 < data.length}]"
    >
      <div slot="label" class="et-form-label" :class="[{'hidden': formHiddenArray[formIndex]}]" @click="formItemHiddenToggle(formIndex)">{{form.label}}</div>
      <br />
      <et-form
        :data="form"
        :formIndex="formIndex"
        class="et-form--outer"
        :class="[{ 'form-item-hidden': formHiddenArray[formIndex]}]"
        :answer="answer[formIndex]"
        @form-item-change="formItemChange"
      ></et-form>
    </el-form-item>
  </el-form>
</template>

<script>
import EtForm from './et-form/el-form-item-outer';

export default {
  name: 'DiligencingMaterialForm',
  components: {
    EtForm,
  },
  props: {
    data: {
      type: Array,
    },
    transAnswer: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    answer() {
      return this.transAnswer;
    },
    form() {
      return this.transAnswer;
    },
  },
  data() {
    return {
      formHiddenArray: [],
    };
  },
  methods: {
    formItemChange(formData, formIndex) {
      this.$set(this.form, formIndex, JSON.parse(JSON.stringify(formData)));
      this.$emit('form-change', this.form);
    },
    formItemHiddenToggle(formIndex) {
      this.$set(this.formHiddenArray, formIndex, !this.formHiddenArray[formIndex]);
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form--outer {
  overflow: hidden;
}
.form-item-hidden {
  max-height: 0;
}
.et-form-label {
  cursor: pointer;
  margin-left: -8px;
  transition: all 2s;
  &:before {
    content: '';
    border-width: 6px 4px;
    border-style: solid;
    border-color: #3aaf9f transparent transparent transparent;
    position: relative;
    top: 12px;
    left: -6px;
  }
}
.hidden.et-form-label {
  @extend .et-form-label;
  &:before {
    top: -12px;
    border-color: transparent transparent #3aaf9f transparent;
  }
}
.et-form-border {
  border-bottom: 1px dashed rgb(226, 226, 226);
}
</style>

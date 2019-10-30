<template>
  <div class="question">
    <div class="title-index">{{index + 1}}</div>
    <div>
      <el-tooltip effect="light" :disabled="!question.tips" :content="question.tips" placement="right" :open-delay="1000">
        <div class="title">{{question.label}}</div>
      </el-tooltip>
      <component class="options" :is="question.type" :question="question" @select-change="selectChange" :value="answer"></component>
    </div>
  </div>
</template>

<script>
import Checkbox from './components/et-checkbox';
import Radio from './components/et-radio';

export default {
  name: 'EtQuestion',
  components: {
    Radio,
    Checkbox,
  },
  props: {
    // 选择类型: radio单选 checkbox多选
    question: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
    answer: {
      type: Array,
      default: () => [{
        value: '',
      }],
    },
  },
  methods: {
    selectChange(value) {
      this.$emit('select-change', value, this.index);
    },
  },

};
</script>

<style lang="scss" scoped>
.question {
  font-size: 14px;
  color: rgb(85, 85, 85);
  display: flex;
  justify-content: flex-start;
  margin-left: 98px;
  padding: 20px 0 5px;

  .title-index {
    margin-right: 18px;
    text-align: right;
    color: rgb(153, 153, 153);
  }
  .title {
    margin-bottom: 20px;
  }
}
</style>

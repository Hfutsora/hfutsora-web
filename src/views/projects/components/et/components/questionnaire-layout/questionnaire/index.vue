<template>
  <div class="question">
    <et-question
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      :index="index"
      :answer="value[index]"
      @select-change="selectChange"
      :class="[{'border-bottom' : index < questions.length - 1}]"
    >
    </et-question>
  </div>
</template>

<script>
import EtQuestion from './et-question';

export default {
  name: 'EtQuestionnaire',
  components: {
    EtQuestion,
  },
  props: {
    // 选择类型: radio单选 checkbox多选
    questions: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [{
        content: [{
          value: '',
        }],
      }],
    },
  },
  data() {
    return {
      selectAnswers: [],
    };
  },
  methods: {
    selectChange(selectValue, index) {
      this.$emit('select-change', selectValue, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px dashed rgb(167, 167, 167);
}
</style>

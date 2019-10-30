<template>
  <div class="question-area" v-loading="loading">
    <div class="flex-center">
      <et-steps :answered="answered" :active="active" class="et-steps" ref="et-steps">
        <et-step @click="clickHandle" v-for="item in classification" :key="item.id">{{ labelMap[item.name] }}</et-step>
      </et-steps>
    </div>

    <div class="flex-center">
      <div class="questionaire-area">
        <et-questionnaire
          :questions="questions"
          @select-change="selectChange"
          v-model="answers">
        </et-questionnaire>
      </div>
    </div>
    <div class="flex-center">
      <el-button class="submit-button" @click="submitAnswersAndNext">
        {{ isLast ? '完成': '下一步' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import EtQuestionnaire from './questionnaire';
import EtSteps from '../et-steps/steps';
import EtStep from '../et-steps/step';

import defaultQuestionnaire from './default-questionnaire.json';
// import {
//   getAssessmentClassification, getAssessmentAnswer, getAssessmentClassificationQuestion, answerAssessmentClassificationQuestion, getAnsweredQuestion,
// } from '@/api/questionnaire';

export default {
  name: 'QuestionnaireLayoutView',
  components: {
    EtQuestionnaire,
    EtSteps,
    EtStep,
  },
  props: {
    active: {
      type: String,
      default: '1',
    },
  },
  watch: {
    // active(active) {
    //   this.watchInit(active);
    // },
  },
  data() {
    return {
      defaultQuestionnaire,
      loading: false,
      check: '',
      isLast: false,
      questions: [],
      classification: [{
        name: 'name',
        id: 1,
      }, {
        name: 'company',
        id: 2,
      }, {
        name: 'originator',
        id: 3,
      }, {
        name: 'team',
        id: 4,
      }, {
        name: 'production',
        id: 5,
      }, {
        name: 'business',
        id: 6,
      }],
      answers: [],
      answered: [],
      labelMap: {
        name: '名称',
        company: '公司',
        originator: '创始人',
        team: '团队',
        production: '产品',
        business: '运营',
      },
    };
  },
  async created() {
    this.questions = this.defaultQuestionnaire;

    this.$nextTick(() => {
      this.confirmLast();
    });
    // this.createdInit();
  },
  methods: {
    async createdInit() {
      try {
        this.loading = true;
        // 初始化进度条
        await this.initClassification();
        // 初始化已回答内容
        await this.initAnswer();
        // 初始化问卷题目
        await this.initQuestiones();
        // 确认回答
        await this.confirmIfAnswered(Number(this.active) - 1);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async watchInit(active) {
      try {
        this.loading = true;
        await this.confirmIfAnswered(Number(active) - 1);
        await this.initAnswer();
        await this.initQuestiones();
        await this.confirmLast();
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async initClassification() {
      // const parameters = {
      //   path: {
      //     id: this.initialId,
      //   },
      // };
      // const { data } = await getAssessmentClassification(parameters);
      // this.classification = data.classification;
    },
    async initAnswer() {
      // const parameters = {
      //   path: {
      //     id: this.initialId,
      //   },
      // };
      // const { data } = await getAssessmentAnswer(parameters);
      // this.answered = data;
    },
    async initQuestiones() {
      // const parameters = {
      //   path: {
      //     id: this.classification[this.active - 1].id,
      //   },
      // };
      // const { data } = await getAssessmentClassificationQuestion(parameters);
      // this.questions = data;
    },
    async initAnsweredQuestion() {
      // const parameters = {
      //   path: {
      //     id: this.answered[Number(this.active) - 1].answerId,
      //   },
      // };
      // const { data } = await getAnsweredQuestion(parameters);
      // this.answers = data.map(answer => answer.content);
    },
    confirmLast() {
      if (this.$refs['et-steps'].steps.length === Number(this.active)) {
        this.isLast = true;
      } else {
        this.isLast = false;
      }
    },
    selectChange(answer, index) {
      this.$set(this.answers, index, answer);
    },
    clickHandle(to) {
      if (to + 1 > this.answered.length + 1) {
        this.$message({
          message: '请先依序完成问卷',
          type: 'warning',
        });
      }

      // this.$router.replace(`/project/package/questionnaire/${this.projectId}/${this.initialId}/${to + 1}`);
    },
    confirmIfAnswered() {
      // if (Number(to) < this.answered.length) {
      //   this.initAnsweredQuestion();
      // } else {
      //   this.answers = [];
      // }
    },
    async submitAndBack() {
      let length = 0;
      this.answers.forEach((value) => {
        if (value) {
          length += 1;
        }
      });
      if (length < this.questions.length) {
        this.$message({
          message: '请完成全部问题',
          type: 'warning',
        });
      }
      // await this.submitAnswers();
      // this.$router.back();
    },
    async submitAnswersAndNext() {
      let length = 0;
      this.answers.forEach((value) => {
        if (value) {
          length += 1;
        }
      });
      if (length < this.questions.length) {
        this.$message({
          message: '请完成全部问题',
          type: 'warning',
        });
        return;
      }
      // await this.submitAnswers();
      this.nextQuestion();
    },
    async submitAnswers() {
      // try {
      //   this.loading = true;
      //   const parameters = {
      //     path: {
      //       initialId: this.initialId,
      //       classificationId: this.classification[this.active - 1].id,
      //     },
      //     body: [],
      //   };

      //   parameters.body = this.questions.map((question, index) => ({
      //     id: question.id,
      //     type: question.type,
      //     content: this.answers[index],
      //   }));
      //   await answerAssessmentClassificationQuestion(parameters);
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   this.loading = false;
      // }
    },
    nextQuestion() {
      if (this.active < this.classification.length) {
        this.$router.replace(`/project/et/quesionnaire/${Number(this.active) + 1}`);
      }
      // else {
      //   this.$router.replace(`/project/package/report/${this.projectId}/${this.initialId}/initial`);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.question-area {
  width:  1036px;
  padding-right: 24px;
  background: white;
}
.questionaire-area {
  width:  1060px;
}
.et-steps {
  width: 80%;
  padding: 40px 0 12px;
  margin: 0 275px;
}
.default-button {
  margin-left: 20px;
  border-radius: 40px;
  border: none;
  width: 100px;
  height: 40px;
  color: white;
  font-size: 16px;
  &:active {
    filter: brightness(1.1);
  }
}
.submit-button {
  @extend .default-button;
  background: linear-gradient( 90deg, #53cab9 0%, rgba(58, 175, 159, 0.3) 100%);
  background-color: rgb(58, 175, 159);
  box-shadow: 0px 10px 20px 0px rgba(58, 175, 159, 0.3);
  margin: 35px 0 40px;
}
</style>

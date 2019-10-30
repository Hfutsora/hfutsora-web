<template>
  <div class="diligencing-form-area" v-loading="loading">

    <et-form-render :data="data" :transAnswer="answer" class="et-form" @form-change="formChange"></et-form-render>
    <div class="buttons-area">
      <el-button class="submit-button" @click="routerLinkToDiligencingPreview">保存</el-button>
    </div>
  </div>
</template>

<script>
import EtFormRender from './et-form-render';

// import {
//   getDiligencingClassificationQuestion,
//   submitPackageDiligencingQuestion,
//   getClassificationAnswered,
// } from '@/api/questionnaire';

import defaultData from './default-render-template.json';

export default {
  name: 'FormRenderView',
  components: {
    EtFormRender,
  },
  // props: {
  //   materialMap: {
  //     type: String,
  //     default: 'enterprise-analysis',
  //   },
  // },
  data() {
    return {
      materialMap: 'enterprise-analysis',
      form: [],
      data: [],
      defaultData,
      loading: false,
      answer: [],
      answered: [],
      materialTitleMap: {
        'enterprise-analysis': '企业分析',
        'industry-analysis': '行业分析',
        'product-analysis': '产品分析',
        'competitor-analysis': '竞品分析',
        'product-research': '产品调研',
        'strategic-planning': '战略规划',
        'operational-planning': '运营计划',
        'financial-analysis': '财务分析',
        'user-testing': '种子用户测试',
        'financing-plan': '融资方案',
        'financing-method': '营销方式测试',
        'financing-mchannel': '营销渠道测试',
        'revenue-models': '营收模型测试',
        'brand-building': '品牌建设',
        'market-expansion': '规模化市场拓展',
        'financing-planA': '融资计划A轮',
      },
    };
  },
  created() {
    // if (String(this.assessmentId) === 'null' || !this.assessmentId) {
    //   this.$message({
    //     type: 'warning',
    //     message: '请先购买尽调',
    //   });
    //   this.$router.push(`/project/package/report/${this.projectId}/et/due-diligence`);
    // }

    // if (!(this.materialMap in this.materialTitleMap)) {
    //   this.$message({
    //     type: 'warning',
    //     message: '尽调材料不存在',
    //   });
    //   this.$router.back();
    // }
    this.init();
  },
  methods: {
    async init() {
      try {
        this.loading = true;
        //   const { data } = await getDiligencingClassificationQuestion({
        //     path: {
        //       projectId: this.projectId,
        //       classificationId: this.materialId,
        //     },
        //   });
        //   this.data = data;
        //   await this.initAnswers();
        this.data = this.defaultData;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async initAnswers() {
      // if (this.answerId > 0) {
      //   const { data } = await getClassificationAnswered({
      //     path: {
      //       id: this.answerId,
      //     },
      //   });
      //   this.answer = data;
      // }
    },
    async routerLinkToDiligencingPreview() {
      // try {
      //   this.loading = true;

      //   const data = await this.submitForm();

      //   this.$router.push(
      //     `/project/package/report/${this.projectId}/${this.id}/due-diligence/${this.materialId}/${this.assessmentId}/${
      //       data.answerId
      //     }/${this.materialMap}`,
      //   );
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   this.loading = false;
      // }
    },
    async submitAndBack() {
      // try {
      //   const data = await this.submitForm('save');
      //   this.$router.push(`/project/package/report/${this.projectId}/${this.id}/due-diligence/material/${this.materialId}/${this.assessmentId}/${
      //     data.answerId
      //   }/${this.materialMap}`);
      // } catch (err) {
      //   console.error(err);
      // }
    },
    async submitForm(type) {
      try {
        this.loading = true;

        if (!this.answer.length) {
          this.$message({
            message: '提交材料不能为空',
            type: 'warning',
          });

          return;
        }

        // const parameters = {
        //   path: {
        //     assessmentId: this.assessmentId,
        //     classificationId: this.materialId,
        //   },
        //   body: this.answer,
        // };

        // const { data } = await submitPackageDiligencingQuestion(parameters);

        if (type === 'save') {
          this.$message({
            message: '保存成功',
            type: 'success',
          });
        }

        // eslint-disable-next-line consistent-return
        // return data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formChange(form) {
      this.answer = form;
    },
  },
};
</script>


<style lang="scss" scoped>
.diligencing-form-area {
  background: rgb(238, 238, 238);
  border: 1px solid rgb(241, 241, 241);
  border-radius: 5px;
  padding: 41px 30px 60px 30px;
  margin-bottom: 30px;
  background: white;
}
.et-form {
  padding: 40px 80px;
}
.buttons-area {
  display: flex;
  justify-content: center;
  .default-button {
    margin: 0 25px;
    padding: 13px 33px;
    border: 1px solid #e2e2e2;
    height: 42px;
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    border-radius: 21px;
  }
  .submit-button {
    margin: 0 25px;
    height: 42px;
    border-radius: 21px;
    border: none;
    padding: 13px 33px;
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    color: rgb(255, 255, 255);
    background: linear-gradient(to right, #54cbba, rgb(58, 175, 159));
    box-shadow: 0px 10px 20px 0px rgba(58, 175, 159, 0.3);
    &:hover {
      filter: brightness(1.1);
    }
  }
}
</style>

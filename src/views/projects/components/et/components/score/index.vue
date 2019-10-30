<template>
  <div>
    <div class="report-area" v-loading="loading">
      <div class="title">
        <span class="title-pre">评估报告</span>
        <el-button v-if="hasReport" @click="viewProjectEvaluationHistory" class="detail-button">历史记录</el-button>
      </div>
      <div class="report-content" v-if="!hasReport">
        <div class="flex-center tips">等待报告</div>
      </div>
      <div v-else>
        <div class="report-result">
          <div class="progress">
            <et-circle-progress
              :width="220"
              :strokeWidth="14"
              :score="report.score"
              :fillStrokeWidth="18"
              class="et-progress"
              :percentage="percentage"
            ></et-circle-progress>
            <div class="content">
              <div>
                <div class="flex-center score">{{report.score.toFixed(0)}}</div>
                <div class="flex-center info">综合得分</div>
              </div>
            </div>
          </div>
          <div class="radar">
            <ve-radar
              height="200px"
              width="220px"
              :data="chartData"
              :settings="chartSettings"
              :legend-visible="false"
              :extend="chartExtend"
            ></ve-radar>
          </div>
        </div>
        <div class="comment comment-border-bottom margin-bottom padding-bottom">
          <div class="label">详评总结</div>
          <div class="info" v-if="report.content">{{report.content}}</div>
          <div class="wait-for-complete" v-else>等待完善中</div>
        </div>
        <div class="comment comment-border-bottom margin-bottom" v-for="step in report.steps" :key="step.name">
          <div class="label">{{step.name}}评估</div>
          <div class="info">
            <div class="detail-title" v-if="step.content">{{step.content}}</div>
            <div class="wait-for-complete" v-else>等待完善中</div>
            <div
              class="flex-start"
              v-for="(addition, index) in step.addition"
              :key="index"
              :class="{ 'result-border-bottom':index < step.addition.length - 1 }"
            >
              <div class="icon-basis">
                <div class="icon">{{index + 1}}</div>
              </div>
              <div>
                <div class="star">
                  <div class="addition-label">{{addition.label}}</div>
                  <et-rate :max="addition.total" :value="addition.score"></et-rate>
                </div>
                <div class="content">{{addition.content}}</div>
                <div v-if="addition.formalAnalysis.strong">
                  <div class="green-content">优势：{{addition.formalAnalysis.strong.join('；')}}</div>
                </div>
                <div v-if="addition.formalAnalysis.weak">
                  <div class="red-content">劣势：{{addition.formalAnalysis.weak.join('；')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template>
          <div class="title padding-bottom">
            <span class="title-pre">
              <span class="content">人工评估</span>
              <span class="score" v-if="report.artificial">{{report.artificial[0].content[0].value}}</span>
            </span>
          </div>
          <div v-if="report.artificial">
            <div class="result" v-for="(artificial,index) in report.artificial" :key="'artificial-' + index">
              <template v-if="index !== 0 && artificial.label !== '资金链状况'">
                <div class="label">{{artificial.label}}</div>
                <div class="content padding-bottom" :class="[{'result-border-bottom': index + 1 < report.artificial.length}]" style="width: 100%;">
                  {{artificial.content[0].value}}
                </div>
              </template>
            </div>
          </div>
          <div class="flex-center1 wait-for-complete">
            暂无
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import EtCircleProgress from './et-circle-progress';
import EtRate from './et-star-rate';

// import { getPackageDetailedReport } from '@/api/report';

import { getStartColor, getEndColor } from '@/styles/radar';

import defaultData from './default-score.json';

export default {
  name: 'ReportDeails',
  components: {
    EtRate,
    EtCircleProgress,
  },
  computed: {
    percentage() {
      return (this.report.score * 100) / this.report.total;
    },
  },
  data() {
    return {
      loading: false,
      report: {
        score: 0,
        total: 100,
      },
      defaultData,
      hasReport: false,
      chartData: {
        columns: [
          'name',
          'company',
          'originator',
          'team',
          'production',
          'business',
        ],
        rows: [
          {
            name: 'et',
            company: 0,
            originator: 0,
            team: 0,
            production: 0,
            business: 0,
          },
        ],
      },
      chartSettings: {
        labelMap: {
          name: '名称',
          company: '公司',
          originator: '创始人',
          production: '产品',
          team: '团队',
          business: '运营',
        },
        itemStyle: {
          width: '1px',
        },
        lineStyle: {
          color: '#45c395',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#9eddc6',
              },
              {
                offset: 1,
                color: '#3bb09f',
              },
            ],
            global: false,
          },
        },
      },
      chartExtend: {
        series: {
          symbol: 'none',
        },
        radar: {
          name: {
            textStyle: {
              color: '#555555',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['#f8f8f8'],
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ebeeed',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#ebeeed',
            },
          },
          shape: 'polygon',
          radius: '60%',
          indicator: [
            { name: '公司', max: 100 },
            { name: '产品', max: 100 },
            { name: '创始人', max: 100 },
            { name: '团队', max: 100 },
            { name: '运营', max: 100 },
          ],
        },
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        this.loading = true;

        // const parameters = {
        //   path: {
        //     id: this.projectId,
        //   },
        // };
        // const { data } = await getPackageDetailedReport(parameters);

        this.report = this.defaultData;
        this.data = this.defaultData;

        const columnIndexMap = new Map(this.chartData.columns.map((columnName, columnIndex) => [columnName, columnIndex]));
        const newSteps = [];
        this.data.steps.forEach((ele) => {
          this.chartData.rows[0][ele.name] = ele.score;
          newSteps[[columnIndexMap.get(ele.name) - 1]] = ele;
          ele.name = this.chartSettings.labelMap[ele.name];
          ele.max = ele.total;
        });
        this.chartExtend.radar.indicator = newSteps;

        this.chartSettings.areaStyle.color.colorStops[0].color = getStartColor(this.report.score);
        this.chartSettings.areaStyle.color.colorStops[1].color = getEndColor(this.report.score);
        this.chartSettings.lineStyle.color = getEndColor(this.report.score);

        this.hasReport = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    clickHandle() {
      // this.$router.push(
      //   `/project/package/report/details/${this.id}/${value + 1}`,
      // );
    },
    viewProjectEvaluationHistory() {
      // const { fullPath } = this.$route;
      // this.$router.push(`${fullPath}/history`);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-start {
  display: flex;
  justify-content: flex-start;
  padding: 12px 0;
}
.report-area {
  background: rgb(238, 238, 238);
  border: 1px solid rgb(241, 241, 241);
  padding: 41px 31px 30px 45px;
  margin-bottom: 30px;
  background: white;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-family: 'Microsoft YaHei';
    color: rgb(85, 85, 85);
    .title-pre {
      display: flex;
      justify-content: flex-start;
      margin-left: -5px;
      .content {
        min-width: 120px;
      }
      .score {
        color: #d56354;
      }
      &:before {
        content: '';
        position: relative;
        background: rgb(58, 175, 159);
        box-shadow: 0px 10px 10px 0px rgba(58, 175, 159, 0.3);
        width: 5px;
        height: 25px;
        right: 41px;
      }
    }
  }
  .report-content {
    margin: 52px 0 100px;
    .tips {
      font-size: 14px;
      color: rgb(153, 153, 153);
    }
  }
}
.default-button {
  border-radius: 40px;
  border: none;
  color: white;
  background: linear-gradient(90deg, #53cab9 0%, rgb(58, 175, 159, 0.3) 100%);
  background-color: rgb(58, 175, 159);
  box-shadow: 0px 10px 20px 0px rgba(58, 175, 159, 0.3);
  text-align: center;
  &:active {
    filter: brightness(1.1);
  }
}
.submit-button {
  @extend .default-button;
  width: 200px;
  height: 50px;
  font-size: 16px;
  margin-top: 24px;
}
.detail-button {
  @extend .default-button;
  width: 120px;
  height: 30px;
  font-size: 14px;
  line-height: 0;
}
.wait-for-complete {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  margin-bottom: 24px;
}
.text-align {
  text-align: center;
}
.et-steps {
  padding: 0 270px;
  margin: 38px 0 30px;
}
.report-result {
  display: flex;
  padding: 60px 200px;
  .progress {
    width: 175px;
    height: 175px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 75px;
    margin-right: 75px;
    border-right: 1px solid rgb(238, 238, 238);
    .et-progress {
      position: absolute;
    }
    .content {
      border-radius: 50%;
      width: 170px;
      height: 170px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
    }
    .score {
      font-size: 60px;
      color: rgb(85, 85, 85);
      display: block;
      text-align: center;
    }
    .info {
      font-size: 16px;
      color: rgb(153, 153, 153);
    }
  }
}
.comment-border-bottom {
  // width: 1150px;
  margin-bottom: 40px;
  margin-left: -15px;
  border-bottom: 1px solid rgb(238, 238, 238);
  .label {
    margin-left: 15px;
    min-width: 120px;
  }
}
.padding-bottom {
  padding-bottom: 30px;
}
.margin-bottom {
  margin-bottom: 22px;
}
.result-border-bottom {
  border-bottom: 1px dashed rgb(238, 238, 238);
}
.result,
.comment {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  color: rgb(85, 85, 85);
  .label {
    min-width: 120px;
  }
  .info {
    width: 100%;
    .detail-title {
      margin-bottom: 10px;
    }
    .addition-label {
      min-width: 150px;
    }
    .star {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .icon-basis {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-basis: 25px;
      min-width: 25px;
      height: 25px;
      .icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          #57b695 0%,
          #50af8e 40%,
          #3d9788 120%
        );
        text-align: center;
        line-height: 18px;
        font-size: 12px;
        color: rgb(255, 255, 255);
      }
    }
    .content {
      padding: 22px 0 10px;
      font-family: 'NotoSansHans';
      color: rgb(153, 153, 153);
      width: 100%;
    }
    .special-content {
      padding: 2px 0.8rem;
      border-radius: 1rem;
      margin-bottom: 13px;
      color: white;
      display: inline-block;
    }
    .green-content {
      @extend .special-content;
      background: #4bafa2;
    }
    .red-content {
      @extend .special-content;
      background: rgb(158, 158, 158);
    }
  }
}
</style>

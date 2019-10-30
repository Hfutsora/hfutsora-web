<template>
  <div>
    <dashboard>
      <template v-slot:message>
        <div class="resume-container">
          <div class="block">
            <div class="title">个人信息</div>
            <div class="content flex-between">
              <div>姓名：童锴 </div>
              <div>性别：男</div>
              <div>手机：15155189170</div>
              <div>邮箱：346762712@qq.com</div>
            </div>
          </div>

          <div class="block">
            <div class="title">个人简介</div>
            <div class="content">
              <div>前端工程师，大三开始在创业公司(合肥数翼信息科技有限公司)实习、工作，目前已有一年以上工作经验。</div>
              <div>有板绘经验，会制作Live2D，参与多次前端原型制作以及插图、海报的绘制。</div>
            </div>
          </div>

          <div class="block">
            <div class="title">教育经历</div>
            <div class="content">
              <div>合肥工业大学2019届 软件工程 本科毕业生。</div>
            </div>
          </div>

          <div class="block">
            <div class="title">技术栈</div>
            <div class="content">
              <div>掌握HTML CSS/sass ES6的基础，熟悉vue框架及搭配element-ui为主的组件库进行网站的快速开发。</div>
            </div>
          </div>

          <div class="block">
            <div class="title">代码经历</div>
            <div class="content">
              <span class="sub-title">ccf：</span>
              <div class="sub-content">使用java达到200分;</div>

              <span class="sub-title">编程游戏：</span>
              <div class="sub-content">基于bs的利用google-blockly的幼儿编程教学游戏。</div>

              <span class="sub-title">北斗导航的电力铁塔安全系统(ThreeJs)：</span>
              <div class="sub-content">
                使用ThreeJs以及Echarts的折线图，展示铁塔的实时数据，实现定制分页器、日期选择器及折线图收缩功能等，并添加gui控制面板并结合实时数据动态修改模型参数;
              </div>

              <span class="sub-title">et智投web端：</span>
              <div class="sub-content">
                修改ElementUI样式，完成 video.js的视频播放，vuelidate的表单验证功能，自定义步骤条，问卷部分(多级问卷)根据后台获取的JSON内容自动进行渲染(问卷渲染引擎适应全部问卷);
              </div>

              <span class="sub-title">et智投移动端(wechat)：</span>
              <div class="sub-content">
                完整包含web端内容同时增加了微信小程序内的支付和分享等功能。
              </div>

              <span class="sub-title">微校PC管理端：</span>
              <div class="sub-content">
                完成商品编辑模板，使用网易云信实现客服聊天系统，进行数据库设计，参与部分后台开发(nodeJs + express + sequelize)
              </div>

              <br />

              <div>
                经过一年多的开发经验巩固编程基础，编程意识也有了明显提高(如抽离重复函数与组件等)，更加语义化的取名(根据clean code的要求)，对git的使用保持一个功能一个分支，基本能够独立完成前端开发任务。
              </div>
            </div>
          </div>

          <div class="block">
            <div class="title">绘画经历</div>
            <div class="content">
              <div>担任学校同人部部长，长期进行线上、线下的绘画教学活动</div>
              <div>作为美工参与IGEM比赛，绘制海报、页面插图素材、设计队服并最终获得金奖</div>
              <div>同人创作 –> P站 <a target="view_window" href="https://www.pixiv.net/member.php?id=16600768">https://www.pixiv.net/member.php?id=16600768</a></div>
            </div>
          </div>
        </div>
      </template>
    </dashboard>
  </div>
</template>

<script>
import Dashboard from '@/views/dashboard';

export default {
  name: 'ResumeView',
  components: {
    Dashboard,
  },
  data() {
    return {
      intro: '',
    };
  },
  methods: {
    handleTabClick() {
      // pass
    },
  },
};
</script>

<style lang="scss" scoped>
.resume-container {
  padding: 30px;
  min-height: 540px;
  background: rgba(249, 250, 250, .8);
}
.intro {
  font-size: 20px;
}
.block {
  margin: 12px 0;

  .title {
    font-size: 20px;
    font-weight: 600;
    color: rgb(65, 64, 64);
  }
  .sub-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    display: block;
  }
  .content {
    font-size: 18px;
    padding: 12px;
  }
  .sub-content {
    text-indent: 2em;
    padding: 8px 0 12px;
    line-height: 120%;
    border-bottom: 1px dashed rgb(182, 182, 182);
    margin-bottom: 12px;
  }
}
</style>

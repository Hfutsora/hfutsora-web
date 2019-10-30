<template>
  <div>
    <dashboard>
      <template v-slot:message>
        <div class="message-container">
          <div class="content">
            1.  大学担任学校同人部部长，长期进行线上、线下的绘画教学活动
          </div>
          <div class="content">
            2.  参与IGEM比赛，绘制海报、页面插图素材、设计队服并获得金奖
            <div v-viewer>
              <img class="book" src="@/assets/hobby/igem.jpg" alt="igem">
            </div>
          </div>
          <div class="content">
            3.  学院三下乡宣传册制作
            <div v-viewer>
              <div class="flex-between">
                <img class="book" src="@/assets/newbookJPGS/封面.jpg" alt="封面">
                <img class="book" src="@/assets/newbookJPGS/目录.jpg" alt="目录">
                <img class="book" src="@/assets/newbookJPGS/书背.jpg" alt="书背">
              </div>
            </div>
          </div>
          <div class="content">
            4.  短期协作漫画《红娘》上色工作
          </div>
          <div class="content">
            5.  曾绘制多个项目Logo及活动海报
            <div v-viewer>
              <img class="poster" src="@/assets/hobby/poster.png" alt="海报">
            </div>
          </div>
          <div class="content">
            6.  同人创作 –> P站
            <a target="view_window" href="https://www.pixiv.net/member.php?id=16600768">https://www.pixiv.net/member.php?id=16600768</a>
            <div v-viewer>
              <div class="flex-between">
                <img class="draw" src="@/assets/hobby/pic-1.png" alt="插图">
                <img class="draw" src="@/assets/hobby/pic-2.png" alt="插图">
                <img class="draw" src="@/assets/hobby/pic-3.png" alt="插图">
                <img class="draw" src="@/assets/hobby/pic-4.png" alt="插图">
              </div>
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
  name: 'HobbytView',
  components: {
    Dashboard,
  },
  data() {
    return {
      tabsArray: [{
        label: '信息管理系统',
        value: 'management',
      }, {
        label: 'ThreeJs',
        value: 'three-js',
      }, {
        label: '在线问卷',
        value: 'et',
      }, {
        label: '商城',
        value: 'shop',
      }],
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
.message-container {
  padding: 24px;
  color: #2f3035;
  font-size: 16px;
  background: rgba(233, 233, 233, 0.5);
}
.content {
  margin: 12px 0 24px;
}
.book {
  width: 320px;
  height: 220px;
  margin: 12px 0 0;
}
.poster {
  margin: 12px 0 0;
  width: 200px;
  height: 300px;
}
.draw {
  margin: 12px 0 0;
  width: 220px;
  height: 300px;
}
</style>

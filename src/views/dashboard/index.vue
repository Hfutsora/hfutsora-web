<template>
  <div class="container flex-center">
    <div class="main-area" ref="main-area" :style="`margin-top: ${store.getters.navHeight + 48}px`">
      <div class="main-area-mask" ref="main-area-mask"></div>
      <div class="main-area-background" ref="main-area-background"></div>
      <div class="main-area-body" ref="main-area-body">
        <slot name="message" class="message-container"></slot>
      </div>
    </div>

    <div class="git flex-vertical-center" @click="linkToGit">
      <img src="@/assets/git.png" class="pic" alt="github" />
      <div class="content">GitHub</div>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector';
import store from '@/store';

export default {
  name: 'DashboardView',
  data() {
    return {
      store,
    };
  },
  created() {
    this.$nextTick(() => {
      const erd = elementResizeDetectorMaker();

      erd.listenTo(this.$refs['main-area-body'], ($el) => {
        this.$nextTick(() => {
          this.$refs['main-area'].style.height = `${$el.clientHeight}px`;
          this.$refs['main-area-mask'].style.height = `${$el.clientHeight}px`;
          this.$refs['main-area-background'].style.height = `${$el.clientHeight}px`;
        });
      });
    });
  },
  methods: {
    linkToGit() {
      window.open('https://github.com/Hfutsora/hfutsora-web');
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;

  &::before {
    background: url("~@/assets/dashboard/background.png") 100% 100% no-repeat;
    background-size: cover;
    content: "";
    position: fixed;
    background-attachment: fixed;
    filter: blur(4px);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -2;
  }
}
.main-area {
  width: 1080px;
  min-height: 600px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 0 10px 10px rgba(10, 10, 10, .4);

  .main-area--common-style {
    border-radius: 12px;
    width: 1080px;
    min-height: 600px;
    position: absolute;
    margin: auto;
    transition: all .5s;
  }

  .main-area-mask {
    @extend .main-area--common-style;
    background: rgba(196, 196, 196, 0.7);
    z-index: 1;
  }
  .main-area-background {
    @extend .main-area--common-style;
    background: url("~@/assets/dashboard/background.png") 100% 100% no-repeat;
    background-size: cover;
    background-attachment: fixed;
    z-index: 0;
  }
  .main-area-body {
    @extend .main-area--common-style;
    z-index: 99;
    padding: 24px 0;
  }

  &:hover {
    .main-area-mask {
      background: rgba(246, 246, 246, 0.75);
    }
  }
}
.message-container {
  // position: absolute;
  z-index: 99;
}

.git {
  position: fixed;
  z-index: 9999;
  left: 24px;
  cursor: pointer;
  .content {
    color: white;
    font-size: 24px;
    font-weight: 600;
  }

  .pic {
    width: 60px;
    height: 60px;
  }

  &:hover {
    filter: brightness(1.5);
  }
}
</style>

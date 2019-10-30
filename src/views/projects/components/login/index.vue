<template>
  <dashboard>
    <template v-slot:message>
      <project>
        <template v-slot:project-title>登录注册</template>
          <template v-slot:project-content>
            <div class="flex-center">
              <div class="login-area">
                <!-- <h2 class="flex-center login-title">登录</h2> -->
                <loginForm></loginForm>
              </div>
            </div>
            <particle-canvas></particle-canvas>
        </template>
      </project>
    </template>
  </dashboard>

</template>

<script>
import loginForm from './login/index.vue';
import particleCanvas from './components/particle.vue';
import Dashboard from '@/views/dashboard';
import Project from '../project';

export default {
  name: 'LoginContainerView',
  components: {
    loginForm,
    Dashboard,
    Project,
    particleCanvas,
  },
  data() {
    return {

    };
  },

  created() {

  },

};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100vw;
  height: 100vh;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-area {
  position: absolute;
  left: 50%;
  margin-left: -400px;
  top: 50%;
  margin-top: -300px;
  position: absolute;
  z-index: 99;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px 5px rgba(100, 100, 100, .5);

  .login-title {
    color: rgb(85, 85, 85);
    font-size: 24px;
    margin: 24px 0;
  }
}
</style>

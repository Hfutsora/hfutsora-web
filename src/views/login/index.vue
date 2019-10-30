<template>
  <div class="home-container">
    <div class="flex-center">
      <div class="login-area">
        <!-- <h2 class="flex-center login-title">登录</h2> -->
        <loginForm></loginForm>
      </div>
    </div>

    <particle-canvas></particle-canvas>
  </div>
</template>

<script>
import loginForm from './login/index.vue';
import particleCanvas from './components/particle.vue';

export default {
  name: 'LoginContainerView',
  components: {
    loginForm,
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

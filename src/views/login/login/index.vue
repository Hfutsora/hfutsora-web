<template>
  <div class="flex-center flex-vertical-center height-100">
    <div class="login-area">
      <!-- 切换区域 -->
      <div class="login-area-selection flex-vertical-center">
        <h1 class="title">{{userMap[userIndex]}}
          <div class="title-border"></div>
        </h1>
        <div class="login-area-selection-button" v-if="active != 'RegisterForm'">
          <div v-for="(user, index) in userMap" :key="user">
            <div v-show="index != userIndex" @click="userIndex = index">
              我是{{user}}
            </div>
          </div>
        </div>
        <div class="login-buttons">
          <div :class="{active : active === 'LoginForm'}" @click="active = 'LoginForm'">登录</div>
          <div :class="{active : active === 'RegisterForm'}"
            @click="active = 'RegisterForm'; userIndex = 0;">注册</div>
        </div>
      </div>
      <!-- 表格区域  -->
      <div class="login-form">
        <component :role="role" :is="active" :inviter="inviter"
          @router-to-login="routerToLogin"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/login-form.vue';
import RegisterForm from './components/register-form.vue';
// import { getRole } from '@/utils/auth';

export default {
  name: 'Login',
  components: {
    LoginForm,
    RegisterForm,
  },
  props: {
    register: {
      type: String,
      default: '',
    },
    inviter: {
      type: String,
    },
  },
  computed: {
    role() {
      return this.roleMap[this.userIndex];
    },
  },
  data() {
    return {
      active: 'LoginForm',
      userIndex: 0,
      userMap: ['游客', '其他'],
      roleMap: ['visitor', 'partner'],
    };
  },
  created() {
    // if (getRole()) {
    //   this.userIndex = this.roleMap.indexOf(getRole());
    // }
    // console.log(this.inviter);
    // console.log(this.register);

    if (this.register) {
      this.active = 'RegisterForm';
    }
  },
  methods: {
    routerToLogin() {
      this.active = 'LoginForm';
    },
  },
};
</script>

<style lang="scss" scoped>
.login-area {
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 50px 50px 0px rgba(58, 175, 159, 0.1);
  color: white;
  width: 800px;
  height: 500px;
  .login-area-selection {
    width: 300px;
    height: 500px;
    position: absolute;
    background: url('~@/assets/login/login_select_bg.png') no-repeat;
    background-size: 100% 100%;
    .title {
      position: absolute;
      top: 50px;
      left: 30px;
      font-size: 22px;
      padding-bottom: 10px;
      overflow: hidden;
      transition: all 1s;
      &:hover {
        width: 80%;
      }
    }
    .title-border {
      width: 40px;
      margin-top: 10px;
      border-bottom: 5px solid white;
    }
    .login-area-selection-button {
      position: absolute;
      left: 30px;
      bottom: 18px;
      div {
        margin-bottom: 23px;
        cursor: pointer;
      }
    }
    .login-buttons {
      position: absolute;
      right: 0;
      div {
        margin: -28px 0;
        border-radius: 15px 0 0 15px;
        font-size: 16px;
        text-align: center;
        line-height: 90px;
        width: 90px;
        cursor: pointer;
      }
    }
  }
  .login-form {
    color: #555555;
    position: relative;
    left: 300px;
    height: 500px;
    border-radius: 0 10px 10px 0;
    width: 500px;
    display: flex;
    align-items: center;
  }
}
.active {
  background: url('~@/assets/login/login-active.png') no-repeat;
  color: rgb(58, 175, 159);
}
.height-100 {
  flex: 1 1 0;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.flex-vertical-center {
  display: flex;
  align-items: center;
}
</style>

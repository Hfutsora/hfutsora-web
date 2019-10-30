<template>
  <div class="form" ref="login-form">
    <et-input
      v-model="$v.form.account.$model"
      placeholder="请输入名称"
      type="text"
      class="margin-space"
    >
      <div slot="label">名称</div>
      <template slot="head-icon">
        <img
          src="~@/assets/icons/icon_user_login.png"
          alt="icon"
        >
      </template>
    </et-input>
    <et-input
      v-model="$v.form.password.$model"
      placeholder="请输入密码"
      type="password"
      class="margin-space"
    >
      <div slot="label">密码</div>
      <template slot="head-icon">
        <img
          src="~@/assets/icons/icon_lock.png"
          alt="icon"
        >
      </template>
    </et-input>
    <div class="flex-end">
      <div class="text-et-color" @click="$router.push('/reset-password')">忘记密码</div>
    </div>

    <el-button
      class="login-button"
      @click.stop.prevent="handleLogin"
    >
      {{!loginSucceed ? loading ? '登录中' : '登录' : '登录成功'}}
    </el-button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import EtInput from '@/components/input/index.vue';
// import destinations from '@/permission/roles';
import { validataPhoneNumber } from '@/utils/validate';

// import errorMap from '@/error';

export default {
  name: 'LoginForm',
  components: {
    EtInput,
  },
  validations: {
    form: {
      account: {
        isPhone(phone) {
          return validataPhoneNumber(phone);
        },
        required,
      },
      password: {
        required,
      },
    },
  },
  props: {
    role: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
      loginSucceed: false,
      loading: false,
    };
  },
  created() {
    document.onkeypress = (e) => {
      const keycode = document.all ? e.keyCode : e.which;
      if (keycode === 13 && this.$route.path === '/login') {
        this.handleLogin();
      }
    };
  },
  methods: {
    loginFormValidate() {
      this.$v.form.$touch();
      return !this.$v.form.$invalid && !this.loading && !this.loginSucceed;
    },
    async handleLogin() {
      this.$router.push('/');
      // if (this.loginFormValidate()) {
      //   try {
      //     this.loading = true;
      //     const userInfo = {
      //       account: this.form.account,
      //       password: this.form.password,
      //     };
      //     await this.$store
      //       .dispatch('Login', { userInfo, role: this.role })
      //       .then(() => this.$store.dispatch('GetInfo'))
      //       .then(() => {
      //         this.loginSucceed = true;

      //         const destination = destinations[this.role];
      //         this.$router.replace(destination);
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //         if (error.response && error.response.data.error) {
      //           this.$message.error(errorMap[error.response.data.error.id]);
      //         } else {
      //           this.$message.error('登录失败');
      //         }
      //       });
      //   } catch (err) {
      //     console.error(err);
      //   } finally {
      //     this.loading = false;
      //   }
      // } else {
      //   if (this.$v.form.account.$invalid) {
      //     this.$message({
      //       message: '请输入正确手机号',
      //       type: 'warning',
      //     });
      //     return;
      //   }
      //   if (this.$v.form.password.$invalid) {
      //     this.$message({
      //       message: '请输入密码',
      //       type: 'warning',
      //     });
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding: 0 90px;
  width: 320px;
  .margin-space {
    margin-bottom: 34px;
  }
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  .text-et-color {
    cursor: pointer;
    color: #3aaf9f;
  }
}
.login-button {
  border: none;
  cursor: pointer;
  color: white;
  background: url("~@/assets/login/login_button_bg.png") no-repeat;
  box-shadow: 0px 20px 30px 0px rgba(58, 175, 159, 0.3);
  width: 320px;
  height: 50px;
  border-radius: 50px;
  text-decoration: none;
  outline: none;
  margin-top: 52px;
  font-size: 18px;
  color: rgb(255, 255, 255);
  &:active {
    filter: brightness(1.05);
  }
}
</style>

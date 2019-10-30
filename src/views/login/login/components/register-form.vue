<template>
  <div class="form">
    <et-input
      v-model="$v.form.account.$model"
      placeholder="请输入11位手机号" type="text" class="margin-space">
      <div slot="head-icon">
        <img src="~@/assets/icons/icon_phone.png" alt="icon">
      </div>
    </et-input>
    <div class="flex-input margin-space">
      <div>
        <et-input v-model="$v.form.vercode.$model" placeholder="请输入验证码" type="text">
          <div slot="head-icon">
            <img src="~@/assets/icons/icon_vericode.png" alt="icon">
          </div>
        </et-input>
      </div>
      <div>
        <el-button class="vercode-button"
          :disabled="isGettingVercode || time > 0"  @click="getVercode">
          <span v-if="!isGettingVercode && time <= 0">
            获取验证码
          </span>
          <span v-else-if="isGettingVercode">
            正在发送
          </span>
          <span v-else>
            {{time}}秒后重新获取
          </span>
        </el-button>
      </div>
    </div>
    <et-input v-model="$v.form.password.$model"
      placeholder="请输入密码" type="password" class="margin-space">
      <div slot="head-icon">
        <img src="~@/assets/icons/icon_lock.png" alt="icon">
      </div>
    </et-input>
    <et-input v-model="$v.form.repeatPassword.$model"
      placeholder="确认密码" type="password" class="margin-space">
      <div slot="head-icon">
        <img src="~@/assets/icons/icon_lock.png" alt="icon">
      </div>
    </et-input>
    <div class="flex-between">
      <el-checkbox v-model="$v.form.checked.$model">我已阅读并同意服务条款</el-checkbox>
    </div>
    <el-button class="login-button" @click="register">注册</el-button>
  </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators';
import EtInput from '@/components/input/index.vue';

import { validataPhoneNumber } from '@/utils/validate';
// import destinations from '@/permission/roles';

// import errorMap from '@/error';

export default {
  name: 'LoginForm',
  components: {
    EtInput,
  },
  props: {
    inviter: {
      type: String,
    },
  },
  validations: {
    form: {
      account: {
        isPhone(phone) {
          return validataPhoneNumber(phone);
        },
        required,
      },
      vercode: {
        required,
      },
      password: {
        required,
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
      checked: {
        isChecked(check) {
          return check;
        },
      },
    },
  },
  data() {
    return {
      form: {
        account: '',
        vercode: '',
        password: '',
        repeatPassword: '',
        checked: false,
      },
      role: 'project',
      time: 0,
      timer: null,
      isGettingVercode: false,
    };
  },
  created() {
    document.onkeypress = (e) => {
      const keycode = document.all ? e.keyCode : e.which;
      if (keycode === 13) {
        this.register();
      }
    };
  },
  methods: {
    vercodeFormValidate() {
      this.$v.form.account.$touch();
      return !this.$v.form.account.$invalid;
    },
    async getVercode() {
      try {
        if (this.isGettingVercode || this.time > 0) {
          return;
        }

        if (this.vercodeFormValidate()) {
          // const parameters = {
          //   params: {
          //     type: 'register',
          //     account: this.form.account,
          //   },
          // };

          this.isGettingVercode = true;

          // await requestVercode(parameters);

          this.$message({
            message: '验证码已发送',
            type: 'success',
          });
          this.countdown();
        } else {
          this.$message({
            message: '请输入正确手机号',
            type: 'warning',
          });
        }
      } catch (err) {
        console.error(err);
        this.$message({
          message: '获取验证码失败',
          type: 'error',
        });
      } finally {
        this.isGettingVercode = false;
      }
    },
    countdown() {
      clearInterval(this.timer);
      this.time = 60;
      this.timer = setInterval(() => {
        this.time = this.time - 1;
      }, 1000);
    },
    registerFormValidate() {
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },
    async register() {
      this.$message.warning('暂不支持注册操作');
      // if (this.registerFormValidate()) {
      //   try {
      //     const { account, password, vercode } = this.form;

      //     const parameters = {
      //       body: {
      //         account,
      //         password,
      //         vercode,
      //       },
      //     };
      //     if (this.inviter) {
      //       parameters.body.inviter = Number(this.inviter);
      //     }

      //     const { data } = await register(parameters);
      //     this.$message({
      //       message: `用户 ${data.account} 注册成功`,
      //       type: 'success',
      //     });
      //     this.handleLogin();
      //   } catch (err) {
      //     console.error(err);
      //     this.$message.error(errorMap[err.response.data.error.id] || '注册失败');
      //   }
      // } else {
      //   if (this.$v.form.account.$invalid) {
      //     this.$message({
      //       message: '请输入正确手机号',
      //       type: 'warning',
      //     });
      //     return;
      //   }
      //   if (this.$v.form.vercode.$invalid) {
      //     this.$message({
      //       message: '请输入验证码',
      //       type: 'warning',
      //     });

      //     return;
      //   }
      //   if (this.$v.form.password.$invalid) {
      //     this.$message({
      //       message: '请输入密码',
      //       type: 'warning',
      //     });
      //     return;
      //   }
      //   if (this.$v.form.repeatPassword.$invalid) {
      //     this.$message({
      //       message: '两次密码不一致',
      //       type: 'warning',
      //     });
      //     return;
      //   }
      //   if (this.$v.form.checked.$invalid) {
      //     this.$message({
      //       message: '未同意服务条款',
      //       type: 'warning',
      //     });
      //   }
      // }
    },
    async handleLogin() {
      try {
        this.loading = true;
        // const userInfo = {
        //   account: this.form.account,
        //   password: this.form.password,
        // };
        // await this.$store
        //   .dispatch('Login', { userInfo, role: this.role })
        //   .then(() => this.$store.dispatch('GetInfo'))
        //   .then(() => {
        //     this.loginSucceed = true;

        //     const destination = destinations[this.role];
        //     this.$router.replace(destination);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     if (error.response && error.response.data.error) {
        //       this.$message.error(errorMap[error.response.data.error.id]);
        //     } else {
        //       this.$message.error('登录失败');
        //     }
        //   });
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding: 0 90px;
  width: 320px;
  .margin-space {
    margin-bottom: 16px;
  }
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgb(58, 175, 159);
  .wrap {
    label {
      cursor: pointer;
      line-height: 14px;
    }
  }
  input[type="checkbox"] + label::before {
    content: "\a0";
    display: inline-block;
    font-size: 14px;
    width: 14px;
    height: 14px;
    margin-right: 0.4em;
    border: 1px solid rgb(58, 175, 159);
    border-radius: 3px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label::before {
    background: url("~@/assets/icons/checked.png") no-repeat;
    background-size: 100% 100%;
    background-clip: content-box;
  }
  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
}
.login-button {
  border: none;
  cursor: pointer;
  color: white;
  background: url('~@/assets/login/login_button_bg.png') no-repeat;
  box-shadow: 0px 20px 30px 0px rgba(58, 175, 159, 0.3);
  width: 320px;
  height: 50px;
  border-radius: 50px;
  text-decoration: none;
  outline: none;
  margin-top: 32px;
  font-size: 18px;
  color: rgb(255, 255, 255);
  &:active {
    filter: brightness(1.05);
  }
}
.vercode-button {
  background: linear-gradient(90deg, #58cda5 0%, #3bb09f 100%);
  border: none;
  border-radius: 40px;
  color: white;
  height: 40px;
  min-width: 140px;
  &:disabled {
    background: linear-gradient(90deg, #58cda5 0%, #3bb09f 100%);
    border: none;
    border-radius: 40px;
    color: white;
    height: 40px;
    min-width: 140px;
  }
}
.flex-input {
  height: 52px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
</style>

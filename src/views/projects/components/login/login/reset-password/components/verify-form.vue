<template>
  <div class="form">
    <et-input
      v-model="$v.form.account.$model"
      placeholder="请输入11位手机号"
      type="text"
      class="margin-space"
    >
      <div slot="label">手机号</div>
      <div slot="head-icon">
        <img src="~@/assets/icons/icon_phone.png" alt="icon">
      </div>
    </et-input>
    <div class="flex-input margin-space">
      <div>
        <et-input v-model="$v.form.vercode.$model" placeholder="请输入验证码" type="text">
          <div slot="label">验证码</div>
          <div slot="head-icon">
            <img src="~@/assets/icons/icon_vericode.png" alt="icon">
          </div>
        </et-input>
      </div>
      <div>
        <el-button
          class="vercode-button"
          :disabled="isGettingVercode || time > 0"
          @click="getVercode"
        >
          <span v-if="!isGettingVercode && time <= 0">获取验证码</span>
          <span v-else-if="isGettingVercode">正在发送</span>
          <span v-else>{{time}}秒后重新获取</span>
        </el-button>
      </div>
    </div>
    <el-button class="login-button" @click="retrievePasswordVerify">提交</el-button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import EtInput from '@/components/input';
import { validataPhoneNumber } from '@/utils/validate';

export default {
  name: 'VerifyForm',
  components: {
    EtInput,
  },
  validations: {
    form: {
      vercode: {
        required,
      },
      account: {
        isPhone(phone) {
          return phone && validataPhoneNumber(phone);
        },
      },
    },
  },
  data() {
    return {
      form: {
        account: '',
        vercode: '',
      },
      time: 0,
      timer: null,
      isGettingVercode: false,
    };
  },
  methods: {
    validateVercodeForm() {
      this.$v.form.account.$touch();
      if (this.$v.form.account.$invalid) {
        this.$message({
          message: '请输入手机号',
          type: 'warning',
        });
        return false;
      }
      return true;
    },
    async getVercode() {
      try {
        if (this.isGettingVercode || this.time > 0) {
          return;
        }
        if (!this.validateVercodeForm()) {
          return;
        }
        // const parameters = {
        //   params: {
        //     type: 'forget',
        //     account: this.form.account,
        //   },
        // };

        // this.isGettingVercode = true;

        // await requestVercode(parameters);

        this.$message({
          message: '验证码已发送',
          type: 'success',
        });
        this.countdown();
      } catch (error) {
        if (error.response) {
          const { response } = error;
          const { data } = response;
          this.$message.error(`获取验证码失败 ${data.error.message}`);
        } else {
          this.$message.error('获取验证码失败');
        }
        this.loading = false;
      } finally {
        this.isGettingVercode = false;
      }
    },
    countdown() {
      clearInterval(this.timer);
      this.time = 60;
      this.timer = setInterval(() => {
        this.time = this.time - 1;
        if (this.time < 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    async retrievePasswordFormValidate() {
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },
    async retrievePasswordVerify() {
      try {
        if (this.retrievePasswordFormValidate()) {
          // const parameters = {
          //   body: this.form,
          // };
          // const response = await retrievePasswordVerify(parameters);
          // this.routerToReset(response.headers.transaction);
        } else {
          this.$message({
            message: '请填写完整表单',
            type: 'warning',
          });
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data.error.id === 1005) {
          this.$message({
            message: '用户不存在',
            type: 'error',
          });
        } else {
          this.$message({
            message: '验证错误',
            type: 'warning',
          });
        }
      }
    },
    routerToReset(transaction) {
      this.$emit('router-to-retrieve', transaction);
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
  input[type='checkbox'] + label::before {
    content: '\a0';
    display: inline-block;
    font-size: 14px;
    width: 14px;
    height: 14px;
    margin-right: 0.4em;
    border: 1px solid rgb(58, 175, 159);
    border-radius: 3px;
    cursor: pointer;
  }
  input[type='checkbox']:checked + label::before {
    background: url('~@/assets/icons/checked.png') no-repeat;
    background-size: 100% 100%;
    background-clip: content-box;
  }
  input[type='checkbox'] {
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

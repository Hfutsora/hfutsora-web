<template>
  <div class="form">
    <et-input
      v-model="$v.form.password.$model"
      placeholder="密码长度不小于8位"
      type="password"
      class="margin-space"
    >
      <div slot="label">设置新密码</div>
      <div slot="head-icon">
        <img
          src="~@/assets/icons/icon_lock.png"
          alt="icon"
        >
      </div>
    </et-input>
    <et-input
      v-model="$v.form.repeatPassword.$model"
      placeholder="确认密码"
      type="password"
      class="margin-space"
    >
      <div slot="label">密码</div>
      <div slot="head-icon">
        <img
          src="~@/assets/icons/icon_lock.png"
          alt="icon"
        >
      </div>
    </et-input>
    <el-button
      class="login-button"
      @click.stop.prevent="retrievePassword"
    >重置密码</el-button>
  </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators';
import EtInput from '@/components/input';

export default {
  name: 'ResetForm',
  components: {
    EtInput,
  },
  props: {
    transaction: {
      type: String,
      required: true,
    },
  },
  validations: {
    form: {
      password: {
        required,
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  data() {
    return {
      form: {
        password: '',
        repeatPassword: '',
      },
    };
  },
  methods: {
    retrieveFormValidate() {
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },
    async retrievePassword() {
      try {
        if (this.retrieveFormValidate()) {
          // const parameters = {
          //   headers: {
          //     transaction: this.transaction,
          //   },
          //   body: {
          //     password: this.form.password,
          //   },
          // };

          // await retrievePassword(parameters);
          // this.$router.push('/login');
        } else {
          this.$message({
            message: '请填写完整表单',
            type: 'warning',
          });
        }
      } catch (err) {
        this.$message({
          message: '更改密码失败',
          type: 'error',
        });
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
.flex-input {
  height: 52px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
</style>

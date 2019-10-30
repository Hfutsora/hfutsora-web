<template>
  <div class="login-view">
    <div class="flex-center">
      <Navbar class="navbar"></Navbar>
    </div>
    <div class="flex-center">
      <div class="login-area">
        <!-- 切换区域 -->
        <div class="login-area-selection flex-vertical-center">
          <h1 class="title">重置密码
            <div class="title-border"></div>
          </h1>
        </div>
        <!-- 表格区域  -->
        <div class="login-form">
          <div class="login-buttons">
            <img src="~@/assets/login/reset-center-icon.png" alt="返回" @click="$router.push('/login')">
          </div>
          <component :is="active" @router-to-retrieve="routerToRetrieve" :transaction="transaction"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import ResetForm from './components/reset-form';
import VerifyForm from './components/verify-form';

export default {
  name: 'ResetPassword',
  components: {
    Navbar,
    ResetForm,
    VerifyForm,
  },
  data() {
    return {
      active: 'VerifyForm',
      userIndex: 0,
      userMap: ['项目方', '投资方', '合作伙伴'],
      transaction: '',
    };
  },
  methods: {
    routerToRetrieve(transaction) {
      this.transaction = transaction;
      this.active = 'ResetForm';
    },
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  height: 100vh;
  min-height: 870px;
  background: url('~@/assets/login/login_bg.png') no-repeat;
  background-size: 100% 100%;
}
.login-area {
  margin: 143px 0;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 50px 50px 0px rgba(58, 175, 159, 0.6);
  color: white;
  width: 800px;
  height: 500px;
  .login-area-selection {
    width: 300px;
    height: 500px;
    position: absolute;
    background: url('~@/assets/login/reset-select-bg.png') no-repeat;
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
    .login-buttons {
      position: absolute;
      left: 0;
      cursor: pointer;
    }
  }
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

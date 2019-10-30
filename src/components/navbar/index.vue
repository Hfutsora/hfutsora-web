<template>
  <div :style="navActiveStyle" class="navbar-container flex-center flex-vertical-center">
    <div v-for="nav in navList" :key="nav.name">
      <router-link v-if="nav.name !== 'Logo'" :to="nav.path" class="nav-link" :style="navLinkActiveStyle">{{nav.name}}</router-link>
      <el-image v-else class="logo" :src="logo" alt="img" fit="cover"/>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import logo from '@/assets/logo.png';

export default {
  name: 'NavbarComponent',
  computed: {
    navActiveStyle() {
      return {
        height: `${store.getters.navHeight}px`,
      };
    },
    navLinkActiveStyle() {
      return {
        height: `${store.getters.navHeight}px`,
        lineHeight: '60px',
      };
    },
  },
  data() {
    return {
      logo,
      navList: [{
        path: '/',
        name: '首页',
      }, {
        path: '/projects',
        name: '项目经历',
      }, {
        path: '/hobby',
        name: '爱好特长',
      }, {
        path: '/resume',
        name: '个人简历',
      }],
    };
  },
  created() {
    const logoObj = {
      path: '/',
      name: 'Logo',
    };
    if (this.navList.length % 2 === 0) {
      const logoLocation = this.navList.length / 2;
      this.navList.splice(logoLocation, 0, logoObj);

      console.log('navList', logoLocation, this.navList);
    } else {
      this.navList.unshift(logoObj);
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar-container {
  width: 100vw;
  background: rgba($color: #353535, $alpha: .9);
  font-size: 20px;
  color: white;
  position: fixed;
  z-index: 99;
}
.nav-link {
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  min-width: 150px;
  &:hover {
    background: #000;
  }
}

.logo {
  width: 85px;
  height: 85px;
  border-radius: 100%;
  margin: 50px 12px 0;
  border: 1px solid rgba(53, 53, 53, 0.5);
}
</style>

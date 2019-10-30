import Vue from 'vue';
import Router from 'vue-router';

const requireRoutes = require.context('./modules', true, /.js/);
const routeRegister = [];

requireRoutes.keys().forEach((fileName) => {
  const reqCom = requireRoutes(fileName);

  const reqComEntry = reqCom.default || reqCom;
  if (!reqComEntry) {
    return;
  }

  routeRegister.push(reqComEntry);
});

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/projects',
    name: 'Root',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
  },
  ...routeRegister,
  { path: '*', redirect: '/404' },
];

export const asyncRouterMap = [
  {
    path: 'external-link',
    // component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
    hidden: true,
  },

  { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap,
});

export default {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home'),
  },
  {
    path: 'project/login',
    name: 'Login',
    component: () => import('@/views/projects/components/login'),
  }, {
    path: 'project/care',
    name: 'Care',
    component: () => import('@/views/projects/components/care'),
  },
  {
    path: 'project/three-js',
    name: 'ThreeJs',
    component: () => import('@/views/projects/components/three-js'),
  },
  {
    path: 'project/et',
    name: 'Et',
    redirect: 'project/et/quesionnaire/1',
    component: () => import('@/views/projects/components/et'),
    children: [{
      props: true,
      path: 'quesionnaire/:active',
      name: 'EtQuestionnaire',
      component: () => import('@/views/projects/components/et/components/questionnaire-layout'),
    }, {
      path: 'render',
      name: 'EtRender',
      component: () => import('@/views/projects/components/et/components/render'),
    }, {
      path: 'score',
      name: 'EtScore',
      component: () => import('@/views/projects/components/et/components/score'),
    }, {
      path: 'steps',
      name: 'EtSteps',
      component: () => import('@/views/projects/components/et/components/special-steps'),
    }],
  },
  {
    path: 'project/shop',
    name: 'Shop',
    redirect: 'project/shop/commodity-manage',
    component: () => import('@/views/projects/components/shop'),
    children: [{
      path: 'commodity-manage',
      name: 'CommodityManage',
      component: () => import('@/views/projects/components/shop/components/commodity-manage'),
    }, {
      path: 'multiple-select',
      name: 'MultipleSelect',
      component: () => import('@/views/projects/components/shop/components/multiple-select'),
    }, {
      path: 'chat',
      name: 'Chat',
      component: () => import('@/views/projects/components/shop/components/chat'),
    }],
  }],
};

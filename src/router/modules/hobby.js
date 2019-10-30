export default {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: 'hobby',
    name: 'Hobby',
    component: () => import('@/views/hobby'),
  }],
};

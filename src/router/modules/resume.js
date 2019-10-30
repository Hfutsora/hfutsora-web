export default {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: 'resume',
    name: 'Resume',
    component: () => import('@/views/resume'),
  }],
};

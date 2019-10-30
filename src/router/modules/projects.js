export default {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: 'projects',
    name: 'Projects',
    component: () => import('@/views/projects'),
  }],
};

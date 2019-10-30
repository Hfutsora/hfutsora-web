import NProgress from 'nprogress'; // progress bar
import router from '@/router';
// import store from '@/store';
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // getToken from cookie
import whiteList from './white-list';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar

  if (getToken()) {
    // determine if there has token
    /* has token */
    if (to.path === '/login') {
      next();
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    }
  } else if (whiteList.some((whiteListItem) => {
    if (whiteListItem instanceof RegExp) {
      return to.path.match(whiteListItem);
    }
    return whiteListItem === to.path;
  })) {
    // 在免登录白名单，直接进入
    next();
  } else {
    /* has no token */
    next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

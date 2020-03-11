/*
 * @Desc: 描述
 * @Date: 2020-03-07 15:09:19
 * @LastEditTime: 2020-03-11 00:53:54
 */
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {
  getToken,
  getCookie
} from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/signin', '/signup'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/signin') {
      if (getCookie('authority') === 0) {
        next({
          path: '/home'
        })
      } else {
        next({
          path: '/admin'
        })
      }
      NProgress.done()
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    next('/signin') // 否则全部重定向到登录页
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

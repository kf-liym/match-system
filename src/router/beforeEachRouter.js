/*
 * @Desc: 路由守卫
 * @Date: 2020-03-10 23:24:43
 * @LastEditTime: 2020-03-25 00:30:37
 */
import store from '@/store'
import Router from '@/router/index'
// 引入默认字段配置文件
// import Default from 'pro/config/default.js'
// const whiteList = ['/signin', '/signup']
Router.beforeEach((to, from, next) => {
  store.commit('SET_AUTHOR', store.state.user.id)
  // if (to.path.indexOf('/home/') !== -1) {
  //   if (store.state.user.authority === 1 && to.query.id) {
  //     store.commit('SET_AUTHOR', to.query.id)
  //   } else {
  //     next('/admin')
  //   }

  // } else if (to.path.indexOf('/admin/') !== -1 && store.state.user.authority !== 1) {
  //   next('/home')
  // } else {
  //   next()
  // }

  if (to.path.indexOf('/home/') !== -1) {
    if (store.state.user.authority === 1 && to.query.id) {
      store.commit('SET_AUTHOR', to.query.id)
    } else if (store.state.user.authority === 1 && !to.query.id) {
      next('/admin')
    }

  } else if (to.path.indexOf('/admin/') !== -1 && store.state.user.authority !== 1) {
    next('/home')
  }
  next()


})

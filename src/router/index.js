import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'layout',
  redirect: '/home',
  component: () => import('@/views/layout/index.vue'),
  children: [
    // 登录
    {
      path: 'signin',
      name: 'signin',
      component: () => import('@/views/sign/signin.vue')
    },
    {
      path: 'signup',
      name: 'signup',
      component: () => import('@/views/sign/signup.vue')
    },
    // 首页
    {
      path: 'home',
      name: 'home',
      redirect: '/home/common-info',
      component: () => import('@/views/home/index.vue'),
      children: [{
        path: 'common-info',
        name: 'common-info',
        component: () => import('@/views/common-info/index.vue')
      }, {
        path: 'upload-responsibility',
        name: 'uploadResponsibility',
        component: () => import('@/views/home/step1/index.vue')
      }, {
        path: 'basic-information',
        name: 'basicInformation',
        component: () => import('@/views/home/step2/index.vue')
      }, {
        path: 'item-information',
        name: 'itemInformation',
        component: () => import('@/views/home/step3/index.vue')
      }, {
        path: 'item-summary',
        name: 'itemSummary',
        component: () => import('@/views/home/step4/index.vue')
      }, {
        path: 'upload-prove',
        name: 'uploadProve',
        component: () => import('@/views/home/step5/index.vue')
      }, {
        path: 'submit-review',
        name: 'submitReview',
        component: () => import('@/views/home/step6/index.vue')
      }]
    }
    // 常用报名人
    // {
    //   path: 'commonInfo',
    //   name: 'commonInfo',
    //   component: () => import('@/views/common-info/index.vue')
    // }
  ]
},
{
  path: '/admin',
  name: 'admin',
  redirect: '/admin/index',
  component: () => import('@/views/layout-admin/index.vue'),
  children: [{
    path: 'index',
    name: 'adminIndex',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: 'review',
    name: 'adminReview',
    component: () => import('@/views/admin/review.vue')
  }
  ]
}
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

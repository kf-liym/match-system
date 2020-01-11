import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/sign/signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/sign/signup.vue')
    },
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: 'commonInfo',
      name: 'commonInfo',
      component: () => import('@/views/common-info/index.vue')
    }
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

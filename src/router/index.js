import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/signin',
        name: 'signin',
        component: () => import('../views/sign/signin.vue')
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/sign/signup.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/admin.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
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

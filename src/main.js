/*
 * @Desc: 描述
 * @Date: 2020-01-09 01:06:48
 * @LastEditTime: 2020-03-11 22:06:13
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import elementui from 'element-ui'
import './permission'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// import tinymce from 'tinymce/tinymce'
// import Editor from '@tinymce/tinymce-vue'
// import 'tinymce/themes/silver'
import '@/router/beforeEachRouter'

import vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/main.scss'
// import './mock'

import * as filters from './filters' // global filters

Vue.use(vuex)
// Vue.use(VueQuillEditor)

Vue.use(elementui)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

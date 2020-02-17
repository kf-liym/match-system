import Vue from 'vue'
import Vuex from 'vuex'
import applicants from './modules/applicants-module'
import project from './modules/project-module'

import user from './modules/user-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {},
  actions: {},
  modules: {
    applicants,
    project,
    user
  }
})

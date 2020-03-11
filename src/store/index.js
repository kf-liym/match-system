import Vue from 'vue'
import Vuex from 'vuex'
import applicants from './modules/applicants-module'
// import project from './modules/project-module'
import getters from './getters'

import user from './modules/user'
import project from './modules/project'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    applicants,
    project,
    user
  },
  getters
})

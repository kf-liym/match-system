import Vue from 'vue'
import Vuex from 'vuex'
import applicants from './modules/applicants-module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {},
  actions: {},
  modules: {
    applicants
  }
})

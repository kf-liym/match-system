/*
 * @Desc: 描述
 * @Date: 2020-03-07 17:32:12
 * @LastEditTime: 2020-03-11 01:27:38
 */
const project = {
  state: {
    status: 0,
    step: 0,
    stepArr: [
      {
        title: '常用报名人设置',
        path: '/home/common-info'
      }, {
        title: '填写基本信息',
        path: '/home/basic-information'
      }, {
        title: '填写报项信息',
        path: '/home/item-information'
      }, {
        title: '报项汇总',
        path: '/home/item-summary'
      }, {
        title: '上传责任书',
        path: '/home/upload-responsibility'
      }, {
        title: '上传汇款证明',
        path: '/home/upload-prove'
      }, {
        title: '提交并等待审核',
        path: '/home/submit-review'
      }
    ],
    members: []
  },
  mutations: {
    SET_STATUS (state, status) {
      state.status = status
    },
    SET_MEMBERS (state, members) {
      state.members = members
    },
    SET_STEP (state, step) {
      state.step = step
    },
    CLEAR_PROJECT (state) {
      state.status = 0
      state.step = 0
      state.members = []
    }
  },
  actions: {
    STEP_PREV ({ commit, state }, vm) {
      state.step--
      vm.router.push({
        path: state.stepArr[state.step].path,
        query: vm.route.query
      })
    },
    STEP_NEXT ({ commit, state }, vm) {
      state.step++
      vm.router.push({
        path: state.stepArr[state.step].path,
        query: vm.route.query
      })

    }
  }
}

export default project
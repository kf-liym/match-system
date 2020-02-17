export default {
  state: {
    step: 0,
    status: '未提交',
    responsibility: [],
    remittance: [],
    person: [],
    duel: [],
    collective: [],
    team: {
      teamName: '', // 队伍名称
      leaderName: '', // 领队姓名
      tel: '', // 联系电话
      coachName: '' // 教练姓名
    }
  },
  mutations: {
    SET_STEP: (state, step) => {
      state.step = step
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_RESPONSIBILITY: (state, responsibility) => {
      state.responsibility = responsibility
    },
    SET_REMITTANCE: (state, remittance) => {
      state.remittance = remittance
    },
    SET_PERSON: (state, person) => {
      state.person = person;
    },
    SET_DULE: (state, duel) => {
      state.duel = duel;
    },
    SET_COLLECTIVE: (state, collective) => {
      state.collective = collective;
    },
    SET_TEAM: (state, team) => {
      state.team = team;
    }
  },
  actions: {},
  getters: {}
}
export default {
  state: {
    person: [
      {
        id: '',
        name: 'dddd',
        certificate: '', // 证件类型
        idcard: '',
        birth: '',
        sex: '',
        size: '',
        group: '',
        project: {
          boxing: {
            label: 'ddd',
            type: 0
          }, // 拳术项目
          boxingRoutine: '', // 拳术套路名称
          instrument: {
            label: 'eee',
            type: 0
          }, // 器械项目
          instrumentRoutine: 'ee' // 器械套路名称
        }

      },
      {
        id: '',
        name: 'dddd',
        certificate: '', // 证件类型
        idcard: '',
        birth: '',
        sex: '',
        size: '',
        group: '',
        project: {
          boxing: {
            label: 'ddd',
            type: 0
          }, // 拳术项目
          boxingRoutine: 'cc', // 拳术套路名称
          instrument: {}, // 器械项目
          instrumentRoutine: 'ee' // 器械套路名称
        }
      }
    ],
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
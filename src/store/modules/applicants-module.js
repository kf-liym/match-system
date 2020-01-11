export default {
  state: {
    applicantList: [{
      name: '111',
      certificate: '111', // 证件类型
      IDNumber: '111',
      birth: '111',
      sex: '111',
      readonly: true
    }
    ]
  },
  mutations: {
    setApplicantListArray: (state, applicantList) => {
      state.applicantList.push(applicantList);
    },
    removeApplicant: (state, index) => {
      state.applicantList.slpice(index);
    }
  },
  actions: {},
  getters: {}
}
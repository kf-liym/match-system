export default {
  state: {
    applicantList: [{
      name: 'l',
      certificate: '111', // 证件类型
      idcard: '111',
      birth: '111',
      sex: '111',
      readonly: true
    }],
    applicants: [
    ]
  },
  mutations: {
    setApplicantListArray: (state, applicantList) => {
      state.applicantList.push(applicantList);
    },
    removeApplicant: (state, index) => {
      state.applicantList.slpice(index);
    },
    SET_APPLICANTS: (state, val) => {
      console.log('SET_APPLICANTS', val)
      state.applicants = val;
    }
  },
  actions: {},
  getters: {}
}

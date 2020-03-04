const Mock = require('mockjs')
const data = require('./data.js')

// 登录
Mock.mock('/api/sign/signin', 'post', (options) => {
  const user = JSON.parse(options.body);
  if (user.username === 'admin') {
    return {
      message: 'ok',
      is_admin: true
    }
  } else {
    return {
      message: 'ok',
      is_admin: false
    }
  }
})

// 获取所有数据汇总信息
Mock.mock('/api/teams/count', 'get', data.teamsCount)
Mock.mock(RegExp('/api/teams/list.*'), 'get', data.teamsList)
Mock.mock(RegExp('/api/team/reject.*'), 'get', data.teamReject)
// Mock.mock(RegExp('/api/teams/.*'), 'get', data.adminIndex)

// 团队详情
Mock.mock('/api/team/info', 'post', (options) => {
  return {
    message: 'ok'
  }
})
// 获取报项列表
Mock.mock('/api/project/info', 'get', (options) => {
  return {
    status: '未提交',
    responsibility: [],
    team: {
      teamName: '队伍名称', // 队伍名称
      leaderName: '领队姓名', // 领队姓名
      tel: '联系电话', // 联系电话
      coachName: '教练姓名' // 教练姓名
    },
    remittance: [],
    person: [
      {
        id: '001',
        name: 'dddd',
        certificate: '身份证', // 证件类型
        idcard: '445221199312254545',
        birth: '1993-12-25',
        sex: '女',
        size: '大码',
        group: '少年组（A组）',
        project: {
          boxing: {
            label: 'ddd',
            type: 1
          }, // 拳术项目
          boxingRoutine: '', // 拳术套路名称
          instrument: {
            label: 'eee',
            type: 0
          }, // 器械项目
          instrumentRoutine: 'ee' // 器械套路名称
        }

      }, {
        id: '001',
        name: 'dddd',
        certificate: '身份证', // 证件类型
        idcard: '445221199312254545',
        birth: '1993-12-25',
        sex: '女',
        size: '大码',
        group: '少年组（A组）',
        project: {
          boxing: {
            label: 'ddd',
            type: 0
          }, // 拳术项目
          boxingRoutine: '', // 拳术套路名称
          instrument: {}, // 器械项目
          instrumentRoutine: '' // 器械套路名称
        }

      }
    ],
    duel: [
      {
        contestants: [{
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        },
        {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }
        ],
        itemType: {
          label: '双人太极拳对练',
          type: 0
        },
        itemName: 'dddddd'
      },
      {
        contestants: [{
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        },
        {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }
        ],
        itemType: {
          label: '双人太极器械对练',
          type: 0
        },
        itemName: ''
      }
    ],
    collective: [
      {
        contestants: [{
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }, {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }, {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }],
        itemType: {
          label: '集体太极器械',
          type: 1
        },
        itemName: 'dddddd'
      }, {
        contestants: [{
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        },
        {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        },
        {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        },
        {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }, {
          id: '001',
          name: 'dddd',
          certificate: '身份证', // 证件类型
          idcard: '445221199312254545',
          birth: '1993-12-25',
          sex: '女',
          size: '大码',
          group: '少年组'
        }
        ],
        itemType: {
          label: '集体太极八法五步',
          type: 0
        },
        itemName: ''
      }]
  }
})


// 个人报项-添加
Mock.mock('/api/person/add', 'post', (options) => {
  return {
    message: 'ok'
  }
})

// 对练报项-添加
Mock.mock('/api/duel/add', 'post', (options) => {
  return {
    message: 'ok'
  }
})
// 集体报项-添加
Mock.mock('/api/collective/add', 'post', (options) => {
  return {
    message: 'ok'
  }
})
// 获取常用人信息
Mock.mock(RegExp('/api/applicants/list.*'), 'get', (options) => {
  return [
    {
      id: '001',
      name: '王小虎1',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444441',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎2',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444442',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎3',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444443',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎4',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444444',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎5',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444445',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎6',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444446',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎7',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444447',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎8',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444448',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎9',
      certificate: '身份证', // 证件类型
      idcard: '4444444444444444449',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎10',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444410',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎11',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444411',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '0011',
      name: '王小虎12',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444412',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎13',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444413',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎14',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444414',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }, {
      id: '001',
      name: '王小虎15',
      certificate: '身份证', // 证件类型
      idcard: '44444444444444444415',
      birth: '2020-02-03',
      sex: '男',
      size: '大码'
    }
  ]
})

// 常用人信息-添加
Mock.mock('/api/applicants/add', 'post', (options) => {
  return {
    message: 'ok'
  }
})
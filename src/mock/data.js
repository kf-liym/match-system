const Mock = require('mockjs')
// 登录
export const signin = {
  // 登录成功
  message: 'ok',
  // 是否管理员
  is_admin: true
}

// 登出
export const signout = {
  // ok 为退出登录
  message: 'ok'
}

// 获取所有数据汇总信息
export const teamsCount = {
  registered: 3000,
  unsubmitted: 3000,
  pending: 3000,
  pass: 3000,
  sex: 3000,
  male: 3000,
  female: 3000,
  project: 3000,
  personal: 3000,
  duel: 3000,
  collective: 3000
}

// 获取所有用户报项信息
export const teamsList = Mock.mock({
  'count': '@natural(50, 100)',
  'list|10': [{
    'id': '@id',
    // 从右侧随机提取一个
    'status|1': ['未提交', '待审核', '已审核'],
    // 从右侧随机提取一个
    'comfirmStatus|1': ['未提交', '已提交'],
    // 从右侧随机提取一个
    'reviewStatus|1': ['待审核', '已审核'],
    // 用户名
    'username': 'admin',
    // 密码
    'password': '123456',
    // 队伍名称
    'teamName': '队伍名称',
    // 随机生成一个领队姓名
    'leaderName': '@cname',
    // 联系电话
    tel: '123658252152',
    cost: 100, // 费用
    coachName: '@cname',
    // 责任书
    responsibility: [
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2844401865,2654823704&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg'
    ],
    // 汇款证明
    remittance: [
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1207178343,294634082&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1282658402,332009284&fm=26&gp=0.jpg'
    ],
    person: [{
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

    }],
    duel: [{
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
    collective: [{
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
  }]
})

// 打回
export const teamReject = {
  message: 'ok'
}

// 团队详情
export const TeamInfo = {

}
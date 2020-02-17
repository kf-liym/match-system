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
      'http://img0.imgtn.bdimg.com/it/u=189938348,3034038280&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=2559439006,2478746735&fm=26&gp=0.jpg'
    ],
    // 汇款证明
    remittance: [
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3040939732,336847597&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=107997246,254265976&fm=26&gp=0.jpg'
    ],
    personalProject: [{
      index: '1',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    }, {
      index: '2',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    }, {
      index: '3',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    }],
    // 对练项目
    duelExercises: [{
      index: '1-1',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    },
    {
      index: '1-2',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    },
    {
      index: '2-1',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    },
    {
      index: '2-2',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    }
    ],
    // 集体项目
    collectiveProject: [{
      index: '1-1',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    },
    {
      index: '1-2',
      name: '@cname',
      idcard: '440671199725145421',
      birth: '1997-02-12',
      sex: '男',
      group: '男子少年组',
      projectName: '传统拳术-蔡李佛拳-杠力拳',
      cost: 50
    }
    ]
  }]
})

// 打回
export const teamReject = {
  message: 'ok'
}

// 团队详情
export const TeamInfo = {

}
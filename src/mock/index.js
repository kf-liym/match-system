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
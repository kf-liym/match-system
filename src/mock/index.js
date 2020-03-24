import axios from './res.js'
const Mock = require('mockjs')
// const data = require('./data.js')
// 登录
Mock.mock('/api/sign/signin', 'post', options => axios.signin.post(options))

// 注册
Mock.mock('/api/sign/signup', 'post', options => axios.signup.post(options))

// 登出
Mock.mock('/api/sign/signout', 'post', options => axios.signout.post(options))

// 获取常用报名人信息
Mock.mock('/api/member/list', 'get', options => axios.members.get(options))

// 常用报名人-添加
Mock.mock(RegExp('/api/member.*'), 'post', options => axios.member.post(options))
// 常用报名人-修改
Mock.mock(RegExp('/api/member.*'), 'put', options => axios.member.put(options))
// 常用报名人-删除
Mock.mock(RegExp('/api/member.*'), 'delete', options => axios.member.del(options))

// 常用报名人-添加
Mock.mock(RegExp('/admin/member.*'), 'post', options => axios.member.post(options))
// 常用报名人-修改
Mock.mock(RegExp('/admin/member.*'), 'put', options => axios.member.put(options))
// 常用报名人-删除
Mock.mock(RegExp('/admin/member.*'), 'delete', options => axios.member.del(options))

// 团队基础信息-获取
Mock.mock(RegExp('/api/team.*'), 'get', options => axios.team.get(options))


// 团队基础信息-保存
Mock.mock(RegExp('/api/team.*'), 'post', options => axios.team.post(options))
// 团队基础信息-保存-后台
Mock.mock(RegExp('/admin/team.*'), 'post', options => axios.team.post(options))
// 团队基础信息-保存-后台
Mock.mock(RegExp('/admin/team.*'), 'get', options => axios.admin.team(options))
// 所有信息-获取
Mock.mock('/api/all', 'get', options => axios.all.get(options))
// 责任书-上传
Mock.mock(RegExp('api/upload/responsibilitys.*'), 'get', (req, res) => axios.responsibility.list(req, res))
Mock.mock(RegExp('api/upload/responsibility.*'), 'post', (req, res) => axios.responsibility.post(req, res))
Mock.mock(RegExp('api/upload/responsibility.*'), 'get', (req, res) => axios.responsibility.get(req, res))
// 责任书-后台管理
Mock.mock(RegExp('admin/upload/responsibilitys.*'), 'get', (req, res) => axios.responsibility.list(req, res))
Mock.mock(RegExp('admin/upload/responsibility.*'), 'post', (req, res) => axios.responsibility.post(req, res))
Mock.mock(RegExp('admin/upload/responsibility.*'), 'get', (req, res) => axios.responsibility.get(req, res))


// 汇款证明-上传
Mock.mock(RegExp('api/upload/proves.*'), 'get', (req, res) => axios.prove.list(req, res))
Mock.mock(RegExp('api/upload/prove.*'), 'post', (req, res) => axios.prove.post(req, res))
Mock.mock(RegExp('api/upload/prove.*'), 'get', (req, res) => axios.prove.get(req, res))

Mock.mock(RegExp('admin/upload/proves.*'), 'get', (req, res) => axios.prove.list(req, res))
Mock.mock(RegExp('admin/upload/prove.*'), 'post', (req, res) => axios.prove.post(req, res))
Mock.mock(RegExp('admin/upload/prove.*'), 'get', (req, res) => axios.prove.get(req, res))

// 提交报项
Mock.mock(RegExp('api/form/submit.*'), 'post', (req, res) => axios.form.post(req, res))


// 个人报项-获取
Mock.mock('/api/persons', 'get', options => axios.person.list(options))
// 个人报项-添加
Mock.mock(RegExp('/api/person.*'), 'post', options => axios.person.post(options))
// 个人报项-修改
Mock.mock(RegExp('/api/person.*'), 'put', options => axios.person.put(options))
// 个人报项-删除
Mock.mock(RegExp('/api/person.*'), 'delete', options => axios.person.del(options))

// 个人报项-添加
Mock.mock(RegExp('/admin/person.*'), 'post', options => axios.person.post(options))
// 个人报项-修改
Mock.mock(RegExp('/admin/person.*'), 'put', options => axios.person.put(options))
// 个人报项-删除
Mock.mock(RegExp('/admin/person.*'), 'delete', options => axios.person.del(options))

// 对练报项-获取
Mock.mock('/api/duels', 'get', options => axios.duel.list(options))
// 对练报项-添加
Mock.mock(RegExp('/api/duel.*'), 'post', options => axios.duel.post(options))
// 对练报项-修改
Mock.mock(RegExp('/api/duel.*'), 'put', options => axios.duel.put(options))
// 对练报项-删除
Mock.mock(RegExp('/api/duel.*'), 'delete', options => axios.duel.del(options))

// 对练报项-添加
Mock.mock(RegExp('/admin/duel.*'), 'post', options => axios.duel.post(options))
// 对练报项-修改
Mock.mock(RegExp('/admin/duel.*'), 'put', options => axios.duel.put(options))
// 对练报项-删除
Mock.mock(RegExp('/admin/duel.*'), 'delete', options => axios.duel.del(options))

// 集体报项-获取
Mock.mock(RegExp('/api/collective.*'), 'get', options => axios.collective.list(options))
// 集体报项-添加
Mock.mock(RegExp('/api/collective.*'), 'post', options => axios.collective.post(options))
// 集体报项-修改
Mock.mock(RegExp('/api/collective.*'), 'put', options => axios.collective.put(options))
// 集体报项-删除
Mock.mock(RegExp('/api/collective.*'), 'delete', options => axios.collective.del(options))

// 集体报项-添加
Mock.mock(RegExp('/admin/collective.*'), 'post', options => axios.collective.post(options))
// 集体报项-修改
Mock.mock(RegExp('/admin/collective.*'), 'put', options => axios.collective.put(options))
// 集体报项-删除
Mock.mock(RegExp('/admin/collective.*'), 'delete', options => axios.collective.del(options))


// 获取总数
Mock.mock(RegExp('/admin/count.*'), 'get', (req, res) => axios.admin.count(req, res))
// 用户数据
Mock.mock(RegExp('/admin/list.*'), 'get', (req, res) => axios.admin.list(req, res))

Mock.mock(RegExp('/admin/reject.*'), 'post', (req, res) => axios.admin.reject(req, res))
Mock.mock(RegExp('/admin/pass.*'), 'post', (req, res) => axios.admin.pass(req, res))
/*
 * @Desc: 描述
 * @Date: 2020-01-11 22:13:10
 * @LastEditTime: 2020-03-25 01:18:27
 */
import request from '@/utils/request'

/**
 * 登录 api
 */
export function signin (data) {
  return request({
    url: '/api/sign/signin',
    method: 'post',
    data
  })
}

/**
 * 注册 api
 */
export function signup (data) {
  return request({
    url: '/api/sign/signup',
    method: 'post',
    data
  })
}

/**
 * 注销 api
 */
export function signout (data) {
  return request({
    url: '/api/sign/signout',
    method: 'post',
    data
  })
}


// 获取常用报名人列表
export function getMembers (data) {
  return request({
    url: '/api/member/list',
    method: 'get',
    data
  })
}

// 常用报名人-添加
export function addMember (data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/member`,
    method: 'post',
    data
  })
}

// 常用报名人-获取报名人信息
export function getMember (id) {
  return request({
    url: `/api/member/${id}`,
    method: 'get'
  })
}

// 常用报名人-删除
export function delMember (id, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/member/${id}`,
    method: 'delete'
  })
}

// 常用报名人-修改
export function putMember (id, data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/member/${id}`,
    method: 'put',
    data
  })
}

// 保存团队基本信息
export function saveTeam (data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/team`,
    method: 'post',
    data
  })
}

// 获取团队基本信息
export function getTeam () {
  return request({
    url: '/api/team',
    method: 'get'
  })
}

// 获取所有项目报项信息
export function getAll () {
  return request({
    url: '/api/all',
    method: 'get'
  })
}


// 报项-个人-获取列表
export function getPersons () {
  return request({
    url: '/api/persons',
    method: 'get'
  })
}
// 报项-个人-添加
export function addPerson (data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/person`,
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putPerson (id, data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/person/${id}`,
    method: 'put',
    data
  })
}
// 报项-个人-删除
export function delPerson (id, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/person/${id}`,
    method: 'delete'
  })
}

// 报项-对练-获取列表
export function getDuels () {
  return request({
    url: '/api/duels',
    method: 'get'
  })
}
// 报项-对练-添加
export function addDuel (data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/duel`,
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putDuel (id, data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/duel/${id}`,
    method: 'put',
    data
  })
}
// 报项-对练-删除
export function delDuel (id, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/duel/${id}`,
    method: 'delete'
  })
}

// 报项-集体-获取列表
export function getCollectives ($user = 'user') {
  return request({
    url: '/api/collectives',
    method: 'get'
  })
}
// 报项-集体-添加
export function addCollective (data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/collective`,
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putCollective (id, data, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/collective/${id}`,
    method: 'put',
    data
  })
}
// 报项-集体-删除
export function delCollective (id, $user = 'user') {
  const $api = $user === 'user' ? '/api' : '/admin'
  return request({
    url: `${$api}/collective/${id}`,
    method: 'delete'
  })
}

// 获取责任书列表
export function getResponsibility () {
  return request({
    url: 'api/upload/responsibilitys',
    method: 'get'
  })
}

// 获取责任书列表
export function getProve () {
  return request({
    url: 'api/upload/proves',
    method: 'get'
  })
}
// 提交
export function formSubmit (data) {
  return request({
    url: 'api/form/submit',
    method: 'post',
    data
  })
}

/**
 * 后台管理 - 首页
 * 获取所有数据汇总信息
 */
export function getAllCount () {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}

export function getAllList (query) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: query
  })
}

export function getAdminTeam (query) {
  return request({
    url: '/admin/team',
    method: 'get',
    params: query
  })
}
// 后台管理 - 打回
export function teamReject (id, data) {
  return request({
    url: `/admin/reject/${id}`,
    method: 'post',
    data
  })
}
// 后台管理 - 通过
export function teamPass (id, data) {
  return request({
    url: `/admin/pass/${id}`,
    method: 'post',
    data
  })
}



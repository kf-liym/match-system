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
export function addMember (data) {
  return request({
    url: '/api/member',
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
export function delMember (id) {
  return request({
    url: `/api/member/${id}`,
    method: 'delete'
  })
}

// 常用报名人-修改
export function putMember (id, data) {
  return request({
    url: `/api/member/${id}`,
    method: 'put',
    data
  })
}

// 保存团队基本信息
export function saveTeam (data) {
  return request({
    url: '/api/team',
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
export function addPerson (data) {
  return request({
    url: '/api/person',
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putPerson (id, data) {
  return request({
    url: `/api/person/${id}`,
    method: 'put',
    data
  })
}
// 报项-个人-删除
export function delPerson (id) {
  return request({
    url: `/api/person/${id}`,
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
export function addDuel (data) {
  return request({
    url: '/api/duel',
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putDuel (id, data) {
  return request({
    url: `/api/duel/${id}`,
    method: 'put',
    data
  })
}
// 报项-对练-删除
export function delDuel (id) {
  return request({
    url: `/api/duel/${id}`,
    method: 'delete'
  })
}

// 报项-集体-获取列表
export function getCollectives () {
  return request({
    url: '/api/collectives',
    method: 'get'
  })
}
// 报项-集体-添加
export function addCollective (data) {
  return request({
    url: '/api/collective',
    method: 'post',
    data
  })
}
// 报项-对练-修改
export function putCollective (id, data) {
  return request({
    url: `/api/collective/${id}`,
    method: 'put',
    data
  })
}
// 报项-集体-删除
export function delCollective (id) {
  return request({
    url: `/api/collective/${id}`,
    method: 'delete'
  })
}

// // 上传责任书
// export function addResponsibility (data) {
//   return request({
//     url: 'api/upload/responsibility',
//     method: 'post',
//     data
//   })
// }

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
    url: '/api/admin/count',
    method: 'get'
  })
}

export function getAllList (query) {
  return request({
    url: '/api/admin/list',
    method: 'get',
    params: query
  })
}

export function teamReject (id, data) {
  return request({
    url: `/api/admin/reject/${id}`,
    method: 'post',
    data
  })
}

export function teamPass (id, data) {
  return request({
    url: `/api/admin/pass/${id}`,
    method: 'post',
    data
  })
}



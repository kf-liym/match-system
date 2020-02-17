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
 * 注销 api
 */
export function signout (data) {
  return request({
    url: '/api/sign/signout',
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
    url: '/api/teams/count',
    method: 'get'
  })
}

/**
 * 后台管理-审核管理
 * 获取所有用户报项信息
 */
export function getList (data) {
  return request({
    url: '/api/teams/list',
    method: 'get',
    params: data
  })
}

/**
 * 后台管理-审核管理
 * 获取所有用户报项信息
 * @param data.id id
 */
export function teamReject (data) {
  return request({
    url: '/api/team/reject',
    method: 'get',
    params: data
  })
}

/**
 * 填项-审核管理
 * 获取所有用户报项信息
 * @param data.id id
 */
export function teamInfo (data) {
  return request({
    url: '/api/team/info',
    method: 'post',
    data
  })
}
/**
 * 获取报项列表
 */
export function peojectList () {
  return request({
    url: '/api/project/list',
    method: 'get'
  })
}
/**
 * 个人报项-添加
 */
export function personAdd (data) {
  return request({
    url: '/api/person/add',
    method: 'post',
    data
  })
}
/**
 * 个人报项-删除
 */
export function personDel (id) {
  return request({
    url: `/api/person/${id}`,
    method: 'delete'
  })
}
/**
 * 对练报项 - 添加
 */
export function duelAdd (data) {
  return request({
    url: '/api/duel/add',
    method: 'post',
    data
  })
}
/**
 * 对练报项 - 删除
 */
export function duelDel (id) {
  return request({
    url: `/api/duel/${id}`,
    method: 'delete'
  })
}
/**
 * 集体报项-添加
 */
export function collectiveAdd (data) {
  return request({
    url: '/api/collective/add',
    method: 'post',
    data
  })
}
/**
 * 集体报项-删除
 */
export function collectiveDel (id) {
  return request({
    url: `/api/collective/${id}`,
    method: 'delete'
  })
}

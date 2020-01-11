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

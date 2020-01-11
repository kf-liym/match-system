import request from '@/utils/request'

/**
 * 登录 api
 * @method signin
 * @param data
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
 * @method signout
 * @param data
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
 * @method adminIndex
 * @param data
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
 * @method adminIndex
 * @param data
 */
export function getList (id) {
  return request({
    url: '/api/teams/list',
    method: 'get'
  })
}

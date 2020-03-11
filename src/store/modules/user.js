/*
 * @Desc: 描述
 * @Date: 2020-01-11 23:30:42
 * @LastEditTime: 2020-03-11 01:04:07
 */
import {
  signin,
  signout
} from '@/api'
import {
  getToken,
  setToken,
  removeToken,
  setCookie,
  getCookie,
  removeCookie
} from '@/utils/auth'

const user = {
  state: {
    // 当前用户id
    id: getCookie('id'),
    // 当前表单的作者id
    author: '',
    // 用户名
    username: getCookie('username'),
    // token
    token: getToken(),
    // 权限
    authority: parseInt(getCookie('authority'))
  },
  mutations: {

    SET_ID (state, id) {
      state.id = id
    },
    SET_AUTHOR (state, author) {
      state.author = author
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_AUTHORITY (state, authority) {
      state.authority = authority
    },
    SET_USERNAME (state, username) {
      state.username = username
    }
  },
  actions: {
    // 用户登录
    LOGIN_BY_USERNAME ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        signin(userInfo).then(res => {
          if (res.data.code === 200) {
            setToken(res.data.token)
            setCookie('id', userInfo.id)
            setCookie('username', userInfo.username)
            setCookie('authority', res.data.authority)
            commit('SET_ID', res.data.id)
            commit('SET_TOKEN', res.data.token)
            commit('SET_AUTHORITY', res.data.authority)
            commit('SET_USERNAME', userInfo.username)
            commit('CLEAR_PROJECT')
            resolve(res.data)
          } else {
            // this.$message.error(res.data.message);
            reject(res.data.message)
          }

        }).catch(err => {
          reject(err)
        })
      })

    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        signout(state.token).then(response => {
          if (response.data.code === 200) {
            commit('SET_ID', undefined)
            commit('SET_TOKEN', undefined)
            commit('SET_AUTHORITY', undefined)
            commit('SET_USERNAME', undefined)
            removeToken()
            removeCookie('username')
            removeCookie('authority')
            removeCookie('id')
            resolve()
          } else {
            reject(response.data.message)
          }

        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
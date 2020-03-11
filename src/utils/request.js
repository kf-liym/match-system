/*
 * @Desc: 描述
 * @Date: 2020-01-11 22:02:21
 * @LastEditTime: 2020-03-10 23:44:56
 */
/**
 * Created by 麦锦超 on 2018/6/7.
 */
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

import axios from 'axios'
axios.defaults.withCredentials = false;

const service = axios.create({
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.common['X-Token'] = getToken();
    // config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers.common['X-Author'] = store.getters.author;
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export default service

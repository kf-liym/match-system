/**
 * Created by 麦锦超 on 2018/6/7.
 */


import axios from 'axios'

const service = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default service

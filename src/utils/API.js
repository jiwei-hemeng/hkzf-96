// 导入axios 模块
import axios from 'axios'
import { getToken, removeToken } from './token'

// 导入baseURL
import { baseURL } from './baseURL.js'
let API = axios.create({
  baseURL
})

// 请求拦截器 常用来添加token
API.interceptors.request.use(config => {

  if(config.url.startsWith('/user') && config.url !== '/user/registered' && config.url !== '/user/login'){
    config.headers.authorization = getToken()
  }
  return config
})

// 响应拦截器 常用来处理错误的请求
API.interceptors.response.use(response => {
  if (response.data.status === 400) {
    // 移除 token
    removeToken()
  }
  return response
})

export { API }


// 导入axios 模块
import axios from 'axios'
// 导入baseURL
import baseURL from './baseURL'
let API = axios.create({
  baseURL: 'http://api-haoke-web.itheima.net'
})
export { API }


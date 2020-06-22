// 导入axios 模块
import axios from 'axios'
let API = axios.create({
  baseURL: 'http://api-haoke-web.itheima.net'
})
export { API }


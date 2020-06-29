// 导入axios 模块
import axios from 'axios'

// 导入baseURL
import { baseURL } from './baseURL.js'
let API = axios.create({
  baseURL
})

export { API }


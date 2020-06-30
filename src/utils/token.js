// 新建token
const setToken = (token) => {
  localStorage.setItem("my-token", token)
}

// 获取token
const getToken = () => {
  return localStorage.getItem("my-token")
}

// 移除token
const removeToken = () => {
  localStorage.removeItem("my-token")
}

// 判断是否登录
const isAuto = () => {
  return !!getToken()
}

// 导出
export { setToken, getToken, removeToken, isAuto }

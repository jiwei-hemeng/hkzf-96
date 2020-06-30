// 新建token
const setToken = (token) => {
  localStorage.setItem("my-token", JSON.stringify(token))
}

// 获取token
const getToken = () => {
  return JSON.parse( localStorage.getItem("my-token"))
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

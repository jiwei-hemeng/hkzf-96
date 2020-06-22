// 导入封装的axios请求模块
import { API } from './API'
// 封装并导出当前定位的城市的数据
export const getCurrentCity = () => {
  let city = JSON.parse(localStorage.getItem('my-city'))
  if(!city){
    return new Promise((resolve,reject) => {
      // 1. 获取当前定位城市
      const mycity = new window.BMap.LocalCity() 
      mycity.get(async (res) => {
        let cityName = res.name
        console.log(cityName)
        // 2. 根据城市名字获取当前定位城市
        const localCity = await API({
          url: '/area/info?name=' + cityName
        })
        localStorage.setItem('my-city', JSON.stringify(localCity.data.body))
        resolve(localCity.data.body)
      })
    })
  }
  // Promise 的简写形式
  return Promise.resolve(city)
}
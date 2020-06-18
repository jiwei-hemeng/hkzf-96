import axios from 'axios'
// 封装并导出当前定位的城市的数据
export const getCurrentCity = () => {
  return new Promise((resolve,reject) => {
    // 1. 获取当前定位城市
    const mycity = new window.BMap.LocalCity() 
    mycity.get(async (res) => {
      let cityName = res.name
      console.log(cityName)
      // 2. 根据城市名字获取当前定位城市
      const localCity = await axios({
        url: 'http://api-haoke-dev.itheima.net/area/info?name=' + cityName
      })
      resolve(localCity.data.body)
    })
  })
}
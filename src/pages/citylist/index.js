import React, { Component } from 'react'
// 导入 antd-mobile 组件
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
// 导入获取当前定位城市数据的插件
import { getCurrentCity } from '../../utils/'
export default class CityList extends Component {
  componentDidMount(){
    this.getCityList()
  }
  async getCityList(){
    // 1.请求获取城市列表
    const { data} = await axios({
      url: 'http://api-haoke-dev.itheima.net/area/city?level=1'
    })

    // 2.格式化城市列表数据
    const { cityList, cityIndex } = this.formatCity(data.body)
    // 3.请求获取热门城市
    const hotCity = await axios({
      url: 'http://api-haoke-dev.itheima.net/area/hot'
    })
    cityList.hot = hotCity.data.body
    cityIndex.unshift('热')

    // 4. 获取当前定位的城市的数据
    const currentCity = await getCurrentCity()
    console.log(currentCity)


    console.log(cityList)
    console.log(cityIndex)
  }
  // 格式化城市列表
  formatCity(list){
    let cityList = {}
    list.forEach((item, index) => {
      let word = item.short.substr(0,1)
      // 如果对象的键名是一个变量必须使用[], 而不能使用.
      if(cityList[word]) {
        return cityList[word].push(item)
      }
      cityList[word] = [item]
    })
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  render() {
    return (
      <div className="cityList">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.push('/home/index')}}
        >城市选择</NavBar>
      </div>
    )
  }
}

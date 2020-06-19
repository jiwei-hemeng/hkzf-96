import React, { Component } from 'react'
// 导入 antd-mobile 组件
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
// 导入 react-virtualized 可视区域渲染 插件
import { List } from 'react-virtualized'
// 导入获取当前定位城市数据的插件
import { getCurrentCity } from '../../utils/'
// 导入组件样式文件
import './index.scss'

export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: []
  }
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
    cityIndex.unshift('hot')

    // 4. 获取当前定位的城市的数据
    const currentCity = await getCurrentCity()
    console.log(currentCity)
    cityList['#'] = [currentCity]
    cityIndex.unshift('#')
    this.setState({
      cityIndex,
      cityList
    })


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

  rowRenderer = ({
    key, 
    index, 
    isScrolling, 
    isVisible, 
    style,
  }) => {
    let word = this.state.cityIndex[index]
    return (
      <div className="list" key={key}>
        <div className="title">{this.formatWord(word)}</div>
        {
          this.renderList(word)
        }
      </div>
    );
  }
  renderList(word){
    return this.state.cityList[word].map((item,index) => {
      return (
        <div className="city" key={index}>{item.label}</div>
      )
    })
  }

  // 格式化word
  formatWord(word){
    switch(word){
      case "#" :
        return '当前定位城市';
      case 'hot':
        return '热门城市';
      default:
        return word.toUpperCase()
    }
  }
  render() {
    return (
      <div className="cityList">
        <NavBar
          className="navBar"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.go(-1)}}
        >城市选择</NavBar>
        <List
          width={375}
          height={300}
          rowCount={this.state.cityIndex.length}
          rowHeight={40}
          rowRenderer={this.rowRenderer}
        />
      </div>
    )
  }
}

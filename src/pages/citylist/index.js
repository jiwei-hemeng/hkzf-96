import React, { Component } from 'react'
// 导入 antd-mobile 组件
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
// 导入 react-virtualized 可视区域渲染 插件
import { List, AutoSizer } from 'react-virtualized'
// 导入获取当前定位城市数据的插件
import { getCurrentCity } from '../../utils/'
// 导入组件样式文件
import './index.scss'

export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: [],
    activeIndex: 0
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
    let citys = this.state.cityList[word]
    return (
      <div className="list" key={key} style={style}>
        <div className="title">{this.formatWord(word)}</div>
        {/* <div className="city">北京</div> */}
        {
          citys.map((item, index)=>{
            return <div className="city" key={index}>{item.label}</div>
          })
        }
      </div>
    );
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
  getHeigth = ({index}) => {
    let zimu=this.state.cityIndex[index]
    let citys=this.state.cityList[zimu]
    return 25 + 50 * citys.length
  }

  onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex })=>{
    if(startIndex !== this.state.activeIndex) {
      this.setState({
        activeIndex: startIndex
      })
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
        <AutoSizer>
          {({height, width}) => (
              <List
                width={ width }
                height={ height }
                rowCount={this.state.cityIndex.length}
                rowHeight={this.getHeigth}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
              />
            )}
        </AutoSizer>
        <ul className="ListIndex">
          {
            this.state.cityIndex.map((item, index) => {
              return (
                <li className={index === this.state.activeIndex ? 'active' : ''} key={index}>{item === 'hot' ? '热' : item.toUpperCase()}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

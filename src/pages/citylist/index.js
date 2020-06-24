import React, { Component } from 'react'
// 导入 antd-mobile 组件
import { Toast } from 'antd-mobile'
// 导入封装的axios 组件
import { API } from '../../utils/API'
// 导入 react-virtualized 可视区域渲染 插件
import { List, AutoSizer } from 'react-virtualized'
// 导入获取当前定位城市数据的插件
import { getCurrentCity } from '../../utils/'
// 导入组件样式文件
import './index.scss'
// 导入NavHeader组件
import NavHeader from '../../components/NavHeader'

export default class CityList extends Component {
  ListRef = React.createRef()
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
    const { data} = await API({
      url: '/area/city?level=1'
    })

    // 2.格式化城市列表数据
    const { cityList, cityIndex } = this.formatCity(data.body)
    // 3.请求获取热门城市
    const hotCity = await API({
      url: '/area/hot'
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
    // Object.key() 方法用来获取对象的键名，并返回一个数组
    // 数组.sort() 方法用来排序数组
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
            return (
              <div
                className="city"
                key={index}
                onClick={() => {
                  let house_city = ['北京', '上海', '广州', '深圳']
                  if(house_city.indexOf(item.label)!== -1){
                    localStorage.setItem('my-city', JSON.stringify(item))
                    this.props.history.push('/home/index')
                  }else {
                    Toast.info('暂无该城市的房源信息哦~.~',2)
                  }
                }}
              >{item.label}</div>
              )
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
        <NavHeader title="城市选择" />
        <AutoSizer>
          {({height, width}) => (
              <List
                width={ width }
                height={ height }
                rowCount={this.state.cityIndex.length}
                rowHeight={this.getHeigth}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                ref={this.ListRef}
                scrollToAlignment="start"
              />
            )}
        </AutoSizer>
        <ul className="ListIndex">
          {
            this.state.cityIndex.map((item, index) => {
              return (
                <li
                  className={index === this.state.activeIndex ? 'active' : ''}
                  key={index}
                  onClick={()=>{
                    this.ListRef.current.scrollToRow(index)
                  }}
                >{item === 'hot' ? '热' : item.toUpperCase()}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

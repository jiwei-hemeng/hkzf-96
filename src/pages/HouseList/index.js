import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import { getCurrentCity } from '../../utils/index'
import './index.scss'
import { API } from '../../utils/API'
// 导入可视化渲染
import { List, AutoSizer } from 'react-virtualized'

export default class HouseList extends React.Component{
  state = {
    cityname: '',
    count: 0,
    list: []
  }
  componentDidMount(){
    this.getCityName()
  }
  async getCityName(){
    let res = await getCurrentCity()
    this.setState({
      cityname: res.label
    })
  }
  onfilter=(filters)=>{
    this.filters = filters
    this.getHouseList()
  }
  async getHouseList(){
    const city = await getCurrentCity()
    const { data } = await API({
      url: '/houses',
      params: {
        cityId: city.value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    this.setState({
      count: data.body.count,
      list: data.body.list
    })
  }
  panduan(index){
    let list = this.state.list
    if(list[index]){
      return <div>{list[index].desc}</div>
    }
    return <div>{index}</div>
  }
  rowRenderer=({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  })=> {
    return (
      <div key={key} style={style}>
        {/* { item.desc } */}
        {/* <img src={'http://api-haoke-dev.itheima.net'+item.houseImg} alt="" /> */}
        {
          this.panduan(index)
        }
        { index }
      </div>
    );
  }
  render () {
    return (
      <div className="houselist">
        <div className="Header">
          <i
            className="iconfont icon-jiantouarrowhead7"
            onClick={() => {
              this.props.history.go(-1)
            }}
          />
          <SearchHeader 
            className="searchhearder"
            cityname={ this.state.cityname }
          />
        </div>
        <Filter
          onfilter={ this.onfilter }
        />
        {/* 房源列表 */}
        <AutoSizer>
          {({height, width})=>(
            <List
              width={ width }
              height={ height }
              rowCount={this.state.count}
              rowHeight={40}
              rowRenderer={this.rowRenderer}
            />  
          )}
        </AutoSizer>
      </div>
    )
  }
}

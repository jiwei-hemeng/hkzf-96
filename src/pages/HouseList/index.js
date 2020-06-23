import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import { getCurrentCity } from '../../utils/index'
import './index.scss'
export default class HouseList extends React.Component{
  state = {
    cityname: ''
  }
  componentDidMount(){
    this.getCityName()
  }
  async getCityName(){
    let res = await getCurrentCity()
    console.log(res)
    this.setState({
      cityname: res.label
    })
  }
  render () {
    return (
      <div className="houselist">
        <div className="Header">
          <i className="iconfont icon-jiantouarrowhead7"></i>
          <SearchHeader 
            className="searchhearder"
            cityname={ this.state.cityname }
          ></SearchHeader>
        </div>
        <Filter />
      </div>
    )
  }
}

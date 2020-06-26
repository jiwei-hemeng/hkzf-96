import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import { getCurrentCity } from '../../utils/index'
import './index.scss'
import { API } from '../../utils/API'
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
    console.log(filters)
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
    console.log(data)
    this.setState({
      count: data.body.count,
      list: data.body.list
    })
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
      </div>
    )
  }
}

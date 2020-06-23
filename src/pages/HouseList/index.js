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
        <Filter />
      </div>
    )
  }
}

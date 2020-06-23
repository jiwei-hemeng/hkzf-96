import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import './index.scss'
export default class HouseList extends React.Component{
  render () {
    return (
      <div className="houselist">
        <div className="Header">
          <i className="iconfont icon-jiantouarrowhead7"></i>
          <SearchHeader className="searchhearder"></SearchHeader>
        </div>
        <Filter />
      </div>
    )
  }
}

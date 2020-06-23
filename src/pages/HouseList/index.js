import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
export default class HouseList extends React.Component{
  render () {
    return (
      <div>
        <SearchHeader></SearchHeader>
        {/* <Filter /> */}
      </div>
    )
  }
}

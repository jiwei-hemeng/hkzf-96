import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrentCity } from '../../../utils'

import styles from './index.module.css'
import { API } from '../../../utils/API'

export default class Search extends Component {
  // 当前城市id
  timer = null
  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 获取搜索列表数据
  getSearchList = async (val) => {
    this.setState({
      searchTxt: val
    })
    const { value } = await getCurrentCity()
    const res = await API({
      url: '/area/community',
      params: {
        name: val,
        id: value
      }
    })
    console.log( res )
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.getSearchList}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}

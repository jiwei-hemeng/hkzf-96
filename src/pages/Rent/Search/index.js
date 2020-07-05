import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrentCity } from '../../../utils'

import styles from './index.module.css'
import { API } from '../../../utils/API'
import NavHeader  from '../../../components/NavHeader'

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
    if(!val){
      return this.setState({
        tipsList: []
      })
    }
    const { value } = await getCurrentCity()
    window.clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      const { data } = await API({
        url: '/area/community',
        params: {
          name: val,
          id: value
        }
      })
      this.setState({
        tipsList: data.body
      })
    }, 300);
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li
        key={item.community}
        className={styles.tip}
        onClick={()=>{
          this.props.history.push("/rent/add", {
            id: item.community,
            name:item.communityName
          })
        }}
      >
        {item.communityName}
      </li>
    ))
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        <NavHeader title="选择小区"></NavHeader>
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

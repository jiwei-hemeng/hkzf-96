import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
import { API } from '../../../../utils/API'
import { getCurrentCity } from '../../../../utils/index'

const titleStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

export default class Filter extends Component {
  constructor(){
    super()
    this.state = {
      titleStatus,
      openType: '',  // 用来控制Picker的显示与隐藏
      filterData: {}
    }
  }
  componentDidMount(){
    this.getFilterdata()
  }
  async getFilterdata(){
    const city = await getCurrentCity()
    const { data } = await API({
      url: '/houses/condition?id=' + city.value
    })
    this.setState({
      filterData: data.body
    })
  }
  changeStatus=(type)=>{
    this.setState({
      titleStatus: {
        ...titleStatus,
        // type 应该是一个变量，所以使用[]
        [type]: true
      },
      openType: type
    })
  }
  // 渲染Picker
  renderPicker(){
    let { openType } = this.state
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
      return <FilterPicker 
              onCancel={ this.onCancel }
              onSave={ this.onSave }
             />
    }else if(openType === 'more'){
      return <FilterMore /> 
    }else{
      return null
    }
  }
  // 点击取消
  onCancel=()=>{
    this.setState({
      openType: ''
    })
  }
   // 点击取消
   onSave=()=>{
    this.setState({
      openType: ''
    })
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleStatus={ this.state.titleStatus }
            changeStatus= { this.changeStatus }
          />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}
          { this.renderPicker() }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

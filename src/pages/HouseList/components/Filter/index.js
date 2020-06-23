import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

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
      openType: ''  // 用来控制Picker的显示与隐藏
    }
  }
  changeStatus=(type)=>{
    console.log(type)
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
      return <FilterPicker />
    }else{
      return null
    }
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

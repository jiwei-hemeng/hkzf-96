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
      titleStatus
    }
  }
  changeStatus=(i)=>{
    console.log(i)
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

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

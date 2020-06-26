import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

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
      filterData: {},     //筛选条件数据
      selectedValues: {   // 默认选中的值
        area: ["area", null],
        mode: ["null"],
        price: ["null"],
        more: []
      }
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
    let defaultValue = this.state.selectedValues[openType]
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
      let { filterData } = this.state
      let data = []
      let cols = 0
      switch(openType){
        case 'area':
          data = [filterData.area, filterData.subway]
          cols = 3
          break;
        case 'mode':
          data = [...filterData.rentType]
          cols = 1
          break;
        case 'price':
          data = [...filterData.price]
          cols = 1
          break;
        default:
          data = []
          cols = 0
          break;
      }
      return <FilterPicker 
              data={ data }
              cols={ cols }
              onCancel={ this.onCancel }
              onSave={ this.onSave }
              defaultValue={ defaultValue }
             />
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
  onSave=(value)=>{
    let type = this.state.openType
    this.setState({
      selectedValues:{
        ...this.state.selectedValues,
        [type]: value
      },
      openType: ''
    },()=>{
      console.log(this.state.selectedValues)
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

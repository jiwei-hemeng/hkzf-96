import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  state = {
    // 表示：PickerView 组件的选中值
    // value: null
    value: this.props.defaultValue
  }

  /* 
  // 注意：该钩子函数中可以进行 setState，但是，必须要放在一个条件判断中
  componentDidUpdate(prevProps) {
    // console.log(
    //   '2 componentDidUpdate 更新前的：',
    //   prevProps,
    //   ' 更新后的：',
    //   this.props
    // )

    // 更新前的type
    const oldType = prevProps.type
    const newType = this.props.type

    if (oldType !== newType) {
      // 说明，用户切换菜单，此时，就更新 value 即可
      this.setState({
        value: this.props.defaultValue
      })
    }
  } */

  // 获取选中值
  handleChange = val => {
    // console.log('获取 PickerView 组件的选中值：', val)
    this.setState({
      value: val
    })
  }

  render() {
    const { onCancel, onSave, data, cols, type } = this.props
    const { value } = this.state

    return (
      <>
        {/* 
          选择器组件：
          
          注意：PickerView 组件的数据源 data ，是一个数组！
          value 表示：当前组件的选中值，如果 value 有值，那么，PickerView 组件就会自动选中当前值
        */}
        <PickerView
          data={data}
          value={value}
          cols={cols}
          onChange={this.handleChange}
        />

        {/* 底部按钮 */}
        <FilterFooter
          onCancel={() => onCancel(type)}
          onSave={() => onSave(type, value)}
        />
      </>
    )
  }
}

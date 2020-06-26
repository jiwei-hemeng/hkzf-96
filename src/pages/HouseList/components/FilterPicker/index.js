import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  constructor(props){
    super(props)
    this.state={
      value: this.props.defaultValue  //默认选中值
    }
  }
  render() {
    return (
      <div>
        <PickerView 
          data={this.props.data} 
          value={ this.state.value } 
          cols={this.props.cols} 
          onChange={(val)=>{ // 下拉选中时候 会执行
            // 赋值存一下
            this.setState({
              value:val
            })
          }}
        />
        {/* 底部按钮 */}
        <FilterFooter 
          onCancel={this.props.onCancel}
          onSave={()=>{
            this.props.onSave(this.state.value)
          }}
        />
      </div>
    )
  }
}

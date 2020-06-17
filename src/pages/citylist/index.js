import React, { Component } from 'react'
// 导入 antd-mobile 组件
import { NavBar, Icon } from 'antd-mobile'
export default class CityList extends Component {

  render() {
    return (
      <div className="cityList">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.push('/home/index')}}
        >城市选择</NavBar>
      </div>
    )
  }
}

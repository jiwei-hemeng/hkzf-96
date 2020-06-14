import React from 'react'
// 导入 antd-mobile的 Button 组件
import Button from 'antd-mobile/lib/button'
// 创建并导出Home组件
export default class Home extends React.Component{
  render(){
    return <div>
      <div>我是Home组件</div>
      <Button type="primary">按钮</Button>
    </div>
  }
}
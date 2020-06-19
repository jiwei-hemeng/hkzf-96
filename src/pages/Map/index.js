import React from 'react'
import './map.scss'
// 导入导航栏组件
import NavHeader from '../../components/NavHeader'
export default class Map extends React.Component{
  componentDidMount(){
    this.initMap()
  }
  initMap(){
    // 创建地图实例
    var map = new window.BMap.Map("container"); 
    // 创建点坐标 
    var point = new window.BMap.Point(116.404, 39.915)
    // 初始化地图，设置中心点坐标和地图级别 
    map.centerAndZoom(point, 15)
  }
  render(){
    return (
      <div className="map">
        {/* <NavBar
          className="navBar"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.go(-1)}}
        >城市选择</NavBar> */}
        <NavHeader title="地图导航" />
        <div id="container"></div>
      </div>
    )
  }
}
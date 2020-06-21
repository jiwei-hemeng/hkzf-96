import React from 'react'
// 导入导航栏组件
import NavHeader from '../../components/NavHeader'
// 导入局部样式
import styles from './map.module.scss'
// 导入获取定位城市方法
import { getCurrentCity } from '../../utils/index'
import axios from 'axios'
import './map.css'
export default class Map extends React.Component{
  componentDidMount(){
    this.initMap()
  }
  async initMap(){
    let city = await getCurrentCity()
    // 创建地图实例
    this.map = new window.BMap.Map("container"); 
    // 地址解析
    var myGeo = new window.BMap.Geocoder()
    myGeo.getPoint(city.label, async (Point)=>{
      // 初始化地图，设置中心点坐标和地图级别 
      this.map.centerAndZoom(Point, 11)

      // 为地图添加控件
      this.map.addControl(new window.BMap.NavigationControl());    // 平移缩放控件
      this.map.addControl(new window.BMap.ScaleControl());     // 比例尺控件
      this.map.addControl(new window.BMap.OverviewMapControl());  // 缩略地图
      this.map.addControl(new window.BMap.MapTypeControl());  // 地图类型
      this.map.addControl(new window.BMap.GeolocationControl());  // 地图定位

      // 发送请求并渲染到页面
      this.renderOverlay(city.value)
    }, city)

    // 1.创建地图实例
    // var map = new window.BMap.Map("container"); 
    // 2. 创建点坐标 
    // var point = new window.BMap.Point(116.404, 39.915)
    // 3.初始化地图，设置中心点坐标和地图级别 
    // map.centerAndZoom(point, 15)
  }
  async renderOverlay(id){
     // 请求获取小区数据
     let {data } = await axios({
      url: 'http://api-haoke-web.itheima.net/area/map?id=' + id
    })
    data.body.forEach((item, index) => {
      // 根据经纬度得到相应的点
      let point = new window.BMap.Point(item.coord.longitude, item.coord.latitude)
      var opts = {
        position: point,    // 指定文本标注所在的地理位置
        offset: new window.BMap.Size(-35, -35)    //设置文本偏移量
      }
      var label = new window.BMap.Label("", opts);  // 创建文本标注对象
      // 设置文字标注的内容
      label.setContent(`
        <div class="${styles.bubble}">
          <p class="${styles.name}">${item.label}</p>
          <p>${item.count}套</p>
        </div>
      `)
      label.setStyle({
        cursor: 'pointer',
        border: '0px solid rgb(255, 0, 0)',
        padding: '0px',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        color: 'rgb(255, 255, 255)',
        textAlign: 'center'
      });

      label.addEventListener('click',()=>{

        // 点击覆盖物以后请求数据并进入下一级地图
        this.renderOverlay(item.value)
        // 清除原有的覆盖物，由于百度地图的bug，清除原来的覆盖物必须要有延时，否则会报错
        window.setTimeout(()=> {
          this.map.clearOverlays()
        },10)
        // 进入下一级地图
        this.map.centerAndZoom(point, 13)
      })

      this.map.addOverlay(label); 
    });
  }
  render(){
    return (
      <div className={styles.map}>
        {/* <NavBar
          className="navBar"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.go(-1)}}
        >城市选择</NavBar> */}
        <NavHeader title="地图导航" />
        <div id='container'></div>
      </div>
    )
  }
}
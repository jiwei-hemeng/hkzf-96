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
  state = {
    count: 0,
    list: [],     // 房源列表
    isShow: false       // 是否显示房源信息
  }
  componentDidMount(){
    this.initMap()
  }
  async initMap(){
    let city = await getCurrentCity()
    // 创建地图实例
    this.map = new window.BMap.Map("container"); 
    // 为地图添加移动事件
    this.map.addEventListener('movestart',()=>{
      // 移动地图关闭当前小区的房源信息
      this.setState({
        isShow: false
      })
    })
    // 移动地图关闭当前小区的房源信息
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
        // this.map.getZoom() 获取当前地图级别
        if(this.map.getZoom() === 11){
          // 点击覆盖物以后请求数据并进入下一级地图
          this.renderOverlay(item.value)
          // 清除原有的覆盖物，由于百度地图的bug，清除原来的覆盖物必须要有延时，否则会报错
          window.setTimeout(()=> {
            this.map.clearOverlays()
          },10)
          // 进入下一级地图
          this.map.centerAndZoom(point, 13)
        }else if(this.map.getZoom()===13){
          this.renderOverlay(item.value)
          // 清除原有的覆盖物，由于百度地图的bug，清除原来的覆盖物必须要有延时，否则会报错
          window.setTimeout(()=> {
            this.map.clearOverlays()
          },10)
          // 进入下一级地图
          this.map.centerAndZoom(point, 15)
        }else{
          // 发送请求获取当前小区的房子列表
          console.log('不放大')
          this.getHouseList(item.value)
        }  
      })

      this.map.addOverlay(label); 
    });
  }
  renderHouseItem(){
    // 循环渲染房源列表
    return this.state.list.map((item, index) => {
      console.log(item)
      return (
        <div key={index} className={styles.house}>
          <div className={styles.imgWrap}>
            <img className={styles.img} src={`http://api-haoke-web.itheima.net${item.houseImg}`} alt="" />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.desc}>{item.desc}</div>
            <div>
                {/* ['近地铁', '随时看房'] */}
                {
                  item.tags.map((v, i)=>{
                    return (
                      <span key={i} className={[styles.tag,styles.tag1 ].join(' ')} >
                        {v}
                      </span>
                    )
                  })
                }
            </div>
            <div className={styles.price}>
              <span className={styles.priceNum}>{item.price}</span> 元/月
            </div>
          </div>
        </div>
      )
    })
  }

  // 发送请求获取当前小区的房子列表
  async getHouseList(id){
    const { data } = await axios({
      url: 'http://api-haoke-web.itheima.net/houses?cityId=' + id
    })
    this.setState({
      count: data.body.count,
      list: data.body.list,
      isShow: true
    })
  }
  render(){
    return (
      <div className={styles.map}>
        <NavHeader title="地图导航" />
        <div id='container'></div>
        <div
          className={[styles.houseList, this.state.isShow ? styles.show :'' ].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <a className={styles.titleMore} href="/house/list">
              更多房源
            </a>
          </div>
          <div className={styles.houseItems}>
            {
              this.renderHouseItem()
            }
          </div>
        </div>
      </div>
    )
  }
}
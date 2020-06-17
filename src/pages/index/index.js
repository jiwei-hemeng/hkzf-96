import React from 'react'
// 导入轮播图的组件库
import { Carousel, Flex, Grid } from 'antd-mobile'
import axios from 'axios'
// 导入css样式
import './index.css'
// 导入sass 样式
import './index.scss'
// 由于react不能加载本地图片，所以必须import才能加载
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
const menus = [
  { name: '整租', imgSrc: Nav1, path: '/home/list' },
  { name: '合租', imgSrc: Nav2, path: '/home/list' },
  { name: '地图找房', imgSrc: Nav3, path: '/map' },
  { name: '去出租', imgSrc: Nav4, path: '/rent/add' }
]
export default class Index extends React.Component{
  state = {
    data: [],
    imgHeight: 176,
    isAutoPlay: false, // 基于阿里巴巴 antd-mobile 轮播图的bug,无法自动轮播
    // 产生bug的原因 ： axios 请求需要时间,而carous组件在页面加载时就完成,所以该组件不知道那些图片需要轮播
    Group: [], // 租房小组数据
    News: []
  }
  componentDidMount() {
    this.getSWiperdata()
    this.getGroup()
    this.getNews()
  }
  // 循环渲染nav
  renderNavs(){
    return menus.map((item, index) => {
      return (
        <Flex.Item key={index} onClick={()=>{
          this.props.history.push(item.path)
        }}>
          <img src={item.imgSrc} alt="index"/>
          <p>{item.name}</p>
        </Flex.Item>
      )
    })
  }
  // 获取轮播图数据
  async getSWiperdata(){
    const { data } = await axios({
      method: 'GET',
      url: 'http://api-haoke-dev.itheima.net/home/swiper'
    })
    // setState 是异步的，第二个参数表示设置成功以后
    this.setState({
      data: data.body
    },()=>{
      this.setState({
        isAutoPlay: true
      })
    })
  }
  // 封装请求获取合租数据
  async getGroup(){
    const { data } = await axios({
      url: 'http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    })
    this.setState({
      Group: data.body
    })
  }
  // 分装请求获取最新资讯数据
  async getNews(){
    const { data } = await axios({
      url: 'http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    })
    this.setState({
      News: data.body
    })
  }
  // 对轮播项的函数封装
  renderCarousel(){
    return (
      this.state.data.map(val => (
        <a
          key={val.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
          <img
            src={`http://api-haoke-dev.itheima.net${val.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      ))
    )
  }
  render () {
    return (
      <div className="index">
        <Carousel
          autoplay={this.state.isAutoPlay}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {
            this.renderCarousel()
          }
        </Carousel>
        <Flex className="navs">
          {
            this.renderNavs()
          }
        </Flex>
        <div className="groups">
          <Flex className="groups-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          <Grid
            data={this.state.Group}
            columnNum={2}
            square={false}
            activeStyle
            hasLine={false}
            renderItem={item => (
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
        <div className="news">
          <h2 className="news-title">最新资讯</h2>
          <ul>
            {
              this.state.News.map((item, index) => {
                return (
                  <li className="news-item" key={item.id}>
                    <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt=""></img>
                    <div className="news-content">
                      <h2>{item.title}</h2>
                      <p>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                      </p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

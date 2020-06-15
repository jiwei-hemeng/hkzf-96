import React from 'react'
// 导入 antd-mobile 的 TabBar 组件
import { TabBar } from 'antd-mobile'
// 导入 Home 组件的 css 样式
// 导入路由
import { Route } from 'react-router-dom'
import './index.css'
// 导入四个二级组件
import Index from '../index/'
import HouseList from '../HouseList/'
import News from '../News/'
import MyProFile from '../myProfile'
// 创建并导出Home组件
export default class Home extends React.Component{

  state = {
    selectedTab: '/home/index',
      hidden: false,
      fullScreen: false
  }

  render(){
    return <div className="home">
      <Route exact path="/home/index" component={Index}></Route>
      <Route exact path="/home/houselist" component={HouseList}></Route>
      <Route exact path="/home/news" component={News}></Route>
      <Route exact path="/home/myprofile" component={MyProFile}></Route>
      <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="主页"
            key="Life"
            icon={
              <i className="iconfont icon-home"></i>
            }
            selectedIcon={
              <i className="iconfont icon-home"></i>
            }
            selected={this.state.selectedTab === '/home/index'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/index',
              })
              this.props.history.push('/home/index')
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="找房"
            key="Koubei"
            selected={this.state.selectedTab === '/home/houselist'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/houselist',
              })
              this.props.history.push('/home/houselist')
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="咨询"
            key="Friend"
            selected={this.state.selectedTab === '/home/news'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/news',
              })
              this.props.history.push('/home/news')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === '/home/myprofile'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/myprofile',
              })
              this.props.history.push('/home/myprofile')
            }}
          >
          </TabBar.Item>
        </TabBar>
    </div>
  }
}
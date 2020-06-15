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
const tabItems = [
  { title: '首页', icon: 'icon-home', path: '/home/index' },
  { title: '找房', icon: 'icon-all',path: '/home/list' },
  { title: '资讯', icon: 'icon-zixun', path: '/home/news' },
  { title: '我的', icon: 'icon-aui-icon-my', path: '/home/profile' }
]
// 创建并导出Home组件
export default class Home extends React.Component{

  state = {
    selectedTab: '/home/index',
      hidden: false,
      fullScreen: false
  }
  renderTabBarItem(){
    return tabItems.map((item, index) => {
      return (
        <TabBar.Item
            title={item.title}
            key={index}
            icon={
              <i className={`iconfont ${item.icon}`}></i>
            }
            selectedIcon={
              <i className={`iconfont ${item.icon}`}></i>
            }
            selected={this.state.selectedTab === item.path}
            onPress={() => {
              this.setState({
                selectedTab: item.path,
              })
              this.props.history.push(item.path)
            }}
            data-seed="logId"
          >
          </TabBar.Item>
      )
    })
  }
  render(){
    return <div className="home">
      <Route exact path="/home/index" component={Index}></Route>
      <Route exact path="/home/list" component={HouseList}></Route>
      <Route exact path="/home/news" component={News}></Route>
      <Route exact path="/home/profile" component={MyProFile}></Route>
      <TabBar
          unselectedTintColor="#949494"
          tintColor="#33AF33"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {
            this.renderTabBarItem()
          }
        </TabBar>
    </div>
  }
}
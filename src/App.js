import React from 'react'
// 导入路由组件
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// 导入 Home 组件
import Home from './pages/Home'
// 导入 Login 组件
import Login from './pages/Login'
// 导入 Map 组件
import Map from './pages/Map'
// 导入城市选择组件
import CityList from './pages/citylist'
// 导入房源详情组件
import Detail from './pages/HouseDetail'
// 导入封装的鉴权路由
import AuthRoute from './components/AuthRoute'
// 导入rent组件
import Rent from './pages/Rent'
export default class App extends React.Component{
  render(){
    return <BrowserRouter>
      <div className="App">
        <Route exact path="/login" component={ Login }></Route>
        <Route exact path="/map" component={ Map }></Route>
        <Route exact path="/citylist" component={ CityList }></Route>
        <Route path="/home" component={ Home }></Route>
        <Route path="/login" component={ Login }></Route>
        <Route path="/detail/:id" component={ Detail }></Route>
        <AuthRoute path="/rent" exact={true} Page={Rent}></AuthRoute>
        
        {/* 路由重定向 */}
        <Route exact path="/" render={(props)=>{
          return <Redirect to="/home/index"></Redirect>
        }}></Route>
      </div>
    </BrowserRouter>
  }
}
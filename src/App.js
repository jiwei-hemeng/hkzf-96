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
export default class App extends React.Component{
  render(){
    return <BrowserRouter>
      <div className="App">
        <Route exact path="/login" component={ Login }></Route>
        <Route exact path="/map" component={ Map }></Route>
        <Route exact path="/citylist" component={ CityList }></Route>
        <Route path="/home" component={ Home }></Route>
        
        {/* 路由重定向 */}
        <Route exact path="/" render={(props)=>{
          return <Redirect to="/home/index"></Redirect>
        }}></Route>
      </div>
    </BrowserRouter>
  }
}
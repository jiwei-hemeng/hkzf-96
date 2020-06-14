import React from 'react'
// 导入路由组件
// import { BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import { BrowserRouter, Route, Redirect} from 'react-router-dom'
// 导入 Home 组件
import Home from './pages/Home'
export default class App extends React.Component{
  render(){
    return <BrowserRouter>
      <div>
        <Route path="/home" component={Home}></Route>
        {/* 路由重定向 */}
        <Route path="/" render={(props)=>{
          return <Redirect to="/home"></Redirect>
        }}></Route>
      </div>
    </BrowserRouter>
  }
}
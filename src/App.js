import React, { Suspense } from 'react'
// 导入路由组件
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// 导入封装的鉴权路由
import AuthRoute from './components/AuthRoute'
// 导入 Home 组件
// import Home from './pages/Home'
const Home = React.lazy(()=> import('./pages/Home'))
// 导入 Login 组件
// import Login from './pages/Login'
const Login = React.lazy(()=> import('./pages/Login'))
// 导入 Map 组件
// import Map from './pages/Map'
const Map = React.lazy(()=> import('./pages/Map'))
// 导入城市选择组件
// import CityList from './pages/citylist'
const CityList = React.lazy(()=> import('./pages/citylist'))
// 导入房源详情组件
// import Detail from './pages/HouseDetail'
const Detail = React.lazy(()=> import('./pages/HouseDetail'))
// 导入rent组件
// import Rent from './pages/Rent'
const Rent = React.lazy(()=> import('./pages/Rent'))
// import RentAdd from './pages/Rent/Add'
const RentAdd = React.lazy(()=> import('./pages/Rent/Add'))
// import RentSearch from './pages/Rent/Search'
const RentSearch = React.lazy(()=> import('./pages/Rent/Search'))
export default class App extends React.Component{
  render(){
    return <BrowserRouter>
      <Suspense
        fallback={<div className="route-loading">loading</div>}
      >
        <div className="App">
          <Route exact path="/login" component={ Login }></Route>
          <Route exact path="/map" component={ Map }></Route>
          <Route exact path="/citylist" component={ CityList }></Route>
          <Route path="/home" component={ Home }></Route>
          <Route path="/login" component={ Login }></Route>
          <Route path="/detail/:id" component={ Detail }></Route>
          <AuthRoute path="/rent" exact={true} Page={Rent}></AuthRoute>
          <AuthRoute path="/rent/search" exact={true} Page={RentSearch}></AuthRoute>
          <AuthRoute path="/rent/add" exact={true} Page={RentAdd}></AuthRoute>
          
          {/* 路由重定向 */}
          <Route exact path="/" render={(props)=>{
            return <Redirect to="/home/index"></Redirect>
          }}></Route>
        </div>
      </Suspense>
    </BrowserRouter>
  }
}
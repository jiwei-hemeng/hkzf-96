import React from 'react'
import ReactDOM from 'react-dom'

// 导入路由组件
import { BrowserRouter, Route, Link} from 'react-router-dom'

import Home from './components/home.js'
import Login from './components/login'
class App extends React.Component{
  render () {
    return <BrowserRouter>
      <ul>
        <li><Link to="/home">去home组件</Link></li>
        <li><Link to="/login">去Login组件</Link></li>
      </ul>
      <hr />
      {/* excat 精准匹配 */}
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
    </BrowserRouter>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuto } from '../../utils/token'
export default class index extends Component {
  render() {
    const { path, exact, route } = this.props
    return (
      <Route
        path={path}
        exact={exact}
        render={(props)=>{
          if(isAuto()){
            return <route></route>
          }
          return <Redirect to="/login"></Redirect>
        }}
      ></Route>
    )
  }
}

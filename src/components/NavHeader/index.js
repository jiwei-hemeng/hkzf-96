import React from 'react'
import { NavBar, Icon} from 'antd-mobile'

// 1. 由于react 封装组件时没有this.props.history,所以必须使用withRouter组件才会有this.props.history
import { withRouter} from 'react-router-dom'

import PropType from 'prop-types'
class NavHeader extends React.Component{
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.go(-1)}}
        >{ this.props.title }</NavBar>
      </div>
    )
  }
}

// 2. 校验props参数的数据类型
NavHeader.propTypes={
  title: PropType.string
}

// 3. 为props参数设置默认值
NavHeader.defaultProps = {
  title: '默认导航栏'
}

// withRouter 本质上是一个高阶组件，它为NavHeader组件提供了路由能力
export default withRouter(NavHeader)
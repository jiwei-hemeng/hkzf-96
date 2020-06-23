import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'
class SearchHeader extends Component {
  render() {
    return (
      <Flex className='searchBox'>
          <Flex className='searchLeft'>
            <div
              className='location'
              onClick={() => {
                this.props.history.push('/citylist')
              }}
            >
            <span>{this.props.cityname}</span>
            <i className="iconfont icon-below-s" />
            </div>
            <div
            className='searchForm'
            >
              <i className="iconfont icon-search1" />
              <span>请输入小区或地址</span>
            </div>
          </Flex>
          <i className="iconfont icon-map" onClick={() => {
            this.props.history.push('/map')
          }}  />
        </Flex>
    )
  }
}

// 校验数据类型
SearchHeader.propsTypes = {
  cityname: PropTypes.string
}

// 设置传参默认值
SearchHeader.defaultProps={
  cityname: '火星'
}

export default withRouter(SearchHeader)

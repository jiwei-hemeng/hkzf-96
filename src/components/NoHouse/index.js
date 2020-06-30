import React from 'react'

import PropTypes from 'prop-types'

import {  baseURL } from '../../utils/baseURL'
import styles from './index.module.css'

const NoHouse = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={ baseURL + '/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse

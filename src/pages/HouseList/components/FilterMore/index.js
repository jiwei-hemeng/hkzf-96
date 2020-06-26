import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters(arr) {
    // 高亮类名： styles.tagActive

    // return (
    //   <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    // )
    return arr.map((item, index)=>{
      return (
        <span
          key={item.value}
          className={[styles.tag, ''].join(' ')}
        >{item.label}</span>
      )
    })
  }

  render() {
    const { data } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(data.characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          onSave={this.props.onSave}
          onCancel={this.props.onCancel}
        />
      </div>
    )
  }
}

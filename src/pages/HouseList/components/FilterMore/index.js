import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    moreValues: this.props.defaultValue
  }
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
          className={[styles.tag, this.state.moreValues.indexOf(item.value) === -1? '': styles.tagActive ].join(' ')}
          onClick={()=>{
            let newValue = [...this.state.moreValues]
            let index = newValue.indexOf(item.value)
            if(index === -1){
              newValue.push(item.value)
            }else{
              newValue.splice(index, 1)
            }
            this.setState({
              moreValues: newValue
            })
          }}
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
          onSave={()=>{
            this.props.onSave(this.state.moreValues)
          }}
          cancelText="清除"
          onCancel={()=>{
            this.setState({
              moreValues: []
            })
          }}
        />
      </div>
    )
  }
}

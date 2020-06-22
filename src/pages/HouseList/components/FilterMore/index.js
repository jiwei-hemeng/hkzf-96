import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    // 选中值数组
    selectedValues: this.props.defaultValue
  }

  // 标签的单击事件
  handleChange = value => {
    // 判断选中值数组中是否存在当前值，如果存在就移除；如果不存在就添加
    const { selectedValues } = this.state
    // ['ROOM|d4a692e4-a177-37fd', 'FLOOR|2']
    let newSelectedValues = [...selectedValues]

    if (selectedValues.indexOf(value) > -1) {
      // 存在，移除
      // 1 [].splice(index, 1)
      // const index = selectedValues.findIndex(item => item === value)
      // newSelectedValues.splice(index, 1)

      // 2 [].filter()
      newSelectedValues = selectedValues.filter(item => item !== value)
    } else {
      // 不存在，添加
      newSelectedValues.push(value)
    }

    this.setState({
      selectedValues: newSelectedValues
    })
  }

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map(item => {
      // 判断当前菜单是否高亮
      const isSelected = this.state.selectedValues.indexOf(item.value) > -1

      return (
        <span
          key={item.value}
          className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
          onClick={() => this.handleChange(item.value)}
        >
          {item.label}
        </span>
      )
    })
  }

  render() {
    const {
      data: { roomType, oriented, floor, characteristic },
      onSave,
      onCancel,
      type
    } = this.props

    const { selectedValues } = this.state

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => onCancel(type)} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          cancelText="清除"
          onCancel={() => this.setState({ selectedValues: [] })}
          onSave={() => onSave(type, selectedValues)}
        />
      </div>
    )
  }
}

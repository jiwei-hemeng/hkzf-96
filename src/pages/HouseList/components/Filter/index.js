import React, { Component } from 'react'

// 导入动画库组件
import { Spring } from 'react-spring/renderprops'
import { API } from '../../../../utils/API'
import { getCurrentCity } from '../../../../utils/index'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

// 标题栏高亮状态数据
// 键： 表示每个标题菜单的类型
// 值： 布尔值，如果为false表示不亮；true表示高亮
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

// 不同菜单的选中值状态对象
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'], // ['null'] === ['null'] ===> false
  price: ['null'],
  more: []
}

export default class Filter extends Component {
  state = {
    // 标题栏高亮状态数据
    titleSelectedStatus,
    // 控制对话框展示和隐藏的状态
    // openType 值为： area/mode/price ，就展示 FilterPicker 组件
    // openType 值为： more ，就展示 FilterMore 组件
    openType: '',

    // 筛选条件数据
    filtersData: {},

    // 选中值状态对象
    selectedValues
  }

  async componentDidMount() {
    // 获取到body
    this.htmlBody = document.body

    const { value } = await getCurrentCity()

    const res = await API.get('/houses/condition', {
      params: {
        id: value
      }
    })

    this.setState({
      filtersData: res.data.body
    })
  }

  /* 
    ① 在标题点击事件 onTitleClick 方法中，获取到两个状态：标题选中状态对象和筛选条件的选中值对象。
    ② 根据当前标题选中状态对象，获取到一个新的标题选中状态对象（newTitleSelectedStatus）。
    ③ 使用 Object.keys() 方法，遍历标题选中状态对象。
    ④ 先判断是否为当前标题，如果是，直接让该标题选中状态为 true（高亮）。
    ⑤ 否则，分别判断每个标题的选中值是否与默认值相同。
    ⑥ 如果不同，则设置该标题的选中状态为 true。
    ⑦ 如果相同，则设置该标题的选中状态为 false。
    ⑧ 更新状态 titleSelectedStatus 的值为：newTitleSelectedStatus。
  */
  // 父组件中提供方法，给子组件调用
  // type 表示标题的类型
  onTitleClick = type => {
    // console.log('展开对话框')
    this.htmlBody.className = 'fixed'

    // titleSelectedStatus => { area: false, mode: true, ... }
    // selectedValues => { area: ['area', 'null'], mode: ['null'], ...] }
    const { titleSelectedStatus, selectedValues } = this.state

    // 创建新的标题选中状态对象，将来作为要更新的数据
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 遍历对象
    // Object.keys(titleSelectedStatus) ==> ['area', 'mode', ...]
    Object.keys(titleSelectedStatus).forEach(key => {
      const selectedVal = selectedValues[key]

      if (key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
      } else {
        // selectedStatus => { area: false }
        const selectedStatus = this.getTitleSelectedStatus(key, selectedVal)
        // 作用：将第二个参数对象中的属性拷贝到第一个参数对象中，如果是同名的属性，后面的覆盖前面
        // 并且直接修改第一个参数对象的值
        Object.assign(newTitleSelectedStatus, selectedStatus)
      }
    })

    this.setState({
      // 展示对话框
      openType: type,

      // 标题栏的高亮状态
      titleSelectedStatus: newTitleSelectedStatus
    })
  }

  // 关闭对话框
  // 实现标题高亮处理，并且只处理当前标题就可以了
  onCancel = type => {
    // 去掉 body 中的overflow hidden
    this.htmlBody.className = ''

    const { titleSelectedStatus, selectedValues } = this.state

    const selectedVal = selectedValues[type]

    const newTitleSelectedStatus = this.getTitleSelectedStatus(
      type,
      selectedVal
    )

    this.setState({
      openType: '',

      // 标题高亮状态
      titleSelectedStatus: {
        ...titleSelectedStatus,
        ...newTitleSelectedStatus
      }
    })
  }

  // 确定按钮的事件处理程序
  // type 表示当前菜单的类型
  // value 表示当前选中值
  onSave = (type, value) => {
    // 去掉 body 中的overflow hidden
    this.htmlBody.className = ''

    // 注意：value 才是最新的选中值；而 this.state.selectedValues 实际上是上一次的选中值
    const { titleSelectedStatus } = this.state
    // const newTitleSelectedStatus = { ...titleSelectedStatus }
    // 当前类型的选中值
    const selectedVal = value

    // 注意：该方法中返回的对象，只有一个属性！！！
    // newTitleSelectedStatus => { area: true } 或者 { mode: false }
    const newTitleSelectedStatus = this.getTitleSelectedStatus(
      type,
      selectedVal
    )

    /* 
      组装筛选条件数据：

      ① 在 Filter 组件的 onSave 方法中，根据最新 selectedValues 组装筛选条件数据 filters。
      ② 获取区域数据的参数名： area 或 subway（选中值数组的第一个元素）。
      ③ 获取区域数据的值（以最后一个 value 为准）。
      ④ 获取方式和租金的值（选中值的第一个元素）。
      ⑤ 获取筛选（more）的值（将选中值数组转化为以逗号分隔的字符串）。
    */

    const newSelectedValues = {
      ...this.state.selectedValues,
      // 只更新当前类型对应的值
      // price: ['PRICE|3000']
      [type]: value
    }

    // 最终要传递给 HouseList 页面的筛选条件数据
    const filters = {}
    // 区域或地铁：
    const area = newSelectedValues.area
    const areaKey = area[0]
    let areaValue
    // 选中值：
    // 如果数组长度为 2，那么，最后一项就是当前选中值
    // 如果数组长度为 3，那么，
    //            如果最后一项有值，最后一项的值就是我们要的值；
    //            否则，就是倒数第二项的值
    if (area.length === 2) {
      areaValue = area[1]
    } else {
      areaValue = area[2] === 'null' ? area[1] : area[2]
    }
    filters[areaKey] = areaValue

    // 租金：
    filters.price = newSelectedValues.price[0]
    // 方式：
    filters.rentType = newSelectedValues.mode[0]
    // 更多筛选条件：
    filters.more = newSelectedValues.more.join(',')

    // console.log('组装的筛选条件数据：', filters)
    // 调用父组件的 onFilter 方法，将所有筛选条件数据，传递给父组件
    this.props.onFilter(filters)

    this.setState({
      openType: '',

      titleSelectedStatus: {
        ...titleSelectedStatus,
        ...newTitleSelectedStatus
      },

      // 更新每个菜单的选中值
      selectedValues: newSelectedValues
    })
  }

  // 封装菜单高亮的逻辑判断代码
  getTitleSelectedStatus(type, selectedVal) {
    // 因为我们要修改 newTitleSelectedStatus，所以，直接在该方法中创建这个对象
    // 然后，修改。最后，将修改后的对象返回即可。
    // 注意：最好不要修改参数！！！
    let newTitleSelectedStatus = {}

    if (
      type === 'area' &&
      (selectedVal.length === 3 || selectedVal[0] !== 'area')
    ) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length > 0) {
      // 高亮
      // 后面实现了 FilterMore 组件后，再补充
      newTitleSelectedStatus[type] = true
    } else {
      // 不高亮
      newTitleSelectedStatus[type] = false
    }

    return newTitleSelectedStatus
  }

  // 渲染 FilterPicker 组件
  renderFilterPicker() {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues
    } = this.state

    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }

    // FilterPciker 组件需要的数据
    // cols 表示 PickerView 组件的列数
    let data
    let cols = 1
    // openType ==> area
    // selectedValues[openType] ==> selectedValues.area ==> ['area', 'null']
    let defaultValue = selectedValues[openType]

    switch (openType) {
      case 'area':
        cols = 3
        data = [area, subway]
        break
      case 'mode':
        data = rentType
        break
      case 'price':
        data = price
        break
      default:
        break
    }

    return (
      <FilterPicker
        key={openType}
        defaultValue={defaultValue}
        type={openType}
        data={data}
        cols={cols}
        onSave={this.onSave}
        onCancel={this.onCancel}
      />
    )
  }

  // 渲染 FilterMore 组件
  renderFilterMore() {
    const {
      openType,
      selectedValues,
      filtersData: { roomType, oriented, floor, characteristic }
    } = this.state

    if (openType !== 'more') {
      return null
    }

    // 组装数据
    const data = {
      roomType,
      oriented,
      floor,
      characteristic
    }

    // 当前选中值
    const defaultValue = selectedValues.more

    return (
      <FilterMore
        defaultValue={defaultValue}
        type={openType}
        data={data}
        onSave={this.onSave}
        onCancel={this.onCancel}
      />
    )
  }

  // 渲染遮罩层
  renderMask() {
    const { openType } = this.state

    // 判断遮罩层是否隐藏
    const isHide =
      openType !== 'area' && openType !== 'mode' && openType !== 'price'

    // if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
    //   return null
    // }

    // 因为我们为了实现动画效果，需要一直渲染 Spring 组件。
    // 但是，我们不希望进入页面时，就展示 遮罩层 ，所以， to 属性的值默认应该为 opacity: 0
    // 当打开遮罩层的时候，让 to 属性中 opacity 的值变为 1 即可

    // 第一次：从 from 的 0 --> to 的1
    // 第二次：从 to 的 1（旧状态） --> to 的 0（新状态）
    // 以后的每一次都是 旧to 到 新to
    return (
      // <Spring from={{ opacity: 0 }} to={{ opacity: isHide ? 0 : 1 }}>
      <Spring to={{ opacity: isHide ? 0 : 1 }}>
        {props => {
          // 如果遮罩层是隐藏的，就不渲染 遮罩层 元素。这样就可以解决遮挡无法点击页面顶部导航栏按钮的bug了
          if (props.opacity === 0) {
            return null
          }

          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel(openType)}
            />
          )
        }}
      </Spring>
    )
  }

  render() {
    const { titleSelectedStatus } = this.state

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}

        {this.renderMask()}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            onClick={this.onTitleClick}
            titleSelectedStatus={titleSelectedStatus}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}

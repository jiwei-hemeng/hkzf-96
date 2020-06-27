import React from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import { getCurrentCity } from '../../utils/index'
import './index.scss'
import { API } from '../../utils/API'
// 导入可视化渲染
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
// 导入局部样式
import styles from './index.module.scss'
export default class HouseList extends React.Component{
  state = {
    cityname: '',
    count: 0,
    list: []
  }
  componentDidMount(){
    this.getCityName()
    this.filters = {}
    this.getHouseList()
  }
  async getCityName(){
    let res = await getCurrentCity()
    this.setState({
      cityname: res.label
    })
  }
  onfilter=(filters)=>{
    this.filters = filters
    this.getHouseList()
  }
  async getHouseList(){
    const city = await getCurrentCity()
    const { data } = await API({
      url: '/houses',
      params: {
        cityId: city.value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    this.setState({
      count: data.body.count,
      list: data.body.list
    })
  }

  rowRenderer=({
    key, // 唯一
    index, // 索引
    isScrolling, // 是否滚动
    isVisible, // 是否可见
    style, // 样式
  })=> {
    let house = this.state.list[index]
    if(!house){
      return (
        <div key={key} style={style}>正在加载</div>
      )
    }
    return (
      <div key={key} style={style} className={styles.house}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={`http://api-haoke-dev.itheima.net${house.houseImg}`} alt="" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{house.title}</h3>
          <div className={styles.desc}>{house.desc}</div>
          <div>
            {/* ['近地铁', '随时看房'] */}
            {
              house.tags.map((item, index) =>{
                return (
                  <span key={index} className={[styles.tag,styles.tag1 ].join(' ')} >
                    {item}
                  </span>
                )
              })
            }
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{house.price}</span> 元/月
          </div>
        </div>
      </div>
    );
  }
  isRowLoaded= ({ index })=> {
    return !!this.state.list[index];
  }
  loadMoreRows= ({ startIndex, stopIndex }) => {
    console.log('加载更多。。。。。')
    return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
      .then(response => {
        // Store response data in list...
      })
  }
  render () {
    return (
      <div className="houselist">
        <div className="Header">
          <i
            className="iconfont icon-jiantouarrowhead7"
            onClick={() => {
              this.props.history.go(-1)
            }}
          />
          <SearchHeader 
            className="searchhearder"
            cityname={ this.state.cityname }
          />
        </div>
        <Filter
          onfilter={ this.onfilter }
        />
        {/* 房源列表 */}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded} // 当前数据加载完成
          loadMoreRows={this.loadMoreRows} // 加载更多
          rowCount={this.state.count} // 总条数
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({height, isScrolling, onChildScroll, scrollTop})=>{
                return (
                  <AutoSizer>
                    {({ width })=>(
                      <List
                        // InfiniteLoader 的要求
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
    
                        // WindowScroller  的要求
                        autoHeight  // 自适应高度
                        isScrolling={isScrolling}  // 组件是否滚动
                        onScroll={ onChildScroll} // 监听让页面一起滚动
                        scrollTop={scrollTop}
    
                        // list 组件的要求
                        width={ width }
                        height={ height }
                        rowCount={this.state.count}
                        rowHeight={120}   // 每行的高度
                        rowRenderer={this.rowRenderer} // 每条数据渲染的函数
                      />  
                    )}
                  </AutoSizer>
                )
              }}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}

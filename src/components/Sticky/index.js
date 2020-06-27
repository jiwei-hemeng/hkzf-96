import React, { Component } from 'react'

export default class Sticky extends Component {
  pRef = React.createRef()
  cRef = React.createRef()
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }
  
  componentWillUnmount(){
    // 组件卸载时取消事件监听,否则跳转到其他页面会报错
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll=() => {
    let pDiv = this.pRef.current
    let cDiv = this.cRef.current
    // js 原生的方法用来获取元素所在位置的信息
    let { top } = pDiv.getBoundingClientRect()
    if(top <= 0){
      cDiv.style.position = 'fixed'
      cDiv.style.top = 0
      cDiv.style.left = 0
      cDiv.style.right = 0
      pDiv.style.height = this.props.height + 'px'
      cDiv.style.zIndex = 999
    }else{
      cDiv.style.position = 'static'
      pDiv.style.height = 0
    }
  }
  render() {
    return (
      <div className="sticky">
        <div id="placeholder" ref={this.pRef}></div>
        <div id="content" ref={this.cRef}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

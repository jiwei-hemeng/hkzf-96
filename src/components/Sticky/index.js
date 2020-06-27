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
    let { top } = pDiv.getBoundingClientRect()
    if(top <= 0){
      cDiv.style.position = 'fixed'
      cDiv.style.top = 0
      cDiv.style.left = 0
      cDiv.style.rigth = 0
      pDiv.style.heigth = this.props.heigth + 'px'
      cDiv.style.zIndex = 999
    }else{
      cDiv.style.position = 'static'
      pDiv.style.heigth = 0
    }
  }
  render() {
    return (
      <div className="sticky">
        <div id="placeholder" ref={this.pDiv}></div>
        <div id="content" ref={this.cDiv}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

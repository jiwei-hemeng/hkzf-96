import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

import { API } from '../../utils/API'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  setUserName =(e) => {
    this.setState({
      username: e.target.value
    })
  }
  setPassWord = e => {
    this.setState({
      password: e.target.value
    })
  }
  formSubmit = async (e) => {
    e.preventDefault()
    Toast.loading('正在登录中...', 0)
    const { data } = await API({
      method: 'POST',
      url: '/user/login',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    Toast.hide()
    if(data.status === 200){
      Toast.success('登录成功哦~~', 2)
      localStorage.setItem('my-token', data.body.token)
    }else{
      Toast.fail('登录失败~~', 2)
    }
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader} title={'账号登录'}></NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={ this.formSubmit }>
            <div className={styles.formItem}>
              <input
                value={ this.state.username }
                onChange = { this.setUserName }
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={ this.state.password }
                onChange= { this.setPassWord }
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login

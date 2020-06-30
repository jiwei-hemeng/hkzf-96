import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

import { API } from '../../utils/API'

import { withFormik, ErrorMessage, Form, Field } from 'formik'

// 导入yup
import * as Yup from 'yup'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  render() {
    let { errors} = this.props
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader} title={'账号登录'}></NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              {/* 相当于input */}
              <Field type="text" name="username" className={styles.input} placeholder="请输入账号"/>
            </div>
            {
              errors.username ? <ErrorMessage component="div" name="username" className={styles.error} /> : null
            }
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <Field type="password" name="password" className={styles.input} placeholder="请输入密码"/>
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            
            {
              errors.password ? <ErrorMessage component="div" name="password" className={styles.error} /> : null
            }
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
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

export default withFormik({
  // 相当于state
  mapPropsToValues: ()=>{
    return {
      username: '',
      password: ''
    }
  },
  // 默认相当于提交事件
  handleSubmit: async (value, { props })=>{
    Toast.loading('正在登录中...', 0)
    const { data } = await API({
      method: 'POST',
      url: '/user/login',
      data: {
        username: value.username,
        password: value.password
      }
    })
    Toast.hide()
    if(data.status === 200){
      Toast.success('登录成功哦~~', 2)
      localStorage.setItem('my-token', data.body.token)
      props.history.go(-1)
    }else{
      Toast.fail('登录失败~~', 2)
    }
  },
  // 用于表单验证，会将错误消息传给this.props
  validationSchema: Yup.object().shape({
    username: Yup.string().required('用户名必须填写').matches(/^[a-zA-Z_\d]{5,8}$/,'用户名长度5-8位'),
    password: Yup.string().required('密码必须填写').matches(/^[a-zA-Z_\d]{5,12}$/,'用户名长度5-8位')
  })
})(Login)

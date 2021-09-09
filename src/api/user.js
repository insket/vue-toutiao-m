/**
 * 用户相关请求模块
 */

import request from '@/utils/request.js'
import mockAjax from '@/utils/mockAjax.js'
//非组件模块当中获取store必须要单独加载
// import store from '@/store'

/**
 *    登陆/注册
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

//发送短信验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

//获取用户自己的信息
export const getCurrentUser = () => {
  return mockAjax({
    method: 'GET',
    url: '/userInfo'
  })
}


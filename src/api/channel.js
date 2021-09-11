/**
 * 频道相关模块
*/

import request from '@/utils/request.js'

/**
 * 获取所有频道列表
*/
export const getAllChannels = () => {
  return request({
    url:'/app/v1_0/channels',
    method:'GET'
  })
}


/**
 * 分类频道存储到服务器
*/
export const addUserChannel = data => {
  return request({
    url:'/app/v1_0/channels',
    method:'PATCH',
    data
  })
}

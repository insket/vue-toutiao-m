import Mock from 'mockjs'
import CurrentUserInfo from './CurrentUserInfo.json'
import Channels from './channels.json'

//user个人信息数据
Mock.mock('/mock/userInfo',{code:200,data:CurrentUserInfo})

//hometab分类列表数据
Mock.mock('/mock/channels',{code:200,data:Channels})

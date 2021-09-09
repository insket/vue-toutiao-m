import Mock from 'mockjs'
import CurrentUserInfo from './CurrentUserInfo.json'

Mock.mock('/mock/userInfo',{code:200,data:CurrentUserInfo})


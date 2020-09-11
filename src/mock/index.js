import Mock from 'mockjs'
import homeApi from './home.js'
import userApi from './user.js'

Mock.setup({
    timeout: '200-2000'
})

Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData);
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
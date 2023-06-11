import axios from "axios";
import {message as Msg} from 'ant-design-vue'
import useToken from '../stores/token'
import router from '@/router'
// 使用axios 创建实例

const serive = axios.create({
    // 处理化参数
    baseURL:'/api'
})
// serive 和 axios 功能一模一样
// 请求拦截器
// 添加请求拦截器

serive.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 统一注入token
    const {token} = useToken()
    if(token){
        // 有token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
// 响应拦截器- 数据获取到之后-  >then之前
// 1. 成功  2. 失败
serive.interceptors.response.use(
    (response) => {
      const { success, message, data } = response.data // axios默认加了一层data
      if (success) {
        // 表示执行成功
        return data // 返回需要的业务数据
      }
      // 提示消息
      Msg.error(message)
      // 报错
      return Promise.reject(new Error(message))
    },
    (error) => {
      if (error.response.status === 401) {
        // 此时说明token超时了- 超时和没有token是没有任何区别的
        const { removeToken } = useToken()
        removeToken() // 删除token
        // 回到登录
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )

// 导出工具


export default serive;

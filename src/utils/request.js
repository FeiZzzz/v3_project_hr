import axios from "axios";
import {message as Msg} from 'ant-design-vue'
import useToken from '../stores/token'
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
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const {success,message,data} = response.data
    if(success){
        // 表示执行成功
        return data
    }
    // 提示消息 ---d到这里表示失败
    
    Msg.error(message)
    // 报错消息
    return Promise.reject(new Error(message));
   
   
},(err)=>Promise.reject(err));

// 导出工具


export default serive;

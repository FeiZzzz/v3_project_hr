// 封装一个登录请求的方法
// 接口地址
// 请求工具
import request from '../utils/request.js'
// 提供方法

export function login(data) {
    // 要拿登陆成功的数据
    return request({
        url:'/sys/login',
        method:'post',
        data
        // 请求体参数-  url参数 请求体参数  header body
    }) // 返回promise对象
}
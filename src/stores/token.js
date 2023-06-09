import {defineStore}   from 'pinia'
import{ref} from 'vue'
// 1.仓库的标识 2. 仓库的需要管理的状态
const useToken = defineStore('token',()=>{
// 回调函数  进行返回的状态就是要管理的状态
const token = ref(null) // 需要在token变化的时候 通知组件

//  修改token的方法
const updataToken = val => token.value = val
// 删除token的方法
const removeToken  = ()=> token.value = null

return  {token,updataToken,removeToken}
},
{
    persist:true // // 可持久化的标记- 将我们的数据 持久化到前端缓存中
})

// 导出这个方法
export default useToken
<script setup>
// 实现表单的校验
// 1.声明响应式数据

import {reactive} from 'vue'
import {useRouter} from 'vue-router' //引入方法
import {login} from '../../api/login'
import uweToken from '../../stores/token'
// useRouter需要放置在最上层-初始化的关系
const router = useRouter() // 得到一个router实例
const loginForm =reactive({
     // 手机号 密码  是否同意
     mobile:'13800000002',
     password:'hm#qd@23!',
     isAgree:false // 纯前端数据 rules中的requird只能校验 null/undefined/""

})
// 点击登录的事件
const onFinish =  async(value)=>{
    console.log(value);
    const {updataToken}  = uweToken()
    //  values是校验表单的数据
    const data = await login(value)
    // 这里一定都是成功的代码
  // await必须和async配套使用 await是强制等待
  // 更改pinia里面的token
  updataToken(data)
  // 登陆成功，跳转主页
  router.push('/')
}
// 🚀由于required不能甄别布尔值，所以需要通过自定义校验规则来校验isAgree属性
// 自定义校验规则 rule是当前的规则 value是当前的值
const validatorAgree = (rule,value)=>{
      // 判断value是不是true  如果不是true就报错
    //   Promise 是ES6里面的一个构造函数 resolve 成功 reject 失败
      return value ? Promise.resolve() : Promise.reject(new Error('您必须勾选用户平台使用协议'))
}
</script>
<template>
    <div class="login-container">
      <div class="logo">
        <div class="icon"></div>
        <img src="@/assets/common/login.svg" width="300" alt="" />
        <p>开箱即用的中后台管理系统</p>
      </div>
      <div class="form">
        <h3>iHRM 人力资源管理系统</h3>
        <a-card class="login-card">
                  <!-- 放置登录表单 -->
        <!-- autocomplete不自动填充表单 -->
        <a-form :model="loginForm" autocomplete="off" @finish="onFinish">
          <a-form-item name="mobile" :rules="[{
            required:true,message:'手机号不能为空',trigger:['change','blur']},
            {pattern:/^1[3-9]\d{9}$/, message:'手机号格式不正确',trigger:['change']}
            ]">
            <!-- 手机号 -->
            <!-- v-model原理实现 v2-v3的变化  v-model :value-> modelValue -->
            <!-- v-model实现原理 :value  @input -->
            <a-input size="large" v-model:value="loginForm.mobile"></a-input>
          </a-form-item>
          <a-form-item name="password"
          :rules="[{required:true,message:'密码不能为空',trigger:['change','blur']}]"
          >
            <a-input-password size="large" v-model:value="loginForm.password"></a-input-password>
          </a-form-item>
          <a-form-item name="isAgree" :rules="[{validator:validatorAgree}]">
            <a-checkbox v-model:checked="loginForm.isAgree">用户平台使用协议</a-checkbox>
          </a-form-item>
          <a-form-item>
            <!-- 监听表单form的finish事件，当校验通过，会触发绑定该事件的方法
               如果 Modal 的确认按钮在 Form 之外，通过 form.submit 方法调用表单提交功能。
                反之，则推荐使用 <Button htmlType="submit" /> 调用 web 原生提交逻辑。
                给按钮添加一个属性 htmlType="submit" -->
            <a-button size="large" type="primary" block
            htmlType="submit"
            >登录</a-button>
          </a-form-item>
        </a-form>
        </a-card>
      </div>
    </div>
  </template>
  
  <style lang="less">
  .login-container {
    display: flex;
    align-items: stretch;
    height: 100vh;
    .logo {
      flex: 3;
      background: rgba(38, 72, 176) url(../../assets/common/logBg.png) no-repeat center / cover;
      border-top-right-radius: 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      padding: 0 100px;
      .icon {
        background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
        width: 300px;
        height: 50px;
        margin-bottom: 50px;
      }
      p {
        color: #fff;
        font-size: 18px;
        margin-top: 20px;
        width: 300px;
        text-align: center;
      }
    }
    .form {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 50px;
      .ant-card {
        width: 320px;
        border: none;
        padding: 0;
      }
      h3 {
        padding-left: 30px;
        font-size: 24px;
      }
    }
  }
  </style>
  
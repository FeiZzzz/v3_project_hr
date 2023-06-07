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
        <a-form autocomplete="off">
          <a-form-item>
            <a-input size="large"></a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password size="large"></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox>用户平台使用协议</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button size="large" type="primary" block>登录</a-button>
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
  
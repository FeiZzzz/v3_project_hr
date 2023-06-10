<template>
    <!-- 点击图标时出发 -->
    <div @click="changeCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <a-popover placement="bottomRight">
      <a-avatar class="my-avatar">U</a-avatar>
      <template #content>
        <div class="my-select">
          <p class="item">
            <LockOutlined /><span> 退出登录</span>
          </p>
        </div>
      </template>
    </a-popover>
  </template>
  <script setup>
  const { collapsed } = defineProps({
    collapsed: Boolean
  })
  // 获取事件触发器
  const emit = defineEmits(['update:collapsed'])
  const changeCollapsed = () => {
    emit('update:collapsed', !collapsed)  // 触发了一个事件- 传出了一个参数 子传父
    // v-model实际上是监听了 子组件触发的事件  update:modelValue
  }
  </script>
  <style scoped>
  .my-avatar {
    color: #f56a00;
    background-color: #fde3cf;
    cursor: pointer;
  }
  </style>
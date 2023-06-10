<template>
  <!-- 点击图标时出发 -->
  <div @click="changeCollapsed">
    <MenuUnfoldOutlined v-if="collapsed" />
    <MenuFoldOutlined v-else />
  </div>
  <a-popover placement="bottomRight">
    <span class="user-name">{{ userInfo.username }}</span>
    <a-avatar class="my-avatar">{{ userInfo.username?.charAt[0] }}</a-avatar>
    <template #content>
      <div class="my-select">
        <p class="item" @click="logout">
          <LockOutlined /><span> 退出登录</span>
        </p>
      </div>
    </template>
  </a-popover>
</template>
<script setup>
import { Modal } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { getUserInfo } from '../../../api/login'
import { useRouter } from 'vue-router'
import useToken from '../../../stores/token'
// 得到router实例
const router = useRouter()
const userInfo = ref({})
const { collapsed } = defineProps({
  collapsed: Boolean
})
// 获取事件触发器
const emit = defineEmits(['update:collapsed'])
const changeCollapsed = () => {
  emit('update:collapsed', !collapsed)  // 触发了一个事件- 传出了一个参数 子传父
  // v-model实际上是监听了 子组件触发的事件  update:modelValue
}
const getUserProfile = async () => {
  userInfo.value = await getUserInfo()
}
onMounted(() => getUserProfile())
// 退出登录的方法
const logout = () => {
  // 退出之前要询问一下
  Modal.confirm({
    title: '温馨提示',
    content: '您确定退出吗?',
    cancelText:'取消',
    okText:'确定',
    onOk() {
      // 清除token
      const { removeToken } = useToken()
      removeToken()
      // 跳转到登录页
      router.push('/login')

    }
  })
}
</script>
<style scoped>
.my-avatar {
  color: #f56a00;
  background-color: #fde3cf;
  cursor: pointer;
}
</style>
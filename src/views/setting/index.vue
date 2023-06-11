<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getRoleList } from '@/api/setting'
// 定义列信息
const columns = [{
  title: '序号',
  customRender({ index }) {
    // 要和当前的分页数据进行集合
    // 1 -> 1
    // 2 -> (页码 -1） * 每页条数 + 1
    return (pageParams.page - 1) * pageParams.pagesize + index + 1
  }
}, { title: '角色名称', dataIndex: 'name' }, { title: '角色描述', dataIndex: 'description' }, { title: '操作', dataIndex: 'operate' }] // 究竟有多少列  不需要响应式
const list = ref([]) // 定义数据
const pageParams = reactive({
  page: 1, // 当前第几页
  pagesize: 5, // 每页多少条
  total: 0, // 总数
})


onMounted(() => {
  getList()
})
// 获取角色列表
const getList = async () => {
  const { total, rows } = await getRoleList(pageParams) // 获取数据
  list.value = rows // 将获取到的rows数据赋值给list
  pageParams.total = total // 将总数设置给分页数据
}
// 页码切换事件
const changePage = (page, pagesize) => {
  // 切换到了第几页
  pageParams.page = page // 更新当前是第几页
  pageParams.pagesize = pagesize // 当选了每页多少条之后触发
  // 需要将最新的页码和每页条数 通过参数 再次调用接口 获取对应页码的数据
  getList() // 重新拉取数据
}
</script>
<template>
  <div class="container">
      <a-tabs class="setting-tab">
        <a-tab-pane key="role" tab="角色设置">
        <a-button type="primary" style="margin-bottom: 16px">新增角色</a-button>
        <a-table 
        :columns="columns"
         :dataSource="list"
         :pagination="{
            current: pageParams.page,
            pageSize: pageParams.pagesize,
            total: pageParams.total,
            onchange:changePage
          }">
                <template #bodyCell="{ column }">
            <a-space v-if="column.dataIndex === 'operate'">
              <a-button type="primary" >编辑</a-button>
              <a-button type="danger" >删除</a-button>
            </a-space>
          </template>
        </a-table>
      </a-tab-pane>
        <a-tab-pane key="setting" tab="公司设置" force-render>
        </a-tab-pane>
      </a-tabs>
    </div>
  </template>
  <style lang="less" scoped>
  .container {
    padding: 16px;
    .setting-tab {
      background-color: #fff;
      padding: 16px;
      height: calc(100vh - 93px);
    }
  }
  </style>
  
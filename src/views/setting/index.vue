<script setup  name="setting">

const columns =  [
  {
    title: '序号'
  },
  { title: '角色名称', dataIndex: 'name' },
  { title: '描述', dataIndex: 'description' },
  { title: '操作', dataIndex: 'operate' }
]
</script>
<template>
  <div class="container">
      <a-tabs class="setting-tab">
        <a-tab-pane key="role" tab="角色设置">
          <a-button type="primary" style="margin-bottom: 16px" >新增角色</a-button>
         <a-tab-pane :columns="columns"></a-tab-pane>
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
  
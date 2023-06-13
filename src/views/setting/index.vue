<script setup>
import { ref, onMounted, reactive ,computed} from 'vue';
import { getRoleList,getRoleDetail,addRolet,updateRoleList,delRole } from '@/api/setting'
import { Form, message ,Modal} from 'ant-design-vue';
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


const visible = ref(false) // 定义控制弹层的显示
// 定义响应式数据
const formData = reactive({
  name: '',
  description: ''
})
// 定义响应式的规则- ant-design-vue的要求
const rules = reactive({
  name: [{ required: true, message: '请输入角色名称' }],
  description: [{ required: true, message: '请输入角色描述' }]
})
// 利用ant-design-vue中Form的方法useForm
const form = Form.useForm(formData, rules) // 得到的是form实例

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
const btnOK = async () => {
  // 手动校验表单数据
  await form.validate() // promise
  // 意味着此时数据通过了校验
  // formData 就是可以新增的数据了
  formData.id ? await updateRoleList(formData) : await addRolet(formData) //  有id编辑 没有id新增
  // 新增成功
  message.success(showTitle.value + "成功")
  // 重置数据
  btnCancel()

  getList() // 重新拉取数据

  visible.value = false // 关闭弹层

}

const editDetailRole  = async (id)=>{
  // 有id
  // 先弹出
  visible.value = true
  // 发送数据，通过id获取角色详情
  const {name,description} = await getRoleDetail(id)
  // 数据回显
  console.log(name,description);
  formData.name = name
  formData.description = description
  // 如何区分是否是编辑还是新增
  formData.id = id // id作为确定的时候 区分场景的存在
}

const btnCancel = () => {
  formData.id = null // 需要将FormData的id重置为空
  form.resetFields() // 重置字段 重置数据 消除校验提示
}
const showTitle = computed(() => (formData.id ? '更新角色' : '新增角色'))
// 删除方法
const delRow = (id) => {
  Modal.confirm({
    title: '提示',
    content: "确定要删除该条数据吗",
    async onOk() {
      await delRole(id)
      // 因为删除之后，如果第二页没数据了 还请求第二页数据、
      list.value.length === 1 && pageParams.page-- // 当前页只有一条数据的时候 往前走一页
      // if (list.value.length === 1) {
      //   pageParams.page--
      // }
      getList()
      message.success("删除数据成功")
    }
  })

}
</script>
<template>
  <div class="container">
      <a-tabs class="setting-tab">
        <a-tab-pane key="role" tab="角色设置">
          <a-button @click="visible = true" type="primary" style="margin-bottom: 16px">
   新增角色
</a-button>
        <a-table 
        :columns="columns"
         :dataSource="list"
         :pagination="{
            current: pageParams.page,
            pageSize: pageParams.pagesize,
            total: pageParams.total,
            onchange:changePage
          }">
             <template #bodyCell="{ column, record }">
            <a-space v-if="column.dataIndex === 'operate'">
              <a-button type="primary" @click="editDetailRole(record.id)">编辑</a-button>
              <a-button type="danger" @click="delRow(record.id)">删除</a-button>
            </a-space>
          </template>
        </a-table>
      </a-tab-pane>
        <a-tab-pane key="setting" tab="公司设置" force-render>
        </a-tab-pane>
      </a-tabs>
      <a-modal @ok="btnOK" @cancel="btnCancel" :title="showTitle" v-model:visible="showDialog">


    <!-- 放置表单内容 -->
    <a-form>
      <a-form-item v-bind="form.validateInfos.name">
        <a-input v-model:value="formData.name" placeholder="请输入角色名称"></a-input>
      </a-form-item>
      <a-form-item v-bind="form.validateInfos.description">
        <a-input v-model:value="formData.description" placeholder="请输入角色描述"></a-input>
      </a-form-item>
    </a-form>

  </a-modal>
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
  
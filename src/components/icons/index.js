import {
    HomeOutlined,
    PartitionOutlined,
    SettingOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined,
    LockOutlined
} from '@ant-design/icons-vue'

// 批量注册全局的图标
const icons = [ HomeOutlined,PartitionOutlined,SettingOutlined,TeamOutlined,MenuUnfoldOutlined,MenuFoldOutlined,PoweroffOutlined,LockOutlined]


export default {
    // 全局注册引入的所有图标
    install:(app)=> icons.forEach(item =>app.component(item.displayName,item))
}
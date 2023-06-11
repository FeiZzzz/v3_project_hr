import request from '@/utils/request.js'

// 获取角色列表
export function getRoleList(params) {
    return request({
        url: '/sys/role',
        params
    })
}
// // 删除角色
export function delRole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete'
    })
}
// 新增角色
export function addRolet(data) {
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}
// 更新角色
export function updateRoleList(data) {
    return request({
        url: ` /sys/role/${data.id}`,
        method: 'put',
        data
    })
}
// 根据ID获取角色详情
export function getRoleDetail(id) {
    return request({
        url: `/sys/role/${id}`

    })
}
// 获取公司数据
export function getCompanyInfo() {
    return request({
        url: `/company`
    })
}
import request from '@/api/request'

//执行登录
function getStudentList(data) {
    return request({
        url: '/admin/xy/student/list',
        method: 'get',
        data
    })
}
//学生列表
function getStudentDetail(data) {
    return request({
        url: '/admin/xy/student/detail',
        method: 'get',
        data
    })
}
//学生编辑
function doUpDate(data) {
    return request({
        url: '/admin/xy/student/update',
        method: 'post',
        data
    })
}
//学生删除
function delData(data) {
    return request({
        url: '/admin/xy/student/del',
        method: 'get',
        data
    })
}
//学生添加
function doStudentSave(data) {
    return request({
        url: '/admin/xy/student/save',
        method: 'post',
        data
    })
}
//班级列表
function clazzlist(data) {
    return request({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}
//班级详情
function clazzDetail(data) {
    return request({
        url: '/admin/xy/clazz/detail',
        method: 'get',
        data
    })
}
//宿舍列表
function dormList(data) {
    return request({
        url: '/admin/xy/dorm/list',
        method: 'get',
        data
    })
}
//宿舍详情
function dormDetail(data) {
    return request({
        url: '/admin/xy/dorm/detail',
        method: 'get',
        data
    })
}
//宿舍添加
function dormSave(data) {
    return request({
        url: '/admin/xy/dorm/save',
        method: 'post',
        data
    })
}
//宿舍删除
function dormDel(data) {
    return request({
        url: '/admin/xy/dorm/del',
        method: 'get',
        data
    })
}
//宿舍编辑
function dormUpdate(data) {
    return request({
        url: '/admin/xy/dorm/update',
        method: 'post',
        data
    })
}
//班级编辑
function clazzUpdate(data) {
    return request({
        url: '/admin/xy/clazz/update',
        method: 'post',
        data
    })
}
//班级删除
function delClazz(data) {
    return request({
        url: '/admin/xy/clazz/del',
        method: 'get',
        data
    })
}
//班级添加
function saveClazz(data) {
    return request({
        url: '/admin/xy/clazz/save',
        method: 'post',
        data
    })
}
//班级列表
function getCostList(data) {
    return request({
        url: '/admin/xy/cost/list',
        method: 'get',
        data
    })
}

export default {
    getStudentList,
    getStudentDetail,
    doUpDate,
    delData,
    doStudentSave,
    clazzlist,
    clazzDetail,
    clazzUpdate,
    delClazz,
    dormList,
    saveClazz,
    getCostList,
    dormDetail,
    dormSave,
    dormDel,
    dormUpdate
}
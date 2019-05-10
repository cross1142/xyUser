import request from '@/api/request'

//获取新闻列表
function newsList(data) {
    return request({
        url: '/admin/xy/news/list',
        method: 'get',
        data
    })
}
//获取新闻详情
function newsDetail(data) {
    return request({
        url: '/admin/xy/news/detail',
        method: 'get',
        data
    })
}
//添加news
function newsSave(data) {
    return request({
        url: '/admin/xy/news/save',
        method: 'post',
        data
    })
}
//编辑news
function newsUpdate(data) {
    return request({
        url: '/admin/xy/news/update',
        method: 'post',
        data
    })
}
//删除news
function newsDel(data) {
    return request({
        url: '/admin/xy/news/del',
        method: 'post',
        data
    })
}
export default {
    newsList,
    newsDetail,
    newsSave,
    newsUpdate,
    newsDel
}
/*
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2022-12-31 18:35:06
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-31 15:33:01
 * @FilePath: \newbee-admimn\src\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function localGet (key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}


export function localRemove (key) {
  window.localStorage.removeItem(key)
}
 export const pathMap = {
    index: '首页',
    login: '登录',
    add: '添加商品',
    swiper: '轮播图配置',
    hot: '热销商品配置',
    new: '新品上线配置',
    recommend: '为你推荐配置',
    category: '分类管理',
    level2: '分类二级管理',
    level3: '分类三级管理',
    good: '商品管理',
    order: '订单管理',
    order_detail: '订单详情',
    guest: '会员管理',
    account:'修改账户'
}

// 单张图片上传
export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
// 多张图片上传
export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'

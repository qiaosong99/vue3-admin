/*
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2022-12-31 10:17:59
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-30 10:17:51
 * @FilePath: \newbee-admimn\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper from '@/views/Swiper'
import IndexConfig from '@/views/IndexConfig'
import category from '@/views/category'
import good from '@/views/good'
import order from '@/views/order'
import OrderDetail from '@/views/OrderDetail'
import Guest from '@/views/Guest'
import Account from '@/views/Account'
const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/add',
      name: 'add',
      component:AddGood
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/swiper',
      name: 'swiper',
      component:Swiper
    },
    {
      path: '/hot',
      name: 'hot',
      component: IndexConfig
    },
    {
      path: '/new',
      name: 'new',
      component: IndexConfig
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: IndexConfig
    },
    {
      path: '/category',
      name: 'category',
      component: category,
      children: [
        {
          path: '/category/level2',
          name: 'level2',
          component: category,
        },
        {
          path: '/category/level3',
          name: 'level3',
          component: category,
        }
      ]
    },
    {
      path: '/good',
      name: 'good',
      component: good
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: OrderDetail
    },
    {
      path: '/guest',
      name: 'guest',
      component: Guest
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
  ]
})

export default router

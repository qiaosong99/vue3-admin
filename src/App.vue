<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2022-12-31 10:14:33
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-30 21:50:00
 * @FilePath: \newbee-admimn\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="common-layout">
    <el-container class="container" v-if="state.showMenu">
      <el-aside class="aside"><AsideVue :currentPath="state.currentPath" /></el-aside>
      <el-container>
        <el-header ><header-vue/></el-header>
        <el-main class="main"> <router-view /></el-main>
        <el-footer><footer-vue/></el-footer>
      </el-container>
    </el-container>
    <el-container class="container" v-else >
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import AsideVue from './components/layout/Aside.vue';
import HeaderVue from './components/layout/Header.vue';
import footerVue from './components/layout/footer.vue';
import { localGet, pathMap } from '@/utils'

  const noMenu = ['/login']
  const router = useRouter()
  const state = reactive({
    showMenu: true, // 是否需要显示菜单
    currentPath: '/',
  })
  router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!localGet('token')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
    state.showMenu = !noMenu.includes(to.path)
    state.currentPath = to.path
  document.title = pathMap[to.name]
})
</script>
<style scoped>
.common-layout{
  min-height: 100vh;
  background-color: #ffffff
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.el-header{
    padding: 0px !important;
  }
.el-footer{
    padding: 0px !important;
}
.main{
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>


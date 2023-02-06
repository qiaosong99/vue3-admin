<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-05 11:02:23
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-05 17:05:27
 * @FilePath: \newbee-admimn\src\components\HeaderRight.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right">
    <el-popover
    placement="bottom"
    :width="320"
    trigger="click"
    popper-class="popper-user-box"
  >
    <template #reference>
      <div class="author">
        <el-icon><User /></el-icon>
        {{ state.userInfo && state.userInfo.nickName || '' }}
        <el-icon><CaretBottom /></el-icon>
      </div>
    </template>
    <div class="nickname">
      <p>登录名：{{ state.userInfo && state.userInfo.loginUserName || '' }}</p>
      <p>昵称：{{ state.userInfo && state.userInfo.nickName || '' }}</p>
      <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
    </div>
  </el-popover>
</div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/utils/axios'
import { localRemove, pathMap } from '@/utils'
const router = useRouter()
const state = reactive({
  userInfo: null, // 用户信息变量
})
onMounted(() => {
  const pathname = window.location.hash.split('/')[1] || ''
  if (!['login'].includes(pathname)) {
    getUserInfo()
  }
})
// 获取用户信息
const getUserInfo = async () => {
  const userInfo = await axios.get('/adminUser/profile')
  state.userInfo = userInfo
}
const logout = () => {
  axios.delete('/logout').then(() => {
    localRemove('token')
  router.push({path:'/login'})
})
}
</script>

 <style scoped>
  .right > div > .icon{
    font-size: 18px;
    margin-right: 6px;
  }
  .author {
    margin-left: 10px;
    cursor: pointer;
  }
</style>
<style>
  .popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
  }
   .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>

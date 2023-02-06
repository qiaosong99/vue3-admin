<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-01 20:16:17
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-30 10:13:31
 * @FilePath: \newbee-admimn\src\components\Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="header">
    <div class="left">
      <el-icon v-if="state.hasBack" @click="back" class="back"><Back /></el-icon>
      <span style="font-size: 20px">{{ state.name }}</span>
    </div>
    <div class="right">
      <HeaderRightVue/>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import HeaderRightVue from './HeaderRight.vue';
import {pathMap} from '../../utils/index'
const router = useRouter()
const state = reactive({
  name: '大盘数据',
  hasBack: false
})
router.afterEach((to) => {
  // to 能获取到路由相关信息。
  const { id } = to.query
  state.name = pathMap[to.name]
  state.hasBack = ['level2', 'level3','order_detail'].includes(to.name)
})
const back = () => {
    router.back()
}
</script>

<style scoped>
  .header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .header .left .back {
  border: 1px solid #e9e9e9;
  padding: 5px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}
</style>

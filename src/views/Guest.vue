<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-30 10:17:02
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-31 15:11:13
 * @FilePath: \newbee-admimn\src\views\Guest.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary"  @click="handleSolve">
          <el-icon><Unlock /></el-icon>
          解除禁用
        </el-button>
        <el-button type="danger"  @click="handleForbid">
          <el-icon><Lock /></el-icon>
          禁用账户
        </el-button>
      </div>
    </template>
      <Table
      action='/users'
      ref="table"
      >
      <template #column>
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="nickName" label="昵称"/>
        <el-table-column prop="loginName" label="登录名"/>
        <el-table-column label="身份状态">
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.lockedFlag == 0 ? '正常' : '禁用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="是否注销">
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.isDeleted == 0 ? '正常' : '注销' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间"/>
      </template>
      </Table>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
import Table from '../components/Table.vue';
const table=ref(null)
const handleSolve = () => {
  // 可以通过 table 获取到组件内部的 multipleSelection 值
  if (!table.value.state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.put(`/users/0`, {
    ids: table.value.state.multipleSelection.map(item => item.userId)
  }).then(() => {
    ElMessage.success('解除成功')
    // 通过 table 获取组件内部的 getList 方法
    table.value.getList()
  })
}
// 禁用方法
const handleForbid = () => {
  // 可以通过 table 获取到组件内部的 multipleSelection 值
  if (!table.value.state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.put(`/users/1`, {
    ids: table.value.state.multipleSelection.map(item => item.userId)
  }).then(() => {
    ElMessage.success('禁用成功')
    // 通过 table 获取组件内部的 getList 方法
    table.value.getList()
  })
}
</script>

<style scoped>

</style>

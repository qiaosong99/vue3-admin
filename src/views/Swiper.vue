<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <Table
    action="/carousels"
    ref="table"
    >
      <template #column>
        <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="200">
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="carouselRank"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.configId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      </template>
    </Table>
  </el-card>
  <DialogAddSwiper ref='addSwiper' :reload="getCarousels" :type="state.type" />
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import axios from '@/utils/axios'
import DialogAddSwiper from '../components/Home/DialogAddSwiper.vue'
import Table from '../components/Table.vue'

const addSwiper = ref()
const table=ref(null)
const state = reactive({
  type: 'add', // 操作类型,
})
// 添加轮播项
const handleAdd = () => {
  console.log('addSwiper', addSwiper.value)
  state.type = 'add'
  addSwiper.value.open()
}
// 修改轮播图
const handleEdit = (id) => {
  state.type = 'edit'
  addSwiper.value.open(id)
}
// 选中之后的change方法，一旦选项有变化，就会触发该方法。
  const handleSelectionChange = (val) => {
    table.value.state.multipleSelection = val
  }
// 批量删除
const handleDelete = () => {
  if (! table.value.state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.delete('/carousels', {
    data: {
      ids:  table.value.state.multipleSelection.map(i => i.carouselId)
    }
  }).then(() => {
    ElMessage.success('删除成功')
    table.value.getList()
  })
}
const changePage = (val) => {
  table.value.state.currentPage = val
  table.value.getList()
}
const handleDeleteOne = (id) => {
  axios.post('/carousels/delete', {
    ids: [id]
  }).then(() => {
    ElMessage.success('删除成功')
    table.value.getList()
  })
}

</script>

<style>

</style>

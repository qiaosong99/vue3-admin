<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-19 16:05:55
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-26 16:01:39
 * @FilePath: \newbee-admimn\src\views\category.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card class="category-container">
    <template #header>
      <div class="header">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          增加
        </el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger">
              <el-icon><Delete /></el-icon>
              批量删除
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
    ref="multipleTableRef"
    :load="state.loading"
    :data="state.tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="categoryName" label="分类名称"/>
    <el-table-column prop="categoryRank" label="排序值" width="120"/>
    <el-table-column prop="createTime" label="添加时间" width="200"/>
    <el-table-column label="操作" width="220">
      <template #default="scope">
        <a
        style="cursor: pointer; margin-right: 10px"
        @click="handleEdit(scope.row.categoryId)"
        >修改
        </a>
        <a
        style="cursor: pointer; margin-right: 10px"
        @click="handleNext(scope.row)"
        >
        下级分类
        </a>
        <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.categoryId)"
          >
          <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      class="pagination"
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
    <DialogAddCategory ref='addCate' :reload="getCategory" :type="state.type" />
  </el-card>
</template>

<script setup>
import DialogAddCategory from '../components/module/DialogAddCategory.vue';
import { onMounted, reactive, ref, toRefs, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
const multipleTableRef = ref()
const addCate = ref(null)
const router = useRouter() // 声明路由实例
const route = useRoute() // 获取路由参数
const state=reactive({
  loading: false,
  tableDate:[],//表数据
  total:0,//总条数
  pageSize:10,//分叶大小
  currentPage:1,//当前页
  type: 'add', // 操作类型
  level: 1,
  parent_id: 0,
  multipleSelection: [], // 选中项
})
onMounted(() => {
  getCategory()
})
const getCategory=()=>{
  const { level = 1, parent_id = 0 } = route.query
  state.loading = true
  axios.get('/categories', {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize,
      categoryLevel: level,
      parentId: parent_id
    }
  }).then(res => {
    state.tableData = res.list
    state.total = res.totalCount
    state.currentPage = res.currPage
    state.loading = false
    state.level = level
    state.parentId = parent_id
  })
}
const unwatch = router.afterEach((to) => {
  // 每次路由变化的时候，都会触发监听时间，重新获取列表数据
  if (['category', 'level2', 'level3'].includes(to.name)) {
    getCategory()
  }
})
onUnmounted(() => {
  unwatch()
})
const handleNext = (item) => {
  const levelNumber = item.categoryLevel + 1
  if (levelNumber == 4) {
    ElMessage.error('没有下一级')
    return
  }
  router.push({
    name: `level${levelNumber}`,
    query: {
      level: levelNumber,
      parent_id: item.categoryId
    }
  })
}
// 添加分类
const handleAdd = () => {
  state.type = 'add' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open()
}
// 修改分类
const handleEdit = (id) => {
  console.log('修改分类',id)
  state.type = 'edit' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open(id)
}
// 选择项
const handleSelectionChange = (val) => {
  // 多选 checkbox
  state.multipleSelection = val
}
// 批量删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.delete('/categories', {
    data: {
      ids: state.multipleSelection.map(i => i.categoryId)
    }
  }).then(() => {
    ElMessage.success('删除成功')
    getCategory()
  })
}
// 单个删除
const handleDeleteOne = (id) => {
  axios.delete('/categories', {
    data: {
      ids: [id]
    }
  }).then(() => {
    ElMessage.success('删除成功')
    getCategory()
  })
}
const changePage = (val) => {
  state.currentPage = val
  getCategory()
}
</script>

<style scoped>
.pagination{
  justify-content: center;
}
</style>

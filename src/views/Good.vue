<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-26 19:13:31
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-26 21:23:19
 * @FilePath: \newbee-admimn\src\views\Good.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
 <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary"  @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加商品
        </el-button>
      </div>
    </template>
  <el-table :data="state.tableData" style="width: 100%" :load="state.loading">
    <el-table-column prop="goodsId" label="商品编号"/>
    <el-table-column prop="goodsName" label="商品名" />
    <el-table-column  prop="goodsIntro" label="商品简介"/>
    <el-table-column  label="商品图片" width="150px">
        <template #default="scope">
          <img style="width: 100px; height: 100px;" :key="scope.row.goodsId" :src="$filters.prefix(scope.row.goodsCoverImg)" alt="商品主图">
        </template>
    </el-table-column>
    <el-table-column  prop="stockNum" label="商品库存"/>
    <el-table-column  prop="sellingPrice" label="商品售价"/>
    <el-table-column  label="上架状态">
      <template #default="scope">
        <span style="color: green;" v-if="scope.row.goodsSellStatus == 0">销售中</span>
        <span style="color: red;" v-else>已下架</span>
      </template>
    </el-table-column>
    <el-table-column  label="操作" width="100" >
      <template #default="scope">
      <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.goodsId)">修改</a>
      <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.goodsSellStatus == 0" @click="handleStatus(scope.row.goodsId, 1)">下架</a>
      <a style="cursor: pointer; margin-right: 10px" v-else  @click="handleStatus(scope.row.goodsId, 0)">上架</a>
      </template>
   </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
      class="pagination"
    />
  </el-card>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import { useRouter } from 'vue-router'
const app = getCurrentInstance()
const { goTop } = app.appContext.config.globalProperties
const router = useRouter()
const state = reactive({
  loading: false, // 列表数据接口返回前的 loadinig
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10 // 分页大小
})
onMounted(() => {
  getGoodList()
})
// 获取轮播图列表
const getGoodList = () => {
  state.loading = true
  axios.get('/goods/list', {
    params: {
      pageNumber: state.currentPage, // 当前页
      pageSize: state.pageSize, // 每页数量
    }
  }).then(res => {
    state.tableData = res.list // 列表数据
    state.total = res.totalCount // 数据总条数
    state.currentPage = res.currPage // 当前页
    state.loading = false // 数据成功返回后，将列表 loading 清除
    goTop && goTop() // 数据获取成功后，回到顶部
  })
}
const handleAdd = () => {
  router.push({path:'/add'})
}
const handleEdit = (id) => {
  router.push({ path: '/add', query: { id } })
}
const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}
const handleStatus = (id, status) => {
  axios.put(`/goods/status/${status}`, {
    ids: id ? [id] : []
  }).then(() => {
    ElMessage.success('修改成功')
    getGoodList()
  })
}

</script>

<style scoped>
.pagination{
  justify-content: center;
}
</style>

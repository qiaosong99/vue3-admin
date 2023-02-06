<template>
    <el-card class="order-container">
      <template #header>
        <div class="header">
          <el-input
          v-model="state.orderNo"
          placeholder="请输入订单号"
          style="width: 200px; margin-right: 10px"
          @change="handleOption"
          clearable
          />
          <el-select @change="handleOption" v-model="state.orderStatus" style="width: 200px; margin-right: 10px">
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          </el-select>
          <el-button type="primary" @click="handleConfig()">
            <el-icon><HomeFilled /></el-icon>
            配货完成
          </el-button>
          <el-button type="primary" @click="handleSend()">
            <el-icon><HomeFilled /></el-icon>
            出库
          </el-button>
          <el-button type="danger"  @click="handleClose()">
            <el-icon><Delete /></el-icon>
            关闭订单
          </el-button>
        </div>
      </template>
      <el-table
      :load="state.loading"
      :data="state.tableData"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="totalPrice" label="订单总价" />
        <el-table-column prop="orderStatus" label="订单状态">
          <template #default="scope">
            <span>{{ $filters.orderMap(scope.row.orderStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="支付方式">
          <template #default="scope">
            <span v-if="scope.row.payType==1">微信支付</span>
            <span v-else-if="scope.row.payType==2">支付宝支付</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-popconfirm
              v-if="scope.row.orderStatus==1"
              title="确定配货完成吗？"
              @confirm="handleConfig(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <a style="cursor: pointer; margin-right: 10px">配货完成</a>
              </template>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.orderStatus==2"
              title="确定出库吗？"
              @confirm="handleSend(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <a style="cursor: pointer; margin-right: 10px">出库</a>
              </template>
            </el-popconfirm>
            <el-popconfirm
              v-if="!(scope.row.orderStatus == 4 || scope.row.orderStatus < 0)"
              title="确定关闭订单吗？"
              @confirm="handleClose(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <a style="cursor: pointer; margin-right: 10px">关闭订单</a>
              </template>
            </el-popconfirm>
            <router-link :to="{ path: '/order_detail', query: { id: scope.row.orderId }}">订单详情</router-link>
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
    />
    </el-card>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import axios from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  orderNo: '', // 订单号
  orderStatus: '', // 订单状态
  options: [{
    value: '',
    label: '全部'
  }, {
    value: 0,
    label: '待支付'
  }, {
    value: 1,
    label: '已支付'
  }, {
    value: 2,
    label: '配货完成'
  }, {
    value: 3,
    label: '出库成功'
  }, {
    value: 4,
    label: '交易成功'
  }, {
    value: -1,
    label: '手动关闭'
  }, {
    value: -2,
    label: '超时关闭'
  }, {
    value: -3,
    label: '商家关闭'
  }]
})
onMounted(() => {
  getOrderList()
})
// 获取列表方法
const getOrderList = () => {
  state.loading = true
  axios.get('/orders', {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize,
      orderNo: state.orderNo,
      orderStatus: state.orderStatus
    }
  }).then(res => {
    state.tableData = res.list
    state.total = res.totalCount
    state.currentPage = res.currPage
    state.loading = false
  })
}
//checkbox 选择项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
const changePage = (val) => {
  state.currentPage = val
  getOrderList()
}
const handleOption = () => {
  state.currentPage = 1
  getOrderList()
}
const handleConfig = (id) => {
  let params
  if (id) {
    params = [id]
  }
  else {
    if (!state.multipleSelection.length) {
      console.log('state.multipleSelection', state.multipleSelection.length)
      ElMessage.error('请选择项')
      return
    }
    params = state.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/checkDone', {
    ids: params
  }).then(() => {
    ElMessage.success('配货成功')
    getOrderList()
  })
}
const handleSend = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = state.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/checkOut', {
    ids: params
  }).then(() => {
    ElMessage.success('出库成功')
    getOrderList()
  })
}
const handleClose = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = state.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/close', {
    ids: params
  }).then(() => {
    ElMessage.success('关闭成功')
    getOrderList()
  })
}
</script>

<style scoped>

</style>

<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-25 19:14:57
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-26 16:27:42
 * @FilePath: \newbee-admimn\src\components\module\DialogAddCategory.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
 <el-dialog
    :title="props.type == 'add'?'添加分类':'修改分类'"
    v-model="state.visible"
    width="400px"
  >
  <el-form
    label-width="100px"
    :model="state.ruleForm"
    :rules="state.rules"
    ref="formRef"
    class="good-form"
  >
    <el-form-item label="分类名称" prop="name">
      <el-input type="text" v-model="state.ruleForm.name" />
    </el-form-item>
    <el-form-item label="排序值" prop="number">
      <el-input type="number" v-model="state.ruleForm.rank" />
    </el-form-item>
  </el-form>
  <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from '@/utils/axios'
import { useRoute } from 'vue-router'
const props = defineProps({
  type: String, // 用于判断是添加还是编辑
  reload: Function // 添加或修改完后，刷新列表页
})
const route = useRoute()
const state = reactive({
  categoryLevel: 1,
  parentId: 0,
  visible: false,
  ruleForm: {
    name: '',
    rank:''
  },
  rules: {
    name: [
      { required: 'true', message: '名称不能为空', trigger: ['change'] }
    ],
    rank: [
      { required: 'true', message: '编号不能为空', trigger: ['change'] }
    ]
  },
  id: ''
})
const formRef = ref()
const getDetail = (id) => {
  axios.get(`/categories/${id}`).then(res => {
    state.ruleForm = {
      name: res.categoryName,
      rank: res.categoryRank
    }
    state.parentId = res.parentId
    state.categoryLevel = res.categoryLevel
  })
}
const open = (id) => {
  state.visible = true
  if (id) {
    state.id = id
    console.log('id', id)
    // 如果是有 id 传入，证明是修改模式
    getDetail(id)
  }
  else {
    // 否则为新增模式
    // 新增类目，从路由获取分类 level 级别和父分类 id
    const { level = 1, parent_id = 0 } = route.query
    state.ruleForm = {
      name: '',
      rank: ''
    }
    state.parentId = parent_id
    state.categoryLevel = level
  }
}
const close = () => {
  state.visible = false
}
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.type == 'add') {
        axios.post('/categories', {
          categoryLevel: state.categoryLevel, // 分类等级
          parentId: state.parentId, // 当前分类的父分类 id
          categoryName: state.ruleForm.name, // 分类名称
          categoryRank: state.ruleForm.rank // 分类权重
        }).then(()=>{
          ElMessage.success('添加成功')
          state.visible = false
          // 接口回调之后，运行重新获取列表方法 reload
          if (props.reload) props.reload()
        })
      }
      else {
        axios.put('/categories', {
          categoryId: state.id,
          categoryLevel: state.categoryLevel,
          parentId: state.categoryLevel,
          categoryName: state.ruleForm.name,
          categoryRank: state.ruleForm.rank
        }).then(() => {
          ElMessage.success('修改成功')
          state.visible = false
          // 接口回调之后，运行重新获取列表方法 reload
          if (props.reload) props.reload()
        })
      }
    }
  })
}
defineExpose({ open, close })
</script>

<style scoped>

</style>

<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-03 20:34:31
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-04 20:19:44
 * @FilePath: \newbee-admimn\src\components\form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
 <el-form
    class="login-form"
    label-position="top"
    :rules="rules"
    ref="formRef"
    :model="account"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input  v-model="account.password" show-password/>
    </el-form-item>
    <el-form-item>
      <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
      <el-button style="width: 100%" type="primary" @click="submitForm" >立即登录</el-button>
      <el-checkbox v-model="account.checked" @change="!account.checked" >下次自动登录</el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { rules } from '../config/rules';
import axios from '@/utils/axios'
import { reactive, ref, toRefs } from 'vue'
import { localSet } from '@/utils'
import md5 from 'js-md5'
const formRef = ref()
const account = reactive({
      username: '',
      password: '',
      checked: true
})
const submitForm = async () =>{
  formRef.value.validate((valid) => {
    if (valid) {
      axios.post('/adminUser/login', {
        userName: account.username || '',
        passwordMd5:md5(account.password)
      }).then(res => {
        localSet('token', res)
        window.location.href='/'
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const resetForm = () => {
  formRef.value.resetFields();
}

</script>

<style scoped>
.login-form{
  width: 70%;
  margin: 0 auto;
  width: 294px;
  height: 307px;
}
  .login-form >>> .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form >>> .el-form-item {
    margin-bottom: 0;
  }
  .login-form .el-form-item {
    margin-bottom: 12px;
}
</style>

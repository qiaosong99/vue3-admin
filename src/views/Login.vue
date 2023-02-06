<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-03 10:33:13
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-03 20:59:57
 * @FilePath: \newbee-admimn\src\views\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
      <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
      <div class="name">
        <div class="title">新蜂商城</div>
        <div class="tips">Vue3.0 后台管理系统</div>
      </div>
    </div>
    <LoginFormVue/>
    </div>
  </div>
</template>

<script setup>
import LoginFormVue from '../components/LoginForm.vue';
</script>

<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .login-container{
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 420px;
    height: 100px;
    padding: 40px 0 20px 0;
  }
  .logo{
    height: 100px;
    width: 100px;
    margin-right: 20px;
  }
  .title{
    font-size: 28px;
    color: #1baeae;
    font-weight: 700;
  }
  .tips{
    font-size: 12px;
    color: #999;
  }
</style>

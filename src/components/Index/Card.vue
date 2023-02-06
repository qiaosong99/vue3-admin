<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-05 20:08:08
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-05 20:38:29
 * @FilePath: \newbee-admimn\src\components\Index\Card.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="card">
  <el-card class="card-item" >
    <template #header>
      <div class="card-header">
        <span>今日订单数</span>
      </div>
    </template>
    <div class="item">1888</div>
  </el-card>
  <el-card class="card-item">
    <template #header>
      <div class="card-header">
        <span>今日日活</span>
      </div>
    </template>
    <div class="item">36271</div>
  </el-card>
  <el-card class="card-item">
    <template #header>
      <div class="card-header">
        <span>转化率</span>
      </div>
    </template>
    <div class="item">20%</div>
  </el-card>
</div>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card{
  display: flex;
    margin-bottom: 50px;
}
.card-item{
  flex: 1;
  margin-right: 20px;
}
</style>

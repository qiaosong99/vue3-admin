<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-01 10:24:31
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-31 15:36:57
 * @FilePath: \newbee-admimn\src\components\Aside.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 头部 -->
  <el-scrollbar>
  <div class="head">
    <div>
      <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo" class="img">
      <span>后台管理系统</span>
    </div>
  </div>
  <!-- 为了美观的线 -->
  <div class="line" />
  <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        background-color="#222832"
        text-color="#fff"
        :router="true"
        :default-openeds="state.defaultOpen"
        :default-active='props.currentPath'
      >
        <el-sub-menu index="1">
          <template #title>
            <span>Dashboard</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/">
              <el-icon><Reading /></el-icon>
              Dashboard
            </el-menu-item>
            <el-menu-item index="/add">
              <el-icon><Plus /></el-icon>
              添加商品
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <span>首页配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/swiper">
              <el-icon><Picture /></el-icon>
             轮播图配置
            </el-menu-item>
            <el-menu-item index="/hot">
              <el-icon><Star /></el-icon>
              热销商品配置
            </el-menu-item>
            <el-menu-item index="/new">
              <el-icon><Top /></el-icon>
              新品上线配置
            </el-menu-item>
            <el-menu-item index="/recommend">
              <el-icon><Pointer /></el-icon>
              为你推荐配置
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <span>模块管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/category">
              <el-icon><Grid /></el-icon>
              分类管理
            </el-menu-item>
            <el-menu-item index="/good">
              <el-icon><Goods /></el-icon>
              商品管理
            </el-menu-item>
            <el-menu-item index="/order">
              <el-icon><Document /></el-icon>
              订单管理
            </el-menu-item>
            <el-menu-item index="/guest">
              <el-icon><User /></el-icon>
              会员管理
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/account">
              <el-icon><Lock /></el-icon>
              修改账户
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
const state = {
  defaultOpen: ['1', '2','3','4'],
}
const props = defineProps(['currentPath'])

</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}
.img{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}
.el-menu{
  border: 0px;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-01 20:43:13
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-01 20:58:56
 * @FilePath: \newbee-admimn\src\components\footer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="footer">
    <div class="left">
      后台管理系统 © 2022-2023
    </div>
    <div class="right">
      vue3-admin
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-top: 1px solid #e9e9e9;
    padding: 0 20px
  }
</style>

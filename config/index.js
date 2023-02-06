/*
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2022-12-31 10:39:57
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2022-12-31 10:40:00
 * @FilePath: \newbee-admimn\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// config/index.js
export default {
  development: {
    baseUrl: '/api' // 开发代理地址
  },
  beta: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 测试接口域名
  },
  release: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 正式接口域名
  }
}

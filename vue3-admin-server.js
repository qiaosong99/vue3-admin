/*
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-02-05 16:57:49
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-02-05 16:57:59
 * @FilePath: \newbee-admimn\vue3-admin-server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const server = require('pushstate-server')

server.start({
  port: 5018,
  directory: './dist'
})

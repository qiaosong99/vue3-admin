/*
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-04 10:37:57
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-19 11:50:51
 * @FilePath: \newbee-admimn\src\config\rules.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      tigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '请输入5-10个字母或数字',
      tigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      tigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '请输入6个字母或数字',
      tigger: 'blur'
    }
  ],
}

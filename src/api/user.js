import request from '@/utils/request'
/**
 * 登录接口封装
 */
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data // post写在请求参数data里，params是路径参数
  })
}
/**
 * 获取用户资料接口
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * 根据用户id获取用户的详情
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}` // 默认是get
  })
}
export function logout() {

}

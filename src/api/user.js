import request from '@/utils/request'

export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data // post写在请求参数data里，params是路径参数
  })
}

export function getInfo(token) {

}

export function logout() {

}

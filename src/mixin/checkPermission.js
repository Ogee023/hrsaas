import store from '@/store'
// 做一个混入对象
export default {
  // 混入对象是组件的选项对象
  methods: {
    // 检查权限 要么有 要么没用 key就是要检查的点
    checkPermission(key) {
      // 去用户的信息里面找points中有没有key 如果有key，则认为有权限 反之
      // store.state.user.userInfo.roles.points
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false // 如果没用进入 说明没权限
    }
  }
}

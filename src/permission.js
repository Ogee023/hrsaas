// 权限拦截在路由跳转 导航守卫

import router from '@/router'
import store from '@/store' // 引入store实例和组件中的this.$store是一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
// 不需要导出 因为执行让代码执行即可
// 前置守卫
// next是前置守卫必须必须执行的钩子，若不执行，页面直接死
// next()放过
// next(false)跳转终止
// next(地址)跳转到某地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条

  if (store.getters.token) {
    // 只有有token的情况下才获取资料
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 去主页
    } else {
      // 只有放行的情况下才获取资料
      // 如果当前vuex有用户资料的id，表示已有不需要获取
      if (!store.getters.userId) {
        // 如果没有id才表示没获取过
        await store.dispatch('user/getUserInfo')
        // 如果说后续 需要根据用户资料获取数据的话 这里必须改成同步
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})

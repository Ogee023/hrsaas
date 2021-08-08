// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  // 一开始肯定拥有静态路由的权限
  routes: constantRoutes // 路由表 标识当前用户所拥有的所有路由的数组
}
const mutations = {
  // 定义修改routes的mutations
  // payload认为是我们登录成功需要添加的新路由
  setRoutes(state, newRoutes) {
    // state.routes = [...state.routes, ...newRoutes] // 这么写业务不正确
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由的基础上去加新路由
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的菜单权限,对应menus: ["settings", "permissions"]
  // asyncRoutes是所有的动态路由
  // asyncRoutes [{path: '/setting', name: 'setting'}]
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出动态路由中和menus中能够对应上的路由
    menus.forEach(key => {
      // key就是标识
      // asyncRoutes找有没有对象中的name属性值等于key。如果找不到就是没权限
      routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组，有可能为空
    })
    // 得到的routes是所有模块中满足权限要求的路由数组，routes就是当前用户所拥有的动态路由的权限
    context.commit('setRoutes', routes) // 将动态路由提交给mutations
    return routes // 这里为什么还要return？state数据是用来显示左侧菜单用的，return是给路由addRoutes用的
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

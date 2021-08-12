// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/departments', // 路由地址
  name: 'departments', // 给模块的一级路由加一个name属性，做权限的时候用到
  component: Layout,
  children: [{
    // 二级路由的path什么都不写的时候 此时它表示二级路由的默认路由
    path: '', // 这里不用写 什么都不写表示 /departments 不但有布局layout  =>  员工主页
    component: () => import('@/views/departments'),
    name: 'departments',
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: {
      title: '组织架构', // 左侧导航读取了这里的title属性
      icon: 'tree'
    }
  }]
}

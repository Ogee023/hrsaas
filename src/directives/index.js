// 负责管理所有自定义的指令

export const imagerror = {
  // 指令对象  会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令中变量的解释  其中有一个属性叫做value
    // dom表示当前指令作用的dom对象
    // dom认为此时就是图片
    dom.src = dom.src || options.value // 初始化的时候 如果有值则赋值 如果没值则需要进行默认值赋值
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会出发图片的一个事件 => onerror
    dom.onerror = function() {
      // 当图片出现异常的时候会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value // 这里不能写死
    }
  },
  // 该函数同inserted一样也是一个钩子函数
  componentUpdated(dom, options) {
    // 该钩子函数会在当前指令作用的组件 更新数据完毕之后执行
    // inserted只会执行一次
    // 组件初始化一旦更新，就会再进入inserted函数会进去componentUpdated
    dom.src = dom.src || options.value
  }
}

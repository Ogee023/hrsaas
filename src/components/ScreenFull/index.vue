<template>
  <!-- 因为要布局，所以变成块元素 -->
  <div>
    <svg-icon icon-class="fullscreen" style="width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    //   改变全屏
    changeScreen() {
      // document.documentElement.requestFullscreen()  原生
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      ScreenFull.toggle()
    }
  }
}
</script>

<style>

</style>

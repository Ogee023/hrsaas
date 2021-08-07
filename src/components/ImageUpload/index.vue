<template>
  <div>
    <!-- 给action一个#就不会报错 -->
    <!-- file-list是上传的文件列表，可以绑定到上传组件上，让组件来显示 -->
    <!-- upload显示file-list内容 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :on-preview="preview"
      :on-remove="handelRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云cos包
// 实例化COS对象
const cos = new COS({
  SecretId: 'AKIDNVO0NULvGJ5ankQpxpQkmY4JHyPZS4QV', // 身份识别ID
  SecretKey: 'pNfX9TWIn2zf4C2dx0mGUQ5TbT4OSFlz' // 身份密钥
})

export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的uid
      percent: 0, // 当前的百分比
      showPercent: false
    }
  },
  computed: {
    // 如果它为true，表示就不应该显示加号上传了
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 点击预览事件
    preview(file) {
      console.log(file.url)
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file是要删除的文件
    // fileList是删过之后的文件
    handelRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      // this.fileList = fileList
    },
    // 不能用push 这个钩子会执行多次
    changeFile(file, fileList) {
      // file是当前的文件 fileList是当前最新的数组this.fileList
      // console.log(file)
      // console.log(fileList)
      // 如果当前fileList没有该文件的话 就往里进行追加
      this.fileList = fileList.map(item => item)
      // 这里为何暂时不成功呢 因为现在还没有上传，所以第二次进来的数据一定是个空的
      // 如果完成上传动作了 第一次进入和第二次进去的fileList的长度应该是1 应该有数据
      // 上传成功 =》 数据才能进来 =》 腾讯云cos
    },
    beforeUpload(file) {
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传终止
      }
      // 检查文件大小 5M 1M=1024*1024B
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        // 超过了限制的文件大小
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      return true // 最后一定要return true
    },
    // 进行上传操作
    upload(params) {
      // console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'ogee023-1306820613', // 存储桶名称
          Region: 'ap-beijing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
          // 上传到腾讯云
        }, (err, data) => {
          // data返回数据后应该如何处理
          // console.log(err || data)
          // data中有一个statusCode === 200 说明成功
          if (!err && data.statusCode === 200) {
            // 此时说明文件上传成功 要获取成功的返回地址
            // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成现在上传成功的地址
            // 目前虽然是一张图片但注意fileList是一个数组
            // 需要知道当前上传成功是哪一张图片
            this.fileList = this.fileList.map(item => {
              // 去找谁的uid等于刚刚记录下来的id
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload为true表示这张图片已经上传完毕 为后期应用的时候做标记
                // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
              }
              return item
            })
            // 关闭进度条，重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)

            // 将上传成功的地址回写到了fileList中 fileList变化 =》 upload组件 就会根据fileList的变化而去渲染视图
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>

<template>
  <div class="infoBox">
    <div class="logo">
      <img v-imagerror="defaultImg" :src="staffPhoto" alt>
    </div>
    <div class="info">
      <p>
        <span class="name">{{ ruleForm.username }}</span>
      </p>
      <p>
        <span>部门：</span>
        {{ ruleForm.departmentName }}
      </p>
      <p>
        <span>入职时间：</span>
        {{ ruleForm.timeOfEntry | formatDate }}
      </p>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
export default {
  name: 'InfoBox',
  props: {
    ruleForm: {
      type: Object,
      default: () => {}
    },
    userId: {
      type: String,
      default: ''
    },
    applyUserId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      staffPhoto: null,
      defaultImg: require('@/assets/common/head.jpg')
    }
  },
  created() {
    this.getUserPhoto()
  },
  methods: {
    async getUserPhoto() {
      const userInfo = await getUserDetailById(this.applyUserId)
      this.staffPhoto = userInfo.staffPhoto
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables";
.infoBox {
  display: flex;
  border-bottom: solid 1px #ccc;
  margin-bottom: 20px;
  padding: 10px 0 20px 0;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .logo {
    border: solid 1px #ccc;
    width: 102px;
    height: 102px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .info {
    p {
      line-height: 30px;
      .name {
        font-size: 16px;
      }
      span {
        font-weight: bold;
        display: inline-block;
        margin-right: 0px;
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="infoBox">
    <div class="logo">
      <img v-imagerror="defaultImg" :src="userInfo.staffPhoto" alt>
    </div>
    <div class="info">
      <p>
        <span class="name">{{ userInfo.username }}</span>
      </p>
      <p>
        <span>部门：</span>
        {{ userInfo.departmentName }}
      </p>
      <p>
        <span>入职时间：</span>
        {{ userInfo.timeOfEntry | formatDate }}
      </p>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
export default {
  name: 'InfoBox',
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultImg: require('@/assets/common/head.jpg'),
      userInfo: {}
    }
  },
  created() {
    this.getUserPhoto()
  },
  updated() {
    this.getUserPhoto()
  },
  methods: {
    async getUserPhoto() {
      this.userInfo = await getUserDetailById(this.userId)
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

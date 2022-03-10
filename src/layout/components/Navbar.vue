<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 放置error -->
      <error-log class="errLog-container right-menu-item hover-effect" />
      <!-- 放置全屏插件 -->
      <screen-full class="right-menu-item" />
      <!-- 放置切换主题组件 -->
      <theme-picker class="right-menu-item" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imagerror="defaultImg" :src="staffPhoto" class="user-avatar">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Ogee023/hrsaas">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-minus feature small" @click="onSmall" />
      <i class="el-icon-plus feature" :class="isMax ? 'big2' : 'big1'" @click="onBig">
        <!-- <img :src="big1" alt> -->
      </i>
      <i class="el-icon-close feature close" @click="onClose" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog
  },
  data() {
    return {
      defaultImg: require('@/assets/common/head.jpg'), // 防止打包后路径不对
      isMax: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'staffPhoto'
    ])
  },
  mounted() {
    window.electron.listenMaximize((e, isMax1) => {
      this.isMax = isMax1
    })

    window.electron.listenMinimize((e, isMax1) => {
      this.isMax = isMax1
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout') // 写不写await登出方法都是同步的
      await this.$store.dispatch('tagsView/delAllViews') // 写不写await登出方法都是同步的
      window.electron.logined(false)
      this.$router.push(`/login`) // 直接跳登录
    },
    onSmall() {
      window.electron.windowMinimize()
    },
    onClose() {
      window.electron.windowClose()
    },
    onBig() {
      if (this.isMax) {
        window.electron.windowUnMaximize()
      } else {
        window.electron.windowMaximize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  -webkit-app-region: drag;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    -webkit-app-region: no-drag;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    -webkit-app-region: no-drag;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
    -webkit-app-region: no-drag;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    -webkit-app-region: no-drag;

    &:focus {
      outline: none;
    }

   .name {
      color: #000;
      vertical-align: middle;
      margin-left:5px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .user-dropdown {
          color: #fff;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }

    .feature {
      font-size: 20px;
      text-align: center;
      width: 45px;
      line-height: 50px;
    }

    .small {
      &:hover {
        background: #e5e5e5;
      }
    }

    .big1 {
      color: transparent;
      background: url('~@/assets/common/big1.svg');
      &:hover {
        background: #e5e5e5 url('~@/assets/common/big1.svg');
      }
    }

    .big2 {
      color: transparent;
      background: url('~@/assets/common/big2.svg');
      &:hover {
        background: #e5e5e5 url('~@/assets/common/big2.svg');
      }
    }

    .close {
      &:hover {
        background: #e81123;
      }
    }
  }
}
</style>

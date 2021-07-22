<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置 一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 传入内容 插槽内容会循环多次 有多少节点循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @addDepts="addDepts"
            @editDepts="editDepts"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './component/tree-tools.vue'
import AddDept from './component/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        children: 'children', // 从这个属性找子节点
        label: 'name' // 表示从这个属性显示内容
      },
      showDialog: false, // 默认不显示
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' } // 如果不加，最外层的添加找不到id触发不了校验规则
      // 需要将其转化成树形结构
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
    },
    // 监听tree-tools中触发的点击添加子部门的事件,node是我们当前点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
      // 应该在这里调用获取部门详情的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

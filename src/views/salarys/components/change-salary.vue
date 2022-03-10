<template>
  <div class="changeSalary">
    <info-box :rule-form="user" :apply-user-id="userId" />
    <div>
      <el-form :model="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="调整基本工资">
          <el-input v-model="userSalary.currentBasicSalary" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentBasicSalary"
            style="width: 220px;"
            placeholder="请输入调整后基本工资"
            type="number"
          />
        </el-form-item>
        <el-form-item label="调整岗位工资">
          <el-input v-model="userSalary.currentPostWage" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentPostWage"
            style="width: 220px;"
            placeholder="请输入调整后岗位工资"
            type="number"
          />
        </el-form-item>
        <el-form-item label="工资合计">
          <el-input v-model="computeCurrentTotal" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input v-model="computeChangeTotal" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="调整幅度">
          <el-input v-model="computeChangeSize" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px;">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onClose">关闭</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { changeSalary } from '@/api/salarys'
import infoBox from '@/views/users/components/info-box.vue'

export default {
  name: 'UsersTableIndex',
  components: { infoBox },
  props: {
    userSalary: {
      type: Object,
      default: () => {}
    },
    userId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      user: {},
      ruleForm: {
      }
    }
  },
  computed: {
    computeCurrentTotal() {
      let base = 0
      if (this.userSalary.currentBasicSalary != null) {
        base = Number(this.userSalary.currentBasicSalary)
      }
      let post = 0
      if (this.userSalary.currentPostWage != null) {
        post = Number(this.userSalary.currentPostWage)
      }
      return base + post
    },
    computeChangeTotal() {
      let base = 0
      if (this.ruleForm.currentBasicSalary != null) {
        base = Number(this.ruleForm.currentBasicSalary)
      }
      let post = 0
      if (this.ruleForm.currentPostWage != null) {
        post = Number(this.ruleForm.currentPostWage)
      }
      return base + post
    },
    computeChangeSize() {
      return this.computeChangeTotal - this.computeCurrentTotal
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async  onSubmit() {
      const sendData = this.ruleForm
      sendData.userId = this.userId
      await changeSalary(sendData)
      this.$message({ message: '保存成功', type: 'success' })
      this.$emit('success')
      this.onClose()
    },
    onClose() {
      this.ruleForm = {}
      this.$emit('onDialogCancel')
    },
    async getUserDetailById() {
      this.user = await getUserDetailById(this.userId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
  .changeSalary{
    .Label{
      margin: 0 20px;
      color:#999;
    }
  }
</style>

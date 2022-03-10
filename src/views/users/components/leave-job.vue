<template>
  <div v-if="ruleForm.data" class="AdjustThePost">
    <info-box :user-id="applyUserId" />
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="请假类型：" prop="holidayType">
          <el-input v-model="ruleForm.data.holidayType" style="width: 80%;" :disabled="true" />
        </el-form-item>

        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker
            v-model="ruleForm.data.startTime"
            type="datetime"
            placeholder="选择日期"
            disabled
            style="width: 80%;"
          />
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker
            v-model="ruleForm.data.endTime"
            type="datetime"
            placeholder="选择日期"
            disabled
            style="width: 80%;"
          />
        </el-form-item>
        <el-form-item label="请假时长：" prop="duration">
          <el-input v-model="ruleForm.data.duration" style="width: 80%;" :disabled="true" />
        </el-form-item>
        <el-form-item label="申请原因：" prop="cause">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 80%;"
            placeholder="显示请假人填写的请假原因"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getApprovalsDetail
} from '@/api/approvals'
import infoBox from './info-box.vue'
export default {
  name: 'LeaveJob',
  components: { infoBox },
  props: {
    selectedId: {
      type: String,
      default: ''
    },
    tabLab: {
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
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
      const type = this.ruleForm.data.holidayType
      this.ruleForm.data.holidayType = type === 1 ? '请假' : '调休'
    },
    updateData() {
      this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div v-if="ruleForm.data" class="AdjustThePost">
    <info-box :user-id="applyUserId" />
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="补偿方式" prop="types">
          调休
        </el-form-item>
        <el-form-item label="加班开始时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.start_time"
            format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            disabled
            style="width: 80%;"
          />
        </el-form-item>
        <el-form-item label="加班结束时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.end_time"
            type="date"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            disabled
            style="width: 80%;"
          />
        </el-form-item>
        <el-form-item label="申请原因" prop="evaluate">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 80%;"
            placeholder="显示加班人填写的加班原因"
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
  name: 'Overtime',
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
      id: '',
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {},
      rules: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // debugger
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
    },
    updateData() {
      this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

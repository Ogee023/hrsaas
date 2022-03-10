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

        <el-form-item label="期望离职时间：" prop="expectedDepartureTime">
          <el-date-picker
            v-model="ruleForm.data.exceptTime"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            disabled
            style="width: 80%;"
          />
        </el-form-item>
        <el-form-item label="离职原因：" prop="reasonsForLeaving">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 80%;"
            placeholder="显示提交人填写的离职原因"
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
  name: 'Quit',
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
      console.log(data)
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

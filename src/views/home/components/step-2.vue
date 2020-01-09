<template>
  <div class="step-2-wrap">
    <el-form class="step-2" ref="form" :model="teamInfo" :rules="rules" label-width="80px">
      <el-form-item label="队伍名称">
        <el-input v-model="teamInfo.teamName" />
      </el-form-item>
      <el-form-item label="领队姓名">
        <el-input v-model="teamInfo.leaderName" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="teamInfo.tel" />
      </el-form-item>
      <el-form-item label="教练姓名">
        <el-input v-model="teamInfo.coachName" />
      </el-form-item>
    </el-form>
    <div class="step-btn-group">
      <el-button type="primary">上一步</el-button>
      <el-button type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  components: {

  },
  props: {

  },
  data () {
    return {
      teamInfo: {
        teamName: '', // 队伍名称
        leaderName: '', // 领队姓名
        tel: '', // 联系电话
        coachName: '' // 教练姓名
      },
      rules: {
        teamName: [
          { required: true, message: '请输入队伍名称', trigger: 'blur' }
        ],
        leaderName: [
          { required: true, message: '请输入领队姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        coachName: [
          { required: true, message: '请输入教练姓名', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.step-2 {
  width: 100%;
  max-width: 550px;
  margin: 20px auto 0;
}
</style>

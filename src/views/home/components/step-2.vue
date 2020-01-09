<template>
  <el-form class="step-2" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="队伍名称">
      <el-input v-model="form.team_name" />
    </el-form-item>
    <el-form-item label="领队姓名">
      <el-input v-model="form.leader_name" />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="教练姓名">
      <el-input v-model="form.coach_name" />
    </el-form-item>
  </el-form>
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
      form: {
        team_name: '', // 队伍名称
        leader_name: '', // 领队姓名
        tel: '', // 联系电话
        coach_name: '' // 教练姓名
      },
      rules: {
        team_name: [
          { required: true, message: '请输入队伍名称', trigger: 'blur' }
        ],
        leader_name: [
          { required: true, message: '请输入领队姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        coach_name: [
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

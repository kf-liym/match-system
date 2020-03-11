<template>
  <div class="step-2-wrap" v-loading="loading">
    <el-form class="step-2" ref="form" :model="team" :rules="rules" label-width="80px">
      <el-form-item label="队伍名称">
        <el-input v-model="team.teamName" />
      </el-form-item>
      <el-form-item label="领队姓名">
        <el-input v-model="team.leaderName" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="team.tel" />
      </el-form-item>
      <el-form-item label="教练姓名">
        <el-input v-model="team.coachName" />
      </el-form-item>
    </el-form>
    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { saveTeam, getTeam } from '@/api'
export default {
  name: 'Step2',
  components: {

  },
  props: {

  },
  data () {
    return {
      loading: true,
      team: {
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
    this.getTeam()
  },
  mounted () { },
  methods: {
    getTeam () {
      this.loading = true
      getTeam().then(res => {
        if (res.data.team) {
          this.$store.commit('SET_STATUS', res.data.status)
          this.team = res.data.team
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    prevStep () {
      saveTeam(this.team).then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch('STEP_PREV', { router: this.$router, route: this.$route })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    nextStep () {
      saveTeam(this.team).then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch('STEP_NEXT', { router: this.$router, route: this.$route })
        }
      }).catch(err => {
        console.log(err)
      })
    }
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

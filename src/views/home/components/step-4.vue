<template>
  <div class="step-4">
    <ul></ul>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="姓名" width="180"></el-table-column>
      <el-table-column prop="date" label="证件号码" width="180"></el-table-column>
      <el-table-column prop="name" label="出生日期" width="180"></el-table-column>
      <el-table-column prop="address" label="性别"></el-table-column>
      <el-table-column prop="address" label="组别"></el-table-column>
      <el-table-column prop="address" label="项目名称"></el-table-column>
      <el-table-column prop="address" label="费用"></el-table-column>
    </el-table>
    <div class="step-btn-group">
      <el-button type="primary">上一步</el-button>
      <el-button type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step4',
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
</style>

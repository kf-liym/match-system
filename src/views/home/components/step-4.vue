<template>
  <div class="step-4">
    <ul class="report-team-info">
      <li>队伍名称：{{values.teamInfo.teamName}}</li>
      <li>领队：{{values.teamInfo.leaderName}}</li>
      <li>联系电话：{{values.teamInfo.tel}}</li>
      <li>教练：{{values.teamInfo.coachName}}</li>
    </ul>

    <div class="report-item">
      <div class="report-item__header">个人项目</div>
      <el-table class="report-item__body" :data="values.personalProject" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{personalCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">对练项目</div>
      <el-table class="report-item__body" :data="values.duelExercises" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{duelCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">集体项目</div>
      <el-table class="report-item__body" :data="values.collectiveProject" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{collectiveCost}} 元</div>
    </div>
    <div class="report-item">
      <el-table class="report-item__body" :data="aggregateCost" border fit style="width: 100%;">
        <el-table-column prop="item" label="项目" width="100"></el-table-column>
        <el-table-column prop="personal" label="个人项目" min-width="100"></el-table-column>
        <el-table-column prop="duel" label="对练项目" min-width="100"></el-table-column>
        <el-table-column prop="collective" label="集体项目" min-width="100"></el-table-column>
        <el-table-column prop="cost" label="合计" width="150"></el-table-column>
      </el-table>
    </div>

    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step4',
  components: {

  },
  props: {
    value: {}

  },
  data () {
    return {
    }
  },
  computed: {
    values: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    personalCost () {
      let cost = 0
      this.values.personalProject.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    duelCost () {
      let cost = 0
      this.values.duelExercises.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    collectiveCost () {
      let cost = 0
      this.values.collectiveProject.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    // 汇总费用
    aggregateCost () {
      return [
        {
          item: '费用',
          personal: this.personalCost,
          duel: this.duelCost,
          collective: this.collectiveCost,
          cost: this.personalCost + this.duelCost + this.collectiveCost
        }
      ]
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    prevStep () {
      this.$emit('stepChange', 2)
    },
    nextStep () {
      this.$emit('stepChange', 4)
    }
  }
}
</script>

<style scoped lang="scss">
.step-4 {
  padding: 0px 0 30px;
}
</style>

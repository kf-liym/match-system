<template>
  <div class="step-6">
    <div class="unsubmitted" v-if="values.status === '未提交'">
      <el-button style="width: 200px;" type="primary" @click="handleConfirm">提交</el-button>
    </div>
    <div class="pending" v-else-if="values.status === '已提交' || values.status === '未审核'">
      <div class="title">
        <i class="pending-success el-icon-success"></i>提交成功
      </div>
      <div class="info">管理员审核中，请耐心等待。</div>
    </div>
    <div class="pass" v-else-if="values.status === '已审核'">
      <div class="title">你已经通过审核</div>

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
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
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
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
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
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step6',
  components: {

  },
  props: {
    value: {
      type: Object
    }
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

    // 个人项目费用汇总
    personalCost () {
      let cost = 0
      this.values.personalProject.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    // 对练项目费用汇总
    duelCost () {
      let cost = 0
      this.values.duelExercises.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    // 集体项目费用汇总
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
    handleConfirm () {
      this.$set(this.values, 'status', '已提交')
    }
  }
}
</script>

<style scoped lang="scss">
.unsubmitted {
  text-align: center;
  padding: 60px 0 0;
}
.pending {
  text-align: center;
  margin-top: 50px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    line-height: 1;
  }
  .info {
    color: #969696;
    margin-top: 10px;
  }
  .pending-success {
    color: green;
    font-size: 46px;
    margin-right: 10px;
  }
}

.pass {
  padding: 20px 0 30px;
  .title {
    color: green;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>

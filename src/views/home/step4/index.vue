<template>
  <div class="step-4">
    <ul class="report-team-info">
      <li>队伍名称：{{$store.state.project.team.teamName}}</li>
      <li>领队：{{$store.state.project.team.leaderName}}</li>
      <li>联系电话：{{$store.state.project.team.tel}}</li>
      <li>教练：{{$store.state.project.team.coachName}}</li>
    </ul>

    <div class="report-item">
      <div class="report-item__header">个人项目</div>
      <el-table class="report-item__body" :data="person" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column label="项目名称" min-width="280">
          <template slot-scope="scope">
            {{scope.row.item}}
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{personalCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">对练项目</div>
      <el-table class="report-item__body" :data="duel" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
          <template slot-scope="scope">
            {{scope.row.duelType}}
          </template>
        </el-table-column>
        <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="280">
           <template slot-scope="scope">
            {{scope.row.duelType ? scope.row.duelType : ''}}
            {{scope.row.duelName ? '-'+scope.row.duelName : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{duelCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">集体项目</div>
      <el-table class="report-item__body" :data="collective" border fit style="width: 100%;">
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

    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { peojectList } from '@/api'
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
    person () {
      let arr = []
      this.$store.state.project.person.forEach(item => {
        if (item.project.boxing && item.project.boxing.label) {
          arr.push({
            ...item,
            item: `${item.project.boxing.label}${item.project.boxingRoutine ? '-' : ''}${item.project.boxingRoutine}`,
            cost: 50
          })
        }
        if (item.project.instrument && item.project.instrument.label) {
          arr.push({
            ...item,
            item: `${item.project.instrument.label}${item.project.instrumentRoutine ? '-' : ''}${item.project.instrumentRoutine}`,
            cost: 50
          })
        }
      })
      return arr
    },
    duel () {
      return this.$store.state.project.duel
      // let arr = []
      // this.$store.state.project.duel.forEach((item, index) => {
      //   if (item.project.boxing && item.project.boxing.label) {
      //     arr.push({
      //       ...item,
      //       item: `${item.project.boxing.label}${item.project.boxingRoutine ? '-' : ''}${item.project.boxingRoutine}`,
      //       cost: 50
      //     })
      //   }
      //   if (item.project.instrument && item.project.instrument.label) {
      //     arr.push({
      //       ...item,
      //       item: `${item.project.instrument.label}${item.project.instrumentRoutine ? '-' : ''}${item.project.instrumentRoutine}`,
      //       cost: 50
      //     })
      //   }
      // })
      // return arr
    },
    collective () {
      return this.$store.state.project.collective
    },
    personalCost () {
      let cost = 0
      this.person.forEach(element => {
        cost += 50
      })
      return cost
    },
    duelCost () {
      let cost = 0
      this.duel.forEach(element => {
        cost += 50
      })
      return cost
    },
    collectiveCost () {
      let cost = 0
      this.collective.forEach(element => {
        cost += 50
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
    peojectList().then(res => {
      this.$store.commit('SET_PERSON', this.res.data.person)
      this.$store.commit('SET_DULE', this.res.data.duel)
      this.$store.commit('SET_COLLECTIVE', this.res.data.collective)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {

  },
  methods: {
    prevStep () {
      this.$router.push('/home/step3')
    },
    nextStep () {
      this.$router.push('/home/step5')
    }
  }
}
</script>

<style scoped lang="scss">
.step-4 {
  padding: 0px 0 30px;
}
</style>

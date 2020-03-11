<template>
  <div class="step-4">
    <ul class="report-team-info">
      <li>队伍名称：{{team.teamName}}</li>
      <li>领队：{{team.leaderName}}</li>
      <li>联系电话：{{team.tel}}</li>
      <li>教练：{{team.coachName}}</li>
    </ul>

    <div class="report-item">
      <div class="report-item__header">个人项目</div>
      <el-table class="report-item__body" :data="person" max-height="400px" border fit style="width: 100%;">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="115"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{personalCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">对练项目</div>
      <el-table class="report-item__body" :data="duel" max-height="400px" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="80"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
        <el-table-column prop="cost" label="费用"></el-table-column>
      </el-table>
      <div class="cost-box">合计：{{duelCost}} 元</div>
    </div>

    <div class="report-item">
      <div class="report-item__header">集体项目</div>
      <el-table class="report-item__body" :data="collective" max-height="400px" border fit style="width: 100%;">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="group" label="组别" width="110"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
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
import { getAll } from '@/api'
export default {
  name: 'Step4',
  components: {

  },
  props: {

  },
  data () {
    return {
      team: {},
      personT: [],
      duelT: [],
      collectiveT: []
    }
  },
  computed: {
    person () {
      let arr = []
      this.personT.forEach(item => {
        if (item.boxing) {
          arr.push({
            ...item,
            itemName: `${item.boxing}${item.boxingRoutine ? '-' : ''}${item.boxingRoutine}`,
            cost: 50
          })
        }
        if (item.instrument) {
          arr.push({
            ...item,
            itemName: `${item.instrument}${item.instrumentRoutine ? '-' : ''}${item.instrumentRoutine}`,
            cost: 50
          })
        }
      })
      return arr
    },
    duel () {
      // return this.$store.state.project.duel
      let arr = []
      this.duelT.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemRoutine: item.itemRoutine,
            itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
            cost: 50
          })
        })
      })
      return arr
    },
    collective () {
      // return this.$store.state.project.collective
      let arr = []
      this.collectiveT.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemRoutine: item.itemRoutine,
            itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
            cost: 50
          })
        })
      })
      return arr
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
    getAll().then(res => {
      this.$store.commit('SET_STATUS', res.data.status)
      this.team = res.data.team
      this.personT = res.data.person
      this.duelT = res.data.duel
      this.collectiveT = res.data.collective
      // this.$store.commit('SET_RESPONSIBILITY', res.data.responsibility)
      // this.$store.commit('SET_REMITTANCE', res.data.remittance)
      // this.$store.commit('SET_TEAM', res.data.team)
      // this.$store.commit('SET_PERSON', res.data.person)
      // this.$store.commit('SET_DULE', res.data.duel)
      // this.$store.commit('SET_COLLECTIVE', res.data.collective)
    }).catch(err => {
      console.log(err)
    })
    // getProject().then(res => {
    //   this.$store.commit('SET_STATUS', res.data.status)
    //   this.$store.commit('SET_RESPONSIBILITY', res.data.responsibility)
    //   this.$store.commit('SET_REMITTANCE', res.data.remittance)
    //   this.$store.commit('SET_TEAM', res.data.team)
    //   this.$store.commit('SET_PERSON', res.data.person)
    //   this.$store.commit('SET_DULE', res.data.duel)
    //   this.$store.commit('SET_COLLECTIVE', res.data.collective)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  mounted () {

  },
  methods: {
    prevStep () {
      this.$store.dispatch('STEP_PREV', { router: this.$router, route: this.$route })
    },
    nextStep () {
      this.$store.dispatch('STEP_NEXT', { router: this.$router, route: this.$route })
    }
  }
}
</script>

<style scoped lang="scss">
.step-4 {
  padding: 0px 0 30px;
}
</style>
